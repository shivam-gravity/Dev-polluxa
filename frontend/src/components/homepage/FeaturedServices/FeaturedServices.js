"use client";
import { Typography, EnhancedCard, IndustryCard } from "@/components/ui";
import { EmblaCarousel } from "@/components/EmblaCarousel";
import cx from "classnames";

const FeaturedServices = (props) => {
  const { data, fontInter, pageName } = props;
  const { title, description, variant, service, columns } = data;
  const columnsStyle = {
    threeColumn: "md:grid-cols-3",
    fourColumn: "md:grid-cols-4",
  };

  const variantStyles = {
    primary: {
      background: pageName == "industries" ? "bg-[#F9F9F9]" : "bg-white",
      text: "text-[#003464]",
      subtext: "text-[#333333]",
    },
    secondary: {
      background: "bg-[#003464]",
      text: "text-white",
      subtext: "text-white",
    },
    tertiary: {
      background: "bg-[#003464]",
      text: "text-white",
      subtext: "text-white",
    },
  };

  const currentStyle = variantStyles[variant] || variantStyles.primary;

  return (
    <section
      className={cx(
        "relative px-6 md:px-0 py-6 lg:py-12",
        currentStyle.background
      )}
    >
      <div className="mx-auto md:max-w-[1230px] 2xl:max-w-[1440px]">
        <>
          <div className="text-center">
            {title && (
              <Typography
                variant="heading1"
                className={cx("mx-auto", currentStyle.text)}
              >
                {title}
              </Typography>
            )}
            {description && (
              <Typography
                variant="body1"
                className={cx(
                  "md:w-[800px] 2xl:w-[1000px] mx-auto line-clamp-3 mb-16",
                  currentStyle.subtext
                )}
              >
                {description}
              </Typography>
            )}
          </div>
          <div
            className={cx(
              "grid grid-cols-1 gap-12",
              !(variant === "secondary" || pageName == "industries") &&
              (columnsStyle[columns] || columnsStyle.fourColumn)
            )}
          >
            {variant === "secondary" || pageName == "industries" ? (
              <EmblaCarousel
                options={{
                  skipSnaps: false,
                  inViewThreshold: 1,
                }}
                items={service}
                breakpoints={{
                  "(max-width: 767px)": {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                  "(min-width: 768px) and (max-width: 1023px)": {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                  "(min-width: 1024px)": {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                  },
                }}
                showArrows={true}
                showDots={true}
                loop={true}
                autoplay={true}
                autoplayDelay={3000}
                stopAutoplayOnInteraction={true}
                renderItem={(item) => {
                  const { name, description, Button, icon } = item;
                  const image = icon?.data?.attributes;
                  return (
                    <div className="h-full">
                      <EnhancedCard
                        title={name}
                        description={description}
                        media={image}
                        url={Button?.url}
                        key={item?.id}
                        bgColor="bg-white"
                      />
                    </div>
                  );
                }}
              />
            ) : (
              service?.map((item) => {
                const { name, description, Button, icon } = item;
                const image = icon?.data?.attributes;
                return variant === "tertiary" ? (
                  <IndustryCard
                    title={name}
                    description={description}
                    media={image}
                    url={Button?.url}
                    key={item?.id}
                  />
                ) : (
                  <EnhancedCard
                    title={name}
                    description={description}
                    media={image}
                    url={Button?.url}
                    key={item?.id}
                    bgColor="bg-[#F9F9F9]"
                  />
                );
              })
            )}
          </div>
        </>
      </div>
    </section>
  );
};

export default FeaturedServices;
