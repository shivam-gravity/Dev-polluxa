"use client";
import { useMemo } from "react";

const useHeaderNavigation = (pathname, links) => {
  return useMemo(() => {
    if (!pathname || pathname === "/") {
      return {
        currentPageHeading: "",
        parentNavigation: null,
        subNavs: null,
      };
    }

    const navData = links?.reduce(
      (acc, link) => {
        if (!link.navigations?.data || acc.found) return acc;

        link.navigations.data.find((nav) => {
          if (nav.attributes.slug === pathname) {
            acc = {
              found: true,
              currentPageHeading: nav.attributes.heading,
              parentNavigation: {
                heading: nav.attributes.heading,
                slug: nav.attributes.slug,
                links: nav.attributes.links || [],
              },
              subNavs: nav.attributes.links || [],
            };
            return true;
          }

          const childLink = nav.attributes.links?.find(
            (subLink) =>
              `${nav.attributes.slug}/${subLink.url}` === pathname ||
              `/${nav.attributes.slug}/${subLink.url}` === pathname
          );

          if (childLink) {
            acc = {
              found: true,
              currentPageHeading: childLink.name,
              parentNavigation: {
                heading: nav.attributes.heading,
                slug: nav.attributes.slug,
                links: nav.attributes.links || [],
              },
              subNavs: nav.attributes.links || [],
            };
            return true;
          }
          return false;
        });

        return acc;
      },
      { found: false }
    );

    return {
      currentPageHeading: navData?.currentPageHeading || "",
      parentNavigation: navData?.parentNavigation,
      subNavs: navData?.subNavs || null,
    };
  }, [pathname, links]);
};

export default useHeaderNavigation;
