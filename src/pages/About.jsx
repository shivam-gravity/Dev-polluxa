import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="section section-light" style={{ paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>About Polluxa</span>
          <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
            Software that <em>does the work.</em>
          </h1>
          <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)', lineHeight: '1.6' }}>
            We are building the agentic enterprise platform — one operating system across sales, commerce, product, supply chain and warehouse, where AI agents work alongside humans on every workflow.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section section-alt" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div className="grid-4">
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '3rem', color: 'var(--primary-color)' }}>2,000+</h3>
              <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Brands on Polluxa</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '3rem', color: 'var(--primary-color)' }}>38</h3>
              <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Countries served</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '3rem', color: 'var(--primary-color)' }}>450+</h3>
              <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Team members</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '3rem', color: 'var(--primary-color)' }}>2018</h3>
              <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Founded</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & History */}
      <section className="section section-light">
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Our Story</h2>
          <p style={{ color: 'var(--muted)' }}>
            Polluxa was founded on a simple observation: every "modern" enterprise platform is still a filing cabinet. People do the work, software records what was done.
          </p>
          <p style={{ color: 'var(--muted)' }}>
            We don't believe that's the right model for what's coming. The next generation of enterprise software will be coworker-shaped — software that watches every signal, acts on the policies you set, and pulls a human in only when judgment is needed.
          </p>
          <p style={{ color: 'var(--muted)' }}>
            That's what Polluxa is. A workshop where every team builds the agents their own workflows demand — across CRM, commerce, PLM, supply chain and warehouse — all running on a single graph that connects every customer to every product to every parcel. We started in 2018, shipping a PLM platform to apparel brands that needed to launch faster. Today, 2,000+ brands across 38 countries run on Polluxa — including <strong>PharmEasy, Pepperfry, Licious, TeaBox, Lucrin and Liberty</strong>.
          </p>
          <p style={{ color: 'var(--muted)' }}>
            We're hiring across engineering, product, design, GTM and operations. If the future of work being agentic excites you, come build it with us.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Our Culture</span>
            <h2>How we work.</h2>
          </div>

          <div className="grid-3">
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
              <h4>Bias for shipping</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', fontStyle: 'italic', marginBottom: '0.5rem' }}>"We ship weekly."</p>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', margin: 0 }}>
                Every product team ships to production weekly. Critical customer requests merge in days, not quarters.
              </p>
            </div>

            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🪞</div>
              <h4>Dogfood</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', fontStyle: 'italic', marginBottom: '0.5rem' }}>"We run on Polluxa."</p>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', margin: 0 }}>
                Every Polluxa team — sales, marketing, support, ops, finance — runs its day-to-day work entirely on the Polluxa platform.
              </p>
            </div>

            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🤝</div>
              <h4>Customer first</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', fontStyle: 'italic', marginBottom: '0.5rem' }}>"Customer in every standup."</p>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', margin: 0 }}>
                Every development team has a named customer assigned to their sprint. We solve real problems, not abstract personas.
              </p>
            </div>

            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌍</div>
              <h4>Distributed</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', fontStyle: 'italic', marginBottom: '0.5rem' }}>"Built across 12 cities."</p>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', margin: 0 }}>
                We work asynchronously from Bangalore, Mumbai, Delhi, Dubai, Riyadh, London, Singapore, NYC, and more.
              </p>
            </div>

            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🧪</div>
              <h4>Earn the trust</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', fontStyle: 'italic', marginBottom: '0.5rem' }}>"Enterprise-grade by default."</p>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', margin: 0 }}>
                SOC 2, ISO 27001, PCI DSS, and GDPR are core compliance protocols built into the system architecture from day one.
              </p>
            </div>

            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
              <h4>Pragmatic</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', fontStyle: 'italic', marginBottom: '0.5rem' }}>"Agents that work."</p>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', margin: 0 }}>
                We ship AI agents only when they outperform human-speed or cost on specific workflows. No gimmicky chat windows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section section-light" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2>Come build with us.</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>
            We're always looking for talented developers, product managers, designers, and growth experts to join our globally distributed team.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              See open roles <ArrowRight size={18} className="btn-icon" />
            </Link>
            <Link to="/contact" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Talk to sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
