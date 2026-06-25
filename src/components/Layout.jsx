import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import polluxaLogo from '../assets/polluxa-logo.svg';

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
  const [scrolled, setScrolled] = useState(false);
  const [showBar, setShowBar] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Deep space nebula aurora */}
      <div className="nebula-overlay" aria-hidden="true" />

      {/* Web3 hex grid */}
      <div className="hex-overlay" aria-hidden="true" />

      {/* Noise grain texture */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Constellation — Pollux/Gemini star lines */}
      <svg className="constellation-svg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#2bb6ff" stopOpacity="0" />
            <stop offset="50%"  stopColor="#2bb6ff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cg2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#8b5cf6" stopOpacity="0" />
            <stop offset="50%"  stopColor="#ec4899" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#2bb6ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cg3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#00d3a7" stopOpacity="0" />
            <stop offset="50%"  stopColor="#2bb6ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Constellation lines */}
        <line x1="8%"  y1="12%" x2="25%" y2="28%" stroke="url(#cg1)" strokeWidth="0.6" />
        <line x1="25%" y1="28%" x2="48%" y2="18%" stroke="url(#cg1)" strokeWidth="0.6" />
        <line x1="48%" y1="18%" x2="68%" y2="35%" stroke="url(#cg2)" strokeWidth="0.6" />
        <line x1="68%" y1="35%" x2="88%" y2="16%" stroke="url(#cg2)" strokeWidth="0.6" />
        <line x1="25%" y1="28%" x2="38%" y2="52%" stroke="url(#cg1)" strokeWidth="0.5" />
        <line x1="38%" y1="52%" x2="60%" y2="68%" stroke="url(#cg3)" strokeWidth="0.5" />
        <line x1="60%" y1="68%" x2="80%" y2="55%" stroke="url(#cg2)" strokeWidth="0.5" />
        <line x1="12%" y1="72%" x2="35%" y2="84%" stroke="url(#cg3)" strokeWidth="0.5" />
        <line x1="62%" y1="78%" x2="86%" y2="65%" stroke="url(#cg2)" strokeWidth="0.5" />
        <line x1="88%" y1="16%" x2="80%" y2="55%" stroke="url(#cg2)" strokeWidth="0.4" />
        {/* Star nodes */}
        {[[8,12],[25,28],[48,18],[68,35],[88,16],[38,52],[60,68],[80,55],[12,72],[35,84],[62,78],[86,65]].map(([x,y],i) => (
          <circle key={i} cx={`${x}%`} cy={`${y}%`} r={i % 3 === 0 ? '2' : '1.2'}
            fill={i % 3 === 0 ? '#2bb6ff' : i % 3 === 1 ? '#8b5cf6' : '#ec4899'}
            opacity="0.55" className="const-star" style={{ animationDelay: `${i * 0.4}s` }} />
        ))}
      </svg>

      {/* Network pulse nodes */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div className="net-node"         style={{ top: '18%', left:  '7%' }} />
        <div className="net-node violet"  style={{ top: '34%', right: '11%' }} />
        <div className="net-node magenta" style={{ top: '62%', left:  '14%' }} />
        <div className="net-node mint"    style={{ top: '75%', right: '7%' }} />
        <div className="net-node"         style={{ top: '50%', left:  '50%' }} />
      </div>

      {/* Shooting stars */}
      <div className="shoot-wrap" aria-hidden="true">
        <div className="shoot shoot-1" />
        <div className="shoot shoot-2" />
        <div className="shoot shoot-3" />
        <div className="shoot shoot-4" />
        <div className="shoot shoot-5" />
        <div className="shoot shoot-6" />
      </div>

      {/* ANNOUNCEMENT BAR */}
      {showBar && (
        <div className="announce-bar">
          <span>🤖 Agent CRM is now live — <Link to="/agents">free for 3 years</Link> &nbsp;·&nbsp; No credit card required</span>
          <button className="announce-dismiss" onClick={() => setShowBar(false)} aria-label="Dismiss">×</button>
        </div>
      )}

      {/* TOP NAV */}
      <nav className={`topnav${scrolled ? ' scrolled' : ''}`}>
        <div className="topnav-inner">
          {/* Logo */}
          <Link to="/" className="logo">
            <img src={polluxaLogo} alt="Polluxa" className="logo-svg" />
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
              <img src={polluxaLogo} alt="Polluxa" className="logo-svg footer-logo-svg" />
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
