import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import polluxaLogo from '../assets/polluxa-logo.svg';
import { fetchAPI } from '../lib/api';
import { submitContactForm } from '../lib/forms';

/* Fallback nav/footer content — used until the Strapi fetch resolves (or if
   it fails/returns empty), so chrome never renders blank. Shaped to match
   the `menu.navlinks` / `layout.footer` fields returned by Strapi. */
const FALLBACK_NAV_GROUPS = [
  {
    title: 'Products', heading: 'Our Software Suite',
    links: [
      { title: 'CRM', url: '/crm', subtitle: 'SaaS-based Sales CRM — manage leads, close deals faster, grow revenue.' },
      { title: 'Commerce', url: '/commerce', subtitle: 'Improve customer relations, optimize supply chain and B2B transactions.' },
      { title: 'Creator Commerce', url: '/creator-commerce', subtitle: 'Empower creators and influencers to launch and scale e-commerce brands.' },
      { title: 'Product Lifecycle Management', url: '/plm', subtitle: 'Reduce costs and time to market. Improve collaboration across teams.' },
      { title: 'Logistics', url: '/logistics', subtitle: 'Last-mile delivery services via a robust network of hubs and couriers.' },
      { title: 'Warehouse Management System', url: '/wms', subtitle: 'Increase fulfilment rates and streamline warehouse operations.' },
      { title: 'Retail', url: '/retail', subtitle: 'End-to-end retail management platform for enterprise brands.' },
      { title: 'Digital Lifecycle Management', url: '/dlm', subtitle: 'Manage every digital asset across the full product lifecycle.' },
      { title: 'EnterpriseGPT', url: '/enterprisegpt', subtitle: 'Enterprise AI assistant for commercial operations and decision support.' },
      { title: 'Agentic Commerce', url: '/agentcommerce', subtitle: 'AI agents that autonomously manage your commerce operations 24/7.' },
      { title: 'Marketing', url: '/marketing', subtitle: 'Marketing automation and campaign management for enterprise brands.' },
      { title: 'Merchandise Financial Planning', url: '/merchandise-financial-planning', subtitle: 'Align buying decisions with financial goals.' },
    ],
  },
  {
    title: 'Customers', heading: 'Customers',
    links: [
      { title: 'All customers', url: '/customers' },
      { title: 'Case studies & Whitepapers', url: '/case-studies' },
    ],
  },
  {
    title: 'Partners', heading: 'Ecosystem',
    links: [
      { title: 'Partner network', url: '/partners' },
      { title: 'Become a partner', url: '/contact' },
    ],
  },
  {
    title: 'Company', heading: 'About Polluxa',
    links: [
      { title: 'About us', url: '/about' },
      { title: 'Careers', url: '/careers' },
      { title: 'Blog', url: '/blog' },
      { title: 'Events', url: '/events' },
      { title: 'Contact us', url: '/contact' },
    ],
  },
];

const FALLBACK_NAV_RIGHT = {
  contactUrl: '/contact', contactText: 'Contact Us',
  ctaUrl: 'https://crm.polluxa.com/auth/login', ctaText: 'Start Today',
};

const FALLBACK_FOOTER = {
  copyrightText: '© 2025 Polluxa, All rights reserved.',
  legalLinks: [
    { url: '/careers', text: 'Careers' },
    { url: '/blog', text: 'Blog' },
    { url: '/partners', text: 'Partners' },
    { url: '/customers', text: 'Customers' },
    { url: '/case-studies', text: 'Case Studies' },
    { url: '/about', text: 'About Us' },
    { url: '/events', text: 'Events' },
    { url: '/privacy', text: 'Privacy' },
  ],
  footerMenu: [
    {
      Heading: 'Products',
      FooterLinks: [
        { url: '/crm', text: 'CRM' },
        { url: '/commerce', text: 'Commerce' },
        { url: '/creator-commerce', text: 'Creator Commerce' },
        { url: '/plm', text: 'Product Lifecycle Management' },
        { url: '/logistics', text: 'Logistics' },
        { url: '/wms', text: 'Warehouse Management System' },
        { url: '/retail', text: 'Retail' },
        { url: '/dlm', text: 'Digital Lifecycle Management' },
        { url: '/enterprisegpt', text: 'EnterpriseGPT' },
        { url: '/agentcommerce', text: 'Agentic Commerce' },
        { url: '/marketing', text: 'Marketing' },
        { url: '/merchandise-financial-planning', text: 'Merchandise Financial Planning' },
      ],
    },
    {
      Heading: 'Industries',
      FooterLinks: [
        { url: '/customers', text: 'Fashion & Apparel' },
        { url: '/customers', text: 'Outdoor & Sports' },
        { url: '/customers', text: 'Multi Category Retail' },
        { url: '/customers', text: 'Home & Furniture' },
        { url: '/customers', text: 'Food & Beverage' },
        { url: '/customers', text: 'Consumer Goods' },
        { url: '/customers', text: 'Cosmetics and Personal Care' },
        { url: '/customers', text: 'Consumer Electronics' },
      ],
    },
  ],
};

const PRODUCT_PATHS  = new Set(['/crm','/commerce','/creator-commerce','/plm','/logistics','/wms','/retail','/dlm','/enterprisegpt','/agentcommerce','/merchandise-financial-planning','/agents','/marketing','/sales','/data','/helpdesk','/linkedin-outreach','/email-outreach','/whatsapp','/meta-ads','/tam-canvas','/find-lead','/signal-aggregation','/contact-enrichment','/funding-detection','/outreach','/ai-workflows']);
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
  const [footerSubmitting, setFooterSubmitting] = useState(false);
  const [footerError, setFooterError]     = useState(false);
  const [footerForm, setFooterForm]       = useState({ firstName: '', lastName: '', email: '', company: '', phone: '', country: '', comments: '' });

  const [navGroups, setNavGroups] = useState(FALLBACK_NAV_GROUPS);
  const [navRight, setNavRight]   = useState(FALLBACK_NAV_RIGHT);
  const [footerData, setFooterData] = useState(FALLBACK_FOOTER);

  const activeNav = PRODUCT_PATHS.has(location.pathname)  ? 'products'
                  : CUSTOMER_PATHS.has(location.pathname) ? 'customers'
                  : PARTNER_PATHS.has(location.pathname)  ? 'partners'
                  : COMPANY_PATHS.has(location.pathname)  ? 'company'
                  : null;

  /* Nav mega-menu + footer are CMS-driven (api::main-menu.main-menu / api::global.global),
     with the constants above as a fallback if the fetch fails or returns empty. */
  useEffect(() => {
    let cancelled = false;
    async function loadNav() {
      const [globalRes, menuRes] = await Promise.all([
        fetchAPI('/api/global', {
          'populate[navbar][populate][links]': '*',
          'populate[navbar][populate][button]': '*',
          'populate[footer][populate][legalLinks]': '*',
          'populate[footer][populate][FooterMenu][populate][FooterLinks]': '*',
        }),
        fetchAPI('/api/main-menu', {
          'populate[MainMenuItems][populate][navigations][populate][navlinks]': '*',
        }),
      ]);
      if (cancelled) return;

      const globalAttrs = globalRes?.data?.attributes ?? globalRes?.data;
      const navbar = globalAttrs?.navbar;
      const footer = globalAttrs?.footer;

      if (navbar?.links?.length || navbar?.button) {
        setNavRight({
          contactUrl: navbar.links?.[0]?.url || FALLBACK_NAV_RIGHT.contactUrl,
          contactText: navbar.links?.[0]?.text || FALLBACK_NAV_RIGHT.contactText,
          ctaUrl: navbar.button?.url || FALLBACK_NAV_RIGHT.ctaUrl,
          ctaText: navbar.button?.text || FALLBACK_NAV_RIGHT.ctaText,
        });
      }

      if (footer?.legalLinks?.length || footer?.FooterMenu?.length) {
        setFooterData({
          copyrightText: footer.copyrightText || FALLBACK_FOOTER.copyrightText,
          legalLinks: footer.legalLinks?.length ? footer.legalLinks : FALLBACK_FOOTER.legalLinks,
          footerMenu: footer.FooterMenu?.length ? footer.FooterMenu : FALLBACK_FOOTER.footerMenu,
        });
      }

      const menuAttrs = menuRes?.data?.attributes ?? menuRes?.data;
      const items = menuAttrs?.MainMenuItems ?? [];
      const groups = items
        .filter((item) => item.__component === 'menu.dropdown')
        .map((item) => {
          const nav = item.navigations?.data?.[0];
          const navAttrs = nav?.attributes ?? nav;
          return {
            title: item.title,
            heading: navAttrs?.heading || item.title,
            links: (navAttrs?.navlinks || []).map((l) => ({ title: l.title, url: l.url, subtitle: l.subtitle })),
          };
        })
        .filter((g) => g.links.length > 0);
      if (groups.length > 0) setNavGroups(groups);
    }
    loadNav();
    return () => { cancelled = true; };
  }, []);

  const handleFooterFormChange = (e) => {
    const { name, value } = e.target;
    setFooterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFooterFormSubmit = async (e) => {
    e.preventDefault();
    setFooterSubmitting(true);
    setFooterError(false);
    const message = footerForm.country
      ? `Country: ${footerForm.country}\n\n${footerForm.comments}`
      : footerForm.comments;
    const response = await submitContactForm({
      firstName: footerForm.firstName,
      lastName: footerForm.lastName,
      email: footerForm.email,
      company: footerForm.company,
      phone: footerForm.phone,
      message,
    });
    setFooterSubmitting(false);
    if (response?.error) setFooterError(true);
    else setFooterSubmitted(true);
  };

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

            {navGroups.map((group) => {
              const key = group.title.toLowerCase();
              return (
                <span
                  key={group.title}
                  className={`nav-dd${activeNav === key ? ' nav-dd--active' : ''}`}
                  tabIndex="0" role="button" aria-haspopup="true"
                  onMouseLeave={e => e.currentTarget.blur()}
                >
                  {group.title}
                  <div className={`mega${key === 'products' ? ' mega-wide' : ''}`} role="menu">
                    <div className="head">{group.heading}</div>
                    {group.links.map(({ title, url, subtitle }) => (
                      <Link key={title} to={url} role="menuitem"
                        aria-current={location.pathname === url ? 'page' : undefined}>
                        <span className="mega-dot"></span>
                        {subtitle ? (
                          <span className="mega-product-item">
                            <span className="mpi-name">{title}</span>
                            <span className="mpi-desc">{subtitle}</span>
                          </span>
                        ) : title}
                      </Link>
                    ))}
                  </div>
                </span>
              );
            })}

          </div>

          {/* Right side */}
          <div className="topnav-right">
            <Link to={navRight.contactUrl} className="btn-contact">{navRight.contactText}</Link>
            <a href={navRight.ctaUrl} className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.5rem 1.125rem', textDecoration: 'none' }}>
              <span className="nav-live-dot" aria-hidden="true" />{navRight.ctaText}
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
          {navGroups.map(({ title, links }) => (
            <div key={title} className="mobile-nav-section">
              <button
                className="mobile-nav-section-btn"
                onClick={() => toggleSection(title)}
                aria-expanded={openSection === title}
              >
                {title}
                <span className={`mobile-nav-chevron${openSection === title ? ' open' : ''}`} aria-hidden="true">▾</span>
              </button>

              {openSection === title && (
                <div className="mobile-nav-links">
                  {links.map(({ title: name, url }) => (
                    <Link
                      key={name}
                      to={url}
                      onClick={() => setMenuOpen(false)}
                      aria-current={location.pathname === url ? 'page' : undefined}
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
          <Link to={navRight.contactUrl} className="mobile-nav-contact" onClick={() => setMenuOpen(false)}>
            {navRight.contactText}
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

          {footerData.footerMenu.map(({ Heading, FooterLinks }) => (
            <div className="footer-col" key={Heading}>
              <h5 className="footer-col-title">{Heading}</h5>
              <ul className="footer-col-list">
                {FooterLinks.map(({ url, text }, i) => (
                  <li key={i}><Link to={url}>{text}</Link></li>
                ))}
              </ul>
            </div>
          ))}

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
              onSubmit={handleFooterFormSubmit}
              aria-label="Quick contact form"
            >
              <div className="fcf-row">
                <input type="text"  name="firstName" placeholder="First Name"     className="fcf-input" autoComplete="given-name"   value={footerForm.firstName} onChange={handleFooterFormChange} required />
                <input type="text"  name="lastName"  placeholder="Last Name"      className="fcf-input" autoComplete="family-name"  value={footerForm.lastName}  onChange={handleFooterFormChange} required />
              </div>
              <div className="fcf-row">
                <input type="email" name="email"     placeholder="Business Email" className="fcf-input" autoComplete="email"        value={footerForm.email}     onChange={handleFooterFormChange} required />
                <input type="text"  name="company"   placeholder="Company"        className="fcf-input" autoComplete="organization" value={footerForm.company}   onChange={handleFooterFormChange} required />
              </div>
              <div className="fcf-row">
                <input type="tel"   name="phone"     placeholder="Phone"          className="fcf-input" autoComplete="tel"          value={footerForm.phone}     onChange={handleFooterFormChange} />
                <input type="text"  name="country"   placeholder="Country"        className="fcf-input" autoComplete="country-name" value={footerForm.country}   onChange={handleFooterFormChange} />
              </div>
              <textarea name="comments" placeholder="Comments" className="fcf-textarea" rows={4} value={footerForm.comments} onChange={handleFooterFormChange} />
              {footerError && <span style={{ color: '#f87171', fontSize: '0.8rem' }}>Failed to submit. Please try again.</span>}
              <div style={{ textAlign: 'right' }}>
                <button type="submit" className="fcf-submit" disabled={footerSubmitting}>{footerSubmitting ? 'Submitting…' : 'Submit'}</button>
              </div>
            </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span className="footer-copy">{footerData.copyrightText}</span>
          <nav className="footer-bottom-links" aria-label="Footer links">
            {footerData.legalLinks.map(({ url, text }) => (
              <Link key={url} to={url}>{text}</Link>
            ))}
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
