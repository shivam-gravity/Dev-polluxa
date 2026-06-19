import { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const products = [
  { to: '/crm',             name: 'CRM',                           desc: 'SaaS-based Sales CRM — manage leads, close deals faster, grow revenue.' },
  { to: '/commerce',        name: 'Commerce',                      desc: 'Improve customer relations, optimize supply chain and B2B transactions.' },
  { to: '/creator-commerce',name: 'Creator Commerce',              desc: 'Empower creators and influencers to launch and scale e-commerce brands.' },
  { to: '/plm',             name: 'Product Lifecycle Management',  desc: 'Reduce costs and time to market. Improve collaboration across teams.' },
  { to: '/logistics',       name: 'Logistics',                     desc: 'Last-mile delivery services via a robust network of hubs and couriers.' },
  { to: '/wms',             name: 'Warehouse Management System',   desc: 'Increase fulfilment rates and streamline warehouse operations.' },
];

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {/* TOP NAV */}
      <nav className="topnav">
        <div className="topnav-inner">
          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo-mark"></span> Polluxa
          </Link>

          {/* Nav links */}
          <div className="topnav-links">

            {/* Products */}
            <span className="nav-dd" tabIndex="0">Products
              <div className="mega mega-wide">
                <div className="head">Our Software Suite</div>
                {products.map(({ to, name, desc }) => (
                  <Link key={to} to={to}>
                    <span className="mega-dot"></span>
                    <span className="mega-product-item">
                      <span className="mpi-name">{name}</span>
                      <span className="mpi-desc">{desc}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </span>

            {/* Customers */}
            <span className="nav-dd" tabIndex="0">Customers
              <div className="mega">
                <div className="head">Customers</div>
                <Link to="/customers"><span className="mega-dot"></span>All customers</Link>
                <Link to="/case-studies"><span className="mega-dot"></span>Case studies &amp; Whitepapers</Link>
                <div className="mega-divider"></div>
                <Link to="/customers"><span className="mega-dot"></span>By industry</Link>
              </div>
            </span>

            {/* Partners */}
            <span className="nav-dd" tabIndex="0">Partners
              <div className="mega">
                <div className="head">Ecosystem</div>
                <Link to="/partners"><span className="mega-dot"></span>Partner network</Link>
                <Link to="/contact"><span className="mega-dot"></span>Become a partner</Link>
              </div>
            </span>

            {/* Company */}
            <span className="nav-dd" tabIndex="0">Company
              <div className="mega">
                <div className="head">About Polluxa</div>
                <Link to="/about"><span className="mega-dot"></span>About us</Link>
                <Link to="/careers"><span className="mega-dot"></span>Careers</Link>
                <Link to="/blog"><span className="mega-dot"></span>Blog</Link>
                <Link to="/events"><span className="mega-dot"></span>Events</Link>
                <div className="mega-divider"></div>
                <Link to="/contact"><span className="mega-dot"></span>Contact us</Link>
              </div>
            </span>

          </div>

          {/* Right side */}
          <div className="topnav-right">
            <span className="lang">العربية</span>
            <Link to="/contact" className="btn-contact">Contact Us</Link>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer>
        <div className="foot-inner" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1.2fr 1.2fr', gap: '3rem', alignItems: 'start' }}>
          {/* Logo */}
          <div>
            <div className="logo" style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="logo-mark"></span> Polluxa
            </div>
          </div>

          {/* Products */}
          <div>
            <h5>Products</h5>
            <ul>
              <li><Link to="/crm">CRM</Link></li>
              <li><Link to="/commerce">Commerce</Link></li>
              <li><Link to="/creator-commerce">Creator Commerce</Link></li>
              <li><Link to="/plm">Product Lifecycle Management</Link></li>
              <li><Link to="/logistics">Logistics</Link></li>
              <li><Link to="/wms">Warehouse Management System</Link></li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h5>Industries</h5>
            <ul>
              <li><Link to="/customers">Fashion &amp; Apparel</Link></li>
              <li><Link to="/customers">Outdoor &amp; Sports</Link></li>
              <li><Link to="/customers">Multi Category Retail</Link></li>
              <li><Link to="/customers">Home &amp; Furniture</Link></li>
              <li><Link to="/customers">Food &amp; Beverage</Link></li>
              <li><Link to="/customers">Consumer Goods</Link></li>
              <li><Link to="/customers">Cosmetics and Personal Care</Link></li>
              <li><Link to="/customers">Consumer Electronics</Link></li>
            </ul>
          </div>

          {/* Quick Contact */}
          <div>
            <h5>Quick Contact</h5>
            <p style={{ fontSize: '13px', color: '#8a98c0', marginBottom: '1rem', lineHeight: '1.6' }}>
              Have a question or want a demo? Drop us a message and we'll get back to you within one business day.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); window.location.href = '/contact'; }} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <input
                type="text"
                placeholder="Your name"
                style={{ padding: '0.5rem 0.75rem', borderRadius: '0.375rem', border: '1px solid #2a3450', background: '#111827', color: '#fff', fontSize: '13px' }}
              />
              <input
                type="email"
                placeholder="Work email"
                style={{ padding: '0.5rem 0.75rem', borderRadius: '0.375rem', border: '1px solid #2a3450', background: '#111827', color: '#fff', fontSize: '13px' }}
              />
              <button
                type="submit"
                style={{ padding: '0.55rem 1rem', borderRadius: '0.375rem', background: 'var(--primary-color)', color: '#fff', fontWeight: '700', fontSize: '13px', border: 'none', cursor: 'pointer', letterSpacing: '0.02em' }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="foot-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <span style={{ fontSize: '13px', color: '#8a98c0' }}>© 2025 Pollux, All rights reserved.</span>
          <nav style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', fontSize: '13px' }}>
            <Link to="/careers">Careers</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/partners">Partners</Link>
            <Link to="/customers">Customers</Link>
            <Link to="/case-studies">Case Studies</Link>
            <Link to="/about">About Us</Link>
            <Link to="/events">Events</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </nav>
        </div>
      </footer>
    </>
  );
};

export default Layout;
