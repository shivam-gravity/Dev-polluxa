import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    highlight: false,
    tokens: '50 AI tokens/mo',
    contacts: '5,000 contacts',
    features: ['Lead & deal management', 'Forms', 'Team management', 'Gmail / Outlook / Calendar', 'Dashboard', 'Community + email support'],
    cta: 'Get started free',
    href: 'https://sales.polluxa.com/',
  },
  {
    name: 'Starter',
    price: '$14',
    period: '/user/mo · billed yearly',
    highlight: false,
    tokens: '200 AI tokens/mo',
    contacts: '50,000 contacts',
    features: ['Everything in Free', 'CRM, Marketing, Sales, Data, Help Desk modules', 'Task management', 'Campaign management', 'Templates', 'Custom forms', 'Database search', 'Invoicing', 'Priority support'],
    cta: 'Start with Starter',
    href: 'https://sales.polluxa.com/',
  },
  {
    name: 'Professional',
    price: '$25',
    period: '/user/mo · billed yearly',
    highlight: true,
    badge: 'Most Popular',
    tokens: '400 AI tokens/mo',
    contacts: 'Unlimited contacts',
    features: ['Everything in Starter', 'All channels: LinkedIn, Email, WhatsApp, Meta Ads', 'Workflow automation', 'Meta / Google / SMTP integrations', 'SMS', 'Success manager'],
    cta: 'Go Professional',
    href: 'https://sales.polluxa.com/',
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/user/mo · billed yearly',
    highlight: false,
    tokens: '1,500 AI tokens/mo',
    contacts: 'Unlimited contacts',
    features: ['Everything in Professional', 'Agents + full Agentic Stack', 'GTM Engineer', 'LinkedIn, WhatsApp, Email agents', 'Agent workflows', 'VIBE Prospecting', 'ChatGPT integration', 'Phone support', 'Dedicated success manager'],
    cta: 'Talk to sales',
    href: '/contact',
    isInternal: true,
  },
];

const Pricing = () => (
  <div className="pricing-page">
    <section className="section section-light" style={{ paddingBottom: '3rem' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Pricing</span>
        <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
          Free to start. <em>Scales with your team.</em>
        </h1>
        <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)' }}>
          Every plan includes a free-forever tier. No credit card required to start.
        </p>
      </div>
    </section>

    <section className="section section-alt">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
          {plans.map((plan) => (
            <div key={plan.name} style={{ background: 'var(--panel)', border: plan.highlight ? '2px solid var(--cyan)' : '1px solid var(--line-strong)', borderRadius: '1rem', padding: '2rem', boxShadow: plan.highlight ? 'var(--shadow-lg)' : 'var(--shadow-sm)', position: 'relative' }}>
              {plan.badge && (
                <span style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--cyan)', color: '#fff', padding: '0.2rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{plan.badge}</span>
              )}
              <h3 style={{ marginBottom: '0.25rem', color: 'var(--ink)' }}>{plan.name}</h3>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary-color)' }}>{plan.price}</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--muted)' }}> {plan.period}</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>{plan.tokens}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>{plan.contacts}</div>
              {plan.isInternal ? (
                <Link to={plan.href} className="btn btn-primary" style={{ display: 'block', textAlign: 'center', padding: '0.75rem', marginBottom: '1.5rem' }}>{plan.cta}</Link>
              ) : (
                <a href={plan.href} className="btn btn-primary" style={{ display: 'block', textAlign: 'center', padding: '0.75rem', marginBottom: '1.5rem' }}>{plan.cta}</a>
              )}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ fontSize: '0.875rem', color: 'var(--muted)', padding: '0.4rem 0', borderBottom: '1px solid var(--line)', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#16a34a', fontWeight: 'bold', flexShrink: 0 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-light">
      <div className="container" style={{ maxWidth: '700px' }}>
        <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>AI Tokens</h3>
        <div className="card">
          <p style={{ color: 'var(--muted)', marginBottom: '1rem' }}>
            AI tokens are the universal currency for all AI actions in Polluxa — personalization, enrichment, agent tasks, workflow steps. Unused tokens roll over within your billing year on paid plans.
          </p>
          <div className="grid-3" style={{ gap: '1rem' }}>
            {[['1K tokens', '$50'], ['5K tokens', '$250'], ['25K tokens', '$1,250']].map(([pack, price]) => (
              <div key={pack} style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                <strong style={{ display: 'block' }}>{pack}</strong>
                <span style={{ color: 'var(--primary-color)', fontWeight: '600' }}>{price}</span>
              </div>
            ))}
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginTop: '1rem' }}>Additional tokens $0.05 each.</p>
        </div>
      </div>
    </section>

    <section className="section section-alt" style={{ borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
        <h2>Questions about pricing?</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>Talk to our team — we'll help you find the right plan for your team size and use case.</p>
        <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          Talk to sales <ArrowRight size={18} className="btn-icon" />
        </Link>
      </div>
    </section>
  </div>
);

export default Pricing;
