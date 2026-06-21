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
            <Link to="/contact" className="btn-contact">Contact Us</Link>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        {/* Starfield background */}
        <div className="footer-stars" aria-hidden="true" />

        <div className="footer-inner">
          {/* Logo */}
          <div className="footer-logo-col">
            <Link to="/" className="footer-logo">
              <span className="logo-mark" />
              Polluxa
            </Link>
          </div>

          {/* Products */}
          <div className="footer-col">
            <h5 className="footer-col-title">Products</h5>
            <ul className="footer-col-list">
              <li><Link to="/crm">CRM</Link></li>
              <li><Link to="/commerce">Commerce</Link></li>
              <li><Link to="/creator-commerce">Creator Commerce</Link></li>
              <li><Link to="/plm">Product Lifecycle Management</Link></li>
              <li><Link to="/logistics">Logistics</Link></li>
              <li><Link to="/wms">Warehouse Management System</Link></li>
            </ul>
          </div>

          {/* Industries */}
          <div className="footer-col">
            <h5 className="footer-col-title">Industries</h5>
            <ul className="footer-col-list">
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
          <div className="footer-col footer-contact-col">
            <h5 className="footer-col-title">Quick Contact</h5>
            <form
              className="footer-contact-form"
              onSubmit={(e) => { e.preventDefault(); window.location.href = '/contact'; }}
            >
              <div className="fcf-row">
                <input type="text"  placeholder="First Name"      className="fcf-input" />
                <input type="text"  placeholder="Last Name"       className="fcf-input" />
              </div>
              <div className="fcf-row">
                <input type="email" placeholder="Business Email"  className="fcf-input" />
                <input type="text"  placeholder="Company"         className="fcf-input" />
              </div>
              <div className="fcf-row">
                <input type="tel"   placeholder="Phone"           className="fcf-input" />
                <input type="text"  placeholder="Country"         className="fcf-input" />
              </div>
              <textarea placeholder="Comments" className="fcf-textarea" rows={4} />
              <div style={{ textAlign: 'right' }}>
                <button type="submit" className="fcf-submit">Submit</button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span className="footer-copy">© 2025 Polluxa, All rights reserved.</span>
          <nav className="footer-bottom-links">
            <Link to="/careers">Careers</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/partners">Partners</Link>
            <Link to="/customers">Customers</Link>
            <Link to="/case-studies">Case Studies</Link>
            <Link to="/about">About Us</Link>
            <Link to="/events">Events</Link>
            <Link to="/privacy">Privacy</Link>
          </nav>
        </div>
      </footer>
    </>
  );
};

export default Layout;
