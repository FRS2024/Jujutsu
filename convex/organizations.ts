import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const upsertCurrentOrganization = mutation({
  args: {
    clerkOrgId: v.string(),
    name: v.string(),
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Authentication required');

    const now = Date.now();
    const existing = await ctx.db
      .query('organizations')
      .withIndex('by_clerk_org_id', (q) => q.eq('clerkOrgId', args.clerkOrgId))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, { name: args.name, slug: args.slug, updatedAt: now });
      return existing._id;
    }

    const organizationId = await ctx.db.insert('organizations', {
      clerkOrgId: args.clerkOrgId,
      name: args.name,
      slug: args.slug,
      plan: 'free',
      billingStatus: 'none',
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert('memberships', {
      organizationId,
      clerkUserId: identity.subject,
      role: 'owner',
      createdAt: now,
    });

    await ctx.db.insert('auditLogs', {
      organizationId,
      actorUserId: identity.subject,
      action: 'organization.created',
      targetType: 'organization',
      targetId: organizationId,
      createdAt: now,
    });

    return organizationId;
  },
});

export const getByClerkOrgId = query({
  args: { clerkOrgId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('organizations')
      .withIndex('by_clerk_org_id', (q) => q.eq('clerkOrgId', args.clerkOrgId))
      .unique();
  },
});
