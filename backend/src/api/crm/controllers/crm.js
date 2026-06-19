'use strict';

/**
 * crm controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// Use the new CRM content-type UID
module.exports = createCoreController('api::crm.crm');
