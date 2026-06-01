import { v } from 'convex/values';
import { internalMutation } from './_generated/server';

export const applyStripeSubscriptionUpdate = internalMutation({
  args: {
    stripeCustomerId: v.string(),
    plan: v.union(v.literal('free'), v.literal('pro'), v.literal('team'), v.literal('enterprise')),
    billingStatus: v.union(v.literal('none'), v.literal('trialing'), v.literal('active'), v.literal('past_due'), v.literal('cancelled')),
  },
  handler: async (ctx, args) => {
    const organization = await ctx.db
      .query('organizations')
      .withIndex('by_stripe_customer_id', (q) => q.eq('stripeCustomerId', args.stripeCustomerId))
      .unique();

    if (!organization) return null;

    await ctx.db.patch(organization._id, {
      plan: args.plan,
      billingStatus: args.billingStatus,
      updatedAt: Date.now(),
    });

    return organization._id;
  },
});
