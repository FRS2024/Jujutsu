import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const queueRepositoryScan = mutation({
  args: {
    organizationId: v.id('organizations'),
    repositoryId: v.id('repositories'),
    type: v.union(v.literal('sca'), v.literal('secrets'), v.literal('sast')),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Authentication required');

    const scanId = await ctx.db.insert('scans', {
      organizationId: args.organizationId,
      repositoryId: args.repositoryId,
      type: args.type,
      status: 'queued',
      createdAt: Date.now(),
    });

    await ctx.db.insert('auditLogs', {
      organizationId: args.organizationId,
      actorUserId: identity.subject,
      action: 'scan.queued',
      targetType: 'scan',
      targetId: scanId,
      metadata: { type: args.type, repositoryId: args.repositoryId },
      createdAt: Date.now(),
    });

    return scanId;
  },
});

export const recent = query({
  args: { organizationId: v.id('organizations') },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('scans')
      .withIndex('by_org', (q) => q.eq('organizationId', args.organizationId))
      .order('desc')
      .take(20);
  },
});
