import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { fetchAPI, postAPI, getImgUrl, resolveMedia } from './api';
import { useSeoEffect } from './seo';

/* ── Shared atoms ── */

export const Btn = ({ btn }) => {
  if (!btn?.url) return null;
  const variant = ['primary', 'gradient', 'pricing-filled'].includes(btn.type) ? 'btn-primary' : 'btn-secondary';
  return (
    <a
      href={btn.url}
      target={btn.newTab ? '_blank' : undefined}
      rel={btn.newTab ? 'noopener noreferrer' : undefined}
      className={`btn ${variant}`}
      style={{ padding: '0.85rem 1.75rem' }}
    >
      {btn.text}
    </a>
  );
};

export const SectionHeader = ({ label, heading, description, color = 'var(--mint)' }) => {
  if (!label && !heading && !description) return null;
  return (
    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
      {label && <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color }}>{label}</span>}
      {heading && <h2 style={{ marginTop: '0.5rem' }}>{heading}</h2>}
      {description && <p style={{ maxWidth: '700px', margin: '1rem auto 0', color: 'var(--muted)' }}>{description}</p>}
    </div>
  );
};

const gridClassFor = (columns) => ({ threeColumn: 'grid-3', fourColumn: 'grid-4', fiveColumn: 'grid-4', sixColumn: 'grid-4' }[columns] || 'grid-3');

const PricingTierCard = ({ tier }) => (
  <div className="card" style={{ position: 'relative', display: 'flex', flexDirection: 'column', border: tier.isFeatured ? '2px solid var(--cyan)' : undefined }}>
    {tier.isFeatured && (
      <span style={{ position: 'absolute', top: '-0.75rem', right: '1.25rem', background: 'var(--cyan)', color: '#04121c', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold' }}>
        {tier.featuredBadgeText || 'Most Popular'}
      </span>
    )}
    <h4>{tier.planName}</h4>
    <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{tier.planDescription}</p>
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ fontSize: '2.25rem', fontWeight: 800 }}>{tier.currency ?? '$'}{tier.price}</span>{' '}
      <span style={{ color: 'var(--muted)' }}>{tier.billingCycle}</span>
    </div>
    {tier.features?.length > 0 && (
      <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem', flexGrow: 1 }}>
        {tier.features.map((f, i) => (
          <li key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', opacity: f.isEnabled === false ? 0.4 : 1 }}>
            <span>{f.isEnabled === false ? '✕' : '✓'}</span> {f.text}
          </li>
        ))}
      </ul>
    )}
    <Btn btn={tier.button} />
  </div>
);

const ServiceCard = ({ s }) => {
  const iconUrl = resolveMedia(s.icon);
  return (
    <div className="card" style={s.isRecommended ? { border: '2px solid var(--mint)' } : {}}>
      {iconUrl && <img src={iconUrl} alt="" style={{ width: 40, height: 40, objectFit: 'contain', marginBottom: '0.75rem' }} />}
      {s.subheader && <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--mint)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.subheader}</span>}
      <h4>{s.name}</h4>
      <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: s.Button ? '1rem' : 0 }}>{s.description}</p>
      <Btn btn={s.Button} />
    </div>
  );
};

/* ── Strapi Blocks (rich text) renderer ── */

const renderInline = (children = []) => children.map((child, i) => {
  if (child.type === 'link') {
    return <a key={i} href={child.url} target="_blank" rel="noopener noreferrer">{renderInline(child.children)}</a>;
  }
  let node = child.text ?? '';
  if (child.code) node = <code key={i}>{node}</code>;
  if (child.bold) node = <strong key={i}>{node}</strong>;
  if (child.italic) node = <em key={i}>{node}</em>;
  if (child.underline) node = <u key={i}>{node}</u>;
  if (child.strikethrough) node = <s key={i}>{node}</s>;
  return <span key={i}>{node}</span>;
});

const renderBlocks = (blocks) => {
  if (!Array.isArray(blocks)) return null;
  return blocks.map((block, i) => {
    switch (block.type) {
      case 'heading': {
        const Tag = `h${Math.min(Math.max(block.level || 2, 1), 6)}`;
        return <Tag key={i} style={{ marginTop: i === 0 ? 0 : '1.5rem', marginBottom: '0.75rem', color: 'var(--ink)' }}>{renderInline(block.children)}</Tag>;
      }
      case 'list': {
        const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
        return (
          <ListTag key={i} style={{ paddingLeft: '1.5rem', marginBottom: '0.75rem' }}>
            {(block.children ?? []).map((item, ii) => <li key={ii} style={{ marginBottom: '0.4rem' }}>{renderInline(item.children)}</li>)}
          </ListTag>
        );
      }
      case 'quote':
        return <blockquote key={i} style={{ borderLeft: '3px solid var(--cyan)', paddingLeft: '1rem', fontStyle: 'italic', margin: '1rem 0' }}>{renderInline(block.children)}</blockquote>;
      case 'code':
        return <pre key={i} style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: 8, overflowX: 'auto' }}><code>{renderInline(block.children)}</code></pre>;
      case 'paragraph':
      default:
        return <p key={i} style={{ marginBottom: '0.75rem' }}>{renderInline(block.children)}</p>;
    }
  });
};

/* ── Section renderers ── */

const HeroSection = ({ section }) => {
  const imgUrl = resolveMedia(section.picture);
  const isEmbed = /youtube|vimeo/.test(section.video || '');
  return (
    <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
      {section.subHeading && (
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--mint)' }}>{section.subHeading}</span>
      )}
      {section.title && (
        <h1 className="gradient-text" style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1.15', marginTop: '0.5rem', marginBottom: '1rem' }}>
          {section.title}
        </h1>
      )}
      {section.description && (
        <p style={{ fontSize: '1.2rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>{section.description}</p>
      )}
      {(section.buttons ?? []).length > 0 && (
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {section.buttons.map((b, i) => <Btn key={i} btn={b} />)}
        </div>
      )}
      {section.video ? (
        isEmbed ? (
          <div style={{ position: 'relative', paddingBottom: '56.25%' }}>
            <iframe src={section.video} title={section.title || 'video'} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, borderRadius: 12 }} allowFullScreen />
          </div>
        ) : (
          <video controls src={section.video} style={{ width: '100%', borderRadius: 12 }} />
        )
      ) : imgUrl ? (
        <img src={imgUrl} alt={section.title || ''} loading="lazy" style={{ width: '100%', borderRadius: 12 }} />
      ) : null}
    </div>
  );
};

const HeadingSection = ({ section }) => (
  <div style={{ marginBottom: '2rem' }}>
    {section.heading && <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>{section.heading}</h2>}
    {section.description && (
      <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--mint)', fontSize: '0.85rem' }}>
        {section.description}
      </span>
    )}
  </div>
);

const RichTextSection = ({ section }) => (
  <div style={{ color: 'var(--muted)', lineHeight: '1.8', fontSize: '1.05rem' }}>
    {renderBlocks(section.content)}
  </div>
);

const FeatureGridSection = ({ section }) => {
  if (section.enable === false) return null;
  const items = section.feature ?? [];
  if (!items.length) return null;
  return (
    <section className="section section-light animate-on-scroll" style={section.bgColor ? { background: section.bgColor } : {}}>
      <div className="container">
        <SectionHeader label={section.subtitle} heading={section.heading || section.title} description={section.description} color={section.titleColor || 'var(--mint)'} />
        <div className={gridClassFor(section.columns)}>
          {items.map((f, i) => {
            const imgUrl = resolveMedia(f.media);
            const isLink = f.showLink && f.url;
            const CardTag = isLink ? 'a' : 'div';
            return (
              <CardTag
                key={i}
                className="card"
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                {...(isLink ? { href: f.url, target: f.newTab ? '_blank' : undefined, rel: f.newTab ? 'noopener noreferrer' : undefined } : {})}
              >
                {imgUrl && <img src={imgUrl} alt={f.title || ''} loading="lazy" style={{ width: 40, height: 40, objectFit: 'contain', marginBottom: '0.75rem' }} />}
                <h4>{f.title}</h4>
                {f.subtitle && <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--mint)', textTransform: 'uppercase' }}>{f.subtitle}</p>}
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>{f.description}</p>
                {isLink && f.text && <span className="link-animated" style={{ marginTop: '0.5rem', display: 'inline-block' }}>{f.text}</span>}
              </CardTag>
            );
          })}
        </div>
        {section.Button && <div style={{ textAlign: 'center', marginTop: '2rem' }}><Btn btn={section.Button} /></div>}
      </div>
    </section>
  );
};

const ContentWithImageSection = ({ section }) => {
  const imgUrl = resolveMedia(section.media);
  const imageRight = (section.imagePosition ?? 'right') === 'right';
  return (
    <section className="section section-alt animate-on-scroll">
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
          <div style={{ order: imageRight ? 1 : 2 }}>
            {section.heading && <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--mint)' }}>{section.heading}</span>}
            {section.title && <h2 style={{ marginTop: '0.5rem' }}>{section.title}</h2>}
            {section.description && <p style={{ color: 'var(--muted)', marginTop: '1rem' }}>{section.description}</p>}
          </div>
          {imgUrl && <img src={imgUrl} alt={section.title || ''} loading="lazy" style={{ width: '100%', borderRadius: 12, objectFit: 'cover', order: imageRight ? 2 : 1 }} />}
        </div>
      </div>
    </section>
  );
};

const CtaSection = ({ section }) => (
  <section className="section section-alt animate-on-scroll" style={section.bgColor ? { background: section.bgColor } : {}}>
    <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
      {section.title && <h2>{section.title}</h2>}
      {section.description && <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>{section.description}</p>}
      <Btn btn={section.Button} />
    </div>
  </section>
);

const DynamicFaqSection = ({ section }) => {
  const [open, setOpen] = useState(null);
  const options = section.FaqOption ?? [];
  if (!options.length) return null;
  return (
    <section className="section section-alt animate-on-scroll">
      <div className="container" style={{ maxWidth: '800px' }}>
        <SectionHeader label="FAQ" heading={section.title} description={section.description} />
        {options.map((item, i) => (
          <div key={i} style={{ borderBottom: '1px solid var(--line-strong)' }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{ width: '100%', textAlign: 'left', padding: '1.25rem 0', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}
            >
              <span style={{ fontWeight: 600 }}>{item.title}</span>
              <ChevronDown size={18} style={{ flexShrink: 0, color: 'var(--muted)', transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            {open === i && <p style={{ color: 'var(--muted)', paddingBottom: '1.25rem', margin: 0 }}>{item.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

const KeyStatsSection = ({ section }) => {
  const keys = section.keys ?? [];
  if (!keys.length) return null;
  return (
    <section className="section section-light animate-on-scroll" style={{ padding: '3rem 0' }}>
      <div className="container">
        <SectionHeader heading={section.title} description={section.description} />
        <div className={section.variant === 'horizontal' ? 'grid-4' : 'grid-3'} style={{ textAlign: 'center' }}>
          {keys.map((k, i) => {
            const iconUrl = resolveMedia(k.icon);
            return (
              <div key={i}>
                {iconUrl && <img src={iconUrl} alt="" style={{ width: 32, height: 32, margin: '0 auto 0.5rem', objectFit: 'contain' }} />}
                <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>{k.title}</h3>
                <p style={{ color: 'var(--muted)' }}>{k.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const HomepageStatisticsSection = ({ section }) => {
  const clients = section.clients ?? [];
  const facts = section.facts ?? [];
  if (!clients.length && !facts.length) return null;
  return (
    <section className="section section-alt animate-on-scroll" style={section.bgColor ? { background: section.bgColor } : {}}>
      <div className="container">
        <SectionHeader heading={section.title} description={section.description} />
        {facts.length > 0 && (
          <div className="grid-4" style={{ textAlign: 'center', marginBottom: clients.length ? '3rem' : 0 }}>
            {facts.map((f, i) => (
              <div key={i}>
                <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>{f.title}</h3>
                <p style={{ color: 'var(--muted)' }}>{f.description}</p>
              </div>
            ))}
          </div>
        )}
        {clients.length > 0 && (
          <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', opacity: 0.85 }}>
            {clients.map((c, i) => {
              const imgUrl = resolveMedia(c.media);
              return imgUrl
                ? <img key={i} src={imgUrl} alt={c.title || ''} style={{ height: 32, objectFit: 'contain' }} />
                : <span key={i} style={{ fontWeight: 600, color: 'var(--muted)' }}>{c.title}</span>;
            })}
          </div>
        )}
      </div>
    </section>
  );
};

const ClientsSection = ({ section }) => {
  if (section.enable === false) return null;
  const items = section.Client ?? [];
  if (!items.length) return null;
  return (
    <section className="section section-light animate-on-scroll">
      <div className="container">
        <SectionHeader label={section.subtitle} heading={section.heading} />
        <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', opacity: 0.85, marginBottom: section.Button ? '2rem' : 0 }}>
          {items.map((c, i) => {
            const imgUrl = resolveMedia(c.media);
            return imgUrl
              ? <img key={i} src={imgUrl} alt={c.title || ''} style={{ height: 32, objectFit: 'contain' }} />
              : <span key={i} style={{ fontWeight: 600, color: 'var(--muted)' }}>{c.title}</span>;
          })}
        </div>
        {section.Button && <div style={{ textAlign: 'center' }}><Btn btn={section.Button} /></div>}
      </div>
    </section>
  );
};

const FeatureListSection = ({ section }) => {
  const items = section.features ?? [];
  if (!items.length) return null;
  return (
    <section className="section section-alt animate-on-scroll">
      <div className="container">
        <div className="grid-2" style={{ gap: '3rem' }}>
          {items.map((f, i) => {
            const imgUrl = resolveMedia(f.image);
            return (
              <div key={i}>
                {imgUrl && <img src={imgUrl} alt={f.title || ''} loading="lazy" style={{ width: '100%', borderRadius: 12, marginBottom: '1rem', objectFit: 'cover' }} />}
                <h4>{f.title}</h4>
                <p style={{ color: 'var(--muted)', marginBottom: '1rem' }}>{f.description}</p>
                {f.bullets?.length > 0 && (
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {f.bullets.map((b, bi) => <li key={bi} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>✓ {b.Bullet}</li>)}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const BannerSliderSection = ({ section }) => {
  const files = section.Slides?.files?.data ?? [];
  if (!files.length) return null;
  return (
    <section className="section section-light animate-on-scroll">
      <div className="container">
        <SectionHeader heading={section.title} description={section.description} />
        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {files.map((file, i) => {
            const url = getImgUrl({ data: file });
            return url ? (
              <img key={file.id ?? i} src={url} alt={file.attributes?.alternativeText || ''} loading="lazy" style={{ height: 280, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} />
            ) : null;
          })}
        </div>
      </div>
    </section>
  );
};

const OurTeamSection = ({ section }) => {
  const items = section.feature ?? [];
  if (!items.length) return null;
  return (
    <section className="section section-alt animate-on-scroll">
      <div className="container">
        <SectionHeader heading={section.title} description={section.description} />
        <div className="grid-4" style={{ textAlign: 'center' }}>
          {items.map((p, i) => {
            const imgUrl = resolveMedia(p.media);
            return (
              <div key={i}>
                {imgUrl ? (
                  <img src={imgUrl} alt={p.title || ''} loading="lazy" style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1rem' }} />
                ) : (
                  <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'var(--panel-2)', margin: '0 auto 1rem' }} />
                )}
                <h4 style={{ margin: 0 }}>{p.title}</h4>
                {p.subtitle && <p style={{ color: 'var(--mint)', fontSize: '0.85rem', fontWeight: 600, margin: '0.25rem 0' }}>{p.subtitle}</p>}
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CompanySection = ({ section }) => {
  if (section.enable === false) return null;
  const imgUrl = resolveMedia(section.media);
  return (
    <section className="section section-light animate-on-scroll">
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
          <div>
            {section.title && <h2>{section.title}</h2>}
            {section.description && <p style={{ color: 'var(--muted)', margin: '1rem 0' }}>{section.description}</p>}
            {section.Bullets?.length > 0 && (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {section.Bullets.map((b, i) => <li key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>✓ {b.Bullet}</li>)}
              </ul>
            )}
          </div>
          {imgUrl && <img src={imgUrl} alt={section.title || ''} loading="lazy" style={{ width: '100%', borderRadius: 12, objectFit: 'cover' }} />}
        </div>
      </div>
    </section>
  );
};

const AboutUsSection = ({ section }) => {
  const video = section.video ?? {};
  const videoUrl = resolveMedia(video.video);
  const posterUrl = resolveMedia(video.poster);
  return (
    <section className="section section-alt animate-on-scroll">
      <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
        <SectionHeader label={section.heading} heading={section.title} description={section.description} />
        {videoUrl ? (
          <video controls poster={posterUrl || undefined} style={{ width: '100%', borderRadius: 12 }}>
            <source src={videoUrl} />
          </video>
        ) : posterUrl ? (
          <img src={posterUrl} alt={video.title || ''} loading="lazy" style={{ width: '100%', borderRadius: 12 }} />
        ) : null}
      </div>
    </section>
  );
};

const ZigzagCardsSection = ({ section }) => {
  const items = section.service ?? [];
  if (!items.length) return null;
  return (
    <section className="section section-light animate-on-scroll">
      <div className="container" style={{ maxWidth: '800px' }}>
        <SectionHeader heading={section.title} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {items.map((s, i) => {
            const iconUrl = resolveMedia(s.icon);
            return (
              <div key={i} style={{ display: 'flex', flexDirection: i % 2 ? 'row-reverse' : 'row', gap: '1.5rem', alignItems: 'flex-start' }}>
                {iconUrl && <img src={iconUrl} alt="" style={{ width: 56, height: 56, objectFit: 'contain', flexShrink: 0 }} />}
                <div>
                  {s.subheader && <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--mint)', textTransform: 'uppercase' }}>{s.subheader}</span>}
                  <h4 style={{ margin: '0.25rem 0' }}>{s.name}</h4>
                  <p style={{ color: 'var(--muted)' }}>{s.description}</p>
                  <Btn btn={s.Button} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const InfoGridSection = ({ section }) => {
  const items = section.service ?? [];
  if (!items.length) return null;
  return (
    <section className="section section-alt animate-on-scroll">
      <div className="container">
        <SectionHeader heading={section.title} description={section.description} />
        <div className="grid-3">
          {items.map((s, i) => <ServiceCard key={i} s={s} />)}
        </div>
      </div>
    </section>
  );
};

const ServiceTabsSection = ({ section }) => {
  const [active, setActive] = useState(0);
  const services = section.services ?? [];
  if (!services.length) return null;
  const current = services[active] ?? services[0];
  const pictureUrl = resolveMedia(current.picture);
  return (
    <section className="section section-light animate-on-scroll">
      <div className="container">
        <SectionHeader label={section.heading} heading={section.title} description={section.description} />
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {services.map((s, i) => (
            <button key={i} onClick={() => setActive(i)} className={i === active ? 'btn btn-primary' : 'btn btn-secondary'} style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
              {s.name}
            </button>
          ))}
        </div>
        <div className="grid-2" style={{ alignItems: 'center', gap: '2rem' }}>
          <div>
            <h3>{current.title}</h3>
            <p style={{ color: 'var(--muted)' }}>{current.description}</p>
          </div>
          {pictureUrl && <img src={pictureUrl} alt={current.name || ''} loading="lazy" style={{ width: '100%', borderRadius: 12, objectFit: 'cover' }} />}
        </div>
      </div>
    </section>
  );
};

const SuccessStoriesSection = ({ section }) => {
  const items = section.StoryItem ?? [];
  if (!items.length) return null;
  return (
    <section className="section section-alt animate-on-scroll">
      <div className="container">
        <SectionHeader heading={section.title} description={section.description} />
        <div className="grid-3">
          {items.map((s, i) => {
            const imgUrl = resolveMedia(s.media);
            const logoUrl = resolveMedia(s.logo);
            return (
              <a key={i} href={s.url || '#'} className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                {imgUrl && <img src={imgUrl} alt={s.title || ''} loading="lazy" style={{ width: '100%', borderRadius: 8, marginBottom: '0.75rem', objectFit: 'cover', aspectRatio: '16/9' }} />}
                {logoUrl && <img src={logoUrl} alt="" style={{ height: 24, objectFit: 'contain', marginBottom: '0.5rem' }} />}
                <h4>{s.title}</h4>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{s.description}</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = ({ section }) => {
  const items = section.Testimonial ?? [];
  if (!items.length) return null;
  return (
    <section className="section section-light animate-on-scroll">
      <div className="container">
        <SectionHeader heading={section.title} description={section.description} />
        <div className="grid-3">
          {items.map((t, i) => {
            const picUrl = resolveMedia(t.picture);
            return (
              <div key={i} className="card">
                <p style={{ color: 'var(--muted)', marginBottom: '1rem', fontStyle: 'italic' }}>&ldquo;{t.paragraph || t.text}&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {picUrl && <img src={picUrl} alt={t.authorName || ''} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />}
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.9rem' }}>{t.authorName}</strong>
                    <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{t.authorTitle}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const PartnersSection = ({ section }) => {
  const categories = section.partnerCategories ?? [];
  if (!categories.length) return null;
  return (
    <section className="section section-alt animate-on-scroll">
      <div className="container">
        <SectionHeader label={section.heading} heading={section.title} description={section.description} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {categories.map((cat, ci) => (
            <div key={ci}>
              {cat.categoryName && <h4 style={{ marginBottom: '1rem' }}>{cat.categoryName}</h4>}
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
                {(cat.partners ?? []).map((p, pi) => {
                  const logoUrl = resolveMedia(p.logo);
                  const content = logoUrl
                    ? <img src={logoUrl} alt={p.name || ''} style={{ height: 36, objectFit: 'contain' }} />
                    : <span style={{ fontWeight: 600, color: 'var(--muted)' }}>{p.name}</span>;
                  return p.website
                    ? <a key={pi} href={p.website} target="_blank" rel="noopener noreferrer">{content}</a>
                    : <span key={pi}>{content}</span>;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const IndustriesSection = ({ section }) => {
  const items = section.industries?.data ?? [];
  if (!items.length && !section.title && !section.description) return null;
  return (
    <section className="section section-alt animate-on-scroll">
      <div className="container">
        <SectionHeader heading={section.title} description={section.description} />
        {items.length > 0 && (
          <div className="grid-4" style={{ textAlign: 'center' }}>
            {items.map((entry, i) => {
              const attrs = entry.attributes ?? entry;
              const imgUrl = resolveMedia(attrs.media) || resolveMedia(attrs.image);
              return (
                <Link key={entry.id ?? i} to={`/industry/${attrs.slug}`} className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  {imgUrl && <img src={imgUrl} alt="" loading="lazy" style={{ width: '100%', borderRadius: 8, marginBottom: '0.75rem', objectFit: 'cover', aspectRatio: '16/9' }} />}
                  <p style={{ fontWeight: 600, margin: 0 }}>{attrs.name ?? attrs.title}</p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

const CrmPricingPlansSection = ({ section }) => {
  const [cycle, setCycle] = useState('monthly');
  if (section.enable === false) return null;
  const tiers = (cycle === 'monthly' ? section.monthlyPricing : section.yearlyPricing) ?? [];
  if (!tiers.length) return null;
  return (
    <section className="section section-light animate-on-scroll">
      <div className="container">
        <SectionHeader label={section.subtitle} heading={section.heading} description={section.title} />
        {section.showPaymentToggle !== false && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '3rem' }}>
            {['monthly', 'yearly'].map((c) => (
              <button
                key={c}
                onClick={() => setCycle(c)}
                className={cycle === c ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}
              >
                {c === 'monthly' ? (section.monthlyLabel || 'Pay Monthly') : `${section.yearlyLabel || 'Pay Yearly'}${section.savingBadgeText ? ` · ${section.savingBadgeText}` : ''}`}
              </button>
            ))}
          </div>
        )}
        <div className="grid-3">
          {tiers.map((t, i) => <PricingTierCard key={i} tier={t} />)}
        </div>
      </div>
    </section>
  );
};

const PowerUpAddonsSection = ({ section }) => {
  const cards = section.addOnCards ?? [];
  if (!cards.length) return null;
  return (
    <section className="section section-light animate-on-scroll">
      <div className="container">
        <SectionHeader heading={section.heading} description={section.description} />
        <div className="grid-3">
          {cards.map((c, i) => {
            const iconUrl = resolveMedia(c.icon);
            return (
              <div key={i} className="card">
                <div style={{ width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: c.iconBackgroundColor || 'var(--panel-2)', marginBottom: '1rem' }}>
                  {iconUrl ? <img src={iconUrl} alt="" style={{ width: '70%', height: '70%', objectFit: 'contain' }} /> : <span style={{ fontSize: '1.5rem' }}>➕</span>}
                </div>
                <h4>{c.title}</h4>
                {c.subtitle && <p style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 600, marginBottom: '0.5rem' }}>{c.subtitle}</p>}
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>{c.description}</p>
                <div style={{ marginBottom: '1rem' }}>
                  <strong style={{ fontSize: '1.5rem' }}>{c.currency ?? '$'}{c.price}</strong>
                  {c.priceLabel && <span style={{ color: 'var(--muted)', fontSize: '0.85rem', display: 'block' }}>{c.priceLabel}</span>}
                </div>
                <Btn btn={c.button} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ImplementationBundlesSection = ({ section }) => {
  const bundles = section.bundles ?? [];
  if (!bundles.length) return null;
  return (
    <section className="section section-alt animate-on-scroll">
      <div className="container">
        <SectionHeader heading={section.heading} description={section.description} />
        <div className="grid-3">
          {bundles.map((t, i) => <PricingTierCard key={i} tier={t} />)}
        </div>
      </div>
    </section>
  );
};

const SplitFeaturePanelSection = ({ section }) => {
  const bullets = section.bullets ?? [];
  const stats = section.stats ?? [];
  if (!section.title && !section.description && !bullets.length) return null;
  const statsPanel = stats.length > 0 ? (
    <div className="grid-2" style={{ gap: '1rem', background: 'var(--panel)', border: '1px solid var(--border-color)', borderRadius: 12, padding: '1.5rem' }}>
      {stats.map((s, i) => (
        <div key={i} style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: 8 }}>
          <strong style={{ display: 'block', fontSize: '1.5rem' }}>{s.metric}{s.metricSuffix ?? ''}</strong>
          <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{s.description}</span>
        </div>
      ))}
    </div>
  ) : null;
  const textPanel = (
    <div>
      {section.heading && <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--mint)' }}>{section.heading}</span>}
      {section.title && <h2 style={{ marginTop: '0.5rem' }}>{section.title}</h2>}
      {section.description && <p style={{ color: 'var(--muted)', margin: '1rem 0' }}>{section.description}</p>}
      {bullets.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {bullets.map((b, i) => <li key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>✓ {b.Bullet}</li>)}
        </ul>
      )}
    </div>
  );
  const imageRight = (section.imagePosition ?? 'right') === 'right';
  return (
    <section className="section section-light animate-on-scroll">
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
          <div style={{ order: imageRight ? 1 : 2 }}>{textPanel}</div>
          {statsPanel && <div style={{ order: imageRight ? 2 : 1 }}>{statsPanel}</div>}
        </div>
      </div>
    </section>
  );
};

const BottomActionsSection = ({ section }) => (
  <section className="section section-light animate-on-scroll" style={{ borderTop: '1px solid var(--border-color)' }}>
    <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
      {section.title && <h2>{section.title}</h2>}
      {section.description && <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>{section.description}</p>}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {(section.buttons ?? []).map((b, i) => <Btn key={i} btn={b} />)}
      </div>
    </div>
  </section>
);

/* ── Phase 2 new components ── */

const badgeColors = {
  hot: { bg: '#dcfce7', color: '#16a34a' },
  warm: { bg: '#fef9c3', color: '#854d0e' },
  success: { bg: '#dcfce7', color: '#16a34a' },
  default: { bg: 'rgba(255,255,255,0.08)', color: 'var(--muted)' },
};

const StatFeedSection = ({ section }) => {
  const rows = section.rows ?? [];
  if (!rows.length) return null;
  return (
    <section className="section section-light animate-on-scroll">
      <div className="container" style={{ maxWidth: '720px' }}>
        <SectionHeader heading={section.title} description={section.description} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {rows.map((r, i) => {
            const c = badgeColors[r.badgeVariant] || badgeColors.default;
            return (
              <div key={i} style={{ background: 'var(--panel)', border: '1px solid var(--color-border, var(--border-color))', padding: '0.85rem 1.1rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  {r.icon && <span style={{ fontSize: '1.25rem' }}>{r.icon}</span>}
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.9rem' }}>{r.title}</strong>
                    {r.subtitle && <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{r.subtitle}</span>}
                  </div>
                </div>
                {r.badge && (
                  <span style={{ background: c.bg, color: c.color, padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold', flexShrink: 0 }}>{r.badge}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ProcessStepsSection = ({ section }) => {
  const steps = section.steps ?? [];
  if (!steps.length) return null;
  return (
    <section className="section section-light animate-on-scroll">
      <div className="container" style={{ maxWidth: '720px' }}>
        <SectionHeader heading={section.title} description={section.description} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.75rem 0', borderBottom: i < steps.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
              <div style={{ background: 'var(--panel-2)', border: '1px solid var(--border-color)', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem' }}>
                {s.icon || (i + 1)}
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.9rem' }}>{s.title}</strong>
                {s.description && <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{s.description}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DataPanelSection = ({ section }) => {
  const rows = section.rows ?? [];
  if (!rows.length) return null;
  return (
    <section className="section section-light animate-on-scroll">
      <div className="container" style={{ maxWidth: '720px' }}>
        {section.title && (
          <div style={{ background: 'var(--panel)', border: '1px solid var(--border-color)', borderRadius: '1rem 1rem 0 0', padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
            <strong>{section.title}</strong>
            {section.badge && <span style={{ background: '#dcfce7', color: '#16a34a', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold' }}>{section.badge}</span>}
          </div>
        )}
        {section.subtitle && <p style={{ color: 'var(--muted)', margin: '1rem 0' }}>{section.subtitle}</p>}
        <div className="grid-2" style={{ gap: '1rem', background: 'var(--panel)', border: '1px solid var(--border-color)', borderTop: section.title ? 'none' : undefined, borderRadius: section.title ? '0 0 1rem 1rem' : '1rem', padding: '1.5rem' }}>
          {rows.map((r, i) => (
            <div key={i} style={{ background: r.highlight ? '#dcfce7' : 'var(--panel-2)', padding: '0.85rem 1rem', borderRadius: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: r.highlight ? '#16a34a' : 'var(--muted)', display: 'block', fontWeight: 600 }}>{r.label}</span>
              <strong style={{ fontSize: '1rem', color: r.highlight ? '#16a34a' : 'var(--ink)' }}>{r.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Part D: remaining unbuilt component renderers ── */

const LargeVideoSection = ({ section }) => {
  const videoUrl = resolveMedia(section.video);
  const posterUrl = resolveMedia(section.poster);
  return (
    <section className="section section-light animate-on-scroll">
      <div className="container" style={{ maxWidth: '900px' }}>
        <SectionHeader heading={section.title} description={section.description} />
        {videoUrl ? (
          <video controls poster={posterUrl || undefined} style={{ width: '100%', borderRadius: 12 }}>
            <source src={videoUrl} />
          </video>
        ) : posterUrl ? (
          <img src={posterUrl} alt={section.title || ''} loading="lazy" style={{ width: '100%', borderRadius: 12 }} />
        ) : null}
      </div>
    </section>
  );
};

const ServicesSection = ({ section }) => {
  const items = section.service ?? [];
  if (!items.length) return null;
  return (
    <section className="section section-alt animate-on-scroll">
      <div className="container">
        <SectionHeader label={section.title} heading={section.heading} description={section.description} />
        <div className={section.columns === 'fourColumn' ? 'grid-4' : 'grid-3'}>
          {items.map((s, i) => <ServiceCard key={i} s={s} />)}
        </div>
      </div>
    </section>
  );
};

const LeadFormSection = ({ section }) => {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  };
  return (
    <section className="section section-light animate-on-scroll">
      <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
        {section.title && <h2>{section.title}</h2>}
        {section.description && <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>{section.description}</p>}
        {done ? (
          <p style={{ color: '#6ee7b7' }}>Thanks — you're on the list.</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={section.emailPlaceholder || 'Enter your email'}
              style={{ flex: '1 1 240px', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--line-strong)', background: 'var(--panel)', color: 'var(--ink)' }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
              {section.submitButton?.text || 'Subscribe'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

const PlatformSection = ({ section }) => {
  const items = section.PlatformList ?? [];
  return (
    <section className="section section-light animate-on-scroll">
      <div className="container">
        {section.Heading && <HeadingSection section={section.Heading} />}
        {items.length > 0 && (
          <div className="grid-3">
            {items.map((f, i) => (
              <div key={i} className="card">
                <h4>{f.title}</h4>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>{f.description}</p>
              </div>
            ))}
          </div>
        )}
        {(section.Button ?? []).length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {section.Button.map((b, i) => <Btn key={i} btn={b} />)}
          </div>
        )}
      </div>
    </section>
  );
};

const PageHeaderSection = ({ section }) => {
  const imgUrl = resolveMedia(section.media);
  return (
    <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
      {section.heading && <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--mint)' }}>{section.heading}</span>}
      {section.title && <h1 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800, marginTop: '0.5rem', marginBottom: '1rem' }}>{section.title}</h1>}
      {section.description && <p style={{ fontSize: '1.2rem', color: 'var(--muted)' }}>{section.description}</p>}
      {imgUrl && <img src={imgUrl} alt={section.title || ''} loading="lazy" style={{ width: '100%', borderRadius: 12, marginTop: '1.5rem' }} />}
      {section.FeaturedProducts && <FeaturedProductsSection section={section.FeaturedProducts} />}
    </div>
  );
};

const RelationTeaserSection = ({ section }) => {
  const imgUrl = resolveMedia(section.media);
  if (!section.title && !section.description && !imgUrl) return null;
  return (
    <section className="section section-alt animate-on-scroll" style={section.bgColor ? { background: section.bgColor } : {}}>
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
          <div>
            {section.subtitle && <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--mint)' }}>{section.subtitle}</span>}
            {section.title && <h2 style={{ marginTop: '0.5rem' }}>{section.title}</h2>}
            {section.description && <p style={{ color: 'var(--muted)', marginTop: '1rem' }}>{section.description}</p>}
          </div>
          {imgUrl && <img src={imgUrl} alt={section.title || ''} loading="lazy" style={{ width: '100%', borderRadius: 12, objectFit: 'cover' }} />}
        </div>
      </div>
    </section>
  );
};

const CareerFormSection = ({ section }) => (
  <section className="section section-light animate-on-scroll">
    <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
      {section.title && <h2>{section.title}</h2>}
      {section.description && <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>{section.description}</p>}
      {section.Button ? <Btn btn={section.Button} /> : section.CareersEmail && (
        <a className="btn-primary" href={`mailto:${section.CareersEmail}`} style={{ padding: '0.85rem 1.75rem' }}>{section.CareersEmail}</a>
      )}
    </div>
  </section>
);

const InnovationsSection = ({ section }) => {
  const items = section.feature ?? [];
  if (!items.length) return null;
  return (
    <section className="section section-alt animate-on-scroll">
      <div className="container">
        <SectionHeader heading={section.title} description={section.description} />
        <div className="grid-3">
          {items.map((f, i) => {
            const imgUrl = resolveMedia(f.media);
            return (
              <div key={i} className="card">
                {imgUrl && <img src={imgUrl} alt={f.title || ''} loading="lazy" style={{ width: 40, height: 40, objectFit: 'contain', marginBottom: '0.75rem' }} />}
                <h4>{f.title}</h4>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CeoMessageSection = ({ section }) => {
  const imgUrl = resolveMedia(section.media);
  const signatureUrl = resolveMedia(section.signature);
  return (
    <section className="section section-light animate-on-scroll">
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
          {imgUrl && <img src={imgUrl} alt={section.name || ''} loading="lazy" style={{ width: '100%', borderRadius: 12, objectFit: 'cover' }} />}
          <div>
            {section.title && <h2>{section.title}</h2>}
            {section.description && <p style={{ color: 'var(--mint)', fontWeight: 600 }}>{section.description}</p>}
            {section.paragraph1 && <p style={{ color: 'var(--muted)', marginTop: '1rem' }}>{section.paragraph1}</p>}
            {section.paragraph2 && <p style={{ color: 'var(--muted)', marginTop: '1rem' }}>{section.paragraph2}</p>}
            <div style={{ marginTop: '1.5rem' }}>
              {signatureUrl && <img src={signatureUrl} alt="signature" style={{ height: 40, objectFit: 'contain', marginBottom: '0.5rem' }} />}
              {section.name && <strong style={{ display: 'block' }}>{section.name}</strong>}
              {section.designation && <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{section.designation}</span>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const InternalContactFormSection = ({ section }) => {
  const items = section.ContactDetails ?? [];
  if (!items.length && !section.title) return null;
  return (
    <section className="section section-alt animate-on-scroll">
      <div className="container" style={{ maxWidth: '700px' }}>
        <SectionHeader heading={section.title} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {items.map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div>
                <strong style={{ display: 'block' }}>{c.title}</strong>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0.25rem 0 0' }}>{c.description}</p>
                {c.url && <a href={c.url} style={{ color: 'var(--cyan)', fontSize: '0.9rem' }}>{c.text || c.url}</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LogisticsPageFormsSection = ({ section }) => {
  if (section.enable === false) return null;
  return (
    <section className="section section-light animate-on-scroll">
      <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
        {section.title && <h2>{section.title}</h2>}
        <Link to="/contact" className="btn-primary" style={{ padding: '0.85rem 1.75rem', display: 'inline-block', marginTop: '1rem' }}>Talk to logistics team</Link>
      </div>
    </section>
  );
};

const TechProductsSection = ({ section }) => {
  const nested = section.Features ?? [];
  return (
    <section className="section section-alt animate-on-scroll" style={section.bgColor ? { background: section.bgColor } : {}}>
      <div className="container">
        <SectionHeader heading={section.title} description={section.description} />
        {nested.map((f, i) => <FeatureGridSection key={i} section={f} />)}
        {section.Button && <div style={{ textAlign: 'center', marginTop: '2rem' }}><Btn btn={section.Button} /></div>}
      </div>
    </section>
  );
};

const TechExpertiseSection = ({ section }) => {
  const [active, setActive] = useState(0);
  const tabs = section.TechTabs ?? [];
  if (!tabs.length) return null;
  const current = tabs[active] ?? tabs[0];
  return (
    <section className="section section-light animate-on-scroll">
      <div className="container">
        <SectionHeader heading={section.title} description={section.description} />
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {tabs.map((t, i) => (
            <button key={i} onClick={() => setActive(i)} className={i === active ? 'btn btn-primary' : 'btn btn-secondary'} style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
              {t.title}
            </button>
          ))}
        </div>
        <div className="grid-3">
          {(current.feature ?? []).map((f, i) => (
            <div key={i} className="card">
              <h4>{f.title}</h4>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PackageSection = ({ section }) => {
  if (section.enable === false) return null;
  const options = section.PackageOption ?? [];
  if (!options.length) return null;
  return (
    <section className="section section-alt animate-on-scroll" style={section.bgColor ? { background: section.bgColor } : {}}>
      <div className="container">
        <SectionHeader heading={section.title} description={section.description} />
        <div className="grid-3">
          {options.map((o, i) => (
            <div key={i} className="card">
              <h4>{o.title}</h4>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>{o.description}</p>
              {(o.PackageRow ?? []).length > 0 && (
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1rem' }}>
                  {o.PackageRow.map((r, ri) => <li key={ri} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>✓ {r.title}</li>)}
                </ul>
              )}
              <Btn btn={o.Button} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RetailApplicationFormSection = ({ section }) => (
  <section className="section section-light animate-on-scroll">
    <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
      {section.title && <h2>{section.title}</h2>}
      {section.description && <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>{section.description}</p>}
      <Link to="/contact" className="btn-primary" style={{ padding: '0.85rem 1.75rem', display: 'inline-block' }}>Apply now</Link>
    </div>
  </section>
);

const OurBrandsSection = ({ section }) => {
  const items = section.brands ?? [];
  if (!items.length) return null;
  return (
    <section className="section section-light animate-on-scroll" style={section.bgColor ? { background: section.bgColor } : {}}>
      <div className="container">
        <SectionHeader heading={section.title} description={section.description} />
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', opacity: 0.85 }}>
          {items.map((b, i) => {
            const imgUrl = resolveMedia(b.media);
            const content = imgUrl
              ? <img src={imgUrl} alt={b.title || ''} style={{ height: 32, objectFit: 'contain' }} />
              : <span style={{ fontWeight: 600, color: 'var(--muted)' }}>{b.title}</span>;
            return b.showLink && b.url
              ? <a key={i} href={b.url}>{content}</a>
              : <span key={i}>{content}</span>;
          })}
        </div>
      </div>
    </section>
  );
};

const FeaturedProductsSection = ({ section }) => {
  const items = section.ProductItem ?? [];
  if (!items.length) return null;
  return (
    <section className="section section-alt animate-on-scroll">
      <div className="container">
        <SectionHeader heading={section.title} />
        <div className="grid-3">
          {items.map((p, i) => {
            const imgUrl = resolveMedia(p.media);
            const CardTag = p.url ? 'a' : 'div';
            return (
              <CardTag key={i} className="card" href={p.url || undefined} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                {imgUrl && <img src={imgUrl} alt={p.title || ''} loading="lazy" style={{ width: '100%', borderRadius: 8, marginBottom: '0.75rem', objectFit: 'cover', aspectRatio: '4/3' }} />}
                <h4>{p.title}</h4>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{p.description}</p>
              </CardTag>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ScheduleDemoSection = ({ section }) => (
  <section className="section section-light animate-on-scroll">
    <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
      {section.title && <h2>{section.title}</h2>}
      {section.description && <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>{section.description}</p>}
      {section.calendlyDataUrl && (
        <a className="btn-primary" href={section.calendlyDataUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '0.85rem 1.75rem', display: 'inline-block' }}>
          Schedule a time
        </a>
      )}
    </div>
  </section>
);

const PricingFormSection = ({ section }) => {
  const bullets = section.Bullets ?? [];
  return (
    <section className="section section-alt animate-on-scroll">
      <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
        {section.subHeading && <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--mint)' }}>{section.subHeading}</span>}
        {section.title && <h2 style={{ marginTop: '0.5rem' }}>{section.title}</h2>}
        {section.subtitle && <p style={{ color: 'var(--mint)', fontWeight: 600 }}>{section.subtitle}</p>}
        {section.description && <p style={{ color: 'var(--muted)', margin: '1rem 0' }}>{section.description}</p>}
        {bullets.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0, display: 'inline-block', textAlign: 'left', marginBottom: '1.5rem' }}>
            {bullets.map((b, i) => <li key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>✓ {b.Bullet}</li>)}
          </ul>
        )}
        <div><Btn btn={section.buttons} /></div>
      </div>
    </section>
  );
};

const AddressSectionSection = ({ section }) => {
  const items = section.addressDetails ?? [];
  const imgUrl = resolveMedia(section.media);
  return (
    <section className="section section-light animate-on-scroll">
      <div className="container">
        <SectionHeader heading={section.heading} description={section.description} />
        {imgUrl && <img src={imgUrl} alt="" loading="lazy" style={{ width: '100%', borderRadius: 12, marginBottom: '2rem' }} />}
        {items.length > 0 && (
          <div className="grid-3">
            {items.map((a, i) => (
              <div key={i} className="card">
                {a.name && <h4>{a.name}{a.country ? ` · ${a.country}` : ''}</h4>}
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{a.address}</p>
                {a.mapUrl && <a href={a.mapUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cyan)', fontSize: '0.85rem' }}>View on map</a>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const CardGrid = ({ items }) => (
  <div className="grid-3">
    {items.map((c, i) => {
      const imgUrl = getImgUrl(c.media);
      const CardTag = c.url ? 'a' : 'div';
      return (
        <CardTag key={i} className="card" href={c.url || undefined} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          {imgUrl && <img src={imgUrl} alt={c.title || ''} loading="lazy" style={{ width: '100%', borderRadius: 8, marginBottom: '0.75rem', objectFit: 'cover', aspectRatio: '4/3' }} />}
          <h4>{c.title}</h4>
          {c.subText && <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{c.subText}</p>}
        </CardTag>
      );
    })}
  </div>
);

const CollectionsSection = ({ section }) => {
  const items = section.Card ?? [];
  if (!items.length) return null;
  return (
    <section className="section section-alt animate-on-scroll">
      <div className="container">
        <SectionHeader heading={section.title} />
        <CardGrid items={items} />
      </div>
    </section>
  );
};

const OurServicesSection = ({ section }) => {
  const items = section.Card ?? [];
  if (!items.length) return null;
  return (
    <section className="section section-light animate-on-scroll">
      <div className="container">
        <SectionHeader heading={section.title} description={section.description} />
        <CardGrid items={items} />
      </div>
    </section>
  );
};

const SpecialCategoriesSection = ({ section }) => {
  const items = section.Card ?? [];
  if (!items.length) return null;
  return (
    <section className="section section-alt animate-on-scroll">
      <div className="container">
        <CardGrid items={items} />
      </div>
    </section>
  );
};

const FavoriteCategoriesSection = ({ section }) => {
  const items = section.Card ?? [];
  if (!items.length) return null;
  return (
    <section className="section section-light animate-on-scroll">
      <div className="container">
        <SectionHeader label={section.subtitle} heading={section.title} description={section.description} />
        <CardGrid items={items} />
        {section.link && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href={section.link.url} target={section.link.newTab ? '_blank' : undefined} rel={section.link.newTab ? 'noopener noreferrer' : undefined} className="link-animated">
              {section.link.text}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

const HeroShopSection = ({ section }) => {
  const slides = section.BannerSlide ?? [];
  if (!slides.length) return null;
  return (
    <div style={{ marginBottom: '3rem' }}>
      <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {slides.map((s, i) => {
          const imgUrl = resolveMedia(s.desktopMedia);
          const content = (
            <>
              {imgUrl && <img src={imgUrl} alt={s.title || ''} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              {s.title && <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', color: '#fff', fontWeight: 700, fontSize: '1.25rem', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>{s.title}</div>}
            </>
          );
          return (
            <div key={i} style={{ position: 'relative', minWidth: '320px', height: '220px', borderRadius: 12, overflow: 'hidden', flexShrink: 0, background: 'var(--panel-2)' }}>
              {s.link?.url ? <a href={s.link.url} style={{ display: 'block', width: '100%', height: '100%' }}>{content}</a> : content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const EnhancedPricingPlansSection = ({ section }) => {
  const options = section.PriceOptions ?? [];
  if (!options.length) return null;
  return (
    <section className="section section-light animate-on-scroll">
      <div className="container">
        <SectionHeader heading={section.title} />
        <div className="grid-3">
          {options.map((o, i) => (
            <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <h4>{o.title}</h4>
              {o.shortDesc && <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{o.shortDesc}</p>}
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800 }}>{o.currency ?? '$'}{o.price}</span>{' '}
                <span style={{ color: 'var(--muted)' }}>{o.billingCycle}</span>
                {o.billingNote && <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{o.billingNote}</div>}
              </div>
              {o.PriceFeatures?.title && <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{o.PriceFeatures.title}</p>}
              <div style={{ marginTop: 'auto' }}><Btn btn={o.button} /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RecommendedBlogsSection = ({ section }) => {
  const imgUrl = getImgUrl(section.media);
  return (
    <section className="section section-alt animate-on-scroll">
      <div className="container" style={{ textAlign: 'center' }}>
        {section.heading && <h2>{section.heading}</h2>}
        {imgUrl && <img src={imgUrl} alt="" loading="lazy" style={{ width: '100%', maxWidth: 480, borderRadius: 12, margin: '1rem auto' }} />}
        {(section.buttons ?? []).length > 0 && (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
            {section.buttons.map((b, i) => <Btn key={i} btn={b} />)}
          </div>
        )}
      </div>
    </section>
  );
};

const AgentCardSection = ({ section }) => {
  const items = section.agent ?? [];
  if (!items.length && !section.tittle) return null;
  return (
    <section className="section section-light animate-on-scroll">
      <div className="container">
        <SectionHeader heading={section.tittle} description={section.subtittle} />
        <div className="grid-3">
          {items.map((a, i) => {
            const imgUrl = getImgUrl({ data: a.image?.data?.[0] });
            return (
              <div key={i} className="card">
                {imgUrl && <img src={imgUrl} alt={a.tittle || ''} loading="lazy" style={{ width: '100%', borderRadius: 8, marginBottom: '0.75rem', objectFit: 'cover', aspectRatio: '4/3' }} />}
                {a.heading && <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--mint)', textTransform: 'uppercase' }}>{a.heading}</span>}
                <h4>{a.tittle}</h4>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{a.subtittle}</p>
                {(a.bulletspoint ?? []).length > 0 && (
                  <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.5rem' }}>
                    {a.bulletspoint.map((b, bi) => <li key={bi} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.3rem', fontSize: '0.9rem' }}>✓ {b.Bullet}</li>)}
                  </ul>
                )}
                {a.url && <a href={a.url} target={a.newTabs ? '_blank' : undefined} rel={a.newTabs ? 'noopener noreferrer' : undefined} className="link-animated" style={{ marginTop: '0.5rem', display: 'inline-block' }}>{a.text || 'Learn more'}</a>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ── sections.contact-form: full production contact form, wired to industries/products/offices/contact-channels ── */

const ICON_MAP = { Mail: '✉️', Shield: '🛡️', MessageSquare: '💬', Handshake: '🤝', MapPin: '📍' };

const ContactFormSection = ({ section }) => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', company: '', industry: '', interest: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [industries, setIndustries] = useState([]);
  const [products, setProducts] = useState([]);
  const [offices, setOffices] = useState([]);
  const [channels, setChannels] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [indRes, prodRes, offRes, chanRes] = await Promise.all([
        fetchAPI('/api/industries', { sort: 'sort_order:asc' }),
        fetchAPI('/api/products', { sort: 'sort_order:asc' }),
        fetchAPI('/api/offices', { sort: 'sort_order:asc' }),
        fetchAPI('/api/contact-channels', { sort: 'sort_order:asc' }),
      ]);
      if (cancelled) return;
      setIndustries([...new Set((indRes?.data || []).map((i) => i.attributes.name ?? i.attributes.title))]);
      setProducts([...new Set((prodRes?.data || []).map((i) => i.attributes.name))]);
      setOffices((offRes?.data || []).map((i) => ({ city: i.attributes.city, isHq: i.attributes.is_hq, address: i.attributes.address })));
      setChannels((chanRes?.data || []).map((i) => ({ label: i.attributes.label, email: i.attributes.email, iconName: i.attributes.icon_name })));
      setOptionsLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
  };

  const sanitize = (str) => typeof str !== 'string' ? '' : str.trim()
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const fn = sanitize(formData.firstName);
    const ln = sanitize(formData.lastName);
    const em = formData.email.trim();
    const co = sanitize(formData.company);
    const ms = sanitize(formData.message);

    if (!fn) newErrors.firstName = 'First name is required.';
    else if (fn.length > 50) newErrors.firstName = 'First name must be 50 characters or less.';
    if (!ln) newErrors.lastName = 'Last name is required.';
    else if (ln.length > 50) newErrors.lastName = 'Last name must be 50 characters or less.';
    if (!em) newErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) newErrors.email = 'Please provide a valid work email address.';
    if (!co) newErrors.company = 'Company is required.';
    else if (co.length > 100) newErrors.company = 'Company name must be 100 characters or less.';
    if (!formData.industry) newErrors.industry = 'Please select an industry.';
    if (!formData.interest) newErrors.interest = 'Please select your interest.';
    if (ms.length > 1000) newErrors.message = 'Message must be 1000 characters or less.';

    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setIsSubmitting(true);
    try {
      const response = await postAPI('/api/contact-form-submissions', {
        FirstName: fn,
        LastName: ln,
        PhoneNumber: 'Not provided',
        Email: em,
        Organization: co,
        Message: `Industry: ${formData.industry}\nInterest: ${formData.interest}\n\n${ms}`,
      });
      if (!response.error) setSubmitted(true);
      else setErrors({ submit: 'Failed to submit the form. Please try again later.' });
    } catch {
      setErrors({ submit: 'An unexpected error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section section-alt contact-body-section animate-on-scroll">
      <div className="container">
        <div className="grid-2 contact-main-grid">
          <div className="contact-form-card" style={{ background: 'var(--panel)', border: '1px solid var(--line-strong)', borderRadius: '1rem' }}>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--ink)' }}>{section.title || 'Book a live demo'}</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
              {section.description || 'Tell us about your business. A solution architect for your industry will reach out within one business day.'}
            </p>

            {submitted ? (
              <div style={{ padding: '2rem', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.35)', color: '#6ee7b7', borderRadius: '0.5rem', textAlign: 'center', fontWeight: 'bold' }}>
                Thank you! Our solution architect will reach out to you within 1 business day.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="contact-name-row">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--muted)', marginBottom: '0.35rem' }}>First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="contact-input" style={{ border: errors.firstName ? '1px solid #f87171' : undefined }} />
                    {errors.firstName && <span style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.firstName}</span>}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--muted)', marginBottom: '0.35rem' }}>Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="contact-input" style={{ border: errors.lastName ? '1px solid #f87171' : undefined }} />
                    {errors.lastName && <span style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.lastName}</span>}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--muted)', marginBottom: '0.35rem' }}>Work Email</label>
                  <input type="text" name="email" value={formData.email} onChange={handleChange} className="contact-input" style={{ border: errors.email ? '1px solid #f87171' : undefined }} />
                  {errors.email && <span style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.email}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--muted)', marginBottom: '0.35rem' }}>Company</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} className="contact-input" style={{ border: errors.company ? '1px solid #f87171' : undefined }} />
                  {errors.company && <span style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.company}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--muted)', marginBottom: '0.35rem' }}>Industry</label>
                  <select name="industry" value={formData.industry} onChange={handleChange} className="contact-input" style={{ border: errors.industry ? '1px solid #f87171' : undefined }} disabled={optionsLoading}>
                    <option value="">{optionsLoading ? 'Loading…' : 'Select industry...'}</option>
                    {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                  </select>
                  {errors.industry && <span style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.industry}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--muted)', marginBottom: '0.35rem' }}>Interest</label>
                  <select name="interest" value={formData.interest} onChange={handleChange} className="contact-input" style={{ border: errors.interest ? '1px solid #f87171' : undefined }} disabled={optionsLoading}>
                    <option value="">{optionsLoading ? 'Loading…' : 'Select interest...'}</option>
                    {products.map((p) => <option key={p} value={p}>{p}</option>)}
                    <option value="All">All / Not sure</option>
                  </select>
                  {errors.interest && <span style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.interest}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--muted)', marginBottom: '0.35rem' }}>Anything we should know?</label>
                  <textarea name="message" rows="4" value={formData.message} onChange={handleChange} className="contact-input contact-textarea" style={{ border: errors.message ? '1px solid #f87171' : undefined, resize: 'vertical' }} />
                  {errors.message && <span style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.message}</span>}
                </div>

                {errors.submit && <p style={{ color: '#f87171', fontSize: '0.875rem', textAlign: 'center' }}>{errors.submit}</p>}

                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem', fontWeight: '600', marginTop: '0.5rem' }} disabled={isSubmitting}>
                  {isSubmitting ? 'Sending…' : "Send · we'll reach out in 1 day"}
                </button>
              </form>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--ink)' }}>Direct Channels</h3>
              {channels.length > 0 ? (
                <div className="contact-channels-grid">
                  {channels.map(({ label, email, iconName }) => (
                    <div key={label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <div style={{ background: 'var(--panel)', border: '1px solid var(--line)', padding: '0.5rem', borderRadius: '0.375rem', color: 'var(--cyan)', flexShrink: 0 }}>
                        {ICON_MAP[iconName] || '✉️'}
                      </div>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--ink)' }}>{label}</strong>
                        <a href={`mailto:${email}`} style={{ fontSize: '0.9rem', color: 'var(--cyan)' }}>{email}</a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (!optionsLoading && <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Channel information not available.</p>)}
            </div>

            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--ink)' }}>Offices</h3>
              {offices.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {offices.map(({ city, isHq, address }) => (
                    <div key={city} style={{ display: 'flex', gap: '0.75rem' }}>
                      <span style={{ color: 'var(--cyan)', flexShrink: 0 }}>📍</span>
                      <div>
                        <strong style={{ fontSize: '1rem', color: 'var(--ink)' }}>{city}{isHq ? ' · HQ' : ''}</strong>
                        <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: '0.25rem 0 0 0' }}>{address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (!optionsLoading && <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Office information not available.</p>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const UnsupportedSection = ({ section }) => (
  <div className="container" style={{ padding: '1.5rem', border: '1px dashed var(--border-color)', borderRadius: 8, color: 'var(--muted)', fontSize: '0.85rem', margin: '1rem auto' }}>
    No renderer yet for section type <code>{section.__component}</code> — this content exists in Strapi but isn't shown on the site yet. Ask engineering to add support for it.
  </div>
);

const SECTION_RENDERERS = {
  'sections.hero': HeroSection,
  'sections.heading': HeadingSection,
  'shared.rich-text': RichTextSection,
  'sections.features': FeatureGridSection,
  'sections.crm-features': FeatureGridSection,
  'sections.content-with-image': ContentWithImageSection,
  'sections.cta': CtaSection,
  'sections.faq': DynamicFaqSection,
  'sections.key-stats': KeyStatsSection,
  'sections.homepage-statistics': HomepageStatisticsSection,
  'sections.clients': ClientsSection,
  'sections.feature-list': FeatureListSection,
  'sections.banner-slider': BannerSliderSection,
  'sections.our-team': OurTeamSection,
  'sections.company': CompanySection,
  'sections.about-us': AboutUsSection,
  'sections.zigzag-cards': ZigzagCardsSection,
  'sections.info-grid': InfoGridSection,
  'sections.service-tabs': ServiceTabsSection,
  'sections.success-stories': SuccessStoriesSection,
  'sections.testimonials-shop': TestimonialsSection,
  'sections.testimonials-group': TestimonialsSection,
  'sections.partners': PartnersSection,
  'sections.industries': IndustriesSection,
  'sections.crm-pricing-plans': CrmPricingPlansSection,
  'sections.power-up-addons': PowerUpAddonsSection,
  'sections.implementation-bundles': ImplementationBundlesSection,
  'sections.bottom-actions': BottomActionsSection,
  'sections.split-feature-panel': SplitFeaturePanelSection,
  'sections.stat-feed': StatFeedSection,
  'sections.process-steps': ProcessStepsSection,
  'sections.data-panel': DataPanelSection,
  'sections.large-video': LargeVideoSection,
  'sections.services': ServicesSection,
  'sections.lead-form': LeadFormSection,
  'sections.contact-form': ContactFormSection,
  'sections.platform': PlatformSection,
  'layout.page-header': PageHeaderSection,
  'sections.logistics': RelationTeaserSection,
  'sections.retail': RelationTeaserSection,
  'sections.marketing': RelationTeaserSection,
  'sections.career-form': CareerFormSection,
  'sections.innovations': InnovationsSection,
  'sections.ceo-message': CeoMessageSection,
  'sections.internal-contact-form': InternalContactFormSection,
  'sections.logistics-page-forms': LogisticsPageFormsSection,
  'sections.tech-products': TechProductsSection,
  'sections.tech-expertise': TechExpertiseSection,
  'sections.package': PackageSection,
  'sections.retail-application-form': RetailApplicationFormSection,
  'sections.our-brands': OurBrandsSection,
  'sections.featured-products': FeaturedProductsSection,
  'sections.schedule-demo': ScheduleDemoSection,
  'sections.pricing-form': PricingFormSection,
  'sections.address-section': AddressSectionSection,
  'sections.collections': CollectionsSection,
  'sections.favorite-categories': FavoriteCategoriesSection,
  'sections.our-services': OurServicesSection,
  'sections.special-categories': SpecialCategoriesSection,
  'sections.hero-shop': HeroShopSection,
  'sections.enhanced-pricing-plans': EnhancedPricingPlansSection,
  'shared.recommended-blogs': RecommendedBlogsSection,
  'shared.agent-card': AgentCardSection,
};

const WRAPPED_IN_INTRO = new Set(['sections.hero', 'sections.heading', 'shared.rich-text']);

const renderSection = (section, index) => {
  const type = section.__component;
  if (!type) return null;
  const Renderer = SECTION_RENDERERS[type];
  if (!Renderer) return <UnsupportedSection key={index} section={section} />;
  return <Renderer key={index} section={section} />;
};

/* ── Renders a raw dynamic-zone array through the same SECTION_RENDERERS map
   PageRenderer uses, without its slug-fetch or generic hero/heading fallback.
   Lets a bespoke page (e.g. ProductPage) append CMS-authored blocks below its
   own hand-built sections without duplicating the component switch. ── */
export function PageBlocks({ sections }) {
  if (!sections?.length) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {sections.map((section, i) => {
        const type = section.__component;
        if (WRAPPED_IN_INTRO.has(type)) {
          return (
            <section key={i} className="section section-light" style={{ paddingTop: 0 }}>
              <div className="container" style={{ maxWidth: '860px' }}>
                {renderSection(section, i)}
              </div>
            </section>
          );
        }
        return renderSection(section, i);
      })}
    </div>
  );
}

/* ── Generic page shell: fetches one entry by slug from any collection whose
   schema exposes a dynamic zone, and renders it through SECTION_RENDERERS.
   Used by both DynamicPage.jsx (api::page.page / contentSections) and
   IndustryPage.jsx (api::industry.industry / blocks). ── */
export default function PageRenderer({ apiEndpoint, sectionsField, slug, notFoundLabel = 'page' }) {
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(Boolean(slug));

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    /* api::page.page overrides this populate server-side via its own deep-populate
       middleware regardless of what's sent — harmless there. For collections with
       no such middleware (industry, and the simpler product-suite content-types),
       this is required: dynamic zones return empty without an explicit populate. */
    fetchAPI(apiEndpoint, {
      'filters[slug][$eq]': slug,
      locale: 'en',
      [`populate[${sectionsField}][populate]`]: '*',
    }).then((res) => {
      if (cancelled) return;
      const found = res?.data?.[0];
      setEntry(found ? (found.attributes ?? found) : null);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [apiEndpoint, slug, sectionsField]);

  useSeoEffect(entry?.seo, entry?.heading || entry?.title || entry?.name);

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
          <p style={{ color: 'var(--muted)' }}>
            No {notFoundLabel} found for slug <code style={{ background: 'var(--panel)', padding: '0.15em 0.4em', borderRadius: '4px' }}>{slug}</code>.
            Make sure it is published in Strapi.
          </p>
        </div>
      </div>
    );
  }

  const sections = entry[sectionsField] ?? [];
  const hasRenderedHero = sections.some((s) => s.__component === 'sections.hero');
  const heading = entry.heading || entry.title || entry.name;
  const description = entry.description;

  return (
    <div className="dynamic-page">
      <section className="section section-light" style={{ minHeight: '60vh' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          {!hasRenderedHero && heading && (
            <h1 className="gradient-text" style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1.15', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
              {heading}
            </h1>
          )}
          {!hasRenderedHero && description && (
            <p style={{ color: 'var(--muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>{description}</p>
          )}
        </div>
      </section>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {sections.map((section, i) => {
          const type = section.__component;
          if (WRAPPED_IN_INTRO.has(type)) {
            return (
              <section key={i} className="section section-light" style={{ paddingTop: 0 }}>
                <div className="container" style={{ maxWidth: '860px' }}>
                  {renderSection(section, i)}
                </div>
              </section>
            );
          }
          return renderSection(section, i);
        })}
      </div>

      {sections.length === 0 && !heading && !description && (
        <div className="container">
          <p style={{ color: 'var(--muted)' }}>This {notFoundLabel} has no content yet.</p>
        </div>
      )}
    </div>
  );
}
