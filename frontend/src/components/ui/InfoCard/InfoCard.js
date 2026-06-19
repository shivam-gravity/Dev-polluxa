"use client";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/api-helpers";

const InfoCard = ({ title, description, image }) => {
  return (
    <div className="group flex flex-col items-start justify-between p-4 md:min-h-60 hover:bg-[#F9F9F9] cursor-pointer border">
      <div className="relative mb-4 h-14">
        {image?.data?.attributes?.url && (
          <Image
            src={getStrapiMedia(image?.data?.attributes?.url)}
            alt={image?.data?.attributes?.alternativeText || title || `Info Card Image ${image?.data?.attributes?.id}`}
            width={56}
            height={56}
            className="h-full w-full"
            loading="lazy"
          />
        )}
      </div>
      <div className="flex flex-col md:flex-row justify-between w-full h-full relative overflow-hidden md:max-h-20">
        <div className="flex-grow overflow-hidden flex flex-col justify-end">
          {title && (
            <h2 className="text-xs md:text-lg font-medium text-[#003464] transition-all duration-700 ease-in-out transform md:group-hover:translate-y-full md:opacity-100 md:group-hover:opacity-0">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-xs md:text-sm text-[#003464] transition-all duration-700 ease-in-out transform md:-translate-y-full md:pr-5 md:group-hover:translate-y-0 md:opacity-0 md:group-hover:opacity-100  md:absolute md:bottom-0 md:left-0 md:right-0 mb-4 md:mb-0">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
