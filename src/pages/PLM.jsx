import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PLM = () => {
  return (
    <div className="plm-page">
      {/* Hero */}
      <section className="section section-light" style={{ paddingBottom: '3rem' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Product Lifecycle Management</span>
          <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
            Manage Less, <em>Scale Smarter.</em>
          </h1>
          <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)' }}>
            Make smarter, data-driven decisions throughout the product lifecycle with Polluxa. If your business is focused on growth, you need a reliable PLM solution that supports your needs today and scales seamlessly for the future.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Book a demo <ArrowRight size={18} className="btn-icon" />
            </Link>
            <Link to="/case-studies" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Read PharmEasy story
            </Link>
          </div>
        </div>
      </section>

      {/* Key stats */}
      <section className="section section-alt" style={{ padding: '3rem 0' }}>
        <div className="container">
          <div className="grid-4" style={{ textAlign: 'center' }}>
            <div>
              <h3 style={{ fontSize: '2.75rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>2000+</h3>
              <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Brands on Polluxa</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.75rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>7×</h3>
              <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Faster styles produced</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.75rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>100%</h3>
              <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Go-live rate</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.75rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>38</h3>
              <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Countries served</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Core Modules */}
      <section className="section section-light">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Built for product teams who ship a lot</span>
            <h2 style={{ marginTop: '0.5rem' }}>Six modules. <em>One platform.</em></h2>
          </div>
          <div className="grid-3">
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎨</div>
              <h4>Product Development</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Unified product creation and collaboration. Bring product ideas to life through a collaborative workspace where designers, engineers, and suppliers work together — reducing errors and accelerating time-to-market.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</div>
              <h4>Inventory</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Advanced stock and resource forecasting. Demand forecasting and resource planning to maximize inventory efficiency and minimize overstock.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚙️</div>
              <h4>Task & Workflow</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Streamlined tasks and process automation. Organize tasks efficiently and enforce standardized workflows across the entire product lifecycle.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏭</div>
              <h4>Vendors</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Seamless supplier collaboration and control. Manage all vendor interactions and procurement centrally — quotes, sampling, and communication threaded to every SKU.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📈</div>
              <h4>Sales</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Integrated product-to-sales alignment. Enable real-time product information access across your sales organization for faster, more accurate selling.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📋</div>
              <h4>PO Sheet</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Automated purchase-order documentation. Streamline procurement processes with automated PO generation, tracking, and reconciliation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2>Built for <em>every category.</em></h2>
          </div>
          <div className="grid-4" style={{ textAlign: 'center' }}>
            {['Fashion & Apparel', 'Outdoor & Sports', 'Multi-Category Retail', 'Home & Furniture', 'Food & Beverage', 'Consumer Goods', 'Cosmetics & Personal Care', 'Consumer Electronics'].map(ind => (
              <div key={ind} className="card" style={{ padding: '1.25rem' }}>
                <p style={{ fontWeight: '600', margin: 0 }}>{ind}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-light" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2>Ready to ship faster, <em>with less rework?</em></h2>
          <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>
            Book a 30-minute demo with a Polluxa PLM specialist. We'll show you the platform on data that mirrors your product categories.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Book a demo <ArrowRight size={18} className="btn-icon" />
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
