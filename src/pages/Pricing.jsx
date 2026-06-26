import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { fetchAPI } from '../lib/api';

const PlanSkeleton = () => (
  <div style={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: '1rem', padding: '2rem' }}>
    <div className="skel" style={{ height: '22px', width: '60%', marginBottom: '1rem' }} />
    <div className="skel" style={{ height: '44px', width: '40%', marginBottom: '1rem' }} />
    <div className="skel" style={{ height: '14px', width: '80%', marginBottom: '0.5rem' }} />
    <div className="skel" style={{ height: '14px', width: '70%', marginBottom: '1.5rem' }} />
    <div className="skel" style={{ height: '44px', borderRadius: '999px', marginBottom: '1.5rem' }} />
    {[1, 2, 3, 4].map(i => <div key={i} className="skel" style={{ height: '12px', width: `${60 + i * 7}%`, marginBottom: '0.5rem' }} />)}
  </div>
);

const Pricing = () => {
  const [plans, setPlans]           = useState([]);
  const [tokenPkgs, setTokenPkgs]   = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [plansRes, tokensRes] = await Promise.all([
        fetchAPI('/api/pricing-plans',   { sort: 'sort_order:asc' }),
        fetchAPI('/api/token-packages',  { sort: 'sort_order:asc' }),
      ]);
      if (cancelled) return;

      setPlans((plansRes?.data || []).map(i => ({
        name:       i.attributes.name,
        price:      i.attributes.price,
        period:     i.attributes.period,
        highlight:  i.attributes.highlight,
        badge:      i.attributes.badge,
        tokens:     i.attributes.tokens,
        contacts:   i.attributes.contacts,
        features:   i.attributes.features || [],
        cta:        i.attributes.cta,
        href:       i.attributes.href,
        isInternal: i.attributes.is_internal,
      })));

      setTokenPkgs((tokensRes?.data || []).map(i => ({
        name:  i.attributes.name,
        price: i.attributes.price,
      })));

      setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="pricing-page">

      {/* ── Hero ── */}
      <section className="section section-light" style={{ paddingBottom: '3rem' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="section-tag">Pricing</span>
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.75rem)', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
            Free to start. <em>Scales with your team.</em>
          </h1>
          <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)' }}>
            Every plan includes a free-forever tier. No credit card required to start.
          </p>
        </div>
      </section>

      {/* ── Plans grid ── */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
            {loading
              ? [1, 2, 3, 4].map(i => <PlanSkeleton key={i} />)
              : plans.length === 0
              ? <p style={{ color: 'var(--muted)', textAlign: 'center', gridColumn: '1/-1', padding: '3rem 0' }}>Pricing information is not available right now. Please <Link to="/contact" style={{ color: 'var(--cyan)' }}>contact us</Link> for details.</p>
              : plans.map((plan) => (
                <div key={plan.name} style={{ background: 'var(--panel)', border: plan.highlight ? '2px solid var(--cyan)' : '1px solid var(--line-strong)', borderRadius: '1rem', padding: '2rem', boxShadow: plan.highlight ? 'var(--shadow-glow)' : 'none', position: 'relative' }}>
                  {plan.badge && (
                    <span style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--cyan)', color: '#fff', padding: '0.2rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                      {plan.badge}
                    </span>
                  )}
                  <h3 style={{ marginBottom: '0.25rem', color: 'var(--ink)' }}>{plan.name}</h3>
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--ink)' }}>{plan.price}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--muted)' }}> {plan.period}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>{plan.tokens}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>{plan.contacts}</div>
                  {plan.isInternal
                    ? <Link to={plan.href || '/contact'} className="btn-primary" style={{ display: 'block', textAlign: 'center', padding: '0.75rem', marginBottom: '1.5rem' }}>{plan.cta}</Link>
                    : <a href={plan.href || '#'} className="btn-primary" style={{ display: 'block', textAlign: 'center', padding: '0.75rem', marginBottom: '1.5rem' }}>{plan.cta}</a>
                  }
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {(plan.features || []).map(f => (
                      <li key={f} style={{ fontSize: '0.875rem', color: 'var(--muted)', padding: '0.4rem 0', borderBottom: '1px solid var(--line)', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                        <span style={{ color: '#16a34a', fontWeight: 'bold', flexShrink: 0 }}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            }
          </div>
        </div>
      </section>

      {/* ── AI Tokens ── */}
      {!loading && tokenPkgs.length > 0 && (
        <section className="section section-light">
          <div className="container" style={{ maxWidth: '700px' }}>
            <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>AI Tokens</h3>
            <div className="card">
              <p style={{ color: 'var(--muted)', marginBottom: '1rem' }}>
                AI tokens are the universal currency for all AI actions in Polluxa — personalization, enrichment, agent tasks, workflow steps. Unused tokens roll over within your billing year on paid plans.
              </p>
              <div className="grid-3" style={{ gap: '1rem' }}>
                {tokenPkgs.map(({ name, price }) => (
                  <div key={name} style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                    <strong style={{ display: 'block' }}>{name}</strong>
                    <span style={{ color: 'var(--cyan)', fontWeight: '600' }}>{price}</span>
                  </div>
                ))}
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginTop: '1rem' }}>Additional tokens $0.05 each.</p>
            </div>
          </div>
        </section>
      )}

      {/* ── Questions CTA ── */}
      <section className="section section-alt" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
          <h2>Questions about pricing?</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>Talk to our team — we'll help you find the right plan for your team size and use case.</p>
          <Link to="/contact" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Talk to sales <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Pricing;
