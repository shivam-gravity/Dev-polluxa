'use strict';

const crypto = require('crypto');
const { seed } = require('./seed/seed.js');
const { seedPages } = require('./seed/seed-pages.js');
const { seedContent } = require('./seed/seed-content.js');

/* ─────────────────────────────────────────────────────────
   TOKEN SETUP
   Creates the two API tokens the Next.js frontend needs,
   keyed to the same values already in
   frontend/.env.development — no .env changes needed.
───────────────────────────────────────────────────────── */
async function setupApiTokens({ strapi }) {
  const existing = await strapi.db.query('admin::api-token').findMany({});
  if (existing.length > 0) return;

  const salt = strapi.config.get('admin.apiToken.salt');

  const tokens = [
    {
      name: 'Frontend Read Token',
      description: 'Used by Next.js frontend for all GET requests',
      type: 'full-access',
      plainKey:
        'fff1c63089123dbf9cc5aeccea6315254546d69f13254554a507b770542dab23dcae0d4505580d66fd095eea8a1442c0ee62843ceabdd5c4df55459a3c2737a18c9515a42c48401992ae64d30b180dbfa6b7735ed2a6011ed5cf131b004e92bc2d28f94d04fc7c87e159b2d0913618a617ae60fcac771c74ee71d283e5470e87',
    },
    {
      name: 'Form Submission Token',
      description: 'Used by Next.js frontend for form POST requests',
      type: 'full-access',
      plainKey:
        '30434ca010c151c6d920cc6b9788642023d329356c8437758093d643dec89de8a054a7ecdf71dc69e63ab5e6a375c1d33b8ea58e6a423b7b721db02da206786d9da8fa9ff554f48b5338013653b9b180bc072b4c374592ba63073b9d2b07c9eea533427463f77187ffbecc125d5c7fdddf468159fa6c07f516c788bbd319ec10',
    },
  ];

  for (const t of tokens) {
    const accessKey = crypto
      .createHmac('sha512', salt)
      .update(t.plainKey)
      .digest('hex');

    await strapi.db.query('admin::api-token').create({
      data: {
        name: t.name,
        description: t.description,
        type: t.type,
        accessKey,
        lifespan: null,
        expiresAt: null,
        lastUsedAt: null,
      },
    });
    strapi.log.info(`[bootstrap] API token created: "${t.name}"`);
  }
}

/* ─────────────────────────────────────────────────────────
   PUBLIC PERMISSIONS
   Grants the Strapi Public role read access to every
   content type so Bearer token requests all work.
───────────────────────────────────────────────────────── */
async function setPublicPermissions({ strapi }) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });
  if (!publicRole) return;

  const uids = [
    'api::article.article',
    'api::career.career',
    'api::event.event',
    'api::case-study.case-study',
    'api::partner.partner',
    'api::industry.industry',
    'api::page.page',
    'api::global.global',
    'api::main-menu.main-menu',
    'api::navigation.navigation',
    'api::category.category',
    'api::author.author',
    'api::job-type.job-type',
    'api::commerce.commerce',
    'api::creator-commerce.creator-commerce',
    'api::logistic.logistic',
    'api::retail.retail',
    'api::plm.plm',
    'api::wms.wms',
    'api::dlm.dlm',
    'api::salescrm.salescrm',
    'api::agentcommerce.agentcommerce',
    'api::marketing.marketing',
    'api::enterprisegpt.enterprisegpt',
    'api::crm.crm',
  ];

  const existing = await strapi
    .query('plugin::users-permissions.permission')
    .findMany({ where: { role: publicRole.id } });

  const existingSet = new Set(existing.map((p) => p.action));

  for (const uid of uids) {
    for (const action of [`${uid}.find`, `${uid}.findOne`]) {
      if (!existingSet.has(action)) {
        await strapi.query('plugin::users-permissions.permission').create({
          data: { action, role: publicRole.id },
        });
      }
    }
  }
  strapi.log.info('[bootstrap] Public permissions configured.');
}

/* ─────────────────────────────────────────────────────────
   BOOTSTRAP
───────────────────────────────────────────────────────── */
module.exports = {
  register() {},

  async bootstrap({ strapi }) {
    await setupApiTokens({ strapi });
    await setPublicPermissions({ strapi });
    await seed({ strapi });
    await seedPages({ strapi });
    await seedContent({ strapi });
  },
};
