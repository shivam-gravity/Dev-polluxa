'use strict';

/**
 * marketing service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::marketing.marketing');
