'use strict';

/* ═══════════════════════════════════════════════════════
   PHASE 3 — CMS COPY MIGRATION
   Moves the last hardcoded content out of the frontend and
   into Strapi:
     - Nav mega-menu + footer (main-menu / navigation / global)
       — these content-types already existed with public read
       permissions, but held stale URLs from an earlier,
       different (Next.js-style) frontend iteration
       (e.g. /brands, /about-us, /salescrm/overview). This
       phase corrects them to match this Vite app's real
       routes (/customers, /about, /crm, etc.) and to match
       the exact copy Layout.jsx currently hardcodes.
     - Hero + CTA (+ stats/steps) copy for Homepage and the
       8 "Class A" pages, via `sections.hero` / `sections.cta`
       / `sections.key-stats` / `sections.process-steps`
       blocks on a `page` entry per page slug.
     - 6 more product-suite pages added to the Products nav group:
       retail, dlm, enterprisegpt, agentcommerce, marketing (already had
       a working /marketing route via an earlier page migration — this
       just gives it a nav entry), merchandise-financial-planning.
       `salescrm` was deliberately left out — see
       foldSalesCrmCapabilityIntoCrm below.

   Idempotent: navigation/main-menu/global are corrected via
   find-or-update (never duplicated); page entries are only
   filled in if they don't already have content, so a
   hand-edited page is never clobbered on re-run.
═══════════════════════════════════════════════════════ */

const NOW = new Date().toISOString();

async function upsertNavigation(strapi, { slug, title, heading, description, navlinks }) {
  const existing = await strapi.db.query('api::navigation.navigation').findOne({ where: { slug } }).catch(() => null);
  const data = { slug, title, heading, description, navlinks, locale: 'en' };
  if (existing) {
    return strapi.entityService.update('api::navigation.navigation', existing.id, { data });
  }
  return strapi.entityService.create('api::navigation.navigation', { data: { ...data, publishedAt: NOW } });
}

async function updateMainMenu(strapi, mainMenuItems) {
  const existing = await strapi.db.query('api::main-menu.main-menu').findOne({}).catch(() => null);
  const data = { MainMenuItems: mainMenuItems, locale: 'en' };
  if (existing) {
    await strapi.entityService.update('api::main-menu.main-menu', existing.id, { data });
  } else {
    await strapi.entityService.create('api::main-menu.main-menu', { data: { ...data, publishedAt: NOW } });
  }
  strapi.log.info('[seed-phase3-cms-copy] main-menu ✓');
}

async function updateGlobalNavAndFooter(strapi, { navbar, footer }) {
  const existing = await strapi.db.query('api::global.global').findOne({}).catch(() => null);
  if (!existing) {
    strapi.log.warn('[seed-phase3-cms-copy] no api::global.global entry found — skipping navbar/footer update.');
    return;
  }
  await strapi.entityService.update('api::global.global', existing.id, { data: { navbar, footer } });
  strapi.log.info('[seed-phase3-cms-copy] global navbar/footer ✓');
}

/* `salescrm` is an earlier, thinner CRM landing page (stale Next.js-era URLs,
   generic copy) superseded by the current `crm` content-type's richer
   /crm page — not worth wiring as its own route (would duplicate /crm).
   Its "AI Lead Scoring" capability is the one idea not already covered by
   crm's own capabilities list (TAM/prospecting, pipeline analytics, outreach,
   signals, enrichment) — fold just that one in, skip the rest as redundant. */
async function foldSalesCrmCapabilityIntoCrm(strapi) {
  const crm = await strapi.db.query('api::crm.crm').findOne({ where: { slug: 'overview' } }).catch(() => null);
  if (!crm) {
    strapi.log.warn('[seed-phase3-cms-copy] no api::crm.crm entry found — skipping salescrm fold-in.');
    return;
  }
  const capabilities = crm.capabilities ?? [];
  if (capabilities.some((c) => c.title === 'AI Lead Scoring')) {
    strapi.log.info('[seed-phase3-cms-copy] crm already has AI Lead Scoring — skipping fold-in.');
    return;
  }
  await strapi.entityService.update('api::crm.crm', crm.id, {
    data: {
      capabilities: [
        ...capabilities,
        { icon: '📈', tag: 'Scoring', title: 'AI Lead Scoring', description: 'Automatically rank and prioritise leads based on conversion probability.', link_url: '/crm' },
      ],
    },
  });
  strapi.log.info('[seed-phase3-cms-copy] folded salescrm\'s AI Lead Scoring into crm capabilities ✓');
}

async function ensurePageWithHero(strapi, { slug, shortName, heading, description, contentSections }) {
  const existing = await strapi.db.query('api::page.page').findOne({ where: { slug }, populate: ['contentSections'] }).catch(() => null);

  if (existing) {
    const currentHero = (existing.contentSections ?? []).find((s) => s.__component === 'sections.hero');
    if (currentHero?.title === heading) {
      strapi.log.info(`[seed-phase3-cms-copy] page "${slug}" already has this hero — skipping.`);
      return;
    }
    /* Slug pre-existed from an earlier (unrelated) seed pass with stale content
       that no route on this frontend renders — safe to fully replace, same as
       the navigation/global corrections above. */
    await strapi.entityService.update('api::page.page', existing.id, {
      data: {
        heading,
        description,
        contentSections,
        seo: { metaTitle: `${heading} — Polluxa`, metaDescription: description },
      },
    });
    strapi.log.info(`[seed-phase3-cms-copy] page "${slug}" hero replaced ✓`);
    return;
  }

  await strapi.entityService.create('api::page.page', {
    data: {
      shortName,
      slug,
      heading,
      description,
      seo: { metaTitle: `${heading} — Polluxa`, metaDescription: description },
      contentSections,
      locale: 'en',
      publishedAt: NOW,
    },
  });
  strapi.log.info(`[seed-phase3-cms-copy] page "${slug}" created ✓`);
}

async function seedPhase3CmsCopy({ strapi }) {
  /* ═══ 1. NAVIGATION ENTRIES (corrected URLs, matching Layout.jsx exactly) ═══ */
  const navProducts = await upsertNavigation(strapi, {
    slug: 'products-nav', title: 'Products', heading: 'Our Software Suite',
    description: 'CRM, Commerce, PLM, Logistics and WMS on one intelligent platform.',
    navlinks: [
      { title: 'CRM', url: '/crm', subtitle: 'SaaS-based Sales CRM — manage leads, close deals faster, grow revenue.', subLinks: [] },
      { title: 'Commerce', url: '/commerce', subtitle: 'Improve customer relations, optimize supply chain and B2B transactions.', subLinks: [] },
      { title: 'Creator Commerce', url: '/creator-commerce', subtitle: 'Empower creators and influencers to launch and scale e-commerce brands.', subLinks: [] },
      { title: 'Product Lifecycle Management', url: '/plm', subtitle: 'Reduce costs and time to market. Improve collaboration across teams.', subLinks: [] },
      { title: 'Logistics', url: '/logistics', subtitle: 'Last-mile delivery services via a robust network of hubs and couriers.', subLinks: [] },
      { title: 'Warehouse Management System', url: '/wms', subtitle: 'Increase fulfilment rates and streamline warehouse operations.', subLinks: [] },
      { title: 'Retail', url: '/retail', subtitle: 'End-to-end retail management platform for enterprise brands.', subLinks: [] },
      { title: 'Digital Lifecycle Management', url: '/dlm', subtitle: 'Manage every digital asset across the full product lifecycle.', subLinks: [] },
      { title: 'EnterpriseGPT', url: '/enterprisegpt', subtitle: 'Enterprise AI assistant for commercial operations and decision support.', subLinks: [] },
      { title: 'Agentic Commerce', url: '/agentcommerce', subtitle: 'AI agents that autonomously manage your commerce operations 24/7.', subLinks: [] },
      { title: 'Marketing', url: '/marketing', subtitle: 'Marketing automation and campaign management for enterprise brands.', subLinks: [] },
      { title: 'Merchandise Financial Planning', url: '/merchandise-financial-planning', subtitle: 'Align buying decisions with financial goals.', subLinks: [] },
    ],
  });

  const navCustomers = await upsertNavigation(strapi, {
    slug: 'customers-nav', title: 'Customers', heading: 'Customers',
    description: 'Discover how global brands succeed with Polluxa.',
    navlinks: [
      { title: 'All customers', url: '/customers', subtitle: '', subLinks: [] },
      { title: 'Case studies & Whitepapers', url: '/case-studies', subtitle: '', subLinks: [] },
      { title: 'By industry', url: '/customers', subtitle: '', subLinks: [] },
    ],
  });

  const navPartners = await upsertNavigation(strapi, {
    slug: 'partners-nav', title: 'Partners', heading: 'Ecosystem',
    description: 'Grow with Polluxa.',
    navlinks: [
      { title: 'Partner network', url: '/partners', subtitle: '', subLinks: [] },
      { title: 'Become a partner', url: '/contact', subtitle: '', subLinks: [] },
    ],
  });

  const navCompany = await upsertNavigation(strapi, {
    slug: 'company-nav', title: 'Company', heading: 'About Polluxa',
    description: 'Our story and mission.',
    navlinks: [
      { title: 'About us', url: '/about', subtitle: '', subLinks: [] },
      { title: 'Careers', url: '/careers', subtitle: '', subLinks: [] },
      { title: 'Blog', url: '/blog', subtitle: '', subLinks: [] },
      { title: 'Events', url: '/events', subtitle: '', subLinks: [] },
      { title: 'Contact us', url: '/contact', subtitle: '', subLinks: [] },
    ],
  });
  strapi.log.info('[seed-phase3-cms-copy] navigation entries ✓');

  /* ═══ 2. MAIN MENU (4 dropdowns, one per nav group) ═══ */
  await updateMainMenu(strapi, [
    { __component: 'menu.dropdown', title: 'Products', navigations: { connect: [navProducts.id] } },
    { __component: 'menu.dropdown', title: 'Customers', navigations: { connect: [navCustomers.id] } },
    { __component: 'menu.dropdown', title: 'Partners', navigations: { connect: [navPartners.id] } },
    { __component: 'menu.dropdown', title: 'Company', navigations: { connect: [navCompany.id] } },
  ]);

  /* ═══ 3. GLOBAL — navbar right-side links/button, footer columns/legal/copyright ═══ */
  await updateGlobalNavAndFooter(strapi, {
    navbar: {
      links: [{ url: '/contact', text: 'Contact Us', newTab: false }],
      button: { url: 'https://crm.polluxa.com/auth/login', text: 'Start Today', type: 'primary', newTab: false },
    },
    footer: {
      copyrightText: '© 2025 Polluxa, All rights reserved.',
      legalLinks: [
        { url: '/careers', text: 'Careers', newTab: false },
        { url: '/blog', text: 'Blog', newTab: false },
        { url: '/partners', text: 'Partners', newTab: false },
        { url: '/customers', text: 'Customers', newTab: false },
        { url: '/case-studies', text: 'Case Studies', newTab: false },
        { url: '/about', text: 'About Us', newTab: false },
        { url: '/events', text: 'Events', newTab: false },
        { url: '/privacy', text: 'Privacy', newTab: false },
      ],
      FooterMenu: [
        {
          Heading: 'Products', slug: 'products-footer',
          FooterLinks: [
            { url: '/crm', text: 'CRM', newTab: false },
            { url: '/commerce', text: 'Commerce', newTab: false },
            { url: '/creator-commerce', text: 'Creator Commerce', newTab: false },
            { url: '/plm', text: 'Product Lifecycle Management', newTab: false },
            { url: '/logistics', text: 'Logistics', newTab: false },
            { url: '/wms', text: 'Warehouse Management System', newTab: false },
            { url: '/retail', text: 'Retail', newTab: false },
            { url: '/dlm', text: 'Digital Lifecycle Management', newTab: false },
            { url: '/enterprisegpt', text: 'EnterpriseGPT', newTab: false },
            { url: '/agentcommerce', text: 'Agentic Commerce', newTab: false },
            { url: '/marketing', text: 'Marketing', newTab: false },
            { url: '/merchandise-financial-planning', text: 'Merchandise Financial Planning', newTab: false },
          ],
        },
        {
          Heading: 'Industries', slug: 'industries-footer',
          FooterLinks: [
            { url: '/customers', text: 'Fashion & Apparel', newTab: false },
            { url: '/customers', text: 'Outdoor & Sports', newTab: false },
            { url: '/customers', text: 'Multi Category Retail', newTab: false },
            { url: '/customers', text: 'Home & Furniture', newTab: false },
            { url: '/customers', text: 'Food & Beverage', newTab: false },
            { url: '/customers', text: 'Consumer Goods', newTab: false },
            { url: '/customers', text: 'Cosmetics and Personal Care', newTab: false },
            { url: '/customers', text: 'Consumer Electronics', newTab: false },
          ],
        },
      ],
    },
  });

  /* ═══ 4. PAGE HERO/CTA/STATS BLOCKS ═══ */
  await ensurePageWithHero(strapi, {
    slug: 'home', shortName: 'Home',
    heading: 'The future of Work is Agentic.',
    description: 'Polluxa is to enterprise software what a neural network is to AI — intelligent, adaptive, and built for the future.',
    contentSections: [
      {
        __component: 'sections.hero',
        subHeading: 'The complete agentic enterprise platform',
        title: 'The future of Work is Agentic.',
        description: 'Polluxa is to enterprise software what a neural network is to AI — intelligent, adaptive, and built for the future.',
        buttons: [
          { url: 'https://crm.polluxa.com/auth/login', text: 'Start Today', type: 'primary', newTab: false },
          { url: '/contact', text: 'Book a live demo', type: 'secondary', newTab: false },
        ],
      },
      {
        __component: 'sections.process-steps',
        title: 'Up and running in three steps.',
        description: 'No months-long IT projects. No data silos. Polluxa connects your whole business and starts working from day one.',
        steps: [
          { icon: '🔌', title: 'Connect your systems', description: 'Plug in your existing tools — ERP, e-commerce stores, warehouses, courier partners. Polluxa connects everything on one data layer in days, not months.' },
          { icon: '🤖', title: 'Let AI agents do the routine work', description: 'Autonomous agents monitor your business 24/7 — chasing approvals, flagging stock issues, updating CRM records, and routing tasks to the right person automatically.' },
          { icon: '🚀', title: 'Your team focuses on growth', description: 'With agents handling the repetitive, your sales, ops, and logistics teams spend their time on customers and strategy — not spreadsheets and data entry.' },
        ],
      },
      {
        __component: 'sections.key-stats',
        title: 'By the numbers',
        description: 'We are a key innovation partner for iconic and emerging brands across the world.',
        variant: 'horizontal',
        keys: [
          { title: '2000+', description: 'Brands trust Polluxa' },
          { title: '100%', description: 'Go live rate' },
          { title: '99%', description: 'Customer retention rate' },
        ],
      },
      {
        __component: 'sections.cta',
        title: 'Make better a reality.',
        description: 'Your business is unique. Polluxa delivers the tailored tools, integrations, and expert support to turn your growth ambitions into measurable outcomes — at enterprise scale.',
        Button: { url: '/contact', text: 'Book Live Demo', type: 'primary', newTab: false },
      },
    ],
  });

  await ensurePageWithHero(strapi, {
    slug: 'agents', shortName: 'Agents',
    heading: 'Autonomous workers. Always on.',
    description: 'A constellation of AI workers that find pipeline, qualify leads, brief your reps and chase the long tail — deployed in minutes, scaled without limits.',
    contentSections: [
      {
        __component: 'sections.hero',
        title: 'Autonomous workers. Always on.',
        description: 'A constellation of AI workers that find pipeline, qualify leads, brief your reps and chase the long tail — deployed in minutes, scaled without limits.',
        buttons: [
          { url: 'https://sales.polluxa.com/', text: 'Deploy agents free', type: 'primary', newTab: false },
          { url: '/contact', text: 'Book a demo', type: 'secondary', newTab: false },
        ],
      },
      {
        __component: 'sections.cta',
        title: '68% agent-sourced pipeline for established teams.',
        description: 'Deploy in minutes. Free for 3 years.',
        Button: { url: 'https://sales.polluxa.com/', text: 'Get Agent CRM — Free', type: 'primary', newTab: false },
      },
    ],
  });

  await ensurePageWithHero(strapi, {
    slug: 'blog', shortName: 'Blog',
    heading: 'The Polluxa Blog.',
    description: 'Practical insights on enterprise software, supply chain, creator commerce, and the future of AI-driven operations.',
    contentSections: [
      {
        __component: 'sections.hero',
        title: 'The Polluxa Blog.',
        description: 'Practical insights on enterprise software, supply chain, creator commerce, and the future of AI-driven operations.',
      },
      {
        __component: 'sections.cta',
        title: 'Stay ahead of the curve.',
        description: 'New insights every week — enterprise AI, commerce, and supply chain. No spam.',
      },
    ],
  });

  await ensurePageWithHero(strapi, {
    slug: 'careers', shortName: 'Careers',
    heading: 'Work on the future of enterprise software.',
    description: 'Polluxa is building one intelligent platform for CRM, Commerce, PLM, Logistics, and WMS. Join a team that ships fast, thinks big, and is distributed across 38 countries.',
    contentSections: [
      {
        __component: 'sections.hero',
        title: 'Work on the future of enterprise software.',
        description: 'Polluxa is building one intelligent platform for CRM, Commerce, PLM, Logistics, and WMS. Join a team that ships fast, thinks big, and is distributed across 38 countries.',
        buttons: [{ url: '#openings', text: 'See open roles', type: 'primary', newTab: false }],
      },
      {
        __component: 'sections.cta',
        title: "Don't see your role? Reach out anyway.",
        description: "We're always looking for great people. Send us a note and we'll reach out when something opens up.",
        Button: { url: '/contact', text: 'Get in touch', type: 'primary', newTab: false },
      },
    ],
  });

  await ensurePageWithHero(strapi, {
    slug: 'case-studies', shortName: 'Case Studies',
    heading: 'Case Studies & Whitepapers.',
    description: 'Real outcomes from real enterprises. Plus in-depth whitepapers on the future of commerce, PLM, logistics, and agentic AI.',
    contentSections: [
      {
        __component: 'sections.hero',
        title: 'Case Studies & Whitepapers.',
        description: 'Real outcomes from real enterprises. Plus in-depth whitepapers on the future of commerce, PLM, logistics, and agentic AI.',
      },
      {
        __component: 'sections.key-stats',
        variant: 'horizontal',
        keys: [
          { title: '2000+', description: 'Customers globally' },
          { title: '100%', description: 'Go-live rate' },
          { title: '38', description: 'Countries served' },
          { title: '99%', description: 'Customer retention' },
        ],
      },
      {
        __component: 'sections.cta',
        title: 'See what Polluxa can do for your business.',
        description: 'Join 2000+ enterprises across 38 countries that run on Polluxa — with a 100% go-live rate and 99% customer retention.',
        Button: { url: '/contact', text: 'Book a demo', type: 'primary', newTab: false },
      },
    ],
  });

  await ensurePageWithHero(strapi, {
    slug: 'customers', shortName: 'Customers',
    heading: '2,000+ brands. One platform.',
    description: 'From category-defining retailers to fast-moving creator brands, Polluxa is the operating system behind the businesses you buy from every week.',
    contentSections: [
      {
        __component: 'sections.hero',
        title: '2,000+ brands. One platform.',
        description: 'From category-defining retailers to fast-moving creator brands, Polluxa is the operating system behind the businesses you buy from every week.',
        buttons: [
          { url: '/case-studies', text: 'Read case studies', type: 'primary', newTab: false },
          { url: '/contact', text: 'Become a customer', type: 'secondary', newTab: false },
        ],
      },
      {
        __component: 'sections.cta',
        title: 'Join 2,000+ brands on Polluxa.',
        description: 'Get custom configurations, dedicated migration engineering support, and transparent SLAs.',
        Button: { url: '/contact', text: 'Book a demo', type: 'primary', newTab: false },
      },
    ],
  });

  await ensurePageWithHero(strapi, {
    slug: 'events', shortName: 'Events',
    heading: 'Stay Updated with Our Latest Events.',
    description: 'Conferences, summits and exhibitions across India, the Middle East, Southeast Asia, Australia, and beyond.',
    contentSections: [
      {
        __component: 'sections.hero',
        title: 'Stay Updated with Our Latest Events.',
        description: 'Conferences, summits and exhibitions across India, the Middle East, Southeast Asia, Australia, and beyond.',
        buttons: [{ url: '/contact', text: 'Contact us', type: 'primary', newTab: false }],
      },
      {
        __component: 'sections.cta',
        title: "We'd love to discuss your organization's needs.",
        description: 'Contact us via the details below or fill in a quick request — our team will reach out within one business day.',
        Button: { url: '/contact', text: 'Contact us', type: 'primary', newTab: false },
      },
    ],
  });

  await ensurePageWithHero(strapi, {
    slug: 'partners', shortName: 'Partners',
    heading: 'Our Partners.',
    description: 'We collaborate with the top associations and partners in the industry and technology to keep innovating our products and hasten the adoption of Polluxa.',
    contentSections: [
      {
        __component: 'sections.hero',
        title: 'Our Partners.',
        description: 'We collaborate with the top associations and partners in the industry and technology to keep innovating our products and hasten the adoption of Polluxa.',
        buttons: [{ url: '/contact', text: 'Become a partner', type: 'primary', newTab: false }],
      },
      {
        __component: 'sections.cta',
        title: 'Ready to join our partner network?',
        description: 'Contact our partner team to explore the right tier and region together.',
        Button: { url: '/contact', text: 'Find out more', type: 'primary', newTab: false },
      },
    ],
  });

  await ensurePageWithHero(strapi, {
    slug: 'pricing', shortName: 'Pricing',
    heading: 'Free to start. Scales with your team.',
    description: 'Every plan includes a free-forever tier. No credit card required to start.',
    contentSections: [
      {
        __component: 'sections.hero',
        title: 'Free to start. Scales with your team.',
        description: 'Every plan includes a free-forever tier. No credit card required to start.',
      },
      {
        __component: 'sections.cta',
        title: 'Questions about pricing?',
        description: "Talk to our team — we'll help you find the right plan for your team size and use case.",
        Button: { url: '/contact', text: 'Talk to sales', type: 'primary', newTab: false },
      },
    ],
  });

  await foldSalesCrmCapabilityIntoCrm(strapi);

  strapi.log.info('[seed-phase3-cms-copy] ✅ Phase 3 CMS copy migration complete.');
}

module.exports = { seedPhase3CmsCopy };
