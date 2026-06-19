import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Outreach = () => (
  <div className="outreach-page">
    <section className="section section-light" style={{ paddingBottom: '3rem' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Outreach</span>
        <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
          Email · WhatsApp · LinkedIn. <em>One canvas.</em>
        </h1>
        <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)', lineHeight: '1.6' }}>
          Multi-channel sequences with inbox-aware sending, AI personalization at the line level, and live deliverability tracking — built in.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Run your first sequence <ArrowRight size={18} className="btn-icon" />
          </a>
          <Link to="/contact" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>Book a walkthrough</Link>
        </div>
      </div>
    </section>

    <section className="section section-alt" style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="grid-4" style={{ textAlign: 'center' }}>
          {[['14.2%', 'Avg reply rate'], ['98.6%', 'Deliverability'], ['38%', 'LinkedIn accept rate'], ['62%', 'Open rate']].map(([v, l]) => (
            <div key={l}><h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>{v}</h3><p style={{ color: 'var(--muted)', fontWeight: '500' }}>{l}</p></div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-light">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2>Every channel. <em>One sequence builder.</em></h2>
        </div>
        <div className="grid-3">
          {[
            ['✉️', 'Email Sequences', 'Domain warm-up, per-mailbox throttling, SPF/DKIM/DMARC monitoring, spam-score checks before every send.'],
            ['💬', 'WhatsApp', 'Native Business API with templates, media, location sharing, two-way replies, and opt-in management.'],
            ['💼', 'LinkedIn', 'Connect, comment, DM — soft pre-touches before cold email to increase accept and reply rates.'],
            ['🤖', 'AI Personalization', 'Line-level rewriting customizes openers using company data, role signals, and CRM history.'],
            ['🧪', 'A/B Testing', 'Live, statistical testing of subject lines, hooks, CTAs, and channels with mid-run winner selection.'],
            ['📊', 'Reply Routing', 'Auto-classifies responses: interested, objection, unsubscribe, OOO — routes each appropriately.'],
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
        <h2>Start sequencing in 30 minutes.</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>Free for 3 years. No credit card required.</p>
        <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          Run your first sequence <ArrowRight size={18} className="btn-icon" />
        </a>
      </div>
    </section>
  </div>
);

export default Outreach;
