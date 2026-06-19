'use strict';

/**
 * salescrm service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::salescrm.salescrm');
