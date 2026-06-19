import Image from "next/image";
import { Link } from "@/i18n/routing";
import cx from "classnames";
import { MotionCard } from "@/components/ui";
import { getStrapiMedia } from "@/utils/api-helpers";
import { ArrowRight } from "@/assets/images";

const EnhancedCard = ({
  title,
  description,
  bgColor = "bg-[#F9F9F9]",
  smallClamp,
  media,
  url,
  pageName,
}) => {
  const cardContent = (
    <div className="h-full flex flex-col">
      {media && (
        <div className="relative w-full aspect-[16/9]">
          <Image
            src={getStrapiMedia(media?.url)}
            width={media?.width}
            height={media?.height}
            className="object-cover object-center"
            alt={media?.alternativeText || title || `${pageName} card image ${media?.id}`}
          />
        </div>
      )}
      <div
        className={cx(`${bgColor} px-6 py-8 flex flex-1 flex-col`, {
          "min-h-[240px]": description,
        })}
      >
        {title && (
          <h4
            className={cx("text-[#003464]", {
              "pb-4": description,
              "text-lg font-medium": pageName === "blogs",
              "text-2xl font-semibold": pageName !== "blogs",
            })}
          >
            {title}
          </h4>
        )}
        {description && (
          <p
            className={cx("text-[#003464] leading-8 flex-1", {
              "line-clamp-4": smallClamp,
              "line-clamp-6": !smallClamp,
              "text-base font-normal": pageName === "blogs",
              "text-lg": pageName !== "blogs",
            })}
          >
            {description}
          </p>
        )}
        {url && (
          <div className="mt-auto pt-6">
            <ArrowRight className="rtl:rotate-180" />
          </div>
        )}
      </div>
    </div>
  );
  return url ? (
    <MotionCard className="h-full hover:shadow-lg transition-shadow duration-300">
      <Link href={url} className="h-full block">
        {cardContent}
      </Link>
    </MotionCard>
  ) : (
    <MotionCard className="h-full hover:shadow-lg transition-shadow duration-300">
      {cardContent}
    </MotionCard>
  );
};

export default EnhancedCard;
