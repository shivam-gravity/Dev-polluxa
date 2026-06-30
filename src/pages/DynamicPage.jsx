import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchAPI } from '../lib/api';

const RichTextSection = ({ section }) => (
  <div
    style={{ color: 'var(--muted)', lineHeight: '1.8', fontSize: '1.05rem' }}
    dangerouslySetInnerHTML={{ __html: section.body || section.content || '' }}
  />
);

const HeroSection = ({ section }) => (
  <div style={{ marginBottom: '3rem' }}>
    {section.title && (
      <h1 className="gradient-text" style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1.15', marginBottom: '1rem' }}>
        {section.title}
      </h1>
    )}
    {section.description && (
      <p style={{ fontSize: '1.2rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>
        {section.description}
      </p>
    )}
  </div>
);

const HeadingSection = ({ section }) => (
  <div style={{ marginBottom: '2rem' }}>
    {section.heading && <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>{section.heading}</h2>}
    {section.label && (
      <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--mint)', fontSize: '0.85rem' }}>
        {section.label}
      </span>
    )}
  </div>
);

const renderSection = (section, index) => {
  const type = section.__component;
  if (!type) return null;

  if (type === 'sections.hero') return <HeroSection key={index} section={section} />;
  if (type === 'sections.heading') return <HeadingSection key={index} section={section} />;
  if (type === 'shared.rich-text') return <RichTextSection key={index} section={section} />;

  return null;
};

const DynamicPage = () => {
  const { '*': wildcard } = useParams();
  const location = useLocation();
  const slug = wildcard || location.pathname.replace(/^\//, '').replace(/\/$/, '');

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    fetchAPI('/api/pages', {
      'filters[slug][$eq]': slug,
      locale: 'en',
    }).then((res) => {
      const entry = res?.data?.[0];
      setPage(entry ? (entry.attributes ?? entry) : null);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: 'var(--muted)' }}>
        Loading…
      </div>
    );
  }

  if (!page) {
    return (
      <div className="container section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Page Not Found</h1>
          <p style={{ color: 'var(--muted)' }}>
            No page found for slug <code style={{ background: 'var(--panel)', padding: '0.15em 0.4em', borderRadius: '4px' }}>{slug}</code>.
            Make sure the page is published in Strapi.
          </p>
        </div>
      </div>
    );
  }

  const sections = page.contentSections ?? [];
  const hasRenderedHero = sections.some(s => s.__component === 'sections.hero');

  return (
    <div className="dynamic-page">
      <section className="section section-light" style={{ minHeight: '60vh' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          {/* Page-level heading/description — shown only when no hero section is present */}
          {!hasRenderedHero && page.heading && (
            <h1 className="gradient-text" style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1.15', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
              {page.heading}
            </h1>
          )}
          {!hasRenderedHero && page.description && (
            <p style={{ color: 'var(--muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
              {page.description}
            </p>
          )}

          {/* Content sections */}
          {sections.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {sections.map((section, i) => renderSection(section, i))}
            </div>
          )}

          {/* Fallback when no renderable content */}
          {sections.length === 0 && !page.heading && !page.description && (
            <p style={{ color: 'var(--muted)' }}>This page has no content yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default DynamicPage;
