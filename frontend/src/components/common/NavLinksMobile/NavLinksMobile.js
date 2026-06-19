"use client";
import cx from "classnames";
import { useState, useCallback, useMemo } from "react";
import { Link } from "@/i18n/routing";
import { ArrowDownSVG } from "@/assets/images";
import { NavDetails } from "@/components/common";

const NavLinks = (props) => {
  const { links, closeMenu } = props;
  const [heading, setHeading] = useState("");
  const [expandedSubNav, setExpandedSubNav] = useState("");

  const handleMainNavClick = useCallback(
    (title, hasChildren) => {
      if (hasChildren && heading === title) {
        setHeading("");
        setExpandedSubNav("");
      } else {
        setHeading(title);
        setExpandedSubNav("");
      }
    },
    [heading, closeMenu]
  );

  const handleSubNavClick = useCallback(
    (subNavHeading) => {
      if (expandedSubNav === subNavHeading) {
        setExpandedSubNav("");
      } else {
        setExpandedSubNav(subNavHeading);
      }
    },
    [expandedSubNav]
  );

  return (
    <>
      {links?.map((link) => {
        // same name of navigation check
        const isSameNameNavigation = useMemo(
          () =>
            link?.navigations?.data?.length === 1 &&
            link?.title.toLowerCase() ===
            link?.navigations?.data[0]?.attributes?.heading.toLowerCase(),
          [link?.navigations?.data, link?.title]
        );

        //  navigation data with same name check
        const navigationData = useMemo(
          () =>
            isSameNameNavigation
              ? link?.navigations?.data[0]?.attributes?.links || []
              : link?.navigations?.data,
          [isSameNameNavigation, link?.navigations?.data]
        );

        const hasChildren = navigationData?.length > 0;

        return (
          <li className="border-b border-[#A9B7BD]" key={link?.title}>
            <div
              onClick={() => handleMainNavClick(link?.title, hasChildren)}
              className="relative py-3"
            >
              {link?.__component === "menu.menu-link" ? (
                <Link
                  href={link?.url || "#"}
                  className="text-[#333] font-medium"
                  onClick={closeMenu}
                >
                  {link.title}
                </Link>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-[#333] font-medium">{link.title}</span>
                  {hasChildren && (
                    <ArrowDownSVG
                      className={cx("transition-all duration-300", {
                        "rotate-180": heading === link?.title,
                      })}
                    />
                  )}
                </div>
              )}
            </div>

            {hasChildren && heading === link?.title && (
              <div className="transition-all duration-300 block w-full pl-4">
                {link?.url && (
                  <div className="border-t border-[#DFDFDF] first:border-0">
                    <NavDetails
                      heading="Overview"
                      url={link?.url}
                      links={[]}
                      closeMenu={closeMenu}
                      isExpanded={false}
                    />
                  </div>
                )}
                {navigationData?.map((subNav) => {
                  const subNavHeading =
                    subNav?.attributes?.heading || subNav.name;
                  const slug = isSameNameNavigation
                    ? `${link?.url}/${subNav.url}`
                    : subNav?.attributes?.slug;
                  const subNavLinks = subNav?.attributes?.links || [];
                  const description = subNav?.attributes?.description;

                  return (
                    <div
                      key={subNav?.id}
                      className="border-t border-[#DFDFDF] first:border-0"
                    >
                      <NavDetails
                        heading={subNavHeading}
                        url={slug}
                        media={subNav?.icon?.data?.attributes}
                        links={subNavLinks}
                        closeMenu={closeMenu}
                        isExpanded={expandedSubNav === subNavHeading}
                        onClick={() => handleSubNavClick(subNavHeading)}
                        description={description}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </li>
        );
      })}
    </>
  );
};

export default NavLinks;
