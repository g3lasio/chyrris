#!/usr/bin/env node
import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_API_KEY;

if (!secretKey) {
  console.error('Missing STRIPE_SECRET_KEY or STRIPE_API_KEY.');
  console.error('Usage: STRIPE_SECRET_KEY=<temporary-stripe-secret-key> node scripts/setup-caymus-stripe-prices.mjs');
  process.exit(1);
}

const stripe = new Stripe(secretKey, { apiVersion: '2026-03-25.dahlia' });

const PRODUCT_LOOKUP_KEY = 'caymus_tanks_pro';
const MONTHLY_LOOKUP_KEY = 'caymus_tanks_pro_monthly_699';
const ANNUAL_LOOKUP_KEY = 'caymus_tanks_pro_annual_7549';

async function findProduct() {
  const products = await stripe.products.search({
    query: `metadata['lookup_key']:'${PRODUCT_LOOKUP_KEY}'`,
    limit: 1,
  });

  if (products.data[0]) return products.data[0];

  return stripe.products.create({
    name: 'Caymus Tanks Pro',
    description: 'Professional tank calculator access with subscription validation through Chyrris.',
    metadata: {
      lookup_key: PRODUCT_LOOKUP_KEY,
      app: 'caymus-tanks',
    },
  });
}

async function findPriceByLookupKey(lookupKey) {
  const prices = await stripe.prices.list({ lookup_keys: [lookupKey], limit: 1 });
  return prices.data[0] || null;
}

async function ensurePrice({ productId, lookupKey, unitAmount, interval, nickname }) {
  const existing = await findPriceByLookupKey(lookupKey);
  if (existing) return existing;

  return stripe.prices.create({
    product: productId,
    currency: 'usd',
    unit_amount: unitAmount,
    recurring: { interval },
    lookup_key: lookupKey,
    nickname,
    metadata: {
      app: 'caymus-tanks',
      planInterval: interval === 'year' ? 'year' : 'month',
    },
  });
}

const product = await findProduct();
const annual = await ensurePrice({
  productId: product.id,
  lookupKey: ANNUAL_LOOKUP_KEY,
  unitAmount: 7549,
  interval: 'year',
  nickname: 'Caymus Tanks Pro Annual - $75.49/year',
});
const monthly = await ensurePrice({
  productId: product.id,
  lookupKey: MONTHLY_LOOKUP_KEY,
  unitAmount: 699,
  interval: 'month',
  nickname: 'Caymus Tanks Pro Monthly - $6.99/month',
});

console.log('Caymus Tanks Stripe pricing is ready.');
console.log(`Product: ${product.id}`);
console.log(`Annual price: ${annual.id} ($75.49/year)`);
console.log(`Monthly price: ${monthly.id} ($6.99/month)`);
console.log('Set these Railway variables for Chyrris:');
console.log(`CAYMUS_STRIPE_ANNUAL_PRICE_ID=${annual.id}`);
console.log(`CAYMUS_STRIPE_MONTHLY_PRICE_ID=${monthly.id}`);
