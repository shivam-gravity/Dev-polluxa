import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ContactEnrichment = () => (
  <div className="enrichment-page">
    <section className="section section-light" style={{ paddingBottom: '3rem' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Contact Enrichment</span>
        <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
          One name in. <em>12+ verified fields out.</em>
        </h1>
        <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)', lineHeight: '1.6' }}>
          Drop a name, email, or both. Get back triple-verified emails, mobile numbers, titles, and firmographics — refreshed every 24h.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Enrich free <ArrowRight size={18} className="btn-icon" />
          </a>
          <Link to="/contact" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>Book a demo</Link>
        </div>
      </div>
    </section>

    <section className="section section-alt" style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="grid-3" style={{ textAlign: 'center' }}>
          {[['12+', 'Fields per contact'], ['98.6%', 'Email deliverability'], ['<2s', 'Processing time']].map(([v, l]) => (
            <div key={l}><h3 style={{ fontSize: '2.75rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>{v}</h3><p style={{ color: 'var(--muted)', fontWeight: '500' }}>{l}</p></div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-light">
      <div className="container" style={{ maxWidth: '720px' }}>
        <div style={{ background: 'var(--panel)', border: '1px solid var(--color-border)', borderRadius: '1rem', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block', fontWeight: '600' }}>INPUT</span>
              <strong style={{ display: 'block', marginTop: '0.25rem' }}>sarah@acmecorp.com</strong>
            </div>
            <div style={{ background: '#dcfce7', padding: '1rem', borderRadius: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#16a34a', display: 'block', fontWeight: '600' }}>OUTPUT · 12 fields enriched</span>
              <strong style={{ display: 'block', marginTop: '0.25rem' }}>Sarah Al-Rashidi · CMO</strong>
            </div>
            {[['Title', 'Chief Marketing Officer'], ['Company', 'Acme Corp · Series A'], ['Mobile', '+971 50 xxx xxxx ✓'], ['LinkedIn', 'linkedin.com/in/sarah-ar'], ['Industry', 'B2B SaaS'], ['Revenue', '$5M–$10M ARR']].map(([k, v]) => (
              <div key={k} style={{ background: 'var(--panel-2)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--muted)', display: 'block' }}>{k}</span>
                <strong style={{ fontSize: '0.875rem' }}>{v}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="section section-alt">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2>Six enrichment layers.</h2>
        </div>
        <div className="grid-3">
          {[
            ['✉️', 'Email Verification', 'Three-stage: syntax check → MX record → mailbox ping with bounce flagging.'],
            ['📱', 'Mobile Validation', 'Real-time carrier check confirms the number is active and WhatsApp Business eligible — globally.'],
            ['🏢', 'Firmographics', '24+ fields: industry, revenue, funding stage, tech stack, geography — normalized.'],
            ['🗺️', 'Org Mapping', 'Identifies decision-makers with relationship strength scoring across buying committees.'],
            ['🔄', 'Daily Refresh', 'Records re-checked every 24h for job changes, title updates, and company transitions.'],
            ['🔌', 'Integrations', 'Native CRM, REST API, webhooks. HubSpot, Salesforce, Snowflake connectors built in.'],
          ].map(([ico, h, p]) => (
            <div key={h} className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{ico}</div>
              <h4>{h}</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-light" style={{ borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
        <h2>Stop emailing dead inboxes.</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>Free for 3 years. No credit card required.</p>
        <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          Enrich contacts free <ArrowRight size={18} className="btn-icon" />
        </a>
      </div>
    </section>
  </div>
);

export default ContactEnrichment;
