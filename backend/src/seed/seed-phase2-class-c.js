'use strict';

/* ═══════════════════════════════════════════════════════
   PHASE 2 — CLASS C MIGRATION
   16 pages that were 100% hardcoded JSX with no Strapi backing
   at all: the 8 Capabilities pages, the 4 Channels pages, the
   3 Modules pages (Sales/Data/HelpDesk — using fresh `page`
   entries rather than the mismatched salescrm/dlm content
   types), and Terms.

   Every field below is the real copy extracted from the
   original .jsx files — nothing is placeholder or lorem ipsum.
   Idempotent: skips any slug that already has a `page` entry.
═══════════════════════════════════════════════════════ */

const { richTextSection } = require('./lib/rich-text-blocks');

const NOW = new Date().toISOString();
const DEMO_URL = 'https://sales.polluxa.com/';

const hero = ({ eyebrow, title, description, ctaLabel = 'Get started free', ctaUrl = DEMO_URL, secondaryLabel = 'Book a demo', secondaryUrl = '/contact' }) => ({
  __component: 'sections.hero',
  title,
  description,
  subHeading: eyebrow,
  bgColor: '#0A0A0F',
  buttons: [
    { url: ctaUrl, text: ctaLabel, type: 'primary', newTab: false },
    { url: secondaryUrl, text: secondaryLabel, type: 'secondary', newTab: false },
  ],
});

const keyStats = (title, pairs, variant = 'vertical') => ({
  __component: 'sections.key-stats',
  title,
  variant,
  keys: pairs.map(([value, label]) => ({ title: value, description: label })),
});

const featureGrid = (heading, items, columns = 'threeColumn') => ({
  __component: 'sections.features',
  heading,
  variant: 'card',
  columns,
  enable: true,
  feature: items.map(([icon, title, description, subtitle]) => ({
    title: icon ? `${icon} ${title}`.trim() : title,
    subtitle: subtitle || undefined,
    description,
  })),
});

const statFeed = (title, rows) => ({
  __component: 'sections.stat-feed',
  title,
  rows: rows.map(([icon, rTitle, subtitle, badge, badgeVariant]) => ({ icon, title: rTitle, subtitle, badge, badgeVariant: badgeVariant || 'default' })),
});

const processSteps = (title, steps) => ({
  __component: 'sections.process-steps',
  title,
  steps: steps.map(([icon, sTitle, description]) => ({ icon, title: sTitle, description })),
});

const dataPanel = (title, badge, rows) => ({
  __component: 'sections.data-panel',
  title,
  badge,
  rows: rows.map(([label, value, highlight]) => ({ label, value, highlight: Boolean(highlight) })),
});

const bottomActions = (title, description, ctaLabel = 'Get started free', ctaUrl = DEMO_URL) => ({
  __component: 'sections.bottom-actions',
  title,
  description,
  buttons: [{ url: ctaUrl, text: ctaLabel, type: 'primary', newTab: false }],
});

/* ─────────────────────────────────────────────────────────
   PAGE DEFINITIONS
───────────────────────────────────────────────────────── */
const PAGES = [
  /* ═══ Capabilities ═══ */
  {
    slug: 'tam-canvas',
    shortName: 'TAM Canvas',
    metaDescription: 'Your buyers, found, scored and worked in one canvas. Stop searching. Start scoring. From signup to a fully scored TAM in under 24 hours.',
    sections: [
      hero({ eyebrow: 'TAM Canvas ★', title: 'Your buyers, found, scored and worked in one canvas.', description: 'Stop searching. Start scoring. From signup to a fully scored TAM in under 24 hours.', ctaLabel: 'Build my TAM — Free' }),
      keyStats('By the numbers', [['24h', 'Signup to scored TAM'], ['5M+', 'Verified contacts'], ['42', 'Live intent sources'], ['$4.2M', 'Pipeline value tracked']], 'horizontal'),
      dataPanel('TAM Canvas · My ICP', 'Live', [['Total TAM', '6,840'], ['Hot accounts', '224'], ['In sequence', '1,180'], ['Pipeline', '$4.2M']]),
      featureGrid('The four-layer stack.', [
        ['🧠', 'Brain', 'Knowledge graph, reasoning, memory — the foundation everything runs on.'],
        ['🎯', 'ICP', 'Your versioned buyer definition. The contract that drives every score.'],
        ['🔍', 'Find Lead', 'Natural-language prospecting as the front door to discovery.'],
        ['🗺️', 'TAM', 'The materialized, scored account universe — always live, always ranked.'],
      ], 'fourColumn'),
      bottomActions('Ready to build your TAM?', 'From signup to first scored TAM in under 24 hours. Free to start.', 'Build my TAM — Free'),
    ],
  },
  {
    slug: 'find-lead',
    shortName: 'Find Lead',
    metaDescription: 'Turn a conversational brief into a ranked pipeline of buyers. Search across 5M+ verified profiles while monitoring 42 live intent signals.',
    sections: [
      hero({ eyebrow: 'Find Lead', title: 'Agentic prospecting. Natural language to pipeline.', description: 'Turn a conversational brief into a ranked pipeline of buyers. Search across 5M+ verified profiles while monitoring 42 live intent signals.', ctaLabel: 'Start prospecting free' }),
      keyStats('By the numbers', [['5M+', 'Verified contacts'], ['42', 'Live intent sources'], ['98.6%', 'Email deliverability']]),
      statFeed('"B2B SaaS CMOs in Riyadh raising Series A"', [
        [null, 'Sarah Al-Rashidi', 'CMO · Riyadh · Series A · $8M raised', '94', 'hot'],
        [null, 'Mohammed Khalid', 'VP Marketing · Jeddah · Series A · $12M raised', '91', 'hot'],
        [null, 'Fatima Nour', 'Chief Marketing Officer · Riyadh · Series B · $22M raised', '88', 'warm'],
      ]),
      featureGrid('Four core capabilities.', [
        ['🗣️', 'Natural-Language Search', 'Type a brief like "B2B SaaS CMOs in Riyadh raising Series A" — no filters, no boolean strings.'],
        ['⚡', 'Live Intent Signals', '42 signal sources: hiring spikes, funding rounds, leadership changes, tech stack shifts — ranked by freshness.'],
        ['🎯', 'Agentic Lead Scoring', 'Fit + intent + timing combined into explainable 0–100 scores with full audit trails.'],
        ['🔗', 'One-Click Sync', 'Push to Polluxa CRM, HubSpot, Salesforce, or Pipedrive in one click. SOC-2, GDPR, PDPL compliant.'],
      ], 'fourColumn'),
      bottomActions('Start prospecting in minutes.', 'Free for 3 years. No credit card required.', 'Get started free'),
    ],
  },
  {
    slug: 'signal-aggregation',
    shortName: 'Signal Aggregation',
    metaDescription: 'Polluxa tracks 42 signal sources that predict buying intent, deduplicating and ranking leads in real time by freshest, highest-fit signals.',
    sections: [
      hero({ eyebrow: 'Signal Aggregation', title: '42 intent signals. Ranked before your team wakes up.', description: 'Polluxa tracks 42 signal sources that predict buying intent, deduplicating and ranking leads in real time by freshest, highest-fit signals.', ctaLabel: 'Activate signals' }),
      keyStats('By the numbers', [['42', 'Signal sources'], ['<90s', 'Signal-to-CRM latency'], ['3.4×', 'Higher reply rate'], ['318', 'Duplicates auto-merged']], 'horizontal'),
      featureGrid('Eight signal categories.', [
        ['📢', 'Hiring Signals', '9 feeds covering 18M jobs — growth, role types, tech stack hiring.'],
        ['💰', 'Funding Events', '6 feeds with daily updates — Series A through IPO.'],
        ['🌐', 'Web Visitor Intent', 'De-anonymized visits and page tracking — who visited /pricing.'],
        ['⚙️', 'Tech-Stack Shifts', '4,200+ stacks monitored for new installs and removals.'],
        ['🏢', 'Office & Geo Moves', 'Expansion tracking via filings and press.'],
        ['💼', 'LinkedIn Activity', 'Posts, comments, engagement from target accounts.'],
        ['👤', 'Job Changes', 'Daily promotions and transitions — champion moves.'],
        ['📰', 'News & PR', '1,200+ source coverage — launches, partnerships, wins.'],
      ], 'fourColumn'),
      statFeed('Live signal feed', [
        ['💰', 'Acme Corp raised $12M Series A', 'Funding · 2h ago', '94', 'hot'],
        ['📢', 'TechFlow hiring 4 SDRs in Dubai', 'Hiring · 3h ago', '88', 'hot'],
        ['🌐', 'Nexus visited /pricing · 3 pages', 'Web intent · 15m ago', '91', 'hot'],
        ['👤', 'Ahmed Al-Farsi promoted to VP Sales at Orbit', 'Job change · 1h ago', '85', 'warm'],
      ]),
      bottomActions('Never miss a buying signal again.', 'Free for 3 years. Signals live in under 90 seconds.', 'Activate signals free'),
    ],
  },
  {
    slug: 'contact-enrichment',
    shortName: 'Contact Enrichment',
    metaDescription: 'Drop a name, email, or both. Get back triple-verified emails, mobile numbers, titles, and firmographics — refreshed every 24h.',
    sections: [
      hero({ eyebrow: 'Contact Enrichment', title: 'One name in. 12+ verified fields out.', description: 'Drop a name, email, or both. Get back triple-verified emails, mobile numbers, titles, and firmographics — refreshed every 24h.', ctaLabel: 'Enrich free' }),
      keyStats('By the numbers', [['12+', 'Fields per contact'], ['98.6%', 'Email deliverability'], ['<2s', 'Processing time']]),
      dataPanel('Enrichment demo', null, [
        ['INPUT', 'sarah@acmecorp.com'],
        ['OUTPUT · 12 fields enriched', 'Sarah Al-Rashidi · CMO', true],
        ['Title', 'Chief Marketing Officer'],
        ['Company', 'Acme Corp · Series A'],
        ['Mobile', '+971 50 xxx xxxx ✓'],
        ['LinkedIn', 'linkedin.com/in/sarah-ar'],
        ['Industry', 'B2B SaaS'],
        ['Revenue', '$5M–$10M ARR'],
      ]),
      featureGrid('Six enrichment layers.', [
        ['✉️', 'Email Verification', 'Three-stage: syntax check → MX record → mailbox ping with bounce flagging.'],
        ['📱', 'Mobile Validation', 'Real-time carrier check confirms the number is active and WhatsApp Business eligible — globally.'],
        ['🏢', 'Firmographics', '24+ fields: industry, revenue, funding stage, tech stack, geography — normalized.'],
        ['🗺️', 'Org Mapping', 'Identifies decision-makers with relationship strength scoring across buying committees.'],
        ['🔄', 'Daily Refresh', 'Records re-checked every 24h for job changes, title updates, and company transitions.'],
        ['🔌', 'Integrations', 'Native CRM, REST API, webhooks. HubSpot, Salesforce, Snowflake connectors built in.'],
      ]),
      bottomActions('Stop emailing dead inboxes.', 'Free for 3 years. No credit card required.', 'Enrich contacts free'),
    ],
  },
  {
    slug: 'funding-detection',
    shortName: 'Funding Detection',
    metaDescription: 'Catch every Series-A through IPO within hours. Ranked by ICP fit, with the buying committee mapped and outbound drafts ready to send.',
    sections: [
      hero({ eyebrow: 'Funding Detection', title: 'Catch every Series-A through IPO within hours.', description: 'Ranked by ICP fit, with the buying committee mapped and outbound drafts ready to send — before your competitors even see the news.', ctaLabel: 'Activate funding alerts' }),
      keyStats('By the numbers', [['1,400+', 'Rounds tracked monthly'], ['< 6h', 'From filing to alert'], ['12.4×', 'Higher reply rate vs cold']]),
      statFeed('Live funding alerts', [
        [null, 'Nexus Technologies', 'Series A · $14M · Dubai · B2B SaaS', '96', 'hot'],
        [null, 'FreshSouk', 'Series B · $28M · Riyadh · F&B', '89', 'hot'],
        [null, 'Orbit Payments', 'Seed · $3M · Cairo · Fintech', '76', 'warm'],
      ]),
      featureGrid('Six core capabilities.', [
        ['📡', '6 Feeds, Unified', 'Crunchbase, Pitchbook, TASE, public filings, press releases, and regulatory data — one stream.'],
        ['🎯', 'ICP Fit Scoring', 'Every round scored against your ICP — industry, geography, stage, size.'],
        ['👥', 'Buying Committee Mapping', 'CEO, CFO, COO, VP Sales identified with verified contact details ready to sequence.'],
        ['🚀', 'Outbound Triggers', 'Auto-generates congratulatory emails, WhatsApp, and LinkedIn touchpoints per round.'],
        ['🌍', 'Geo & Sector Filters', 'MENA-focused with strongest coverage in UAE, KSA, Egypt, and GCC.'],
        ['📈', 'Stage Tracking', 'Pre-seed through IPO. Every stage, every region, every announcement.'],
      ]),
      bottomActions('Be first. Every time.', 'Free for 3 years · Wired to Outreach & Agents.', 'Activate funding alerts'),
    ],
  },
  {
    slug: 'outreach',
    shortName: 'Outreach',
    metaDescription: 'Multi-channel sequences with inbox-aware sending, AI personalization at the line level, and live deliverability tracking — built in.',
    sections: [
      hero({ eyebrow: 'Outreach', title: 'Email · WhatsApp · LinkedIn. One canvas.', description: 'Multi-channel sequences with inbox-aware sending, AI personalization at the line level, and live deliverability tracking — built in.', ctaLabel: 'Run your first sequence' }),
      keyStats('By the numbers', [['14.2%', 'Avg reply rate'], ['98.6%', 'Deliverability'], ['38%', 'LinkedIn accept rate'], ['62%', 'Open rate']], 'horizontal'),
      featureGrid('Every channel. One sequence builder.', [
        ['✉️', 'Email Sequences', 'Domain warm-up, per-mailbox throttling, SPF/DKIM/DMARC monitoring, spam-score checks before every send.'],
        ['💬', 'WhatsApp', 'Native Business API with templates, media, location sharing, two-way replies, and opt-in management.'],
        ['💼', 'LinkedIn', 'Connect, comment, DM — soft pre-touches before cold email to increase accept and reply rates.'],
        ['🤖', 'AI Personalization', 'Line-level rewriting customizes openers using company data, role signals, and CRM history.'],
        ['🧪', 'A/B Testing', 'Live, statistical testing of subject lines, hooks, CTAs, and channels with mid-run winner selection.'],
        ['📊', 'Reply Routing', 'Auto-classifies responses: interested, objection, unsubscribe, OOO — routes each appropriately.'],
      ]),
      bottomActions('Start sequencing in 30 minutes.', 'Free for 3 years. No credit card required.', 'Run your first sequence'),
    ],
  },
  {
    slug: 'ai-workflows',
    shortName: 'AI Workflows',
    metaDescription: 'A no-code agentic canvas that runs on the Polluxa graph. 50+ pre-built recipes, 200+ tool connectors, zero lines of code required.',
    sections: [
      hero({ eyebrow: 'AI Workflows', title: 'Build your own autonomous agents.', description: 'A no-code agentic canvas that runs on the Polluxa graph. 50+ pre-built recipes, 200+ tool connectors, zero lines of code required.', ctaLabel: 'Open the canvas', secondaryLabel: 'Book a solutions call' }),
      keyStats('By the numbers', [['50+', 'Pre-built recipes'], ['0', 'Lines of code required'], ['200+', 'Tool connectors']]),
      processSteps('Example: Re-engage closed-lost', [
        ['⚡', 'Trigger', 'Funding detected for closed-lost account'],
        ['🔍', 'Research', 'Fetch funding details and context'],
        ['👤', 'Retrieve', 'Pull CRM champion and history'],
        ['🔀', 'Route', 'Email if active · LinkedIn if gone dark'],
        ['✍️', 'Draft', 'Personalized congratulatory outreach'],
        ['✅', 'Approve', 'Human approves before send'],
      ]),
      featureGrid('Agentic primitives.', [
        ['⚡', 'Triggers', 'Events, schedules, webhooks — any signal starts an agent.'],
        ['🧠', 'AI Reasoning Steps', 'LLM + tools reasoning at each step, with full context from the Polluxa graph.'],
        ['📝', 'CRM Reads & Writes', 'Read deals, contacts, accounts. Write notes, tasks, updates — natively.'],
        ['🔀', 'Branches & Loops', 'Conditional logic and loops for complex multi-step workflows.'],
        ['👤', 'Human-in-the-Loop', 'Pause for human approval before high-stakes actions.'],
        ['🔌', '200+ Connectors', 'Slack, HubSpot, Salesforce, Notion, Google Sheets, Zapier, and more.'],
      ]),
      bottomActions('Build agents that work the way you do.', 'Browse 50+ recipes or start from scratch. Free for 3 years.', 'Open AI Workflows'),
    ],
  },
  {
    slug: 'chats',
    shortName: 'Chats',
    metaDescription: 'Deploy conversational AI agents that work every lead in your pipeline around the clock, without a rep lifting a finger.',
    sections: [
      hero({ eyebrow: 'Chats · Autonomous Sales Agents', title: 'Agents that prospect, qualify, and follow up — 24/7.', description: 'Deploy conversational AI agents that work every lead in your pipeline around the clock, without a rep lifting a finger.', ctaLabel: 'Deploy an agent free' }),
      keyStats('By the numbers', [['24/7', 'Always-on coverage'], ['<30s', 'Median first reply'], ['3.4×', 'More qualified meetings']]),
      dataPanel('Live conversation', null, [
        ['Lead', 'Just checking out pricing — is there a free tier?'],
        ['Agent', "Yes — every module starts free. Want me to set up a quick walkthrough with a specialist this week?", true],
        ['Lead', 'Sure, Thursday afternoon works.'],
        ['Agent', 'Booked for Thursday 3pm. Sending a calendar invite now.', true],
      ]),
      featureGrid('Four core capabilities.', [
        ['🤖', 'Autonomous Qualification', 'Agents ask discovery questions, score fit and intent, and route only sales-ready leads to reps.'],
        ['⚡', 'Instant Response', 'Every inbound message gets a reply in seconds, day or night, across web chat, WhatsApp and email.'],
        ['📅', 'Self-Service Booking', 'Agents check rep calendars and book meetings directly — no back-and-forth, no dropped leads.'],
        ['🔗', 'Full CRM Sync', 'Every conversation, score, and booked meeting lands in Polluxa CRM automatically, with full transcripts.'],
      ], 'fourColumn'),
      bottomActions('Let an agent take the first shift.', 'Free for 3 years. No credit card required.', 'Get started free'),
    ],
  },

  /* ═══ Channels ═══ */
  {
    slug: 'linkedin-outreach',
    shortName: 'LinkedIn Outreach',
    metaDescription: 'The most effective LinkedIn engine on the market. Profile-safe connection sequences, AI-personalized DMs, social-selling pre-touches.',
    sections: [
      hero({ eyebrow: '★ LinkedIn Outreach · #1 Channel', title: 'LinkedIn outreach that actually converts.', description: 'The most effective LinkedIn engine on the market. Profile-safe connection sequences, AI-personalized DMs, social-selling pre-touches and intent triggers powered by Luna Kelper.', ctaLabel: 'Launch your LinkedIn engine' }),
      keyStats('By the numbers', [['38%', 'Accept rate'], ['14%', 'Reply rate'], ['4.2×', 'vs SDR-only'], ['0', 'Profile flags (2yr)'], ['9,400', 'Active profiles']], 'horizontal'),
      featureGrid('Six LinkedIn capabilities.', [
        ['🤝', 'Connection Sequences', 'Personalized at scale — AI writes each note using company signals, shared connections, and role context.'],
        ['💬', 'DM & InMail Journeys', 'Threaded, intent-aware — continues the conversation based on what they clicked, viewed, or posted.'],
        ['👍', 'Social Selling', 'Pre-touch with likes, comments, and views before any connection request — warms the account up.'],
        ['⚡', 'Intent Detection', 'Powered by Luna Kelper — tracks when targets post about pain points or engage with competitors.'],
        ['🛡️', 'Profile-Safe Limits', 'Per-account, per-day throttling that mirrors human behavior. Zero flags across 9,400 active profiles.'],
        ['📥', 'Multi-Account Inbox', 'Team-level orchestration — all inboxes, all accounts, one unified reply interface.'],
      ]),
      bottomActions('Set up your LinkedIn engine in 30 minutes.', 'Free for 3 years. Zero profile flags guaranteed.', 'Launch LinkedIn engine'),
    ],
  },
  {
    slug: 'email-outreach',
    shortName: 'Email Outreach',
    metaDescription: 'Inbox-aware sending, domain warm-up, AI personalization and reply routing — built so your emails land, get opened, and get replied to.',
    sections: [
      hero({ eyebrow: 'Email Outreach · Deliverability', title: '98.6% deliverability. Inbox every time.', description: 'Inbox-aware sending, domain warm-up, AI personalization and reply routing — built so your emails land, get opened, and get replied to.', ctaLabel: 'Run your first sequence', secondaryLabel: 'Talk to deliverability team' }),
      keyStats('By the numbers', [['98.6%', 'Deliverability'], ['14.2%', 'Reply rate'], ['0.4%', 'Spam complaint rate'], ['62%', 'Open rate']], 'horizontal'),
      featureGrid('Six deliverability layers.', [
        ['📡', 'Inbox-Aware Sending', 'Per-mailbox throttling with dynamic send rates based on reputation and timezone-aware delivery.'],
        ['🔥', 'Domain Warm-Up', 'Automatic warm-up across 6+ domains monitoring SPF, DKIM, and DMARC signals continuously.'],
        ['🤖', 'AI Personalization', 'Line-level rewriting customizes each opener using recipient role, company signals, and CRM history.'],
        ['🧪', 'A/B/n Testing', 'Live statistical testing for subjects, hooks, CTAs, and send times with mid-run winner selection.'],
        ['🔀', 'Reply Routing', 'Auto-classifies responses — interested, objection, unsubscribe, OOO — routes to the right rep.'],
        ['📊', 'Inbox Placement Monitor', 'Real-time seed-list checks across Gmail, Outlook, and Apple Mail. Auto-pauses if placement declines.'],
      ]),
      dataPanel('Campaign example · Q2 MENA', null, [
        ['Subject variant A', '12.8% reply'],
        ['Subject variant B', '18.4% reply'],
        ['Subject variant C — winner', '21.2% reply'],
        ['Total pipeline generated', '$486K', true],
      ]),
      bottomActions('Start sending with confidence.', 'Free for 3 years. No credit card required.', 'Run first sequence free'),
    ],
  },
  {
    slug: 'whatsapp',
    shortName: 'WhatsApp',
    metaDescription: 'Two-way conversations, opt-in management and intent-aware journeys — directly inside your Polluxa workspace. No middleware, no markup.',
    sections: [
      hero({ eyebrow: 'WhatsApp · Conversational', title: '72% open rate. Native Business API.', description: 'Two-way conversations, opt-in management and intent-aware journeys — directly inside your Polluxa workspace. No middleware, no markup.', ctaLabel: 'Connect WhatsApp', secondaryLabel: 'Book a setup call' }),
      keyStats('By the numbers', [['72%', 'Open rate'], ['22%', 'Reply rate'], ['<2 min', 'First response'], ['99.4%', 'Template approval'], ['0', 'Numbers blocked (12mo)']], 'horizontal'),
      featureGrid('Six WhatsApp capabilities.', [
        ['🔗', 'Native Business API', 'Direct WhatsApp integration — no middleware, no markup, no extra cost per message.'],
        ['📋', 'Template Manager', 'Meta-approved template builder with approval workflows and variable validation built in.'],
        ['💬', 'Two-Way Conversations', 'Unified inbox with AI summarization and intent classification — every conversation in context.'],
        ['🎵', 'Media Support', 'Voice notes, images, PDFs, videos, location — automatic transcription for voice messages.'],
        ['✅', 'Compliance Tools', 'Opt-in tracking, automatic STOP/HELP handling, audit trails for UAE, KSA, EU regulations.'],
        ['📊', 'Quality Score Monitor', 'Real-time tracking that auto-pauses sending to prevent throttling before it happens.'],
      ]),
      bottomActions('4,200 active senders. Zero numbers blocked.', 'Free for 3 years. Connect in minutes.', 'Connect WhatsApp free'),
    ],
  },
  {
    slug: 'meta-ads',
    shortName: 'Meta Ads',
    metaDescription: 'Campaign manager, lookalike audiences from your CRM, lead forms synced in under 5 seconds, and revenue attribution tied to closed-won deals.',
    sections: [
      hero({ eyebrow: 'Meta Ads · FB · IG · WA', title: 'Meta ads, wired straight to your pipeline.', description: 'Campaign manager, lookalike audiences from your CRM, lead forms synced in under 5 seconds, and revenue attribution tied to closed-won deals.', ctaLabel: 'Connect Meta', secondaryLabel: 'Book a session' }),
      keyStats('By the numbers', [['$84', 'CAC vs $142 industry avg'], ['3.2×', 'ROAS on warm audiences'], ['<5s', 'Lead form to CRM sync']]),
      featureGrid('Six Meta capabilities.', [
        ['📊', 'Campaign Manager', 'Create and manage Facebook, Instagram, and WhatsApp ads from a single unified interface.'],
        ['👥', 'Lookalike Audiences', 'Auto-pushes CRM segments to Meta with 24-hour refreshes — always fresh, always accurate.'],
        ['⚡', 'Instant Lead Sync', 'Forms populate CRM with enrichment in under 5 seconds. Zero manual export needed.'],
        ['💰', 'Revenue Attribution', 'Connects ad spend to closed-won deals — see true ROAS, not just MQL cost.'],
        ['🤖', 'AI Creative Suggestions', 'Analyzes top performers and proposes copy and creative variations automatically.'],
        ['💬', 'Click-to-WhatsApp Ads', 'Direct messaging integration — ad click opens a WhatsApp conversation with full CRM context.'],
      ]),
      bottomActions('Meta ads that know your CRM.', 'Connect in minutes. Free for 3 years.', 'Connect Meta free'),
    ],
  },

  /* ═══ Modules (fresh page entries — salescrm/dlm intentionally not reused, see Phase 2 notes) ═══ */
  {
    slug: 'sales',
    shortName: 'Sales',
    metaDescription: 'Lead scoring, team routing, message drafting, and follow-up management — keeping every deal moving without the manual overhead.',
    sections: [
      hero({ eyebrow: 'Sales', title: 'Your living pipeline. Nudged to close.', description: 'Lead scoring, team routing, message drafting, and follow-up management — keeping every deal moving without the manual overhead.' }),
      keyStats('By the numbers', [['3.4×', 'Faster deal velocity'], ['89%', 'Follow-ups on time'], ['11.4h', 'Saved per rep weekly']]),
      featureGrid('Six sales capabilities.', [
        ['🎯', 'Smart Lead Scoring', 'Scores leads 0–100 using fit, intent, and timing signals with automated nurturing for every tier.'],
        ['🔄', 'Fair Lead Rotation', 'Distributes leads equitably across reps, agencies, and agents via round-robin or weighted systems.'],
        ['✍️', 'AI-Drafted Follow-ups', 'Contextual messages generated with one-click send across email and WhatsApp.'],
        ['⏰', 'Tasks & Reminders', 'Assigns activities with escalation if missed — no deal falls through a crack.'],
        ['🏢', 'Multi-Org & Roles', 'Multiple organizations with data isolation and role-based access control.'],
        ['📱', 'Mobile-First', 'iOS and Android apps with offline mode and voice notes for field reps.'],
      ]),
      bottomActions('Accelerate every deal from new to closed-won.', 'Free for 3 years. No credit card required.', 'Accelerate sales free'),
    ],
  },
  {
    slug: 'data',
    shortName: 'Data',
    metaDescription: 'Verified, enriched, deduped. 5M+ contacts and 5M companies — triple-verified emails, mobiles, and firmographics refreshed every 24h.',
    sections: [
      hero({ eyebrow: 'Data', title: 'The truth layer underneath your CRM.', description: 'Verified, enriched, deduped. 5M+ contacts and 5M companies — triple-verified emails, mobiles, and firmographics refreshed every 24h.', ctaLabel: 'Get the data graph free' }),
      keyStats('By the numbers', [['5M+', 'Verified contacts'], ['5M', 'Companies'], ['98.6%', 'Deliverability'], ['12.4K', 'Records enriched/24h']], 'horizontal'),
      dataPanel('Data health · last 24h', 'Live', [['Records enriched', '12.4K'], ['Bounces prevented', '342'], ['Duplicates merged', '86']]),
      featureGrid('Three verification methods.', [
        ['✉️', 'SMTP Email Verification', 'Syntax check → MX record → mailbox ping. Bounces flagged before they hit your sender score.'],
        ['📱', 'HLR Mobile Checking', 'Real-time carrier lookup confirms numbers are active and WhatsApp Business eligible.'],
        ['💼', 'LinkedIn URL Matching', 'Cross-reference LinkedIn profiles to validate identity and enrich title and company data.'],
      ]),
      featureGrid('Geographic coverage.', [
        ['🇦🇪', 'UAE', '2.1M contacts · 84K companies'],
        ['🇸🇦', 'KSA', '3.4M contacts · 142K companies'],
        ['🇪🇬', 'Egypt', '1.8M contacts · 96K companies'],
        ['🌍', 'Global', '188M+ contacts · 18M+ companies'],
      ], 'fourColumn'),
      bottomActions('Get the verified, enriched contact graph your agents deserve.', 'Free for 3 years. No credit card required.', 'Explore data free'),
    ],
  },
  {
    slug: 'helpdesk',
    shortName: 'Help Desk',
    metaDescription: 'WhatsApp, email, and web chat — unified in one inbox with AI deflection, SLA management, and an adaptive knowledge base.',
    sections: [
      hero({ eyebrow: 'Help Desk', title: 'Support that feels like a conversation.', description: 'WhatsApp, email, and web chat — unified in one inbox with AI deflection, SLA management, and an adaptive knowledge base. Run support in the same workspace where you run sales.', ctaLabel: 'Run support on Polluxa', secondaryLabel: 'Talk to support team' }),
      keyStats('By the numbers', [['42%', 'Tickets auto-deflected'], ['2m 18s', 'Avg first response'], ['4.8/5', 'CSAT rating'], ['18.4h', 'Saved per agent weekly']], 'horizontal'),
      featureGrid('Six help desk modules.', [
        ['📥', 'Unified Inbox', 'All customer messages — WhatsApp, email, chat — routed to a single threaded interface with two-way replies from one composer.'],
        ['💬', 'Native WhatsApp', 'Two-way, business-grade support with templates, media, location, and automation capabilities.'],
        ['⏱️', 'SLA Engine', 'Per-segment timers with automatic escalation when response and resolution windows slip.'],
        ['🤖', 'AI Deflection', 'Answers FAQs, drafts replies, surfaces knowledge base articles — auto-resolving 30–50% of tickets.'],
        ['📚', 'Knowledge Base', 'Self-updating with public and internal versioning. Resolved tickets generate draft articles automatically.'],
        ['📊', 'CSAT & Analytics', 'Live dashboard: first response, resolution time, backlog, CSAT by agent, queue, and product line.'],
      ]),
      bottomActions('14 tickets auto-resolved by AI every hour.', 'Free for 3 years. No credit card required.', 'Open Help Desk free'),
    ],
  },

  /* ═══ Terms — full legal text, same pattern as Privacy ═══ */
  {
    slug: 'terms',
    shortName: 'Terms',
    metaDescription: 'Terms of Service for Polluxa Technologies Pvt Ltd — the terms governing use of the Polluxa enterprise software platform.',
    sections: [
      {
        __component: 'sections.hero',
        title: 'Terms of Service',
        description: 'Last updated: June 1, 2026',
        bgColor: '#0A0A0F',
      },
      richTextSection('1. Acceptance of Terms', [
        'By accessing or using the services provided by Polluxa Technologies Pvt Ltd ("Polluxa", "we", "us", or "our"), including our website at polluxa.com and all related software, tools, and services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Services.',
      ]),
      richTextSection('2. Description of Services', [
        'Polluxa provides an enterprise software platform including CRM, commerce management, product lifecycle management (PLM), logistics, warehouse management (WMS), and related agentic AI tools. The Services are provided on a subscription basis as described in the applicable order form or pricing page.',
      ]),
      richTextSection('3. Account Registration', [
        'To access certain features of the Services, you must register for an account. You agree to provide accurate, current and complete information during the registration process and to update such information to keep it accurate, current and complete. You are responsible for safeguarding your account credentials and for all activities that occur under your account.',
      ]),
      richTextSection('4. Acceptable Use', [
        'You agree not to:',
        { list: [
          'Use the Services in any way that violates applicable laws or regulations',
          'Transmit any material that is defamatory, offensive, or otherwise objectionable',
          'Attempt to gain unauthorised access to any portion of the Services or any related systems',
          'Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code of the Services',
          'Use the Services to send unsolicited communications (spam)',
          'Impersonate any person or entity or misrepresent your affiliation with any person or entity',
          'Interfere with or disrupt the integrity or performance of the Services',
        ] },
      ]),
      richTextSection('5. Intellectual Property', [
        'The Services and all content, features and functionality thereof, including but not limited to all information, software, text, displays, images, video and audio, and the design, selection and arrangement thereof, are owned by Polluxa, its licensors or other providers of such material and are protected by Indian and international copyright, trademark, patent, trade secret and other intellectual property laws.',
      ]),
      richTextSection('6. Customer Data', [
        'You retain all rights to data you input into the Services ("Customer Data"). You grant Polluxa a non-exclusive, worldwide licence to host, store, transfer, display, perform, reproduce, modify and distribute Customer Data solely as necessary to provide the Services to you. Polluxa will not access Customer Data except as required to provide the Services, comply with applicable law, or as otherwise authorised by you.',
      ]),
      richTextSection('7. Payment and Subscription', [
        "Subscription fees are due in advance based on the plan selected. All fees are non-refundable except as required by applicable law or as expressly set out in your order form. Polluxa reserves the right to modify pricing with 30 days' written notice. Your continued use of the Services after a price change constitutes acceptance of the new pricing.",
      ]),
      richTextSection('8. Termination', [
        'We may terminate or suspend your access to the Services immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Services will immediately cease. Within 30 days of termination, you may request an export of your Customer Data. After 30 days, we may delete Customer Data.',
      ]),
      richTextSection('9. Disclaimer of Warranties', [
        'THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. POLLUXA DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE.',
      ]),
      richTextSection('10. Limitation of Liability', [
        "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL POLLUXA BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OR INABILITY TO USE THE SERVICES. IN NO EVENT WILL POLLUXA'S TOTAL LIABILITY TO YOU EXCEED THE AMOUNTS PAID BY YOU TO POLLUXA IN THE 12 MONTHS PRECEDING THE CLAIM.",
      ]),
      richTextSection('11. Governing Law', [
        'These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. You agree to submit to the exclusive jurisdiction of the courts located in Bangalore, Karnataka, India for the resolution of any disputes arising out of or relating to these Terms or the Services.',
      ]),
      richTextSection('12. Changes to Terms', [
        "We reserve the right to modify these Terms at any time. We will provide at least 30 days' notice of material changes by posting the updated Terms on this page and, where appropriate, notifying you by email. Your continued use of the Services after the effective date of the updated Terms constitutes your acceptance of the changes.",
      ]),
      richTextSection('13. Contact', [
        'For questions about these Terms, please contact:',
        '**Polluxa Technologies Pvt Ltd**',
        '4th Floor, Manyata Tech Park, Hebbal, Bangalore 560045, India',
        'Email: legal@polluxa.com',
      ]),
    ],
  },
];

async function seedPhase2ClassC({ strapi }) {
  for (const def of PAGES) {
    const existing = await strapi.db.query('api::page.page').findOne({ where: { slug: def.slug } }).catch(() => null);
    if (existing) {
      strapi.log.info(`[seed-phase2-class-c] page "${def.slug}" already exists — skipping.`);
      continue;
    }

    const heroSection = def.sections.find((s) => s.__component === 'sections.hero');

    await strapi.entityService.create('api::page.page', {
      data: {
        shortName: def.shortName,
        slug: def.slug,
        heading: heroSection?.title,
        description: heroSection?.description,
        locale: 'en',
        seo: { metaTitle: `${def.shortName} — Polluxa`, metaDescription: def.metaDescription },
        contentSections: def.sections,
        publishedAt: NOW,
      },
    });
    strapi.log.info(`[seed-phase2-class-c] page "${def.slug}" created ✓ (${def.sections.length} sections)`);
  }

  strapi.log.info('[seed-phase2-class-c] ✅ Class C migration complete.');
}

module.exports = { seedPhase2ClassC };
