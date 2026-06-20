import { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchAPI } from '../lib/api';

const FAQ = ({ items = [] }) => {
  const [open, setOpen] = useState(null);
  if (!items.length) return null;
  return (
    <section className="section section-alt animate-on-scroll">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--color-accent-teal)' }}>FAQ</span>
          <h2 style={{ marginTop: '0.5rem' }}>Common questions</h2>
        </div>
        {items.map((item, i) => (
          <div key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{ width: '100%', textAlign: 'left', padding: '1.25rem 0', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}
            >
              <span style={{ fontWeight: '600', color: 'var(--color-text-primary)', fontSize: '1rem' }}>{item.question}</span>
              <ChevronDown size={18} style={{ flexShrink: 0, color: 'var(--color-text-secondary)', transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            {open === i && (
              <p style={{ color: 'var(--color-text-secondary)', paddingBottom: '1.25rem', margin: 0, lineHeight: '1.7' }}>{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const PLM = () => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAPI('/api/plms', { 'filters[slug][$eq]': 'overview' }).then((res) => {
      setPage(res?.data?.[0]?.attributes ?? null);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.05 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: 'var(--color-text-secondary)' }}>
        Loading…
      </div>
    );
  }

  const features = page?.features ?? [];
  const metrics  = page?.metrics  ?? [];
  const faq      = page?.faq      ?? [];

  return (
    <div className="plm-page">

      {/* Hero */}
      <section className="section section-light" style={{ paddingBottom: '3rem' }}>
        <div className="background-orbs">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
        </div>
        <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--color-accent-teal)' }}>
            Product Lifecycle Management
          </span>
          <h1 className="gradient-text" style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
            {page?.hero_title ?? 'Manage Less, Scale Smarter.'}
          </h1>
          <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
            {page?.hero_description}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            <Link to={page?.cta_primary_url ?? '/contact'} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              {page?.cta_primary_label ?? 'Book Live Demo'} <ArrowRight size={18} className="btn-icon" />
            </Link>
            <a href={page?.cta_secondary_url ?? '#features'} className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              {page?.cta_secondary_label ?? 'Download the product deck'}
            </a>
          </div>
        </div>
      </section>

      {/* Metrics */}
      {metrics.length > 0 && (
        <section className="section section-alt animate-on-scroll" style={{ padding: '3rem 0' }}>
          <div className="container">
            <div className="grid-4" style={{ textAlign: 'center' }}>
              {metrics.map((m, i) => (
                <div key={i}>
                  <h3 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '0.25rem' }}>{m.value}</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontWeight: '500' }}>{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      {features.length > 0 && (
        <section id="features" className="section section-light animate-on-scroll">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--color-accent-teal)' }}>
                Built for product teams who ship a lot
              </span>
              <h2 style={{ marginTop: '0.5rem' }}>Six modules. <em>One platform.</em></h2>
            </div>
            <div className="grid-3">
              {features.map((f, i) => (
                <div key={i} className="card">
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{f.icon}</div>
                  <h4>{f.title}</h4>
                  {f.subtitle && (
                    <p style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-accent-teal)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {f.subtitle}
                    </p>
                  )}
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Industries */}
      <section className="section section-alt animate-on-scroll">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2>Built for <em>every category.</em></h2>
          </div>
          <div className="grid-4" style={{ textAlign: 'center' }}>
            {['Fashion & Apparel', 'Outdoor & Sports', 'Multi-Category Retail', 'Home & Furniture', 'Food & Beverage', 'Consumer Goods', 'Cosmetics & Personal Care', 'Consumer Electronics'].map((ind) => (
              <div key={ind} className="card" style={{ padding: '1.25rem' }}>
                <p style={{ fontWeight: '600', margin: 0 }}>{ind}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faq} />

      {/* Demo CTA */}
      <section className="section section-light animate-on-scroll" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2>{page?.demo_headline ?? 'Ready to ship faster, with less rework?'}</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2.5rem' }}>
            {page?.demo_description ?? 'Book a 30-minute demo with a Polluxa PLM specialist.'}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Book Live Demo <ArrowRight size={18} className="btn-icon" />
            </Link>
            <Link to="/customers" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Read customer stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PLM;
