"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getStrapiMedia } from "@/utils/api-helpers";
import { Typography, MotionContainer } from "@/components/ui";
import { IconDualQuote } from "@/assets/images";
import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useLocale } from "next-intl";

function Testimonial({ text, authorName, picture, authorTitle }) {
  const imageUrl = getStrapiMedia(picture?.data?.attributes?.url);
  return (
    <div className="h-full px-4">
      <div className="bg-[#F0F0F0] p-8 text-[#003464] h-full">
        <div className="h-full flex flex-col">
          <IconDualQuote className="flex-shrink-0 mb-6" />
          <div className="flex-grow">
            <p className="text-sm md:text-base 2xl:text-lg line-clamp-5">
              {text}
            </p>
          </div>
          <div className="flex-shrink-0 mt-6">
            <p className="text-[#003464] text-base 2xl:text-xl">{authorName}</p>
            <p className="text-sm 2xl:text-base text-[#003464] mt-2">
              {authorTitle}
            </p>
            <div className="w-[130px] mt-6">
              <Image
                src={imageUrl ?? ""}
                alt={
                  picture?.data?.attributes?.alternativeText || "none provided"
                }
                width={picture?.data?.attributes?.width}
                height={picture?.data?.attributes?.height}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials({ data }) {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [emblaRef] = useEmblaCarousel(
    {
      align: "start",
      slidesToScroll: 1,
      loop: true,
      direction: isRTL ? "rtl" : "ltr",
    },
    [Autoplay()]
  );

  return (
    <section className="py-6 lg:py-12 px-6 relative container-custom md:px-0">
      <MotionContainer>
        <div className="text-center">
          <Typography
            variant="heading1"
            className="text-[#003464] capitalize tracking-normal mb-8"
          >
            {data?.title}
          </Typography>
          <Typography variant="" className="md:w-[800px] mx-auto">
            {data?.description}
          </Typography>
        </div>
        <div className="overflow-hidden mt-8" ref={emblaRef}>
          <div className="flex">
            {data?.Testimonial?.map((testimonial) => (
              <div
                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_33.33%]"
                key={testimonial?.id}
              >
                <Testimonial {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </MotionContainer>
    </section>
  );
}
