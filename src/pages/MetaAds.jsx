import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const MetaAds = () => (
  <div className="meta-ads-page">
    <section className="section section-light" style={{ paddingBottom: '3rem' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Meta Ads · FB · IG · WA</span>
        <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
          Meta ads, wired straight <em>to your pipeline.</em>
        </h1>
        <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)', lineHeight: '1.6' }}>
          Campaign manager, lookalike audiences from your CRM, lead forms synced in under 5 seconds, and revenue attribution tied to closed-won deals.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Connect Meta <ArrowRight size={18} className="btn-icon" />
          </a>
          <Link to="/contact" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>Book a session</Link>
        </div>
      </div>
    </section>

    <section className="section section-alt" style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="grid-3" style={{ textAlign: 'center' }}>
          {[['$84', 'CAC vs $142 industry avg'], ['3.2×', 'ROAS on warm audiences'], ['<5s', 'Lead form to CRM sync']].map(([v, l]) => (
            <div key={l}><h3 style={{ fontSize: '2.75rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>{v}</h3><p style={{ color: 'var(--muted)', fontWeight: '500' }}>{l}</p></div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-light">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2>Six Meta capabilities.</h2>
        </div>
        <div className="grid-3">
          {[
            ['📊', 'Campaign Manager', 'Create and manage Facebook, Instagram, and WhatsApp ads from a single unified interface.'],
            ['👥', 'Lookalike Audiences', 'Auto-pushes CRM segments to Meta with 24-hour refreshes — always fresh, always accurate.'],
            ['⚡', 'Instant Lead Sync', 'Forms populate CRM with enrichment in under 5 seconds. Zero manual export needed.'],
            ['💰', 'Revenue Attribution', 'Connects ad spend to closed-won deals — see true ROAS, not just MQL cost.'],
            ['🤖', 'AI Creative Suggestions', 'Analyzes top performers and proposes copy and creative variations automatically.'],
            ['💬', 'Click-to-WhatsApp Ads', 'Direct messaging integration — ad click opens a WhatsApp conversation with full CRM context.'],
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
        <h2>Meta ads that know your CRM.</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>Connect in minutes. Free for 3 years.</p>
        <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          Connect Meta free <ArrowRight size={18} className="btn-icon" />
        </a>
      </div>
    </section>
  </div>
);

export default MetaAds;
