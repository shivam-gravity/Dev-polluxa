import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const EmailOutreach = () => (
  <div className="email-outreach-page">
    <section className="section section-light" style={{ paddingBottom: '3rem' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Email Outreach · Deliverability</span>
        <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
          98.6% deliverability. <em>Inbox every time.</em>
        </h1>
        <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)', lineHeight: '1.6' }}>
          Inbox-aware sending, domain warm-up, AI personalization and reply routing — built so your emails land, get opened, and get replied to.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Run your first sequence <ArrowRight size={18} className="btn-icon" />
          </a>
          <Link to="/contact" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>Talk to deliverability team</Link>
        </div>
      </div>
    </section>

    <section className="section section-alt" style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="grid-4" style={{ textAlign: 'center' }}>
          {[['98.6%', 'Deliverability'], ['14.2%', 'Reply rate'], ['0.4%', 'Spam complaint rate'], ['62%', 'Open rate']].map(([v, l]) => (
            <div key={l}><h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>{v}</h3><p style={{ color: 'var(--muted)', fontWeight: '500' }}>{l}</p></div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-light">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2>Six deliverability layers.</h2>
        </div>
        <div className="grid-3">
          {[
            ['📡', 'Inbox-Aware Sending', 'Per-mailbox throttling with dynamic send rates based on reputation and timezone-aware delivery.'],
            ['🔥', 'Domain Warm-Up', 'Automatic warm-up across 6+ domains monitoring SPF, DKIM, and DMARC signals continuously.'],
            ['🤖', 'AI Personalization', 'Line-level rewriting customizes each opener using recipient role, company signals, and CRM history.'],
            ['🧪', 'A/B/n Testing', 'Live statistical testing for subjects, hooks, CTAs, and send times with mid-run winner selection.'],
            ['🔀', 'Reply Routing', 'Auto-classifies responses — interested, objection, unsubscribe, OOO — routes to the right rep.'],
            ['📊', 'Inbox Placement Monitor', 'Real-time seed-list checks across Gmail, Outlook, and Apple Mail. Auto-pauses if placement declines.'],
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

    <section className="section section-alt">
      <div className="container" style={{ maxWidth: '720px' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Campaign example · Q2 MENA</h3>
        <div style={{ background: 'var(--panel)', border: '1px solid var(--color-border)', borderRadius: '1rem', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[['Subject variant A', '12.8% reply'], ['Subject variant B', '18.4% reply'], ['Subject variant C — winner', '21.2% reply']].map(([label, result]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: 'var(--panel-2)', borderRadius: '0.5rem' }}>
                <span style={{ fontSize: '0.9rem' }}>{label}</span>
                <strong style={{ color: label.includes('winner') ? '#16a34a' : 'var(--primary-color)', fontSize: '0.9rem' }}>{result}</strong>
              </div>
            ))}
            <div style={{ marginTop: '0.5rem', padding: '1rem', background: '#dcfce7', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: '600', color: '#16a34a' }}>Total pipeline generated</span>
              <strong style={{ color: '#16a34a' }}>$486K</strong>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section section-light" style={{ borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
        <h2>Start sending with confidence.</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>Free for 3 years. No credit card required.</p>
        <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          Run first sequence free <ArrowRight size={18} className="btn-icon" />
        </a>
      </div>
    </section>
  </div>
);

export default EmailOutreach;
