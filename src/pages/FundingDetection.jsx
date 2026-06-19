import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FundingDetection = () => (
  <div className="funding-page">
    <section className="section section-light" style={{ paddingBottom: '3rem' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Funding Detection</span>
        <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
          Catch every Series-A through IPO <em>within hours.</em>
        </h1>
        <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)', lineHeight: '1.6' }}>
          Ranked by ICP fit, with the buying committee mapped and outbound drafts ready to send — before your competitors even see the news.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Activate funding alerts <ArrowRight size={18} className="btn-icon" />
          </a>
          <Link to="/contact" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>Book a demo</Link>
        </div>
      </div>
    </section>

    <section className="section section-alt" style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="grid-3" style={{ textAlign: 'center' }}>
          {[['1,400+', 'Rounds tracked monthly'], ['< 6h', 'From filing to alert'], ['12.4×', 'Higher reply rate vs cold']].map(([v, l]) => (
            <div key={l}><h3 style={{ fontSize: '2.75rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>{v}</h3><p style={{ color: 'var(--muted)', fontWeight: '500' }}>{l}</p></div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-light">
      <div className="container" style={{ maxWidth: '720px' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Live funding alerts</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            ['Nexus Technologies', 'Series A · $14M · Dubai · B2B SaaS', '96', 'hot'],
            ['FreshSouk', 'Series B · $28M · Riyadh · F&B', '89', 'hot'],
            ['Orbit Payments', 'Seed · $3M · Cairo · Fintech', '76', 'warm'],
          ].map(([co, desc, score, heat]) => (
            <div key={co} style={{ background: 'var(--panel)', border: '1px solid var(--color-border)', padding: '1rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ display: 'block' }}>{co}</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{desc}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ background: heat === 'hot' ? '#dcfce7' : '#fef9c3', color: heat === 'hot' ? '#16a34a' : '#854d0e', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold', display: 'block' }}>{score} · {heat}</span>
                <button className="btn btn-primary" style={{ marginTop: '0.4rem', padding: '0.25rem 0.75rem', fontSize: '0.75rem', borderRadius: '4px' }}>Sequence now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-alt">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2>Six core capabilities.</h2>
        </div>
        <div className="grid-3">
          {[
            ['📡', '6 Feeds, Unified', 'Crunchbase, Pitchbook, TASE, public filings, press releases, and regulatory data — one stream.'],
            ['🎯', 'ICP Fit Scoring', 'Every round scored against your ICP — industry, geography, stage, size.'],
            ['👥', 'Buying Committee Mapping', 'CEO, CFO, COO, VP Sales identified with verified contact details ready to sequence.'],
            ['🚀', 'Outbound Triggers', 'Auto-generates congratulatory emails, WhatsApp, and LinkedIn touchpoints per round.'],
            ['🌍', 'Geo & Sector Filters', 'MENA-focused with strongest coverage in UAE, KSA, Egypt, and GCC.'],
            ['📈', 'Stage Tracking', 'Pre-seed through IPO. Every stage, every region, every announcement.'],
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
        <h2>Be first. Every time.</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>Free for 3 years · Wired to Outreach & Agents.</p>
        <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          Activate funding alerts <ArrowRight size={18} className="btn-icon" />
        </a>
      </div>
    </section>
  </div>
);

export default FundingDetection;
