import cx from "classnames";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowRight } from "@/assets/images";
import { getStrapiMedia } from "@/utils/api-helpers";

function PartnerCard({ url, title, description, imageInfo }) {
  const CardTag = url ? Link : "div";

  return (
    <CardTag
      {...(url ? { href: url } : {})}
      className={cx(
        "group flex flex-col h-full hover:no-underline focus:no-underline bg-white hover:shadow-lg"
      )}
    >
      <div className="flex flex-col h-full">
        {imageInfo?.url && (
          <>
            <div className="flex-shrink-0 overflow-hidden self-center py-8 px-4">
              <Image
                alt={imageInfo?.alternativeText || title || `Partner Card Image ${imageInfo?.id}`}
                width={imageInfo?.width}
                height={imageInfo?.height}
                src={getStrapiMedia(imageInfo?.url)}
              />
            </div>
            <div className="border-b border-[#DFDFDF]" />
          </>
        )}

        <div className="flex flex-col py-3 px-5 md:py-5 md:px-5">
          {title && (
            <p className="text-primary-dark-gray font-normal mb-4 text-base md:text-lg lg:text-xl flex-grow">
              {title}
            </p>
          )}

          {description && (
            <p className="text-primary-dark-gray text-sm md:text-base leading-[30px] line-clamp-3 md:line-clamp-5 group-hover:text-secondary-blue">
              {description}
            </p>
          )}

          {url && (
            <div className="flex justify-end pt-7 md:pt-10 mb-2 group-hover:text-secondary-blue">
              <ArrowRight className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-1" />
            </div>
          )}
        </div>
      </div>
    </CardTag>
  );
}

export default PartnerCard;
