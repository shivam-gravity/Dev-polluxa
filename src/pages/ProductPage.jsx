import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { fetchAPI, resolveMedia } from '../lib/api';
import { useSeoEffect } from '../lib/seo';
import { PageBlocks } from '../lib/PageRenderer';

/* Route -> dedicated Strapi content-type endpoint. Each has its own flat
   hero/metrics/faq fields (already seeded by seed-strapi.js under slug
   "overview") plus an optional `blocks` dynamic zone for extra CMS sections. */
const PRODUCTS = {
  crm: '/api/crms',
  commerce: '/api/commerces',
  'creator-commerce': '/api/creator-commerces',
  plm: '/api/plms',
  logistics: '/api/logistics',
  wms: '/api/wmss',
};

/* Whichever of these array fields the entry has, rendered generically as a
   titled grid — the 6 product schemas share a hero/metrics/faq shape but use
   different names for their middle "what's included" section(s). */
const LIST_FIELDS = [
  'capabilities', 'features', 'channels', 'modules', 'use_cases',
  'features_grid', 'integrations_list', 'trust_badges', 'product_showcase',
  'ecommerce_features', 'd2c_section', 'b2b_section',
];

const humanize = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const HeroButton = ({ url, text, type, icon = true }) => {
  if (!url || !text) return null;
  const className = type === 'secondary' ? 'btn-ghost' : 'btn-primary';
  const style = { padding: '1rem 2rem', fontSize: '1.125rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' };
  const content = <>{text}{icon && <ArrowRight size={18} aria-hidden="true" />}</>;
  return url.startsWith('http')
    ? <a href={url} className={className} style={style}>{content}</a>
    : <Link to={url} className={className} style={style}>{content}</Link>;
};

const ProductPage = ({ type }) => {
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const endpoint = PRODUCTS[type];
      const res = await fetchAPI(endpoint, { 'filters[slug][$eq]': 'overview' });
      if (cancelled) return;
      const found = res?.data?.[0];
      setEntry(found ? (found.attributes ?? found) : null);
      setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, [type]);

  useSeoEffect(entry?.seo, entry?.title);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: 'var(--muted)' }}>
        Loading…
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="container section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Page Not Found</h1>
          <p style={{ color: 'var(--muted)' }}>No product content found. Make sure it is published in Strapi.</p>
        </div>
      </div>
    );
  }

  const listSections = LIST_FIELDS
    .map((key) => ({ key, items: entry[key] }))
    .filter(({ items }) => Array.isArray(items) && items.length > 0);

  return (
    <div className="product-page">
      {/* Hero */}
      <section className="section section-light" style={{ paddingBottom: '3rem' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
          {entry.hero_subtitle && <span className="section-tag">{entry.hero_subtitle}</span>}
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.75rem)', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
            {entry.hero_title || entry.title}
          </h1>
          {(entry.hero_description || entry.description) && (
            <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)', lineHeight: '1.6' }}>
              {entry.hero_description || entry.description}
            </p>
          )}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            <HeroButton url={entry.cta_primary_url} text={entry.cta_primary_label} type="primary" />
            <HeroButton url={entry.cta_secondary_url} text={entry.cta_secondary_label} type="secondary" icon={false} />
          </div>
          {resolveMedia(entry.media) && (
            <img src={resolveMedia(entry.media)} alt={entry.title} loading="lazy" style={{ marginTop: '3rem', maxWidth: '100%', borderRadius: '1rem' }} />
          )}
        </div>
      </section>

      {/* Metrics */}
      {Array.isArray(entry.metrics) && entry.metrics.length > 0 && (
        <section className="section section-alt" style={{ padding: '3rem 0' }}>
          <div className="container">
            <div className="grid-3" style={{ textAlign: 'center' }}>
              {entry.metrics.map((m, i) => (
                <div key={i}>
                  <h3 style={{ fontSize: '2.75rem', color: 'var(--cyan)', marginBottom: '0.25rem', fontWeight: '800' }}>{m.value ?? m.display}</h3>
                  <p style={{ color: 'var(--muted)', fontWeight: '500' }}>{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Capabilities / features / channels / modules — generic list sections */}
      {listSections.map(({ key, items }, sectionIndex) => (
        <section key={key} className={`section ${sectionIndex % 2 === 0 ? 'section-light' : 'section-alt'}`}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2>{humanize(key)}</h2>
            </div>
            <div className="grid-3">
              {items.map((item, i) => {
                if (typeof item === 'string') {
                  return (
                    <div key={i} className="card" style={{ textAlign: 'center', fontWeight: '600' }}>{item}</div>
                  );
                }
                return (
                  <div key={item.title || item.name || i} className="card">
                    {item.icon && <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>}
                    {(item.tag || item.badge) && (
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--cyan)' }}>{item.tag || item.badge}</span>
                    )}
                    <h4 style={{ marginTop: '0.5rem' }}>{item.title || item.name}</h4>
                    {item.subtitle && <p style={{ fontSize: '0.85rem', color: 'var(--cyan)', marginTop: '0.25rem' }}>{item.subtitle}</p>}
                    {item.description && <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginTop: '0.5rem' }}>{item.description}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* FAQ */}
      {Array.isArray(entry.faq) && entry.faq.length > 0 && (
        <section className="section section-light">
          <div className="container" style={{ maxWidth: '760px' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2>Frequently asked <em>questions.</em></h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {entry.faq.map(({ question, answer }, i) => (
                <details key={i} style={{ background: 'var(--panel)', border: '1px solid var(--line-strong)', borderRadius: '0.75rem', padding: '1.25rem 1.5rem' }}>
                  <summary style={{ cursor: 'pointer', fontWeight: '600' }}>{question}</summary>
                  <p style={{ color: 'var(--muted)', marginTop: '0.75rem', lineHeight: '1.7' }}>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Demo / closing CTA */}
      {(entry.demo_headline || entry.cta_secondary_label) && (
        <section className="section section-alt" style={{ borderTop: '1px solid var(--line)' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
            {entry.demo_headline && <h2>{entry.demo_headline}</h2>}
            {entry.demo_description && <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>{entry.demo_description}</p>}
            <HeroButton url={entry.cta_secondary_url || entry.cta_primary_url} text={entry.cta_secondary_label || entry.cta_primary_label} type="primary" />
          </div>
        </section>
      )}

      {/* Extra CMS-authored blocks, if any */}
      <PageBlocks sections={entry.blocks} />
    </div>
  );
};

export default ProductPage;
