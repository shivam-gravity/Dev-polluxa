import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const agents = [
  { name: 'Mona Hubble', role: 'Visionary Researcher', ico: '🔭', desc: 'De-anonymizes website traffic in real time and identifies high-intent companies while they browse, mapping visits to ICP and buying signals.' },
  { name: 'Luna Kelper', role: 'Social Strategist', ico: '🌙', desc: 'Monitors LinkedIn for live buying signals, tracks engagement from target accounts, and detects intent through behavior patterns to time outreach optimally.' },
  { name: 'Harry Voyager', role: 'Market Explorer', ico: '🚀', desc: 'Converts closed deals into lookalike growth signals, surfaces high-fit companies in adjacent markets, and runs multi-channel campaigns autonomously.' },
  { name: 'Ava Sputnik', role: 'Chief of Staff', ico: '🛰️', desc: 'Continuously monitors calendars, maps organizational structure, delivers pre-call briefings, and turns interactions into competitive advantages.' },
];

const Agents = () => (
  <div className="agents-page">
    <section className="section section-light" style={{ paddingBottom: '3rem' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Agents</span>
        <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
          12 autonomous workers. <em>Always on.</em>
        </h1>
        <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)', lineHeight: '1.6' }}>
          A constellation of AI workers that find pipeline, qualify leads, brief your reps and chase the long tail — deployed in minutes, scaled without limits.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Deploy agents free <ArrowRight size={18} className="btn-icon" />
          </a>
          <Link to="/contact" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>Book a demo</Link>
        </div>
      </div>
    </section>

    <section className="section section-alt" style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="grid-3" style={{ textAlign: 'center' }}>
          {[['85%', 'Autonomous execution'], ['11.4h', 'Saved per rep weekly'], ['3.2×', 'More qualified meetings']].map(([v, l]) => (
            <div key={l}><h3 style={{ fontSize: '2.75rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>{v}</h3><p style={{ color: 'var(--muted)', fontWeight: '500' }}>{l}</p></div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-light">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2>Meet the four named agents.</h2>
        </div>
        <div className="grid-2">
          {agents.map(({ name, role, ico, desc }) => (
            <div key={name} className="card">
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '2.5rem' }}>{ico}</div>
                <div>
                  <h3 style={{ marginBottom: '0.25rem' }}>{name}</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--accent-color)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{role}</span>
                  <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginTop: '0.75rem' }}>{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-alt">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2>Three channel agents.</h2>
        </div>
        <div className="grid-3">
          {[
            ['💼', 'LinkedIn Agent', 'Network management, connection campaigns, DM sequences, and intent-triggered InMail — all profile-safe.'],
            ['✉️', 'Email Agent', 'Personalized sequences, deliverability monitoring, domain warm-up, and inbox-aware throttling.'],
            ['💬', 'WhatsApp Agent', 'Conversational outreach via WhatsApp Business API — templates, two-way, opt-in compliant.'],
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
          <h2>How agents work.</h2>
        </div>
        <div className="grid-5" style={{ display: 'flex', gap: '0', overflowX: 'auto' }}>
          {[['👁️', 'Observe'], ['🧠', 'Reason'], ['⚖️', 'Decide'], ['⚡', 'Act'], ['📚', 'Learn']].map(([ico, step], i) => (
            <div key={step} style={{ flex: 1, textAlign: 'center', padding: '1.5rem 1rem', background: i % 2 === 0 ? 'var(--panel-2)' : 'var(--panel)', border: '1px solid var(--line-strong)', borderLeft: i > 0 ? 'none' : '1px solid var(--line-strong)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{ico}</div>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-alt" style={{ borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
        <h2>68% agent-sourced pipeline for established teams.</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>Deploy in minutes. Free for 3 years.</p>
        <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          Get Agent CRM — Free <ArrowRight size={18} className="btn-icon" />
        </a>
      </div>
    </section>
  </div>
);

export default Agents;
