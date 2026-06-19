import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const DataModule = () => (
  <div className="data-page">
    <section className="section section-light" style={{ paddingBottom: '3rem' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Data</span>
        <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
          The truth layer <em>underneath your CRM.</em>
        </h1>
        <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)', lineHeight: '1.6' }}>
          Verified, enriched, deduped. 5M+ contacts and 5M companies — triple-verified emails, mobiles, and firmographics refreshed every 24h.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Get the data graph free <ArrowRight size={18} className="btn-icon" />
          </a>
          <Link to="/contact" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>Book a demo</Link>
        </div>
      </div>
    </section>

    <section className="section section-alt" style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="grid-4" style={{ textAlign: 'center' }}>
          {[['5M+', 'Verified contacts'], ['5M', 'Companies'], ['98.6%', 'Deliverability'], ['12.4K', 'Records enriched/24h']].map(([v, l]) => (
            <div key={l}><h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>{v}</h3><p style={{ color: 'var(--muted)', fontWeight: '500' }}>{l}</p></div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-light">
      <div className="container" style={{ maxWidth: '720px' }}>
        <div style={{ background: 'var(--panel)', border: '1px solid var(--color-border)', borderRadius: '1rem', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
            <strong>Data health · last 24h</strong>
            <span style={{ background: '#dcfce7', color: '#16a34a', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold' }}>Live</span>
          </div>
          <div className="grid-3" style={{ gap: '1rem' }}>
            {[['12.4K', 'Records enriched'], ['342', 'Bounces prevented'], ['86', 'Duplicates merged']].map(([v, l]) => (
              <div key={l} style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block' }}>{l}</span>
                <strong style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}>{v}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="section section-alt">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2>Three verification methods.</h2>
        </div>
        <div className="grid-3">
          {[
            ['✉️', 'SMTP Email Verification', 'Syntax check → MX record → mailbox ping. Bounces flagged before they hit your sender score.'],
            ['📱', 'HLR Mobile Checking', 'Real-time carrier lookup confirms numbers are active and WhatsApp Business eligible.'],
            ['💼', 'LinkedIn URL Matching', 'Cross-reference LinkedIn profiles to validate identity and enrich title and company data.'],
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

    <section className="section section-light">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2>Geographic coverage.</h2>
        </div>
        <div className="grid-4">
          {[['🇦🇪', 'UAE', '2.1M contacts · 84K companies'], ['🇸🇦', 'KSA', '3.4M contacts · 142K companies'], ['🇪🇬', 'Egypt', '1.8M contacts · 96K companies'], ['🌍', 'Global', '188M+ contacts · 18M+ companies']].map(([flag, country, data]) => (
            <div key={country} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>{flag}</div>
              <h4>{country}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{data}</p>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--muted)' }}>SOC-2 · GDPR · PDPL · Region-aware enrichment for UAE, KSA, and EU.</p>
      </div>
    </section>

    <section className="section section-alt" style={{ borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
        <h2>Get the verified, enriched contact graph your agents deserve.</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>Free for 3 years. No credit card required.</p>
        <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          Explore data free <ArrowRight size={18} className="btn-icon" />
        </a>
      </div>
    </section>
  </div>
);

export default DataModule;
