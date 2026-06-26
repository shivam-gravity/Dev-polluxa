import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchAPI, getImgUrl } from '../lib/api';

const Customers = () => {
  const [logos, setLogos]       = useState([]);
  const [industries, setIndustries] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [logosRes, indRes, testimRes] = await Promise.all([
        fetchAPI('/api/customer-logos',  { sort: 'sort_order:asc' }),
        fetchAPI('/api/industry-stats',  { sort: 'sort_order:asc' }),
        fetchAPI('/api/testimonials',    { sort: 'sort_order:asc', populate: 'avatar' }),
      ]);
      if (cancelled) return;

      setLogos((logosRes?.data || []).map(i => ({
        name: i.attributes.name,
        logo: getImgUrl(i.attributes.logo),
      })));
      setIndustries((indRes?.data || []).map(i => ({
        icon:       i.attributes.icon,
        name:       i.attributes.name,
        brandCount: i.attributes.brand_count,
      })));
      setTestimonials((testimRes?.data || []).map(i => ({
        quote:   i.attributes.quote,
        name:    i.attributes.name,
        company: i.attributes.company,
        avatar:  getImgUrl(i.attributes.avatar),
        initials: i.attributes.initials || i.attributes.name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
      })));
      setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="customers-page">

      {/* ── Hero ── */}
      <section className="section section-light" style={{ paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <span className="section-tag">Customers</span>
          <h1 style={{ fontSize: 'clamp(2.25rem, 6vw, 3.75rem)', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
            2,000+ brands. <em>One platform.</em>
          </h1>
          <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)' }}>
            From category-defining retailers to fast-moving creator brands, Polluxa is the operating system behind the businesses you buy from every week.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            <Link to="/case-studies" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Read case studies <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/contact" className="btn-ghost" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Become a customer
            </Link>
          </div>
        </div>
      </section>

      {/* ── Customer logos ── */}
      {!loading && logos.length > 0 && (
        <section className="section section-alt" style={{ padding: '4rem 0' }}>
          <div className="container">
            <h4 style={{ textAlign: 'center', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2.5rem', fontSize: '0.8125rem', fontWeight: '700' }}>
              Brands that run on Polluxa
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
              {logos.map(({ name, logo }) => (
                <div key={name} style={{ background: 'var(--panel)', padding: '1.25rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {logo
                    ? <img src={logo} alt={name} style={{ maxHeight: '40px', maxWidth: '100%', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.75 }} />
                    : <span style={{ fontWeight: '700', color: 'var(--ink)', fontSize: '1rem' }}>{name}</span>
                  }
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Industries ── */}
      {!loading && industries.length > 0 && (
        <section className="section section-light">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="section-tag">Specialists</span>
              <h2 style={{ marginTop: '0.5rem' }}>Specialists for every category.</h2>
            </div>
            <div className="grid-4">
              {industries.map(({ icon, name, brandCount }) => (
                <div key={name} className="card" style={{ padding: '1.5rem' }}>
                  {icon && <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>}
                  <h4 style={{ marginBottom: '0.25rem' }}>{name}</h4>
                  <strong style={{ color: 'var(--cyan)', fontSize: '0.9rem' }}>{brandCount}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonials ── */}
      {!loading && testimonials.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="section-tag">In their words</span>
              <h2 style={{ marginTop: '0.5rem' }}>What customers say.</h2>
            </div>
            <div className="grid-2">
              {testimonials.map(({ quote, name, company, avatar, initials }) => (
                <div key={name} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: '1.0625rem', fontStyle: 'italic', color: 'var(--ink)', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                    "{quote}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid var(--line)', paddingTop: '1rem' }}>
                    {avatar
                      ? <img src={avatar} alt={name} className="t-avatar" />
                      : (
                        <div style={{ background: 'var(--panel-2)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', border: '1px solid var(--line)', flexShrink: 0, fontSize: '0.875rem' }}>
                          {initials}
                        </div>
                      )
                    }
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.95rem' }}>{name}</strong>
                      <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{company}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Final CTA ── */}
      <section className="section section-light" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2>Join 2,000+ brands on Polluxa.</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>
            Get custom configurations, dedicated migration engineering support, and transparent SLAs.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Book a demo <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/case-studies" className="btn-ghost" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Read stories
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Customers;
