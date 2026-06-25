import { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchAPI } from '../lib/api';

const SCROLL_THRESHOLD = 80;

const NAV_ITEMS = [
  { id: 'overview',     label: 'Overview' },
  { id: 'features',     label: 'Features' },
  { id: 'b2b',          label: 'B2B' },
  { id: 'd2c',          label: 'D2C' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'faq',          label: 'FAQ' },
];

const FALLBACK_PAGE = {
  hero_label: 'Commerce Platform',
  hero_title: 'Sell Everywhere. Fulfil Anywhere.',
  hero_description: 'Polluxa Commerce unifies your B2B and D2C channels, order management, and supplier network into one intelligent platform — built for brands that are serious about scale.',
  cta_primary_url: '/contact',
  cta_primary_label: 'Book a live demo',
  cta_secondary_url: '#features',
  cta_secondary_label: 'See all features',
  trust_badges: ['500+ brands onboarded', 'SOC 2 Type II certified', 'Global fulfilment network', 'Live in < 45 days'],
  metrics: [
    { value: '500+',   label: 'Brands on the platform' },
    { value: '99.8%',  label: 'Order accuracy rate' },
    { value: '3.2×',   label: 'Average GMV growth (Y1)' },
    { value: '45 days', label: 'Average go-live time' },
  ],
  product_showcase: [
    { type: 'Channel',   title: 'Shopify',     color: '#00d3a7', detail: 'Active',     detail_color: '#16a34a' },
    { type: 'Channel',   title: 'WooCommerce', color: '#8b5cf6', detail: 'Active',     detail_color: '#16a34a' },
    { type: 'Channel',   title: 'Amazon',      color: '#f5b042', detail: 'Syncing…',   detail_color: '#d97706' },
    { type: 'Warehouse', title: 'MUM-WH-01',   color: '#2bb6ff', detail: '142 orders', detail_color: undefined },
  ],
  ecommerce_features: [
    { icon: '🛒', tag: 'Catalog',        title: 'Unified Product Catalogue',    description: 'One master catalogue that syncs across every storefront and marketplace automatically.', link_url: '/commerce' },
    { icon: '📦', tag: 'Fulfilment',     title: 'Smart Order Routing',          description: 'Route every order to the optimal warehouse or 3PL based on proximity, stock, and cost.', link_url: '/wms' },
    { icon: '📊', tag: 'Analytics',      title: 'Revenue & Sell-Through Intel', description: 'Real-time dashboards on GMV, returns, margin, and channel contribution.', link_url: '/commerce' },
    { icon: '🤝', tag: 'B2B',           title: 'B2B Buyer Portal',             description: 'Self-serve portal for wholesale buyers — orders, invoices, and returns in one place.', link_url: '/commerce' },
    { icon: '🌐', tag: 'Marketplace',   title: 'Marketplace Sync',             description: 'List, price, and fulfil across Amazon, Flipkart, and Myntra without manual work.', link_url: '/commerce' },
    { icon: '⚡', tag: 'Automation',    title: 'Agentic Replenishment',        description: 'AI agents that monitor stock levels and raise purchase orders before you run out.', link_url: '/agents' },
  ],
  d2c_section: {
    label: 'Direct-to-Consumer',
    title: 'Own your customer relationship, end to end.',
    description: 'Launch branded storefronts, run campaigns, and deliver a seamless post-purchase experience that turns first-time buyers into loyal fans.',
    bullets: ['Multi-currency checkout', 'Loyalty & rewards engine', 'Abandoned cart recovery', 'Personalised recommendations'],
    dashboard_title: 'D2C Storefront · Live Stats',
    dashboard: [
      { label: 'Sessions today',  value: '18,420', trend: '↑ 14% vs last week',  trend_color: '#16a34a' },
      { label: 'Conversion rate', value: '4.2%',   trend: '↑ 0.6pp this month',  trend_color: '#16a34a' },
      { label: 'Avg order value', value: '₹2,840',  trend: 'Stable',              trend_color: '#8a98c0' },
      { label: 'Revenue (MTD)',   value: '₹1.4 Cr', trend: '↑ 22% vs last month', trend_color: '#16a34a' },
    ],
  },
  b2b_section: {
    label: 'Business-to-Business',
    title: 'Close more wholesale deals with less back-and-forth.',
    description: 'Give your retail partners a self-serve portal to place orders, view invoices, and track shipments — fully integrated with your ERP and WMS.',
    bullets: ['Custom price lists per buyer', 'Credit limit management', 'EDI & API connectivity', 'Automated invoicing'],
    portal_title: 'Buyer Portal · Sample Orders',
    portal_items: [
      { label: 'Trendy Fashion Pvt Ltd',  type: 'badge',  status: 'Confirmed', status_bg: 'rgba(0,211,167,0.15)', status_color: '#00d3a7' },
      { label: 'Style House Exports',     type: 'value',  value: '₹4.2L',     value_color: '#2bb6ff' },
      { label: 'Metropolitan Retail',     type: 'badge',  status: 'Pending',   status_bg: 'rgba(245,176,66,0.15)', status_color: '#f5b042' },
      { label: 'New Partner Inquiry',     type: 'button', action_label: 'Approve' },
    ],
  },
  integrations_list: ['Shopify', 'WooCommerce', 'PayPal', 'Salesforce', 'Google Analytics', 'Outlook', 'Gmail', 'Slack'],
  faq: [
    { question: 'Can Polluxa Commerce handle both B2B and D2C simultaneously?', answer: 'Yes. The platform manages separate price lists, buyer portals, and fulfilment logic for B2B and D2C from one admin.' },
    { question: 'How does inventory sync work across channels?',                answer: 'A single inventory ledger propagates changes to all connected channels in real time — no overselling, no manual updates.' },
    { question: 'How long does it take to go live?',                           answer: 'Most brands are live in 30–45 days. We handle data migration, integration setup, and training end to end.' },
    { question: 'Do you support international selling?',                       answer: 'Yes — multi-currency checkout, region-based pricing, and localised tax calculation are all built in.' },
  ],
};

const FEAT_COLORS = [
  'var(--cyan)',
  'var(--mint)',
  'var(--violet)',
  'var(--gold)',
  'var(--magenta)',
  'var(--blue-deep)',
];

const FaqAccordion = ({ items = [] }) => {
  const [open, setOpen] = useState(null);
  if (!items.length) return null;
  return (
    <section id="faq" className="section section-alt animate-on-scroll">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--mint)' }}>FAQ</span>
          <h2 style={{ marginTop: '0.5rem' }}>Common questions</h2>
        </div>
        {items.map((item, i) => (
          <div key={i} style={{ borderBottom: '1px solid var(--line-strong)' }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{ width: '100%', textAlign: 'left', padding: '1.25rem 0', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}
            >
              <span style={{ fontWeight: '600', color: 'var(--ink)', fontSize: '1rem' }}>{item.question}</span>
              <ChevronDown size={18} style={{ flexShrink: 0, color: 'var(--muted)', transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            {open === i && (
              <p style={{ color: 'var(--muted)', paddingBottom: '1.25rem', margin: 0, lineHeight: '1.7' }}>{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const Commerce = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  /* fetch page content */
  useEffect(() => {
    fetchAPI('/api/commerces', { 'filters[slug][$eq]': 'overview' }).then((res) => {
      setPage(res?.data?.[0]?.attributes ?? FALLBACK_PAGE);
      setLoading(false);
    });
  }, []);

  /* scroll-merge: toggle scrolled state and mark topnav */
  useEffect(() => {
    const topnav = document.querySelector('.topnav');
    const onScroll = () => {
      const isScrolled = window.scrollY > SCROLL_THRESHOLD;
      setScrolled(isScrolled);
      if (topnav) {
        if (isScrolled) {
          topnav.setAttribute('data-subnav', 'commerce');
        } else {
          topnav.removeAttribute('data-subnav');
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (topnav) topnav.removeAttribute('data-subnav');
    };
  }, []);

  /* scroll-spy */
  useEffect(() => {
    const observers = NAV_ITEMS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.25, rootMargin: '-10% 0px -60% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  /* animate-on-scroll */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.05 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  const navLinkStyle = (id) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0 0.25rem',
    height: '100%',
    fontSize: '0.875rem',
    fontWeight: activeSection === id ? '600' : '500',
    color: activeSection === id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
    textDecoration: 'none',
    transition: 'color 0.15s ease',
    borderBottom: activeSection === id ? '2px solid var(--color-primary)' : '2px solid transparent',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  });

  /* pull arrays from API; fall back to [] so maps never crash */
  const trustBadges        = page?.trust_badges        ?? [];
  const metrics            = page?.metrics             ?? [];
  const productShowcase    = page?.product_showcase    ?? [];
  const ecommerceFeatures  = page?.ecommerce_features  ?? [];
  const d2c                = page?.d2c_section         ?? {};
  const b2b             = page?.b2b_section       ?? {};
  const integrations    = page?.integrations_list ?? [];
  const faq             = page?.faq               ?? [];

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: 'var(--color-text-secondary)' }}>
        Loading…
      </div>
    );
  }

  /* Sub-nav bar + scroll-merge into topnav */
  const subNavBar = (
    <div
      className="page-subnav"
      style={{
        position: 'sticky',
        top: '64px', /* fixed — never animates through the topnav */
        zIndex: 30,
        background: 'rgba(6,10,24,0.85)',
        backdropFilter: scrolled ? 'none' : 'saturate(160%) blur(14px)',
        borderBottom: scrolled ? 'none' : '1px solid var(--line)',
        height: '48px',
        opacity: scrolled ? 0 : 1,
        overflow: 'hidden',
        transition: 'opacity 0.2s ease, top 0.25s ease',
        pointerEvents: scrolled ? 'none' : 'auto',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', gap: '1.5rem', height: '48px' }}>
        <Link to="/commerce" style={{ fontWeight: '800', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none', flexShrink: 0 }}>Commerce</Link>
        <nav style={{ display: 'flex', alignItems: 'stretch', gap: '1.5rem', height: '100%' }}>
          {NAV_ITEMS.map(({ id, label }) => (
            <a key={id} href={`#${id}`} style={navLinkStyle(id)}>{label}</a>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <div className="commerce-page">

      {subNavBar}

      {/* Inline topnav sub-nav (shown inside topnav when scrolled) */}
      {scrolled && (
        <div
          className="topnav-subnav-inline"
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0,
            height: '64px', zIndex: 55,
            display: 'flex', alignItems: 'center',
            padding: '0 28px', gap: '1.5rem',
            pointerEvents: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '800', fontSize: '24px', letterSpacing: '-0.5px', color: '#fff', opacity: 0 }}>
            <span style={{ width: '30px', height: '30px' }} />
            Polluxa
          </div>
          <div style={{ display: 'flex', alignItems: 'center', height: '64px', pointerEvents: 'auto' }}>
            <span style={{ fontWeight: '800', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginRight: '1.5rem' }}>Commerce</span>
            {NAV_ITEMS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  height: '64px', padding: '0 0.75rem',
                  fontSize: '14px', fontWeight: activeSection === id ? '600' : '500',
                  color: activeSection === id ? '#fff' : 'var(--muted)',
                  textDecoration: 'none',
                  borderBottom: activeSection === id ? '2px solid var(--cyan)' : '2px solid transparent',
                  transition: 'color 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
              >{label}</a>
            ))}
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <main>

          {/* Overview / Hero */}
          <section id="overview" className="section section-light" style={{ paddingBottom: '3rem' }}>
            <div className="background-orbs">
              <div className="orb orb-1"></div>
              <div className="orb orb-3"></div>
            </div>
            <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>
                {page?.hero_label}
              </span>
              <h1 className="gradient-text" style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
                {page?.hero_title}
              </h1>
              <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', color: 'var(--muted)', marginTop: '1.5rem' }}>
                {page?.hero_description}
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4rem' }}>
                <Link to={page?.cta_primary_url ?? '/contact'} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                  {page?.cta_primary_label} <ArrowRight size={18} className="btn-icon" />
                </Link>
                <a href={page?.cta_secondary_url ?? '#features'} className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                  {page?.cta_secondary_label}
                </a>
              </div>

              {/* Trust Badges */}
              {trustBadges.length > 0 && (
                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', color: 'var(--muted)', fontSize: '0.95rem', fontWeight: '600' }}>
                  {trustBadges.map((badge, i) => (
                    <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>{badge}</span>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Key Metrics */}
          {metrics.length > 0 && (
            <section className="section section-alt" style={{ padding: '3rem 0' }}>
              <div className="container">
                <div className="grid-4" style={{ textAlign: 'center' }}>
                  {metrics.map((m, i) => (
                    <div key={i}>
                      <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>{m.value}</h3>
                      <p style={{ color: 'var(--muted)', fontWeight: '500' }}>{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Product Showcase */}
          {productShowcase.length > 0 && (
            <section className="section section-alt animate-on-scroll" style={{ padding: '4rem 0' }}>
              <div className="container">
                <div style={{ background: 'var(--panel)', border: '1px solid var(--color-border)', borderRadius: '1rem', padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
                  <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>Storefront · studio.polluxa</span>
                    <span style={{ background: '#dcfce7', color: '#16a34a', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold' }}>Active Channel Synchronization</span>
                  </div>
                  <div className="grid-4">
                    {productShowcase.map((item, i) => (
                      <div key={i} style={{ padding: '1rem', background: 'var(--panel-2)', borderRadius: '0.5rem', borderLeft: `4px solid ${item.color}`, boxShadow: 'var(--shadow-sm)' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 'bold', display: 'block' }}>{item.type}</span>
                        <strong>{item.title}</strong>
                        <span style={{ display: 'block', fontSize: '0.85rem', color: item.detail_color ?? 'var(--muted)', marginTop: '0.25rem', fontWeight: item.detail_color ? 'bold' : '500' }}>
                          {item.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Features — data from Strapi ecommerce_features field */}
          {ecommerceFeatures.length > 0 && (
            <section id="features" className="section section-light animate-on-scroll">
              <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                  <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--cyan)' }}>Features</span>
                  <h2 style={{ marginTop: '0.5rem' }}>E-commerce <em>Encompassed</em></h2>
                  <p style={{ maxWidth: '680px', margin: '1rem auto 0', color: 'var(--muted)' }}>
                    Polluxa E-commerce links your value chain, people, systems, and procedures to maximize product performance and go-to-market.
                  </p>
                </div>
                <div className="grid-3">
                  {ecommerceFeatures.map((f, i) => {
                    const color = FEAT_COLORS[i % FEAT_COLORS.length];
                    return (
                      <a key={i} href={f.link_url} target="_blank" rel="noopener noreferrer" className="crm-feat-card">
                        <div className="crm-feat-icon" style={{ background: color + '1a', color }}>
                          {f.icon}
                        </div>
                        <span className="crm-feat-tag" style={{ color }}>{f.tag}</span>
                        <h4 className="crm-feat-title">{f.title}</h4>
                        <p className="crm-feat-desc">{f.description}</p>
                      </a>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* D2C Section */}
          {d2c.title && (
            <section id="d2c" className="section section-alt animate-on-scroll">
              <div className="container">
                <div className="grid-2" style={{ alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--mint)', textTransform: 'uppercase' }}>
                      {d2c.label}
                    </span>
                    <h2 style={{ marginTop: '0.5rem' }}>{d2c.title}</h2>
                    <p style={{ color: 'var(--muted)', margin: '1.5rem 0' }}>{d2c.description}</p>
                    <ul style={{ listStyle: 'none', padding: 0, color: 'var(--ink)' }}>
                      {(d2c.bullets ?? []).map((b, i) => (
                        <li key={i} style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>✓ {b}</li>
                      ))}
                    </ul>
                  </div>
                  {/* D2C Dashboard */}
                  <div style={{ background: 'var(--panel)', border: '1px solid var(--line-strong)', borderRadius: '1rem', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
                    <h4 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--line-strong)', paddingBottom: '0.5rem' }}>
                      {d2c.dashboard_title}
                    </h4>
                    <div className="grid-2" style={{ gap: '1.5rem' }}>
                      {(d2c.dashboard ?? []).map((stat, i) => (
                        <div key={i} style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '0.5rem' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block' }}>{stat.label}</span>
                          <strong style={{ fontSize: '1.5rem' }}>{stat.value}</strong>
                          <span style={{ color: stat.trend_color, display: 'block', fontSize: '0.8rem', fontWeight: '500' }}>{stat.trend}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* B2B Section */}
          {b2b.title && (
            <section id="b2b" className="section section-light animate-on-scroll">
              <div className="container">
                <div className="grid-2" style={{ alignItems: 'center' }}>
                  <div style={{ order: 2 }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--mint)', textTransform: 'uppercase' }}>
                      {b2b.label}
                    </span>
                    <h2 style={{ marginTop: '0.5rem' }}>{b2b.title}</h2>
                    <p style={{ color: 'var(--muted)', margin: '1.5rem 0' }}>{b2b.description}</p>
                    <ul style={{ listStyle: 'none', padding: 0, color: 'var(--ink)' }}>
                      {(b2b.bullets ?? []).map((b, i) => (
                        <li key={i} style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>✓ {b}</li>
                      ))}
                    </ul>
                  </div>
                  {/* B2B Portal */}
                  <div style={{ background: 'var(--panel-2)', border: '1px solid var(--color-border)', borderRadius: '1rem', padding: '2rem', order: 1, boxShadow: 'var(--shadow-md)' }}>
                    <h4 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
                      {b2b.portal_title}
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {(b2b.portal_items ?? []).map((item, i) => (
                        <div key={i} style={{ background: 'var(--panel)', padding: '0.75rem 1rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
                          <span>{item.label}</span>
                          {item.type === 'badge' && (
                            <span style={{ background: item.status_bg, color: item.status_color, fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>
                              {item.status}
                            </span>
                          )}
                          {item.type === 'value' && (
                            <span style={{ fontWeight: 'bold', color: item.value_color }}>{item.value}</span>
                          )}
                          {item.type === 'button' && (
                            <button className="btn btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', borderRadius: '4px' }}>
                              {item.action_label}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Integrations */}
          {integrations.length > 0 && (
            <section id="integrations" className="section section-alt animate-on-scroll">
              <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                  <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--mint)' }}>Integrations</span>
                  <h2>Plays well with <em>your stack.</em></h2>
                  <p style={{ maxWidth: '600px', margin: '0.5rem auto 0', color: 'var(--muted)' }}>
                    Pre-built connectors for marketplaces, payments, shipping, ERP, and taxes. Open API + webhooks for everything else.
                  </p>
                </div>
                <div className="grid-6" style={{ gap: '2rem', textAlign: 'center', fontWeight: 'bold', color: 'var(--muted)' }}>
                  {integrations.map((name, i) => (
                    <div key={i} style={{ background: 'var(--panel)', padding: '1.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          <FaqAccordion items={faq} />

          {/* Final CTA */}
          <section className="section section-light animate-on-scroll" style={{ borderTop: '1px solid var(--line-strong)' }}>
            <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
              <h2>Ready to sell, with agents on your side?</h2>
              <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>
                Book a 30-minute call with a Polluxa Commerce architect. We will show you the platform running live on data that mirrors your brand.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Link to={page?.cta_primary_url ?? '/contact'} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                  {page?.cta_primary_label ?? 'Book a live demo'} <ArrowRight size={18} className="btn-icon" />
                </Link>
                <Link to="/customers" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                  Read customer stories
                </Link>
              </div>
            </div>
          </section>

      </main>
    </div>
  );
};

export default Commerce;
