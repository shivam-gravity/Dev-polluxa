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

const mobileSections = [
  {
    label: 'Products',
    links: products.map(p => ({ to: p.to, name: p.name })),
  },
  {
    label: 'Customers',
    links: [
      { to: '/customers',    name: 'All customers' },
      { to: '/case-studies', name: 'Case studies & Whitepapers' },
    ],
  },
  {
    label: 'Partners',
    links: [
      { to: '/partners', name: 'Partner network' },
      { to: '/contact',  name: 'Become a partner' },
    ],
  },
  {
    label: 'Company',
    links: [
      { to: '/about',    name: 'About us' },
      { to: '/careers',  name: 'Careers' },
      { to: '/blog',     name: 'Blog' },
      { to: '/events',   name: 'Events' },
      { to: '/contact',  name: 'Contact us' },
    ],
  },
];

const PRODUCT_PATHS  = new Set(['/crm','/commerce','/creator-commerce','/plm','/logistics','/wms','/agents','/marketing','/sales','/data','/helpdesk','/linkedin-outreach','/email-outreach','/whatsapp','/meta-ads','/tam-canvas','/find-lead','/signal-aggregation','/contact-enrichment','/funding-detection','/outreach','/ai-workflows']);
const CUSTOMER_PATHS = new Set(['/customers','/case-studies']);
const PARTNER_PATHS  = new Set(['/partners']);
const COMPANY_PATHS  = new Set(['/about','/careers','/blog','/events','/contact']);

const Layout = () => {
  const location = useLocation();
  const [scrolled, setScrolled]           = useState(false);
  const [menuOpen, setMenuOpen]           = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [openSection, setOpenSection]     = useState(null);
  const [footerSubmitted, setFooterSubmitted] = useState(false);

  const activeNav = PRODUCT_PATHS.has(location.pathname)  ? 'products'
                  : CUSTOMER_PATHS.has(location.pathname) ? 'customers'
                  : PARTNER_PATHS.has(location.pathname)  ? 'partners'
                  : COMPANY_PATHS.has(location.pathname)  ? 'company'
                  : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
    setOpenSection(null);
    /* Blur any focused nav element so :focus-within dropdowns don't stay open after SPA navigation */
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  }, [location.pathname]);

  useEffect(() => {
    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 40);
        setShowScrollTop(y > 400);
        rafId = null;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (!menuOpen) setOpenSection(null);
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* Measure topnav height → CSS variable --topnav-h used by product subnavs */
  useEffect(() => {
    const nav = document.querySelector('.topnav');
    if (!nav) return;
    const set = () => document.documentElement.style.setProperty('--topnav-h', nav.offsetHeight + 'px');
    set();
    const ro = new ResizeObserver(set);
    ro.observe(nav);
    return () => ro.disconnect();
  }, []);

  const toggleSection = (label) =>
    setOpenSection(prev => (prev === label ? null : label));

  return (
    <>
      {/* Skip to main content — visible on keyboard focus */}
      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* Deep space nebula aurora */}
      <div className="nebula-overlay" aria-hidden="true" />

      {/* Web3 hex grid */}
      <div className="hex-overlay" aria-hidden="true" />

      {/* Data rain scan-lines */}
      <div className="data-rain-overlay" aria-hidden="true">
        {[0,1,2,3,4,5,6,7,8,9].map(i => (
          <div key={i} className="rain-col" style={{
            left: `${4 + i * 9.5}%`,
            animationDuration: `${3 + (i % 4) * 0.8}s`,
            animationDelay: `${(i * 0.65) % 3}s`,
          }} />
        ))}
      </div>

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
        <line className="const-line" style={{ animationDelay: '0.0s' }} x1="8%"  y1="12%" x2="25%" y2="28%" stroke="url(#cg1)" strokeWidth="0.6" />
        <line className="const-line" style={{ animationDelay: '0.9s' }} x1="25%" y1="28%" x2="48%" y2="18%" stroke="url(#cg1)" strokeWidth="0.6" />
        <line className="const-line" style={{ animationDelay: '1.8s' }} x1="48%" y1="18%" x2="68%" y2="35%" stroke="url(#cg2)" strokeWidth="0.6" />
        <line className="const-line" style={{ animationDelay: '2.7s' }} x1="68%" y1="35%" x2="88%" y2="16%" stroke="url(#cg2)" strokeWidth="0.6" />
        <line className="const-line" style={{ animationDelay: '3.6s' }} x1="25%" y1="28%" x2="38%" y2="52%" stroke="url(#cg1)" strokeWidth="0.5" />
        <line className="const-line" style={{ animationDelay: '4.5s' }} x1="38%" y1="52%" x2="60%" y2="68%" stroke="url(#cg3)" strokeWidth="0.5" />
        <line className="const-line" style={{ animationDelay: '5.4s' }} x1="60%" y1="68%" x2="80%" y2="55%" stroke="url(#cg2)" strokeWidth="0.5" />
        <line className="const-line" style={{ animationDelay: '6.3s' }} x1="12%" y1="72%" x2="35%" y2="84%" stroke="url(#cg3)" strokeWidth="0.5" />
        <line className="const-line" style={{ animationDelay: '7.2s' }} x1="62%" y1="78%" x2="86%" y2="65%" stroke="url(#cg2)" strokeWidth="0.5" />
        <line className="const-line" style={{ animationDelay: '8.1s' }} x1="88%" y1="16%" x2="80%" y2="55%" stroke="url(#cg2)" strokeWidth="0.4" />
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
        <div className="shoot shoot-7 shoot-violet" />
        <div className="shoot shoot-8 shoot-magenta" />
        <div className="shoot shoot-9 shoot-cyan" />
        <div className="shoot shoot-10 shoot-gold" />
        <div className="shoot shoot-11 shoot-teal" />
      </div>

      {/* Pollux star corona */}
      <div className="pollux-corona" aria-hidden="true" />
      <div className="pollux-orbit"  aria-hidden="true" />

      {/* Aurora curtain */}
      <div className="aurora-curtain" aria-hidden="true" />

      {/* Cosmic dust */}
      <div className="cosmic-dust" aria-hidden="true">
        {[
          { top: '72%', left: '15%', dur: '18s', delay: '0.0s',  color: '#2bb6ff', drift: '20px'  },
          { top: '35%', left: '8%',  dur: '22s', delay: '3.2s',  color: '#8b5cf6', drift: '-15px' },
          { top: '60%', left: '55%', dur: '16s', delay: '7.4s',  color: '#2bb6ff', drift: '25px'  },
          { top: '20%', left: '70%', dur: '20s', delay: '1.6s',  color: '#00d3a7', drift: '-20px' },
          { top: '82%', left: '80%', dur: '25s', delay: '5.0s',  color: '#2bb6ff', drift: '10px'  },
          { top: '48%', left: '42%', dur: '19s', delay: '9.1s',  color: '#ec4899', drift: '-18px' },
          { top: '12%', left: '60%', dur: '24s', delay: '4.3s',  color: '#2bb6ff', drift: '22px'  },
          { top: '90%', left: '30%', dur: '17s', delay: '12.0s', color: '#8b5cf6', drift: '-12px' },
        ].map((p, i) => (
          <div key={i} className="dust-p" style={{
            top: p.top, left: p.left,
            background: p.color,
            animationDuration: p.dur,
            animationDelay: p.delay,
            '--drift': p.drift,
          }} />
        ))}
      </div>

{/* TOP NAV */}
      <nav className={`topnav${scrolled ? ' scrolled' : ''}`} aria-label="Main navigation">
        <div className="topnav-inner">
          {/* Logo */}
          <Link to="/" className="logo" aria-label="Polluxa home">
            <img src={polluxaLogo} alt="Polluxa" className="logo-svg" />
          </Link>

          {/* Nav links — desktop */}
          <div className="topnav-links" aria-label="Primary navigation">

            {/* Products */}
            <span className={`nav-dd${activeNav === 'products' ? ' nav-dd--active' : ''}`} tabIndex="0" role="button" aria-haspopup="true">Products
              <div className="mega mega-wide" role="menu">
                <div className="head">Our Software Suite</div>
                {products.map(({ to, name, desc }) => (
                  <Link key={to} to={to} role="menuitem"
                    aria-current={location.pathname === to ? 'page' : undefined}>
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
            <span className={`nav-dd${activeNav === 'customers' ? ' nav-dd--active' : ''}`} tabIndex="0" role="button" aria-haspopup="true">Customers
              <div className="mega" role="menu">
                <div className="head">Customers</div>
                <Link to="/customers" role="menuitem"><span className="mega-dot"></span>All customers</Link>
                <Link to="/case-studies" role="menuitem"><span className="mega-dot"></span>Case studies &amp; Whitepapers</Link>
                <div className="mega-divider"></div>
                <Link to="/customers" role="menuitem"><span className="mega-dot"></span>By industry</Link>
              </div>
            </span>

            {/* Partners */}
            <span className={`nav-dd${activeNav === 'partners' ? ' nav-dd--active' : ''}`} tabIndex="0" role="button" aria-haspopup="true">Partners
              <div className="mega" role="menu">
                <div className="head">Ecosystem</div>
                <Link to="/partners" role="menuitem"><span className="mega-dot"></span>Partner network</Link>
                <Link to="/contact" role="menuitem"><span className="mega-dot"></span>Become a partner</Link>
              </div>
            </span>

            {/* Company */}
            <span className={`nav-dd${activeNav === 'company' ? ' nav-dd--active' : ''}`} tabIndex="0" role="button" aria-haspopup="true">Company
              <div className="mega" role="menu">
                <div className="head">About Polluxa</div>
                <Link to="/about" role="menuitem"><span className="mega-dot"></span>About us</Link>
                <Link to="/careers" role="menuitem"><span className="mega-dot"></span>Careers</Link>
                <Link to="/blog" role="menuitem"><span className="mega-dot"></span>Blog</Link>
                <Link to="/events" role="menuitem"><span className="mega-dot"></span>Events</Link>
                <div className="mega-divider"></div>
                <Link to="/contact" role="menuitem"><span className="mega-dot"></span>Contact us</Link>
              </div>
            </span>

          </div>

          {/* Right side */}
          <div className="topnav-right">
            <Link to="/contact" className="btn-contact">Contact Us</Link>
            <a href="https://crm.polluxa.com/auth/login" className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.5rem 1.125rem', textDecoration: 'none' }}>
              <span className="nav-live-dot" aria-hidden="true" />Start Today
            </a>

            {/* Hamburger — mobile only */}
            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE NAV OVERLAY */}
      {menuOpen && (
        <div
          className="mobile-nav-overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* MOBILE NAV DRAWER */}
      <nav
        id="mobile-nav-drawer"
        className={`mobile-nav-drawer${menuOpen ? ' is-open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen ? '' : undefined}
      >
        {/* Drawer header */}
        <div className="mobile-nav-header">
          <Link to="/" className="logo" onClick={() => setMenuOpen(false)} aria-label="Polluxa home">
            <img src={polluxaLogo} alt="Polluxa" className="logo-svg" />
          </Link>
          <button
            className="mobile-nav-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>

        {/* Accordion sections */}
        <div className="mobile-nav-body">
          {mobileSections.map(({ label, links }) => (
            <div key={label} className="mobile-nav-section">
              <button
                className="mobile-nav-section-btn"
                onClick={() => toggleSection(label)}
                aria-expanded={openSection === label}
              >
                {label}
                <span className={`mobile-nav-chevron${openSection === label ? ' open' : ''}`} aria-hidden="true">▾</span>
              </button>

              {openSection === label && (
                <div className="mobile-nav-links">
                  {links.map(({ to, name }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setMenuOpen(false)}
                      aria-current={location.pathname === to ? 'page' : undefined}
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA at bottom */}
        <div className="mobile-nav-footer">
          <Link to="/contact" className="mobile-nav-contact" onClick={() => setMenuOpen(false)}>
            Contact Us
          </Link>
        </div>
      </nav>

      <main id="main-content" tabIndex="-1">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-stars" aria-hidden="true" />

        <div className="footer-inner">
          {/* Logo */}
          <div className="footer-logo-col">
            <Link to="/" className="footer-logo" aria-label="Polluxa home">
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
            {footerSubmitted ? (
              <div className="footer-form-success" role="status">
                <span className="footer-form-success-icon">✓</span>
                <p>Thanks! A solution architect will reach out within 1 business day.</p>
                <button className="footer-form-reset" onClick={() => setFooterSubmitted(false)}>Submit another</button>
              </div>
            ) : (
            <form
              className="footer-contact-form"
              onSubmit={(e) => { e.preventDefault(); setFooterSubmitted(true); }}
              aria-label="Quick contact form"
            >
              <div className="fcf-row">
                <input type="text"  placeholder="First Name"     className="fcf-input" autoComplete="given-name" />
                <input type="text"  placeholder="Last Name"      className="fcf-input" autoComplete="family-name" />
              </div>
              <div className="fcf-row">
                <input type="email" placeholder="Business Email" className="fcf-input" autoComplete="email" />
                <input type="text"  placeholder="Company"        className="fcf-input" autoComplete="organization" />
              </div>
              <div className="fcf-row">
                <input type="tel"   placeholder="Phone"          className="fcf-input" autoComplete="tel" />
                <input type="text"  placeholder="Country"        className="fcf-input" autoComplete="country-name" />
              </div>
              <textarea placeholder="Comments" className="fcf-textarea" rows={4} />
              <div style={{ textAlign: 'right' }}>
                <button type="submit" className="fcf-submit">Submit</button>
              </div>
            </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span className="footer-copy">© 2025 Polluxa, All rights reserved.</span>
          <nav className="footer-bottom-links" aria-label="Footer links">
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

      {/* SCROLL TO TOP */}
      {showScrollTop && (
        <button
          className="scroll-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll back to top"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default Layout;
