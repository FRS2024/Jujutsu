# Jujutsu

Jujutsu is a developer-first AppSec SaaS inspired by unified security platforms. The first build targets a credible MVP wedge: connect GitHub, scan repositories for vulnerable dependencies and secrets, triage prioritized findings, and export customer-ready reports.

## Stack

- **TanStack Start** for the full-stack React application and routing
- **Convex** for multi-tenant product data, scan state, findings, reports, and audit logs
- **Clerk** for authentication, organizations, roles, and invitations
- **Stripe** for subscriptions, checkout, and billing portal workflows

## Product modules

1. **Jujutsu Code** — SCA, secret detection, lightweight SAST, GitHub workflow automation.
2. **Jujutsu Attack** — safe DAST, API scanning, authenticated crawling, and retesting.
3. **Jujutsu Cloud** — CSPM expansion for AWS, containers, and cloud posture checks.
4. **Jujutsu Reports** — SOC 2-ready evidence, executive summaries, technical exports, and audit logs.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run convex:dev
npm run dev
```

Fill in Clerk, Convex, and Stripe values in `.env.local` before using authenticated or billing flows.

## Current implementation

- Marketing home page with product positioning, MVP journey, platform modules, and 90-day roadmap.
- App console preview for repository onboarding, scanner configuration, findings, and build milestones.
- Stripe-ready pricing page.
- Convex schema for organizations, memberships, integrations, repositories, targets, scans, findings, reports, and audit logs.
- Convex mutations/queries for organizations, scan queueing, findings triage, and billing status updates.

## Roadmap

### Phase 0 — SaaS foundation

- TanStack Start shell
- Clerk organization auth
- Convex schema and basic functions
- Stripe subscription foundation

### Phase 1 — GitHub + SCA MVP

- GitHub App installation
- Repository inventory
- Worker scan queue
- Dependency vulnerability matching

### Phase 2 — Secrets + SAST

- Secret detection rules
- Lightweight static-analysis rules
- Finding fingerprints and deduplication
- Risk acceptance and false-positive workflows

### Phase 3 — Reports + beta readiness

- PDF/CSV exports
- Slack critical alerts
- Billing gates
- Private beta polish
