import { Link } from "@/i18n/routing";
import Image from "next/image";
import cx from "classnames";
import { Typography, EnhancedCard, MotionCardStaggered } from "@/components/ui";
import { getStrapiMedia } from "@/utils/api-helpers";

const EnhancedFeatures = (props) => {
  const { data } = props;
  const {
    enable,
    title,
    bgColor,
    description,
    feature,
    variant,
    columns,
    titleColor,
  } = data;
  const gridColumn =
    columns === "fourColumn"
      ? 4
      : columns === "fiveColumn"
        ? 5
        : columns === "sixColumn"
          ? 6
          : 3;
  const isCard = variant === "card";

  if (enable === false) return;

  return (
    <section
      className={cx("py-12 md:py-24")}
      style={{ backgroundColor: bgColor }}
    >
      <div className="px-5 md:px-0 container-custom">
        {title && (
          <Typography
            variant="title"
            className={cx("tracking-widest text-center w-full", {
              "pb-8": !description,
            })}
          >
            <span style={{ color: titleColor ?? "#333333" }}>{title}</span>
          </Typography>
        )}
        {description && (
          <Typography
            variant="heading1"
            className="md:w-[800px] mx-auto text-center"
          >
            <span style={{ color: titleColor ?? "#202529" }}>
              {description}
            </span>
          </Typography>
        )}
        {isCard ? (
          <div
            className={`grid grid-cols-1 gap-8 md:grid-cols-${gridColumn} md:gap-6 py-10`}
          >
            {feature?.map((item, index) => {
              const media = item?.media?.data?.attributes;
              const url = item?.url ? `/${item?.url}` : null;
              return (
                <MotionCardStaggered
                  key={item?.id}
                  index={index}
                  className="bg-white"
                >
                  <EnhancedCard
                    url={url}
                    title={item?.title}
                    description={item?.description}
                    media={media}
                    smallClamp
                  />
                </MotionCardStaggered>
              );
            })}
          </div>
        ) : (
          <div
            className={`grid grid-cols-2 md:grid-cols-${gridColumn} gap-4 item-center justify-center mx-auto`}
          >
            {feature?.map((item) => {
              const media = item?.media?.data?.attributes;
              const imageElement = item?.media?.data && (
                <Image
                  src={getStrapiMedia(media?.url)}
                  width={media?.width}
                  height={media?.height}
                  alt={media?.alternativeText}
                  className="mx-auto"
                />
              );
              return (
                <div key={item?.id} className="w-full md:w-auto mt-4 drop-shadow-lg bg-white flex items-center">
                  {item?.showLink ? (
                    <Link
                      href={item?.url}
                      target={item?.newTab ? "_blank" : "_self"}
                      className="w-full mx-auto py-8 px-6 md:py-14"
                    >
                      {imageElement}
                    </Link>
                  ) : (
                    <span className="py-8 px-6 md:py-12 mx-auto">
                      {imageElement}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default EnhancedFeatures;
