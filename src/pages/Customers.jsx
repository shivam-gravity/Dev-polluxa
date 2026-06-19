import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Customers = () => {
  return (
    <div className="customers-page">
      {/* Hero Section */}
      <section className="section section-light" style={{ paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Customers</span>
          <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
            2,000+ brands. <em>One platform.</em>
          </h1>
          <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--color-text-secondary)' }}>
            From category-defining retailers to fast-moving creator brands, Polluxa is the operating system behind the businesses you buy from every week.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem' }}>
            <Link to="/case-studies" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Read case studies <ArrowRight size={18} className="btn-icon" />
            </Link>
            <Link to="/contact" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Become a customer
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Logos */}
      <section className="section section-alt" style={{ padding: '4rem 0' }}>
        <div className="container">
          <h4 style={{ textAlign: 'center', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2.5rem', fontSize: '0.9rem' }}>
            Brands that run on Polluxa
          </h4>
          <div className="grid-6" style={{ gap: '2rem', textAlign: 'center', fontWeight: '700', color: 'var(--color-primary)', fontSize: '1.2rem', alignItems: 'center' }}>
            <div style={{ background: 'var(--panel)', padding: '1.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>PharmEasy</div>
            <div style={{ background: 'var(--panel)', padding: '1.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>Pepperfry</div>
            <div style={{ background: 'var(--panel)', padding: '1.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>Licious</div>
            <div style={{ background: 'var(--panel)', padding: '1.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>TeaBox</div>
            <div style={{ background: 'var(--panel)', padding: '1.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>Lucrin</div>
            <div style={{ background: 'var(--panel)', padding: '1.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>Liberty</div>
            <div style={{ background: 'var(--panel)', padding: '1.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>Allbirds</div>
            <div style={{ background: 'var(--panel)', padding: '1.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>Sportswear Co</div>
            <div style={{ background: 'var(--panel)', padding: '1.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>FreshSouk</div>
            <div style={{ background: 'var(--panel)', padding: '1.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>Hue Studio</div>
            <div style={{ background: 'var(--panel)', padding: '1.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>Vendre</div>
            <div style={{ background: 'var(--panel)', padding: '1.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>CasaCo</div>
          </div>
        </div>
      </section>

      {/* Industries Count */}
      <section className="section section-light">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Specialists</span>
            <h2>Specialists for every category.</h2>
          </div>

          <div className="grid-4">
            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👗</div>
              <h4 style={{ marginBottom: '0.25rem' }}>Fashion & Apparel</h4>
              <strong style={{ color: 'var(--accent-color)', fontSize: '0.9rem' }}>420+ brands</strong>
            </div>
            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏔️</div>
              <h4 style={{ marginBottom: '0.25rem' }}>Outdoor & Sports</h4>
              <strong style={{ color: 'var(--accent-color)', fontSize: '0.9rem' }}>180+ brands</strong>
            </div>
            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛍️</div>
              <h4 style={{ marginBottom: '0.25rem' }}>Multi-Category</h4>
              <strong style={{ color: 'var(--accent-color)', fontSize: '0.9rem' }}>240+ retailers</strong>
            </div>
            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛋️</div>
              <h4 style={{ marginBottom: '0.25rem' }}>Home & Furniture</h4>
              <strong style={{ color: 'var(--accent-color)', fontSize: '0.9rem' }}>140+ brands</strong>
            </div>
            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🍱</div>
              <h4 style={{ marginBottom: '0.25rem' }}>Food & Beverage</h4>
              <strong style={{ color: 'var(--accent-color)', fontSize: '0.9rem' }}>310+ brands</strong>
            </div>
            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🧴</div>
              <h4 style={{ marginBottom: '0.25rem' }}>Consumer Goods</h4>
              <strong style={{ color: 'var(--accent-color)', fontSize: '0.9rem' }}>280+ brands</strong>
            </div>
            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💄</div>
              <h4 style={{ marginBottom: '0.25rem' }}>Cosmetics</h4>
              <strong style={{ color: 'var(--accent-color)', fontSize: '0.9rem' }}>220+ brands</strong>
            </div>
            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📱</div>
              <h4 style={{ marginBottom: '0.25rem' }}>Consumer Electronics</h4>
              <strong style={{ color: 'var(--accent-color)', fontSize: '0.9rem' }}>160+ brands</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>In their words</span>
            <h2>What customers say.</h2>
          </div>

          <div className="grid-2">
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '1.125rem', fontStyle: 'italic', color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
                "Polluxa is the fastest-moving, most agile technology we work with. Strong partnership ecosystem, real solutions to complex problems."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <div style={{ background: 'var(--color-background-light)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', border: '1px solid var(--border-color)' }}>CR</div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem' }}>Director, Commerce</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Pepperfry</span>
                </div>
              </div>
            </div>

            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '1.125rem', fontStyle: 'italic', color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
                "Partnering with Polluxa has been transformative. The PLM system is robust — we finally have all our data and process in one place."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <div style={{ background: 'var(--color-background-light)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', border: '1px solid var(--border-color)' }}>SM</div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem' }}>VP, Product</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>PharmEasy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section section-light" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2>Join 2,000+ brands on Polluxa.</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2.5rem' }}>
            Get custom configurations, dedicated migration engineering support, and transparent SLAs.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Book a demo <ArrowRight size={18} className="btn-icon" />
            </Link>
            <Link to="/case-studies" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Read stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Customers;
