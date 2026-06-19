'use strict';

/**
 * event controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// custom controller for fetching events in this order
// upcoming events in asc order and past events in desc order
// (ref. https://docs.strapi.io/dev-docs/backend-customization/examples/services-and-controllers)
module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  async find(ctx) {
    const currentDateTime = new Date().toISOString();
    const { query } = ctx;

    // pagination params
    const pageSize = parseInt(query.pagination?.pageSize || 24);
    const page = parseInt(query.pagination?.page || 1);

    // dafulat query params 
    const { populate, filters: baseFilters, ...restQuery } = query;

    // all events based on filters
    const upcomingEvents = await strapi.entityService.findMany(
      "api::event.event",
      {
        filters: {
          StartDate: {
            $gt: currentDateTime,
          },
          ...baseFilters,
        },
        populate,
        ...restQuery,
        sort: { StartDate: "asc" },
      }
    );

    const pastEvents = await strapi.entityService.findMany("api::event.event", {
      filters: {
        StartDate: {
          $lte: currentDateTime,
        },
        ...baseFilters,
      },
      populate,
      ...restQuery,
      sort: { StartDate: "desc" },
    });

    // merging all events in the desired order
    const allEvents = [...upcomingEvents, ...pastEvents];
    const totalCount = allEvents.length;

    // pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedEvents = allEvents.slice(startIndex, endIndex);

    // matching strapis resp format
    const transformedResponse = await this.transformResponse(
      paginatedEvents,
      { pagination: { page, pageSize, total: totalCount } }
    );

    return transformedResponse;
  },
}));
