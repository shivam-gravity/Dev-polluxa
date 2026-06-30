'use strict';

const NOW = new Date().toISOString();

async function seedMissing({ strapi }) {
  const publish = (uid, data) =>
    strapi.entityService.create(uid, { data: { ...data, publishedAt: NOW } });

  const seedIf = async (uid, label, entries) => {
    try {
      const count = await strapi.db.query(uid).count().catch(() => -1);
      if (count === -1) { strapi.log.warn(`[seed-missing] ${label}: collection not registered yet — restart Strapi.`); return; }
      if (count > 0)    { strapi.log.info(`[seed-missing] ${label}: already seeded — skipping.`); return; }
      for (const e of entries) await publish(uid, e);
      strapi.log.info(`[seed-missing] ${label} ✓ (${entries.length} entries)`);
    } catch (err) {
      strapi.log.error(`[seed-missing] ${label} failed: ${err.message}`);
    }
  };

  /* ── Agents ── */
  await seedIf('api::agent.agent', 'Agents', [
    { name: 'Mona Hubble',   role: 'SDR Agent',      icon: '🤖', sort_order: 1, description: 'Finds and qualifies leads 24/7 across LinkedIn and web signals. Surfaces high-intent prospects before your competitors see them.' },
    { name: 'Luna Kelper',   role: 'Research Agent',  icon: '🔭', sort_order: 2, description: 'Deep company and contact intelligence in seconds. Reads 10-Ks, funding rounds, and hiring signals to brief your reps.' },
    { name: 'Harry Voyager', role: 'Outreach Agent',  icon: '✉️', sort_order: 3, description: 'Runs multi-channel sequences across LinkedIn, email, and WhatsApp. A/B tests subject lines and CTAs automatically.' },
    { name: 'Ava Sputnik',   role: 'Data Agent',      icon: '💎', sort_order: 4, description: 'Triple-verifies contact data — email, mobile, title, firmographics. Refreshes your CRM every 24h with zero manual input.' },
    { name: 'Nova Kepler',   role: 'Pipeline Agent',  icon: '📡', sort_order: 5, description: 'Monitors deal stalls, nudges reps with next-best-actions, and escalates at-risk deals to managers automatically.' },
    { name: 'Atlas Prime',   role: 'Analytics Agent', icon: '📊', sort_order: 6, description: 'Synthesises pipeline health, forecast accuracy, and team performance into a weekly exec brief every Monday.' },
  ]);

  /* ── Agent Stats ── */
  await seedIf('api::agent-stat.agent-stat', 'Agent Stats', [
    { value: '85%',  label: 'Agent-sourced pipeline',   sort_order: 1 },
    { value: '5M+',  label: 'Verified contacts',         sort_order: 2 },
    { value: '42',   label: 'Intent data sources',       sort_order: 3 },
    { value: '<5s',  label: 'Cross-channel sync time',   sort_order: 4 },
  ]);

  /* ── Agent Channels ── */
  await seedIf('api::agent-channel.agent-channel', 'Agent Channels', [
    { icon: '💼', name: 'LinkedIn',  sort_order: 1, description: 'Connection requests, DMs, InMail and Social Selling — managed with multi-account safety limits and daily warmup schedules.' },
    { icon: '📧', name: 'Email',     sort_order: 2, description: 'Domain warmup, inbox rotation, spintax personalisation. 98.6% deliverability guaranteed across all sequences.' },
    { icon: '💬', name: 'WhatsApp',  sort_order: 3, description: 'Meta Business API integration. 72% open rate. Two-way conversation flows synced back to your CRM automatically.' },
    { icon: '📣', name: 'Meta Ads',  sort_order: 4, description: 'Lookalike audiences built from closed-won leads. Lead forms pipe directly into CRM for instant SDR assignment.' },
  ]);

  /* ── Agent Workflow Steps ── */
  await seedIf('api::agent-workflow-step.agent-workflow-step', 'Agent Workflow Steps', [
    { icon: '🔍', title: 'Discover',  sort_order: 1 },
    { icon: '✅', title: 'Qualify',   sort_order: 2 },
    { icon: '💎', title: 'Enrich',    sort_order: 3 },
    { icon: '✉️', title: 'Sequence',  sort_order: 4 },
    { icon: '📋', title: 'Brief',     sort_order: 5 },
    { icon: '🏆', title: 'Close',     sort_order: 6 },
  ]);

  /* ── Customer Logos ── */
  await seedIf('api::customer-logo.customer-logo', 'Customer Logos', [
    'Chalhoub Group','Alshaya Group','Apparel Group','LuLu Group','Al Futtaim',
    'Majid Al Futtaim','Landmark Group','Splash Fashion','Noon','Max Fashion',
    'Babyshop','Centrepoint','ALDO','H&M','New Balance',
    'Carrefour','Decathlon','SEPHORA','M&S','GAP',
  ].map((name, i) => ({ name, sort_order: i + 1 })));

  /* ── Products (Homepage grid) ── */
  await seedIf('api::product.product', 'Products', [
    { name: 'CRM',                          slug: 'crm',              sort_order: 1, description: 'Close deals 3x faster with AI-powered lead scoring, pipeline management, and autonomous SDR agents.' },
    { name: 'Commerce',                     slug: 'commerce',         sort_order: 2, description: 'Unified B2B & D2C commerce platform for enterprise retailers. Sell anywhere, fulfil from everywhere.' },
    { name: 'Creator Commerce',             slug: 'creator-commerce', sort_order: 3, description: 'Empower creators and influencers to launch, manage, and scale their own e-commerce brands.' },
    { name: 'Product Lifecycle Management', slug: 'plm',              sort_order: 4, description: 'Manage the full product lifecycle from concept to shelf across 38 countries. 700+ brands trust Polluxa PLM.' },
    { name: 'Logistics',                    slug: 'logistics',        sort_order: 5, description: 'Last-mile delivery with 400+ courier integrations and 98%+ SLA across every market.' },
    { name: 'Warehouse Management System',  slug: 'wms',              sort_order: 6, description: 'Warehouse management with 99% fulfilment accuracy and real-time inventory visibility across all channels.' },
  ]);

  /* ── Key Features (Homepage bento) ── */
  await seedIf('api::key-feature.key-feature', 'Key Features', [
    { icon_name: 'Bot',        sort_order: 1, title: 'Autonomous AI Agents',       description: 'Deploy named AI workers that find pipeline, qualify leads, and brief your reps 24/7 — without adding headcount.' },
    { icon_name: 'Link2',      sort_order: 2, title: 'One Connected Platform',     description: 'CRM, Commerce, PLM, Logistics and WMS all share the same data graph — no integrations, no sync delays.' },
    { icon_name: 'BarChart3',  sort_order: 3, title: 'Real-Time Analytics',        description: 'Live dashboards across every module. Forecast, pipeline, inventory, logistics — all in one view.' },
    { icon_name: 'Globe',      sort_order: 4, title: '38 Countries, One System',   description: 'Multi-language, multi-currency, multi-tax, and multi-warehouse — configured for every market you operate in.' },
    { icon_name: 'Zap',        sort_order: 5, title: '100% Go-Live Rate',          description: 'Every deployment goes live on time. Our structured onboarding has a perfect go-live record across 2,000+ customers.' },
    { icon_name: 'ShieldCheck',sort_order: 6, title: 'Enterprise Security',        description: 'ISO 27001, PCI DSS certified. Role-based access, SSO, audit logs, and data residency controls built in.' },
  ]);

  /* ── Success Stories ── */
  await seedIf('api::success-story.success-story', 'Success Stories', [
    { company: 'PharmEasy',   category: 'WMS',      sort_order: 1, gradient: 'linear-gradient(135deg,#0ea5e9,#2563eb)', description: 'Deployed Polluxa WMS across 12 fulfilment centres, achieving 99.2% inventory accuracy and cutting pick-pack time by 35%.' },
    { company: 'New Balance', category: 'PLM',      sort_order: 2, gradient: 'linear-gradient(135deg,#16a34a,#15803d)', description: 'Reduced style creation time from 3 weeks to 4 days with Polluxa PLM. Launched 40% more SKUs in the same season.' },
    { company: 'Allbirds',    category: 'Commerce', sort_order: 3, gradient: 'linear-gradient(135deg,#f59e0b,#d97706)', description: 'Unified D2C and wholesale on one platform, reducing order errors by 60% and growing digital revenue 29% YoY.' },
    { company: 'Pebble',      category: 'CRM',      sort_order: 4, gradient: 'linear-gradient(135deg,#7c3aed,#6d28d9)', description: 'Deployed Polluxa CRM with Mona Hubble SDR agent. Increased pipeline by 3x in 90 days. 85% of new leads are agent-sourced.' },
  ]);

  /* ── Promises ── */
  await seedIf('api::promise.promise', 'Promises', [
    { icon_name: 'Rocket',    sort_order: 1, title: 'Faster GTM',                        description: 'Pre-built templates, guided onboarding, and a 100% go-live record. Ship in days, not months.' },
    { icon_name: 'Building2', sort_order: 2, title: 'Enterprise-Ready from Day One',      description: 'ISO 27001, SOC 2, PCI DSS. Role-based access, SSO, audit logs, multi-tenant architecture.' },
    { icon_name: 'Users',     sort_order: 3, title: 'Scale with a Trusted SI Network',    description: '50+ certified implementation partners across 38 countries — from Accenture to regional boutiques.' },
    { icon_name: 'Plug',      sort_order: 4, title: 'Seamless Integrations & Migration',  description: 'Native connectors for SAP, Oracle, Shopify, Stripe, Razorpay and 100+ tools. Migration tools included.' },
  ]);

  /* ── Resources ── */
  await seedIf('api::resource.resource', 'Resources', [
    { slug: 'agentic-enterprise-ai-b2b-commerce', sort_order: 1, resource_type: 'Whitepaper', title: 'The Agentic Enterprise: AI in B2B Commerce',           description: 'How autonomous AI agents are reshaping B2B purchasing, fulfilment, and customer service at enterprise scale.' },
    { slug: 'pharmeasy-wms-case-study',           sort_order: 2, resource_type: 'Case Study', title: 'How PharmEasy Scaled to 99% Inventory Accuracy',        description: 'PharmEasy deployed Polluxa WMS across 12 fulfilment centres, cutting pick-pack time by 35% and eliminating stockouts.' },
    { slug: 'last-mile-logistics-playbook-d2c',   sort_order: 3, resource_type: 'Playbook',   title: 'The D2C Last-Mile Logistics Playbook',                  description: 'Reduce last-mile costs by 30% and improve delivery SLA from 84% to 98% using Polluxa Logistics and smart carrier selection.' },
    { slug: 'plm-fashion-industry-insights',      sort_order: 4, resource_type: 'Report',     title: 'PLM in Fashion: 2025 Industry Benchmark',               description: 'Annual benchmark covering time-to-market, compliance costs, and supplier collaboration metrics from 200+ fashion brands.' },
    { slug: 'polluxa-connect-2025-mumbai',        sort_order: 5, resource_type: 'Event',      title: 'Polluxa Connect 2025 — Mumbai',                         description: 'Join 500+ retail and fashion executives for a full day of product demos, keynotes, and networking in Mumbai.' },
    { slug: 'new-balance-plm-case-study',         sort_order: 6, resource_type: 'Case Study', title: 'New Balance: PLM in Practice',                          description: 'How New Balance reduced style creation time from 3 weeks to 4 days using Polluxa PLM across their global design teams.' },
  ]);

  /* ── Testimonials ── */
  await seedIf('api::testimonial.testimonial', 'Testimonials', [
    { sort_order: 1, initials: 'HT', name: 'Head of Technology',       company: 'Global Retail Brand',          quote: 'The fastest-moving, most agile technology available is Polluxa. We have found deep alignment between our operational goals and what Polluxa delivers. The pace of innovation is unmatched.' },
    { sort_order: 2, initials: 'VP', name: 'VP of Product Operations',  company: 'Leading Fashion Manufacturer', quote: 'Partnering with Polluxa has been transformative. The PLM system is robust, intuitive, and backed by a team that genuinely understands enterprise complexity. We went live on schedule and within budget.' },
    { sort_order: 3, initials: 'CD', name: 'Chief Digital Officer',     company: 'Regional Logistics Provider',  quote: "Polluxa's Logistics module gave us real-time visibility across 400+ courier partners. Delivery SLA improved from 84% to 98% in three months. The ROI was immediate and measurable." },
    { sort_order: 4, initials: 'DE', name: 'Director of E-commerce',    company: 'Apparel Group',                quote: 'We unified D2C and B2B on one platform. Order errors dropped 60%. Digital revenue grew 29% YoY. The AI agents handle cart recovery automatically — we used to need a whole team for that.' },
    { sort_order: 5, initials: 'CT', name: 'CTO',                       company: 'Luxury Beauty Brand',          quote: 'Ingredient compliance and regulatory submissions used to be a nightmare. With Polluxa PLM, our compliance team has everything in one place. Audit prep time dropped from weeks to hours.' },
    { sort_order: 6, initials: 'VS', name: 'VP of Supply Chain',        company: 'Multi-Category Retailer',     quote: 'The WMS implementation was the smoothest enterprise software go-live I have ever been part of. The Polluxa team delivered exactly what they promised, on time, every milestone.' },
  ]);

  /* ── Industry Stats ── */
  await seedIf('api::industry-stat.industry-stat', 'Industry Stats', [
    { icon: '👗', name: 'Fashion & Apparel',         brand_count: '420+', sort_order: 1 },
    { icon: '🏋', name: 'Outdoor & Sports',          brand_count: '180+', sort_order: 2 },
    { icon: '🛒', name: 'Multi-Category Retail',     brand_count: '240+', sort_order: 3 },
    { icon: '🛋', name: 'Home & Furniture',          brand_count: '140+', sort_order: 4 },
    { icon: '🍽', name: 'Food & Beverage',           brand_count: '310+', sort_order: 5 },
    { icon: '📦', name: 'Consumer Goods',            brand_count: '280+', sort_order: 6 },
    { icon: '💄', name: 'Cosmetics & Personal Care', brand_count: '190+', sort_order: 7 },
    { icon: '💻', name: 'Consumer Electronics',      brand_count: '160+', sort_order: 8 },
  ]);

  /* ── Partner Stats ── */
  await seedIf('api::partner-stat.partner-stat', 'Partner Stats', [
    { value: '50+',   label: 'Certified partners worldwide', sort_order: 1 },
    { value: '38',    label: 'Countries with partner cover', sort_order: 2 },
    { value: '2000+', label: 'Shared enterprise customers',  sort_order: 3 },
    { value: '100%',  label: 'Go-live rate with SI partners',sort_order: 4 },
  ]);

  /* ── Partner Types ── */
  await seedIf('api::partner-type.partner-type', 'Partner Types', [
    { icon: '🏢', sort_order: 1, name: 'System Integrators',        description: 'Global and regional SIs who implement, customise, and support Polluxa deployments for enterprise customers.' },
    { icon: '☁️', sort_order: 2, name: 'Cloud & Technology',        description: 'Cloud infrastructure and technology partners who power Polluxa deployments at enterprise scale globally.' },
    { icon: '🤝', sort_order: 3, name: 'Resellers & Distributors',  description: 'Regional partners who sell and distribute Polluxa across specific markets, verticals, and geographies.' },
    { icon: '🎓', sort_order: 4, name: 'Training & Enablement',     description: 'Specialised partners delivering Polluxa certification, training programs, and capability building for teams.' },
  ]);

  /* ── Pricing Plans ── */
  await seedIf('api::pricing-plan.pricing-plan', 'Pricing Plans', [
    { sort_order: 1, name: 'Starter',    price: 'Free',    period: 'forever',     highlight: false, badge: '',             tokens: '1,000/mo',   contacts: '500',       cta: 'Get started free', href: 'https://sales.polluxa.com/', is_internal: false,
      features: ['CRM up to 500 contacts', 'LinkedIn agent (limited)', 'Email sequences (50/mo)', 'Basic pipeline', '1 user seat'] },
    { sort_order: 2, name: 'Growth',     price: '$49',     period: 'per seat/mo', highlight: true,  badge: 'Most popular',  tokens: '10,000/mo',  contacts: '10,000',    cta: 'Start free trial', href: 'https://sales.polluxa.com/', is_internal: false,
      features: ['Unlimited CRM contacts', 'Mona Hubble SDR agent', 'All 4 outreach channels', 'AI lead scoring', 'Signal aggregation', '5 user seats'] },
    { sort_order: 3, name: 'Business',   price: '$149',    period: 'per seat/mo', highlight: false, badge: '',             tokens: '50,000/mo',  contacts: 'Unlimited', cta: 'Start free trial', href: 'https://sales.polluxa.com/', is_internal: false,
      features: ['Everything in Growth', 'All 6 named agents', 'Custom AI workflows', 'Advanced analytics', 'Priority support', 'Unlimited seats'] },
    { sort_order: 4, name: 'Enterprise', price: 'Custom',  period: 'annual',      highlight: false, badge: 'White-glove',  tokens: 'Unlimited',  contacts: 'Unlimited', cta: 'Talk to sales',    href: '/contact',                  is_internal: true,
      features: ['Everything in Business', 'Dedicated success manager', 'Custom SLA', 'SSO & SCIM', 'On-premise option', 'Custom integrations'] },
  ]);

  /* ── Token Packages ── */
  await seedIf('api::token-package.token-package', 'Token Packages', [
    { sort_order: 1, name: '10,000 tokens',    price: '$9'   },
    { sort_order: 2, name: '50,000 tokens',    price: '$39'  },
    { sort_order: 3, name: '200,000 tokens',   price: '$129' },
    { sort_order: 4, name: '1,000,000 tokens', price: '$499' },
  ]);

  /* ── Job Benefits ── */
  await seedIf('api::job-benefit.job-benefit', 'Job Benefits', [
    { icon: '🌍', sort_order: 1, title: 'Remote-first culture',      description: 'Work from anywhere. We have team members across 15 countries and counting.' },
    { icon: '💰', sort_order: 2, title: 'Competitive compensation',   description: 'Market-leading salary, performance bonuses, and equity for senior roles.' },
    { icon: '📈', sort_order: 3, title: 'Career acceleration',       description: 'Fast-moving company with global scope. We promote from within and invest in your growth.' },
    { icon: '🏥', sort_order: 4, title: 'Health & wellness',         description: 'Comprehensive health insurance for you and your family. Mental health support included.' },
    { icon: '🎓', sort_order: 5, title: 'Learning & development',    description: '$2,000 annual L&D budget for courses, conferences, and certifications.' },
    { icon: '🚀', sort_order: 6, title: 'Mission that matters',      description: 'Build software used by 2,000+ enterprises across 38 countries. Your work has real impact.' },
  ]);

  /* ── Blog Categories ── */
  await seedIf('api::blog-category.blog-category', 'Blog Categories', [
    { name: 'PLM',        sort_order: 1 },
    { name: 'Commerce',   sort_order: 2 },
    { name: 'Logistics',  sort_order: 3 },
    { name: 'CRM',        sort_order: 4 },
    { name: 'WMS',        sort_order: 5 },
    { name: 'Technology', sort_order: 6 },
    { name: 'Innovation', sort_order: 7 },
    { name: 'Events',     sort_order: 8 },
  ]);

  strapi.log.info('[seed-missing] ✅ All missing content seeded.');
}

module.exports = { seedMissing };
