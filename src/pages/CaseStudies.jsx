import { useState, useEffect } from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchAPI } from '../lib/api';

const tagColor = (tag) => {
  const map = { Commerce: '#0ea5e9', PLM: '#8b5cf6', Logistics: '#10b981', Sustainability: '#16a34a', Pharma: '#f59e0b', Beauty: '#ec4899', Fragrance: '#f97316' };
  return map[tag] || '#6b7280';
};

const FALLBACK_CASE_STUDIES = [
  {
    type: 'Case Study',
    category: 'Commerce · Fashion',
    title: 'How Trendy Fashion grew GMV 3.2× in 12 months with Polluxa Commerce',
    desc: 'A mid-market fashion brand consolidated 6 sales channels, eliminated manual sync, and grew GMV from ₹18 Cr to ₹58 Cr in a single year.',
    tags: ['Commerce'],
    highlight: 'Featured',
    slug: 'trendy-fashion-gmv-growth',
  },
  {
    type: 'Case Study',
    category: 'PLM · Beauty',
    title: 'Style House cuts sample approvals from 14 days to 3 using Polluxa PLM',
    desc: 'A beauty brand accelerated product launches by streamlining BOM management, supplier collaboration, and approval workflows end to end.',
    tags: ['PLM', 'Beauty'],
    highlight: null,
    slug: 'style-house-plm-approval',
  },
  {
    type: 'Case Study',
    category: 'Logistics · Outdoor',
    title: 'Metropolitan Retail achieves 98.5% on-time delivery across 400+ pin codes',
    desc: 'By switching to Polluxa Logistics, a sports retailer halved NDR rates and cut last-mile costs by 25% in Q1.',
    tags: ['Logistics'],
    highlight: null,
    slug: 'metropolitan-retail-logistics',
  },
  {
    type: 'Whitepaper',
    category: 'Industry Report · Sustainability',
    title: 'The future of sustainable supply chains in fashion: 2025 benchmarks',
    desc: 'An in-depth look at ESG reporting requirements, circular economy trends, and how leading brands are rethinking their supplier networks.',
    tags: ['Sustainability'],
    highlight: null,
    slug: 'sustainable-supply-chain-2025',
  },
  {
    type: 'Case Study',
    category: 'WMS · Pharma',
    title: 'How a leading Pharma distributor cut fulfilment cost by 35% with Polluxa WMS',
    desc: 'Slotting optimisation, wave planning, and real-time floor tracking helped a pharma distributor double throughput without adding headcount.',
    tags: ['Pharma'],
    highlight: null,
    slug: 'pharma-wms-cost-reduction',
  },
  {
    type: 'Whitepaper',
    category: 'Industry Report · Fragrance',
    title: 'Creator commerce in luxury fragrance: building brand equity through drops',
    desc: 'How niche fragrance houses are leveraging limited-edition drops and creator partnerships to build cult audiences and premium pricing power.',
    tags: ['Fragrance', 'Beauty'],
    highlight: null,
    slug: 'creator-commerce-fragrance',
  },
];

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState(FALLBACK_CASE_STUDIES);

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
          Case Studies & <em>Whitepapers.</em>
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.25rem', marginTop: '1.5rem' }}>
          Real outcomes from real enterprises. Plus in-depth whitepapers on the future of commerce, PLM, logistics, and agentic AI.
        </p>
      </div>
    </section>

    {/* Stats */}
    <section className="section section-alt" style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="grid-4" style={{ textAlign: 'center' }}>
          <div>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>2000+</h3>
            <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Customers globally</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>100%</h3>
            <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Go-live rate</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>38</h3>
            <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Countries served</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>99%</h3>
            <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Customer retention</p>
          </div>
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
          {caseStudies.map(({ category, title, desc, tags, highlight, slug }) => (
            <div key={title} className="card" style={{ display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
              {highlight && (
                <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--primary-color)', color: '#fff', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: '800', borderBottomLeftRadius: '0.5rem' }}>{highlight}</div>
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
        <h2>See what Polluxa can do <em>for your business.</em></h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>
          Join 2000+ enterprises across 38 countries that run on Polluxa — with a 100% go-live rate and 99% customer retention.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Book a demo <ArrowRight size={18} className="btn-icon" />
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
