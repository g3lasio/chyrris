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
import { createCheckoutSession, handleStripeWebhook, getSubscriptionStatus, createCustomerPortalSession } from "./stripe";

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
  let cleaned = phone.replace(/[^\d+]/g, '');
  if (!cleaned.startsWith('+')) {
    if (cleaned.length === 10) cleaned = '+1' + cleaned;
    else if (cleaned.length === 11 && cleaned.startsWith('1')) cleaned = '+' + cleaned;
    else cleaned = '+1' + cleaned;
  }
  return cleaned;
}

// Owner phone numbers (must match authService.ts in mobile app)
const OWNER_PHONES = [
  '+12025493519',  // Número del propietario principal
];

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

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
      
      return res.status(result.success ? 200 : 400).json(result);
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
      const isOwner = OWNER_PHONES.includes(normalizedPhone);
      const users = await getCaymusUsers();
      const user = users.find(u => u.phone === normalizedPhone);
      if (!user && !isOwner) {
        return res.json({
          success: true,
          isRegistered: false,
          isOwner: false,
          userName: null,
          subscriptionStatus: 'none',
        });
      }
      // Update last login
      if (user) {
        user.lastLogin = new Date().toISOString();
        await saveCaymusUsers(users);
      }
      return res.json({
        success: true,
        isRegistered: !!user,
        isOwner,
        userName: user?.name || null,
        subscriptionStatus: isOwner ? 'active' : (user?.subscriptionStatus || 'none'),
        subscriptionExpiry: user?.subscriptionExpiry || null,
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
      const isOwner = OWNER_PHONES.includes(normalizedPhone);
      const users = await getCaymusUsers();
      const existingIndex = users.findIndex(u => u.phone === normalizedPhone);
      if (existingIndex >= 0) {
        // Update existing user
        users[existingIndex].name = name.trim();
        users[existingIndex].lastLogin = new Date().toISOString();
        if (isOwner) users[existingIndex].subscriptionStatus = 'active';
      } else {
        // Create new user
        const newUser: CaymusUser = {
          phone: normalizedPhone,
          name: name.trim(),
          isOwner,
          registeredAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          subscriptionStatus: isOwner ? 'active' : 'pending',
        };
        users.push(newUser);
      }
      await saveCaymusUsers(users);
      return res.json({
        success: true,
        message: `¡Bienvenido, ${name.trim()}!`,
        isOwner,
        subscriptionStatus: isOwner ? 'active' : 'pending',
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
      const { phone, expiresAt } = req.body;
      if (!phone) {
        return res.status(400).json({ success: false, message: 'Phone is required' });
      }
      const normalizedPhone = normalizePhone(phone);
      const users = await getCaymusUsers();
      const userIndex = users.findIndex(u => u.phone === normalizedPhone);
      if (userIndex < 0) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      users[userIndex].subscriptionStatus = 'active';
      if (expiresAt) {
        users[userIndex].subscriptionExpiry = expiresAt;
      } else {
        // Default: 30 days from now
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 30);
        users[userIndex].subscriptionExpiry = expiry.toISOString();
      }
      await saveCaymusUsers(users);
      return res.json({ success: true, message: 'Subscription activated' });
    } catch (error) {
      console.error('Error in /api/subscription/activate:', error);
      return res.status(500).json({ success: false, message: 'Error activating subscription' });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = contactSchema.parse(req.body);
      
      // For now, we'll just return success
      // In a real application, this would store the message 
      // or send an email notification
      
      return res.status(200).json({
        success: true,
        message: "Message received successfully"
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "An error occurred while processing your request"
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
      const { phone, lang } = req.body;
      if (!phone) {
        return res.status(400).json({ success: false, message: 'Phone number is required' });
      }
      const { url, sessionId } = await createCheckoutSession(phone, lang || 'es');
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
      const { url } = await createCustomerPortalSession(phone);
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
  app.post("/api/stripe/webhook",
    // Raw body middleware specifically for this route
    (req: Request, res: Response, next: Function) => {
      let rawBody = Buffer.alloc(0);
      req.on('data', (chunk: Buffer) => {
        rawBody = Buffer.concat([rawBody, chunk]);
      });
      req.on('end', () => {
        (req as any).rawBody = rawBody;
        next();
      });
    },
    async (req: Request, res: Response) => {
      try {
        const signature = req.headers['stripe-signature'] as string;
        if (!signature) {
          return res.status(400).json({ error: 'Missing stripe-signature header' });
        }
        const rawBody = (req as any).rawBody as Buffer;
        const result = await handleStripeWebhook(rawBody, signature);
        return res.json(result);
      } catch (error: any) {
        console.error('Stripe webhook error:', error.message);
        return res.status(400).json({ error: error.message });
      }
    }
  );

  /**
   * GET /api/stripe/subscription-status?phone=+1234567890
   * Devuelve el estado de suscripción de un usuario.
   */
  app.get("/api/stripe/subscription-status", (req: Request, res: Response) => {
    try {
      const { phone } = req.query;
      if (!phone || typeof phone !== 'string') {
        return res.status(400).json({ success: false, message: 'Phone is required' });
      }
      const status = getSubscriptionStatus(phone);
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
