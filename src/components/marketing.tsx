import { Link } from '@tanstack/react-router';
import { ArrowRight, CheckCircle2, Github, Shield } from 'lucide-react';
import { metrics, modules, roadmap } from '@/lib/product';

export function MarketingHome() {
  return (
    <main>
      <section className="hero">
        <div className="eyebrow">TanStack Start + Convex + Clerk + Stripe</div>
        <h1>Find, fix, and prove your software security posture.</h1>
        <p className="hero-copy">
          Jujutsu is an AppSec SaaS starter for GitHub-connected security scanning, prioritized findings,
          remediation workflows, billing, and compliance-ready reporting.
        </p>
        <div className="hero-actions">
          <Link to="/app" className="button primary">Open app console <ArrowRight size={18} /></Link>
          <Link to="/pricing" className="button secondary">View pricing</Link>
        </div>
        <div className="metric-grid">
          {metrics.map((metric) => (
            <div className="metric-card" key={metric.label}>
              <metric.icon size={20} />
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Platform modules</p>
          <h2>Start narrow, expand into a unified security cockpit.</h2>
        </div>
        <div className="module-grid">
          {modules.map((module) => (
            <article className="module-card" key={module.name}>
              <div className="module-icon"><module.icon size={24} /></div>
              <span className="status-pill">{module.status}</span>
              <h3>{module.name}</h3>
              <p>{module.description}</p>
              <ul>
                {module.capabilities.map((capability) => (
                  <li key={capability}><CheckCircle2 size={16} />{capability}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section split">
        <div>
          <p className="eyebrow">MVP journey</p>
          <h2>From GitHub install to customer-ready report.</h2>
          <p>
            The first release focuses on a credible code-security wedge: connect GitHub, import repositories,
            run SCA and secret scans, triage findings, and export evidence for customers or auditors.
          </p>
        </div>
        <div className="journey-card">
          {['Create organization', 'Install GitHub App', 'Run first scan', 'Triage critical issues', 'Export report'].map((step, index) => (
            <div className="journey-step" key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">90-day roadmap</p>
          <h2>Build the Aikido-inspired core without over-scoping the first release.</h2>
        </div>
        <div className="roadmap-grid">
          {roadmap.map((item) => (
            <article className="roadmap-card" key={item.phase}>
              <span>{item.phase} · {item.horizon}</span>
              <h3>{item.title}</h3>
              <ul>
                {item.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-card">
        <div>
          <Shield size={36} />
          <h2>Ready for the first implementation sprint?</h2>
          <p>The scaffold includes the product dashboard, Convex data model, Clerk integration points, and Stripe billing hooks.</p>
        </div>
        <Link to="/app" className="button primary"><Github size={18} /> Connect GitHub</Link>
      </section>
    </main>
  );
}
