'use strict';

/**
 * commerce service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::commerce.commerce');
