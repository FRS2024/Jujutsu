import Stripe from 'stripe';

export function getStripe() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) throw new Error('STRIPE_SECRET_KEY is required');

  return new Stripe(apiKey, {
    appInfo: {
      name: 'Jujutsu',
      version: '0.1.0',
      url: 'https://jujutsu.security',
    },
  });
}

export const planFromPriceId = (priceId?: string) => {
  if (!priceId) return 'free';
  if (priceId === process.env.STRIPE_PRO_PRICE_ID) return 'pro';
  return 'team';
};
