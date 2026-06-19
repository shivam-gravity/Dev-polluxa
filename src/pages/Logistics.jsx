import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logistics = () => {
  return (
    <div className="logistics-page">
      {/* Hero */}
      <section className="section section-light" style={{ paddingBottom: '3rem' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Logistics</span>
          <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
            Ship Anywhere. <em>Anytime!</em>
          </h1>
          <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)', lineHeight: '1.6' }}>
            Our robust network of delivery hubs and couriers allows us to offer last-mile delivery services at extremely reasonable prices — enabling you to grow your company by improving customer satisfaction and delivery performance.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Talk to logistics <ArrowRight size={18} className="btn-icon" />
            </Link>
            <Link to="/customers" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Read customer stories
            </Link>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="section section-alt" style={{ padding: '3rem 0' }}>
        <div className="container">
          <div className="grid-3" style={{ textAlign: 'center' }}>
            <div>
              <h3 style={{ fontSize: '2.75rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>20K+</h3>
              <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Orders processed daily</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.75rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>400+</h3>
              <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Courier partners</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.75rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>1000+</h3>
              <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Locations serviced</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Features */}
      <section className="section section-light">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Platform</span>
            <h2 style={{ marginTop: '0.5rem' }}>Everything last-mile, <em>in one place.</em></h2>
          </div>
          <div className="grid-3">
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚚</div>
              <h4>Delivery Suite</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Full courier and shipping flexibility. Offer multiple delivery services — standard, express, bulk, fragile items, and pickup/drop-off (PUDO) — to meet diverse shipping needs.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
              <h4>Best Rates</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Cost-effective shipping solutions. Provide access to some of the lowest market shipping rates to help reduce delivery expenses and improve margins.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</div>
              <h4>Hassle-Free Shipping</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Simplified booking and tracking. Enable easy order booking, bulk label printing, and real-time tracking — streamlining logistics operations and improving efficiency.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💳</div>
              <h4>Cash-Flow Support</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Managed COD and payment cycles. Track Cash-On-Delivery orders and benefit from regular payment cycles — improving cash flow management and financial clarity.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔄</div>
              <h4>Returns</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Simplified returns and reverse pickup. Support easy returns for customers, managing reverse-pickup scheduling, timelines, and costs — improving post-purchase experience.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
              <h4>Fast Pickup</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Reliable first and last-mile delivery. Deliver orders swiftly with dedicated first-mile and last-mile delivery solutions — ensuring prompt pickup and delivery across your network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2>Serving <em>every category.</em></h2>
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
          <h2>Talk to logistics.</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>
            We'll size the savings against your current carriers in 20 minutes.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Get started <ArrowRight size={18} className="btn-icon" />
            </Link>
            <Link to="/customers" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Read Licious story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Logistics;
