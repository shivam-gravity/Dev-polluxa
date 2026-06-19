import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const SalesModule = () => (
  <div className="sales-page">
    <section className="section section-light" style={{ paddingBottom: '3rem' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Sales</span>
        <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
          Your living pipeline. <em>Nudged to close.</em>
        </h1>
        <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)', lineHeight: '1.6' }}>
          Lead scoring, team routing, message drafting, and follow-up management — keeping every deal moving without the manual overhead.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Get Agent CRM — Free <ArrowRight size={18} className="btn-icon" />
          </a>
          <Link to="/contact" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>Book a demo</Link>
        </div>
      </div>
    </section>

    <section className="section section-alt" style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="grid-3" style={{ textAlign: 'center' }}>
          {[['3.4×', 'Faster deal velocity'], ['89%', 'Follow-ups on time'], ['11.4h', 'Saved per rep weekly']].map(([v, l]) => (
            <div key={l}><h3 style={{ fontSize: '2.75rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>{v}</h3><p style={{ color: 'var(--muted)', fontWeight: '500' }}>{l}</p></div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-light">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2>Six sales capabilities.</h2>
        </div>
        <div className="grid-3">
          {[
            ['🎯', 'Smart Lead Scoring', 'Scores leads 0–100 using fit, intent, and timing signals with automated nurturing for every tier.'],
            ['🔄', 'Fair Lead Rotation', 'Distributes leads equitably across reps, agencies, and agents via round-robin or weighted systems.'],
            ['✍️', 'AI-Drafted Follow-ups', 'Contextual messages generated with one-click send across email and WhatsApp.'],
            ['⏰', 'Tasks & Reminders', 'Assigns activities with escalation if missed — no deal falls through a crack.'],
            ['🏢', 'Multi-Org & Roles', 'Multiple organizations with data isolation and role-based access control.'],
            ['📱', 'Mobile-First', 'iOS and Android apps with offline mode and voice notes for field reps.'],
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
        <h2>Accelerate every deal from new to closed-won.</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>Free for 3 years. No credit card required.</p>
        <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          Accelerate sales free <ArrowRight size={18} className="btn-icon" />
        </a>
      </div>
    </section>
  </div>
);

export default SalesModule;
