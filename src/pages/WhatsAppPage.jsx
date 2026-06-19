import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const WhatsAppPage = () => (
  <div className="whatsapp-page">
    <section className="section section-light" style={{ paddingBottom: '3rem' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>WhatsApp · Conversational</span>
        <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
          72% open rate. <em>Native Business API.</em>
        </h1>
        <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)', lineHeight: '1.6' }}>
          Two-way conversations, opt-in management and intent-aware journeys — directly inside your Polluxa workspace. No middleware, no markup.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Connect WhatsApp <ArrowRight size={18} className="btn-icon" />
          </a>
          <Link to="/contact" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>Book a setup call</Link>
        </div>
      </div>
    </section>

    <section className="section section-alt" style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="grid-5" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[['72%', 'Open rate'], ['22%', 'Reply rate'], ['<2 min', 'First response'], ['99.4%', 'Template approval'], ['0', 'Numbers blocked (12mo)']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center', flex: '1', minWidth: '120px' }}><h3 style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>{v}</h3><p style={{ color: 'var(--muted)', fontWeight: '500', fontSize: '0.875rem' }}>{l}</p></div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-light">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2>Six WhatsApp capabilities.</h2>
        </div>
        <div className="grid-3">
          {[
            ['🔗', 'Native Business API', 'Direct WhatsApp integration — no middleware, no markup, no extra cost per message.'],
            ['📋', 'Template Manager', 'Meta-approved template builder with approval workflows and variable validation built in.'],
            ['💬', 'Two-Way Conversations', 'Unified inbox with AI summarization and intent classification — every conversation in context.'],
            ['🎵', 'Media Support', 'Voice notes, images, PDFs, videos, location — automatic transcription for voice messages.'],
            ['✅', 'Compliance Tools', 'Opt-in tracking, automatic STOP/HELP handling, audit trails for UAE, KSA, EU regulations.'],
            ['📊', 'Quality Score Monitor', 'Real-time tracking that auto-pauses sending to prevent throttling before it happens.'],
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
        <h2>4,200 active senders. Zero numbers blocked.</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>Free for 3 years. Connect in minutes.</p>
        <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          Connect WhatsApp free <ArrowRight size={18} className="btn-icon" />
        </a>
      </div>
    </section>
  </div>
);

export default WhatsAppPage;
