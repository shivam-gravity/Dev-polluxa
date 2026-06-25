import { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchAPI } from '../lib/api';

const FAQ = ({ items = [] }) => {
  const [open, setOpen] = useState(null);
  if (!items.length) return null;
  return (
    <section className="section section-alt animate-on-scroll">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--color-accent-teal)' }}>FAQ</span>
          <h2 style={{ marginTop: '0.5rem' }}>Common questions</h2>
        </div>
        {items.map((item, i) => (
          <div key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{ width: '100%', textAlign: 'left', padding: '1.25rem 0', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}
            >
              <span style={{ fontWeight: '600', color: 'var(--color-text-primary)', fontSize: '1rem' }}>{item.question}</span>
              <ChevronDown size={18} style={{ flexShrink: 0, color: 'var(--color-text-secondary)', transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            {open === i && (
              <p style={{ color: 'var(--color-text-secondary)', paddingBottom: '1.25rem', margin: 0, lineHeight: '1.7' }}>{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const FALLBACK_PAGE = {
  hero_title: 'Creator Commerce Platform for Influencers & Brands',
  hero_description: 'Launch, sell, and scale your creator brand — with built-in drop management, audience sync, and fulfilment tools designed for the speed of social commerce.',
  cta_primary_url: '/contact',
  cta_primary_label: 'Book Live Demo',
  cta_secondary_url: '#features',
  cta_secondary_label: 'See all features',
  demo_headline: 'Ready to launch your next drop?',
  demo_description: 'Give us 60 minutes and we will show you how Polluxa Creator Commerce handles everything from waitlist to warehouse.',
  metrics: [
    { value: '1,800+', label: 'Creator brands on the platform' },
    { value: '12.4%',  label: 'Average click-to-cart rate' },
    { value: '3×',     label: 'Revenue growth in year one' },
  ],
  features: [
    { icon: '🚀', title: 'Drop Management',        description: 'Launch limited-edition drops with waitlists, countdown timers, and pre-sell inventory — all in one workflow.' },
    { icon: '📲', title: 'Social Commerce Sync',   description: 'Connect Instagram, TikTok Shop, and YouTube to your storefront so followers can buy without leaving the app.' },
    { icon: '🏪', title: 'Branded Storefront',     description: 'No-code storefront builder with creator-ready themes, custom domain support, and mobile-first checkout.' },
    { icon: '📦', title: 'Fulfilment on Demand',   description: 'Tap into the Polluxa fulfilment network for print-on-demand, custom packaging, and same-day dispatch.' },
    { icon: '🤝', title: 'Collab Management',      description: 'Manage brand partnership deals, gifting campaigns, and affiliate payouts all in one place.' },
    { icon: '📊', title: 'Audience & Sales Intel', description: 'See which content drives sales, which audiences convert, and which products to restock — in real time.' },
  ],
  integrations_list: ['Shopify', 'WooCommerce', 'PayPal', 'Salesforce', 'Google Analytics', 'Outlook', 'Gmail', 'Slack'],
  faq: [
    { question: 'Do I need a large following to use Polluxa Creator Commerce?', answer: 'No — creators with 10K followers and fast-growing brands both use the platform. Pricing scales with your volume.' },
    { question: 'Can I sell physical and digital products?',                    answer: 'Yes — the platform supports physical goods, digital downloads, and membership access in the same storefront.' },
    { question: 'How does the fulfilment integration work?',                    answer: 'Connect your existing 3PL or use the Polluxa network. Orders placed on any channel are automatically routed to the right fulfilment partner.' },
    { question: 'Is there an app for managing drops on the go?',                answer: 'Yes — the Polluxa mobile app lets you monitor live drop stats, approve orders, and respond to support tickets from your phone.' },
  ],
};

const INTEGRATION_ICONS = {
  WooCommerce: '🛒', Shopify: '🏪', Slack: '💬', Salesforce: '☁️',
  'Google Analytics': '📊', Outlook: '📧', PayPal: '💳', Gmail: '📬',
};

const CreatorCommerce = () => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAPI('/api/creator-commerces', { 'filters[slug][$eq]': 'overview' }).then((res) => {
      setPage(res?.data?.[0]?.attributes ?? FALLBACK_PAGE);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.05 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: 'var(--color-text-secondary)' }}>
        Loading…
      </div>
    );
  }

  const features      = page?.features         ?? [];
  const metrics       = page?.metrics          ?? [];
  const integrations  = page?.integrations_list ?? [];
  const faq           = page?.faq              ?? [];

  return (
    <div className="creator-commerce-page">

      {/* Hero */}
      <section className="section section-light" style={{ paddingBottom: '3rem' }}>
        <div className="background-orbs">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
        </div>
        <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--color-accent-teal)' }}>Creator Commerce</span>
          <h1 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
            {page?.hero_title ?? 'Creator Commerce Platform for Influencers & Brands'}
          </h1>
          <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
            {page?.hero_description}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            <Link to={page?.cta_primary_url ?? '/contact'} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              {page?.cta_primary_label ?? 'Book Live Demo'} <ArrowRight size={18} className="btn-icon" />
            </Link>
            <a href={page?.cta_secondary_url ?? '#features'} className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              {page?.cta_secondary_label ?? 'Download the product deck'}
            </a>
          </div>
        </div>
      </section>

      {/* Metrics */}
      {metrics.length > 0 && (
        <section className="section section-alt animate-on-scroll" style={{ padding: '3rem 0' }}>
          <div className="container">
            <div className="grid-3" style={{ textAlign: 'center' }}>
              {metrics.map((m, i) => (
                <div key={i}>
                  <h3 style={{ fontSize: '2.75rem', color: 'var(--color-primary)', marginBottom: '0.25rem' }}>{m.value}</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontWeight: '500' }}>{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Drop showcase */}
      <section className="section section-light animate-on-scroll">
        <div className="container" style={{ maxWidth: '720px' }}>
          <div style={{ background: 'var(--panel)', border: '1px solid var(--color-border)', borderRadius: '1rem', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
              <strong>Drop · Limited Edition Hoodie · Live</strong>
              <span style={{ background: '#fef9c3', color: '#854d0e', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold' }}>Waitlist open</span>
            </div>
            <div className="grid-3" style={{ gap: '1rem' }}>
              <div style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block' }}>Presold</span>
                <strong>1,840 units</strong>
              </div>
              <div style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block' }}>Audience tracked</span>
                <strong>142K IG · 38K TikTok</strong>
              </div>
              <div style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block' }}>Click-to-cart</span>
                <strong style={{ color: '#16a34a' }}>12.4%</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      {features.length > 0 && (
        <section id="features" className="section section-alt animate-on-scroll">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--color-accent-teal)' }}>
                Tailored Solutions
              </span>
              <h2 style={{ marginTop: '0.5rem' }}>Everything a creator brand needs, <em>in one place.</em></h2>
            </div>
            <div className="grid-3">
              {features.map((f, i) => (
                <div key={i} className="card">
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{f.icon}</div>
                  <h4>{f.title}</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Integrations */}
      {integrations.length > 0 && (
        <section className="section section-light animate-on-scroll">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--color-accent-teal)' }}>Integrations</span>
              <h2 style={{ marginTop: '0.5rem' }}>Connects with the tools <em>you already use.</em></h2>
            </div>
            <div className="grid-4" style={{ textAlign: 'center', gap: '1.5rem' }}>
              {integrations.map((name, i) => (
                <div key={i} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '2rem' }}>{INTEGRATION_ICONS[name] ?? '🔗'}</span>
                  <p style={{ fontWeight: '600', margin: 0 }}>{name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Creator types */}
      <section className="section section-alt animate-on-scroll">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2>Built for <em>every creator category.</em></h2>
          </div>
          <div className="grid-4" style={{ textAlign: 'center' }}>
            {['Influencer Brands', 'Beauty', 'Athletes', 'Streetwear', 'Music Artists', 'YouTubers', 'Food Creators', 'Lifestyle & Home'].map((cat) => (
              <div key={cat} className="card" style={{ padding: '1.25rem' }}>
                <p style={{ fontWeight: '600', margin: 0 }}>{cat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faq} />

      {/* Demo CTA */}
      <section className="section section-light animate-on-scroll" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2>{page?.demo_headline ?? 'Make better a reality.'}</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2.5rem' }}>
            {page?.demo_description ?? 'Give us 60 minutes, and see how our out-of-the-box software maximizes business performance.'}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Book Live Demo <ArrowRight size={18} className="btn-icon" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreatorCommerce;
