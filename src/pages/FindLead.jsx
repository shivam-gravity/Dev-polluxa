import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FindLead = () => (
  <div className="find-lead-page">
    <section className="section section-light" style={{ paddingBottom: '3rem' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Find Lead</span>
        <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
          Agentic prospecting. <em>Natural language to pipeline.</em>
        </h1>
        <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)', lineHeight: '1.6' }}>
          Turn a conversational brief into a ranked pipeline of buyers. Search across 5M+ verified profiles while monitoring 42 live intent signals.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Start prospecting free <ArrowRight size={18} className="btn-icon" />
          </a>
          <Link to="/contact" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>Book a demo</Link>
        </div>
      </div>
    </section>

    <section className="section section-alt" style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="grid-3" style={{ textAlign: 'center' }}>
          {[['5M+', 'Verified contacts'], ['42', 'Live intent sources'], ['98.6%', 'Email deliverability']].map(([v, l]) => (
            <div key={l}><h3 style={{ fontSize: '2.75rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>{v}</h3><p style={{ color: 'var(--muted)', fontWeight: '500' }}>{l}</p></div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-light">
      <div className="container" style={{ maxWidth: '720px' }}>
        <div style={{ background: 'var(--panel)', border: '1px solid var(--color-border)', borderRadius: '1rem', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ background: 'var(--panel-2)', borderRadius: '0.5rem', padding: '0.75rem 1rem', fontStyle: 'italic', color: 'var(--muted)', marginBottom: '1.5rem', border: '1px solid var(--color-border)' }}>
            "B2B SaaS CMOs in Riyadh raising Series A"
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[['Sarah Al-Rashidi', 'CMO · Riyadh · Series A · $8M raised', '94'], ['Mohammed Khalid', 'VP Marketing · Jeddah · Series A · $12M raised', '91'], ['Fatima Nour', 'Chief Marketing Officer · Riyadh · Series B · $22M raised', '88']].map(([name, desc, score]) => (
              <div key={name} style={{ background: 'var(--panel-2)', padding: '0.75rem 1rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ display: 'block' }}>{name}</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{desc}</span>
                </div>
                <span style={{ background: parseInt(score) >= 90 ? '#dcfce7' : '#fef9c3', color: parseInt(score) >= 90 ? '#16a34a' : '#854d0e', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold' }}>{score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="section section-alt">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2>Four core capabilities.</h2>
        </div>
        <div className="grid-2">
          {[
            ['🗣️', 'Natural-Language Search', 'Type a brief like "B2B SaaS CMOs in Riyadh raising Series A" — no filters, no boolean strings.'],
            ['⚡', 'Live Intent Signals', '42 signal sources: hiring spikes, funding rounds, leadership changes, tech stack shifts — ranked by freshness.'],
            ['🎯', 'Agentic Lead Scoring', 'Fit + intent + timing combined into explainable 0–100 scores with full audit trails.'],
            ['🔗', 'One-Click Sync', 'Push to Polluxa CRM, HubSpot, Salesforce, or Pipedrive in one click. SOC-2, GDPR, PDPL compliant.'],
          ].map(([ico, h, p]) => (
            <div key={h} className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{ico}</div>
              <h4>{h}</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-light" style={{ borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
        <h2>Start prospecting in minutes.</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>Free for 3 years. No credit card required.</p>
        <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          Get started free <ArrowRight size={18} className="btn-icon" />
        </a>
      </div>
    </section>
  </div>
);

export default FindLead;
