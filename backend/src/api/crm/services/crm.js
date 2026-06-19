'use strict';

/**
 * crm service
 */

const { createCoreService } = require('@strapi/strapi').factories;

// Use the new CRM content-type UID
module.exports = createCoreService('api::crm.crm');
