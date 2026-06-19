import React from "react";
import { Link } from "@/i18n/routing";
import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";

export default function EventAction({ data }) {
  const { title, subtitle, socialLinks } = data;

  if (!data) return null;

  return (
    <div className="bg-sky-50 py-16 md:py-20">
      <div className="container-custom md:gap-9 md:max-w-[1230px] 2xl:max-w-[1440px] mx-auto px-3 text-center">
        {title && (
          <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-medium text-[#003464] mb-8  max-w-[649px] mx-auto">
            {title}
          </h2>
        )}
        <div className="flex justify-center gap-6 mb-12">
          {socialLinks?.map((link, index) => {
            const image = link?.icon?.data?.attributes;
            return (
              <Link
                key={index}
                href={link?.url}
                target="_blank"
                className="w-12 h-12 rounded-full border border-[#333] flex items-center justify-center text-gray-600 hover:text-primary-dark-gray hover:border-primary-dark-gray transition-colors"
              >
                {image?.url && (
                  <Image
                    src={getStrapiMedia(image?.url)}
                    alt={image?.alternativeText || link?.url || `Social Link Icon ${image?.id}`}
                    width={image?.width}
                    height={image?.height}
                  />
                )}
              </Link>
            );
          })}
        </div>
        {subtitle && (
          <h3 className="text-xl md:text-2xl 2xl:text-3xl text-primary-dark-gray max-w-[649px] mx-auto">
            {subtitle}
          </h3>
        )}
      </div>
    </div>
  );
}
