'use strict';

/**
 * global-shop service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::global-shop.global-shop');
