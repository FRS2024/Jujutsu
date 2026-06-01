import { AlertTriangle, Bot, Cloud, Code2, FileCheck2, Github, LockKeyhole, Radar, ShieldCheck, Sparkles } from 'lucide-react';

export const modules = [
  {
    name: 'Jujutsu Code',
    status: 'MVP build track',
    icon: Code2,
    description: 'GitHub-connected SCA, secret detection, and lightweight SAST for developer teams.',
    capabilities: ['Dependency CVE matching', 'Secret fingerprints', 'Rule-based SAST', 'GitHub issues and PR comments'],
  },
  {
    name: 'Jujutsu Attack',
    status: 'Next track',
    icon: Radar,
    description: 'Safe DAST and API security scans with domain verification and evidence capture.',
    capabilities: ['Security headers', 'Authenticated crawl beta', 'OpenAPI fuzzing', 'Retest workflow'],
  },
  {
    name: 'Jujutsu Cloud',
    status: 'Expansion track',
    icon: Cloud,
    description: 'CSPM-style posture checks for AWS, containers, and Kubernetes after core AppSec traction.',
    capabilities: ['Public exposure checks', 'IAM risk', 'Resource inventory', 'Attack paths'],
  },
  {
    name: 'Jujutsu Reports',
    status: 'MVP build track',
    icon: FileCheck2,
    description: 'SOC 2-ready evidence, executive summaries, and technical remediation exports.',
    capabilities: ['PDF reports', 'CSV export', 'Audit logs', 'Read-only auditor role'],
  },
];

export const roadmap = [
  {
    phase: 'Phase 0',
    horizon: 'Weeks 1-2',
    title: 'SaaS foundation',
    outcomes: ['TanStack Start shell', 'Clerk org auth', 'Convex schema', 'Stripe subscriptions'],
  },
  {
    phase: 'Phase 1',
    horizon: 'Weeks 3-6',
    title: 'GitHub + SCA MVP',
    outcomes: ['GitHub App install', 'Repository inventory', 'Worker scan queue', 'Dependency findings'],
  },
  {
    phase: 'Phase 2',
    horizon: 'Weeks 7-10',
    title: 'Secrets + SAST',
    outcomes: ['Secret detection', 'Semgrep-style rule runner', 'Finding dedupe', 'Risk acceptance'],
  },
  {
    phase: 'Phase 3',
    horizon: 'Weeks 11-12',
    title: 'Reports + beta readiness',
    outcomes: ['PDF/CSV export', 'Slack alerts', 'Billing gates', 'Private beta polish'],
  },
];

export const metrics = [
  { label: 'Time to first scan', value: '< 5 min', icon: Sparkles },
  { label: 'MVP scanner tracks', value: '3', icon: ShieldCheck },
  { label: 'Beta-ready modules', value: '4', icon: LockKeyhole },
  { label: 'Critical alert SLA', value: 'Real-time', icon: AlertTriangle },
];

export const findingsPreview = [
  { severity: 'Critical', title: 'Leaked Stripe secret key', source: 'Secrets', owner: 'payments-api', state: 'Open' },
  { severity: 'High', title: 'Prototype pollution in dependency tree', source: 'SCA', owner: 'web-app', state: 'Triaged' },
  { severity: 'Medium', title: 'Missing Content-Security-Policy header', source: 'DAST', owner: 'marketing-site', state: 'Queued' },
  { severity: 'Low', title: 'Verbose server banner exposed', source: 'DAST', owner: 'api-gateway', state: 'Accepted risk' },
];
