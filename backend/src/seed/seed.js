'use strict';

const NOW = new Date().toISOString();

/* ═══════════════════════════════════════════════════════
   SEED  — called from bootstrap, skips if data exists
═══════════════════════════════════════════════════════ */
async function seed({ strapi }) {
  /* helpers scoped to this call */
  const publish = (uid, data) =>
    strapi.entityService.create(uid, {
      data: { ...data, publishedAt: NOW },
    });

  const simple = (uid, data) =>
    strapi.entityService.create(uid, { data });

  const upsertSingle = async (uid, data) => {
    const found = await strapi.db.query(uid).findOne({}).catch(() => null);
    if (found) {
      return strapi.entityService.update(uid, found.id, { data });
    }
    return strapi.entityService.create(uid, { data });
  };

  /* guard: only seed once */
  const count = await strapi.db.query('api::article.article').count();
  if (count > 0) {
    strapi.log.info('[seed] Already seeded — skipping.');
    return;
  }
  strapi.log.info('[seed] Starting database seed…');

  /* ═══ 1. CATEGORIES ════════════════════════════════ */
  const catDefs = [
    { name: 'PLM',        slug: 'plm' },
    { name: 'Commerce',   slug: 'commerce' },
    { name: 'Logistics',  slug: 'logistics' },
    { name: 'CRM',        slug: 'crm' },
    { name: 'WMS',        slug: 'wms' },
    { name: 'Technology', slug: 'technology' },
    { name: 'Innovation', slug: 'innovation' },
    { name: 'Events',     slug: 'events' },
  ];
  const cats = {};
  for (const c of catDefs) {
    const e = await simple('api::category.category', {
      name: c.name, slug: c.slug,
      description: `Articles about ${c.name}`,
      locale: 'en',
    });
    cats[c.slug] = e.id;
  }
  strapi.log.info('[seed] Categories ✓');

  /* ═══ 2. AUTHORS ════════════════════════════════════ */
  const authorDefs = [
    { name: 'Polluxa Team',    email: 'team@polluxa.com' },
    { name: 'Sarah Johnson',   email: 'sarah@polluxa.com' },
    { name: 'Ahmed Al-Rashid', email: 'ahmed@polluxa.com' },
    { name: 'David Chen',      email: 'david@polluxa.com' },
    { name: 'Priya Sharma',    email: 'priya@polluxa.com' },
  ];
  const authors = {};
  for (const a of authorDefs) {
    const e = await simple('api::author.author', { ...a, locale: 'en' });
    authors[a.email] = e.id;
  }
  strapi.log.info('[seed] Authors ✓');

  /* ═══ 3. JOB TYPES ══════════════════════════════════ */
  const jtDefs = [
    { name: 'Full-time', slug: 'full-time' },
    { name: 'Part-time', slug: 'part-time' },
    { name: 'Remote',    slug: 'remote' },
    { name: 'Contract',  slug: 'contract' },
  ];
  const jobTypes = {};
  for (const jt of jtDefs) {
    const e = await publish('api::job-type.job-type', {
      name: jt.name, slug: jt.slug,
      description: `${jt.name} position`,
      locale: 'en',
    });
    jobTypes[jt.slug] = e.id;
  }
  strapi.log.info('[seed] Job types ✓');

  /* ═══ 4. ARTICLES ════════════════════════════════════ */
  const articleDefs = [
    { title: 'Polluxa PLM – The Industry Benchmark for a Digitally Driven Supply Chain',                         cat: 'plm',        auth: 'team@polluxa.com' },
    { title: 'The Future of Commerce: Polluxa Commerce Anywhere Strategy for Global Retail',                     cat: 'commerce',   auth: 'sarah@polluxa.com' },
    { title: 'Polluxa PLM for Cosmetics Industry: Meeting Regulatory Demands with Ease',                         cat: 'plm',        auth: 'ahmed@polluxa.com' },
    { title: 'How Agentic AI Is Transforming Enterprise Operations in 2025',                                     cat: 'technology', auth: 'david@polluxa.com' },
    { title: 'Last-Mile Delivery Innovation: How Polluxa Logistics Cuts Costs by 30%',                          cat: 'logistics',  auth: 'priya@polluxa.com' },
    { title: 'Building a Unified Commerce Platform: Lessons from 2,000+ Enterprise Deployments',                cat: 'commerce',   auth: 'team@polluxa.com' },
    { title: 'PLM Best Practices for Fashion Brands Scaling into New Markets',                                   cat: 'plm',        auth: 'sarah@polluxa.com' },
    { title: 'The Rise of Creator Commerce: Empowering Influencers with Enterprise-Grade Tools',                 cat: 'commerce',   auth: 'ahmed@polluxa.com' },
    { title: 'Warehouse Automation in 2025: How WMS Drives 99% Fulfilment Accuracy',                            cat: 'wms',        auth: 'david@polluxa.com' },
    { title: 'Why Saudi Brands Are Choosing Polluxa for Digital Transformation',                                 cat: 'technology', auth: 'priya@polluxa.com' },
    { title: 'Polluxa CRM: Closing Deals 3× Faster with AI-Powered Lead Scoring',                               cat: 'crm',        auth: 'team@polluxa.com' },
    { title: 'Multi-Currency Commerce: Expanding into 38 Countries Without the Headaches',                      cat: 'commerce',   auth: 'sarah@polluxa.com' },
    { title: 'The Role of PLM in Pharmaceutical Regulatory Compliance',                                          cat: 'plm',        auth: 'ahmed@polluxa.com' },
    { title: 'How Polluxa Achieved a 100% Go-Live Rate Across 2,000+ Deployments',                              cat: 'innovation', auth: 'david@polluxa.com' },
    { title: 'Sustainability and PLM: Embedding Eco-Friendly Practices into Product Development',                cat: 'plm',        auth: 'priya@polluxa.com' },
    { title: "From GITEX to NRF: Polluxa's Global Presence in 2025",                                           cat: 'events',     auth: 'team@polluxa.com' },
    { title: 'Headless Commerce Architecture: The Backbone of Omnichannel Retail Success',                       cat: 'commerce',   auth: 'sarah@polluxa.com' },
    { title: 'Fragrance and Beauty Compliance: How PLM Simplifies Ingredient Regulation',                        cat: 'plm',        auth: 'ahmed@polluxa.com' },
    { title: 'Polluxa WMS: Real-Time Inventory Visibility Across All Sales Channels',                            cat: 'wms',        auth: 'david@polluxa.com' },
    { title: 'What is Agentic Commerce and Why Every Enterprise Needs It Now',                                   cat: 'commerce',   auth: 'priya@polluxa.com' },
    { title: 'Digital Transformation in PLM: From Legacy Systems to Intelligent PLM',                           cat: 'plm',        auth: 'team@polluxa.com' },
    { title: 'How Polluxa Partners Are Driving Innovation Across 38 Countries',                                  cat: 'innovation', auth: 'sarah@polluxa.com' },
  ];
  for (const a of articleDefs) {
    const slugStr = a.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    await publish('api::article.article', {
      title: a.title,
      slug: slugStr,
      description: `Polluxa insights on ${a.cat.toUpperCase()} — real strategies and enterprise outcomes for global business leaders.`,
      category: cats[a.cat] ? { connect: [cats[a.cat]] } : undefined,
      authorsBio: authors[a.auth] ? { connect: [authors[a.auth]] } : undefined,
      locale: 'en',
    });
  }
  strapi.log.info('[seed] Articles ✓');

  /* ═══ 5. CAREERS ════════════════════════════════════ */
  const careerDefs = [
    { title: 'Associate HR',               slug: 'associate-hr',               location: 'Dubai, UAE',          level: 'Entry Level', jt: 'full-time', desc: "Support recruitment, onboarding, and employee engagement across Polluxa's MENA operations. You will work closely with HR managers and play a key role in building our team." },
    { title: 'Director of Sales',          slug: 'director-of-sales',          location: 'Dubai, UAE',          level: 'Senior',      jt: 'full-time', desc: 'Lead enterprise sales in the GCC and MENA region. Own the full sales cycle for large accounts, build C-level relationships, and close complex multi-module deals.' },
    { title: 'Digital Marketing Manager',  slug: 'digital-marketing-manager',  location: 'Netherlands, Europe', level: 'Mid Level',   jt: 'full-time', desc: 'Drive Polluxa digital marketing strategy across SEO, SEM, social, and content. Own pipeline-generating campaigns and grow our brand across European markets.' },
    { title: 'Business Strategy Analyst',  slug: 'business-strategy-analyst',  location: 'Prague, Czech Republic', level: 'Mid Level', jt: 'full-time', desc: 'Research market opportunities, build business cases, and support executive decision-making on product-market fit and expansion strategy.' },
    { title: 'Business Development Manager', slug: 'business-development-manager', location: 'Toronto, Canada', level: 'Senior',     jt: 'full-time', desc: "Expand Polluxa's partner and customer ecosystem across North America. Identify opportunities, manage partnerships, and represent Polluxa at industry events." },
  ];
  for (const c of careerDefs) {
    await publish('api::career.career', {
      title: c.title, slug: c.slug, location: c.location, level: c.level,
      description: c.desc,
      job_types: jobTypes[c.jt] ? { connect: [jobTypes[c.jt]] } : undefined,
      locale: 'en',
    });
  }
  strapi.log.info('[seed] Careers ✓');

  /* ═══ 6. EVENTS ══════════════════════════════════════ */
  const eventDefs = [
    { title: 'Global AI Show – Riyadh 2026',      slug: 'global-ai-show-riyadh-2026',     loc: 'Riyadh, Saudi Arabia',  start: '2026-06-28T09:00:00.000Z', end: '2026-06-29T18:00:00.000Z', desc: 'The largest AI conference in the Middle East, 10,000+ leaders and innovators. Polluxa showcases Agentic Commerce and AI-powered PLM.' },
    { title: 'Online Retailer – Sydney 2026',      slug: 'online-retailer-sydney-2026',    loc: 'Sydney, Australia',      start: '2026-07-21T09:00:00.000Z', end: '2026-07-22T17:00:00.000Z', desc: "Australia's premier e-commerce event. Visit the Polluxa booth to see our Commerce platform powering next-gen retail across APAC." },
    { title: 'Seamless Saudi Arabia 2026',         slug: 'seamless-saudi-arabia-2026',     loc: 'Riyadh, Saudi Arabia',  start: '2026-11-08T09:00:00.000Z', end: '2026-11-09T18:00:00.000Z', desc: 'Leading fintech, e-commerce and retail event in Saudi Arabia. Polluxa presents B2B commerce and last-mile logistics innovations.' },
    { title: 'GITEX Global 2026',                  slug: 'gitex-global-2026',              loc: 'Dubai, UAE',             start: '2026-12-06T09:00:00.000Z', end: '2026-12-10T18:00:00.000Z', desc: "The world's largest tech event. Polluxa unveils its enterprise AI roadmap and demos the next generation Agentic Enterprise Platform." },
    { title: 'Seamless Middle East 2026',          slug: 'seamless-me-2026',               loc: 'Dubai, UAE',             start: '2026-04-08T09:00:00.000Z', end: '2026-04-09T18:00:00.000Z', desc: 'Polluxa showcased its full suite at Seamless ME, demonstrating Commerce, Logistics, and CRM integrations live to 12,000+ attendees.' },
    { title: 'LEAP 2026',                          slug: 'leap-2026',                      loc: 'Riyadh, Saudi Arabia',  start: '2026-02-10T09:00:00.000Z', end: '2026-02-12T18:00:00.000Z', desc: "Saudi Arabia's flagship tech conference. Polluxa announced new Agentic Commerce features and welcomed 50+ new enterprise customers." },
    { title: 'eTail Asia 2026',                    slug: 'etail-asia-2026',                loc: 'Singapore',              start: '2026-03-18T09:00:00.000Z', end: '2026-03-19T17:00:00.000Z', desc: 'Polluxa joined 1,500+ retail executives at eTail Asia to discuss omnichannel commerce and supply chain intelligence in Southeast Asia.' },
    { title: "NRF 2026: Retail's Big Show",        slug: 'nrf-2026',                       loc: 'New York, USA',           start: '2026-01-11T09:00:00.000Z', end: '2026-01-13T18:00:00.000Z', desc: 'At NRF 2026, Polluxa demonstrated how its unified platform accelerates digital transformation for global retailers.' },
    { title: 'GITEX Global 2025',                  slug: 'gitex-global-2025',              loc: 'Dubai, UAE',             start: '2025-10-13T09:00:00.000Z', end: '2025-10-17T18:00:00.000Z', desc: 'Polluxa was recognised as one of the Top 10 Enterprise Software Platforms at GITEX 2025, generating 300+ qualified enterprise leads.' },
    { title: 'Polluxa World 2025',                 slug: 'polluxa-world-2025',             loc: 'Dubai, UAE',             start: '2025-09-15T09:00:00.000Z', end: '2025-09-16T18:00:00.000Z', desc: 'Our flagship annual conference brought together 2,000+ customers, partners, and prospects to preview the future of Polluxa.' },
    { title: 'Seamless Saudi Arabia 2025',         slug: 'seamless-saudi-arabia-2025',     loc: 'Riyadh, Saudi Arabia',  start: '2025-11-10T09:00:00.000Z', end: '2025-11-11T18:00:00.000Z', desc: 'Polluxa introduced its Agentic Commerce platform, announcing partnerships with five leading Saudi retailers.' },
    { title: 'NRF 2025',                           slug: 'nrf-2025',                       loc: 'New York, USA',           start: '2025-01-12T09:00:00.000Z', end: '2025-01-14T18:00:00.000Z', desc: 'Polluxa made its NRF debut, showcasing PLM and Commerce solutions to North American enterprise retailers and manufacturers.' },
    { title: 'Global AI Show Dubai 2025',          slug: 'global-ai-show-dubai-2025',      loc: 'Dubai, UAE',             start: '2025-04-28T09:00:00.000Z', end: '2025-04-29T18:00:00.000Z', desc: 'Polluxa delivered a keynote on "AI in Supply Chain: From Automation to Agentic Reasoning" to 5,000+ enterprise decision-makers.' },
    { title: 'Seamless Middle East 2025',          slug: 'seamless-me-2025',               loc: 'Dubai, UAE',             start: '2025-04-14T09:00:00.000Z', end: '2025-04-15T18:00:00.000Z', desc: 'Polluxa returned for its fourth consecutive year, unveiling its revamped B2B Commerce and Creator Commerce platforms.' },
    { title: 'LEAP 2025',                          slug: 'leap-2025',                      loc: 'Riyadh, Saudi Arabia',  start: '2025-02-09T09:00:00.000Z', end: '2025-02-11T18:00:00.000Z', desc: 'Polluxa was recognised as one of the most innovative enterprise tech companies, securing three Vision 2030-aligned partnerships.' },
    { title: 'Web Summit 2024',                    slug: 'web-summit-2024',                loc: 'Lisbon, Portugal',       start: '2024-11-11T09:00:00.000Z', end: '2024-11-14T18:00:00.000Z', desc: 'Polluxa joined 70,000+ tech leaders at Web Summit 2024 to discuss the intersection of AI, commerce, and enterprise software.' },
  ];
  for (const e of eventDefs) {
    await publish('api::event.event', {
      title: e.title, slug: e.slug, location: e.loc, description: e.desc,
      StartDate: e.start, EndDate: e.end, locale: 'en',
    });
  }
  strapi.log.info('[seed] Events ✓');

  /* ═══ 7. CASE STUDIES ════════════════════════════════ */
  const csDefs = [
    { title: 'How a Global Retailer Streamlined Its Logistics with Polluxa Intelligence',               slug: 'global-retailer-logistics',       desc: 'A global retailer unified their entire logistics operation on Polluxa, cutting costs by 30% and improving delivery SLA from 84% to 98%.' },
    { title: 'How Polluxa PLM Simplified Product Lifecycle Management for a Leading GCC Retail Brand',  slug: 'plm-retail-brand-gcc',            desc: 'A fast-scaling GCC lifestyle retailer eliminated SKU chaos and cross-departmental silos with Polluxa PLM, achieving 40% faster time-to-market.' },
    { title: 'How Polluxa PLM Transformed Product Lifecycle Management in Manufacturing',               slug: 'plm-manufacturing-riyadh',        desc: 'A mid-sized automotive parts supplier in Riyadh reduced engineering change cycles by 60% after deploying Polluxa PLM.' },
    { title: 'Global & Homegrown Beauty Brands Company Streamlines Compliance with Polluxa',            slug: 'beauty-brands-compliance',        desc: 'A multi-brand beauty company met strict global regulatory guidelines across ingredients, formulation, and labelling using Polluxa PLM.' },
    { title: 'Polluxa PLM: Streamlining Technical Errors and Processes',                                slug: 'plm-streamlining-errors',         desc: 'Polluxa PLM eliminated systemic data entry errors and disjointed approval workflows, reducing rework costs by 45%.' },
    { title: 'Increases Accuracy and Speed with Polluxa PLM',                                           slug: 'plm-accuracy-and-speed',          desc: 'A multi-retail brand dramatically reduced data entry errors and accelerated time-to-market using Polluxa PLM.' },
    { title: 'Produces Styles 7× Faster with Polluxa PLM',                                              slug: 'plm-7x-faster-styles',            desc: 'A fashion brand reduced style entry time from two weeks to 1.5 days — a 7× acceleration across the entire product development cycle.' },
    { title: 'Global Fragrance Company Streamlines Compliance with Polluxa',                            slug: 'fragrance-company-compliance',    desc: 'A global perfume manufacturer met strict international regulatory guidelines across ingredients, labelling, and supply chain documentation.' },
    { title: 'The Impact of PLM in the Pharmaceutical Industry',                                        slug: 'plm-pharmaceutical-industry',     desc: 'A leading pharma company used Polluxa PLM to reduce compliance burden while accelerating R&D cycles and improving audit readiness.' },
  ];
  for (const cs of csDefs) {
    await publish('api::case-study.case-study', {
      title: cs.title, slug: cs.slug, description: cs.desc, locale: 'en',
    });
  }
  strapi.log.info('[seed] Case studies ✓');

  /* ═══ 8. PARTNERS ════════════════════════════════════ */
  const partnerDefs = [
    { title: 'Accenture',         slug: 'accenture',        desc: 'Global professional services and Polluxa Platinum Implementation Partner.' },
    { title: 'Deloitte Digital',  slug: 'deloitte-digital', desc: 'Leading digital transformation consultancy and certified Polluxa Enterprise Partner.' },
    { title: 'PwC',               slug: 'pwc',               desc: 'Global advisory firm specialising in digital and supply chain transformations.' },
    { title: 'IBM Consulting',    slug: 'ibm-consulting',    desc: 'IBM consulting drives enterprise PLM and commerce deployments powered by Polluxa.' },
    { title: 'Tata Consultancy',  slug: 'tata-consultancy',  desc: 'Leading global IT services company and certified Polluxa partner across APAC.' },
    { title: 'Wipro',             slug: 'wipro',             desc: 'Technology services leader delivering Polluxa-powered transformation across retail and manufacturing.' },
    { title: 'Infosys',           slug: 'infosys',           desc: 'Digital services firm certified for Polluxa PLM and commerce solutions.' },
    { title: 'Capgemini',         slug: 'capgemini',         desc: 'Global leader delivering Polluxa Commerce and PLM at scale.' },
    { title: 'AWS',               slug: 'aws',               desc: 'Amazon Web Services — cloud infrastructure partner for Polluxa global deployments.' },
    { title: 'Microsoft Azure',   slug: 'microsoft-azure',   desc: 'Microsoft Azure cloud partner enabling Polluxa enterprise-grade scalability.' },
  ];
  for (const p of partnerDefs) {
    await publish('api::partner.partner', {
      title: p.title, slug: p.slug, description: p.desc, locale: 'en',
    });
  }
  strapi.log.info('[seed] Partners ✓');

  /* ═══ 9. NAVIGATION ENTRIES ══════════════════════════ */
  const navProducts = await publish('api::navigation.navigation', {
    slug: 'products-nav', title: 'Products', heading: 'Our Software Suite',
    description: 'CRM, Commerce, PLM, Logistics and WMS on one intelligent platform.',
    locale: 'en',
    navlinks: [
      { title: 'CRM',              url: '/salescrm/overview',        subtitle: 'SaaS-based Sales CRM',          subLinks: [{ name: 'CRM Overview',       url: '/salescrm/overview',        description: 'Manage leads and close deals faster.' }] },
      { title: 'Commerce',         url: '/commerce/overview',         subtitle: 'B2B & B2C Commerce',            subLinks: [{ name: 'Commerce Overview',  url: '/commerce/overview',         description: 'Unified commerce platform.' }] },
      { title: 'Creator Commerce', url: '/creator-commerce/overview', subtitle: 'Empower creators to sell',      subLinks: [{ name: 'Creator Overview',   url: '/creator-commerce/overview', description: 'Launch e-commerce as a creator.' }] },
      { title: 'PLM',              url: '/plm/overview',              subtitle: 'Product Lifecycle Management',  subLinks: [{ name: 'PLM Overview',       url: '/plm/overview',              description: 'Reduce costs and time to market.' }] },
      { title: 'Logistics',        url: '/logistics/overview',        subtitle: 'Last-mile delivery',            subLinks: [{ name: 'Logistics Overview', url: '/logistics/overview',        description: 'Last-mile delivery network.' }] },
      { title: 'WMS',              url: '/wms/overview',              subtitle: 'Warehouse Management System',   subLinks: [{ name: 'WMS Overview',       url: '/wms/overview',              description: 'Streamline warehouse operations.' }] },
    ],
  });

  const navCustomers = await publish('api::navigation.navigation', {
    slug: 'customers-nav', title: 'Customers', heading: 'Customers',
    description: 'Discover how global brands succeed with Polluxa.', locale: 'en',
    navlinks: [
      { title: 'All Customers', url: '/brands',       subtitle: 'See all 2000+ customers',     subLinks: [] },
      { title: 'Case Studies',  url: '/case-studies', subtitle: 'Real results, real enterprises', subLinks: [] },
      { title: 'By Industry',   url: '/brands',       subtitle: 'Explore by vertical',          subLinks: [] },
    ],
  });

  const navPartners = await publish('api::navigation.navigation', {
    slug: 'partners-nav', title: 'Partners', heading: 'Ecosystem',
    description: 'Grow with Polluxa.', locale: 'en',
    navlinks: [
      { title: 'Partner Network',  url: '/partners/overview',          subtitle: '50+ certified partners', subLinks: [] },
      { title: 'Become a Partner', url: '/partners/become-a-partner',  subtitle: 'Join our ecosystem',      subLinks: [] },
    ],
  });

  const navCompany = await publish('api::navigation.navigation', {
    slug: 'company-nav', title: 'Company', heading: 'About Polluxa',
    description: 'Our story and mission.', locale: 'en',
    navlinks: [
      { title: 'About Us',   url: '/about-us',   subtitle: 'Our story and mission', subLinks: [] },
      { title: 'Careers',    url: '/careers',    subtitle: 'Join our global team',  subLinks: [] },
      { title: 'Blog',       url: '/blogs',      subtitle: 'Latest insights',       subLinks: [] },
      { title: 'Events',     url: '/events',     subtitle: 'Meet us worldwide',     subLinks: [] },
      { title: 'Contact Us', url: '/contact-us', subtitle: 'Get in touch',          subLinks: [] },
    ],
  });
  strapi.log.info('[seed] Navigation entries ✓');

  /* ═══ 10. MAIN MENU ══════════════════════════════════ */
  await upsertSingle('api::main-menu.main-menu', {
    publishedAt: NOW,
    locale: 'en',
    MainMenuItems: [
      {
        __component: 'menu.dropdown',
        title: 'Products',
        url: '#',
        description: 'Explore our full enterprise software suite.',
        navigations: { connect: [navProducts.id] },
        Button: { url: '/contact-us', text: 'Explore All', type: 'primary', newTab: false },
      },
      {
        __component: 'menu.dropdown',
        title: 'Customers',
        url: '#',
        description: 'Discover how global enterprises succeed with Polluxa.',
        navigations: { connect: [navCustomers.id] },
      },
      {
        __component: 'menu.dropdown',
        title: 'Partners',
        url: '#',
        description: 'Join our global ecosystem of partners.',
        navigations: { connect: [navPartners.id] },
      },
      {
        __component: 'menu.dropdown',
        title: 'Company',
        url: '#',
        description: 'Learn about Polluxa and our mission.',
        navigations: { connect: [navCompany.id] },
        Button: { url: '/careers', text: "We're Hiring", type: 'secondary', newTab: false },
      },
      {
        __component: 'menu.menu-button',
        title: 'Book a Demo',
        url: '/contact-us',
        type: 'primary',
      },
    ],
  });
  strapi.log.info('[seed] Main menu ✓');

  /* ═══ 11. GLOBAL (site settings) ════════════════════ */
  await upsertSingle('api::global.global', {
    locale: 'en',
    metadata: {
      metaTitle: 'Polluxa — The Agentic Enterprise Platform',
      metaDescription:
        'Polluxa delivers CRM, Commerce, PLM, Logistics and WMS on one intelligent platform. 2000+ customers. 100% go-live rate. 38 countries.',
    },
    notificationBanner: {
      type: 'info',
      heading: 'GITEX Global 2026 — Visit us at Stand D4!',
      text: 'Meet the Polluxa team at GITEX Global, Dubai, Dec 6–10, 2026.',
      show: true,
    },
    navbar: {
      links: [
        { url: '/salescrm/overview',        text: 'CRM',       newTab: false },
        { url: '/commerce/overview',         text: 'Commerce',  newTab: false },
        { url: '/plm/overview',              text: 'PLM',       newTab: false },
        { url: '/logistics/overview',        text: 'Logistics', newTab: false },
        { url: '/wms/overview',              text: 'WMS',       newTab: false },
        { url: '/brands',                    text: 'Customers', newTab: false },
        { url: '/partners/overview',         text: 'Partners',  newTab: false },
        { url: '/about-us',                  text: 'Company',   newTab: false },
      ],
      button: { url: '/contact-us', text: 'Contact Us', type: 'primary', newTab: false },
    },
    footer: {
      menuLinks: [
        { url: '/salescrm/overview',        text: 'CRM',                          newTab: false },
        { url: '/commerce/overview',         text: 'Commerce',                     newTab: false },
        { url: '/creator-commerce/overview', text: 'Creator Commerce',             newTab: false },
        { url: '/plm/overview',              text: 'Product Lifecycle Management', newTab: false },
        { url: '/logistics/overview',        text: 'Logistics',                    newTab: false },
        { url: '/wms/overview',              text: 'Warehouse Management',         newTab: false },
      ],
      legalLinks: [
        { url: '/privacy-policy',    text: 'Privacy Policy', newTab: false },
        { url: '/careers',           text: 'Careers',        newTab: false },
        { url: '/blogs',             text: 'Blog',           newTab: false },
        { url: '/events',            text: 'Events',         newTab: false },
        { url: '/case-studies',      text: 'Case Studies',   newTab: false },
        { url: '/about-us',          text: 'About Us',       newTab: false },
        { url: '/partners/overview', text: 'Partners',       newTab: false },
      ],
      socialLinks: [
        { url: 'https://www.linkedin.com/company/polluxa/', text: 'LinkedIn',  social: 'LINKEDIN',  newTab: true },
        { url: 'https://www.instagram.com/polluxa/',        text: 'Instagram', social: 'INSTAGRAM', newTab: true },
        { url: 'https://www.facebook.com/polluxa/',         text: 'Facebook',  social: 'FACEBOOK',  newTab: true },
      ],
      button: { url: '/contact-us', text: 'Book a Demo', type: 'primary', newTab: false },
      FooterMenu: [
        {
          Heading: 'Products', slug: 'products',
          FooterLinks: [
            { url: '/salescrm/overview',        text: 'CRM',                          newTab: false },
            { url: '/commerce/overview',         text: 'Commerce',                     newTab: false },
            { url: '/creator-commerce/overview', text: 'Creator Commerce',             newTab: false },
            { url: '/plm/overview',              text: 'PLM',                          newTab: false },
            { url: '/logistics/overview',        text: 'Logistics',                    newTab: false },
            { url: '/wms/overview',              text: 'WMS',                          newTab: false },
          ],
        },
        {
          Heading: 'Industries', slug: 'industries',
          FooterLinks: [
            { url: '/brands', text: 'Fashion & Apparel',           newTab: false },
            { url: '/brands', text: 'Outdoor & Sports',            newTab: false },
            { url: '/brands', text: 'Multi Category Retail',       newTab: false },
            { url: '/brands', text: 'Home & Furniture',            newTab: false },
            { url: '/brands', text: 'Food & Beverage',             newTab: false },
            { url: '/brands', text: 'Consumer Goods',              newTab: false },
            { url: '/brands', text: 'Cosmetics and Personal Care', newTab: false },
            { url: '/brands', text: 'Consumer Electronics',        newTab: false },
          ],
        },
        {
          Heading: 'Company', slug: 'company',
          FooterLinks: [
            { url: '/about-us',          text: 'About Us',   newTab: false },
            { url: '/careers',           text: 'Careers',    newTab: false },
            { url: '/blogs',             text: 'Blog',       newTab: false },
            { url: '/events',            text: 'Events',     newTab: false },
            { url: '/partners/overview', text: 'Partners',   newTab: false },
            { url: '/contact-us',        text: 'Contact Us', newTab: false },
          ],
        },
      ],
    },
    leadForm: {
      title: 'Stay in the loop',
      description: 'Get the latest Polluxa product news, enterprise insights, and event invitations.',
      emailPlaceholder: 'Enter your work email',
      submitButton: { text: 'Subscribe', type: 'primary' },
      location: 'footer',
    },
    testimonials: {
      title: 'What our clients say.',
      description: 'Trusted by 2,000+ enterprises across 38 countries.',
      Testimonial: [
        {
          authorName: 'Head of Technology',
          authorTitle: 'Global Retail Brand',
          paragraph: 'The fastest-moving, most agile technology available is Polluxa. We have found deep alignment between our operational goals and what Polluxa delivers.',
          text: 'Polluxa transformed how our teams collaborate across the supply chain.',
        },
        {
          authorName: 'VP of Product Operations',
          authorTitle: 'Leading Fashion Manufacturer',
          paragraph: 'Partnering with Polluxa has been transformative. The PLM system is robust, intuitive, and backed by a team that genuinely understands enterprise complexity.',
          text: 'We went live on schedule and within budget.',
        },
        {
          authorName: 'Chief Digital Officer',
          authorTitle: 'Regional Logistics Provider',
          paragraph: "Polluxa's Logistics module gave us real-time visibility across 400+ courier partners. Delivery SLA improved from 84% to 98% in three months.",
          text: 'The Polluxa team is incredibly responsive and always solution-focused.',
        },
      ],
    },
  });
  strapi.log.info('[seed] Global settings ✓');

  strapi.log.info('[seed] ✅ All done! Database seeding complete.');
}

module.exports = { seed };
