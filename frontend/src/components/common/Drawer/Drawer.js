"use client";
import { useState, useCallback, useRef, useMemo } from "react";
import { Link } from "@/i18n/routing";
import { useScrollLock } from "@/hooks";
import cx from "classnames";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/api-helpers";
import { IconCaretRight } from "@/assets/images";
import { SubDrawer } from "@/components/common";

const Drawer = ({ isOpen, onClose, activeLink }) => {
  const [hoveredSubLink, setHoveredSubLink] = useState(null);
  const lastActiveNavId = useRef(activeLink?.id);
  useScrollLock({ lock: isOpen });

  // reset subdrawer when main nav changes
  if (lastActiveNavId.current !== activeLink?.id) {
    setHoveredSubLink(null);
    lastActiveNavId.current = activeLink?.id;
  }

  // close drawer and subdrawer
  const handleCloseAll = useCallback(() => {
    onClose();
    setHoveredSubLink(null);
  }, [onClose]);

  // same name navigation check
  const isSameNameNavigation = useMemo(
    () =>
      activeLink?.navigations?.data?.length === 1 &&
      activeLink?.title.toLowerCase() ===
      activeLink?.navigations?.data[0]?.attributes?.heading.toLowerCase(),
    [activeLink?.navigations?.data, activeLink?.title]
  );

  // navigation data with same name check
  const navigationData = useMemo(
    () =>
      isSameNameNavigation
        ? activeLink?.navigations?.data[0]?.attributes?.links || []
        : activeLink?.navigations?.data,
    [isSameNameNavigation, activeLink?.navigations?.data]
  );

  // persist subdrawer opened state
  const handleSubLinkHover = useCallback(
    (subLink) => {
      // set hovered sub link only if it is not in same name navigation
      if (!isSameNameNavigation && subLink?.attributes?.links?.length > 0) {
        setHoveredSubLink((prev) =>
          prev?.id === subLink?.id ? prev : subLink
        );
      } else {
        setHoveredSubLink(null);
      }
    },
    [isSameNameNavigation]
  );

  const handleDrawerLinkClick = useCallback(() => {
    handleCloseAll();
    setHoveredSubLink(null);
  }, [handleCloseAll]);

  const renderNavItem = useCallback(
    (subLink) => {
      const hasLinks = subLink?.attributes?.links?.length > 0;
      const navItemSlug = isSameNameNavigation
        ? `${activeLink?.url}/${subLink.url}`
        : subLink?.attributes?.slug;
      const image = subLink?.attributes?.media?.file?.data?.attributes;
      const content = (
        <div className="flex items-center justify-between">
          {image?.url && (
            <Image
              src={getStrapiMedia(image?.url)}
              alt={image?.alternativeText}
              width={24}
              height={24}
              className="mr-2 rtl:ml-2 rtl:mr-0"
            />
          )}
          <span className="w-full">
            {subLink?.attributes?.heading || subLink.name}
          </span>
          {/* show caret if not in same name navigation and has links */}
          {!isSameNameNavigation && hasLinks && (
            <IconCaretRight className="text-[#003464] ms-2 rtl:rotate-180" />
          )}
        </div>
      );

      const commonClasses = cx(
        "text-[#333] text-lg font-medium block py-2 px-2 rounded duration-200",
        {
          "bg-[#0D8AFD1A]": hoveredSubLink?.id === subLink?.id,
          "hover:bg-[#0D8AFD1A]": hoveredSubLink?.id !== subLink?.id,
        }
      );

      // if no slug and has links, only render it for !same name navigation
      if (!navItemSlug && hasLinks && !isSameNameNavigation) {
        return <div className={commonClasses}>{content}</div>;
      }

      return (
        <Link
          href={navItemSlug || "#"}
          className={commonClasses}
          onClick={handleDrawerLinkClick}
        >
          {content}
        </Link>
      );
    },
    [
      hoveredSubLink,
      handleDrawerLinkClick,
      isSameNameNavigation,
      activeLink?.url,
    ]
  );

  const activeLinkImage = activeLink?.media?.file?.data?.attributes;

  return (
    <>
      <div
        onClick={handleCloseAll}
        className={cx(
          "fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out mt-32 z-40",
          { "opacity-100": isOpen, "opacity-0 pointer-events-none": !isOpen }
        )}
      />

      <div
        className={cx(
          "fixed left-0 rtl:left-auto rtl:right-0 top-32 h-[calc(100vh-8rem)] w-[30%] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50",
          {
            "translate-x-0": isOpen,
            "-translate-x-full rtl:translate-x-full": !isOpen
          }
        )}
      >
        <nav className="h-full overflow-y-auto">
          {activeLink && (
            <div className="p-6">
              <div className="mb-6">
                {activeLink?.title && (
                  <p className="text-3xl font-medium text-[#003464] mb-2 font-poppins">
                    {activeLink?.title}
                  </p>
                )}
                {activeLink?.description && (
                  <p className="text-[#333] text-base">
                    {activeLink?.description}
                  </p>
                )}
                {activeLinkImage?.url && (
                  <div className="mt-4">
                    <Image
                      src={getStrapiMedia(activeLinkImage?.url)}
                      alt={
                        activeLinkImage?.alternativeText || activeLink?.title
                      }
                      width={activeLinkImage?.width}
                      height={activeLinkImage?.height}
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
              <ul className="space-y-2">
                {/* overview item if parent link has URL for both same and different name navigations */}
                {activeLink?.url && (
                  <li key="overview" className="relative">
                    <Link
                      href={activeLink.url}
                      className="text-[#333] text-lg font-medium block py-2 px-2 rounded duration-200 hover:bg-[#0D8AFD1A]"
                      onClick={handleDrawerLinkClick}
                    >
                      <span className="w-full">Overview</span>
                    </Link>
                  </li>
                )}
                {navigationData?.map((subLink) => (
                  <li
                    key={subLink?.id || subLink.name}
                    onMouseEnter={() => handleSubLinkHover(subLink)}
                    className="relative"
                  >
                    {renderNavItem(subLink)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </div>

      {/* render subdrawer only if it is not in same name navigation */}
      {hoveredSubLink && isOpen && !isSameNameNavigation && (
        <SubDrawer
          subLink={hoveredSubLink}
          onClose={handleCloseAll}
          isVisible={hoveredSubLink && isOpen}
        />
      )}
    </>
  );
};

export default Drawer;
