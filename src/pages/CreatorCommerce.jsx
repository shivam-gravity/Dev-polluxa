import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreatorCommerce = () => {
  return (
    <div className="creator-commerce-page">
      {/* Hero */}
      <section className="section section-light" style={{ paddingBottom: '3rem' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Creator Commerce</span>
          <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
            Creator Commerce Platform for <em>Influencers & Brands.</em>
          </h1>
          <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)', lineHeight: '1.6' }}>
            Polluxa empowers creators and influencers to launch, manage, and scale their e-commerce brands with confidence — enabling seamless selling, performance tracking, and sustainable growth.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Talk to our team <ArrowRight size={18} className="btn-icon" />
            </Link>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="section section-alt" style={{ padding: '3rem 0' }}>
        <div className="container">
          <div className="grid-3" style={{ textAlign: 'center' }}>
            <div>
              <h3 style={{ fontSize: '2.75rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>100+</h3>
              <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Satisfied users</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.75rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>8000+</h3>
              <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Unique pieces of content</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.75rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>10M+</h3>
              <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Impressions generated</p>
            </div>
          </div>
        </div>
      </section>

      {/* Drop showcase */}
      <section className="section section-light">
        <div className="container" style={{ maxWidth: '720px' }}>
          <div style={{ background: 'var(--panel)', border: '1px solid var(--color-border)', borderRadius: '1rem', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
              <strong>Drop · Limited Edition Hoodie · Live</strong>
              <span style={{ background: '#fef9c3', color: '#854d0e', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold' }}>Waitlist open</span>
            </div>
            <div className="grid-3" style={{ gap: '1rem' }}>
              <div style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block' }}>Presold</span>
                <strong>1,840 units</strong>
              </div>
              <div style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block' }}>Audience tracked</span>
                <strong>142K IG · 38K TikTok</strong>
              </div>
              <div style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block' }}>Click-to-cart</span>
                <strong style={{ color: '#16a34a' }}>12.4%</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Features */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Platform</span>
            <h2 style={{ marginTop: '0.5rem' }}>Everything a creator brand needs, <em>in one place.</em></h2>
          </div>
          <div className="grid-3">
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
              <h4>Discovery</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Find the right creators for your brand. Advanced search and matching algorithms surface creators that align with your audience, niche, and campaign goals.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎁</div>
              <h4>Gifting</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Scale seeding campaigns effortlessly. Manage product gifting to creators at scale — from outreach and shipping to tracking and reporting, all in one place.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📸</div>
              <h4>Content</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Centralize and amplify content. Collect, organize, and repurpose creator-generated content across all your marketing channels in a unified content library.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🤝</div>
              <h4>Relationships</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Nurture long-term creator partnerships. Build lasting relationships with your top creators using CRM-style tools designed specifically for influencer management.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
              <h4>Analytics</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Track influencer campaigns and measure ROI. Comprehensive performance dashboards showing reach, engagement, conversions, and attributed revenue per creator.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💸</div>
              <h4>Payments</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Simplify and automate payouts. Manage creator compensation, commission structures, and payments — all automated and integrated with your finance workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Creator types */}
      <section className="section section-light">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2>Built for <em>every creator category.</em></h2>
          </div>
          <div className="grid-4" style={{ textAlign: 'center' }}>
            {['Influencer Brands', 'Beauty', 'Athletes', 'Streetwear', 'Music Artists', 'YouTubers', 'Food Creators', 'Lifestyle & Home'].map(cat => (
              <div key={cat} className="card" style={{ padding: '1.25rem' }}>
                <p style={{ fontWeight: '600', margin: 0 }}>{cat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-alt" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2>Talk to our creator-commerce team.</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>
            We'll get you live in a week.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Get started <ArrowRight size={18} className="btn-icon" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreatorCommerce;
