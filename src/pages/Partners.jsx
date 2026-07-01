import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchAPI } from '../lib/api';
import { useSeoEffect } from '../lib/seo';

const Partners = () => {
  const [solutionPartners, setSolutionPartners] = useState([]);
  const [partnerStats, setPartnerStats]         = useState([]);
  const [partnerTypes, setPartnerTypes]         = useState([]);
  const [loading, setLoading]                   = useState(true);

  useSeoEffect(
    { metaTitle: 'Partners — Polluxa', metaDescription: 'We collaborate with the top associations and partners in the industry and technology to keep innovating our products and hasten the adoption of Polluxa.' },
    'Partners — Polluxa'
  );

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [partnersRes, statsRes, typesRes] = await Promise.all([
        fetchAPI('/api/partners',      { populate: '*' }),
        fetchAPI('/api/partner-stats', { sort: 'sort_order:asc' }),
        fetchAPI('/api/partner-types', { sort: 'sort_order:asc' }),
      ]);
      if (cancelled) return;

      setSolutionPartners((partnersRes?.data || []).map(i => i.attributes.title));
      setPartnerStats((statsRes?.data || []).map(i => ({
        value: i.attributes.value,
        label: i.attributes.label,
      })));
      setPartnerTypes((typesRes?.data || []).map(i => ({
        icon: i.attributes.icon,
        name: i.attributes.name,
        desc: i.attributes.description,
      })));
      setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="partners-page">

      {/* ── Hero ── */}
      <section className="section section-light" style={{ textAlign: 'center', paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span className="section-tag">Ecosystem</span>
          <h1 style={{ marginTop: '0.5rem', fontSize: 'clamp(2.25rem, 6vw, 3.75rem)', fontWeight: '800', lineHeight: '1.1' }}>
            Our <em>Partners.</em>
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.25rem', marginTop: '1.5rem' }}>
            We collaborate with the top associations and partners in the industry and technology to keep innovating our products and hasten the adoption of Polluxa.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Become a partner <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Network stats ── */}
      {!loading && partnerStats.length > 0 && (
        <section className="section section-alt" style={{ padding: '3rem 0' }}>
          <div className="container">
            <div className="grid-3" style={{ textAlign: 'center' }}>
              {partnerStats.map(({ value, label }) => (
                <div key={label}>
                  <h3 style={{ fontSize: '2.75rem', color: 'var(--cyan)', marginBottom: '0.25rem', fontWeight: '800' }}>{value}</h3>
                  <p style={{ color: 'var(--muted)', fontWeight: '500' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Solutions Partners ── */}
      {!loading && solutionPartners.length > 0 && (
        <section className="section section-light">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-tag">Solutions Partners</span>
              <h2 style={{ marginTop: '0.5rem' }}>Implementation & <em>consulting network.</em></h2>
              <p style={{ color: 'var(--muted)', maxWidth: '600px', margin: '1rem auto 0' }}>
                Certified implementation partners that deploy Polluxa for enterprises across the globe.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
              {solutionPartners.map((name) => (
                <div key={name} style={{ background: 'var(--panel)', border: '1px solid var(--line-strong)', borderRadius: '0.5rem', padding: '0.875rem 1rem', fontSize: '0.9rem', fontWeight: '600', color: 'var(--ink)', textAlign: 'center' }}>
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Partner types ── */}
      {!loading && partnerTypes.length > 0 && (
        <section className="section section-light">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="section-tag">Partner Types</span>
              <h2 style={{ marginTop: '0.5rem' }}>Find your <em>partner tier.</em></h2>
            </div>
            <div className="grid-2">
              {partnerTypes.map(({ icon, name, desc }) => (
                <div key={name} className="card">
                  {icon && <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>}
                  <h4>{name}</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginTop: '0.5rem' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="section section-alt" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
          <h2>Ready to join <em>our partner network?</em></h2>
          <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>
            Contact our partner team to explore the right tier and region together.
          </p>
          <Link to="/contact" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Find out more <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Partners;
