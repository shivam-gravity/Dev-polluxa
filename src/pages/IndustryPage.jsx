import { useParams, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const IndustryPage = ({ name, count }) => {
  const params = useParams();
  
  // Fallback for dynamic router params if direct props are missing
  const industryName = name || (params.industryName 
    ? params.industryName.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) 
    : 'Industry Segment');
  
  const brandCount = count || '150+';

  return (
    <div className="industry-page">
      <section className="section section-light" style={{ paddingBottom: '3rem' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>
            Specialized Solutions
          </span>
          <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
            Built for <em>{industryName}</em>
          </h1>
          <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)' }}>
            Preconfigured integrations, custom database schemas, and tailored agent workflows optimized exactly for {industryName} brands.
          </p>
          <div style={{ background: 'var(--panel-2)', padding: '1rem 2rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', display: 'inline-block', margin: '2rem 0' }}>
            <span style={{ color: 'var(--muted)', fontSize: '0.9rem', display: 'block' }}>Trusted by</span>
            <strong style={{ fontSize: '1.75rem', color: 'var(--primary-color)' }}>{brandCount} Category Leaders</strong>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="grid-3">
            <div className="card">
              <h4>Custom Pipelines</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginTop: '0.5rem' }}>Custom Kanban states and intent triggers engineered precisely for standard industry lead-funnels.</p>
            </div>
            <div className="card">
              <h4>Native Catalog Rules</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginTop: '0.5rem' }}>Dynamic sizing, attribute definitions, and product parameters mapping preconfigured out of the box.</p>
            </div>
            <div className="card">
              <h4>Direct Integration Kits</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginTop: '0.5rem' }}>Pre-mapped data fields for industry standard supplier tools, inventory hubs, and courier pipelines.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-light" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2>Scale your {industryName} brand on Polluxa.</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>
            Talk to an industry specialist who knows your vertical's specific challenges and metrics.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Book an industry demo <ArrowRight size={18} className="btn-icon" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndustryPage;
