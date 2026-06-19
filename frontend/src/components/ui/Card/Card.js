"use client";
import { usePathname } from "next/navigation";
import { Inter, Bakbak_One } from "next/font/google";
import cx from "classnames";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/api-helpers";

const inter = Inter({ subsets: ["latin"] });
const bakbak = Bakbak_One({ weight: "400", subsets: ["latin"] });

const Card = ({
  url,
  title,
  image,
  description,
  variant,
  subtitle,
  isDefaultCard,
}) => {
  // Below features variant is used on technnology page
  const isFeature = variant === "features";
  const pathname = variant !== "techPage" ? usePathname() : "";

  return (
    <Link
      href={url ? `${pathname}/${url}` : ""}
      className={cx(
        "mx-auto group hover:no-underline focus:no-underline block w-full rounded-[32px] bg-white shadow-lg relative",
        {
          "text-center": variant === "center",
          "cursor-auto pointer-events-none": !url,
        }
      )}
    >
      <div className="p-8 space-y-4 relative">
        <div className="flex space-x-6 items-center">
          {image && (
            <Image
              alt={image?.alternativeText}
              width={image?.width}
              height={image?.height}
              src={getStrapiMedia(image?.url)}
              className="w-[66px] md:w-auto"
            />
          )}

          <div>
            {title && (
              <h3
                className={cx(
                  `text-[#293883] tracking-wider ${!isFeature ? bakbak.className : inter.className}`,
                  {
                    "text-xl 2xl:text-2xl font-semibold": isFeature,
                    "text-3xl md:text-5xl 2xl:text-7xl uppercase": !isFeature,
                  }
                )}
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <p
                className={cx({
                  "text-xl 2xl:text-2xl": isFeature,
                  "text-base md:text-xl 2xl:text-2xl": !isFeature,
                })}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <p
          className={cx(
            `text-base md:text-lg 2xl:text-xl text-black font-light ${inter.className}`,
            {
              "line-clamp-2 ": !isDefaultCard,
            }
          )}
        >
          {description}
        </p>

        {/* !isFeature && (
          <div className="text-right md:absolute bottom-6 right-8">
            Read More
          </div>
        ) */}
      </div>
    </Link>
  );
};

export default Card;
