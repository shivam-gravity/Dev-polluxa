import Image from "next/image";
import { Link } from "@/i18n/routing";
import { MotionCard } from "@/components/ui";
import { getStrapiMedia } from "@/utils/api-helpers";
import { ArrowRight } from "@/assets/images";

const IndustryCard = ({ title, media, url, variant = "primary" }) => {
  const cardContent = (
    <div className="h-full flex flex-col">
      <div className="relative w-full aspect-[16/9]">
        {media && (
          <>
            <Image
              src={getStrapiMedia(media?.url)}
              width={media?.width}
              height={media?.height}
              className="object-cover object-center"
              alt={media?.alternativeText}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </>
        )}
        <div className="absolute bottom-0 left-0 p-6 w-full flex flex-col">
          <div className="flex items-center">
            {title && (
              <p className="text-white leading-6 text-xl font-semibold">
                {title}
              </p>
            )}
            {url && (
              <ArrowRight className="ml-4 text-white transition-transform group-hover:translate-x-1" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
  return url ? (
    <MotionCard className="h-full hover:shadow-lg transition-shadow duration-300">
      <Link href={url ? url : "#"} className="h-full block">
        {cardContent}
      </Link>
    </MotionCard>
  ) : (
    <div className="h-full">{cardContent}</div>
  );
};
export default IndustryCard;
