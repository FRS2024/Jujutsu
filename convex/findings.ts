import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const listByOrganization = query({
  args: {
    organizationId: v.id('organizations'),
    status: v.optional(v.union(v.literal('open'), v.literal('triaged'), v.literal('fixed'), v.literal('ignored'), v.literal('accepted_risk'), v.literal('false_positive'))),
  },
  handler: async (ctx, args) => {
    const base = args.status
      ? ctx.db.query('findings').withIndex('by_org_status', (q) => q.eq('organizationId', args.organizationId).eq('status', args.status!))
      : ctx.db.query('findings').withIndex('by_org_status', (q) => q.eq('organizationId', args.organizationId));

    return await base.order('desc').take(100);
  },
});

export const updateStatus = mutation({
  args: {
    findingId: v.id('findings'),
    status: v.union(v.literal('open'), v.literal('triaged'), v.literal('fixed'), v.literal('ignored'), v.literal('accepted_risk'), v.literal('false_positive')),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Authentication required');

    const finding = await ctx.db.get(args.findingId);
    if (!finding) throw new Error('Finding not found');

    await ctx.db.patch(args.findingId, { status: args.status });
    await ctx.db.insert('auditLogs', {
      organizationId: finding.organizationId,
      actorUserId: identity.subject,
      action: 'finding.status_updated',
      targetType: 'finding',
      targetId: args.findingId,
      metadata: { status: args.status },
      createdAt: Date.now(),
    });
  },
});
