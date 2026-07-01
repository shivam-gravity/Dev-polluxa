/**
 * Polluxa Strapi seed script
 * Run: node seed-strapi.js
 *
 * Upserts 6 product-page Collection Type entries:
 *   crms, commerces, plms, creator-commerces, logistics, wmss
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const API_URL   = process.env.VITE_API_URL   || 'http://[::1]:1338';
const API_TOKEN = process.env.VITE_API_TOKEN || 'fff1c63089123dbf9cc5aeccea6315254546d69f13254554a507b770542dab23dcae0d4505580d66fd095eea8a1442c0ee62843ceabdd5c4df55459a3c2737a18c9515a42c48401992ae64d30b180dbfa6b7735ed2a6011ed5cf131b004e92bc2d28f94d04fc7c87e159b2d0913618a617ae60fcac771c74ee71d283e5470e87';

const HEADERS = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${API_TOKEN}`,
};

const CDN = 'https://grateful-joy-0dad9947f5.media.strapiapp.com';

/* Read a local file from public/ and upload it to local Strapi.
   Returns the Strapi media ID, or null on failure. */
async function uploadFromLocal(filename) {
  const filepath = join(__dirname, 'public', filename);
  console.log(`  📂 Reading local ${filename}…`);
  let buffer;
  try {
    buffer = readFileSync(filepath);
  } catch (e) {
    console.error(`  ❌ Could not read ${filepath}:`, e.message);
    return null;
  }

  const ext = filename.split('.').pop().toLowerCase();
  const mime = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', svg: 'image/svg+xml' }[ext] || 'application/octet-stream';
  const boundary = '----PolluxaSeed' + Math.floor(Math.random() * 1e9);

  const body = Buffer.concat([
    Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="files"; filename="${filename}"\r\nContent-Type: ${mime}\r\n\r\n`),
    buffer,
    Buffer.from(`\r\n--${boundary}--\r\n`),
  ]);

  const uploadRes = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_TOKEN}`, 'Content-Type': `multipart/form-data; boundary=${boundary}` },
    body,
  });
  const j = await uploadRes.json();
  if (!Array.isArray(j) || !j[0]?.id) {
    console.error(`  ❌ Upload failed for ${filename}:`, j?.error?.message || JSON.stringify(j).slice(0, 120));
    return null;
  }
  console.log(`  ✅ Uploaded → media id ${j[0].id}`);
  return j[0].id;
}

/* Download an image from polluxa.com's CDN and upload it to local Strapi.
   Returns the Strapi media ID, or null on failure. */
async function uploadFromUrl(filename) {
  const url = `${CDN}/${filename}`;
  console.log(`  📥 Fetching ${filename}…`);

  let buffer;
  try {
    const res = await fetch(url);
    if (!res.ok) { console.error(`  ❌ HTTP ${res.status} for ${filename}`); return null; }
    buffer = Buffer.from(await res.arrayBuffer());
  } catch (e) {
    console.error(`  ❌ Download failed for ${filename}:`, e.message);
    return null;
  }

  const ext = filename.split('.').pop().toLowerCase();
  const mime = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', svg: 'image/svg+xml' }[ext] || 'application/octet-stream';
  const boundary = '----PolluxaSeed' + Math.floor(Math.random() * 1e9);

  const body = Buffer.concat([
    Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="files"; filename="${filename}"\r\nContent-Type: ${mime}\r\n\r\n`),
    buffer,
    Buffer.from(`\r\n--${boundary}--\r\n`),
  ]);

  const uploadRes = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_TOKEN}`, 'Content-Type': `multipart/form-data; boundary=${boundary}` },
    body,
  });
  const j = await uploadRes.json();
  if (!Array.isArray(j) || !j[0]?.id) {
    console.error(`  ❌ Upload failed for ${filename}:`, j?.error?.message || JSON.stringify(j).slice(0, 120));
    return null;
  }
  console.log(`  ✅ Uploaded → media id ${j[0].id}`);
  return j[0].id;
}

/* Find existing entry by slug, then PUT; fall back to POST */
async function upsert(collection, data) {
  const slug = data.slug;
  const findRes = await fetch(
    `${API_URL}/api/${collection}?filters[slug][$eq]=${slug}`,
    { headers: HEADERS }
  );
  const findJson = await findRes.json();
  const existing = findJson?.data?.[0];

  if (existing) {
    const putRes = await fetch(`${API_URL}/api/${collection}/${existing.id}`, {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify({ data }),
    });
    const putJson = await putRes.json();
    if (!putRes.ok) {
      console.error(`❌  ${collection} PUT:`, putJson?.error?.message || JSON.stringify(putJson));
    } else {
      console.log(`✅  ${collection} → updated id ${putJson.data?.id}`);
    }
  } else {
    const postRes = await fetch(`${API_URL}/api/${collection}`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ data }),
    });
    const postJson = await postRes.json();
    if (!postRes.ok) {
      console.error(`❌  ${collection} POST:`, postJson?.error?.message || JSON.stringify(postJson));
    } else {
      console.log(`✅  ${collection} → created id ${postJson.data?.id}`);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CRM
// ─────────────────────────────────────────────────────────────────────────────
const CRM_DATA = {
  slug: 'overview',
  hero_title: 'The AI-Native CRM Built for Modern Revenue Teams',
  hero_subtitle: 'Agent-powered sales, from first signal to closed deal.',
  hero_description: 'Polluxa CRM brings together AI agents, unified data, and powerful execution channels so your team can prospect smarter, engage faster, and close more deals — all from one workspace.',
  cta_primary_url: 'https://sales.polluxa.com/',
  cta_primary_label: 'Get Agent CRM — Free',
  cta_secondary_url: '/contact',
  cta_secondary_label: 'Talk to sales',
  metrics: [
    { type: 'display', display: '85%',   label: 'Autonomous Execution' },
    { type: 'display', display: '<5s',   label: 'Sync Latency' },
    { type: 'display', display: '100%',  label: 'Zero-Touch Ingestion' },
    { type: 'display', display: '30s',   label: 'Onboarding-to-Meeting' },
  ],
  capabilities: [
    { icon: '🤖', tag: 'AI Agents',   title: 'Autonomous Sales Agents',      description: 'Deploy AI agents that prospect, qualify, and follow up 24/7 without manual effort.', link_url: '/agents' },
    { icon: '🔍', tag: 'Prospecting', title: 'TAM Canvas & Lead Finder',     description: 'Map your total addressable market and surface high-intent leads with precision signals.', link_url: '/tam-canvas' },
    { icon: '📊', tag: 'Analytics',   title: 'Real-Time Pipeline Analytics', description: 'Live dashboards showing exactly where deals stand and what is blocking revenue.', link_url: '/crm' },
    { icon: '✉️', tag: 'Outreach',    title: 'Multi-Channel Sequences',      description: 'Orchestrate LinkedIn, email, WhatsApp, and Meta Ads campaigns from a single workspace.', link_url: '/outreach' },
    { icon: '🎯', tag: 'Signals',     title: 'Buying Signal Aggregation',    description: 'Catch intent signals — funding rounds, job changes, product launches — the moment they happen.', link_url: '/signal-aggregation' },
    { icon: '🔗', tag: 'Data',        title: 'Contact & Account Enrichment', description: 'Automatically enrich every contact with verified emails, phone numbers, and firmographic data.', link_url: '/contact-enrichment' },
    { icon: '💬', tag: 'Chats',       title: 'Autonomous Sales Chat Agents', description: 'Deploy AI agents that prospect, qualify, and follow up 24/7 without manual effort.', link_url: '/chats' },
  ],
  channels: [
    { badge: 'PRIMARY CHANNEL', title: 'LinkedIn Outreach', is_featured: true, featured_label: 'Most Powerful', description: 'Our strongest engine. Connect, message, and sequence prospects on LinkedIn at scale with AI personalization.', stats: [{ value: '3×', label: 'Reply rate vs email' }, { value: '87%', label: 'Connect rate' }], link_url: '/linkedin-outreach' },
    { badge: 'CHANNEL', title: 'Email Outreach', description: 'AI-written, deliverability-optimized email sequences with built-in warm-up, tracking, and smart throttling.', stats: [{ value: '42%', label: 'Open rate' }, { value: '11%', label: 'Reply rate' }], link_url: '/email-outreach' },
    { badge: 'CHANNEL', title: 'WhatsApp',       description: 'Reach buyers on the channel they actually check. Compliant, templated, and personalized WhatsApp campaigns.', stats: [], link_url: '/whatsapp' },
    { badge: 'CHANNEL', title: 'Meta Ads',       description: 'Sync your CRM audiences to Facebook and Instagram to run precisely targeted paid campaigns alongside your outreach.', stats: [], link_url: '/meta-ads' },
  ],
  modules: [
    { title: 'Agent Module', badge: 'Included', badge_variant: 'success', description: 'Deploy AI sales agents that handle prospecting, follow-up, and qualification autonomously.', link_url: '/agents',    link_label: 'Explore Agents' },
    { title: 'Marketing',    badge: 'Included', badge_variant: 'success', description: 'Plan, launch, and measure campaigns across every channel from one unified hub.', link_url: '/marketing', link_label: 'Explore Marketing' },
    { title: 'Sales Module', badge: 'Included', badge_variant: 'success', description: 'Manage pipeline, set targets, and give reps a clean workspace to close faster.', link_url: '/sales',     link_label: 'Explore Sales' },
    { title: 'Data Module',  badge: 'Add-on',   badge_variant: 'default', description: 'Clean, enrich, and sync contact and account data across your entire stack automatically.', link_url: '/data',      link_label: 'Explore Data' },
    { title: 'Help Desk',    badge: 'Add-on',   badge_variant: 'default', description: 'Unified support ticketing powered by the same agent framework as your sales team.', link_url: '/helpdesk',  link_label: 'Explore Help Desk' },
    { title: 'Commerce',     badge: 'Add-on',   badge_variant: 'default', description: 'Extend your CRM into full B2B and D2C commerce with order management and storefront tools.', link_url: '/commerce',  link_label: 'Explore Commerce' },
  ],
  faq: [
    { question: 'How quickly can we go live?', answer: 'Most teams are fully live within 30 days. Our implementation team handles data migration, integrations, and agent configuration so your reps can start selling from day one.' },
    { question: 'Does Polluxa CRM replace our existing tools?', answer: 'It can, but it does not have to. Polluxa integrates with Salesforce, HubSpot, and 50+ tools so you can adopt it gradually and retire legacy tools at your own pace.' },
    { question: 'How do the AI agents work?', answer: 'Agents are pre-built workflows that combine our data graph, LLM reasoning, and execution channels. You configure goals; agents handle the actions — prospecting, follow-up, qualification, and more.' },
    { question: 'Is there a free tier?', answer: 'Yes — every module starts free with generous limits. You only pay as you scale beyond the free tier thresholds. No credit card required to start.' },
    { question: 'How is data security handled?', answer: 'Polluxa is SOC 2 Type II certified, GDPR compliant, and stores data in your chosen region. All agent actions are logged, auditable, and reversible.' },
    { question: 'Can I import data from my current CRM?', answer: 'Yes — we offer one-click import from Salesforce, HubSpot, Pipedrive, and most CSV exports. Our migration team validates and cleanses your data before it goes live.' },
    { question: 'Does Polluxa CRM support mobile?', answer: 'Yes — the Polluxa mobile app (iOS and Android) gives reps full access to their pipeline, contacts, and tasks. Agents run in the background even when reps are offline.' },
    { question: 'What kind of reporting does Polluxa CRM offer?', answer: 'You get pre-built dashboards for pipeline health, rep activity, sequence performance, and revenue forecasting. All reports are exportable and shareable with custom filters.' },
    { question: 'Can multiple teams use Polluxa CRM simultaneously?', answer: 'Yes — the platform supports unlimited seats with role-based permissions. Sales, marketing, and support teams each get tailored views with shared data underneath.' },
    { question: 'Is training and onboarding support included?', answer: 'Every plan includes live onboarding sessions, an interactive setup wizard, and access to our knowledge base. Enterprise plans come with a dedicated customer success manager.' },
    { question: 'What happens to my data if I cancel?', answer: 'You can export all your data in standard formats (CSV, JSON) at any time. After account closure, data is retained for 30 days before permanent deletion per our data retention policy.' },
    { question: 'Does Polluxa CRM support custom fields and pipelines?', answer: 'Yes — you can create unlimited custom fields, stages, and pipelines to match your exact sales motion. Changes take effect immediately with no downtime.' },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Commerce
// ─────────────────────────────────────────────────────────────────────────────
const COMMERCE_DATA = {
  slug: 'overview',
  hero_label: 'Commerce Platform',
  hero_title: 'Sell Everywhere. Fulfil Anywhere.',
  hero_description: 'Polluxa Commerce unifies your B2B and D2C channels, order management, and supplier network into one intelligent platform — built for brands that are serious about scale.',
  cta_primary_url: '/contact',
  cta_primary_label: 'Book a live demo',
  cta_secondary_url: '#features',
  cta_secondary_label: 'See all features',
  trust_badges: ['500+ brands onboarded', 'SOC 2 Type II certified', 'Global fulfilment network', 'Live in < 45 days'],
  metrics: [
    { value: '500+',    label: 'Brands on the platform' },
    { value: '99.8%',   label: 'Order accuracy rate' },
    { value: '3.2×',    label: 'Average GMV growth (Y1)' },
    { value: '45 days', label: 'Average go-live time' },
  ],
  ecommerce_features: [
    { icon: '🛒', tag: 'Catalog',     title: 'Unified Product Catalogue',    description: 'One master catalogue that syncs across every storefront and marketplace automatically.', link_url: '/commerce' },
    { icon: '📦', tag: 'Fulfilment',  title: 'Smart Order Routing',          description: 'Route every order to the optimal warehouse or 3PL based on proximity, stock, and cost.', link_url: '/wms' },
    { icon: '📊', tag: 'Analytics',   title: 'Revenue & Sell-Through Intel', description: 'Real-time dashboards on GMV, returns, margin, and channel contribution.', link_url: '/commerce' },
    { icon: '🤝', tag: 'B2B',        title: 'B2B Buyer Portal',             description: 'Self-serve portal for wholesale buyers — orders, invoices, and returns in one place.', link_url: '/commerce' },
    { icon: '🌐', tag: 'Marketplace', title: 'Marketplace Sync',             description: 'List, price, and fulfil across Amazon, Flipkart, and Myntra without manual work.', link_url: '/commerce' },
    { icon: '⚡', tag: 'Automation',  title: 'Agentic Replenishment',        description: 'AI agents that monitor stock levels and raise purchase orders before you run out.', link_url: '/agents' },
  ],
  integrations_list: ['Shopify', 'WooCommerce', 'PayPal', 'Salesforce', 'Google Analytics', 'Outlook', 'Gmail', 'Slack'],
  faq: [
    { question: 'Can Polluxa Commerce handle both B2B and D2C simultaneously?', answer: 'Yes. The platform manages separate price lists, buyer portals, and fulfilment logic for B2B and D2C from one admin, with no data duplication.' },
    { question: 'How does inventory sync work across channels?', answer: 'A single inventory ledger propagates changes to all connected channels in real time — no overselling, no manual updates across Shopify, Amazon, WooCommerce, or your own storefront.' },
    { question: 'How long does it take to go live?', answer: 'Most brands are live in 30–45 days. We handle data migration, integration setup, and training end to end. Complex multi-warehouse setups may take up to 60 days.' },
    { question: 'Do you support international selling?', answer: 'Yes — multi-currency checkout, region-based pricing, localised tax calculation, and international carrier integrations are all built in.' },
    { question: 'What marketplaces does Polluxa Commerce integrate with?', answer: 'We support Amazon, Flipkart, Myntra, Meesho, and Nykaa out of the box. Custom marketplace connectors can be built via our API in 2–4 weeks.' },
    { question: 'How does the returns management work?', answer: 'Customers initiate returns through your branded portal. The platform auto-routes the return to the correct warehouse, triggers carrier pickup, and updates inventory on receipt.' },
    { question: 'Can I set different pricing for different buyer groups?', answer: 'Yes — you can create unlimited price lists and assign them to specific buyers, regions, or order volumes. Prices update instantly across all channels.' },
    { question: 'Does Polluxa Commerce support subscription products?', answer: 'Yes — recurring billing, subscription management, and dunning logic are built in. You can offer subscriptions alongside one-time purchases in the same checkout.' },
    { question: 'How does abandoned cart recovery work?', answer: 'Polluxa automatically triggers personalized email, WhatsApp, or SMS messages to customers who abandon their cart. You configure the timing and channel mix.' },
    { question: 'Is there a mobile app for managing orders?', answer: 'Yes — the Polluxa mobile app lets you view live orders, approve returns, check inventory, and respond to buyer queries from anywhere.' },
    { question: 'What payment gateways are supported?', answer: 'We support Razorpay, PayU, Stripe, PayPal, and all major UPI providers. COD is also fully supported with automated reconciliation.' },
    { question: 'How does the AI replenishment agent work?', answer: 'The agent monitors sell-through rates, supplier lead times, and safety stock thresholds. When stock drops below your configured minimum, it automatically raises a purchase order for your approval.' },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PLM
// ─────────────────────────────────────────────────────────────────────────────
const PLM_DATA = {
  slug: 'overview',
  hero_title: 'Manage Less. Ship Faster. Scale Smarter.',
  hero_description: 'Polluxa PLM centralises product data, design collaboration, and supplier workflows so your teams spend less time chasing approvals and more time building great products.',
  cta_primary_url: '/contact',
  cta_primary_label: 'Book Live Demo',
  cta_secondary_url: '#features',
  cta_secondary_label: 'See all features',
  demo_headline: 'Ready to ship faster, with less rework?',
  demo_description: 'Book a 30-minute demo with a Polluxa PLM specialist. We will show you the platform running live on your product categories.',
  metrics: [
    { value: '40%',   label: 'Faster time-to-market' },
    { value: '60%',   label: 'Reduction in sampling rounds' },
    { value: '99%',   label: 'BOM accuracy rate' },
    { value: '2000+', label: 'Brands on the platform' },
  ],
  features: [
    { icon: '📦', title: 'Version Control',        subtitle: 'PRODUCT CONTROL',  description: 'Track every iteration of a product — specs, images, materials — with full audit history and rollback.' },
    { icon: '🎨', title: 'Design Collaboration',   subtitle: 'CREATIVE WORKFLOW', description: 'Real-time collaboration between designers, merchandisers, and buyers on tech packs and range plans.' },
    { icon: '🏭', title: 'Supplier Management',    subtitle: 'SUPPLY CHAIN',     description: 'Centralise supplier profiles, certifications, capacity, and performance scores in one place.' },
    { icon: '📋', title: 'Bill of Materials',      subtitle: 'COSTING',          description: 'Build multi-level BOMs with live costing, margin analysis, and what-if scenario planning.' },
    { icon: '📅', title: 'Critical Path Tracking', subtitle: 'PLANNING',         description: 'Visual timeline of every milestone from design brief to store delivery — with automated alerts.' },
    { icon: '🔗', title: 'ERP & WMS Integration',  subtitle: 'CONNECTIVITY',     description: 'Bi-directional sync with your ERP and WMS ensures that PLM data is always the single source of truth.' },
  ],
  faq: [
    { question: 'Can Polluxa PLM handle multiple product categories?', answer: 'Yes — the platform is built for fashion, beauty, electronics, home goods, and more. Each category gets configurable templates for attributes, tech pack fields, and approval workflows.' },
    { question: 'How does it integrate with our existing ERP?', answer: 'We offer pre-built connectors for SAP, Oracle, and Microsoft Dynamics. A REST API and webhook system cover any custom ERP. Two-way sync runs on configurable schedules or in real time.' },
    { question: 'What does the implementation timeline look like?', answer: 'Most teams are live in 45–60 days. Our implementation squad handles data migration, category template setup, and end-user training in structured sprints.' },
    { question: 'Can suppliers access the platform directly?', answer: 'Yes — suppliers get a dedicated portal to receive tech packs, submit samples, update delivery status, and share compliance documents without needing a full licence.' },
    { question: 'Does Polluxa PLM support tech pack management?', answer: 'Tech pack management is a core feature. You can build, version, and share tech packs with suppliers directly from the platform, with comment threads and approval tracking on every revision.' },
    { question: 'How does version control work for product specifications?', answer: 'Every change to a product spec creates a new version with a timestamp, author, and diff view. You can compare any two versions side by side and roll back to any previous state in one click.' },
    { question: 'Can I manage multiple seasons or collections simultaneously?', answer: 'Yes — the platform is built around seasonal planning. You can run multiple live collections in parallel, each with its own critical path, suppliers, and approval workflows.' },
    { question: 'Is there a supplier performance scoring system?', answer: 'Yes — Polluxa PLM automatically scores suppliers on on-time delivery, sample acceptance rate, quality compliance, and communication responsiveness. Scores update after every milestone.' },
    { question: 'Does the platform support sustainability and compliance tracking?', answer: 'Yes — you can attach certifications (GOTS, OEKO-TEX, BSCI) to supplier profiles and materials. The platform flags expired certificates and tracks your sustainability KPIs across the range.' },
    { question: 'What languages does the platform support?', answer: 'The admin interface is available in English, Hindi, Mandarin, and Spanish. The supplier portal supports additional languages — contact us for enterprise language packs.' },
    { question: 'Can we white-label the supplier portal?', answer: 'Yes — Enterprise plans include a fully branded supplier portal with your logo, colours, and custom domain. Suppliers see your brand, not Polluxa.' },
    { question: 'How does costing and margin analysis work?', answer: 'Each BOM line is costed against live material and labour rates. The platform automatically calculates landed cost, margin, and IMU at the style and range level with what-if scenario planning.' },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Creator Commerce
// ─────────────────────────────────────────────────────────────────────────────
const CREATOR_COMMERCE_DATA = {
  slug: 'overview',
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
    { question: 'Do I need a large following to use Polluxa Creator Commerce?', answer: 'No — creators with 10K followers and fast-growing brands both use the platform. Pricing scales with your transaction volume, so you only pay as you grow.' },
    { question: 'Can I sell physical and digital products?', answer: 'Yes — the platform supports physical goods, digital downloads, and membership access in the same storefront. You can mix product types in a single checkout.' },
    { question: 'How does the fulfilment integration work?', answer: 'Connect your existing 3PL or use the Polluxa fulfilment network. Orders placed on any channel are automatically routed to the right fulfilment partner with real-time tracking.' },
    { question: 'Is there an app for managing drops on the go?', answer: 'Yes — the Polluxa mobile app lets you monitor live drop stats, approve orders, manage waitlists, and respond to support tickets from your phone in real time.' },
    { question: 'How does the waitlist feature work for drops?', answer: 'Fans can join a waitlist before inventory goes live. When the drop opens, waitlisted customers get priority access and a timed checkout window before stock is opened to everyone.' },
    { question: 'Can I run multiple drops simultaneously?', answer: 'Yes — you can have multiple live and upcoming drops at the same time, each with separate inventory, pricing, and waitlists. The dashboard shows all drops in a single calendar view.' },
    { question: 'How does affiliate and collab management work?', answer: 'Each affiliate or brand partner gets a unique link with real-time conversion tracking. Payouts are calculated automatically and processed in bulk at your configured pay cycle.' },
    { question: 'Which social platforms are supported for commerce sync?', answer: 'We support Instagram Shopping, TikTok Shop, YouTube Shopping, and Pinterest Catalogs. New platform integrations are added as they become available.' },
    { question: 'Can I accept international payments?', answer: 'Yes — the platform supports 135+ currencies with automatic conversion at checkout. Payout to your bank account happens in your local currency.' },
    { question: 'How do I handle customs for international orders?', answer: 'Polluxa automatically generates customs declarations and calculates duties at checkout using your product HS codes. International shipping labels include all required documentation.' },
    { question: 'What analytics are available about my audience and sales?', answer: 'You get dashboards for traffic source, content-to-cart attribution, product performance, audience demographics, and cohort retention — all updated in real time.' },
    { question: 'Can I offer discount codes and bundles?', answer: 'Yes — you can create percentage, fixed-amount, and free-shipping discounts, plus product bundles with mixed pricing. Codes can be restricted by drop, audience segment, or usage limit.' },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Logistics
// ─────────────────────────────────────────────────────────────────────────────
const LOGISTICS_DATA = {
  slug: 'overview',
  hero_title: 'Ship Anywhere. Anytime. At Any Scale.',
  hero_description: 'Polluxa Logistics connects your brand to a nationwide network of fulfilment hubs and couriers — giving you last-mile visibility, automated dispatch, and carrier-agnostic flexibility in one platform.',
  cta_primary_url: '/contact',
  cta_primary_label: 'Book Live Demo',
  demo_headline: 'Make better a reality.',
  demo_description: 'Give us 60 minutes and see how Polluxa Logistics can cut your delivery costs and improve customer satisfaction scores.',
  metrics: [
    { value: '98.5%', label: 'On-time delivery rate' },
    { value: '25%',   label: 'Reduction in shipping cost' },
    { value: '500+',  label: 'Pin codes served' },
  ],
  features: [
    { icon: '🗺️', title: 'Intelligent Route Planning',  subtitle: 'LAST MILE',        description: 'AI optimises delivery routes in real time based on traffic, time windows, and vehicle capacity.' },
    { icon: '📡', title: 'Live Shipment Tracking',      subtitle: 'VISIBILITY',        description: 'End-to-end tracking from dispatch to doorstep — shareable with customers via SMS and email.' },
    { icon: '🚚', title: 'Multi-Carrier Orchestration', subtitle: 'CARRIER NETWORK',   description: 'Auto-allocate shipments to the best-performing carrier per pin code, weight, and service level.' },
    { icon: '🔄', title: 'Returns Management',          subtitle: 'REVERSE LOGISTICS', description: 'Scheduled pickups, condition grading, and warehouse re-entry — fully automated.' },
    { icon: '🏪', title: 'Hub & Spoke Network',         subtitle: 'INFRASTRUCTURE',    description: "Access Polluxa's regional hub network for faster regional distribution and lower transit times." },
    { icon: '📊', title: 'Delivery Analytics',          subtitle: 'REPORTING',         description: 'Track SLA adherence, NDR rates, and carrier performance with daily and weekly dashboards.' },
  ],
  faq: [
    { question: 'Which carriers does Polluxa Logistics support?', answer: 'We integrate with all major carriers — Delhivery, Blue Dart, Ekart, Xpressbees, DTDC, and more — plus international forwarders like DHL, FedEx, and UPS.' },
    { question: 'Can I use my existing carrier contracts?', answer: 'Yes — you can bring your own carrier accounts and still use our routing engine, tracking, and analytics layer on top. Your negotiated rates apply automatically.' },
    { question: 'How does NDR (non-delivery report) handling work?', answer: 'Our system automatically triggers reattempt workflows, customer communication, and escalation rules based on your NDR policies. Unresolved NDRs are flagged for manual review.' },
    { question: 'Is COD supported?', answer: 'Yes — cash-on-delivery with automated remittance reconciliation is fully supported across all partner carriers. COD amounts are reconciled and deposited to your account on a 7-day cycle.' },
    { question: 'How does real-time tracking work for customers?', answer: 'Each shipment gets a branded tracking page your customers can bookmark. Proactive SMS and email notifications are sent at every milestone — dispatched, out for delivery, delivered.' },
    { question: 'What is the typical delivery time for metro cities?', answer: 'Within metro cities, next-day and same-day delivery are available through our express carrier network. Tier-2 and Tier-3 cities are typically covered in 2–4 business days.' },
    { question: 'Can I schedule bulk shipments?', answer: 'Yes — you can upload bulk shipment manifests via CSV or API, and our system automatically assigns carriers, generates labels, and schedules pickups in one operation.' },
    { question: 'How does the returns pickup process work?', answer: 'Customers initiate returns through your portal or a Polluxa-hosted return page. The system assigns the nearest available carrier, schedules pickup, and updates you when the package is collected.' },
    { question: 'Do you support cold chain logistics?', answer: 'Yes — we partner with certified cold chain carriers for pharma, food, and perishables. Temperature-controlled shipments are tracked with IoT sensors and alerts on deviation.' },
    { question: 'What SLA guarantees do you offer?', answer: 'Our platform SLA is 99.9% uptime. Carrier SLAs vary by partner — we surface historical performance data per carrier and pin code so you can make informed routing decisions.' },
    { question: 'Can I get white-label tracking pages?', answer: 'Yes — Enterprise plans include fully branded tracking pages with your logo, colours, and custom domain. You can embed product recommendations and return initiation directly on the page.' },
    { question: 'How are shipping costs calculated and optimised?', answer: 'Our engine compares rates across all connected carriers in real time for each shipment and selects the lowest cost option that meets your configured delivery time window.' },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// WMS
// ─────────────────────────────────────────────────────────────────────────────
const WMS_DATA = {
  slug: 'overview',
  hero_title: 'Unprecedented Growth. Fully Customized.',
  hero_description: 'Polluxa WMS gives your warehouse team real-time visibility, AI-driven pick optimisation, and seamless integrations with your carriers and ERP — so you can fulfil more orders with the same resources.',
  cta_primary_url: '/contact',
  cta_primary_label: 'Book Live Demo',
  demo_headline: 'See Polluxa WMS in 60 minutes.',
  demo_description: 'Give us 60 minutes and we will show you the platform running live on data that mirrors your warehouse operations.',
  metrics: [
    { value: '99.97%',  label: 'Pick accuracy rate' },
    { value: '35%',     label: 'Reduction in fulfilment cost' },
    { value: '2×',      label: 'Throughput increase (avg Y1)' },
    { value: '30 days', label: 'Go-live time' },
  ],
  features: [
    { icon: '📍', title: 'Slotting Optimisation',   subtitle: 'SPACE UTILISATION', description: 'AI assigns each SKU to the optimal bin location based on velocity, size, and pick path efficiency.' },
    { icon: '🚶', title: 'Wave Planning',            subtitle: 'PICK & PACK',       description: 'Batch and interleave picks by zone, carrier cutoff, and priority to maximise picker productivity.' },
    { icon: '📡', title: 'Real-Time Floor Tracking', subtitle: 'VISIBILITY',        description: 'Live dashboard of every order, picker, and bin — updated every 30 seconds from your scanners.' },
    { icon: '🔄', title: 'Returns Processing',       subtitle: 'REVERSE LOGISTICS', description: 'Structured returns workflow with grading, restocking, and customer notification built in.' },
    { icon: '📦', title: 'Multi-Carrier Dispatch',   subtitle: 'SHIPPING',          description: 'Auto-select the cheapest or fastest carrier per order and print labels in one click.' },
    { icon: '🔗', title: 'ERP & OMS Integration',   subtitle: 'CONNECTIVITY',      description: 'Bi-directional sync with SAP, Oracle, and your OMS — inventory is always in sync.' },
  ],
  faq: [
    { question: 'Does Polluxa WMS work with RF scanners and barcode hardware?', answer: 'Yes — we support standard RF scanners, barcode printers, and weigh scales out of the box. No proprietary hardware required. Most warehouse teams are scanning live within 48 hours of go-live.' },
    { question: 'Can it manage multiple warehouses?', answer: 'Yes — you can manage unlimited warehouse locations from one control centre, each with its own zones, carriers, bin configurations, and fulfilment rules.' },
    { question: 'How long does implementation take?', answer: 'Most operations are live in 30 days. Our team handles floor mapping, bin labelling, integration setup, and picker training. Complex multi-site setups run in 45–60 days.' },
    { question: 'Does it support 3PL operations?', answer: 'Yes — 3PL mode adds client-level inventory segregation, billing reports, branded packing slips, and client portal access so your customers can view their own stock levels.' },
    { question: 'What inventory methods does Polluxa WMS support?', answer: 'FIFO, FEFO, LIFO, and LEFO are all supported at the bin level. You can assign different inventory methods to different product categories or clients within the same warehouse.' },
    { question: 'How does the wave planning feature work?', answer: 'The system groups open orders into waves based on carrier cutoffs, pick zones, and order priority. Each wave is optimised to minimise picker travel distance and maximise throughput.' },
    { question: 'Can I integrate my existing ERP with Polluxa WMS?', answer: 'Yes — we offer pre-built connectors for SAP, Oracle NetSuite, Microsoft Dynamics, and Tally. A full REST API and webhook system support any custom ERP integration.' },
    { question: 'What happens if the internet goes down in the warehouse?', answer: 'The WMS operates in offline mode using local caching on scanner devices. All scans are queued and synced automatically when connectivity is restored — no picks are lost.' },
    { question: 'Does Polluxa WMS support lot and serial number tracking?', answer: 'Yes — lot, batch, and serial number tracking are built in at the item level. Full GS1 barcode support is included for regulated industries like pharma and electronics.' },
    { question: 'How does the slotting optimisation algorithm work?', answer: 'Our AI analyses your historical pick velocity, SKU dimensions, weight, and co-pick frequency to recommend the optimal bin location for each SKU. Slotting reviews run automatically on a weekly schedule.' },
    { question: 'Can warehouse managers set custom alerts and thresholds?', answer: 'Yes — managers can configure alerts for low stock, delayed orders, pick accuracy drops, equipment idle time, and any custom KPI. Alerts are delivered by email, SMS, or in-app notification.' },
    { question: 'Is there a mobile app for warehouse supervisors?', answer: 'Yes — the Polluxa WMS mobile app gives supervisors a live floor view, order queue status, picker productivity scores, and the ability to re-prioritise orders on the fly from their phone.' },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers for collections with multiple entries (no slug — upsert by name)
// ─────────────────────────────────────────────────────────────────────────────
async function upsertByName(collection, data) {
  /* Prefer slug for dedup when available — prevents duplicate entries across runs */
  const filterKey = data.slug ? 'slug' : 'name';
  const filterVal = data.slug ? data.slug : data.name;
  const findRes = await fetch(
    `${API_URL}/api/${collection}?filters[${filterKey}][$eq]=${encodeURIComponent(filterVal)}`,
    { headers: HEADERS }
  );
  const findJson = await findRes.json();
  const existing = findJson?.data?.[0];

  if (existing) {
    const putRes = await fetch(`${API_URL}/api/${collection}/${existing.id}`, {
      method: 'PUT', headers: HEADERS, body: JSON.stringify({ data }),
    });
    const j = await putRes.json();
    if (!putRes.ok) console.error(`❌  ${collection} PUT:`, j?.error?.message);
    else console.log(`  ✓ ${collection} "${data.name}" → updated id ${j.data?.id}`);
  } else {
    const postRes = await fetch(`${API_URL}/api/${collection}`, {
      method: 'POST', headers: HEADERS, body: JSON.stringify({ data }),
    });
    const j = await postRes.json();
    if (!postRes.ok) console.error(`❌  ${collection} POST:`, j?.error?.message);
    else console.log(`  ✓ ${collection} "${data.name}" → created id ${j.data?.id}`);
  }
}

async function seedMany(collection, items) {
  console.log(`\nSeeding ${collection}…`);
  for (const item of items) await upsertByName(collection, item);
}

// ─────────────────────────────────────────────────────────────────────────────
// Customer Logos  (Homepage social-proof strip + Customers page)
// _img = CDN filename to download and upload to local Strapi
// ─────────────────────────────────────────────────────────────────────────────
const CUSTOMER_LOGOS = [
  { name: 'PharmEasy',   sort_order: 1, _img: 'pharmeasy_black_8fea5f0cf2.png',        _field: 'logo' },
  { name: 'TeaBox',      sort_order: 2, _img: 'teabox_black_31deff66ac.png',           _field: 'logo' },
  { name: 'Pepperfry',   sort_order: 3, _img: 'pepperfry_black_686e0289ef.png',        _field: 'logo' },
  { name: 'Lucrin',      sort_order: 4, _img: 'lucrin_black_32143e475c.png',           _field: 'logo' },
  { name: 'Licious',     sort_order: 5, _img: 'licious_black_4af377d8a1.png',          _field: 'logo' },
  { name: 'Liberty',     sort_order: 6, _img: 'liberty_black_f6729ea677.png',          _field: 'logo' },
  { name: 'New Balance', sort_order: 7, _img: 'svgviewer_output_8d5d7d5647.svg',       _field: 'logo' },
  { name: 'Allbirds',    sort_order: 8, _img: 'Union_a74a4966a3.svg',                  _field: 'logo' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Testimonials  (Homepage + Customers page)
// ─────────────────────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: 'Head of Technology, PharmEasy',
    company: 'PharmEasy',
    initials: 'PE',
    quote: 'The fastest-moving, most agile technology available is Polluxa. We\'ve discovered a lot of alignment, and the partnership ecosystem is strong. It\'s pleasant to work together to solve complex issues.',
    sort_order: 1,
    _img: 'Pharmeasy_1_2b2e7a5f85.svg',
    _field: 'avatar',
  },
  {
    name: 'VP Operations, New Balance',
    company: 'New Balance',
    initials: 'NB',
    quote: 'Partnering with Polluxa has been transformative for our organization. Polluxa PLM system is robust and has helped us immensely in having all our data and process in one place.',
    sort_order: 2,
    _img: 'svgviewer_output_8d5d7d5647.svg',
    _field: 'avatar',
  },
  {
    name: 'Director of E-commerce, Pepperfry',
    company: 'Pepperfry',
    initials: 'PF',
    quote: 'Polluxa Commerce handled our entire B2B and D2C stack from day one. The order routing intelligence alone saved us 18% on fulfilment costs in the first quarter.',
    sort_order: 3,
    _img: 'pepperfry_black_686e0289ef.png',
    _field: 'avatar',
  },
  {
    name: 'Supply Chain Lead, Licious',
    company: 'Licious',
    initials: 'LC',
    quote: 'With Polluxa WMS, our pick accuracy went from 98.2% to 99.97%. The wave planning feature is a game-changer for our same-day fulfilment promise.',
    sort_order: 4,
    _img: 'licious_black_4af377d8a1.png',
    _field: 'avatar',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Resources  (Homepage resource hub — Blog, Case Studies, White Papers, Events)
// ─────────────────────────────────────────────────────────────────────────────
const RESOURCES = [
  {
    name: 'The Agentic Enterprise: How AI is Reshaping B2B Commerce',
    title: 'The Agentic Enterprise: How AI is Reshaping B2B Commerce',
    description: 'A deep-dive into how autonomous agents are transforming the enterprise software stack — from CRM to fulfilment.',
    resource_type: 'White Paper',
    slug: 'agentic-enterprise-ai-b2b-commerce',
    sort_order: 1,
    _localImg: 'the-agentic-enterprise.svg',
    _field: 'image',
  },
  {
    name: 'How PharmEasy Scaled to 1,000 Daily Orders with Polluxa WMS',
    title: 'How PharmEasy Scaled to 1,000 Daily Orders with Polluxa WMS',
    description: 'PharmEasy reduced fulfilment errors by 94% and cut go-live time to 28 days with Polluxa WMS.',
    resource_type: 'Case Study',
    slug: 'pharmeasy-wms-case-study',
    sort_order: 2,
    _localImg: 'how-pharmeasy.svg',
    _field: 'image',
  },
  {
    name: 'Last-Mile Logistics Playbook for D2C Brands',
    title: 'Last-Mile Logistics Playbook for D2C Brands',
    description: 'Practical strategies for reducing NDR rates, cutting shipping costs, and improving customer NPS with smarter carrier selection.',
    resource_type: 'White Paper',
    slug: 'last-mile-logistics-playbook-d2c',
    sort_order: 3,
    _localImg: 'last-mile-logistics.svg',
    _field: 'image',
  },
  {
    name: 'Polluxa PLM in Practice: Fashion Industry Insights',
    title: 'Polluxa PLM in Practice: Fashion Industry Insights',
    description: 'Real lessons from 200+ fashion brands on cutting time-to-market, reducing rework, and managing seasonal complexity.',
    resource_type: 'Blog',
    slug: 'plm-fashion-industry-insights',
    sort_order: 4,
    _localImg: 'polluxa-plm.svg',
    _field: 'image',
  },
  {
    name: 'Polluxa Connect 2025 — Mumbai',
    title: 'Polluxa Connect 2025 — Mumbai',
    description: 'Join 500+ enterprise operators for a full day of product demos, customer panels, and networking at Polluxa Connect.',
    resource_type: 'Event',
    slug: 'polluxa-connect-2025-mumbai',
    sort_order: 5,
    _localImg: 'polluxa-connect.svg',
    _field: 'image',
  },
  {
    name: 'New Balance: Cutting Sample Rounds with Polluxa PLM',
    title: 'New Balance: Cutting Sample Rounds with Polluxa PLM',
    description: 'New Balance reduced sampling rounds by 60% and improved supplier on-time delivery from 71% to 94% using Polluxa PLM.',
    resource_type: 'Case Study',
    slug: 'new-balance-plm-case-study',
    sort_order: 6,
    _localImg: 'polluxa-plm-in-practice.svg',
    _field: 'image',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Industries  (Contact page → Industry dropdown)
// ─────────────────────────────────────────────────────────────────────────────
const INDUSTRIES = [
  { name: 'Fashion & Apparel',         slug: 'fashion-apparel',         sort_order: 1  },
  { name: 'Outdoor & Sports',          slug: 'outdoor-sports',          sort_order: 2  },
  { name: 'Multi-Category Retail',     slug: 'multi-category-retail',   sort_order: 3  },
  { name: 'Home & Furniture',          slug: 'home-furniture',          sort_order: 4  },
  { name: 'Food & Beverage',           slug: 'food-beverage',           sort_order: 5  },
  { name: 'Consumer Goods',            slug: 'consumer-goods',          sort_order: 6  },
  { name: 'Cosmetics & Personal Care', slug: 'cosmetics-personal-care', sort_order: 7  },
  { name: 'Consumer Electronics',      slug: 'consumer-electronics',    sort_order: 8  },
  { name: 'Manufacturing',             slug: 'manufacturing',           sort_order: 9  },
  { name: 'B2B / SaaS',               slug: 'b2b-saas',                sort_order: 10 },
  { name: 'Healthcare & Pharma',       slug: 'healthcare-pharma',       sort_order: 11 },
  { name: 'Logistics & Supply Chain',  slug: 'logistics-supply-chain',  sort_order: 12 },
  { name: 'Other',                     slug: 'other',                   sort_order: 13 },
];

// ─────────────────────────────────────────────────────────────────────────────
// Products  (Contact page → Interest dropdown + Homepage product grid)
// ─────────────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { name: 'CRM',                          sort_order: 1,  slug: 'crm',              description: 'SaaS-based Sales CRM — manage leads, close deals faster, grow revenue.',                               link: '/crm',              _img: 'CRM_Hero_e5ad565773.png',              _field: 'image' },
  { name: 'Commerce',                     sort_order: 2,  slug: 'commerce',         description: 'Improve customer relations, optimize supply chain and B2B transactions.',                               link: '/commerce',         _img: 'commerce_product_f842a84de8.svg',      _field: 'image' },
  { name: 'Creator Commerce',             sort_order: 3,  slug: 'creator-commerce', description: 'Empower creators and influencers to launch and scale e-commerce brands.',                               link: '/creator-commerce', _img: 'creator_commerce_cd10655065.png',      _field: 'image' },
  { name: 'Product Lifecycle Management', sort_order: 4,  slug: 'plm',              description: 'Reduce costs and time to market. Improve collaboration across teams.',                                  link: '/plm',              _img: 'plm_ea9d91b20c.png',                   _field: 'image' },
  { name: 'Logistics',                    sort_order: 5,  slug: 'logistics',        description: 'Last-mile delivery services via a robust network of hubs and couriers.',                                link: '/logistics',        _img: 'logistics_33a5dbc39c.png',             _field: 'image' },
  { name: 'Warehouse Management System',  sort_order: 6,  slug: 'wms',              description: 'Increase fulfilment rates and streamline warehouse operations.',                                        link: '/wms',              _img: 'wms_eec370d569.png',                   _field: 'image' },
];

// ─────────────────────────────────────────────────────────────────────────────
// seedManyWithImages — uploads image first, then upserts the entry
// ─────────────────────────────────────────────────────────────────────────────
async function seedManyWithImages(collection, items) {
  console.log(`\nSeeding ${collection} (with images)…`);
  for (const item of items) {
    const { _img, _localImg, _field, ...data } = item;
    if (_field) {
      const mediaId = _localImg
        ? await uploadFromLocal(_localImg)
        : _img ? await uploadFromUrl(_img) : null;
      if (mediaId) data[_field] = mediaId;
    }
    await upsertByName(collection, data);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Run
// ─────────────────────────────────────────────────────────────────────────────
(async () => {
  console.log(`\nSeeding Strapi at ${API_URL}…\n`);

  await upsert('crms',              CRM_DATA);
  await upsert('commerces',         COMMERCE_DATA);
  await upsert('plms',              PLM_DATA);
  await upsert('creator-commerces', CREATOR_COMMERCE_DATA);
  await upsert('logistics',         LOGISTICS_DATA);
  await upsert('wmss',              WMS_DATA);

  await seedMany('industries',    INDUSTRIES);
  await seedManyWithImages('products', PRODUCTS);

  await seedManyWithImages('customer-logos', CUSTOMER_LOGOS);
  await seedManyWithImages('testimonials',   TESTIMONIALS);
  await seedManyWithImages('resources',      RESOURCES);

  console.log('\nDone. Refresh the frontend to see all sections populated.');
})();
