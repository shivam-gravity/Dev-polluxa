'use strict';

/**
 * crm router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

// Use the new CRM content-type UID
module.exports = createCoreRouter('api::crm.crm');
