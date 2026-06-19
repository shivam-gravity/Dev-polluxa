"use client";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { IconMenuCaret } from "@/assets/images";
import { getStrapiMedia } from "@/utils/api-helpers";
import cx from "classnames";
import { useCallback } from "react";

const NavDetails = (props) => {
  const {
    heading,
    url,
    closeMenu,
    links = [],
    isExpanded,
    onClick,
  } = props || {};

  const checkIfAbsolutePath = useCallback((path) => {
    if (!path) return "";
    return path.startsWith("/") ? path : `/${path}`;
  }, []);

  return (
    <div className="w-full">
      <div
        className={cx(
          "flex items-center justify-between py-2 md:py-3 text-[#333]",
          {
            "cursor-pointer": links?.length > 0,
          }
        )}
        onClick={links?.length > 0 ? onClick : undefined}
      >
        <div className="flex items-center">
          {heading && (
            <div className="flex font-medium items-center text-sm md:text-xl 2xl:text-2xl">
              {links?.length > 0 && (
                <IconMenuCaret
                  className={cx("transition-all duration-300", {
                    "rotate-90": isExpanded,
                  })}
                />
              )}
              <span className="pl-2">
                {links.length === 0 && url ? (
                  <Link
                    href={checkIfAbsolutePath(url) || "#"}
                    className="block"
                    onClick={closeMenu}
                  >
                    {heading}
                  </Link>
                ) : (
                  heading
                )}
              </span>
            </div>
          )}
        </div>
      </div>

      {isExpanded && links.length > 0 && (
        <div className="pl-8 space-y-2 py-1">
          {url && (
            <Link
              href={checkIfAbsolutePath(url) || "#"}
              className="block font-medium items-center text-sm md:text-xl 2xl:text-2xl"
              onClick={closeMenu}
            >
              Overview
            </Link>
          )}

          {links?.map((link, index) => {
            const subUrl = link?.url?.startsWith("/")
              ? link?.url
              : `${checkIfAbsolutePath(url)}/${link?.url}`;
            const image = link?.icon?.data?.attributes;

            return (
              <Link
                key={index}
                href={subUrl || "#"}
                className="block text-[#333] hover:text-[#0774F5] text-sm py-1"
                onClick={closeMenu}
              >
                <span className="flex items-center">
                  {image?.url && (
                    <Image
                      src={getStrapiMedia(image?.url)}
                      alt={image?.alternativeText}
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                  )}
                  {link?.name && (
                    <p className="block font-medium items-center text-sm md:text-xl 2xl:text-2xl">
                      {link?.name}
                    </p>
                  )}
                </span>
                {link?.description && (
                  <p className="text-[#333] mt-1 line-clamp-2 text-sm opacity-70">
                    {link?.description}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NavDetails;
