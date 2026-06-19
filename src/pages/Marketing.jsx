import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Marketing = () => (
  <div className="marketing-page">
    <section className="section section-light" style={{ paddingBottom: '3rem' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Marketing</span>
        <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
          Plans into pipeline. <em>Agentic campaigns at scale.</em>
        </h1>
        <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)', lineHeight: '1.6' }}>
          Omnichannel campaigns across WhatsApp, Email, Meta and Google with built-in segmentation, journey orchestration and full-funnel attribution.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Get Agent CRM — Free <ArrowRight size={18} className="btn-icon" />
          </a>
          <Link to="/contact" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>Talk to marketing team</Link>
        </div>
      </div>
    </section>

    <section className="section section-alt" style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="grid-4" style={{ textAlign: 'center' }}>
          {[['412K', 'Messages sent (30d)'], ['14.2%', 'Reply rate'], ['$1.48M', 'Pipeline generated'], ['$84', 'CAC']].map(([v, l]) => (
            <div key={l}><h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>{v}</h3><p style={{ color: 'var(--muted)', fontWeight: '500' }}>{l}</p></div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-light">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2>Six marketing modules.</h2>
        </div>
        <div className="grid-3">
          {[
            ['📋', 'Campaigns', 'Plan and manage marketing initiatives with goal-setting, owner assignment, and performance tracking.'],
            ['📨', 'Email & WhatsApp', 'Two-way outreach automation with AI personalization and reply routing.'],
            ['📄', 'Templates', 'Pre-built, versioned campaign templates for emails, flows, and landing pages.'],
            ['📝', 'Forms', 'Drag-and-drop lead capture with conditional logic and instant CRM sync.'],
            ['📱', 'Meta Ads', 'Account connection and lead piping with performance monitoring and revenue attribution.'],
            ['🔍', 'Google Ads', 'Search and Performance Max campaign management with full-funnel attribution.'],
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

    <section className="section section-alt">
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
          <div>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)', fontSize: '0.875rem' }}>Journey Builder</span>
            <h2 style={{ marginTop: '0.5rem' }}>Visual multi-channel canvas.</h2>
            <p style={{ color: 'var(--muted)', margin: '1.5rem 0' }}>
              Triggers, conditions, waits, and AI-written messages — all on a drag-and-drop canvas. Build journeys that span WhatsApp, Email, Meta and Google without writing a line of code.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--color-text-primary)' }}>
              {['AI-built segments refreshing hourly — no SQL.', 'Revenue attribution breakdown by channel.', 'A/B test entire journeys, not just subject lines.', 'GDPR, PDPL compliant opt-in management.'].map(f => (
                <li key={f} style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>✓ {f}</li>
              ))}
            </ul>
          </div>
          <div style={{ background: 'var(--panel)', border: '1px solid var(--color-border)', borderRadius: '1rem', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
            <h4 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Revenue attribution · last 30 days</h4>
            {[['WhatsApp', '41%', '#25d366'], ['Email', '33%', '#3b82f6'], ['Google', '19%', '#f59e0b'], ['Meta', '7%', '#1877f2']].map(([ch, pct, col]) => (
              <div key={ch} style={{ marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  <span>{ch}</span><span style={{ fontWeight: '600' }}>{pct}</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '999px', height: '8px' }}>
                  <div style={{ background: col, borderRadius: '999px', height: '8px', width: pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="section section-light" style={{ borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
        <h2>Turn plans into pipeline.</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>Free for 3 years. No credit card required.</p>
        <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          Plan campaigns free <ArrowRight size={18} className="btn-icon" />
        </a>
      </div>
    </section>
  </div>
);

export default Marketing;
