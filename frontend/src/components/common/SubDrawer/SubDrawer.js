"use client";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import cx from "classnames";
import { getStrapiMedia } from "@/utils/api-helpers";

const SubDrawer = ({
  subLink,
  onClose,
  isVisible,
  onMouseEnter,
  onMouseLeave,
}) => {
  const subLinkAttributes = subLink?.attributes;
  const image = subLinkAttributes?.media?.file?.data?.attributes;
  const generateUrl = (parentSlug, childUrl) => {
    if (!parentSlug) return `/${childUrl}`;
    return `${parentSlug}/${childUrl}`;
  };

  return (
    <div
      className={cx(
        "fixed top-32 h-full w-[25%] border-l rtl:border-l-0 rtl:border-r border-[#E9E9E9] bg-white transform transition-transform duration-300 ease-in-out z-50 left-[30%] rtl:left-auto rtl:right-[30%]",
        {
          "translate-x-0": isVisible,
          "-translate-x-full rtl:translate-x-full": !isVisible
        }
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="p-6">
        <div className="mb-6">
          {image?.url && (
            <div className="mt-4">
              <Image
                src={getStrapiMedia(image?.url)}
                alt={image?.alternativeText || subLinkAttributes?.title}
                width={image?.width}
                height={image?.height}
                className="object-contain"
              />
            </div>
          )}
          {subLinkAttributes?.title && (
            <p className="text-2xl font-medium text-[#003464] mb-2 font-poppins">
              {subLinkAttributes?.title}
            </p>
          )}
          {subLinkAttributes?.description && (
            <p className="text-[#333] text-base">
              {subLinkAttributes?.description}
            </p>
          )}
        </div>
        <ul className="space-y-2">
          {subLinkAttributes?.links?.map((childLink) => (
            <li key={childLink?.id}>
              <Link
                href={generateUrl(subLinkAttributes?.slug, childLink.url)}
                className="text-[#333] block py-3 px-4 rounded hover:bg-[#0D8AFD1A] duration-200"
                onClick={onClose}
              >
                <span className="flex items-center">
                  {childLink?.icon?.data?.attributes?.url && (
                    <Image
                      src={getStrapiMedia(
                        childLink?.icon?.data?.attributes?.url
                      )}
                      alt={childLink?.icon?.data?.attributes?.alternativeText}
                      width={24}
                      height={24}
                      className="mr-2 rtl:ml-2 rtl:mr-0"
                    />
                  )}
                  {childLink?.name && (
                    <p className="text-lg">{childLink?.name}</p>
                  )}
                </span>
                {childLink?.description && (
                  <p className="text-[#333] mt-1 line-clamp-2 text-sm opacity-70">
                    {childLink?.description}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubDrawer;
