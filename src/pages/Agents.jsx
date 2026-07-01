import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { fetchAPI } from '../lib/api';
import { useSeoEffect } from '../lib/seo';

const Agents = () => {
  const [agents, setAgents]         = useState([]);
  const [stats, setStats]           = useState([]);
  const [channels, setChannels]     = useState([]);
  const [steps, setSteps]           = useState([]);
  const [loading, setLoading]       = useState(true);

  useSeoEffect(
    { metaTitle: 'Agents — Polluxa', metaDescription: 'Autonomous workers, always on. A constellation of AI agents that find pipeline, qualify leads, brief your reps and chase the long tail.' },
    'Agents — Polluxa'
  );

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [agentsRes, statsRes, channelsRes, stepsRes] = await Promise.all([
        fetchAPI('/api/agents',               { sort: 'sort_order:asc' }),
        fetchAPI('/api/agent-stats',          { sort: 'sort_order:asc' }),
        fetchAPI('/api/agent-channels',       { sort: 'sort_order:asc' }),
        fetchAPI('/api/agent-workflow-steps', { sort: 'sort_order:asc' }),
      ]);
      if (cancelled) return;

      setAgents((agentsRes?.data || []).map(i => ({
        name: i.attributes.name,
        role: i.attributes.role,
        ico:  i.attributes.icon,
        desc: i.attributes.description,
      })));
      setStats((statsRes?.data || []).map(i => ({
        value: i.attributes.value,
        label: i.attributes.label,
      })));
      setChannels((channelsRes?.data || []).map(i => ({
        ico:  i.attributes.icon,
        name: i.attributes.name,
        desc: i.attributes.description,
      })));
      setSteps((stepsRes?.data || []).map(i => ({
        ico:   i.attributes.icon,
        title: i.attributes.title,
      })));

      setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="agents-page">

      {/* ── Hero ── */}
      <section className="section section-light" style={{ paddingBottom: '3rem' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
          <span className="section-tag">Agents</span>
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.75rem)', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
            Autonomous workers. <em>Always on.</em>
          </h1>
          <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)', lineHeight: '1.6' }}>
            A constellation of AI workers that find pipeline, qualify leads, brief your reps and chase the long tail — deployed in minutes, scaled without limits.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            <a href="https://sales.polluxa.com/" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Deploy agents free <ArrowRight size={18} aria-hidden="true" />
            </a>
            <Link to="/contact" className="btn-ghost" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>Book a demo</Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      {!loading && stats.length > 0 && (
        <section className="section section-alt" style={{ padding: '3rem 0' }}>
          <div className="container">
            <div className="grid-3" style={{ textAlign: 'center' }}>
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <h3 style={{ fontSize: '2.75rem', color: 'var(--cyan)', marginBottom: '0.25rem', fontWeight: '800' }}>{value}</h3>
                  <p style={{ color: 'var(--muted)', fontWeight: '500' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Named agents ── */}
      {!loading && agents.length > 0 && (
        <section className="section section-light">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2>Meet the <em>named agents.</em></h2>
            </div>
            <div className="grid-2">
              {agents.map(({ name, role, ico, desc }) => (
                <div key={name} className="card">
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '2.5rem' }}>{ico}</div>
                    <div>
                      <h3 style={{ marginBottom: '0.25rem' }}>{name}</h3>
                      <span style={{ fontSize: '0.85rem', color: 'var(--cyan)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{role}</span>
                      <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginTop: '0.75rem' }}>{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Channel agents ── */}
      {!loading && channels.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2>Channel <em>agents.</em></h2>
            </div>
            <div className="grid-3">
              {channels.map(({ ico, name, desc }) => (
                <div key={name} className="card">
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{ico}</div>
                  <h4>{name}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── How agents work ── */}
      {!loading && steps.length > 0 && (
        <section className="section section-light">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2>How agents <em>work.</em></h2>
            </div>
            <div style={{ display: 'flex', gap: '0', overflowX: 'auto' }}>
              {steps.map(({ ico, title }, i) => (
                <div key={title} style={{ flex: 1, textAlign: 'center', padding: '1.5rem 1rem', background: i % 2 === 0 ? 'var(--panel-2)' : 'var(--panel)', border: '1px solid var(--line-strong)', borderLeft: i > 0 ? 'none' : '1px solid var(--line-strong)', minWidth: '100px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{ico}</div>
                  <strong style={{ fontSize: '0.9rem' }}>{title}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Final CTA ── */}
      <section className="section section-alt" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
          <h2>68% agent-sourced pipeline for established teams.</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>Deploy in minutes. Free for 3 years.</p>
          <a href="https://sales.polluxa.com/" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Get Agent CRM — Free <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>

    </div>
  );
};

export default Agents;
