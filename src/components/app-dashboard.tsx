import { Bell, CheckCircle2, CircleDollarSign, Github, PlayCircle, Settings, ShieldAlert } from 'lucide-react';
import { findingsPreview, roadmap } from '@/lib/product';

const severityClass: Record<string, string> = {
  Critical: 'sev critical',
  High: 'sev high',
  Medium: 'sev medium',
  Low: 'sev low',
};

export function AppDashboard() {
  return (
    <main className="app-layout">
      <aside className="sidebar">
        <div className="brand-mark">柔</div>
        <nav>
          {['Dashboard', 'Repositories', 'Findings', 'Reports', 'Integrations', 'Billing', 'Settings'].map((item) => (
            <a href={`#${item.toLowerCase()}`} key={item}>{item}</a>
          ))}
        </nav>
      </aside>

      <section className="console">
        <header className="console-header">
          <div>
            <p className="eyebrow">Private beta console</p>
            <h1>Security cockpit</h1>
          </div>
          <button className="button primary"><PlayCircle size={18} /> Start scan</button>
        </header>

        <div className="setup-grid">
          <SetupCard icon={Github} title="Connect GitHub" description="Install the Jujutsu GitHub App and select repositories for scanning." state="Ready" />
          <SetupCard icon={ShieldAlert} title="Configure scanners" description="Enable SCA, secrets, SAST, and safe DAST modules per environment." state="Draft" />
          <SetupCard icon={CircleDollarSign} title="Activate billing" description="Stripe subscription and billing portal hooks are wired for Pro launch." state="Test mode" />
          <SetupCard icon={Bell} title="Route alerts" description="Send critical findings to email now, Slack and Jira in the next sprint." state="Planned" />
        </div>

        <section className="panel" id="findings">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Prioritized risk</p>
              <h2>Findings preview</h2>
            </div>
            <span className="status-pill">Convex-backed model</span>
          </div>
          <div className="table">
            <div className="table-row table-head"><span>Severity</span><span>Finding</span><span>Source</span><span>Owner</span><span>Status</span></div>
            {findingsPreview.map((finding) => (
              <div className="table-row" key={finding.title}>
                <span><span className={severityClass[finding.severity]}>{finding.severity}</span></span>
                <strong>{finding.title}</strong>
                <span>{finding.source}</span>
                <span>{finding.owner}</span>
                <span>{finding.state}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel" id="repositories">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Implementation plan</p>
              <h2>Next build milestones</h2>
            </div>
            <Settings size={22} />
          </div>
          <div className="milestone-list">
            {roadmap.map((item) => (
              <div className="milestone" key={item.phase}>
                <CheckCircle2 size={20} />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.horizon}: {item.outcomes.join(' · ')}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

type SetupCardProps = {
  icon: typeof Github;
  title: string;
  description: string;
  state: string;
};

function SetupCard({ icon: Icon, title, description, state }: SetupCardProps) {
  return (
    <article className="setup-card">
      <div className="module-icon"><Icon size={22} /></div>
      <span className="status-pill">{state}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
