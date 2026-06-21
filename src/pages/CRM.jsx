import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchAPI } from '../lib/api';

const SCROLL_THRESHOLD = 80;

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


/* ── Animated counter for numeric metrics ── */
const Counter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimestamp = null;
          const duration = 1500;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) window.requestAnimationFrame(step);
          };
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const NAV_ITEMS = [
  { id: 'overview',  label: 'Overview' },
  { id: 'features',  label: 'Features' },
  { id: 'channels',  label: 'Channels' },
  { id: 'modules',   label: 'Modules' },
  { id: 'faq',       label: 'FAQ' },
];

/* Colors assigned by position — keeps cards visually distinct without storing CSS vars in Strapi */
const FEAT_COLORS = [
  'var(--violet)',
  'var(--cyan)',
  'var(--mint)',
  'var(--magenta)',
  'var(--gold)',
  'var(--blue-deep)',
];


const CRM = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  /* fetch page content */
  useEffect(() => {
    fetchAPI('/api/crms', { 'filters[slug][$eq]': 'overview' }).then((res) => {
      const attrs = res?.data?.[0]?.attributes ?? null;
      setPage(attrs);
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
          topnav.setAttribute('data-subnav', 'crm');
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

  /* pull values from API; fall back to empty arrays so maps never crash */
  const metrics      = page?.metrics      ?? [];
  const capabilities = page?.capabilities ?? [];
  const channels     = page?.channels     ?? [];
  const modules      = page?.modules      ?? [];
  const faq          = page?.faq          ?? [];

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: 'var(--color-text-secondary)' }}>
        Loading…
      </div>
    );
  }

  /* Sub-nav items rendered into the topnav via a portal-like sticky bar that
     is OUTSIDE the topnav at rest, then visually merges into it on scroll. */
  const subNavBar = (
    <div
      className="page-subnav"
      data-scrolled={scrolled ? 'true' : undefined}
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
        <Link to="/crm" style={{ fontWeight: '800', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none', flexShrink: 0 }}>CRM</Link>
        <nav style={{ display: 'flex', alignItems: 'stretch', gap: '1.5rem', height: '100%' }}>
          {NAV_ITEMS.map(({ id, label }) => (
            <a key={id} href={`#${id}`} style={navLinkStyle(id)}>{label}</a>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <div className="crm-page">

      {/* Sub-nav bar — visible at top, merges into topnav on scroll */}
      {subNavBar}

      {/* Inline topnav sub-nav (shown inside topnav when scrolled) */}
      {scrolled && (
        <div
          className="topnav-subnav-inline"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '64px',
            zIndex: 55,
            display: 'flex',
            alignItems: 'center',
            padding: '0 28px',
            gap: '1.5rem',
            pointerEvents: 'none',
          }}
        >
          {/* spacer for logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '800', fontSize: '24px', letterSpacing: '-0.5px', color: '#fff', opacity: 0 }}>
            <span style={{ width: '30px', height: '30px' }} />
            Polluxa
          </div>
          {/* sub-nav links shown in the header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0', height: '64px', pointerEvents: 'auto' }}>
            <span style={{ fontWeight: '800', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginRight: '1.5rem' }}>CRM</span>
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
              <div className="orb orb-2"></div>
            </div>
            <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
              <h1 className="gradient-text" style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1' }}>
                {page?.hero_title}
              </h1>
              <p style={{ fontSize: '1.5rem', fontWeight: '600', margin: '1.5rem 0 2rem', color: 'var(--color-text-secondary)' }}>
                <em>{page?.hero_subtitle}</em>
              </p>
              <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', color: 'var(--color-text-secondary)' }}>
                {page?.hero_description}
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4rem' }}>
                <a href={page?.cta_primary_url} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                  {page?.cta_primary_label} <ArrowRight size={18} className="btn-icon" />
                </a>
                <Link to={page?.cta_secondary_url ?? '/contact'} className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                  {page?.cta_secondary_label}
                </Link>
              </div>

              {/* Metrics */}
              {metrics.length > 0 && (
                <div className="grid-4" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '3rem', marginTop: '2rem' }}>
                  {metrics.map((m, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <h3 style={{ fontSize: '2.75rem', color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
                        {m.type === 'counter'
                          ? <Counter target={m.target} suffix={m.suffix} />
                          : m.display}
                      </h3>
                      <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>{m.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* ── Features — data from Strapi capabilities field ── */}
          {capabilities.length > 0 && (
            <section id="features" className="section section-light animate-on-scroll">
              <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                  <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--cyan)' }}>Features</span>
                  <h2 style={{ marginTop: '0.5rem' }}>Core Features of <em>CRM</em></h2>
                  <p style={{ maxWidth: '680px', margin: '1rem auto 0', color: 'var(--muted)' }}>
                    Six modules, all sharing the same contacts, agents, and data graph.
                  </p>
                </div>
                <div className="grid-3">
                  {capabilities.map((f, i) => {
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

          {/* Channels */}
          <section id="channels" className="section section-light animate-on-scroll">
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--color-accent-teal)' }}>Channels</span>
                <h2 style={{ marginTop: '0.5rem' }}>Where you reach buyers, <em>at scale.</em></h2>
                <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--color-text-secondary)' }}>
                  Four execution channels — wired together, governed centrally.{' '}
                  <strong>LinkedIn is our home turf</strong> and the strongest engine in our stack.
                </p>
              </div>
              <div className="grid-2">
                {channels.map((ch, i) => (
                  <div key={i} className="card" style={ch.is_featured ? { border: '2px solid var(--color-success)', position: 'relative' } : {}}>
                    {ch.is_featured && (
                      <span style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: '#e0f2fe', color: '#0369a1', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Star size={12} fill="#0369a1" /> {ch.featured_label}
                      </span>
                    )}
                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-text-secondary)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                      {ch.badge}
                    </div>
                    <h3 style={{ marginBottom: '1rem' }}>{ch.title}</h3>
                    <p
                      style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginBottom: ch.stats?.length ? '1.5rem' : '2.5rem' }}
                      dangerouslySetInnerHTML={{ __html: ch.description }}
                    />
                    {ch.stats?.length > 0 && (
                      <div style={{ display: 'flex', gap: '2rem', padding: '1rem 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', marginBottom: '1.5rem' }}>
                        {ch.stats.map((s, si) => (
                          <div key={si}>
                            <strong style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}>{s.value}</strong>
                            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{s.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <Link to={ch.link_url} className="link-animated">
                      Explore <ArrowRight size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Modules */}
          <section id="modules" className="section section-alt animate-on-scroll">
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--color-accent-teal)' }}>Modules</span>
                <h2>Pick a module. <em>Or run them all.</em></h2>
                <p style={{ maxWidth: '750px', margin: '0 auto', color: 'var(--color-text-secondary)' }}>
                  Start free on every module. Mix and match — they share the same contacts, deals and agents.
                </p>
              </div>
              <div className="grid-3">
                {modules.map((mod, i) => {
                  const badgeStyle = mod.badge_variant === 'success'
                    ? { background: 'rgba(16, 185, 129, 0.15)', color: 'var(--color-success-highlight)' }
                    : { background: 'var(--color-background-light)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' };

                  return (
                    <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h4>{mod.title}</h4>
                        <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '600', ...badgeStyle }}>
                          {mod.badge}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', flexGrow: 1, marginBottom: '1.5rem' }}>
                        {mod.description}
                      </p>
                      {mod.external ? (
                        <a href={mod.link_url} className="link-animated">
                          {mod.link_label} <ArrowRight size={16} />
                        </a>
                      ) : (
                        <Link to={mod.link_url} className="link-animated">
                          {mod.link_label} <ArrowRight size={16} />
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <FaqAccordion items={faq} />

          {/* Final CTA */}
          <section className="section section-light animate-on-scroll" style={{ borderTop: '1px solid var(--color-border)' }}>
            <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
              <h2>Run revenue on <em>one platform.</em></h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2.5rem' }}>
                One graph for everything. One workspace for everyone. A starter set of agents — and a workshop to build your own. Spin yours up in 30 seconds.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <a href={page?.cta_primary_url ?? 'https://sales.polluxa.com/'} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                  {page?.cta_primary_label ?? 'Get Agent CRM — Free'} <ArrowRight size={18} className="btn-icon" />
                </a>
                <Link to={page?.cta_secondary_url ?? '/contact'} className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                  Talk to sales
                </Link>
              </div>
            </div>
          </section>

      </main>
    </div>
  );
};

export default CRM;
