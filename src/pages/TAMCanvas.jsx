import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const TAMCanvas = () => (
  <div className="tam-canvas-page">
    <section className="section section-light" style={{ paddingBottom: '3rem' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>TAM Canvas ★</span>
        <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
          Your buyers, <em>found, scored and worked</em> in one canvas.
        </h1>
        <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)', lineHeight: '1.6' }}>
          Stop searching. Start scoring. From signup to a fully scored TAM in under 24 hours.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Build my TAM — Free <ArrowRight size={18} className="btn-icon" />
          </a>
          <Link to="/contact" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>Book a live demo</Link>
        </div>
      </div>
    </section>

    <section className="section section-alt" style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="grid-4" style={{ textAlign: 'center' }}>
          {[['24h', 'Signup to scored TAM'], ['5M+', 'Verified contacts'], ['42', 'Live intent sources'], ['$4.2M', 'Pipeline value tracked']].map(([v, l]) => (
            <div key={l}><h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>{v}</h3><p style={{ color: 'var(--muted)', fontWeight: '500' }}>{l}</p></div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-light">
      <div className="container" style={{ maxWidth: '720px' }}>
        <div style={{ background: 'var(--panel)', border: '1px solid var(--color-border)', borderRadius: '1rem', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
            <strong>TAM Canvas · My ICP</strong>
            <span style={{ background: '#dcfce7', color: '#16a34a', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold' }}>Live</span>
          </div>
          <div className="grid-4" style={{ gap: '1rem' }}>
            {[['6,840', 'Total TAM'], ['224', 'Hot accounts'], ['1,180', 'In sequence'], ['$4.2M', 'Pipeline']].map(([v, l]) => (
              <div key={l} style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block' }}>{l}</span>
                <strong style={{ color: 'var(--primary-color)' }}>{v}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="section section-alt">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2>The four-layer stack.</h2>
        </div>
        <div className="grid-4" style={{ textAlign: 'center' }}>
          {[['🧠', 'Brain', 'Knowledge graph, reasoning, memory — the foundation everything runs on.'], ['🎯', 'ICP', 'Your versioned buyer definition. The contract that drives every score.'], ['🔍', 'Find Lead', 'Natural-language prospecting as the front door to discovery.'], ['🗺️', 'TAM', 'The materialized, scored account universe — always live, always ranked.']].map(([ico, h, p]) => (
            <div key={h} className="card" style={{ textAlign: 'center' }}>
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
        <h2>Ready to build your TAM?</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>From signup to first scored TAM in under 24 hours. Free to start.</p>
        <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          Build my TAM — Free <ArrowRight size={18} className="btn-icon" />
        </a>
      </div>
    </section>
  </div>
);

export default TAMCanvas;
