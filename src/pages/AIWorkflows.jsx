import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AIWorkflows = () => (
  <div className="ai-workflows-page">
    <section className="section section-light" style={{ paddingBottom: '3rem' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>AI Workflows</span>
        <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
          Build your own <em>autonomous agents.</em>
        </h1>
        <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)', lineHeight: '1.6' }}>
          A no-code agentic canvas that runs on the Polluxa graph. 50+ pre-built recipes, 200+ tool connectors, zero lines of code required.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Open the canvas <ArrowRight size={18} className="btn-icon" />
          </a>
          <Link to="/contact" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>Book a solutions call</Link>
        </div>
      </div>
    </section>

    <section className="section section-alt" style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="grid-3" style={{ textAlign: 'center' }}>
          {[['50+', 'Pre-built recipes'], ['0', 'Lines of code required'], ['200+', 'Tool connectors']].map(([v, l]) => (
            <div key={l}><h3 style={{ fontSize: '2.75rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>{v}</h3><p style={{ color: 'var(--muted)', fontWeight: '500' }}>{l}</p></div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-light">
      <div className="container" style={{ maxWidth: '720px' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Example: Re-engage closed-lost</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {[
            ['⚡', 'Trigger', 'Funding detected for closed-lost account'],
            ['🔍', 'Research', 'Fetch funding details and context'],
            ['👤', 'Retrieve', 'Pull CRM champion and history'],
            ['🔀', 'Route', 'Email if active · LinkedIn if gone dark'],
            ['✍️', 'Draft', 'Personalized congratulatory outreach'],
            ['✅', 'Approve', 'Human approves before send'],
          ].map(([ico, step, desc], i) => (
            <div key={step} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.75rem 0', borderBottom: i < 5 ? '1px solid var(--color-border)' : 'none' }}>
              <div style={{ background: 'var(--color-background-light)', border: '1px solid var(--color-border)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem' }}>{ico}</div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.9rem' }}>{step}</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-alt">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2>Agentic primitives.</h2>
        </div>
        <div className="grid-3">
          {[
            ['⚡', 'Triggers', 'Events, schedules, webhooks — any signal starts an agent.'],
            ['🧠', 'AI Reasoning Steps', 'LLM + tools reasoning at each step, with full context from the Polluxa graph.'],
            ['📝', 'CRM Reads & Writes', 'Read deals, contacts, accounts. Write notes, tasks, updates — natively.'],
            ['🔀', 'Branches & Loops', 'Conditional logic and loops for complex multi-step workflows.'],
            ['👤', 'Human-in-the-Loop', 'Pause for human approval before high-stakes actions.'],
            ['🔌', '200+ Connectors', 'Slack, HubSpot, Salesforce, Notion, Google Sheets, Zapier, and more.'],
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
        <h2>Build agents that work the way you do.</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>Browse 50+ recipes or start from scratch. Free for 3 years.</p>
        <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          Open AI Workflows <ArrowRight size={18} className="btn-icon" />
        </a>
      </div>
    </section>
  </div>
);

export default AIWorkflows;
