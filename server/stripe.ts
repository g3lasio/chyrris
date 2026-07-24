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
  findCaymusUser,
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
      // La reconciliación corre inline en el login OTP: con los defaults del
      // SDK (80s de timeout x 3 intentos) una degradación de Stripe dejaría
      // colgado el login de todo usuario sin suscripción activa.
      timeout: 10000,
      maxNetworkRetries: 1,
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
  // Desde la versión de API 2025-03-31.basil, current_period_end ya no existe en
  // la suscripción: vive en cada subscription item.
  const legacyEnd = (subscription as any).current_period_end;
  const itemEnd = (subscription.items?.data?.[0] as any)?.current_period_end;
  const periodEnd = typeof legacyEnd === 'number' ? legacyEnd : itemEnd;
  if (typeof periodEnd === 'number' && Number.isFinite(periodEnd)) {
    return new Date(periodEnd * 1000).toISOString();
  }
  // Nunca dejar que una fecha ausente tumbe la activación de un pago real.
  const interval = getSubscriptionPlanInterval(subscription) || 'year';
  const fallbackDays = interval === 'year' ? 365 : 31;
  console.warn(`Stripe subscription ${subscription.id} sin current_period_end; usando fallback de ${fallbackDays} días`);
  return new Date(Date.now() + fallbackDays * 24 * 60 * 60 * 1000).toISOString();
}

function getInvoiceSubscriptionId(invoice: any): string | undefined {
  // API antigua: invoice.subscription. Desde basil: invoice.parent.subscription_details.
  if (typeof invoice?.subscription === 'string') return invoice.subscription;
  if (invoice?.subscription?.id) return invoice.subscription.id;
  const parentSub = invoice?.parent?.subscription_details?.subscription;
  if (typeof parentSub === 'string') return parentSub;
  if (parentSub?.id) return parentSub.id;
  return undefined;
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
  planInterval: CaymusPlanInterval = 'year',
  email?: string
): Promise<{ url: string; sessionId: string }> {
  const stripe = getStripe();
  const normalizedPhone = normalizePhone(phone);
  const selectedPlan = planInterval === 'month' ? 'month' : 'year';
  const priceId = getPriceId(selectedPlan);
  const normalizedEmail = email?.trim().toLowerCase() || undefined;

  const user = upsertCaymusUser(normalizedPhone, { lastLogin: new Date().toISOString() });
  let customerId = user.customerId;

  if (!customerId) {
    const customer = await stripe.customers.create({
      phone: normalizedPhone,
      email: normalizedEmail,
      metadata: {
        phone: normalizedPhone,
        app: 'caymus-tanks',
      },
    });
    customerId = customer.id;
    upsertCaymusUser(normalizedPhone, { customerId });
  } else if (normalizedEmail) {
    try {
      await stripe.customers.update(customerId, { email: normalizedEmail });
    } catch (error) {
      console.error(`No se pudo actualizar el email del customer ${customerId}:`, error);
    }
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

async function syncSubscription(subscription: Stripe.Subscription, fallbackPhone?: string): Promise<void> {
  const phone = getSubscriptionPhone(subscription) || normalizePhone(fallbackPhone || '');
  if (!phone) return;

  const status = mapStripeStatus(subscription.status);
  const expiryDate = getSubscriptionPeriodEnd(subscription);
  const planInterval = getSubscriptionPlanInterval(subscription);
  const now = new Date();

  // El período de gracia se ancla a la PRIMERA falla de pago. Re-estamparlo en
  // cada sync convertiría los 3 días en una ventana rodante infinita: cada
  // login re-otorgaría gracia mientras la suscripción siga past_due/unpaid.
  const existing = findCaymusUser(phone);
  const alreadyPastDue = existing?.subscriptionStatus === 'past_due';
  let pastDueAt: string | undefined;
  let graceEndsAt: string | undefined;
  if (status === 'past_due') {
    pastDueAt = (alreadyPastDue && existing?.paymentPastDueAt) || now.toISOString();
    graceEndsAt = (alreadyPastDue && existing?.graceEndsAt)
      || addDays(new Date(pastDueAt), CAYMUS_GRACE_PERIOD_DAYS).toISOString();
  }

  upsertCaymusUser(phone, {
    subscriptionStatus: status,
    subscriptionId: subscription.id,
    subscriptionExpiry: expiryDate,
    customerId: typeof subscription.customer === 'string' ? subscription.customer : (subscription.customer as any)?.id,
    planInterval,
    paymentPastDueAt: pastDueAt,
    graceEndsAt,
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
        await syncSubscription(subscription, phone);
        upsertCaymusUser(phone, { customerId, subscriptionId });
      }
      break;
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as any;
      const subscriptionId = getInvoiceSubscriptionId(invoice);
      if (subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        await syncSubscription(subscription);
      }
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as any;
      const subscriptionId = getInvoiceSubscriptionId(invoice);
      if (subscriptionId) {
        // syncSubscription ancla la gracia a la primera falla y la preserva en
        // los reintentos de dunning (cada retry emite payment_failed de nuevo).
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        await syncSubscription(subscription);
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

// Reconciliación directa contra Stripe: si un pago se completó pero el webhook
// se perdió (o el archivo .data se reinició), esto reactiva al usuario en su
// siguiente login OTP o consulta de perfil, sin depender del webhook.
const LIVE_SUBSCRIPTION_STATUSES: Stripe.Subscription.Status[] = ['active', 'trialing', 'past_due'];
const reconcileLastAttempt = new Map<string, number>();
const RECONCILE_MIN_INTERVAL_MS = 30 * 1000;

export async function reconcileSubscriptionFromStripe(phone: string): Promise<boolean> {
  const normalizedPhone = normalizePhone(phone);
  if (!normalizedPhone || !STRIPE_SECRET_KEY) return false;

  const lastAttempt = reconcileLastAttempt.get(normalizedPhone) || 0;
  if (Date.now() - lastAttempt < RECONCILE_MIN_INTERVAL_MS) return false;
  reconcileLastAttempt.set(normalizedPhone, Date.now());

  // Corre inline en el login: acotar el tiempo total aunque Stripe se degrade.
  // El trabajo puede seguir de fondo; su escritura es solo-otorgar y fresca.
  let deadlineTimer: NodeJS.Timeout | undefined;
  const deadline = new Promise<'timeout'>((resolve) => {
    deadlineTimer = setTimeout(() => resolve('timeout'), 12000);
    deadlineTimer.unref?.();
  });

  const work = (async (): Promise<boolean> => {
    const stripe = getStripe();
    const user = findCaymusUser(normalizedPhone);
    const found = new Map<string, Stripe.Subscription>();

    if (user?.customerId) {
      try {
        const byCustomer = await stripe.subscriptions.list({
          customer: user.customerId,
          status: 'all',
          limit: 10,
        });
        for (const sub of byCustomer.data) found.set(sub.id, sub);
      } catch (error) {
        console.error(`Stripe subscriptions.list falló para ${normalizedPhone}:`, error);
      }
    }

    const hasLive = Array.from(found.values()).some((sub) => LIVE_SUBSCRIPTION_STATUSES.includes(sub.status));
    if (!hasLive) {
      // Cubre el caso de customerId perdido (p. ej. reinicio de .data): las
      // suscripciones de Caymus siempre llevan phone/app en metadata.
      try {
        const bySearch = await stripe.subscriptions.search({
          query: `metadata['phone']:'${normalizedPhone}' AND metadata['app']:'caymus-tanks'`,
          limit: 10,
        });
        for (const sub of bySearch.data) found.set(sub.id, sub);
      } catch (error) {
        console.error(`Stripe subscriptions.search falló para ${normalizedPhone}:`, error);
      }
    }

    // Solo-otorgar: la reconciliación existe para reconocer pagos que el
    // webhook perdió. Degradaciones (cancelled/pending) llegan por webhook;
    // escribir aquí un snapshot no-vivo podría pisar un 'active' recién
    // escrito por el webhook durante la ventana de lectura.
    const ranked = Array.from(found.values()).sort((a, b) => (b.created || 0) - (a.created || 0));
    const preferred = ranked.find((sub) => LIVE_SUBSCRIPTION_STATUSES.includes(sub.status));
    if (!preferred) return false;

    await syncSubscription(preferred, normalizedPhone);
    console.log(`Reconciliación Stripe para ${normalizedPhone}: subscription ${preferred.id} (${preferred.status})`);
    return true;
  })();

  try {
    const result = await Promise.race([work, deadline]);
    if (result === 'timeout') {
      console.warn(`Reconciliación Stripe para ${normalizedPhone} excedió 12s; responde sin esperar.`);
      work.catch(() => undefined);
      return false;
    }
    return result;
  } catch (error) {
    console.error(`Reconciliación Stripe falló para ${normalizedPhone}:`, error);
    // No dejar el throttle puesto tras un error: permitir reintento inmediato.
    reconcileLastAttempt.delete(normalizedPhone);
    return false;
  } finally {
    if (deadlineTimer) clearTimeout(deadlineTimer);
  }
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
