import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { sendOTP, verifyOTP } from "./twilio";
import { moldoctorChat, analyzeLabDocument } from "./moldoctor";
import { validateAppleReceipt, checkSubscriptionStatus, handleAppleNotification } from "./apple-iap";
import { createCheckoutSession, handleStripeWebhook, getSubscriptionStatus, createCustomerPortalSession, reconcileSubscriptionFromStripe } from "./stripe";
import {
  createCaymusSession,
  findCaymusUser,
  getCaymusAccessStatus,
  isOwnerPhone as isConfiguredOwnerPhone,
  normalizePhone as normalizeCaymusPhone,
  requireCaymusSession,
  upsertCaymusUser,
} from "./caymus-access";

// ============================================================================
// USERS DATABASE (JSON file storage for Caymus Tanks users)
// ============================================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../.data');
const CAYMUS_USERS_FILE = path.join(DATA_DIR, 'caymus-users.json');

interface CaymusUser {
  phone: string;
  name: string;
  isOwner: boolean;
  registeredAt: string;
  lastLogin: string;
  subscriptionStatus: 'none' | 'pending' | 'active' | 'expired' | 'past_due' | 'cancelled';
  subscriptionExpiry?: string;
}

async function ensureDataDir(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(CAYMUS_USERS_FILE);
    } catch {
      await fs.writeFile(CAYMUS_USERS_FILE, JSON.stringify([], null, 2));
    }
  } catch (error) {
    console.error('Error ensuring data dir:', error);
  }
}

async function getCaymusUsers(): Promise<CaymusUser[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(CAYMUS_USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveCaymusUsers(users: CaymusUser[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(CAYMUS_USERS_FILE, JSON.stringify(users, null, 2));
}

// Normalize phone number for consistent storage
function normalizePhone(phone: string): string {
  return normalizeCaymusPhone(phone);
}

// Owner access is centralized in caymus-access.ts and controlled by Railway env:
// CAYMUS_OWNER_PHONES=+12025493519. Do not add mobile-side owner bypasses.

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

const LEADPRIME_CONTACT_WEBHOOK_URL = process.env.LEADPRIME_CONTACT_WEBHOOK_URL || "https://leadprime.chyrris.com/api/leads/webhook/wh_15c5d9cb3cc145972a773c43e70edc8d5939376bb84080cc";


export async function registerRoutes(app: Express): Promise<Server> {
  // Twilio OTP endpoints for Caymus Tanks mobile app
  app.post("/api/otp/send", async (req, res) => {
    try {
      const { phoneNumber } = req.body;
      
      if (!phoneNumber) {
        return res.status(400).json({
          success: false,
          message: "Phone number is required"
        });
      }
      
      const result = await sendOTP(phoneNumber);
      
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      console.error('Error in /api/otp/send:', error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while sending OTP"
      });
    }
  });

  app.post("/api/otp/verify", async (req, res) => {
    try {
      const { phoneNumber, code } = req.body;
      
      if (!phoneNumber || !code) {
        return res.status(400).json({
          success: false,
          message: "Phone number and code are required"
        });
      }
      
      const result = await verifyOTP(phoneNumber, code);

      if (!result.success) {
        return res.status(400).json(result);
      }

      const normalizedPhone = normalizePhone(phoneNumber);
      const session = createCaymusSession(normalizedPhone);
      const user = upsertCaymusUser(normalizedPhone, { lastLogin: new Date().toISOString() });
      let access = getCaymusAccessStatus(normalizedPhone);

      // Si el registro local no muestra acceso, verificar el pago directamente
      // contra Stripe: cubre webhooks perdidos y reinicios del archivo .data.
      if (!access.hasAccess) {
        const reconciled = await reconcileSubscriptionFromStripe(normalizedPhone);
        if (reconciled) access = getCaymusAccessStatus(normalizedPhone);
      }

      return res.status(200).json({
        ...result,
        phone: normalizedPhone,
        sessionToken: session.token,
        sessionExpiresAt: session.expiresAt,
        isOwner: access.isOwner,
        // La app usa userName/isRegistered para decidir si va a registro de
        // perfil o directo a la calculadora: sin estos campos, todo usuario
        // (incluso pagado) era tratado como nuevo en cada login OTP.
        userName: user.name || null,
        isRegistered: !!user.name || access.isOwner,
        subscriptionStatus: access.status === 'owner' ? 'active' : access.status,
        hasAccess: access.hasAccess,
        isInGracePeriod: access.isInGracePeriod,
        graceEndsAt: access.graceEndsAt,
        subscriptionExpiry: access.expiry || null,
      });
    } catch (error) {
      console.error('Error in /api/otp/verify:', error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while verifying OTP"
      });
    }
  });

  // ============================================================================
  // USER PROFILE ENDPOINTS for Caymus Tanks
  // ============================================================================

  /**
   * GET /api/users/profile?phone=+1234567890
   * Obtiene el perfil del usuario por número de teléfono.
   * Devuelve nombre, estado de registro y suscripción.
   */
  app.get("/api/users/profile", async (req, res) => {
    try {
      const { phone } = req.query;
      if (!phone || typeof phone !== 'string') {
        return res.status(400).json({ success: false, message: 'Phone number is required' });
      }
      const normalizedPhone = normalizePhone(phone);
      const session = requireCaymusSession(req, res, normalizedPhone);
      if (!session) return;

      const user = upsertCaymusUser(normalizedPhone, { lastLogin: new Date().toISOString() });
      let access = getCaymusAccessStatus(normalizedPhone);

      // Igual que en /api/otp/verify: si no hay acceso local, consultar Stripe
      // directamente antes de responder (webhook perdido / .data reiniciado).
      if (!access.hasAccess) {
        const reconciled = await reconcileSubscriptionFromStripe(normalizedPhone);
        if (reconciled) access = getCaymusAccessStatus(normalizedPhone);
      }

      return res.json({
        success: true,
        isRegistered: !!user.name || access.isOwner,
        isOwner: access.isOwner,
        userName: user.name || null,
        subscriptionStatus: access.status === 'owner' ? 'active' : access.status,
        subscriptionExpiry: access.expiry || null,
        hasAccess: access.hasAccess,
        isInGracePeriod: access.isInGracePeriod,
        graceEndsAt: access.graceEndsAt || null,
        daysRemaining: access.daysRemaining || null,
        planInterval: access.planInterval || null,
      });
    } catch (error) {
      console.error('Error in /api/users/profile:', error);
      return res.status(500).json({ success: false, message: 'Error fetching user profile' });
    }
  });

  /**
   * POST /api/users/register
   * Registra un nuevo usuario o actualiza el nombre de uno existente.
   * Body: { phone, name, acceptedTerms }
   */
  app.post("/api/users/register", async (req, res) => {
    try {
      const { phone, name, acceptedTerms } = req.body;
      if (!phone || !name) {
        return res.status(400).json({ success: false, message: 'Phone and name are required' });
      }
      if (!name.trim() || name.trim().length < 2) {
        return res.status(400).json({ success: false, message: 'Name must be at least 2 characters' });
      }
      const normalizedPhone = normalizePhone(phone);
      const session = requireCaymusSession(req, res, normalizedPhone);
      if (!session) return;

      const isOwner = isConfiguredOwnerPhone(normalizedPhone);
      // No pisar una suscripción ya activa/past_due al re-registrar el nombre
      // (p. ej. usuario pagado que reinstala la app).
      const existingUser = findCaymusUser(normalizedPhone);
      const keepExistingStatus = !!existingUser?.subscriptionStatus && existingUser.subscriptionStatus !== 'none';
      const user = upsertCaymusUser(normalizedPhone, {
        name: name.trim(),
        lastLogin: new Date().toISOString(),
        ...(keepExistingStatus ? {} : { subscriptionStatus: isOwner ? 'active' : 'pending' }),
      });
      const access = getCaymusAccessStatus(normalizedPhone);

      return res.json({
        success: true,
        message: `¡Bienvenido, ${name.trim()}!`,
        isOwner: access.isOwner,
        subscriptionStatus: access.status === 'owner' ? 'active' : user.subscriptionStatus,
        hasAccess: access.hasAccess,
      });
    } catch (error) {
      console.error('Error in /api/users/register:', error);
      return res.status(500).json({ success: false, message: 'Error registering user' });
    }
  });

  /**
   * POST /api/subscription/activate
   * Activa la suscripción de un usuario (llamado desde webhook de Stripe o manualmente).
   * Body: { phone, expiresAt? }
   */
  app.post("/api/subscription/activate", async (req, res) => {
    try {
      const adminSecret = process.env.CAYMUS_ADMIN_SECRET;
      const providedSecret = req.header('x-caymus-admin-secret');
      if (!adminSecret || providedSecret !== adminSecret) {
        return res.status(403).json({ success: false, message: 'Manual activation is disabled' });
      }

      const { phone, expiresAt } = req.body;
      if (!phone) {
        return res.status(400).json({ success: false, message: 'Phone is required' });
      }
      const normalizedPhone = normalizePhone(phone);
      const expiry = expiresAt ? new Date(expiresAt) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      upsertCaymusUser(normalizedPhone, {
        subscriptionStatus: 'active',
        subscriptionExpiry: expiry.toISOString(),
        paymentPastDueAt: undefined,
        graceEndsAt: undefined,
      });
      return res.json({ success: true, message: 'Subscription activated' });
    } catch (error) {
      console.error('Error in /api/subscription/activate:', error);
      return res.status(500).json({ success: false, message: 'Error activating subscription' });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      const submittedAt = new Date().toISOString();
      const leadPayload = {
        ...validatedData,
        source: "chyrris_website_contact_form",
        submittedAt,
        metadata: {
          website: "chyrris.com",
          userAgent: req.get("user-agent") || null,
          ip: req.ip || req.socket.remoteAddress || null,
        },
      };

      const webhookResponse = await fetch(LEADPRIME_CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Chyrris-Website/1.0",
        },
        body: JSON.stringify(leadPayload),
      });

      if (!webhookResponse.ok) {
        const errorText = await webhookResponse.text().catch(() => "");
        console.error("LeadPrime webhook rejected contact lead", {
          status: webhookResponse.status,
          response: errorText.slice(0, 500),
        });

        return res.status(502).json({
          success: false,
          message: "Lead webhook unavailable",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Message received successfully",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }

      console.error("Error forwarding contact lead", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while processing your request",
      });
    }
  });

  // MolDoctor API endpoints for Pocima Salvaje mobile app
  app.post("/api/moldoctor/chat", moldoctorChat);
  app.post("/api/moldoctor/analyze-lab", analyzeLabDocument);

  // Apple In-App Purchase endpoints for Caymus Tanks mobile app
  app.post("/api/subscription/validate", async (req, res) => {
    try {
      const { platform, productId, transactionReceipt, orderId } = req.body;
      
      if (platform !== 'ios') {
        return res.status(400).json({
          success: false,
          message: "Only iOS platform is supported"
        });
      }
      
      if (!transactionReceipt || !productId || !orderId) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: transactionReceipt, productId, orderId"
        });
      }
      
      const result = await validateAppleReceipt({
        receiptData: transactionReceipt,
        productId,
        transactionId: orderId,
        platform: 'ios',
      });
      
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      console.error('Error in /api/subscription/validate:', error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while validating subscription"
      });
    }
  });

  app.post("/api/subscription/check", async (req, res) => {
    try {
      const { transactionId, receiptData, productId } = req.body;
      
      if (!transactionId || !receiptData || !productId) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: transactionId, receiptData, productId"
        });
      }
      
      const result = await checkSubscriptionStatus(transactionId, receiptData, productId);
      
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      console.error('Error in /api/subscription/check:', error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while checking subscription"
      });
    }
  });

  // Apple Server-to-Server Notification endpoint (webhook)
  app.post("/api/subscription/apple-webhook", async (req, res) => {
    try {
      await handleAppleNotification(req.body);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error in /api/subscription/apple-webhook:', error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while processing notification"
      });
    }
  });

  // ============================================================================
  // STRIPE ENDPOINTS for Caymus Tanks subscriptions
  // ============================================================================

  /**
   * POST /api/stripe/create-checkout
   * Crea una Stripe Checkout Session y devuelve la URL de pago.
   * Body: { phone, lang? }
   */
  app.post("/api/stripe/create-checkout", async (req: Request, res: Response) => {
    try {
      const { phone, lang, planInterval, email, customerEmail } = req.body;
      if (!phone) {
        return res.status(400).json({ success: false, message: 'Phone number is required' });
      }
      const normalizedPhone = normalizePhone(phone);
      const session = requireCaymusSession(req, res, normalizedPhone);
      if (!session) return;
      // Guardia anti doble cobro: si ya tiene acceso (suscripción activa,
      // gracia vigente u owner), mandarlo al portal de Stripe para gestionar
      // su suscripción en lugar de crear un segundo checkout.
      const currentAccess = getCaymusAccessStatus(normalizedPhone);
      if (currentAccess.hasAccess) {
        if (currentAccess.hasCustomer) {
          const portal = await createCustomerPortalSession(normalizedPhone);
          return res.json({ success: true, url: portal.url, alreadySubscribed: true });
        }
        return res.status(409).json({
          success: false,
          alreadySubscribed: true,
          message: 'Ya tienes acceso activo en Caymus. No es necesario pagar de nuevo.',
        });
      }

      const selectedPlan = planInterval === 'month' ? 'month' : 'year';
      const checkoutEmail = typeof email === 'string' && email.trim() ? email : (typeof customerEmail === 'string' ? customerEmail : undefined);
      const { url, sessionId } = await createCheckoutSession(normalizedPhone, lang || 'es', selectedPlan, checkoutEmail);
      return res.json({ success: true, url, sessionId });
    } catch (error: any) {
      console.error('Error creating Stripe checkout:', error);
      return res.status(500).json({ success: false, message: error.message || 'Error creating checkout session' });
    }
  });

  /**
   * GET /api/stripe/customer-portal?phone=+1234567890
   * Redirige al portal de Stripe para gestionar/cancelar suscripción.
   */
  app.get("/api/stripe/customer-portal", async (req: Request, res: Response) => {
    try {
      const { phone } = req.query;
      if (!phone || typeof phone !== 'string') {
        return res.status(400).json({ success: false, message: 'Phone number is required' });
      }
      const normalizedPhone = normalizePhone(phone);
      const session = requireCaymusSession(req, res, normalizedPhone);
      if (!session) return;
      const { url } = await createCustomerPortalSession(normalizedPhone);
      return res.redirect(url);
    } catch (error: any) {
      console.error('Error creating customer portal session:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  });

    /**
   * POST /api/stripe/webhook
   * Recibe eventos de Stripe (pagos, cancelaciones, renovaciones).
   * Activa/desactiva suscripciones automáticamente.
   * IMPORTANT: Must use raw body for signature verification.
   */
  app.post("/api/stripe/webhook", async (req: Request, res: Response) => {
    try {
      const signature = req.headers['stripe-signature'] as string;
      if (!signature) {
        return res.status(400).json({ error: 'Missing stripe-signature header' });
      }
      // express.raw (montado en index.ts) deja el body crudo como Buffer.
      const rawBody = Buffer.isBuffer(req.body) ? req.body : (req as any).rawBody;
      if (!rawBody || !rawBody.length) {
        return res.status(400).json({ error: 'Missing raw request body' });
      }
      const result = await handleStripeWebhook(rawBody, signature);
      return res.json(result);
    } catch (error: any) {
      console.error('Stripe webhook error:', error.message);
      return res.status(400).json({ error: error.message });
    }
  });

  /**
   * GET /api/stripe/subscription-status?phone=+1234567890
   * Devuelve el estado de suscripción de un usuario.
   */
  app.get("/api/stripe/subscription-status", async (req: Request, res: Response) => {
    try {
      const { phone } = req.query;
      if (!phone || typeof phone !== 'string') {
        return res.status(400).json({ success: false, message: 'Phone is required' });
      }
      const normalizedPhone = normalizePhone(phone);
      const session = requireCaymusSession(req, res, normalizedPhone);
      if (!session) return;
      let status = getSubscriptionStatus(normalizedPhone);
      if (!status.hasAccess) {
        const reconciled = await reconcileSubscriptionFromStripe(normalizedPhone);
        if (reconciled) status = getSubscriptionStatus(normalizedPhone);
      }
      return res.json({ success: true, ...status });
    } catch (error: any) {
      console.error('Error getting subscription status:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  });

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, timestamp: Date.now() });
  });

  const httpServer = createServer(app);

  return httpServer;
}
