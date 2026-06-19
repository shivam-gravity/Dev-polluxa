"use strict";

/**
 * plm service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::plm.plm");
