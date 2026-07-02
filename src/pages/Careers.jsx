import { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Briefcase, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchAPI } from '../lib/api';
import { useSeoEffect } from '../lib/seo';
import { fetchPage, getSection } from '../lib/pageContent';

const deptColors = {
  'HR & People':         { bg: 'rgba(139,92,246,0.14)',  text: '#a78bfa' },
  'Sales':               { bg: 'rgba(14,165,233,0.14)',  text: '#38bdf8' },
  'Marketing':           { bg: 'rgba(236,72,153,0.14)',  text: '#f472b6' },
  'Strategy':            { bg: 'rgba(245,158,11,0.14)',  text: '#fbbf24' },
  'Business Development':{ bg: 'rgba(16,185,129,0.14)',  text: '#34d399' },
  'Engineering':         { bg: 'rgba(43,182,255,0.14)',  text: '#2bb6ff' },
  'Product':             { bg: 'rgba(139,92,246,0.14)',  text: '#a78bfa' },
  'Design':              { bg: 'rgba(236,72,153,0.14)',  text: '#f472b6' },
};

const JobSkeleton = () => (
  <div className="career-card career-card-skeleton" aria-hidden="true">
    <div className="career-card-left">
      <span className="skel skel-tag" />
      <div className="skel skel-title" style={{ marginTop: '0.75rem', width: '70%' }} />
      <div className="skel skel-body" style={{ marginTop: '0.5rem' }} />
      <div className="skel skel-body" style={{ width: '85%' }} />
      <div className="career-card-meta">
        <span className="skel skel-date" style={{ width: '80px' }} />
        <span className="skel skel-date" style={{ width: '100px' }} />
        <span className="skel skel-date" style={{ width: '90px' }} />
      </div>
    </div>
    <div className="skel" style={{ width: '90px', height: '38px', borderRadius: '999px', flexShrink: 0 }} />
  </div>
);

const Careers = () => {
  const [openings, setOpenings] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(false);
  const [hero, setHero]         = useState(null);
  const [cta, setCta]           = useState(null);
  const [pageSeo, setPageSeo]   = useState(null);

  useSeoEffect(
    pageSeo || { metaTitle: 'Careers — Polluxa', metaDescription: 'Work on the future of enterprise software. Polluxa is building one intelligent platform for CRM, Commerce, PLM, Logistics, and WMS.' },
    'Careers — Polluxa'
  );

  useEffect(() => {
    let cancelled = false;
    fetchPage('careers').then(({ sections, seo }) => {
      if (cancelled) return;
      setHero(getSection(sections, 'sections.hero'));
      setCta(getSection(sections, 'sections.cta'));
      setPageSeo(seo);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [careersRes, benefitsRes] = await Promise.all([
          fetchAPI('/api/careers', { populate: '*' }),
          fetchAPI('/api/job-benefits', { sort: 'sort_order:asc' }),
        ]);
        if (cancelled) return;

        if (careersRes?.data?.length > 0) {
          setOpenings(careersRes.data.map(item => ({
            title:     item.attributes.title,
            dept:      item.attributes.job_types?.data?.[0]?.attributes?.name || 'General',
            type:      item.attributes.job_types?.data?.[0]?.attributes?.name || 'Full-time',
            exp:       item.attributes.level || 'Experienced',
            locations: item.attributes.location
              ? item.attributes.location.split(',').map(l => l.trim())
              : ['Remote'],
            desc: item.attributes.description,
          })));
        }

        if (benefitsRes?.data?.length > 0) {
          setBenefits(benefitsRes.data.map(b => ({
            icon:  b.attributes.icon,
            title: b.attributes.title,
            desc:  b.attributes.description,
          })));
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const deptStyle = (dept) => deptColors[dept] || { bg: 'rgba(255,255,255,0.08)', text: 'var(--muted)' };

  return (
    <div className="careers-page">

      {/* ── Hero ── */}
      <section className="section section-light careers-hero">
        <div className="container careers-hero-inner">
          <span className="section-tag">Careers</span>
          <h1 className="careers-hero-h1">
            {hero?.title || <>Work on the future of <em>enterprise software.</em></>}
          </h1>
          <p className="careers-hero-lede">
            {hero?.description || 'Polluxa is building one intelligent platform for CRM, Commerce, PLM, Logistics, and WMS. Join a team that ships fast, thinks big, and is distributed across 38 countries.'}
          </p>
          <a href={hero?.buttons?.[0]?.url || '#openings'} className="btn-primary careers-hero-cta">
            {hero?.buttons?.[0]?.text || 'See open roles'} <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* ── Open Roles ── */}
      <section id="openings" className="section section-light">
        <div className="container">
          <div className="careers-section-head">
            <span className="section-tag">Open Positions</span>
            <h2 style={{ marginTop: '0.5rem' }}>Join the <em>team.</em></h2>
            <p className="careers-section-sub">
              All roles are open to candidates in Dubai, Netherlands, Prague, Canada, and the USA — unless noted otherwise.
            </p>
          </div>

          {error && !loading && (
            <div className="blog-notice" role="alert">
              <AlertCircle size={15} aria-hidden="true" /> Could not reach the jobs API. Please try again later.
            </div>
          )}

          <div className="careers-jobs-list">
            {loading
              ? [1, 2, 3].map(i => <JobSkeleton key={i} />)
              : openings.length === 0
              ? (
                <div className="blog-empty">
                  <p>No open roles right now — check back soon.</p>
                  <Link to="/contact" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}>
                    Send a speculative application <ArrowRight size={15} />
                  </Link>
                </div>
              )
              : openings.map(({ title, dept, type, exp, locations, desc }) => {
                  const ds = deptStyle(dept);
                  return (
                    <div key={title} className="career-card">
                      <div className="career-card-left">
                        <span className="career-dept-tag" style={{ background: ds.bg, color: ds.text }}>{dept}</span>
                        <h3 className="career-title">{title}</h3>
                        <p className="career-desc">{desc}</p>
                        <div className="career-card-meta">
                          <span className="career-meta-item"><Briefcase size={13} aria-hidden="true" />{type}</span>
                          <span className="career-meta-item"><Clock    size={13} aria-hidden="true" />{exp}</span>
                          <span className="career-meta-item"><MapPin   size={13} aria-hidden="true" />{locations.join(' / ')}</span>
                        </div>
                      </div>
                      <div className="career-card-action">
                        <Link
                          to={`/contact?interest=Job+Application&subject=${encodeURIComponent(title)}`}
                          className="btn-primary career-apply-btn"
                          aria-label={`Apply for ${title}`}
                        >
                          Apply <ArrowRight size={14} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  );
                })
            }
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      {benefits.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-tag">Benefits</span>
              <h2 style={{ marginTop: '0.5rem' }}>Built for the <em>long run.</em></h2>
            </div>
            <div className="grid-3">
              {benefits.map(({ icon, title, desc }) => (
                <div key={title} className="card">
                  <div className="career-benefit-icon">{icon}</div>
                  <h4>{title}</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Footer CTA ── */}
      <section className="section section-light careers-footer-cta">
        <div className="container" style={{ textAlign: 'center', maxWidth: '680px' }}>
          <h2>{cta?.title || <>{"Don't see your role? "}<em>Reach out anyway.</em></>}</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '2.5rem', fontSize: '1.0625rem', lineHeight: '1.7' }}>
            {cta?.description || "We're always looking for great people. Send us a note and we'll reach out when something opens up."}
          </p>
          <Link to={cta?.Button?.url || '/contact'} className="btn-primary" style={{ padding: '0.9375rem 2rem', fontSize: '1.0625rem' }}>
            {cta?.Button?.text || 'Get in touch'} <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Careers;
