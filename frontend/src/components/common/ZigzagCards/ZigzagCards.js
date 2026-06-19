"use client";
import { Typography, Button, MotionContainer } from "@/components/ui";
import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";
import { Link } from "@/i18n/routing";
const ZigzagCards = (props) => {
  const { data } = props;
  const { title, description, service } = data;
  return (
    <section className="py-12 px-5 relative py-12 px-6 md:py-24 md:px-0">
      <div className="mx-auto md:max-w-[1230px] 2xl:max-w-[1440px]">
        <>
          <div className="text-center">
            {title && (
              <Typography variant="heading1" className="mx-auto">
                {title}
              </Typography>
            )}
            {description && (
              <Typography
                variant="body1"
                className="md:w-[800px] 2xl:w-[1000px] mx-auto line-clamp-3"
              >
                {description}
              </Typography>
            )}
          </div>
          <div className="grid-cols-1 grid mt-16">
            {service?.map((item) => {
              const {
                name,
                description,
                Button: button,
                icon,
                subheader,
              } = item;
              const image = icon?.data?.attributes;
              return (
                <MotionContainer
                  key={item?.id}
                  className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-0 group items-start"
                >
                  <div className="order-2 md:order-2 md:group-odd:order-1 flex items-center">
                    <div className="max-w-[540px] mx-auto">
                      {name && (
                        <span className="block">
                          <p className="tracking-widest pt-4 text-[#003464] text-5xl md:text-5xl font-bold pb-8">
                            {name}
                          </p>
                        </span>
                      )}
                      {subheader && (
                        <p className="md:text-2xl 2xl:text-3xl text-[#202529] pb-4">
                          {subheader}
                        </p>
                      )}
                      {description && (
                        <p className="text-sm pb-8 md:text-base text-[#202529]">
                          {description}
                        </p>
                      )}
                      {button?.url && (
                        <Link
                          href={button?.url}
                          target={button?.newTab ? "_blank" : "_self"}
                          className="w-full mx-auto block pb-8 md:pb-0"
                        >
                          <Button variant={button?.type} type="button">
                            {button?.text}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                  {image?.url && (
                    <div className="order-1 md:order-1 md:group-odd:order-2">
                      <Image
                        src={getStrapiMedia(image?.url)}
                        alt={image?.alternativeText || name}
                        width={image?.width}
                        height={image?.height}
                        className="mx-auto"
                        priority
                      />
                    </div>
                  )}
                </MotionContainer>
              );
            })}
          </div>
        </>
      </div>
    </section>
  );
};

export default ZigzagCards;
