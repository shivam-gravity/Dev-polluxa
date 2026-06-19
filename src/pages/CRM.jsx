import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Counter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let startTimestamp = null;
        const duration = 1500;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const CRM = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.05 });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="crm-page">
      {/* Breadcrumbs & Tabs */}
      <div style={{ background: 'var(--color-background-light)', borderBottom: '1px solid var(--color-border)', padding: '0.75rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
            <Link to="/crm" style={{ fontWeight: '600' }}>CRM</Link> / <span>Overview</span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
            <a href="#capabilities" style={{ color: 'var(--color-text-secondary)' }}>Capabilities</a>
            <a href="#channels" style={{ color: 'var(--color-text-secondary)' }}>Channels</a>
            <a href="#modules" style={{ color: 'var(--color-text-secondary)' }}>Modules</a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section section-light" style={{ paddingBottom: '3rem' }}>
        <div className="background-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
        </div>

        <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
          <h1 className="gradient-text" style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1' }}>
            The complete agentic revenue platform
          </h1>
          <p style={{ fontSize: '1.5rem', fontWeight: '600', margin: '1.5rem 0 2rem', color: 'var(--color-text-secondary)' }}>
            One workspace where <em>agents and humans</em> close together.
          </p>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', color: 'var(--color-text-secondary)' }}>
            Unify your sales pipeline, outbound marketing, client communication, support tickets, data enrichment, and autonomous AI agents in one dashboard.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4rem' }}>
            <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Get Agent CRM — Free <ArrowRight size={18} className="btn-icon" />
            </a>
            <Link to="/contact" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Book a live demo
            </Link>
          </div>

          {/* Key Metrics */}
          <div className="grid-4" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '3rem', marginTop: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '2.75rem', color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
                <Counter target={85} suffix="%" />
              </h3>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>Autonomous execution</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '2.75rem', color: 'var(--color-primary)', marginBottom: '0.25rem' }}>&lt;5s</h3>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>Cross-channel sync</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '2.75rem', color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
                <Counter target={5} suffix="M+" />
              </h3>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>Verified contacts</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '2.75rem', color: 'var(--color-primary)', marginBottom: '0.25rem' }}>any</h3>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>Workflow → agent</p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="section section-alt animate-on-scroll">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--color-accent-teal)' }}>Capabilities</span>
            <h2 style={{ marginTop: '0.5rem' }}>The agentic stack. <em>End to end.</em></h2>
            <p style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--color-text-secondary)' }}>
              Cross-cutting capabilities that power every module — from signal intake to outbound execution.
            </p>
          </div>

          <div className="grid-3">
            <div className="card">
              <div style={{ fontSize: '1.5rem', color: 'var(--color-accent-teal)', marginBottom: '0.5rem' }}>🔍</div>
              <h4>Find Lead</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                Natural-language prospecting across 5M+ verified contacts with live intent signals.
              </p>
              <Link to="/find-lead" className="link-animated">
                Explore <ArrowRight size={16} />
              </Link>
            </div>

            <div className="card">
              <div style={{ fontSize: '1.5rem', color: 'var(--color-accent-teal)', marginBottom: '0.5rem' }}>📡</div>
              <h4>Signal Aggregation</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                42 intent sources, deduped and ranked — hiring, funding, web visits, job changes.
              </p>
              <Link to="/signal-aggregation" className="link-animated">
                Explore <ArrowRight size={16} />
              </Link>
            </div>

            <div className="card">
              <div style={{ fontSize: '1.5rem', color: 'var(--color-accent-teal)', marginBottom: '0.5rem' }}>💎</div>
              <h4>Contact Enrichment</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                Triple-verified emails, mobiles, titles and firmographics — refreshed every 24h.
              </p>
              <Link to="/contact-enrichment" className="link-animated">
                Explore <ArrowRight size={16} />
              </Link>
            </div>

            <div className="card">
              <div style={{ fontSize: '1.5rem', color: 'var(--color-accent-teal)', marginBottom: '0.5rem' }}>💰</div>
              <h4>Funding Detection</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                Catch every Series-A through IPO within hours of announcement, ranked by ICP fit.
              </p>
              <Link to="/funding-detection" className="link-animated">
                Explore <ArrowRight size={16} />
              </Link>
            </div>

            <div className="card">
              <div style={{ fontSize: '1.5rem', color: 'var(--color-accent-teal)', marginBottom: '0.5rem' }}>✉️</div>
              <h4>Outreach</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                Multi-channel sequences (email, WhatsApp, LinkedIn) with deliverability built in.
              </p>
              <Link to="/outreach" className="link-animated">
                Explore <ArrowRight size={16} />
              </Link>
            </div>

            <div className="card">
              <div style={{ fontSize: '1.5rem', color: 'var(--color-accent-teal)', marginBottom: '0.5rem' }}>⚙️</div>
              <h4>AI Workflows</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                No-code workflow canvas to build your own agents and automations on top of Polluxa.
              </p>
              <Link to="/ai-workflows" className="link-animated">
                Explore <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Channels Section */}
      <section id="channels" className="section section-light animate-on-scroll">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--color-accent-teal)' }}>Channels</span>
            <h2 style={{ marginTop: '0.5rem' }}>Where you reach buyers, <em>at scale.</em></h2>
            <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--color-text-secondary)' }}>
              Four execution channels — wired together, governed centrally. <strong>LinkedIn is our home turf</strong> and the strongest engine in our stack.
            </p>
          </div>

          <div className="grid-2">
            {/* Channel 1: LinkedIn */}
            <div className="card" style={{ border: '2px solid var(--color-success)', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: '#e0f2fe', color: '#0369a1', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Star size={12} fill="#0369a1" /> Our home turf · #1 channel
              </span>
              <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-text-secondary)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                CONNECTION · DM · INMAIL · SOCIAL
              </div>
              <h3 style={{ marginBottom: '1rem' }}>LinkedIn Outreach</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                The most effective LinkedIn engine on the market. Built with multi-account safety limits, automatic connection campaign warmups, and personalization that bypasses generic spam filters.
              </p>
              <div style={{ display: 'flex', gap: '2rem', padding: '1rem 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', marginBottom: '1.5rem' }}>
                <div>
                  <strong style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}>38%</strong>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Accept rate</span>
                </div>
                <div>
                  <strong style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}>14%</strong>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Reply rate</span>
                </div>
                <div>
                  <strong style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}>4.2×</strong>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>vs SDR-only</span>
                </div>
              </div>
              <Link to="/linkedin-outreach" className="link-animated">
                Explore LinkedIn engine <ArrowRight size={16} />
              </Link>
            </div>

            {/* Channel 2: Email */}
            <div className="card">
              <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-text-secondary)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                DELIVERABILITY
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Email Outreach</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginBottom: '2.5rem' }}>
                Inbox-aware sending, domain warm-up, spintax patterns, and AI personalization. Reach real directories with built-in multi-inbox rotations ensuring <strong>98.6% deliverability</strong>.
              </p>
              <Link to="/email-outreach" className="link-animated">
                Explore <ArrowRight size={16} />
              </Link>
            </div>

            {/* Channel 3: WhatsApp */}
            <div className="card">
              <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-text-secondary)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                CONVERSATIONAL
              </div>
              <h3 style={{ marginBottom: '1rem' }}>WhatsApp</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginBottom: '2.5rem' }}>
                Native Meta Business API integration. Direct templated blasts, automatic two-way opt-in flows, and CRM-synchronized conversations with <strong>72% open and 22% reply</strong> rates.
              </p>
              <Link to="/whatsapp" className="link-animated">
                Explore <ArrowRight size={16} />
              </Link>
            </div>

            {/* Channel 4: Meta Ads */}
            <div className="card">
              <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-text-secondary)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                PAID · FB · IG · WA
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Meta Ads</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginBottom: '2.5rem' }}>
                Build lookalike lists directly from closed-won leads. Direct forms-to-CRM pipelines for instant SDR assignments, auto-attribution dashboard, and full-funnel ROI.
              </p>
              <Link to="/meta-ads" className="link-animated">
                Explore <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="section section-alt animate-on-scroll">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--color-accent-teal)' }}>Modules</span>
            <h2>Pick a module. <em>Or run them all.</em></h2>
            <p style={{ maxWidth: '750px', margin: '0 auto', color: 'var(--color-text-secondary)' }}>
              Start free on every module. Mix and match — they share the same contacts, deals and agents.
            </p>
          </div>

          <div className="grid-3">
            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h4>Agents</h4>
                <span style={{ fontSize: '0.75rem', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--color-success-highlight)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '600' }}>
                  12 autonomous workers
                </span>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', flexGrow: 1, marginBottom: '1.5rem' }}>
                Always-on AI agents — Mona Hubble, Luna Kelper, Harry Voyager, Ava Sputnik and channel agents — that find pipeline, qualify leads and brief your reps autonomously.
              </p>
              <Link to="/agents" className="link-animated">
                Explore agents <ArrowRight size={16} />
              </Link>
            </div>

            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h4>CRM</h4>
                <span style={{ fontSize: '0.75rem', background: 'var(--color-background-light)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '600' }}>
                  Customer graph
                </span>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', flexGrow: 1, marginBottom: '1.5rem' }}>
                Leads, deals, tasks, contacts and accounts — unified on a single live canvas. Kanban pipelines, 360 lead views, smart reminders.
              </p>
              <a href="https://sales.polluxa.com/" className="link-animated">
                Open CRM <ArrowRight size={16} />
              </a>
            </div>

            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h4>Marketing</h4>
                <span style={{ fontSize: '0.75rem', background: 'var(--color-background-light)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '600' }}>
                  Omnichannel campaigns
                </span>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', flexGrow: 1, marginBottom: '1.5rem' }}>
                Build journeys across WhatsApp, Email, Meta and Google. Native templates, drag-and-drop builder, AI-built segments and full-funnel attribution.
              </p>
              <Link to="/marketing" className="link-animated">
                Plan campaigns <ArrowRight size={16} />
              </Link>
            </div>

            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h4>Sales</h4>
                <span style={{ fontSize: '0.75rem', background: 'var(--color-background-light)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '600' }}>
                  Living pipeline
                </span>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', flexGrow: 1, marginBottom: '1.5rem' }}>
                Lead scoring, fair rotation, smart reminders and AI-drafted follow-ups. Accelerate every deal from 'new' to 'closed-won' with measurable lift.
              </p>
              <Link to="/sales" className="link-animated">
                Accelerate sales <ArrowRight size={16} />
              </Link>
            </div>

            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h4>Data</h4>
                <span style={{ fontSize: '0.75rem', background: 'var(--color-background-light)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '600' }}>
                  Verified · enriched
                </span>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', flexGrow: 1, marginBottom: '1.5rem' }}>
                5M+ contacts, 5M companies — triple-verified emails, mobiles, firmographics. Live enrichment, dedupe and master-data tools.
              </p>
              <Link to="/data" className="link-animated">
                Explore data <ArrowRight size={16} />
              </Link>
            </div>

            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h4>Help Desk</h4>
                <span style={{ fontSize: '0.75rem', background: 'var(--color-background-light)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '600' }}>
                  Conversational support
                </span>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', flexGrow: 1, marginBottom: '1.5rem' }}>
                Tickets, SLAs, knowledge base and AI deflection. Run customer support in the same workspace where you run sales.
              </p>
              <Link to="/helpdesk" className="link-animated">
                Open help desk <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section section-light animate-on-scroll" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2>Run revenue on <em>one platform.</em></h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2.5rem' }}>
            One graph for everything. One workspace for everyone. A starter set of agents — and a workshop to build your own. Spin yours up in 30 seconds.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="https://sales.polluxa.com/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Get Agent CRM — Free <ArrowRight size={18} className="btn-icon" />
            </a>
            <Link to="/contact" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Talk to sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CRM;
