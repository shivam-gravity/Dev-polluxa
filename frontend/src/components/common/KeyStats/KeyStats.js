import { Typography } from "@/components/ui";
import { getStrapiMedia } from "@/utils/api-helpers";
import cx from "classnames";
import Image from "next/image";

const KeyCard = ({ keyStat, description, variant, icon }) => (
  <div
    className={cx("select-none", {
      "flex flex-col items-center": variant === "vertical",
      "grid grid-cols-[auto,1fr] gap-x-4 border border-[#E2E2E2] p-6 md:p-0 md:border-none":
        variant !== "vertical",
    })}
  >
    {variant === "vertical" ? (
      <div>
        <div className="h-[4rem] flex items-start justify-center mb-4">
          {keyStat && (
            <p className="text-[#003464] text-3xl font-semibold text-center">
              {keyStat}
            </p>
          )}
        </div>
        {description && (
          <Typography variant="body1" className="text-[#333333] text-center">
            {description}
          </Typography>
        )}
      </div>
    ) : (
      <>
        {icon?.data?.attributes?.url && (
          <div className="col-span-1 flex items-center">
            <Image
              src={getStrapiMedia(icon?.data?.attributes?.url)}
              alt={icon?.data?.attributes?.alternativeText || keyStat || `Key Stat Icon ${icon?.data?.attributes?.id}`}
              width={icon?.data?.attributes?.width}
              height={icon?.data?.attributes?.height}
            />
          </div>
        )}
        <div className="flex flex-col justify-center">
          {keyStat && (
            <p className="text-[#003464] text-xl md:text-2xl 2xl:text-3xl font-semibold">
              {keyStat}
            </p>
          )}
          {description && (
            <p className="text-sm md:text-base text-[#677489]">{description}</p>
          )}
        </div>
      </>
    )}
  </div>
);

const KeyStats = ({ data }) => {
  const { title, description, keys, variant } = data;

  return (
    <section className="py-12 md:py-24 relative px-6 bg-[#F9F9F9] md:px-0">
      <div className="mx-auto md:max-w-[1230px] 2xl:max-w-[1440px]">
        {title && (
          <Typography
            variant="heading1"
            className="text-[#003464] text-4xl md:text-5xl font-bold text-center mb-16"
          >
            {title}
          </Typography>
        )}
        {description && (
          <Typography variant="body1" className="text-[#333333] text-center">
            {description}
          </Typography>
        )}

        <div
          className={cx(
            "grid",
            variant === "vertical" && "md:grid-cols-3 gap-16",
            variant === "horizontal" && "md:grid-cols-4 gap-8"
          )}
        >
          {keys?.map((item) => {
            return (
              <KeyCard
                key={item?.id}
                keyStat={item?.title}
                description={item?.description}
                variant={variant}
                icon={item?.icon}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KeyStats;
