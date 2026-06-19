'use strict';

/**
 * creator-management service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::creator-management.creator-management');
