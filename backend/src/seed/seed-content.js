'use strict';

const NOW = new Date().toISOString();

/* ─────────────────────────────────────────────────────────────
   CRM PAGE DATA
───────────────────────────────────────────────────────────── */
const CRM_PAGE_DATA = {
  slug: 'overview',
  title: 'CRM',
  locale: 'en',
  hero_title: 'The complete agentic revenue platform',
  hero_subtitle: 'One workspace where agents and humans close together.',
  hero_description:
    'Unify your sales pipeline, outbound marketing, client communication, support tickets, data enrichment, and autonomous AI agents in one dashboard.',
  cta_primary_label: 'Get Agent CRM — Free',
  cta_primary_url: 'https://sales.polluxa.com/',
  cta_secondary_label: 'Book a live demo',
  cta_secondary_url: '/contact',
  metrics: [
    { type: 'counter', target: 85, suffix: '%',  label: 'Autonomous execution' },
    { type: 'text',    display: '<5s',            label: 'Cross-channel sync' },
    { type: 'counter', target: 5,  suffix: 'M+', label: 'Verified contacts' },
    { type: 'text',    display: 'any',            label: 'Workflow → agent' },
  ],
  capabilities: [
    {
      icon: '🔍',
      title: 'Find Lead',
      description: 'Natural-language prospecting across 5M+ verified contacts with live intent signals.',
      link_url: '/find-lead',
    },
    {
      icon: '📡',
      title: 'Signal Aggregation',
      description: '42 intent sources, deduped and ranked — hiring, funding, web visits, job changes.',
      link_url: '/signal-aggregation',
    },
    {
      icon: '💎',
      title: 'Contact Enrichment',
      description: 'Triple-verified emails, mobiles, titles and firmographics — refreshed every 24h.',
      link_url: '/contact-enrichment',
    },
    {
      icon: '💰',
      title: 'Funding Detection',
      description: 'Catch every Series-A through IPO within hours of announcement, ranked by ICP fit.',
      link_url: '/funding-detection',
    },
    {
      icon: '✉️',
      title: 'Outreach',
      description: 'Multi-channel sequences (email, WhatsApp, LinkedIn) with deliverability built in.',
      link_url: '/outreach',
    },
    {
      icon: '⚙️',
      title: 'AI Workflows',
      description: 'No-code workflow canvas to build your own agents and automations on top of Polluxa.',
      link_url: '/ai-workflows',
    },
  ],
  channels: [
    {
      badge: 'CONNECTION · DM · INMAIL · SOCIAL',
      title: 'LinkedIn Outreach',
      description:
        'The most effective LinkedIn engine on the market. Built with multi-account safety limits, automatic connection campaign warmups, and personalization that bypasses generic spam filters.',
      stats: [
        { value: '38%',  label: 'Accept rate' },
        { value: '14%',  label: 'Reply rate' },
        { value: '4.2×', label: 'vs SDR-only' },
      ],
      link_url: '/linkedin-outreach',
      is_featured: true,
      featured_label: 'Our home turf · #1 channel',
    },
    {
      badge: 'DELIVERABILITY',
      title: 'Email Outreach',
      description:
        'Inbox-aware sending, domain warm-up, spintax patterns, and AI personalization. Reach real directories with built-in multi-inbox rotations ensuring 98.6% deliverability.',
      stats: [],
      link_url: '/email-outreach',
      is_featured: false,
    },
    {
      badge: 'CONVERSATIONAL',
      title: 'WhatsApp',
      description:
        'Native Meta Business API integration. Direct templated blasts, automatic two-way opt-in flows, and CRM-synchronized conversations with 72% open and 22% reply rates.',
      stats: [],
      link_url: '/whatsapp',
      is_featured: false,
    },
    {
      badge: 'PAID · FB · IG · WA',
      title: 'Meta Ads',
      description:
        'Build lookalike lists directly from closed-won leads. Direct forms-to-CRM pipelines for instant SDR assignments, auto-attribution dashboard, and full-funnel ROI.',
      stats: [],
      link_url: '/meta-ads',
      is_featured: false,
    },
  ],
  modules: [
    {
      title: 'Agents',
      badge: '12 autonomous workers',
      badge_variant: 'success',
      description:
        'Always-on AI agents — Mona Hubble, Luna Kelper, Harry Voyager, Ava Sputnik and channel agents — that find pipeline, qualify leads and brief your reps autonomously.',
      link_label: 'Explore agents',
      link_url: '/agents',
      external: false,
    },
    {
      title: 'CRM',
      badge: 'Customer graph',
      badge_variant: 'default',
      description:
        'Leads, deals, tasks, contacts and accounts — unified on a single live canvas. Kanban pipelines, 360 lead views, smart reminders.',
      link_label: 'Open CRM',
      link_url: 'https://sales.polluxa.com/',
      external: true,
    },
    {
      title: 'Marketing',
      badge: 'Omnichannel campaigns',
      badge_variant: 'default',
      description:
        'Build journeys across WhatsApp, Email, Meta and Google. Native templates, drag-and-drop builder, AI-built segments and full-funnel attribution.',
      link_label: 'Plan campaigns',
      link_url: '/marketing',
      external: false,
    },
    {
      title: 'Sales',
      badge: 'Living pipeline',
      badge_variant: 'default',
      description:
        "Lead scoring, fair rotation, smart reminders and AI-drafted follow-ups. Accelerate every deal from 'new' to 'closed-won' with measurable lift.",
      link_label: 'Accelerate sales',
      link_url: '/sales',
      external: false,
    },
    {
      title: 'Data',
      badge: 'Verified · enriched',
      badge_variant: 'default',
      description:
        '5M+ contacts, 5M companies — triple-verified emails, mobiles, firmographics. Live enrichment, dedupe and master-data tools.',
      link_label: 'Explore data',
      link_url: '/data',
      external: false,
    },
    {
      title: 'Help Desk',
      badge: 'Conversational support',
      badge_variant: 'default',
      description:
        'Tickets, SLAs, knowledge base and AI deflection. Run customer support in the same workspace where you run sales.',
      link_label: 'Open help desk',
      link_url: '/helpdesk',
      external: false,
    },
  ],
  faq: [
    {
      question: 'What is Polluxa CRM?',
      answer: 'Polluxa CRM is an agentic revenue platform that unifies your sales pipeline, outbound marketing, client communication, support tickets, and data enrichment — all powered by autonomous AI agents.',
    },
    {
      question: 'How do the AI agents work?',
      answer: 'Polluxa AI agents run 24/7 to find pipeline, qualify leads, and brief your reps. They operate across LinkedIn, email, WhatsApp, and Meta channels with built-in safety limits.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, Polluxa offers unlimited trial access. You can get started with Agent CRM for free at sales.polluxa.com.',
    },
    {
      question: 'Can Polluxa integrate with my existing tools?',
      answer: 'Yes. Polluxa connects natively with LinkedIn, WhatsApp, Meta Ads, Google, and hundreds of tools via Zapier and native integrations.',
    },
    {
      question: 'What channels does Polluxa support for outreach?',
      answer: 'LinkedIn (connection, DM, InMail), Email, WhatsApp, and Meta Ads — all managed from one unified workspace.',
    },
  ],
  demo_headline: 'See the agentic revenue platform in action',
  demo_description: 'Give us 60 minutes, and see how our out-of-the-box software maximizes business performance.',
};

/* ─────────────────────────────────────────────────────────────
   COMMERCE PAGE DATA
───────────────────────────────────────────────────────────── */
const COMMERCE_PAGE_DATA = {
  hero_label: 'Commerce',
  hero_title: 'The future of Commerce Today.',
  hero_description:
    'Polluxa Commerce is a unified platform that powers D2C, B2B portals, and marketplace syndication — with AI agents that recover abandoned carts, reprice dynamically, and manage returns automatically.',
  cta_primary_label: 'Book a live demo',
  cta_primary_url: '/contact',
  cta_secondary_label: 'See features',
  cta_secondary_url: '#features',
  trust_badges: [
    '✓ 2000+ Customers',
    '✓ PCI DSS · ISO 27001',
    '✓ 99% Uptime',
  ],
  metrics: [
    { value: '99%', label: 'Uptime guaranteed' },
    { value: '30%', label: 'Y-o-Y growth for customers' },
    { value: '29%', label: 'Increase in digital revenue' },
    { value: '27%', label: 'Process automation lift' },
  ],
  product_showcase: [
    { type: 'D2C',         color: '#3b82f6', title: 'Linen Co-ord · ₹4,499',         detail: '✓ 42 in stock',          detail_color: '#16a34a' },
    { type: 'B2B',         color: '#10b981', title: 'Bulk PO · 240 units · Brand Z',  detail: 'Net 30 payment terms',   detail_color: null },
    { type: 'MARKETPLACE', color: '#f59e0b', title: 'Amazon, Flipkart, Myntra',        detail: '✓ Synced in real-time',  detail_color: '#10b981' },
    { type: 'AGENT',       color: '#8b5cf6', title: 'Pricing Agent · raised 14 SKUs', detail: '+6% margin | +₹38K/day', detail_color: '#8b5cf6' },
  ],
  features_grid: [
    {
      icon: '🛒',
      title: 'Headless storefront',
      description: 'Pixel-perfect, blazing-fast PWA storefronts. Themeable, localized, AB-tested by an agent that reads conversion signals continuously.',
    },
    {
      icon: '📚',
      title: 'One catalog, every channel',
      description: 'Master your products once. Push to D2C, B2B, marketplaces, retail POS — translated, priced and merchandised per channel automatically.',
    },
    {
      icon: '🤝',
      title: 'B2B portals built in',
      description: 'Tiered pricing, quote-to-order, credit limits, account hierarchies, draft carts. Your wholesale buyers feel like they own the storefront.',
    },
    {
      icon: '💳',
      title: 'Checkout that converts',
      description: 'One-click, multi-payment, multi-currency. Cart-abandonment agent recovers carts via WhatsApp, email and SMS within minutes.',
    },
    {
      icon: '📦',
      title: 'Order orchestration',
      description: 'Split, route, hold, partially fulfill. Plays nicely with Polluxa WMS and Logistics — or your own external legacy tools.',
    },
    {
      icon: '↩️',
      title: "Returns that don't bleed",
      description: 'Self-serve return portal. Returns agent decides refund, replacement, store credit based on the specific margins and policies you set.',
    },
  ],
  d2c_section: {
    label: 'D2C Commerce',
    title: 'Your brand, your storefront, your agents.',
    description:
      'Launch a category-defining D2C brand in weeks. Polluxa Commerce ships with conversion-optimized themes, an AI merchandising agent, and automation sequences built to scale.',
    bullets: [
      'AI merchandiser places hero SKUs and automatically hides out-of-stock items.',
      'Cart-abandon agent recovers checkout drops via WhatsApp + email.',
      'Loyalty, referrals, and gift cards built natively into the unified backend.',
      'Editorial blocks for rich storytelling seamlessly embedded alongside shopping.',
    ],
    dashboard_title: 'D2C Dashboard · last 24h',
    dashboard: [
      { label: 'Sessions',        value: '42,180', trend: '+14% vs yesterday', trend_color: '#16a34a' },
      { label: 'Conversion',      value: '3.42%',  trend: '+0.4 pts',          trend_color: '#16a34a' },
      { label: 'AOV',             value: '₹2,840', trend: '+6% growth',        trend_color: '#16a34a' },
      { label: 'Recovered Carts', value: '218',    trend: '₹4.8L recovered',   trend_color: '#16a34a' },
    ],
  },
  b2b_section: {
    label: 'B2B Commerce',
    title: 'The B2B portal your distributors actually use.',
    description:
      'Negotiated price lists, MOQs, credit terms, buyer hierarchies, sample requests, RFQ-to-order, custom catalogs per account — all out of the box. No more spreadsheet ordering.',
    bullets: [
      'Tiered pricing & custom promotions per distributor account.',
      'Quote-to-order with built-in internal/external approval workflows.',
      'Credit limits and Net-30/60/90 terms enforced live on checkout.',
      'Quick re-order from past order history, completed in two clicks.',
    ],
    portal_title: 'B2B Portal · Buyer · Distributor Group X',
    portal_items: [
      { label: 'PO: Quarterly Order · 1,840 units', type: 'badge',  status: 'draft',          status_bg: '#fef08a', status_color: '#854d0e' },
      { label: 'RFQ: Custom Packs · 2 SKUs',         type: 'badge',  status: 'awaiting price', status_bg: '#fee2e2', status_color: '#991b1b' },
      { label: 'Credit: Available · Net 30 terms',   type: 'value',  value: '₹38L of ₹50L',   value_color: '#16a34a' },
      { label: 'Re-order: Same as Q3 Order',          type: 'button', action_label: '₹14L · Reorder' },
    ],
  },
  ecommerce_features: [
    { icon: '🏪', title: 'Multi-channel selling', description: 'Sell on D2C, B2B portals, Amazon, Flipkart, Myntra and more from one unified platform.' },
    { icon: '🤖', title: 'AI-powered pricing',    description: 'Dynamic repricing agents adjust prices in real-time based on demand, competition, and margin rules.' },
    { icon: '📊', title: 'Unified analytics',     description: 'Single dashboard for revenue, CAC, LTV, and channel attribution across all commerce touchpoints.' },
    { icon: '🔗', title: 'Deep integrations',     description: 'Native connectors for SAP, Oracle, Shopify, Stripe, Razorpay, Shiprocket, Klaviyo, and 50+ more.' },
    { icon: '🛡️', title: 'Enterprise security',   description: 'PCI DSS and ISO 27001 certified. Role-based access, audit logs, and data residency controls.' },
    { icon: '🚀', title: 'Fast go-live',           description: 'Pre-built templates and guided onboarding get your storefront live in days, not months.' },
  ],
  integrations_list: [
    'Amazon', 'Flipkart', 'Myntra', 'Shopify', 'SAP', 'Oracle',
    'Stripe', 'Razorpay', 'PayTabs', 'Shiprocket', 'Avalara', 'Klaviyo',
  ],
  faq: [
    {
      question: 'What is Polluxa Commerce?',
      answer: 'Polluxa Commerce is a unified platform that powers D2C storefronts, B2B portals, and marketplace syndication — with AI agents that recover abandoned carts, reprice dynamically, and manage returns automatically.',
    },
    {
      question: 'Does Polluxa Commerce support B2B and D2C on the same platform?',
      answer: 'Yes. Polluxa Commerce natively supports both B2B (tiered pricing, quote-to-order, credit terms) and D2C (storefront, cart recovery, loyalty) from a single unified backend.',
    },
    {
      question: 'Which marketplaces does Polluxa Commerce integrate with?',
      answer: 'Amazon, Flipkart, Myntra, and more. All marketplace inventory and orders sync in real-time to the central platform.',
    },
    {
      question: 'How does the cart abandonment recovery work?',
      answer: 'An AI agent detects abandoned checkouts and automatically reaches out via WhatsApp, email, and SMS within minutes — with personalized incentives based on the cart value and customer history.',
    },
    {
      question: 'Is there a free demo available?',
      answer: 'Yes. Book a live demo and we will give you a full walkthrough of the platform in 60 minutes.',
    },
  ],
  demo_headline: 'See Polluxa Commerce in action',
  demo_description: 'Give us 60 minutes, and see how our out-of-the-box software maximizes business performance.',
};

/* ─────────────────────────────────────────────────────────────
   PLM PAGE DATA
───────────────────────────────────────────────────────────── */
const PLM_PAGE_DATA = {
  slug: 'overview',
  title: 'PLM',
  locale: 'en',
  hero_title: 'Manage Less, Scale Smarter.',
  hero_subtitle: 'Make informed decisions throughout the product lifecycle.',
  hero_description:
    'Polluxa PLM is built for growing businesses that need scalable product lifecycle management — from concept to launch, with full visibility across development, inventory, vendors, and sales.',
  cta_primary_label: 'Book Live Demo',
  cta_primary_url: '/contact',
  cta_secondary_label: 'Download the product deck',
  cta_secondary_url: '/plm-deck',
  features: [
    {
      icon: '🔧',
      title: 'Product Development',
      subtitle: 'Unified product creation & collaboration',
      description: 'Collaborative workspace enabling designers, engineers, and suppliers to reduce errors and accelerate time-to-market.',
    },
    {
      icon: '📦',
      title: 'Inventory',
      subtitle: 'Advanced stock & resource forecasting',
      description: 'Demand forecasting and material allocation to prevent stockouts and delays across the entire supply chain.',
    },
    {
      icon: '✅',
      title: 'Task & Workflow',
      subtitle: 'Streamlined tasks & process automation',
      description: 'Task organization, approvals, and workflow automation to keep your team aligned through every product stage.',
    },
    {
      icon: '🤝',
      title: 'Vendors',
      subtitle: 'Seamless supplier collaboration & control',
      description: 'Centralized vendor management improving transparency and procurement efficiency across your supplier network.',
    },
    {
      icon: '💼',
      title: 'Sales',
      subtitle: 'Integrated product-to-sales alignment',
      description: 'Give sales teams real-time access to product info, pricing, and availability — so they always sell what you actually have.',
    },
    {
      icon: '📋',
      title: 'PO Sheet',
      subtitle: 'Automated purchase-order documentation',
      description: 'Auto-generated purchase order documents reduce manual effort and dramatically cut processing time.',
    },
  ],
  metrics: [
    { value: '40%', label: 'Faster time-to-market' },
    { value: '60%', label: 'Reduction in errors' },
    { value: '35%', label: 'Lower procurement cost' },
    { value: '2×',  label: 'Team productivity' },
  ],
  faq: [
    {
      question: 'What is Product Lifecycle Management software?',
      answer: 'PLM software controls and manages products from conception through disposal across manufacturing and value chains.',
    },
    {
      question: 'What is a PLM framework?',
      answer: 'An organizing structure for people, processes, and information — enabling cooperation and consistent product quality across the entire lifecycle.',
    },
    {
      question: 'What are the five stages of PLM?',
      answer: 'Ideation & Concept, Design & Validation, Development & Testing, Production & Launch, and Sales & Retirement.',
    },
    {
      question: 'Is the Polluxa PLM demo free?',
      answer: 'Yes, unlimited demos are available. Book a live demo and our team will walk you through the full platform.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, Polluxa offers unlimited trial access so you can evaluate the full feature set before committing.',
    },
    {
      question: 'What are the key features of Polluxa PLM?',
      answer: 'Product development collaboration, inventory management, vendor management, task and workflow automation, sales integration, and automated PO documentation.',
    },
  ],
  demo_headline: 'Give us 60 minutes, and see how our out-of-the-box software maximizes business performance.',
  demo_description: 'See how Polluxa PLM can cut your time-to-market and reduce operational errors across the product lifecycle.',
};

/* ─────────────────────────────────────────────────────────────
   LOGISTICS PAGE DATA
───────────────────────────────────────────────────────────── */
const LOGISTICS_PAGE_DATA = {
  slug: 'overview',
  title: 'Logistics',
  locale: 'en',
  hero_title: 'Ship Anywhere. Anytime!',
  hero_subtitle: 'Revolutionizing Logistics with Intelligence & Efficiency.',
  hero_description:
    'Our robust network of delivery hubs and couriers allows us to offer last-mile delivery services at extremely reasonable prices — empowering e-commerce businesses with real-time tracking, automated workflows, smart routing, and seamless integrations.',
  cta_primary_label: 'Book Live Demo',
  cta_primary_url: '/contact',
  cta_secondary_label: 'Learn more',
  cta_secondary_url: '#features',
  features: [
    {
      icon: '🚚',
      title: 'Delivery Suite',
      subtitle: 'Full courier & shipping flexibility',
      description: 'Offer multiple delivery services including standard, express, bulk, fragile items, and pickup/drop-off options for every customer need.',
    },
    {
      icon: '💰',
      title: 'Best Rates',
      subtitle: 'Cost-effective shipping solutions',
      description: 'Access to the lowest market shipping rates to reduce delivery expenses and improve your overall margins.',
    },
    {
      icon: '📦',
      title: 'Hassle-Free Shipping',
      subtitle: 'Simplified booking & tracking',
      description: 'Easy order booking, bulk label printing, and real-time tracking capabilities for seamless shipping operations.',
    },
    {
      icon: '💳',
      title: 'Cash-Flow Support',
      subtitle: 'Managed COD & payment cycles',
      description: 'Track Cash-On-Delivery orders and manage regular payment cycles for improved cash flow and financial control.',
    },
    {
      icon: '↩️',
      title: 'Returns',
      subtitle: 'Simplified returns & reverse pickup',
      description: 'Support easy returns with reverse-pickup scheduling and cost management, delighting customers post-purchase.',
    },
    {
      icon: '⚡',
      title: 'Fast Pickup',
      subtitle: 'Reliable first & last-mile delivery',
      description: 'Swift order delivery with dedicated first and last-mile solutions ensuring reliable, on-time fulfillment every time.',
    },
  ],
  metrics: [
    { value: '20K+', label: 'Orders processed daily' },
    { value: '400+', label: 'Courier partners' },
    { value: '1000+', label: 'Locations serviced' },
  ],
  faq: [
    {
      question: 'What is logistics in business and what are its types?',
      answer: 'Logistics is a planning system for storing and transporting products. The five types are: inbound, outbound, reverse, 3PL (third-party logistics), and 4PL (fourth-party logistics).',
    },
    {
      question: 'What activities are available with Polluxa Logistics?',
      answer: 'Hassle-free shipping, fast pickup, returns management, cash-flow support, best rates, and a full delivery suite — all managed from one platform.',
    },
    {
      question: 'How does Polluxa provide real-time shipment tracking?',
      answer: 'Through GPS integration and carrier partnerships (UPS, FedEx, DHL, and 400+ more) with automated notifications via email and SMS.',
    },
    {
      question: 'Does Polluxa provide hassle-free shipping?',
      answer: 'Yes, via real-time tracking, bulk label printing, and AI route optimization that selects the fastest, most cost-effective delivery path.',
    },
    {
      question: 'Is the demo free?',
      answer: 'Yes, unlimited demos are available with no booking limitations.',
    },
  ],
  demo_headline: 'Make better a reality.',
  demo_description: 'Give us 60 minutes, and see how our out-of-the-box software maximizes business performance.',
};

/* ─────────────────────────────────────────────────────────────
   WMS PAGE DATA
───────────────────────────────────────────────────────────── */
const WMS_PAGE_DATA = {
  slug: 'overview',
  title: 'WMS',
  locale: 'en',
  hero_title: 'Unprecedented Growth. Fully Customized.',
  hero_subtitle: 'Streamline warehouse operations and increase fulfilment rates across all sales channels.',
  hero_description:
    'Increase fulfilment rates and view your whole inventory across all sales channels by streamlining warehouse operations. Order inventory syncs in a matter of seconds.',
  cta_primary_label: 'Book Live Demo',
  cta_primary_url: '/contact',
  cta_secondary_label: 'Download the product deck',
  cta_secondary_url: '/wms-deck',
  features: [
    {
      icon: '🎯',
      title: 'Prioritization',
      subtitle: 'Smart order ranking & scheduling',
      description: 'Prioritize orders using real-time rules to process urgent or complex tasks faster and more efficiently.',
    },
    {
      icon: '🔍',
      title: 'Traceability',
      subtitle: 'Full supply-chain visibility',
      description: 'Monitor every item across inbound, picking, packing, and dispatch for complete operational visibility.',
    },
    {
      icon: '🔗',
      title: 'Integration',
      subtitle: 'Connect with core business systems',
      description: 'Connect WMS with ERP, CRM, and logistics tools for unified data flow and coordinated operations.',
    },
    {
      icon: '🔄',
      title: 'Rotation',
      subtitle: 'Efficient stock rotation strategies',
      description: 'Apply FIFO and FEFO methods to improve stock turnover, reduce waste, and maintain product quality.',
    },
    {
      icon: '📈',
      title: 'Scalability',
      subtitle: 'Grow without constraints',
      description: 'Handle rising order volumes and expanding warehouse needs with a flexible, scalable WMS platform.',
    },
    {
      icon: '🗺️',
      title: 'Routing',
      subtitle: 'Intelligent order-to-warehouse assignment',
      description: 'Automatically assign orders to the optimal warehouse based on location, stock, and delivery goals.',
    },
  ],
  metrics: [
    { value: '100%', label: 'Scan-based error-proof operations' },
    { value: '25–30%', label: 'Reduction in manpower cost' },
    { value: '100%', label: 'Right first time operations' },
    { value: '99.0%', label: 'Bin-level inventory accuracy' },
  ],
  faq: [
    {
      question: 'What is a WMS for enterprises?',
      answer: 'A Warehouse Management System (WMS) is software that optimizes warehouse operations — from receiving and putaway to picking, packing, and dispatch — with real-time inventory visibility.',
    },
    {
      question: 'What does WMS stand for?',
      answer: 'WMS stands for Warehouse Management System.',
    },
    {
      question: 'What are the main functions of a WMS?',
      answer: 'Shipping, order picking, packing, reverse logistics, inventory tracking, stock rotation, and integration with ERP and logistics systems.',
    },
    {
      question: 'Is Polluxa WMS customizable?',
      answer: 'Yes, Polluxa WMS is fully customizable to match your warehouse layout, operational rules, and integration requirements.',
    },
    {
      question: 'Is the demo free?',
      answer: 'Yes. Unlimited demos and unlimited trial access are available — book a live demo to see the full platform in 60 minutes.',
    },
  ],
  demo_headline: 'See Polluxa WMS in 60 minutes.',
  demo_description: 'Give us 60 minutes, and see how our out-of-the-box software maximizes business performance.',
};

/* ─────────────────────────────────────────────────────────────
   CREATOR COMMERCE PAGE DATA
───────────────────────────────────────────────────────────── */
const CREATOR_COMMERCE_PAGE_DATA = {
  slug: 'overview',
  title: 'Creator Commerce',
  locale: 'en',
  hero_title: 'Creator Commerce Platform for Influencers & Brands',
  hero_subtitle: 'Empower creators to launch, manage, and scale their e-commerce brands.',
  hero_description:
    'Polluxa empowers creators and influencers to launch, manage, and scale their e-Commerce brands with confidence — enabling seamless selling, performance tracking, and sustainable growth.',
  cta_primary_label: 'Book Live Demo',
  cta_primary_url: '/contact',
  cta_secondary_label: 'Download the product deck',
  cta_secondary_url: '/creator-commerce-deck',
  features: [
    {
      icon: '🔎',
      title: 'Discovery',
      description: 'Easily discover and filter from over a million creators on YouTube, TikTok, and Instagram — matching those whose audience, content style, and values align with your brand.',
    },
    {
      icon: '🎁',
      title: 'Gifting',
      description: 'Automate influencer gifting from product selection to delivery, enabling scalable creator seeding campaigns with full traceability and minimal manual effort.',
    },
    {
      icon: '📸',
      title: 'Content',
      description: 'Manage, schedule, and publish creator content across channels from a unified dashboard; ensure consistency and turn every piece of content into a performance-driven asset.',
    },
    {
      icon: '🤝',
      title: 'Relationships',
      description: 'Nurture long-term creator partnerships with streamlined communication, collaboration tools, and record-keeping — supporting scalable, meaningful relationships.',
    },
    {
      icon: '📊',
      title: 'Analytics',
      description: 'Leverage real-time data, custom dashboards, and advanced analytics to track influencer campaigns, measure ROI, and inform smarter campaign decisions.',
    },
    {
      icon: '💸',
      title: 'Payments',
      description: 'Simplify and automate payouts — whether fixed fees, milestone-based, or performance-driven — with transparent, timely payment workflows that build trust with creators.',
    },
  ],
  metrics: [
    { value: '100+',  label: 'Satisfied users' },
    { value: '8,000+', label: 'Unique pieces of content' },
    { value: '10M+', label: 'Impressions driven' },
  ],
  integrations_list: [
    'WooCommerce', 'Shopify', 'Slack', 'Salesforce',
    'Google Analytics', 'Outlook', 'PayPal', 'Gmail',
  ],
  faq: [
    {
      question: 'What is Creator Commerce?',
      answer: 'Creator Commerce is a means for influencers to work with brands for e-commerce through live stream shops, affiliates, gifting, and pay-for-performance partnerships.',
    },
    {
      question: 'What are the core features of Polluxa Creator Commerce?',
      answer: 'Discovery, gifting campaigns, content management, relationship management, analytics, and payment automation — plus live shops, affiliate links, and creator onboarding tools.',
    },
    {
      question: 'Does Polluxa provide reports and analytics?',
      answer: 'Yes, Polluxa Creator Commerce includes robust reporting and analytics that track performance metrics, ROI, and campaign effectiveness in real-time.',
    },
    {
      question: "What's the difference between Creator Commerce and E-commerce?",
      answer: 'Creator Commerce facilitates influencer collaborations and content-to-sales conversion, while traditional e-commerce is straightforward product buying and selling without creator involvement.',
    },
    {
      question: 'Can I integrate with other software?',
      answer: 'Yes. Polluxa Creator Commerce integrates with WooCommerce, Shopify, Slack, Salesforce, Google Analytics, Outlook, PayPal, Gmail, and more.',
    },
    {
      question: 'Is the demo free?',
      answer: 'Yes, unlimited demos are available. Book a live demo and see the platform in full detail.',
    },
  ],
  demo_headline: 'Make better a reality.',
  demo_description: 'Give us 60 minutes, and see how our out-of-the-box software maximizes business performance.',
};

/* ─────────────────────────────────────────────────────────────
   SEED FUNCTION — idempotent
───────────────────────────────────────────────────────────── */
async function upsertEntry(strapi, uid, slugValue, data, label) {
  try {
    const existing = await strapi.db
      .query(uid)
      .findOne({ where: { slug: slugValue } })
      .catch(() => null);

    const needsUpdate = !existing
      || !existing.hero_title
      || !existing.faq
      || (Array.isArray(existing.faq) && existing.faq.length === 0);

    if (!existing) {
      await strapi.entityService.create(uid, {
        data: { ...data, publishedAt: NOW },
      });
      strapi.log.info(`[seed-content] ${label} entry created ✓`);
    } else if (needsUpdate) {
      await strapi.entityService.update(uid, existing.id, {
        data: { ...data, publishedAt: NOW },
      });
      strapi.log.info(`[seed-content] ${label} entry updated with page content ✓`);
    } else {
      strapi.log.info(`[seed-content] ${label} already has content — skipping.`);
    }
  } catch (err) {
    strapi.log.error(`[seed-content] ${label} seed failed: ${err.message}`);
  }
}

async function seedContent({ strapi }) {
  await upsertEntry(strapi, 'api::crm.crm',                         'overview', CRM_PAGE_DATA,             'CRM');
  await upsertEntry(strapi, 'api::commerce.commerce',               'overview', { slug: 'overview', title: 'Polluxa Commerce', locale: 'en', ...COMMERCE_PAGE_DATA }, 'Commerce');
  await upsertEntry(strapi, 'api::plm.plm',                         'overview', PLM_PAGE_DATA,             'PLM');
  await upsertEntry(strapi, 'api::logistic.logistic',               'overview', LOGISTICS_PAGE_DATA,       'Logistics');
  await upsertEntry(strapi, 'api::wms.wms',                         'overview', WMS_PAGE_DATA,             'WMS');
  await upsertEntry(strapi, 'api::creator-commerce.creator-commerce', 'overview', CREATOR_COMMERCE_PAGE_DATA, 'Creator Commerce');
}

module.exports = { seedContent };
