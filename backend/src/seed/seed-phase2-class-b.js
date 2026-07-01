'use strict';

/* ═══════════════════════════════════════════════════════
   PHASE 2 — CLASS B MIGRATION
   Pages that were hardcoded JSX but already had matching
   Strapi content (a `page` entry, or an unused content type):
   About, Privacy Policy, Marketing.

   Also renames 3 existing `page` slugs so they match the
   frontend's real URL paths exactly (about-us -> about,
   contact-us -> contact, privacy-policy -> privacy) — the
   same "slug matches URL, no redirect needed" rule used in
   Phase 1.

   Every step is idempotent: guarded by checking the current
   state before writing, so re-running after a manager has
   hand-edited these pages never clobbers their changes.
═══════════════════════════════════════════════════════ */

const { richTextSection } = require('./lib/rich-text-blocks');

async function renameSlugIfNeeded(strapi, uid, oldSlug, newSlug) {
  const alreadyRenamed = await strapi.db.query(uid).findOne({ where: { slug: newSlug } }).catch(() => null);
  if (alreadyRenamed) return alreadyRenamed;

  const existing = await strapi.db.query(uid).findOne({ where: { slug: oldSlug } }).catch(() => null);
  if (!existing) return null;

  await strapi.entityService.update(uid, existing.id, { data: { slug: newSlug } });
  strapi.log.info(`[seed-phase2-class-b] renamed ${uid} slug "${oldSlug}" -> "${newSlug}" ✓`);
  return strapi.db.query(uid).findOne({ where: { slug: newSlug } });
}

/* ── Contact: swap sections.internal-contact-form for the new sections.contact-form,
   using the hero copy from the old Contact.jsx. Same full-reconstruction pattern
   as About/Privacy — see their comments for why. ── */
async function enrichContactPage(strapi, pageId) {
  const current = await strapi.db.query('api::page.page').findOne({ where: { id: pageId }, populate: ['contentSections'] });
  const sections = current.contentSections ?? [];
  const alreadyMigrated = sections.some((s) => s.__component === 'sections.contact-form');
  if (alreadyMigrated) {
    strapi.log.info('[seed-phase2-class-b] contact page already migrated — skipping.');
    return;
  }

  const newHero = {
    __component: 'sections.hero',
    title: "Let's talk about your platform.",
    description: "Whether you're evaluating Polluxa, exploring partnership, hiring with us, or looking for help — fill the form below or pick the right channel. A real human answers.",
    subHeading: 'We respond within 1 business day',
    bgColor: '#0A0A0F',
  };

  const contactForm = {
    __component: 'sections.contact-form',
    title: 'Book a live demo',
    description: 'Tell us about your business. A solution architect for your industry will reach out within one business day.',
  };

  const originalBottomActions = {
    __component: 'sections.bottom-actions',
    title: 'Explore the platform first',
    description: 'Not ready for a demo? Read our case studies to see Polluxa in action.',
    buttons: [
      { url: '/case-studies', text: 'Read Case Studies', type: 'primary', newTab: false },
      { url: '/blog', text: 'Visit Our Blog', type: 'secondary', newTab: false },
    ],
  };

  await strapi.entityService.update('api::page.page', pageId, {
    data: { contentSections: [newHero, contactForm, originalBottomActions] },
  });
  strapi.log.info('[seed-phase2-class-b] contact page migrated to sections.contact-form ✓');
}

/* ── About: full desired contentSections, written in one shot ──
   NOTE: this deliberately does NOT fetch-then-patch the existing dynamic
   zone. `db.query`/`entityService` require an explicit deep populate to
   return dynamic-zone contents, and round-tripping partially-populated
   component data back into `update()` risks silently dropping nested
   media fields (Strapi replaces the whole zone on write). Safer to
   reconstruct the full known-good array from literal content — sourced
   from the same seed-pages.js hero/company/stats/CTA this page already
   had — and only write when the current section count shows it hasn't
   been enriched yet. This also makes it self-healing if it ever runs
   against a partially-written zone. */
async function enrichAboutPage(strapi, pageId) {
  const current = await strapi.db.query('api::page.page').findOne({ where: { id: pageId }, populate: ['contentSections'] });
  const currentCount = (current.contentSections ?? []).length;
  if (currentCount >= 6) {
    strapi.log.info('[seed-phase2-class-b] about page already enriched — skipping.');
    return;
  }

  const originalHero = {
    __component: 'sections.hero',
    title: 'We build software that moves the world',
    description: 'Polluxa is a global enterprise software company headquartered in Dubai, UAE. We empower manufacturers, retailers, and distributors to operate at their full potential.',
    bgColor: '#0A0A0F',
    buttons: [
      { url: '/contact', text: 'Get in Touch', type: 'primary', newTab: false },
      { url: '/careers', text: "We're Hiring", type: 'secondary', newTab: false },
    ],
  };

  const originalCompany = {
    __component: 'sections.company',
    title: 'Our mission',
    description: 'We believe every enterprise deserves world-class software. Our mission is to make the most advanced commercial technology accessible to every business on the planet.',
    enable: true,
    Bullets: [
      { Bullet: 'Founded in 2012 in Dubai, UAE' },
      { Bullet: 'Offices in Dubai, Netherlands, Prague, and Toronto' },
      { Bullet: '2,000+ enterprise customers across 38 countries' },
      { Bullet: '500+ employees worldwide' },
      { Bullet: '100% go-live rate since inception' },
    ],
  };

  const originalStats = {
    __component: 'sections.homepage-statistics',
    title: 'Polluxa by the numbers',
    description: 'Over a decade of enterprise software excellence.',
    facts: [
      { title: '2000+', subtitle: 'Enterprise Customers' },
      { title: '38', subtitle: 'Countries' },
      { title: '100%', subtitle: 'Go-Live Rate' },
      { title: '500+', subtitle: 'Employees' },
    ],
  };

  const originalBottomActions = {
    __component: 'sections.bottom-actions',
    title: 'Join the Polluxa team',
    description: 'We are always looking for exceptional people to join our global mission.',
    buttons: [
      { url: '/careers', text: 'View Open Roles', type: 'primary', newTab: false },
      { url: '/contact', text: 'Contact Us', type: 'secondary', newTab: false },
    ],
  };

  const ourStory = {
    __component: 'shared.rich-text',
    content: [
      { type: 'heading', level: 2, children: [{ type: 'text', text: 'Our Story' }] },
      { type: 'paragraph', children: [{ type: 'text', text: 'Polluxa was founded on a simple observation: every "modern" enterprise platform is still a filing cabinet. People do the work, software records what was done.' }] },
      { type: 'paragraph', children: [{ type: 'text', text: "We don't believe that's the right model for what's coming. The next generation of enterprise software will be coworker-shaped — software that watches every signal, acts on the policies you set, and pulls a human in only when judgment is needed." }] },
      { type: 'paragraph', children: [{ type: 'text', text: "That's what Polluxa is. A workshop where every team builds the agents their own workflows demand — across CRM, commerce, PLM, supply chain and warehouse — all running on a single graph that connects every customer to every product to every parcel. We started in 2018, shipping a PLM platform to apparel brands that needed to launch faster. Today, 2,000+ brands across 38 countries run on Polluxa — including PharmEasy, Pepperfry, Licious, TeaBox, Lucrin and Liberty." }] },
      { type: 'paragraph', children: [{ type: 'text', text: "We're hiring across engineering, product, design, GTM and operations. If the future of work being agentic excites you, come build it with us." }] },
    ],
  };

  const ourCulture = {
    __component: 'sections.features',
    heading: 'How we work.',
    description: null,
    variant: 'card',
    columns: 'threeColumn',
    enable: true,
    feature: [
      { title: '🎯 Bias for shipping', subtitle: '"We ship weekly."', description: 'Every product team ships to production weekly. Critical customer requests merge in days, not quarters.' },
      { title: '🪞 Dogfood', subtitle: '"We run on Polluxa."', description: 'Every Polluxa team — sales, marketing, support, ops, finance — runs its day-to-day work entirely on the Polluxa platform.' },
      { title: '🤝 Customer first', subtitle: '"Customer in every standup."', description: 'Every development team has a named customer assigned to their sprint. We solve real problems, not abstract personas.' },
      { title: '🌍 Distributed', subtitle: '"Built across 12 cities."', description: 'We work asynchronously from Bangalore, Mumbai, Delhi, Dubai, Riyadh, London, Singapore, NYC, and more.' },
      { title: '🧪 Earn the trust', subtitle: '"Enterprise-grade by default."', description: 'SOC 2, ISO 27001, PCI DSS, and GDPR are core compliance protocols built into the system architecture from day one.' },
      { title: '⚡ Pragmatic', subtitle: '"Agents that work."', description: 'We ship AI agents only when they outperform human-speed or cost on specific workflows. No gimmicky chat windows.' },
    ],
  };

  const fullSections = [originalHero, originalCompany, ourStory, ourCulture, originalStats, originalBottomActions];

  await strapi.entityService.update('api::page.page', pageId, { data: { contentSections: fullSections } });
  strapi.log.info(`[seed-phase2-class-b] about page enriched ✓ (was ${currentCount} sections, now ${fullSections.length})`);
}

/* ── Privacy: full desired contentSections (original hero + all 12 legal sections), written in one shot — see enrichAboutPage for why this doesn't fetch-then-patch. ── */
async function enrichPrivacyPage(strapi, pageId) {
  const current = await strapi.db.query('api::page.page').findOne({ where: { id: pageId }, populate: ['contentSections'] });
  const currentCount = (current.contentSections ?? []).length;
  if (currentCount >= 13) {
    strapi.log.info('[seed-phase2-class-b] privacy page already enriched — skipping.');
    return;
  }

  const originalHero = {
    __component: 'sections.hero',
    title: 'Privacy Policy',
    description: 'Last updated: January 2025. We are committed to protecting your privacy and handling your data with the highest standards of care.',
    bgColor: '#0A0A0F',
  };

  const legalSections = [
    richTextSection('1. Introduction', [
      'Polluxa Technologies Pvt Ltd ("Polluxa", "we", "us", or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose and safeguard your information when you visit our website polluxa.com or use any of our services.',
    ]),
    richTextSection('2. Information We Collect', [
      'We collect information you provide directly, information we collect automatically, and information from third parties.',
      '**Information you provide:** Name, email address, company name, phone number, payment information, and any communications you send us including enquiry forms, demo requests, and support tickets.',
      '**Information collected automatically:** IP address, browser type, operating system, referring URLs, page views, access times, and other usage information collected through cookies and similar technologies.',
      '**Information from third parties:** We may receive information about you from analytics providers, advertising networks, and publicly available sources to supplement the information you provide.',
    ]),
    richTextSection('3. How We Use Your Information', [
      'We use the information we collect to:',
      { list: [
        'Provide, maintain and improve our services',
        'Process transactions and send related information',
        'Send promotional communications, including product updates, newsletters and event invitations (with your consent where required)',
        'Respond to comments, questions and customer service requests',
        'Monitor and analyse trends, usage and activities in connection with our services',
        'Detect, investigate and prevent fraudulent transactions and other illegal activities',
        'Comply with legal obligations',
      ] },
    ]),
    richTextSection('4. Sharing of Information', [
      'We do not sell, rent or trade your personal information to third parties for their marketing purposes. We may share your information:',
      { list: [
        'With service providers who assist us in operating our website and conducting our business, subject to confidentiality obligations',
        'With partners where you have consented to such sharing',
        'In connection with, or during negotiations of, any merger, sale of company assets, financing or acquisition',
        'In response to a request for information if we believe disclosure is required by law, regulation or legal process',
      ] },
    ]),
    richTextSection('5. Cookies and Tracking Technologies', [
      'We use cookies, web beacons and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.',
    ]),
    richTextSection('6. Data Security', [
      'We implement commercially reasonable security measures to protect your personal information from accidental or unlawful destruction, loss, alteration, unauthorised disclosure or access. Polluxa is SOC 2 Type II certified and complies with ISO 27001. However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.',
    ]),
    richTextSection('7. Data Retention', [
      'We retain your personal information for as long as necessary to fulfil the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements. To determine the appropriate retention period, we consider the amount, nature and sensitivity of the personal data, the potential risk of harm from unauthorised use or disclosure, and the applicable legal requirements.',
    ]),
    richTextSection('8. Your Rights', [
      'Depending on your jurisdiction, you may have the following rights with respect to your personal data:',
      { list: [
        'The right to access and receive a copy of the personal information we hold about you',
        'The right to request correction or deletion of your personal information',
        'The right to object to or restrict our processing of your personal information',
        'The right to data portability',
        'The right to withdraw consent at any time where we rely on consent to process your information',
      ] },
      'To exercise any of these rights, please contact us at privacy@polluxa.com.',
    ]),
    richTextSection('9. International Transfers', [
      'Your information may be transferred to and maintained on servers located outside your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. If you are located outside India and choose to provide information to us, please note that we transfer the data, including personal data, to India and process it there.',
    ]),
    richTextSection("10. Children's Privacy", [
      'Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that a child under 18 has provided us with personal information, we will take steps to delete such information.',
    ]),
    richTextSection('11. Changes to This Policy', [
      'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.',
    ]),
    richTextSection('12. Contact Us', [
      'If you have any questions about this Privacy Policy, please contact our Data Protection Officer at:',
      '**Polluxa Technologies Pvt Ltd**',
      '4th Floor, Manyata Tech Park, Hebbal, Bangalore 560045, India',
      'Email: privacy@polluxa.com',
    ]),
  ];

  await strapi.entityService.update('api::page.page', pageId, {
    data: { contentSections: [originalHero, ...legalSections] },
  });
  strapi.log.info(`[seed-phase2-class-b] privacy page enriched ✓ (was ${currentCount} sections, now ${legalSections.length + 1})`);
}

/* ── Marketing: migrate the existing `marketing` content type's `blocks` into a new `page` entry ── */
async function migrateMarketingPage(strapi) {
  const existingPage = await strapi.db.query('api::page.page').findOne({ where: { slug: 'marketing' } }).catch(() => null);
  if (existingPage) {
    strapi.log.info('[seed-phase2-class-b] marketing page already exists — skipping.');
    return;
  }

  const marketingEntry = await strapi.db.query('api::marketing.marketing').findOne({ where: {}, populate: ['blocks'] }).catch(() => null);
  if (!marketingEntry) {
    strapi.log.warn('[seed-phase2-class-b] no api::marketing.marketing entry found — skipping marketing page migration.');
    return;
  }

  const contentSections = (marketingEntry.blocks ?? []).map((block) => {
    if (block.__component === 'sections.bottom-actions') {
      return { ...block, buttons: (block.buttons ?? []).map((b) => ({ ...b, url: b.url === '/contact-us' ? '/contact' : b.url })) };
    }
    return block;
  });

  await strapi.entityService.create('api::page.page', {
    data: {
      shortName: 'Marketing',
      slug: 'marketing',
      heading: marketingEntry.title,
      description: marketingEntry.description,
      locale: 'en',
      seo: { metaTitle: `${marketingEntry.title} — Polluxa`, metaDescription: marketingEntry.description || 'Marketing automation and campaign management for enterprise brands.' },
      contentSections,
      publishedAt: new Date().toISOString(),
    },
  });
  strapi.log.info('[seed-phase2-class-b] marketing page created from api::marketing.marketing ✓');
}

async function seedPhase2ClassB({ strapi }) {
  await renameSlugIfNeeded(strapi, 'api::page.page', 'about-us', 'about');
  await renameSlugIfNeeded(strapi, 'api::page.page', 'contact-us', 'contact');
  await renameSlugIfNeeded(strapi, 'api::page.page', 'privacy-policy', 'privacy');

  const contactPage = await strapi.db.query('api::page.page').findOne({ where: { slug: 'contact' } }).catch(() => null);
  if (contactPage) await enrichContactPage(strapi, contactPage.id);

  const aboutPage = await strapi.db.query('api::page.page').findOne({ where: { slug: 'about' } }).catch(() => null);
  if (aboutPage) await enrichAboutPage(strapi, aboutPage.id);

  const privacyPage = await strapi.db.query('api::page.page').findOne({ where: { slug: 'privacy' } }).catch(() => null);
  if (privacyPage) await enrichPrivacyPage(strapi, privacyPage.id);

  await migrateMarketingPage(strapi);

  strapi.log.info('[seed-phase2-class-b] ✅ Class B migration complete.');
}

module.exports = { seedPhase2ClassB };
