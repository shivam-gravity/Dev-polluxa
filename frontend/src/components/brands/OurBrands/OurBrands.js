import Image from "next/image";
import { getStrapiMedia } from "@/utils/api-helpers";
import { MotionContainer, Typography } from "@/components/ui";
import cx from "classnames";

const OurBrands = ({ data }) => {
  const { brands, variant = "primary" } = data;
  const isSecondary = variant === "secondary";
  const bgColor = data?.bgColor ?? "bg-[#F9F9F9]";

  return (
    <section className={bgColor}>
      <MotionContainer className="py-6 lg:py-12">
        <div className="container-custom items-center">
          {data?.title && (
            <Typography
              variant="heading1"
              className="text-[#003464] text-4xl md:text-5xl font-bold text-center mb-4"
            >
              {data?.title}
            </Typography>
          )}
          {data?.description && (
            <Typography
              variant="body1"
              className="text-[#333333] text-center mb-6 md:mb-12"
            >
              {data?.description}
            </Typography>
          )}

          <div
            className={cx({
              "flex flex-wrap items-center justify-center gap-4 md:gap-6":
                isSecondary,
              "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6":
                !isSecondary,
            })}
          >
            {brands?.map((item) => (
              <div
                key={item?.id}
                className={cx(
                  "h-20 md:h-24 flex items-center justify-center px-4 md:px-8",
                  !isSecondary && "bg-white"
                )}
              >
                <div className="relative w-full h-12 md:h-16 flex items-center justify-center">
                  <Image
                    src={getStrapiMedia(item?.media?.data?.attributes?.url)}
                    alt={
                      item?.media?.data?.attributes?.alternativeText ||
                      item?.title ||
                      `Brand ${item?.id}`
                    }
                    width={item?.media?.data?.attributes?.width || 200}
                    height={item?.media?.data?.attributes?.height || 200}
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </MotionContainer>
    </section>
  );
};

export default OurBrands;
