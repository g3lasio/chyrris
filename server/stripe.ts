/**
 * Stripe Integration - Caymus Tanks Subscriptions
 * Chyrris Technologies Inc.
 *
 * Handles:
 * - Checkout session creation (redirect to Stripe hosted checkout)
 * - Webhook processing (auto-activate subscription on payment)
 * - Monthly recurring billing with automatic charges
 * - Customer portal for managing/cancelling subscriptions
 * - Subscription status queries
 *
 * IMPORTANT: Uses the SAME caymus-users.json file as routes.ts
 * Format: Array of CaymusUser objects (NOT a keyed object)
 */

import Stripe from 'stripe';
import fs from 'fs';
import path from 'path';

// ─── Constants ────────────────────────────────────────────────────────────────

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;
const CAYMUS_PRICE_ID = process.env.CAYMUS_STRIPE_PRICE_ID || 'price_1THTCOBAAfD6dhk7EBL1Tj1R';

// ─── Stripe Client ─────────────────────────────────────────────────────────────

let stripeClient: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeClient) {
    if (!STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY environment variable is not set');
    }
    stripeClient = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
    });
  }
  return stripeClient;
}

// ─── Users DB — SHARED with routes.ts (array format) ──────────────────────────

const DATA_DIR = path.join(process.cwd(), '.data');
const USERS_FILE = path.join(DATA_DIR, 'caymus-users.json');

interface CaymusUser {
  phone: string;
  name: string;
  isOwner: boolean;
  registeredAt: string;
  lastLogin: string;
  subscriptionStatus: 'none' | 'pending' | 'active' | 'expired' | 'past_due' | 'cancelled';
  subscriptionExpiry?: string;
  subscriptionId?: string;
  customerId?: string;
}

function loadUsers(): CaymusUser[] {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(USERS_FILE)) return [];
    const raw = fs.readFileSync(USERS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    // Handle legacy object format (migrate to array)
    if (!Array.isArray(parsed)) {
      const arr: CaymusUser[] = Object.values(parsed).map((u: any) => ({
        phone: u.phone || '',
        name: u.name || '',
        isOwner: u.isOwner || false,
        registeredAt: u.registeredAt || new Date().toISOString(),
        lastLogin: u.lastLogin || new Date().toISOString(),
        subscriptionStatus: u.subscriptionStatus || 'none',
        subscriptionExpiry: u.subscriptionExpiry,
        subscriptionId: u.subscriptionId,
        customerId: u.customerId,
      }));
      fs.writeFileSync(USERS_FILE, JSON.stringify(arr, null, 2));
      return arr;
    }
    return parsed;
  } catch {
    return [];
  }
}

function saveUsers(users: CaymusUser[]): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

// ─── Create Checkout Session ───────────────────────────────────────────────────

/**
 * Creates a Stripe Checkout Session for Caymus Tanks Pro subscription.
 * The subscription is monthly ($6.99/month) with automatic recurring charges.
 */
export async function createCheckoutSession(
  phone: string,
  lang: string = 'es'
): Promise<{ url: string; sessionId: string }> {
  const stripe = getStripe();
  const normalizedPhone = normalizePhone(phone);

  const users = loadUsers();
  let user = users.find(u => u.phone === normalizedPhone);
  let customerId = user?.customerId;

  // Create or reuse Stripe customer
  if (!customerId) {
    const customer = await stripe.customers.create({
      phone: `+${normalizedPhone}`,
      metadata: {
        phone: normalizedPhone,
        app: 'caymus-tanks',
      },
    });
    customerId = customer.id;

    if (user) {
      user.customerId = customerId;
    } else {
      user = {
        phone: normalizedPhone,
        name: '',
        isOwner: false,
        registeredAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        subscriptionStatus: 'none',
        customerId,
      };
      users.push(user);
    }
    saveUsers(users);
  }

  const successUrl =
    lang === 'es'
      ? `https://chyrris.com/caymus-tanks/subscribe?success=true&phone=${encodeURIComponent(normalizedPhone)}`
      : `https://chyrris.com/caymus-tanks/subscribe?success=true&phone=${encodeURIComponent(normalizedPhone)}&lang=en`;

  const cancelUrl =
    lang === 'es'
      ? `https://chyrris.com/caymus-tanks/subscribe?cancelled=true&phone=${encodeURIComponent(normalizedPhone)}`
      : `https://chyrris.com/caymus-tanks/subscribe?cancelled=true&phone=${encodeURIComponent(normalizedPhone)}&lang=en`;

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [
      {
        price: CAYMUS_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      phone: normalizedPhone,
      app: 'caymus-tanks',
    },
    subscription_data: {
      metadata: {
        phone: normalizedPhone,
        app: 'caymus-tanks',
      },
    },
    locale: lang === 'es' ? 'es' : 'en',
    allow_promotion_codes: true,
  });

  return { url: session.url!, sessionId: session.id };
}

// ─── Create Customer Portal Session ───────────────────────────────────────────

/**
 * Creates a Stripe Customer Portal session so the user can manage or cancel
 * their subscription directly from Stripe's hosted portal.
 */
export async function createCustomerPortalSession(
  phone: string
): Promise<{ url: string }> {
  const stripe = getStripe();
  const normalizedPhone = normalizePhone(phone);

  const users = loadUsers();
  const user = users.find(u => u.phone === normalizedPhone);

  if (!user?.customerId) {
    throw new Error('No Stripe customer found for this phone number');
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: user.customerId,
    return_url: `https://chyrris.com/caymus-tanks/subscribe?phone=${encodeURIComponent(normalizedPhone)}`,
  });

  return { url: session.url };
}

// ─── Webhook Handler ───────────────────────────────────────────────────────────

/**
 * Processes Stripe webhook events.
 * Automatically activates/deactivates subscriptions based on payment status.
 * Events handled:
 * - checkout.session.completed → activate subscription
 * - invoice.payment_succeeded  → renew subscription (monthly auto-charge)
 * - invoice.payment_failed     → mark as past_due (card declined)
 * - customer.subscription.deleted → mark as cancelled
 * - customer.subscription.updated → sync status
 * - customer.subscription.created → initial creation
 */
export async function handleStripeWebhook(
  rawBody: Buffer,
  signature: string
): Promise<{ received: boolean; message: string }> {
  const stripe = getStripe();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error('Stripe webhook signature verification failed:', err.message);
    throw new Error(`Webhook signature verification failed: ${err.message}`);
  }

  console.log(`Stripe webhook received: ${event.type}`);

  const users = loadUsers();

  const updateUser = (phone: string, updates: Partial<CaymusUser>) => {
    const idx = users.findIndex(u => u.phone === phone);
    if (idx >= 0) {
      Object.assign(users[idx], updates);
      saveUsers(users);
      return true;
    }
    return false;
  };

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const phone = normalizePhone(session.metadata?.phone || '');

      if (phone && session.subscription) {
        const subscriptionId = typeof session.subscription === 'string'
          ? session.subscription
          : session.subscription.id;

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const expiryDate = new Date(subscription.current_period_end * 1000).toISOString();
        const customerId = typeof session.customer === 'string'
          ? session.customer
          : (session.customer as any)?.id;

        const found = updateUser(phone, {
          subscriptionStatus: 'active',
          subscriptionId,
          subscriptionExpiry: expiryDate,
          customerId,
        });

        if (!found) {
          users.push({
            phone,
            name: '',
            isOwner: false,
            registeredAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            subscriptionStatus: 'active',
            subscriptionId,
            subscriptionExpiry: expiryDate,
            customerId,
          });
          saveUsers(users);
        }

        console.log(`✅ Subscription activated for phone: ${phone} until ${expiryDate}`);
      }
      break;
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId = typeof invoice.subscription === 'string'
        ? invoice.subscription
        : (invoice.subscription as any)?.id;

      if (subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const phone = normalizePhone(subscription.metadata?.phone || '');
        const expiryDate = new Date(subscription.current_period_end * 1000).toISOString();

        if (phone) {
          updateUser(phone, {
            subscriptionStatus: 'active',
            subscriptionExpiry: expiryDate,
          });
          console.log(`✅ Monthly payment succeeded for phone: ${phone} until ${expiryDate}`);
        }
      }
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId = typeof invoice.subscription === 'string'
        ? invoice.subscription
        : (invoice.subscription as any)?.id;

      if (subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const phone = normalizePhone(subscription.metadata?.phone || '');

        if (phone) {
          updateUser(phone, { subscriptionStatus: 'past_due' });
          console.log(`⚠️ Payment failed for phone: ${phone} - marked as past_due`);
        }
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const phone = normalizePhone(subscription.metadata?.phone || '');

      if (phone) {
        updateUser(phone, {
          subscriptionStatus: 'cancelled',
          subscriptionExpiry: new Date().toISOString(),
        });
        console.log(`❌ Subscription cancelled for phone: ${phone}`);
      }
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      const phone = normalizePhone(subscription.metadata?.phone || '');

      if (phone) {
        const isActive = subscription.status === 'active';
        updateUser(phone, {
          subscriptionStatus: isActive ? 'active' : 'cancelled',
          subscriptionExpiry: new Date(subscription.current_period_end * 1000).toISOString(),
        });
        console.log(`🔄 Subscription updated for phone: ${phone} - status: ${subscription.status}`);
      }
      break;
    }

    case 'customer.subscription.created': {
      const subscription = event.data.object as Stripe.Subscription;
      const phone = normalizePhone(subscription.metadata?.phone || '');
      const expiryDate = new Date(subscription.current_period_end * 1000).toISOString();

      if (phone) {
        updateUser(phone, {
          subscriptionStatus: subscription.status === 'active' ? 'active' : 'pending',
          subscriptionId: subscription.id,
          subscriptionExpiry: expiryDate,
        });
        console.log(`🆕 Subscription created for phone: ${phone}`);
      }
      break;
    }

    default:
      console.log(`Unhandled webhook event: ${event.type}`);
  }

  return { received: true, message: `Event ${event.type} processed` };
}

// ─── Get Subscription Status ───────────────────────────────────────────────────

/**
 * Returns the subscription status for a phone number.
 * Used by /api/users/profile endpoint.
 */
export function getSubscriptionStatus(phone: string): {
  isActive: boolean;
  status: string;
  expiry?: string;
  hasCustomer: boolean;
} {
  const users = loadUsers();
  const user = users.find(u => u.phone === normalizePhone(phone));

  if (!user) return { isActive: false, status: 'none', hasCustomer: false };

  // Owner phones always have access
  if (user.isOwner) return { isActive: true, status: 'owner', hasCustomer: !!user.customerId };

  const isActive =
    user.subscriptionStatus === 'active' &&
    user.subscriptionExpiry != null &&
    new Date(user.subscriptionExpiry) > new Date();

  return {
    isActive,
    status: user.subscriptionStatus,
    expiry: user.subscriptionExpiry,
    hasCustomer: !!user.customerId,
  };
}
