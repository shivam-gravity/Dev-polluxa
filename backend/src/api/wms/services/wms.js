'use strict';

/**
 * wms service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wms.wms');
