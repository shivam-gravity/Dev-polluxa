import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const SignalAggregation = () => (
  <div className="signal-page">
    <section className="section section-light" style={{ paddingBottom: '3rem' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Signal Aggregation</span>
        <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
          42 intent signals. <em>Ranked before your team wakes up.</em>
        </h1>
        <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)', lineHeight: '1.6' }}>
          Polluxa tracks 42 signal sources that predict buying intent, deduplicating and ranking leads in real time by freshest, highest-fit signals.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Activate signals <ArrowRight size={18} className="btn-icon" />
          </a>
          <Link to="/contact" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>Book a walkthrough</Link>
        </div>
      </div>
    </section>

    <section className="section section-alt" style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="grid-4" style={{ textAlign: 'center' }}>
          {[['42', 'Signal sources'], ['<90s', 'Signal-to-CRM latency'], ['3.4×', 'Higher reply rate'], ['318', 'Duplicates auto-merged']].map(([v, l]) => (
            <div key={l}><h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>{v}</h3><p style={{ color: 'var(--muted)', fontWeight: '500' }}>{l}</p></div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-light">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2>Eight signal categories.</h2>
        </div>
        <div className="grid-4">
          {[
            ['📢', 'Hiring Signals', '9 feeds covering 18M jobs — growth, role types, tech stack hiring.'],
            ['💰', 'Funding Events', '6 feeds with daily updates — Series A through IPO.'],
            ['🌐', 'Web Visitor Intent', 'De-anonymized visits and page tracking — who visited /pricing.'],
            ['⚙️', 'Tech-Stack Shifts', '4,200+ stacks monitored for new installs and removals.'],
            ['🏢', 'Office & Geo Moves', 'Expansion tracking via filings and press.'],
            ['💼', 'LinkedIn Activity', 'Posts, comments, engagement from target accounts.'],
            ['👤', 'Job Changes', 'Daily promotions and transitions — champion moves.'],
            ['📰', 'News & PR', '1,200+ source coverage — launches, partnerships, wins.'],
          ].map(([ico, h, p]) => (
            <div key={h} className="card">
              <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{ico}</div>
              <h4 style={{ fontSize: '1rem' }}>{h}</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-alt">
      <div className="container" style={{ maxWidth: '720px' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Live signal feed</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            ['💰', 'Acme Corp raised $12M Series A', 'Funding · 2h ago', '94'],
            ['📢', 'TechFlow hiring 4 SDRs in Dubai', 'Hiring · 3h ago', '88'],
            ['🌐', 'Nexus visited /pricing · 3 pages', 'Web intent · 15m ago', '91'],
            ['👤', 'Ahmed Al-Farsi promoted to VP Sales at Orbit', 'Job change · 1h ago', '85'],
          ].map(([ico, title, meta, score]) => (
            <div key={title} style={{ background: 'var(--panel)', border: '1px solid var(--color-border)', padding: '0.75rem 1rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span style={{ fontSize: '1.25rem' }}>{ico}</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem' }}>{title}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{meta}</span>
                </div>
              </div>
              <span style={{ background: parseInt(score) >= 90 ? '#dcfce7' : '#fef9c3', color: parseInt(score) >= 90 ? '#16a34a' : '#854d0e', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold' }}>{score}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-light" style={{ borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
        <h2>Never miss a buying signal again.</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>Free for 3 years. Signals live in under 90 seconds.</p>
        <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          Activate signals free <ArrowRight size={18} className="btn-icon" />
        </a>
      </div>
    </section>
  </div>
);

export default SignalAggregation;
