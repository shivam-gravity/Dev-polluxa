import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HelpDesk = () => (
  <div className="helpdesk-page">
    <section className="section section-light" style={{ paddingBottom: '3rem' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Help Desk</span>
        <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
          Support that feels like <em>a conversation.</em>
        </h1>
        <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)', lineHeight: '1.6' }}>
          WhatsApp, email, and web chat — unified in one inbox with AI deflection, SLA management, and an adaptive knowledge base. Run support in the same workspace where you run sales.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Run support on Polluxa <ArrowRight size={18} className="btn-icon" />
          </a>
          <Link to="/contact" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>Talk to support team</Link>
        </div>
      </div>
    </section>

    <section className="section section-alt" style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="grid-4" style={{ textAlign: 'center' }}>
          {[['42%', 'Tickets auto-deflected'], ['2m 18s', 'Avg first response'], ['4.8/5', 'CSAT rating'], ['18.4h', 'Saved per agent weekly']].map(([v, l]) => (
            <div key={l}><h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>{v}</h3><p style={{ color: 'var(--muted)', fontWeight: '500' }}>{l}</p></div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-light">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2>Six help desk modules.</h2>
        </div>
        <div className="grid-3">
          {[
            ['📥', 'Unified Inbox', 'All customer messages — WhatsApp, email, chat — routed to a single threaded interface with two-way replies from one composer.'],
            ['💬', 'Native WhatsApp', 'Two-way, business-grade support with templates, media, location, and automation capabilities.'],
            ['⏱️', 'SLA Engine', 'Per-segment timers with automatic escalation when response and resolution windows slip.'],
            ['🤖', 'AI Deflection', 'Answers FAQs, drafts replies, surfaces knowledge base articles — auto-resolving 30–50% of tickets.'],
            ['📚', 'Knowledge Base', 'Self-updating with public and internal versioning. Resolved tickets generate draft articles automatically.'],
            ['📊', 'CSAT & Analytics', 'Live dashboard: first response, resolution time, backlog, CSAT by agent, queue, and product line.'],
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
        <h2>14 tickets auto-resolved by AI every hour.</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>Free for 3 years. No credit card required.</p>
        <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          Open Help Desk free <ArrowRight size={18} className="btn-icon" />
        </a>
      </div>
    </section>
  </div>
);

export default HelpDesk;
