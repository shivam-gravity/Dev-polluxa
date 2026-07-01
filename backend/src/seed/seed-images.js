'use strict';

const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, 'images');

/* Product screenshots — attached to the Homepage product card (`api::product.product`)
   and to the matching page's hero `media` component. */
const IMAGES = [
  { file: 'crm.png',              productSlug: 'crm',              pageUid: 'api::crm.crm',                             pageSlug: 'overview' },
  { file: 'commerce.png',         productSlug: 'commerce',         pageUid: 'api::commerce.commerce',                   pageSlug: 'overview' },
  { file: 'creator-commerce.png', productSlug: 'creator-commerce', pageUid: 'api::creator-commerce.creator-commerce',   pageSlug: 'overview' },
  { file: 'plm.png',              productSlug: 'plm',              pageUid: 'api::plm.plm',                             pageSlug: 'overview' },
  { file: 'logistics.png',        productSlug: 'logistics',        pageUid: 'api::logistic.logistic',                   pageSlug: 'overview' },
  { file: 'wms.png',              productSlug: 'wms',              pageUid: 'api::wms.wms',                             pageSlug: 'overview' },
];

async function uploadImage(strapi, filePath, fileName) {
  const stats = fs.statSync(filePath);
  const [uploaded] = await strapi.plugins.upload.services.upload.upload({
    data: {},
    files: { path: filePath, name: fileName, type: 'image/png', size: stats.size },
  });
  return uploaded;
}

async function seedImages({ strapi }) {
  for (const cfg of IMAGES) {
    try {
      const filePath = path.join(IMAGES_DIR, cfg.file);
      if (!fs.existsSync(filePath)) {
        strapi.log.warn(`[seed-images] missing source file ${filePath}, skipping.`);
        continue;
      }

      const product = await strapi.db
        .query('api::product.product')
        .findOne({ where: { slug: cfg.productSlug }, populate: ['image'] });
      const page = await strapi.db
        .query(cfg.pageUid)
        .findOne({ where: { slug: cfg.pageSlug }, populate: ['media', 'media.file'] });

      if (!product) strapi.log.warn(`[seed-images] no product found with slug "${cfg.productSlug}"`);
      if (!page) strapi.log.warn(`[seed-images] no ${cfg.pageUid} entry found with slug "${cfg.pageSlug}"`);

      const productNeedsImage = !!product && !product.image;
      const pageNeedsImage = !!page && !page.media?.file;
      if (!productNeedsImage && !pageNeedsImage) {
        strapi.log.info(`[seed-images] ${cfg.file}: nothing to do (already attached or targets missing) — skipping.`);
        continue;
      }

      const uploaded = await uploadImage(strapi, filePath, cfg.file);

      if (productNeedsImage) {
        await strapi.entityService.update('api::product.product', product.id, {
          data: { image: uploaded.id },
        });
        strapi.log.info(`[seed-images] attached ${cfg.file} to product "${cfg.productSlug}" ✓`);
      }
      if (pageNeedsImage) {
        await strapi.entityService.update(cfg.pageUid, page.id, {
          data: { media: { file: uploaded.id } },
        });
        strapi.log.info(`[seed-images] attached ${cfg.file} to ${cfg.pageUid} media ✓`);
      }
    } catch (err) {
      strapi.log.error(`[seed-images] failed for ${cfg.file}: ${err.message}`);
    }
  }
}

module.exports = { seedImages };
