import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";
import { Button, Typography } from "@/components/ui";
import cx from "classnames";
import { Link } from "@/i18n/routing";

const Features = (props) => {
  const { data } = props;
  const {
    feature,
    enable,
    title,
    description,
    Button: button,
    bgColor,
    columns,
  } = data;

  if (enable === false) return;

  const columnClasses = {
    threeColumn: "md:grid-cols-3",
    fiveColumn: "md:grid-cols-5",
    sixColumn: "md:grid-cols-6",
  };
  const columnStyle = columnClasses[columns] || "md:grid-cols-4";

  return (
    <section
      className={cx("py-6 lg:py-12", {
        [`bg-${bgColor}`]: bgColor,
        "bg-[#F9F9F9]": !bgColor,
      })}
    >
      <div className="container-custom px-5 md:px-0 z-20 relative pb-4 text-center">
        {title && (
          <Typography variant="heading1" className="mx-auto text-[#003464]">
            {title}
          </Typography>
        )}
        {description && (
          <Typography
            variant="body1"
            className="md:w-[800px] 2xl:w-[1000px] text-[#333333] mx-auto line-clamp-3 pb-6"
          >
            {description}
          </Typography>
        )}
        <div
          className={cx(
            "justify-between grid grid-cols-1 gap-8  mx-auto",
            columnStyle
          )}
        >
          {feature?.map((item) => (
            <div key={item?.id} className="p-6 bg-[#f9f9f9]">
              {item?.media?.data && (
                <div className="mb-8">
                  <Image
                    src={getStrapiMedia(item?.media?.data?.attributes?.url)}
                    alt={item?.title}
                    width={item?.media?.data?.attributes?.width}
                    height={item?.media?.data?.attributes?.height}
                    className="mx-auto"
                  />
                </div>
              )}
              <div className="text-center">
                {item?.title && (
                  <h4
                    className={cx("text-[#003464] text-2xl font-semibold", {
                      "pb-4": item?.description,
                    })}
                  >
                    {item?.title}
                  </h4>
                )}
                {item?.description && (
                  <p className="text-[#003464] leading-8 text-lg flex-grow line-clamp-6">
                    {item?.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        {button?.url && (
          <Link
            href={button?.url}
            target={button?.newTab ? "_blank" : "_self"}
            className="w-full mx-auto pb-8 md:pb-0 flex justify-center"
          >
            <Button type="button" variant={button?.type}>
              {button?.text}
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default Features;
