import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

const severity = v.union(v.literal('critical'), v.literal('high'), v.literal('medium'), v.literal('low'), v.literal('info'));
const findingStatus = v.union(v.literal('open'), v.literal('triaged'), v.literal('fixed'), v.literal('ignored'), v.literal('accepted_risk'), v.literal('false_positive'));
const scanStatus = v.union(v.literal('queued'), v.literal('running'), v.literal('completed'), v.literal('failed'), v.literal('cancelled'));

export default defineSchema({
  organizations: defineTable({
    clerkOrgId: v.string(),
    name: v.string(),
    slug: v.string(),
    plan: v.union(v.literal('free'), v.literal('pro'), v.literal('team'), v.literal('enterprise')),
    billingStatus: v.union(v.literal('none'), v.literal('trialing'), v.literal('active'), v.literal('past_due'), v.literal('cancelled')),
    stripeCustomerId: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index('by_clerk_org_id', ['clerkOrgId']).index('by_stripe_customer_id', ['stripeCustomerId']),

  memberships: defineTable({
    organizationId: v.id('organizations'),
    clerkUserId: v.string(),
    role: v.union(v.literal('owner'), v.literal('admin'), v.literal('security'), v.literal('developer'), v.literal('auditor')),
    createdAt: v.number(),
  }).index('by_org', ['organizationId']).index('by_user', ['clerkUserId']),

  integrations: defineTable({
    organizationId: v.id('organizations'),
    type: v.union(v.literal('github'), v.literal('slack'), v.literal('jira'), v.literal('linear'), v.literal('aws'), v.literal('stripe')),
    status: v.union(v.literal('draft'), v.literal('connected'), v.literal('error'), v.literal('disabled')),
    externalId: v.optional(v.string()),
    encryptedCredentialsRef: v.optional(v.string()),
    metadata: v.optional(v.any()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index('by_org_type', ['organizationId', 'type']),

  repositories: defineTable({
    organizationId: v.id('organizations'),
    provider: v.union(v.literal('github')),
    providerRepoId: v.string(),
    name: v.string(),
    fullName: v.string(),
    defaultBranch: v.string(),
    visibility: v.union(v.literal('private'), v.literal('public'), v.literal('internal')),
    selectedForScanning: v.boolean(),
    lastScanAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index('by_org', ['organizationId']).index('by_provider_repo_id', ['providerRepoId']),

  targets: defineTable({
    organizationId: v.id('organizations'),
    url: v.string(),
    type: v.union(v.literal('web'), v.literal('api')),
    verificationStatus: v.union(v.literal('unverified'), v.literal('pending'), v.literal('verified'), v.literal('failed')),
    authMode: v.union(v.literal('none'), v.literal('basic'), v.literal('form'), v.literal('header'), v.literal('recorded_session')),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index('by_org', ['organizationId']),

  scans: defineTable({
    organizationId: v.id('organizations'),
    repositoryId: v.optional(v.id('repositories')),
    targetId: v.optional(v.id('targets')),
    type: v.union(v.literal('sca'), v.literal('secrets'), v.literal('sast'), v.literal('dast'), v.literal('api'), v.literal('cloud')),
    status: scanStatus,
    workerId: v.optional(v.string()),
    artifactUrl: v.optional(v.string()),
    summary: v.optional(v.any()),
    startedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
    createdAt: v.number(),
  }).index('by_org', ['organizationId']).index('by_repository', ['repositoryId']).index('by_status', ['status']),

  findings: defineTable({
    organizationId: v.id('organizations'),
    scanId: v.id('scans'),
    source: v.union(v.literal('sca'), v.literal('secrets'), v.literal('sast'), v.literal('dast'), v.literal('api'), v.literal('cloud')),
    category: v.string(),
    severity,
    title: v.string(),
    description: v.string(),
    evidence: v.optional(v.string()),
    filePath: v.optional(v.string()),
    lineStart: v.optional(v.number()),
    lineEnd: v.optional(v.number()),
    packageName: v.optional(v.string()),
    installedVersion: v.optional(v.string()),
    fixedVersion: v.optional(v.string()),
    cve: v.optional(v.string()),
    cwe: v.optional(v.string()),
    cvss: v.optional(v.number()),
    epss: v.optional(v.number()),
    status: findingStatus,
    fingerprint: v.string(),
    firstSeenAt: v.number(),
    lastSeenAt: v.number(),
  }).index('by_org_status', ['organizationId', 'status']).index('by_scan', ['scanId']).index('by_fingerprint', ['fingerprint']),

  reports: defineTable({
    organizationId: v.id('organizations'),
    type: v.union(v.literal('executive'), v.literal('technical'), v.literal('pentest'), v.literal('soc2')),
    status: v.union(v.literal('queued'), v.literal('generating'), v.literal('ready'), v.literal('failed')),
    periodStart: v.number(),
    periodEnd: v.number(),
    artifactUrl: v.optional(v.string()),
    createdAt: v.number(),
  }).index('by_org', ['organizationId']),

  auditLogs: defineTable({
    organizationId: v.id('organizations'),
    actorUserId: v.string(),
    action: v.string(),
    targetType: v.string(),
    targetId: v.optional(v.string()),
    metadata: v.optional(v.any()),
    createdAt: v.number(),
  }).index('by_org', ['organizationId']),
});
