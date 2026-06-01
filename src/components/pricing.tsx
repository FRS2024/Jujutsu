import { CheckCircle2 } from 'lucide-react';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    description: 'For founders validating the security loop.',
    features: ['3 repositories', 'Weekly SCA scans', 'Secret detection preview', 'Community support'],
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'For startups preparing for customer security reviews.',
    features: ['Unlimited private repos', 'Daily scans', 'PDF and CSV reports', 'Slack critical alerts'],
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$99',
    description: 'For engineering teams that need workflow automation.',
    features: ['PR comments', 'Jira/Linear routing', 'Authenticated DAST beta', 'Auditor read-only access'],
  },
];

export function PricingPage() {
  return (
    <main className="section pricing-page">
      <div className="section-heading">
        <p className="eyebrow">Stripe-ready pricing</p>
        <h1>Simple plans that scale from MVP to team rollout.</h1>
        <p>Use Stripe Checkout for conversion and the Billing Portal for subscription self-service.</p>
      </div>
      <div className="pricing-grid">
        {tiers.map((tier) => (
          <article className={tier.highlighted ? 'pricing-card highlighted' : 'pricing-card'} key={tier.name}>
            <h2>{tier.name}</h2>
            <p>{tier.description}</p>
            <div className="price"><strong>{tier.price}</strong><span>/ seat / month</span></div>
            <button className={tier.highlighted ? 'button primary' : 'button secondary'}>{tier.name === 'Free' ? 'Start free' : 'Start checkout'}</button>
            <ul>
              {tier.features.map((feature) => <li key={feature}><CheckCircle2 size={16} />{feature}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </main>
  );
}
