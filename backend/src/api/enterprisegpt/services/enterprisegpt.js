'use strict';

/**
 * enterprisegpt service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::enterprisegpt.enterprisegpt');
