import Image from "next/image";
import { getStrapiMedia } from "@/utils/api-helpers";
import { Sidebar, Section } from "@/components/scroll-layout";
import cx from "classnames";
import PartnerCard from "@/components/ui/PartnerCard";

const columnConfig = {
  threeColumn: "md:grid-cols-3",
  fourColumn: "md:grid-cols-4",
  fiveColumn: "md:grid-cols-5",
  sixColumn: "md:grid-cols-6",
};

const Grid = ({ items, layout = "threeColumn", variant }) => (
  <div
    className={cx(
      "grid grid-cols-1 gap-8 md:gap-6 py-10",
      columnConfig[layout] || columnConfig.threeColumn
    )}
  >
    {items?.map((item) => {
      const media = item?.media?.data?.attributes;
      return variant === "secondary" ? (
        <PartnerCard
          key={item?.id}
          url={item?.url}
          title={item?.title}
          description={item?.description}
          imageInfo={media}
        />
      ) : (
        <div
          key={item?.id}
          className="drop-shadow-lg rounded-xl bg-white flex items-center"
        >
          {media?.url && (
            <span className="py-8 px-6 mx-auto">
              <Image
                src={getStrapiMedia(media.url)}
                alt={media.alternativeText || item?.title || `Tech Product Image ${media?.id}`}
                width={336}
                height={200}
                style={{ color: "transparent" }}
                loading="lazy"
              />
            </span>
          )}
        </div>
      );
    })}
  </div>
);

const TechProducts = ({ data }) => {
  const {
    title,
    Features,
    Button,
    description,
    bgColor,
    variant = "primary",
  } = data;

  const menuItem = Features?.map((feature) => feature?.heading);

  return (
    <section
      className={cx({
        [`bg-[${bgColor}]`]: bgColor,
        "bg-white": !bgColor,
      })}
    >
      <div className="container-custom">
        <div className="md:flex md:space-x-4">
          <Sidebar
            title={title}
            menuItem={menuItem}
            Button={Button}
            description={description}
            variant={variant}
          />

          <div className="px-5 md:py-10 md:px-10 md:w-[80%]">
            {Features?.map((section) => (
              <Section
                key={section?.id}
                title={section?.heading}
                subtitle={section?.description}
                id={section?.heading}
                grid={
                  <Grid
                    items={section?.feature}
                    layout={section?.columns}
                    variant={variant}
                  />
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechProducts;
