import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Commerce = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.05 });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="commerce-page">
      {/* Breadcrumbs & Tabs */}
      <div style={{ background: 'var(--panel-2)', borderBottom: '1px solid var(--color-border)', padding: '0.75rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
            <Link to="/commerce" style={{ fontWeight: '600' }}>Commerce</Link> / <span>Overview</span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
            <a href="#features" style={{ color: 'var(--color-text-secondary)' }}>Features</a>
            <a href="#b2b" style={{ color: 'var(--color-text-secondary)' }}>B2B</a>
            <a href="#d2c" style={{ color: 'var(--color-text-secondary)' }}>D2C</a>
            <a href="#integrations" style={{ color: 'var(--color-text-secondary)' }}>Integrations</a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section section-light" style={{ paddingBottom: '3rem' }}>
        <div className="background-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-3"></div>
        </div>

        <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Commerce</span>
          <h1 className="gradient-text" style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
            The future of <em>Commerce Today.</em>
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', color: 'var(--color-text-secondary)', marginTop: '1.5rem' }}>
            Polluxa Commerce is a unified platform that powers D2C, B2B portals, and marketplace syndication — with AI agents that recover abandoned carts, reprice dynamically, and manage returns automatically.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4rem' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Book a live demo <ArrowRight size={18} className="btn-icon" />
            </Link>
            <a href="#features" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              See features
            </a>
          </div>

          {/* Trust Badges */}
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', color: 'var(--color-text-secondary)', fontSize: '0.95rem', fontWeight: '600' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>✓ 2000+ Customers</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>✓ PCI DSS · ISO 27001</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>✓ 99% Uptime</span>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="section section-alt" style={{ padding: '3rem 0' }}>
        <div className="container">
          <div className="grid-4" style={{ textAlign: 'center' }}>
            <div>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>99%</h3>
              <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Uptime guaranteed</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>30%</h3>
              <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Y-o-Y growth for customers</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>29%</h3>
              <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Increase in digital revenue</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>27%</h3>
              <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Process automation lift</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="section section-alt animate-on-scroll" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ background: 'var(--panel)', border: '1px solid var(--color-border)', borderRadius: '1rem', padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>Storefront · studio.polluxa</span>
              <span style={{ background: '#dcfce7', color: '#16a34a', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold' }}>Active Channel Synchronization</span>
            </div>
            <div className="grid-4">
              <div style={{ padding: '1rem', background: 'var(--panel-2)', borderRadius: '0.5rem', borderLeft: '4px solid #3b82f6', boxShadow: 'var(--shadow-sm)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 'bold', display: 'block' }}>D2C</span>
                <strong>Linen Co-ord · ₹4,499</strong>
                <span style={{ display: 'block', fontSize: '0.85rem', color: '#16a34a', marginTop: '0.25rem', fontWeight: '500' }}>✓ 42 in stock</span>
              </div>
              <div style={{ padding: '1rem', background: 'var(--panel-2)', borderRadius: '0.5rem', borderLeft: '4px solid #10b981', boxShadow: 'var(--shadow-sm)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 'bold', display: 'block' }}>B2B</span>
                <strong>Bulk PO · 240 units · Brand Z</strong>
                <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--muted)', marginTop: '0.25rem', fontWeight: '500' }}>Net 30 payment terms</span>
              </div>
              <div style={{ padding: '1rem', background: 'var(--panel-2)', borderRadius: '0.5rem', borderLeft: '4px solid #f59e0b', boxShadow: 'var(--shadow-sm)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 'bold', display: 'block' }}>MARKETPLACE</span>
                <strong>Amazon, Flipkart, Myntra</strong>
                <span style={{ display: 'block', fontSize: '0.85rem', color: '#10b981', marginTop: '0.25rem', fontWeight: '500' }}>✓ Synced in real-time</span>
              </div>
              <div style={{ padding: '1rem', background: 'var(--panel-2)', borderRadius: '0.5rem', borderLeft: '4px solid #8b5cf6', boxShadow: 'var(--shadow-sm)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 'bold', display: 'block' }}>AGENT</span>
                <strong>Pricing Agent · raised 14 SKUs</strong>
                <span style={{ display: 'block', fontSize: '0.85rem', color: '#8b5cf6', fontWeight: 'bold', marginTop: '0.25rem' }}>+6% margin | +₹38K/day</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="section section-light animate-on-scroll">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--color-accent-teal)' }}>Features</span>
            <h2>Everything to sell — <em>with agents in every loop.</em></h2>
          </div>

          <div className="grid-3">
            <div className="card">
              <div className="card-icon">🛒</div>
              <h4>Headless storefront</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                Pixel-perfect, blazing-fast PWA storefronts. Themeable, localized, AB-tested by an agent that reads conversion signals continuously.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">📚</div>
              <h4>One catalog, every channel</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                Master your products once. Push to D2C, B2B, marketplaces, retail POS — translated, priced and merchandised per channel automatically.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">🤝</div>
              <h4>B2B portals built in</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                Tiered pricing, quote-to-order, credit limits, account hierarchies, draft carts. Your wholesale buyers feel like they own the storefront.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">💳</div>
              <h4>Checkout that converts</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                One-click, multi-payment, multi-currency. Cart-abandonment agent recovers carts via WhatsApp, email and SMS within minutes.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">📦</div>
              <h4>Order orchestration</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                Split, route, hold, partially fulfill. Plays nicely with Polluxa WMS and Logistics — or your own external legacy tools.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">↩️</div>
              <h4>Returns that don't bleed</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                Self-serve return portal. Returns agent decides refund, replacement, store credit based on the specific margins and policies you set.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* D2C Section */}
      <section id="d2c" className="section section-alt animate-on-scroll">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--color-accent-teal)', textTransform: 'uppercase' }}>D2C Commerce</span>
              <h2 style={{ marginTop: '0.5rem' }}>Your brand, your storefront, your agents.</h2>
              <p style={{ color: 'var(--color-text-secondary)', margin: '1.5rem 0' }}>
                Launch a category-defining D2C brand in weeks. Polluxa Commerce ships with conversion-optimized themes, an AI merchandising agent, and automation sequences built to scale.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--color-text-primary)' }}>
                <li style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>✓ AI merchandiser places hero SKUs and automatically hides out-of-stock items.</li>
                <li style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>✓ Cart-abandon agent recovers checkout drops via WhatsApp + email.</li>
                <li style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>✓ Loyalty, referrals, and gift cards built natively into the unified backend.</li>
                <li style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>✓ Editorial blocks for rich storytelling seamlessly embedded alongside shopping.</li>
              </ul>
            </div>
            {/* Dashboard Visualization */}
            <div style={{ background: 'var(--panel)', border: '1px solid var(--color-border)', borderRadius: '1rem', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
              <h4 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>D2C Dashboard · last 24h</h4>
              <div className="grid-2" style={{ gap: '1.5rem' }}>
                <div style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block' }}>Sessions</span>
                  <strong style={{ fontSize: '1.5rem' }}>42,180</strong>
                  <span style={{ color: '#16a34a', display: 'block', fontSize: '0.8rem' }}>+14% vs yesterday</span>
                </div>
                <div style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block' }}>Conversion</span>
                  <strong style={{ fontSize: '1.5rem' }}>3.42%</strong>
                  <span style={{ color: '#16a34a', display: 'block', fontSize: '0.8rem' }}>+0.4 pts</span>
                </div>
                <div style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block' }}>AOV</span>
                  <strong style={{ fontSize: '1.5rem' }}>₹2,840</strong>
                  <span style={{ color: '#16a34a', display: 'block', fontSize: '0.8rem' }}>+6% growth</span>
                </div>
                <div style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block' }}>Recovered Carts</span>
                  <strong style={{ fontSize: '1.5rem' }}>218</strong>
                  <span style={{ color: '#16a34a', display: 'block', fontSize: '0.8rem', fontWeight: 'bold' }}>₹4.8L recovered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B2B Section */}
      <section id="b2b" className="section section-light animate-on-scroll">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div style={{ order: 2 }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--color-accent-teal)', textTransform: 'uppercase' }}>B2B Commerce</span>
              <h2 style={{ marginTop: '0.5rem' }}>The B2B portal your distributors actually use.</h2>
              <p style={{ color: 'var(--color-text-secondary)', margin: '1.5rem 0' }}>
                Negotiated price lists, MOQs, credit terms, buyer hierarchies, sample requests, RFQ-to-order, custom catalogs per account — all out of the box. No more spreadsheet ordering.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--color-text-primary)' }}>
                <li style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>✓ Tiered pricing & custom promotions per distributor account.</li>
                <li style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>✓ Quote-to-order with built-in internal/external approval workflows.</li>
                <li style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>✓ Credit limits and Net-30/60/90 terms enforced live on checkout.</li>
                <li style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>✓ Quick re-order from past order history, completed in two clicks.</li>
              </ul>
            </div>
            {/* B2B Portal Visual */}
            <div style={{ background: 'var(--panel-2)', border: '1px solid var(--color-border)', borderRadius: '1rem', padding: '2rem', order: 1, boxShadow: 'var(--shadow-md)' }}>
              <h4 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>B2B Portal · Buyer · Distributor Group X</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'var(--panel)', padding: '0.75rem 1rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
                  <span>PO: Quarterly Order · 1,840 units</span>
                  <span style={{ background: '#fef08a', color: '#854d0e', fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>draft</span>
                </div>
                <div style={{ background: 'var(--panel)', padding: '0.75rem 1rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
                  <span>RFQ: Custom Packs · 2 SKUs</span>
                  <span style={{ background: '#fee2e2', color: '#991b1b', fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>awaiting price</span>
                </div>
                <div style={{ background: 'var(--panel)', padding: '0.75rem 1rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
                  <span>Credit: Available · Net 30 terms</span>
                  <span style={{ fontWeight: 'bold', color: '#16a34a' }}>₹38L of ₹50L</span>
                </div>
                <div style={{ background: 'var(--panel)', padding: '0.75rem 1rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
                  <span>Re-order: Same as Q3 Order</span>
                  <button className="btn btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', borderRadius: '4px' }}>₹14L · Reorder</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section id="integrations" className="section section-alt animate-on-scroll">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--color-accent-teal)' }}>Integrations</span>
            <h2>Plays well with <em>your stack.</em></h2>
            <p style={{ maxWidth: '600px', margin: '0.5rem auto 0', color: 'var(--color-text-secondary)' }}>
              Pre-built connectors for marketplaces, payments, shipping, ERP, and taxes. Open API + webhooks for everything else.
            </p>
          </div>

          <div className="grid-6" style={{ gap: '2rem', textAlign: 'center', fontWeight: 'bold', color: 'var(--muted)' }}>
            <div style={{ background: 'var(--panel)', padding: '1.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>Amazon</div>
            <div style={{ background: 'var(--panel)', padding: '1.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>Flipkart</div>
            <div style={{ background: 'var(--panel)', padding: '1.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>Myntra</div>
            <div style={{ background: 'var(--panel)', padding: '1.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>Shopify</div>
            <div style={{ background: 'var(--panel)', padding: '1.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>SAP</div>
            <div style={{ background: 'var(--panel)', padding: '1.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>Oracle</div>
            <div style={{ background: 'var(--panel)', padding: '1.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>Stripe</div>
            <div style={{ background: 'var(--panel)', padding: '1.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>Razorpay</div>
            <div style={{ background: 'var(--panel)', padding: '1.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>PayTabs</div>
            <div style={{ background: 'var(--panel)', padding: '1.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>Shiprocket</div>
            <div style={{ background: 'var(--panel)', padding: '1.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>Avalara</div>
            <div style={{ background: 'var(--panel)', padding: '1.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>Klaviyo</div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section section-light animate-on-scroll" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2>Ready to sell, with agents on your side?</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2.5rem' }}>
            Book a 30-minute call with a Polluxa Commerce architect. We will show you the platform running live on data that mirrors your brand.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Book a live demo <ArrowRight size={18} className="btn-icon" />
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

export default Commerce;
