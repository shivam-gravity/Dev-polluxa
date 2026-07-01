'use strict';

/* ═══════════════════════════════════════════════════════
   SEED PRODUCT PAGES MIGRATION
   Phase 1 of the Strapi-driven CMS migration.

   Reads the 6 legacy per-product content types (api::crm.crm,
   api::commerce.commerce, api::plm.plm, api::wms.wms,
   api::logistic.logistic, api::creator-commerce.creator-commerce)
   — populated by seed-content.js with raw JSON fields — and
   creates equivalent api::page.page entries whose slug matches
   the current URL path (crm, commerce, plm, wms, logistics,
   creator-commerce), built entirely out of reusable
   `sections.*` components in the `contentSections` dynamic zone.

   This lets DynamicPage.jsx render these 6 products the same
   way it renders every other page, and lets a manager edit them
   in Strapi Admin without touching JSON.

   Idempotent: if a `page` with the target slug already exists,
   that product is skipped entirely — matching the "skip if
   already exists" convention used by seed-pages.js elsewhere in
   this file. The old crm/commerce/plm/wms/logistic/creator-commerce
   entries are left untouched (read-only source data / backup).
═══════════════════════════════════════════════════════ */

const NOW = new Date().toISOString();

const primaryButton = (label, url) =>
  url || label ? { url: url || '#', text: label || 'Learn more', type: 'primary', newTab: false } : null;

const secondaryButton = (label, url) =>
  url || label ? { url: url || '#', text: label || 'Learn more', type: 'secondary', newTab: false } : null;

function heroSection(entry, { subHeading } = {}) {
  const buttons = [
    primaryButton(entry.cta_primary_label, entry.cta_primary_url),
    secondaryButton(entry.cta_secondary_label, entry.cta_secondary_url),
  ].filter(Boolean);

  return {
    __component: 'sections.hero',
    title: entry.hero_title || entry.title,
    description: entry.hero_description || entry.description || '',
    subHeading: subHeading || entry.hero_subtitle || undefined,
    bgColor: '#0A0A0F',
    picture: entry.media?.file?.id || undefined,
    buttons,
  };
}

function keyStatsSection(metrics, title = 'By the numbers') {
  if (!Array.isArray(metrics) || metrics.length === 0) return null;
  return {
    __component: 'sections.key-stats',
    title,
    keys: metrics.map((m) => ({
      title: m.target != null ? `${m.target}${m.suffix || ''}` : (m.display ?? m.value ?? ''),
      description: m.label || '',
    })),
  };
}

function featuresSection(items, { component = 'sections.features', heading, columns = 'threeColumn' } = {}) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return {
    __component: component,
    heading,
    variant: 'card',
    columns,
    enable: true,
    feature: items.map((f) => ({
      title: f.icon ? `${f.icon} ${f.title}`.trim() : f.title,
      subtitle: f.subtitle || undefined,
      description: f.description || '',
      showLink: Boolean(f.link_url),
      url: f.link_url || undefined,
      text: f.link_url ? 'Learn more' : undefined,
    })),
  };
}

function infoGridSection(items, { title, nameKey = 'title', badgeKey = 'badge', linkKey = 'link_url', linkLabelKey = 'link_label' } = {}) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return {
    __component: 'sections.info-grid',
    title,
    service: items.map((it) => ({
      name: it[nameKey],
      subheader: it[badgeKey] || undefined,
      description: it.description || '',
      Button: it[linkKey]
        ? { url: it[linkKey], text: it[linkLabelKey] ? it[linkLabelKey] : 'Explore', type: 'secondary', newTab: false }
        : undefined,
    })),
  };
}

function clientsSection(names, heading) {
  if (!Array.isArray(names) || names.length === 0) return null;
  return {
    __component: 'sections.clients',
    heading,
    enable: true,
    Client: names.map((name) => ({ title: name, showLink: false })),
  };
}

function splitFeaturePanel({ heading, title, description, bullets, stats, imagePosition = 'right' }) {
  if (!title && !description && !(bullets || []).length) return null;
  return {
    __component: 'sections.split-feature-panel',
    heading,
    title,
    description,
    imagePosition,
    bullets: (bullets || []).map((b) => ({ Bullet: b })),
    stats: (stats || []).map((s) => ({ metric: s.metric, description: s.description })),
  };
}

function industriesSection(industryIds, title = 'Built for every industry') {
  if (!industryIds.length) return null;
  return {
    __component: 'sections.industries',
    title,
    description: 'Polluxa adapts to your industry requirements out of the box.',
    industries: { connect: industryIds },
  };
}

function faqSection(faq) {
  if (!Array.isArray(faq) || faq.length === 0) return null;
  return {
    __component: 'sections.faq',
    title: 'Frequently asked questions',
    FaqOption: faq.map((f) => ({ title: f.question, description: f.answer })),
  };
}

function bottomActionsSection(entry) {
  if (!entry.demo_headline && !entry.demo_description) return null;
  return {
    __component: 'sections.bottom-actions',
    title: entry.demo_headline,
    description: entry.demo_description,
    buttons: [primaryButton(entry.cta_primary_label, entry.cta_primary_url)].filter(Boolean),
  };
}

function seoFrom(entry, fallbackTitle) {
  const metaTitle = `${entry.title || fallbackTitle} — Polluxa`;
  const metaDescription = (entry.hero_description || entry.description || '').slice(0, 155)
    || `Learn about ${fallbackTitle} on Polluxa.`;
  return { metaTitle, metaDescription };
}

/* ─────────────────────────────────────────────────────────
   Per-product builders
───────────────────────────────────────────────────────── */

function buildCrmSections(entry) {
  return [
    heroSection(entry),
    keyStatsSection(entry.metrics),
    featuresSection(entry.capabilities, { component: 'sections.crm-features', heading: 'Capabilities' }),
    infoGridSection(entry.channels, { title: 'Outreach Channels', nameKey: 'title' }),
    infoGridSection(entry.modules, { title: 'Included Modules', nameKey: 'title' }),
    faqSection(entry.faq),
    bottomActionsSection(entry),
  ].filter(Boolean);
}

function buildCommerceSections(entry) {
  const d2c = entry.d2c_section || {};
  const b2b = entry.b2b_section || {};
  const showcase = entry.product_showcase || [];

  return [
    heroSection(entry, { subHeading: entry.hero_label }),
    keyStatsSection(entry.metrics),
    clientsSection(entry.trust_badges, 'Trusted by'),
    featuresSection(entry.ecommerce_features, { heading: 'Everything you need to sell everywhere' }),
    splitFeaturePanel({
      heading: d2c.label,
      title: d2c.title,
      description: d2c.description,
      bullets: d2c.bullets,
      stats: (d2c.dashboard || []).map((s) => ({ metric: s.value, description: s.label })),
      imagePosition: 'right',
    }),
    splitFeaturePanel({
      heading: b2b.label,
      title: b2b.title,
      description: b2b.description,
      bullets: b2b.bullets,
      stats: (b2b.portal_items || [])
        .filter((it) => it.type === 'value' && it.value)
        .map((it) => ({ metric: it.value, description: it.label })),
      imagePosition: 'left',
    }),
    showcase.length
      ? splitFeaturePanel({
          heading: 'Product Showcase',
          title: 'Active across every channel',
          description: 'A live look at what is moving through Polluxa Commerce right now.',
          bullets: showcase.map((p) => `${p.type}: ${p.title}${p.detail ? ` — ${p.detail}` : ''}`),
        })
      : null,
    clientsSection(entry.integrations_list, 'Integrations'),
    faqSection(entry.faq),
    bottomActionsSection(entry),
  ].filter(Boolean);
}

function buildPlainProductSections(entry, { industryIds, includeIndustries }) {
  return [
    heroSection(entry),
    keyStatsSection(entry.metrics),
    featuresSection(entry.features, { heading: 'Key Capabilities' }),
    includeIndustries ? industriesSection(industryIds) : null,
    clientsSection(entry.integrations_list, 'Integrations'),
    faqSection(entry.faq),
    bottomActionsSection(entry),
  ].filter(Boolean);
}

const PRODUCTS = [
  {
    slug: 'crm',
    shortName: 'CRM',
    uid: 'api::crm.crm',
    build: buildCrmSections,
  },
  {
    slug: 'commerce',
    shortName: 'Commerce',
    uid: 'api::commerce.commerce',
    build: buildCommerceSections,
  },
  {
    slug: 'plm',
    shortName: 'PLM',
    uid: 'api::plm.plm',
    build: (entry, ctx) => buildPlainProductSections(entry, { ...ctx, includeIndustries: true }),
  },
  {
    slug: 'wms',
    shortName: 'WMS',
    uid: 'api::wms.wms',
    build: (entry, ctx) => buildPlainProductSections(entry, { ...ctx, includeIndustries: false }),
  },
  {
    slug: 'logistics',
    shortName: 'Logistics',
    uid: 'api::logistic.logistic',
    build: (entry, ctx) => buildPlainProductSections(entry, { ...ctx, includeIndustries: true }),
  },
  {
    slug: 'creator-commerce',
    shortName: 'Creator Commerce',
    uid: 'api::creator-commerce.creator-commerce',
    build: (entry, ctx) => buildPlainProductSections(entry, { ...ctx, includeIndustries: true }),
  },
];

async function seedProductPageMigration({ strapi }) {
  const industries = await strapi.db.query('api::industry.industry').findMany({});
  const industryIds = industries.map((i) => i.id);

  for (const p of PRODUCTS) {
    const existingPage = await strapi.db
      .query('api::page.page')
      .findOne({ where: { slug: p.slug } })
      .catch(() => null);

    if (existingPage) {
      strapi.log.info(`[seed-product-pages-migration] page "${p.slug}" already exists — skipping.`);
      continue;
    }

    const legacyEntry = await strapi.db
      .query(p.uid)
      .findOne({ where: { slug: 'overview' }, populate: ['media', 'media.file'] })
      .catch(() => null);

    if (!legacyEntry) {
      strapi.log.warn(`[seed-product-pages-migration] no source entry found for ${p.uid} (slug "overview") — skipping "${p.slug}".`);
      continue;
    }

    const contentSections = p.build(legacyEntry, { industryIds });

    await strapi.entityService.create('api::page.page', {
      data: {
        shortName: p.shortName,
        slug: p.slug,
        heading: legacyEntry.hero_title || legacyEntry.title,
        description: legacyEntry.hero_description || legacyEntry.description || '',
        locale: 'en',
        seo: seoFrom(legacyEntry, p.shortName),
        contentSections,
        publishedAt: NOW,
      },
    });

    strapi.log.info(`[seed-product-pages-migration] page "${p.slug}" created from ${p.uid} ✓ (${contentSections.length} sections). SEO was auto-generated from hero copy — review metaTitle/metaDescription in Strapi Admin.`);
  }

  strapi.log.info('[seed-product-pages-migration] ✅ Phase 1 product page migration complete.');
}

module.exports = { seedProductPageMigration };
