/**
 * Stripe Integration - Caymus Tanks Subscriptions
 * Chyrris Technologies Inc.
 *
 * Handles:
 * - Checkout session creation (annual by default, monthly as advanced option)
 * - Webhook processing (auto-activate subscription on payment)
 * - Recurring billing with automatic charges
 * - Customer portal for managing/cancelling subscriptions
 * - Subscription status queries with a 3-day grace period for failed payments
 */

import Stripe from 'stripe';
import {
  CAYMUS_GRACE_PERIOD_DAYS,
  type CaymusSubscriptionStatus,
  getCaymusAccessStatus,
  normalizePhone,
  upsertCaymusUser,
} from './caymus-access';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;
const CAYMUS_MONTHLY_PRICE_ID = process.env.CAYMUS_STRIPE_MONTHLY_PRICE_ID || process.env.CAYMUS_STRIPE_PRICE_ID || 'price_1TUs7fBAAfD6dhk7A1Wy520E';
const CAYMUS_ANNUAL_PRICE_ID = process.env.CAYMUS_STRIPE_ANNUAL_PRICE_ID || process.env.CAYMUS_STRIPE_YEARLY_PRICE_ID || 'price_1TUs7eBAAfD6dhk7oBJymLCZ';

export type CaymusPlanInterval = 'month' | 'year';

let stripeClient: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeClient) {
    if (!STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY environment variable is not set');
    }
    stripeClient = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2026-03-25.dahlia',
    });
  }
  return stripeClient;
}

function getPriceId(planInterval: CaymusPlanInterval): string {
  if (planInterval === 'year') {
    if (!CAYMUS_ANNUAL_PRICE_ID) {
      throw new Error('Annual Stripe price is not configured. Set CAYMUS_STRIPE_ANNUAL_PRICE_ID in Railway.');
    }
    return CAYMUS_ANNUAL_PRICE_ID;
  }
  return CAYMUS_MONTHLY_PRICE_ID;
}

function getSubscriptionPeriodEnd(subscription: Stripe.Subscription): string {
  const periodEnd = (subscription as any).current_period_end;
  return new Date(periodEnd * 1000).toISOString();
}

function getSubscriptionPlanInterval(subscription: Stripe.Subscription): CaymusPlanInterval | undefined {
  const interval = subscription.items?.data?.[0]?.price?.recurring?.interval;
  return interval === 'year' ? 'year' : interval === 'month' ? 'month' : undefined;
}

function getSubscriptionPhone(subscription: Stripe.Subscription): string {
  return normalizePhone(subscription.metadata?.phone || '');
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

/**
 * Creates a Stripe Checkout Session for Caymus Tanks Pro subscription.
 * Annual is the default plan; monthly is retained as an advanced option.
 */
export async function createCheckoutSession(
  phone: string,
  lang: string = 'es',
  planInterval: CaymusPlanInterval = 'year'
): Promise<{ url: string; sessionId: string }> {
  const stripe = getStripe();
  const normalizedPhone = normalizePhone(phone);
  const selectedPlan = planInterval === 'month' ? 'month' : 'year';
  const priceId = getPriceId(selectedPlan);

  const user = upsertCaymusUser(normalizedPhone, { lastLogin: new Date().toISOString() });
  let customerId = user.customerId;

  if (!customerId) {
    const customer = await stripe.customers.create({
      phone: normalizedPhone,
      metadata: {
        phone: normalizedPhone,
        app: 'caymus-tanks',
      },
    });
    customerId = customer.id;
    upsertCaymusUser(normalizedPhone, { customerId });
  }

  const successUrl =
    lang === 'es'
      ? `https://chyrris.com/caymus-tanks/subscribe?success=true&phone=${encodeURIComponent(normalizedPhone)}&plan=${selectedPlan}`
      : `https://chyrris.com/caymus-tanks/subscribe?success=true&phone=${encodeURIComponent(normalizedPhone)}&plan=${selectedPlan}&lang=en`;

  const cancelUrl =
    lang === 'es'
      ? `https://chyrris.com/caymus-tanks/subscribe?canceled=true&phone=${encodeURIComponent(normalizedPhone)}&plan=${selectedPlan}`
      : `https://chyrris.com/caymus-tanks/subscribe?canceled=true&phone=${encodeURIComponent(normalizedPhone)}&plan=${selectedPlan}&lang=en`;

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      phone: normalizedPhone,
      app: 'caymus-tanks',
      planInterval: selectedPlan,
    },
    subscription_data: {
      metadata: {
        phone: normalizedPhone,
        app: 'caymus-tanks',
        planInterval: selectedPlan,
      },
    },
    locale: lang === 'es' ? 'es' : 'en',
    allow_promotion_codes: true,
  });

  return { url: session.url!, sessionId: session.id };
}

export async function createCustomerPortalSession(
  phone: string
): Promise<{ url: string }> {
  const stripe = getStripe();
  const normalizedPhone = normalizePhone(phone);
  const user = upsertCaymusUser(normalizedPhone, {});

  if (!user.customerId) {
    throw new Error('No Stripe customer found for this phone number');
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: user.customerId,
    return_url: `https://chyrris.com/caymus-tanks/subscribe?phone=${encodeURIComponent(normalizedPhone)}`,
  });

  return { url: session.url };
}

function mapStripeStatus(status: Stripe.Subscription.Status): CaymusSubscriptionStatus {
  if (status === 'active' || status === 'trialing') return 'active';
  if (status === 'past_due' || status === 'unpaid') return 'past_due';
  if (status === 'canceled') return 'cancelled';
  if (status === 'incomplete' || status === 'incomplete_expired') return 'pending';
  return 'pending';
}

async function syncSubscription(subscription: Stripe.Subscription): Promise<void> {
  const phone = getSubscriptionPhone(subscription);
  if (!phone) return;

  const status = mapStripeStatus(subscription.status);
  const expiryDate = getSubscriptionPeriodEnd(subscription);
  const planInterval = getSubscriptionPlanInterval(subscription);
  const now = new Date();
  const pastDueAt = status === 'past_due' ? now.toISOString() : undefined;
  const graceEndsAt = status === 'past_due' ? addDays(now, CAYMUS_GRACE_PERIOD_DAYS).toISOString() : undefined;

  upsertCaymusUser(phone, {
    subscriptionStatus: status,
    subscriptionId: subscription.id,
    subscriptionExpiry: expiryDate,
    customerId: typeof subscription.customer === 'string' ? subscription.customer : (subscription.customer as any)?.id,
    planInterval,
    paymentPastDueAt: status === 'past_due' ? pastDueAt : undefined,
    graceEndsAt: status === 'past_due' ? graceEndsAt : undefined,
  });

  console.log(`Caymus subscription synced for ${phone}: ${status} until ${expiryDate}`);
}

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

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const phone = normalizePhone(session.metadata?.phone || '');
      const subscriptionId = typeof session.subscription === 'string'
        ? session.subscription
        : (session.subscription as any)?.id;
      const customerId = typeof session.customer === 'string'
        ? session.customer
        : (session.customer as any)?.id;

      if (phone && subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        await syncSubscription(subscription);
        upsertCaymusUser(phone, { customerId, subscriptionId });
      }
      break;
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as any;
      const subscriptionId = typeof invoice.subscription === 'string'
        ? invoice.subscription
        : invoice.subscription?.id;
      if (subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        await syncSubscription(subscription);
      }
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as any;
      const subscriptionId = typeof invoice.subscription === 'string'
        ? invoice.subscription
        : invoice.subscription?.id;
      if (subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const phone = getSubscriptionPhone(subscription);
        const now = new Date();
        const graceEndsAt = addDays(now, CAYMUS_GRACE_PERIOD_DAYS).toISOString();
        if (phone) {
          upsertCaymusUser(phone, {
            subscriptionStatus: 'past_due',
            subscriptionId,
            subscriptionExpiry: getSubscriptionPeriodEnd(subscription),
            customerId: typeof subscription.customer === 'string' ? subscription.customer : (subscription.customer as any)?.id,
            planInterval: getSubscriptionPlanInterval(subscription),
            paymentPastDueAt: now.toISOString(),
            graceEndsAt,
          });
          console.log(`Payment failed for ${phone}; grace access ends at ${graceEndsAt}`);
        }
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const phone = getSubscriptionPhone(subscription);
      if (phone) {
        upsertCaymusUser(phone, {
          subscriptionStatus: 'cancelled',
          subscriptionExpiry: new Date().toISOString(),
          subscriptionId: subscription.id,
          customerId: typeof subscription.customer === 'string' ? subscription.customer : (subscription.customer as any)?.id,
          planInterval: getSubscriptionPlanInterval(subscription),
          paymentPastDueAt: undefined,
          graceEndsAt: undefined,
        });
      }
      break;
    }

    case 'customer.subscription.updated':
    case 'customer.subscription.created': {
      const subscription = event.data.object as Stripe.Subscription;
      await syncSubscription(subscription);
      break;
    }

    default:
      console.log(`Unhandled webhook event: ${event.type}`);
  }

  return { received: true, message: `Event ${event.type} processed` };
}

export function getSubscriptionStatus(phone: string): {
  isActive: boolean;
  hasAccess: boolean;
  status: string;
  expiry?: string;
  hasCustomer: boolean;
  isOwner: boolean;
  isInGracePeriod: boolean;
  graceEndsAt?: string;
  daysRemaining?: number;
  planInterval?: CaymusPlanInterval;
} {
  return getCaymusAccessStatus(phone);
}
