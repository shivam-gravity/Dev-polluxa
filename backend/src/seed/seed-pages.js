'use strict';

const NOW = new Date().toISOString();

/* ═══════════════════════════════════════════════════════
   SEED PAGES  — seeds industries, product pages, and
   page entries (home, about-us, contact-us, brands).
   Each section has its own guard so partial runs are safe.
═══════════════════════════════════════════════════════ */
async function seedPages({ strapi }) {
  const publish = (uid, data) =>
    strapi.entityService.create(uid, {
      data: { ...data, publishedAt: NOW },
    });

  /* ════════════════════════════════════════════════════
     1. INDUSTRIES
  ════════════════════════════════════════════════════ */
  const industryCount = await strapi.db
    .query('api::industry.industry')
    .count();

  const industryIds = [];

  if (industryCount === 0) {
    strapi.log.info('[seed-pages] Seeding industries...');
    const industryDefs = [
      { title: 'Fashion & Apparel',         slug: 'fashion-apparel',         desc: 'End-to-end platform for fashion and apparel brands from design to shelf.' },
      { title: 'Outdoor & Sports',           slug: 'outdoor-sports',          desc: 'Manage seasonal collections, multi-channel distribution, and warranty management.' },
      { title: 'Multi Category Retail',      slug: 'multi-category-retail',   desc: 'Unified commerce and supply chain for multi-category retailers.' },
      { title: 'Home & Furniture',           slug: 'home-furniture',          desc: 'Streamline product lifecycle for complex home and furniture categories.' },
      { title: 'Food & Beverage',            slug: 'food-beverage',           desc: 'Compliance-ready PLM and commerce for food and beverage companies.' },
      { title: 'Consumer Goods',             slug: 'consumer-goods',          desc: 'Accelerate innovation cycles for fast-moving consumer goods companies.' },
      { title: 'Cosmetics & Personal Care',  slug: 'cosmetics-personal-care', desc: 'Ingredient compliance, formulation management, and regulatory submissions.' },
      { title: 'Consumer Electronics',       slug: 'consumer-electronics',    desc: 'Manage complex BOMs, product variants, and global compliance.' },
      { title: 'Pharmaceutical',             slug: 'pharmaceutical',           desc: 'Regulatory-grade PLM for pharmaceutical product development and compliance.' },
      { title: 'Automotive',                 slug: 'automotive',               desc: 'BOM management and supplier collaboration for automotive manufacturers.' },
    ];
    for (const ind of industryDefs) {
      const e = await publish('api::industry.industry', {
        title: ind.title,
        slug: ind.slug,
        description: ind.desc,
        locale: 'en',
      });
      industryIds.push(e.id);
    }
    strapi.log.info('[seed-pages] Industries ✓');
  } else {
    const existing = await strapi.db
      .query('api::industry.industry')
      .findMany({});
    existing.forEach((e) => industryIds.push(e.id));
    strapi.log.info('[seed-pages] Industries already exist — using existing IDs.');
  }

  /* ════════════════════════════════════════════════════
     2. PRODUCT PAGES
     Each product collection gets an "overview" entry with
     hero + feature-list + bottom-actions blocks (or the
     closest available equivalents for that content type).
  ════════════════════════════════════════════════════ */
  strapi.log.info('[seed-pages] Seeding product pages...');

  const makeHeroBlocks = (heroTitle, heroDesc, f1, f2, f3, ctaTitle, ctaDesc) => [
    {
      __component: 'sections.hero',
      title: heroTitle,
      description: heroDesc,
      bgColor: '#0A0A0F',
      buttons: [
        { url: '/contact-us', text: 'Book a Demo', type: 'primary', newTab: false },
        { url: '/blogs',      text: 'Learn More',  type: 'secondary', newTab: false },
      ],
    },
    {
      __component: 'sections.feature-list',
      features: [
        { title: f1.title, description: f1.desc, bullets: [{ Bullet: f1.desc }] },
        { title: f2.title, description: f2.desc, bullets: [{ Bullet: f2.desc }] },
        { title: f3.title, description: f3.desc, bullets: [{ Bullet: f3.desc }] },
      ],
    },
    {
      __component: 'sections.bottom-actions',
      title: ctaTitle,
      description: ctaDesc,
      buttons: [{ url: '/contact-us', text: 'Book a Demo', type: 'primary', newTab: false }],
    },
  ];

  const makePageHeaderBlocks = (heading, title, desc, f1, f2, f3, ctaTitle, ctaDesc) => [
    {
      __component: 'layout.page-header',
      heading,
      title,
      description: desc,
    },
    {
      __component: 'sections.features',
      heading: 'Key Capabilities',
      description: 'Everything you need to scale your enterprise operations.',
      variant: 'card',
      columns: 'threeColumn',
      enable: true,
      feature: [
        { title: f1.title, description: f1.desc, showLink: false },
        { title: f2.title, description: f2.desc, showLink: false },
        { title: f3.title, description: f3.desc, showLink: false },
      ],
    },
    {
      __component: 'sections.bottom-actions',
      title: ctaTitle,
      description: ctaDesc,
      buttons: [{ url: '/contact-us', text: 'Book a Demo', type: 'primary', newTab: false }],
    },
  ];

  const productDefs = [
    {
      uid: 'api::commerce.commerce',
      title: 'Polluxa Commerce',
      slug: 'overview',
      description: 'Unified B2B & B2C commerce platform for enterprise retailers.',
      seoTitle: 'Polluxa Commerce — Unified B2B & B2C Platform',
      blocks: makeHeroBlocks(
        'Commerce Anywhere',
        'Sell online, in-store, via marketplace, and on social — from one unified platform.',
        { title: 'Unified Catalog',     desc: 'One product catalog for every channel — web, mobile, in-store, and marketplace.' },
        { title: 'Agentic Promotions',  desc: 'AI-driven promotion engine that automatically optimizes offers in real time.' },
        { title: 'B2B & B2C in One',    desc: 'Serve both wholesale and direct-to-consumer customers on the same platform.' },
        'Ready to unify your commerce?',
        'Join 500+ retailers using Polluxa Commerce.'
      ),
    },
    {
      uid: 'api::plm.plm',
      title: 'Polluxa PLM',
      slug: 'overview',
      description: 'Product Lifecycle Management for enterprise manufacturers and retailers.',
      seoTitle: 'Polluxa PLM — Product Lifecycle Management',
      blocks: makeHeroBlocks(
        'Product Lifecycle Management',
        'From concept to shelf — manage every stage of the product lifecycle. Used by 700+ brands across 38 countries.',
        { title: 'Digital Tech Pack',       desc: 'Create, share, and iterate on tech packs with suppliers in real time.' },
        { title: 'Compliance Management',   desc: 'Built-in regulatory compliance for cosmetics, pharma, apparel, and more.' },
        { title: 'Supplier Collaboration',  desc: 'Invite suppliers to collaborate on product specs, samples, and approvals.' },
        'Start your PLM transformation',
        'Join 700+ manufacturers who trust Polluxa PLM.'
      ),
    },
    {
      uid: 'api::wms.wms',
      title: 'Polluxa WMS',
      slug: 'overview',
      description: 'Warehouse Management System with real-time inventory visibility.',
      seoTitle: 'Polluxa WMS — Warehouse Management System',
      blocks: makeHeroBlocks(
        'Warehouse Management, Reimagined',
        'Polluxa WMS delivers 99% fulfilment accuracy and real-time inventory visibility across all your warehouses.',
        { title: 'Real-time Stock Tracking', desc: 'Live inventory updates across all warehouses and channels.' },
        { title: 'Smart Putaway',            desc: 'AI-optimised putaway rules reduce handling time by up to 40%.' },
        { title: 'Multi-channel Fulfilment', desc: 'Fulfil orders from any channel — web, mobile, marketplace, and B2B.' },
        'Optimize your warehouse operations',
        '300+ warehouses run on Polluxa WMS.'
      ),
    },
    {
      uid: 'api::salescrm.salescrm',
      title: 'Polluxa CRM',
      slug: 'overview',
      description: 'Sales CRM with AI-powered lead scoring and deal acceleration.',
      seoTitle: 'Polluxa CRM — Close Deals 3x Faster',
      blocks: makeHeroBlocks(
        'Close Deals 3x Faster',
        'Polluxa CRM gives your sales team the intelligence and automation tools to win more deals, faster.',
        { title: 'AI Lead Scoring',       desc: 'Automatically rank and prioritise leads based on conversion probability.' },
        { title: 'Sales Pipeline',         desc: 'Visual pipeline with drag-and-drop deal management and forecast analytics.' },
        { title: 'Account Intelligence',   desc: '360-degree account view with relationship history, interactions, and insights.' },
        'Accelerate your sales team',
        '200+ sales teams use Polluxa CRM.'
      ),
    },
    {
      uid: 'api::logistic.logistic',
      title: 'Polluxa Logistics',
      slug: 'overview',
      description: 'Last-mile logistics platform with 400+ courier integrations.',
      seoTitle: 'Polluxa Logistics — Last-Mile Delivery at Scale',
      blocks: makeHeroBlocks(
        'Last-Mile Logistics at Scale',
        'Polluxa Logistics connects you to 400+ courier partners and delivers 98%+ SLA across every market.',
        { title: '400+ Carrier Integrations', desc: 'Connect to every major and regional carrier via one API.' },
        { title: 'Smart Routing Engine',      desc: 'Automatically select the best carrier based on cost, speed, and reliability.' },
        { title: 'Real-time Tracking',        desc: 'Live parcel tracking for you and your customers across all carriers.' },
        'Scale your delivery operations',
        '400+ logistics teams trust Polluxa.'
      ),
    },
    {
      uid: 'api::creator-commerce.creator-commerce',
      title: 'Polluxa Creator Commerce',
      slug: 'overview',
      description: 'Empower creators and influencers to build and scale their own commerce businesses.',
      seoTitle: 'Polluxa Creator Commerce — Commerce for Creators',
      blocks: makeHeroBlocks(
        'Commerce for Creators',
        'Give creators the tools to launch, manage, and grow their own e-commerce stores — powered by the Polluxa enterprise platform.',
        { title: 'Instant Storefront',    desc: 'Launch a branded storefront in minutes, no technical knowledge required.' },
        { title: 'Creator Analytics',     desc: 'Track sales, traffic, and audience engagement in one dashboard.' },
        { title: 'Brand Collaboration',   desc: 'Connect creators with brand partners to co-create and co-sell products.' },
        'Launch your creator store',
        '1,000+ creators sell with Polluxa.'
      ),
    },
    {
      uid: 'api::agentcommerce.agentcommerce',
      title: 'Polluxa Agentic Commerce',
      slug: 'overview',
      description: 'AI agents that autonomously manage your commerce operations 24/7.',
      seoTitle: 'Polluxa Agentic Commerce — AI-Powered Operations',
      blocks: makeHeroBlocks(
        'The Future of Commerce is Agentic',
        'Polluxa Agentic Commerce deploys AI agents that autonomously handle pricing, inventory, promotions, and customer service.',
        { title: 'Pricing Agent',          desc: 'AI agent that monitors competitors and adjusts prices in real time.' },
        { title: 'Inventory Agent',        desc: 'Autonomous inventory management that prevents stockouts and overstock.' },
        { title: 'Customer Service Agent', desc: 'AI agent that handles customer queries, returns, and order issues automatically.' },
        'Automate your commerce with AI',
        'Join enterprises running on Agentic Commerce.'
      ),
    },
    {
      uid: 'api::enterprisegpt.enterprisegpt',
      title: 'Polluxa EnterpriseGPT',
      slug: 'overview',
      description: 'Enterprise AI assistant for commercial operations and decision support.',
      seoTitle: 'Polluxa EnterpriseGPT — Your Enterprise AI Co-Pilot',
      blocks: makeHeroBlocks(
        'Your Enterprise AI Co-Pilot',
        'Polluxa EnterpriseGPT brings generative AI to every department — supply chain, sales, marketing, and operations.',
        { title: 'Document Intelligence', desc: 'Instantly analyse contracts, reports, and product documents.' },
        { title: 'Decision Support',      desc: 'AI-powered recommendations for pricing, sourcing, and demand planning.' },
        { title: 'Workflow Automation',   desc: 'Automate repetitive tasks across every business function.' },
        'Deploy enterprise AI today',
        'Trusted by enterprise teams across 38 countries.'
      ),
    },
    {
      uid: 'api::dlm.dlm',
      title: 'Polluxa DLM',
      slug: 'overview',
      description: 'Digital Lifecycle Management for product content and digital assets.',
      seoTitle: 'Polluxa DLM — Digital Lifecycle Management',
      blocks: makeHeroBlocks(
        'Digital Lifecycle Management',
        'Manage every digital asset — from product content to marketing materials — across the full product lifecycle.',
        { title: 'Digital Asset Management', desc: 'Centralised library for all product images, videos, and documents.' },
        { title: 'Content Distribution',     desc: 'Publish product content to every channel and marketplace automatically.' },
        { title: 'Version Control',          desc: 'Track every change to digital assets with full audit trails.' },
        'Manage your digital product content',
        'Join enterprises using Polluxa DLM.'
      ),
    },
    {
      uid: 'api::merchandise-financial-planning.merchandise-financial-planning',
      title: 'Polluxa Merchandise Financial Planning',
      slug: 'overview',
      description: 'Enterprise merchandise financial planning and open-to-buy management.',
      seoTitle: 'Polluxa MFP — Merchandise Financial Planning',
      blocks: makeHeroBlocks(
        'Merchandise Financial Planning',
        'Align buying decisions with financial goals. Polluxa MFP gives merchandise teams the data to plan, buy, and allocate at speed.',
        { title: 'Open-to-Buy Management', desc: 'Real-time OTB tracking against budget across all categories and seasons.' },
        { title: 'Seasonal Planning',      desc: 'Build pre-season and in-season plans with automated variance alerts.' },
        { title: 'Allocation Engine',      desc: 'Distribute stock to the right stores and channels based on demand signals.' },
        'Optimise your merchandise planning',
        'Join retailers using Polluxa MFP.'
      ),
    },
    {
      uid: 'api::retail.retail',
      title: 'Polluxa Retail',
      slug: 'overview',
      description: 'End-to-end retail management platform for enterprise brands.',
      seoTitle: 'Polluxa Retail — Enterprise Retail Management',
      blocks: makePageHeaderBlocks(
        'Polluxa Retail',
        'Enterprise Retail Management',
        'Polluxa Retail gives enterprise brands the tools to manage in-store, online, and wholesale operations from one platform.',
        { title: 'POS & Store Operations', desc: 'Unified point-of-sale and store management across all locations.' },
        { title: 'Inventory Management',   desc: 'Real-time stock visibility across stores, warehouses, and channels.' },
        { title: 'Customer Management',    desc: 'Loyalty, CRM, and customer data platform built for retail.' },
        'Transform your retail operations',
        'Join enterprise retailers on Polluxa.'
      ),
    },
    {
      uid: 'api::marketing.marketing',
      title: 'Polluxa Marketing',
      slug: 'overview',
      description: 'Marketing automation and campaign management for enterprise brands.',
      seoTitle: 'Polluxa Marketing — Enterprise Marketing Automation',
      blocks: makePageHeaderBlocks(
        'Polluxa Marketing',
        'Marketing at Enterprise Scale',
        'Polluxa Marketing delivers personalised campaigns across every channel — email, SMS, push, and social — driven by AI.',
        { title: 'Campaign Automation',     desc: 'Build and automate multi-channel campaigns with a visual workflow builder.' },
        { title: 'Audience Segmentation',   desc: 'Segment customers by behaviour, purchase history, and predicted intent.' },
        { title: 'AI Content Generation',   desc: 'Generate campaign copy, product descriptions, and subject lines with AI.' },
        'Transform your marketing',
        '150+ marketing teams run on Polluxa.'
      ),
    },
  ];

  let productPagesSeeded = 0;
  for (const p of productDefs) {
    const existing = await strapi.db.query(p.uid).count().catch(() => 0);
    if (existing > 0) continue;

    const data = {
      title: p.title,
      slug: p.slug,
      description: p.description,
      locale: 'en',
      blocks: p.blocks,
    };
    if (p.seoTitle) {
      data.seo = { metaTitle: p.seoTitle, metaDescription: p.description };
    }

    await publish(p.uid, data);
    productPagesSeeded++;
  }

  if (productPagesSeeded > 0) {
    strapi.log.info(`[seed-pages] Product pages ✓ (${productPagesSeeded} created)`);
  } else {
    strapi.log.info('[seed-pages] Product pages already exist — skipping.');
  }

  /* ════════════════════════════════════════════════════
     3. PAGES (home, about-us, contact-us, brands, privacy)
  ════════════════════════════════════════════════════ */
  const pageCount = await strapi.db.query('api::page.page').count();

  if (pageCount > 0) {
    strapi.log.info('[seed-pages] Pages already exist — skipping.');
    strapi.log.info('[seed-pages] ✅ Extended seed complete.');
    return;
  }

  strapi.log.info('[seed-pages] Seeding pages...');

  /* ── HOME ── */
  await publish('api::page.page', {
    shortName: 'Home',
    slug: 'home',
    locale: 'en',
    seo: {
      metaTitle: 'Polluxa — The Agentic Enterprise Platform',
      metaDescription:
        'Polluxa delivers CRM, Commerce, PLM, Logistics and WMS on one intelligent platform. 2000+ customers. 100% go-live rate. 38 countries.',
    },
    contentSections: [
      /* 1 — Hero */
      {
        __component: 'sections.hero',
        title: 'The Agentic Enterprise Platform',
        description:
          'Power your entire business with one unified platform: CRM, Commerce, PLM, Logistics, and WMS. 2,000+ global enterprises. 100% go-live rate.',
        subHeading: 'Next-generation enterprise software',
        bgColor: '#0A0A0F',
        buttons: [
          { url: '/contact-us',       text: 'Book a Demo',       type: 'primary',   newTab: false },
          { url: '/commerce/overview', text: 'Explore Platform',  type: 'secondary', newTab: false },
        ],
      },
      /* 2 — Clients marquee */
      {
        __component: 'sections.clients',
        heading: 'Trusted by global enterprises',
        subtitle: 'Join 2,000+ brands powered by Polluxa',
        enable: true,
        Client: [
          { title: 'Chalhoub Group',   url: '/brands', showLink: false },
          { title: 'Alshaya Group',    url: '/brands', showLink: false },
          { title: 'Apparel Group',    url: '/brands', showLink: false },
          { title: 'LuLu Group',       url: '/brands', showLink: false },
          { title: 'Al Futtaim',       url: '/brands', showLink: false },
          { title: 'Majid Al Futtaim', url: '/brands', showLink: false },
          { title: 'Landmark Group',   url: '/brands', showLink: false },
          { title: 'Splash Fashion',   url: '/brands', showLink: false },
          { title: 'Noon',             url: '/brands', showLink: false },
          { title: 'Max Fashion',      url: '/brands', showLink: false },
        ],
        Button: { url: '/brands', text: 'See All Customers', type: 'secondary', newTab: false },
      },
      /* 3 — Feature grid */
      {
        __component: 'sections.features',
        heading: 'One Platform. Every Solution.',
        description:
          'From product inception to last-mile delivery, Polluxa connects every team and process on one intelligent platform.',
        variant: 'card',
        columns: 'threeColumn',
        enable: true,
        feature: [
          { title: 'Sales CRM',         description: 'Close deals 3x faster with AI-powered lead scoring and pipeline management.', url: '/salescrm/overview',         showLink: true, text: 'Explore CRM' },
          { title: 'Commerce',          description: 'Unified B2B & B2C commerce platform for enterprise retailers worldwide.',     url: '/commerce/overview',          showLink: true, text: 'Explore Commerce' },
          { title: 'Creator Commerce',  description: 'Empower creators and influencers to launch their own commerce businesses.',   url: '/creator-commerce/overview',  showLink: true, text: 'Explore Creator' },
          { title: 'PLM',               description: 'Manage the full product lifecycle from concept to shelf across 38 countries.', url: '/plm/overview',               showLink: true, text: 'Explore PLM' },
          { title: 'Logistics',         description: 'Last-mile delivery with 400+ carrier integrations and 98%+ SLA.',             url: '/logistics/overview',         showLink: true, text: 'Explore Logistics' },
          { title: 'WMS',               description: 'Warehouse management with 99% fulfilment accuracy and real-time visibility.',  url: '/wms/overview',               showLink: true, text: 'Explore WMS' },
        ],
      },
      /* 4 — Stats */
      {
        __component: 'sections.homepage-statistics',
        title: 'Proven at Global Scale',
        description: '2,000+ enterprises trust Polluxa to run their most complex operations.',
        bgColor: '#0A0A0F',
        facts: [
          { title: '2000+', subtitle: 'Enterprise Customers' },
          { title: '38',    subtitle: 'Countries' },
          { title: '100%',  subtitle: 'Go-Live Rate' },
          { title: '5',     subtitle: 'Enterprise Products' },
        ],
        clients: [
          { title: 'Chalhoub Group' },
          { title: 'Alshaya' },
          { title: 'Apparel Group' },
          { title: 'LuLu Group' },
        ],
      },
      /* 5 — Services */
      {
        __component: 'sections.services',
        title: 'The Polluxa Platform',
        heading: 'Everything your enterprise needs',
        description:
          'One platform for every commercial operation — from product design to last-mile delivery.',
        variant: 'secondary',
        columns: 'threeColumn',
        service: [
          { name: 'Sales CRM',        subheader: 'Deal Acceleration', description: 'Manage leads, automate follow-ups, and close deals faster with AI.',         Button: { url: '/salescrm/overview',         text: 'Explore CRM',      type: 'primary', newTab: false } },
          { name: 'Commerce',         subheader: 'Omnichannel',        description: 'Unified B2B & B2C commerce for omnichannel enterprise retailers.',          Button: { url: '/commerce/overview',          text: 'Explore Commerce', type: 'primary', newTab: false } },
          { name: 'Creator Commerce', subheader: 'Creator Economy',    description: 'Give creators the tools to launch and scale their own stores.',             Button: { url: '/creator-commerce/overview',  text: 'Explore Creator',  type: 'primary', newTab: false } },
          { name: 'PLM',              subheader: 'Product Design',     description: 'Manage product lifecycle from concept to shelf across every market.',       Button: { url: '/plm/overview',               text: 'Explore PLM',      type: 'primary', newTab: false } },
          { name: 'Logistics',        subheader: 'Last-Mile Delivery', description: 'Last-mile delivery with 400+ carriers and 98%+ delivery SLA.',             Button: { url: '/logistics/overview',         text: 'Explore Logistics',type: 'primary', newTab: false } },
          { name: 'WMS',              subheader: 'Warehouse Ops',      description: '99% fulfilment accuracy and real-time inventory across all channels.',       Button: { url: '/wms/overview',               text: 'Explore WMS',      type: 'primary', newTab: false } },
        ],
      },
      /* 6 — Company */
      {
        __component: 'sections.company',
        title: 'Why leading enterprises choose Polluxa',
        description:
          'Built for global complexity. Designed for speed. Backed by a team with a 100% go-live rate across 2,000+ deployments.',
        enable: true,
        Bullets: [
          { Bullet: '2,000+ enterprise customers across 38 countries' },
          { Bullet: '100% go-live rate across all deployments' },
          { Bullet: 'Native AI and agentic automation built-in' },
          { Bullet: '24/7 enterprise support in 10+ languages' },
          { Bullet: 'Modular architecture — deploy one or all five products' },
        ],
      },
      /* 7 — Success Stories */
      {
        __component: 'sections.success-stories',
        title: 'How our customers win',
        description: 'Real outcomes from global enterprises who run on Polluxa.',
        StoryItem: [
          {
            title: 'Logistics transformation — 30% cost reduction',
            description:
              'A global retailer unified its logistics operation on Polluxa, cutting costs by 30% and improving delivery SLA from 84% to 98%.',
            url: '/case-studies/global-retailer-logistics',
            contenttype: 'caseStudy',
          },
          {
            title: '7x faster style entry with Polluxa PLM',
            description:
              'A fashion brand reduced style entry time from two weeks to 1.5 days — a 7x acceleration across the full product development cycle.',
            url: '/case-studies/plm-7x-faster-styles',
            contenttype: 'caseStudy',
          },
          {
            title: 'Beauty compliance simplified globally',
            description:
              'A multi-brand beauty company met strict global regulatory requirements across ingredients, formulation, and labelling using Polluxa PLM.',
            url: '/case-studies/beauty-brands-compliance',
            contenttype: 'caseStudy',
          },
        ],
      },
      /* 8 — Industries (relation to api::industry.industry) */
      {
        __component: 'sections.industries',
        title: 'Built for every industry',
        description:
          'Whether you are in fashion, retail, pharma, or logistics — Polluxa adapts to your industry requirements out of the box.',
        industries: { connect: industryIds },
      },
      /* 9 — Our Brands */
      {
        __component: 'sections.our-brands',
        title: 'Join 2,000+ global brands',
        description:
          'From enterprise giants to fast-growing brands, Polluxa powers every stage of commercial growth.',
        variant: 'primary',
        brands: [
          { title: 'Chalhoub Group',   url: '/brands', showLink: false },
          { title: 'Alshaya Group',    url: '/brands', showLink: false },
          { title: 'Apparel Group',    url: '/brands', showLink: false },
          { title: 'LuLu Group',       url: '/brands', showLink: false },
          { title: 'Al Futtaim',       url: '/brands', showLink: false },
          { title: 'Landmark Group',   url: '/brands', showLink: false },
          { title: 'Noon',             url: '/brands', showLink: false },
          { title: 'Splash Fashion',   url: '/brands', showLink: false },
        ],
      },
      /* 10 — Bottom CTA */
      {
        __component: 'sections.bottom-actions',
        title: 'Ready to transform your business?',
        description: 'Book a personalised demo and see the full Polluxa platform in action.',
        buttons: [
          { url: '/contact-us', text: 'Book a Demo',  type: 'primary',   newTab: false },
          { url: '/blogs',      text: 'Read Our Blog', type: 'secondary', newTab: false },
        ],
      },
    ],
  });

  /* ── ABOUT US ── */
  await publish('api::page.page', {
    shortName: 'About',
    slug: 'about-us',
    locale: 'en',
    seo: {
      metaTitle: 'About Polluxa — Our Story and Mission',
      metaDescription:
        'Learn about Polluxa, the enterprise software company powering 2,000+ businesses across 38 countries.',
    },
    contentSections: [
      {
        __component: 'sections.hero',
        title: 'We build software that moves the world',
        description:
          'Polluxa is a global enterprise software company headquartered in Dubai, UAE. We empower manufacturers, retailers, and distributors to operate at their full potential.',
        bgColor: '#0A0A0F',
        buttons: [
          { url: '/contact-us', text: 'Get in Touch', type: 'primary',   newTab: false },
          { url: '/careers',    text: "We're Hiring", type: 'secondary', newTab: false },
        ],
      },
      {
        __component: 'sections.company',
        title: 'Our mission',
        description:
          'We believe every enterprise deserves world-class software. Our mission is to make the most advanced commercial technology accessible to every business on the planet.',
        enable: true,
        Bullets: [
          { Bullet: 'Founded in 2012 in Dubai, UAE' },
          { Bullet: 'Offices in Dubai, Netherlands, Prague, and Toronto' },
          { Bullet: '2,000+ enterprise customers across 38 countries' },
          { Bullet: '500+ employees worldwide' },
          { Bullet: '100% go-live rate since inception' },
        ],
      },
      {
        __component: 'sections.homepage-statistics',
        title: 'Polluxa by the numbers',
        description: 'Over a decade of enterprise software excellence.',
        facts: [
          { title: '2000+', subtitle: 'Enterprise Customers' },
          { title: '38',    subtitle: 'Countries' },
          { title: '100%',  subtitle: 'Go-Live Rate' },
          { title: '500+',  subtitle: 'Employees' },
        ],
      },
      {
        __component: 'sections.bottom-actions',
        title: 'Join the Polluxa team',
        description: 'We are always looking for exceptional people to join our global mission.',
        buttons: [
          { url: '/careers',    text: 'View Open Roles', type: 'primary',   newTab: false },
          { url: '/contact-us', text: 'Contact Us',      type: 'secondary', newTab: false },
        ],
      },
    ],
  });

  /* ── CONTACT US ── */
  await publish('api::page.page', {
    shortName: 'Contact',
    slug: 'contact-us',
    locale: 'en',
    seo: {
      metaTitle: 'Contact Polluxa — Book a Demo',
      metaDescription:
        'Get in touch with the Polluxa team. Book a personalised demo or speak with an enterprise advisor.',
    },
    contentSections: [
      {
        __component: 'sections.hero',
        title: 'Talk to an enterprise advisor',
        description:
          'Book a personalised demo or reach out to the Polluxa team. We typically respond within one business day.',
        bgColor: '#0A0A0F',
        buttons: [
          { url: '#contact-form', text: 'Book a Demo', type: 'primary', newTab: false },
        ],
      },
      {
        __component: 'sections.internal-contact-form',
        title: 'Get in touch',
        ContactDetails: [
          { title: 'Dubai HQ',  description: 'Level 14, Boulevard Plaza Tower 1, Downtown Dubai, UAE', showLink: false },
          { title: 'Email',     description: 'hello@polluxa.com', url: 'mailto:hello@polluxa.com',     showLink: true, text: 'Send email' },
          { title: 'Phone',     description: '+971 4 000 0000',   url: 'tel:+97140000000',             showLink: true, text: 'Call us' },
        ],
      },
      {
        __component: 'sections.bottom-actions',
        title: 'Explore the platform first',
        description: 'Not ready for a demo? Read our case studies to see Polluxa in action.',
        buttons: [
          { url: '/case-studies', text: 'Read Case Studies', type: 'primary',   newTab: false },
          { url: '/blogs',        text: 'Visit Our Blog',    type: 'secondary', newTab: false },
        ],
      },
    ],
  });

  /* ── BRANDS ── */
  await publish('api::page.page', {
    shortName: 'Brands',
    slug: 'brands',
    locale: 'en',
    seo: {
      metaTitle: 'Polluxa Customers — 2,000+ Global Brands',
      metaDescription:
        'Discover how 2,000+ global enterprises across 38 countries use Polluxa to power their operations.',
    },
    contentSections: [
      {
        __component: 'sections.hero',
        title: '2,000+ brands trust Polluxa',
        description:
          'From global luxury conglomerates to fast-growing regional brands — Polluxa powers the operations of leading enterprises across 38 countries.',
        bgColor: '#0A0A0F',
        buttons: [
          { url: '/case-studies', text: 'Read Case Studies', type: 'primary',   newTab: false },
          { url: '/contact-us',   text: 'Book a Demo',       type: 'secondary', newTab: false },
        ],
      },
      {
        __component: 'sections.our-brands',
        title: 'Our customers',
        description: 'A snapshot of the global enterprise community built on Polluxa.',
        variant: 'primary',
        brands: [
          { title: 'Chalhoub Group',   url: '/brands', showLink: false },
          { title: 'Alshaya Group',    url: '/brands', showLink: false },
          { title: 'Apparel Group',    url: '/brands', showLink: false },
          { title: 'LuLu Group',       url: '/brands', showLink: false },
          { title: 'Al Futtaim',       url: '/brands', showLink: false },
          { title: 'Majid Al Futtaim', url: '/brands', showLink: false },
          { title: 'Landmark Group',   url: '/brands', showLink: false },
          { title: 'Max Fashion',      url: '/brands', showLink: false },
          { title: 'Noon',             url: '/brands', showLink: false },
          { title: 'Splash Fashion',   url: '/brands', showLink: false },
          { title: 'Babyshop',         url: '/brands', showLink: false },
          { title: 'Centrepoint',      url: '/brands', showLink: false },
        ],
      },
      {
        __component: 'sections.success-stories',
        title: 'Customer success stories',
        description: 'See how global enterprises achieve measurable results with Polluxa.',
        StoryItem: [
          {
            title: 'Logistics transformation — 30% cost reduction',
            description:
              'A global retailer unified its logistics operation on Polluxa, cutting costs by 30% and improving delivery SLA from 84% to 98%.',
            url: '/case-studies/global-retailer-logistics',
            contenttype: 'caseStudy',
          },
          {
            title: '7x faster style entry with Polluxa PLM',
            description:
              'A fashion brand reduced style entry time from two weeks to 1.5 days — a 7x acceleration across the full development cycle.',
            url: '/case-studies/plm-7x-faster-styles',
            contenttype: 'caseStudy',
          },
        ],
      },
      {
        __component: 'sections.bottom-actions',
        title: "Join the world's leading enterprises",
        description: 'Book a demo and see why 2,000+ brands choose Polluxa.',
        buttons: [
          { url: '/contact-us', text: 'Book a Demo', type: 'primary', newTab: false },
        ],
      },
    ],
  });

  /* ── PRIVACY POLICY ── */
  await publish('api::page.page', {
    shortName: 'Privacy',
    slug: 'privacy-policy',
    locale: 'en',
    seo: {
      metaTitle: 'Privacy Policy — Polluxa',
      metaDescription:
        'Read the Polluxa privacy policy to understand how we collect, use, and protect your personal data.',
    },
    contentSections: [
      {
        __component: 'sections.hero',
        title: 'Privacy Policy',
        description:
          'Last updated: January 2025. We are committed to protecting your privacy and handling your data with the highest standards of care.',
        bgColor: '#FFFFFF',
      },
    ],
  });

  strapi.log.info('[seed-pages] Pages ✓');
  strapi.log.info('[seed-pages] ✅ Extended seed complete.');
}

module.exports = { seedPages };
