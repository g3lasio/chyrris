/**
 * Stripe Integration - Caymus Tanks Subscriptions
 * Chyrris Technologies Inc.
 *
 * Handles:
 * - Checkout session creation (redirect to Stripe hosted checkout)
 * - Webhook processing (auto-activate subscription on payment)
 * - Subscription status queries
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

// ─── Users DB (JSON file) ──────────────────────────────────────────────────────
const DATA_DIR = path.join(process.cwd(), '.data');
const USERS_FILE = path.join(DATA_DIR, 'caymus-users.json');

interface CaymusUser {
  phone: string;
  name: string;
  registeredAt: string;
  subscriptionStatus: 'none' | 'active' | 'cancelled' | 'past_due';
  subscriptionId?: string;
  customerId?: string;
  subscriptionExpiry?: string;
  isOwner?: boolean;
}

function loadUsers(): Record<string, CaymusUser> {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(USERS_FILE)) return {};
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, CaymusUser>): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

// ─── Create Checkout Session ───────────────────────────────────────────────────
/**
 * Creates a Stripe Checkout Session for Caymus Tanks Pro subscription.
 * Returns the URL to redirect the user to.
 */
export async function createCheckoutSession(
  phone: string,
  lang: string = 'es'
): Promise<{ url: string; sessionId: string }> {
  const stripe = getStripe();
  const normalizedPhone = normalizePhone(phone);

  // Check if user already has a Stripe customer ID
  const users = loadUsers();
  const user = users[normalizedPhone];
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

    // Save customer ID to user record
    if (users[normalizedPhone]) {
      users[normalizedPhone].customerId = customerId;
    } else {
      users[normalizedPhone] = {
        phone: normalizedPhone,
        name: '',
        registeredAt: new Date().toISOString(),
        subscriptionStatus: 'none',
        customerId,
      };
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

// ─── Webhook Handler ───────────────────────────────────────────────────────────
/**
 * Processes Stripe webhook events.
 * Automatically activates/deactivates subscriptions based on payment status.
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

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const phone = normalizePhone(session.metadata?.phone || '');

      if (phone && session.subscription) {
        const subscriptionId = typeof session.subscription === 'string'
          ? session.subscription
          : session.subscription.id;

        // Get subscription details to get expiry date
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const expiryDate = new Date(subscription.current_period_end * 1000).toISOString();

        if (users[phone]) {
          users[phone].subscriptionStatus = 'active';
          users[phone].subscriptionId = subscriptionId;
          users[phone].subscriptionExpiry = expiryDate;
          if (session.customer) {
            users[phone].customerId = typeof session.customer === 'string'
              ? session.customer
              : session.customer.id;
          }
        } else {
          users[phone] = {
            phone,
            name: '',
            registeredAt: new Date().toISOString(),
            subscriptionStatus: 'active',
            subscriptionId,
            subscriptionExpiry: expiryDate,
            customerId: typeof session.customer === 'string'
              ? session.customer
              : (session.customer as any)?.id,
          };
        }
        saveUsers(users);
        console.log(`✅ Subscription activated for phone: ${phone}`);
      }
      break;
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId = typeof invoice.subscription === 'string'
        ? invoice.subscription
        : (invoice.subscription as any)?.id;

      if (subscriptionId) {
        // Find user by subscriptionId and renew their expiry
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const phone = normalizePhone(subscription.metadata?.phone || '');
        const expiryDate = new Date(subscription.current_period_end * 1000).toISOString();

        if (phone && users[phone]) {
          users[phone].subscriptionStatus = 'active';
          users[phone].subscriptionExpiry = expiryDate;
          saveUsers(users);
          console.log(`✅ Subscription renewed for phone: ${phone} until ${expiryDate}`);
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

        if (phone && users[phone]) {
          users[phone].subscriptionStatus = 'past_due';
          saveUsers(users);
          console.log(`⚠️ Payment failed for phone: ${phone}`);
        }
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const phone = normalizePhone(subscription.metadata?.phone || '');

      if (phone && users[phone]) {
        users[phone].subscriptionStatus = 'cancelled';
        users[phone].subscriptionExpiry = new Date().toISOString();
        saveUsers(users);
        console.log(`❌ Subscription cancelled for phone: ${phone}`);
      }
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      const phone = normalizePhone(subscription.metadata?.phone || '');

      if (phone && users[phone]) {
        const isActive = subscription.status === 'active';
        users[phone].subscriptionStatus = isActive ? 'active' : 'cancelled';
        users[phone].subscriptionExpiry = new Date(
          subscription.current_period_end * 1000
        ).toISOString();
        saveUsers(users);
        console.log(`🔄 Subscription updated for phone: ${phone} - status: ${subscription.status}`);
      }
      break;
    }

    default:
      console.log(`Unhandled webhook event: ${event.type}`);
  }

  return { received: true, message: `Event ${event.type} processed` };
}

// ─── Get Subscription Status ───────────────────────────────────────────────────
export function getSubscriptionStatus(phone: string): {
  isActive: boolean;
  status: string;
  expiry?: string;
} {
  const users = loadUsers();
  const user = users[normalizePhone(phone)];

  if (!user) return { isActive: false, status: 'none' };

  // Owner phones always have access
  if (user.isOwner) return { isActive: true, status: 'owner' };

  const isActive =
    user.subscriptionStatus === 'active' &&
    user.subscriptionExpiry != null &&
    new Date(user.subscriptionExpiry) > new Date();

  return {
    isActive,
    status: user.subscriptionStatus,
    expiry: user.subscriptionExpiry,
  };
}
