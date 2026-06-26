'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::token-package.token-package');
