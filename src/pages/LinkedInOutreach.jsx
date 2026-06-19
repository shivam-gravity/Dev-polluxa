import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const LinkedInOutreach = () => (
  <div className="linkedin-page">
    <section className="section section-light" style={{ paddingBottom: '3rem' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>★ LinkedIn Outreach · #1 Channel</span>
        <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
          LinkedIn outreach that <em>actually converts.</em>
        </h1>
        <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)', lineHeight: '1.6' }}>
          The most effective LinkedIn engine on the market. Profile-safe connection sequences, AI-personalized DMs, social-selling pre-touches and intent triggers powered by Luna Kelper.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Launch your LinkedIn engine <ArrowRight size={18} className="btn-icon" />
          </a>
          <Link to="/contact" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>Book a demo</Link>
        </div>
      </div>
    </section>

    <section className="section section-alt" style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="grid-5" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[['38%', 'Accept rate'], ['14%', 'Reply rate'], ['4.2×', 'vs SDR-only'], ['0', 'Profile flags (2yr)'], ['9,400', 'Active profiles']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center', flex: '1', minWidth: '120px' }}><h3 style={{ fontSize: '2.25rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>{v}</h3><p style={{ color: 'var(--muted)', fontWeight: '500', fontSize: '0.875rem' }}>{l}</p></div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-light">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2>Six LinkedIn capabilities.</h2>
        </div>
        <div className="grid-3">
          {[
            ['🤝', 'Connection Sequences', 'Personalized at scale — AI writes each note using company signals, shared connections, and role context.'],
            ['💬', 'DM & InMail Journeys', 'Threaded, intent-aware — continues the conversation based on what they clicked, viewed, or posted.'],
            ['👍', 'Social Selling', 'Pre-touch with likes, comments, and views before any connection request — warms the account up.'],
            ['⚡', 'Intent Detection', 'Powered by Luna Kelper — tracks when targets post about pain points or engage with competitors.'],
            ['🛡️', 'Profile-Safe Limits', 'Per-account, per-day throttling that mirrors human behavior. Zero flags across 9,400 active profiles.'],
            ['📥', 'Multi-Account Inbox', 'Team-level orchestration — all inboxes, all accounts, one unified reply interface.'],
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

    <section className="section section-alt" style={{ borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
        <h2>Set up your LinkedIn engine in 30 minutes.</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>Free for 3 years. Zero profile flags guaranteed.</p>
        <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          Launch LinkedIn engine <ArrowRight size={18} className="btn-icon" />
        </a>
      </div>
    </section>
  </div>
);

export default LinkedInOutreach;
