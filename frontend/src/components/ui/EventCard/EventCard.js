import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getStrapiMedia } from "@/utils/api-helpers";
import { IconCalendar, IconLinkArrow, IconLocationPin } from "@/assets/images";

const EventCard = ({ url, title, date, location, cover }) => {
  const image = cover?.data?.attributes;
  return (
    <Link
      href={url || "#"}
      className="group flex flex-col h-full hover:no-underline focus:no-underline bg-white hover:shadow-lg"
    >
      <div className="flex flex-col h-full">
        {image?.url && (
          <div className="flex-shrink-0 overflow-hidden self-center">
            <Image
              src={getStrapiMedia(image?.url)}
              alt={image?.alternativeText || title || `Event Cover ${image?.id}`}
              width={image?.width}
              height={image?.height}
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-col flex-grow py-3 px-5 md:py-5 md:px-5">
          {title && (
            <h3 className="text-primary-dark-gray font-medium mb-4 text-base md:text-lg lg:text-xl flex-grow">
              {title}
            </h3>
          )}
          <div className="flex flex-wrap items-start gap-2 md:gap-2 justify-start mb-4">
            {location && (
              <div className="flex items-center text-xs md:text-sm text-primary-dark-gray font-medium">
                <IconLocationPin className="mr-2 flex-shrink-0" />
                <span>{location}</span>
              </div>
            )}
            {date && (
              <div className="flex items-center text-xs md:text-sm text-primary-dark-gray font-medium">
                <IconCalendar className="mr-2 flex-shrink-0" />
                <span>{date}</span>
              </div>
            )}
          </div>
          <div className="flex justify-end pt-7 md:pt-10 mb-2 group-hover:text-secondary-blue">
            <div className="w-6 md:w-5">
              <IconLinkArrow className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
