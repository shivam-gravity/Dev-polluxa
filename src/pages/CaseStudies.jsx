import { useState, useEffect } from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchAPI, getImgUrl } from '../lib/api';
import { useSeoEffect } from '../lib/seo';
import { fetchPage, getSection } from '../lib/pageContent';

const tagColor = (tag) => {
  const map = { Commerce: '#0ea5e9', PLM: '#8b5cf6', Logistics: '#10b981', Sustainability: '#16a34a', Pharma: '#f59e0b', Beauty: '#ec4899', Fragrance: '#f97316' };
  return map[tag] || '#6b7280';
};

const DEFAULT_STATS = [
  { title: '2000+', description: 'Customers globally' },
  { title: '100%', description: 'Go-live rate' },
  { title: '38', description: 'Countries served' },
  { title: '99%', description: 'Customer retention' },
];

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [hero, setHero] = useState(null);
  const [stats, setStats] = useState(null);
  const [cta, setCta] = useState(null);
  const [pageSeo, setPageSeo] = useState(null);

  useSeoEffect(
    pageSeo || { metaTitle: 'Case Studies & Whitepapers — Polluxa', metaDescription: 'Real outcomes from real enterprises. Plus in-depth whitepapers on the future of commerce, PLM, logistics, and agentic AI.' },
    'Case Studies & Whitepapers — Polluxa'
  );

  useEffect(() => {
    let cancelled = false;
    fetchPage('case-studies').then(({ sections, seo }) => {
      if (cancelled) return;
      setHero(getSection(sections, 'sections.hero'));
      setStats(getSection(sections, 'sections.key-stats'));
      setCta(getSection(sections, 'sections.cta'));
      setPageSeo(seo);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    async function loadCaseStudies() {
      try {
        const response = await fetchAPI('/api/case-studies', {
          populate: '*',
        });
        if (response && response.data && response.data.length > 0) {
          const apiCaseStudies = response.data.map(item => ({
            type: 'Case Study',
            category: 'Customer Story',
            title: item.attributes.title,
            desc: item.attributes.description,
            tags: ['Customer', 'Success'],
            highlight: null,
            slug: item.attributes.slug,
            cover: getImgUrl(item.attributes.cover),
          }));
          setCaseStudies(apiCaseStudies);
        }
      } catch (error) {
        console.error('Failed to load case studies', error);
      }
    }
    loadCaseStudies();
  }, []);

  return (
  <div className="case-studies-page">
    {/* Hero */}
    <section className="section section-light">
      <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Resources</span>
        <h1 style={{ marginTop: '0.5rem', fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1' }}>
          {hero?.title || <>Case Studies & <em>Whitepapers.</em></>}
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.25rem', marginTop: '1.5rem' }}>
          {hero?.description || 'Real outcomes from real enterprises. Plus in-depth whitepapers on the future of commerce, PLM, logistics, and agentic AI.'}
        </p>
      </div>
    </section>

    {/* Stats */}
    <section className="section section-alt" style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="grid-4" style={{ textAlign: 'center' }}>
          {(stats?.keys || DEFAULT_STATS).map(({ title, description }) => (
            <div key={description}>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>{title}</h3>
              <p style={{ color: 'var(--muted)', fontWeight: '500' }}>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Case Studies */}
    <section className="section section-light">
      <div className="container">
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)', fontSize: '0.875rem' }}>Case Studies</span>
          <h2 style={{ marginTop: '0.5rem' }}>Real enterprises. <em>Proven results.</em></h2>
        </div>
        <div className="grid-3">
          {caseStudies.map(({ category, title, desc, tags, highlight, slug, cover }) => (
            <div key={title} className="card" style={{ display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
              {highlight && (
                <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--primary-color)', color: '#fff', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: '800', borderBottomLeftRadius: '0.5rem' }}>{highlight}</div>
              )}
              {cover && (
                <img src={cover} alt={title} loading="lazy" style={{ width: 'calc(100% + 3rem)', margin: '-1.5rem -1.5rem 1rem', aspectRatio: '16/9', objectFit: 'cover' }} />
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <FileText size={14} color="var(--accent-color)" />
                <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-color)' }}>{category}</span>
              </div>
              <h4 style={{ fontSize: '1rem', lineHeight: '1.5', marginBottom: '0.75rem', flex: 1 }}>{title}</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: '1.6', marginBottom: '1rem' }}>{desc}</p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {tags.map((t) => (
                  <span key={t} style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: tagColor(t) + '22', color: tagColor(t), fontWeight: '600' }}>{t}</span>
                ))}
              </div>
              <Link to={`/contact?study=${slug}`} style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto', textDecoration: 'none' }}>
                Read case study <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section section-light" style={{ borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
        <h2>{cta?.title || <>See what Polluxa can do <em>for your business.</em></>}</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>
          {cta?.description || 'Join 2000+ enterprises across 38 countries that run on Polluxa — with a 100% go-live rate and 99% customer retention.'}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to={cta?.Button?.url || '/contact'} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            {cta?.Button?.text || 'Book a demo'} <ArrowRight size={18} className="btn-icon" />
          </Link>
          <Link to="/customers" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            All customers
          </Link>
        </div>
      </div>
    </section>
  </div>
  );
};

export default CaseStudies;
