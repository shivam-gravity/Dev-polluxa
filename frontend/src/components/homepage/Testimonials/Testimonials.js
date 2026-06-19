"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getStrapiMedia } from "@/utils/api-helpers";
import { IconBlockQuote2 } from "@/assets/images";

const Slider = dynamic(() => import("react-slick"));

function Testimonial({ text, authorName, picture, authorTitle }) {
  const imageUrl = getStrapiMedia(picture?.data?.attributes?.url);
  return (
    <div className="bg-white p-8 text-[#333] rounded-2xl relative">
      <p className="mb-24 text-sm md:text-base 2xl:text-xl min-h-[128px] max-h-[128px] md:min-h-[148px] md:max-h-[148px] 2xl:min-h-[168px] 2xl:max-h-[168px]  line-clamp-6">
        {text}
      </p>
      <div className="mr-auto absolute bottom-0 mb-8 z-10">
        <p className="text-[#070751] text-base 2xl:text-xl">{authorName}</p>
        <p className="text-sm 2xl:text-base text-[#666666]">{authorTitle}</p>
        <div className="w-[130px] mt-3">
          <Image
            src={imageUrl ?? ""}
            alt={picture?.data?.attributes?.alternativeText || "none provided"}
            width={picture?.data?.attributes?.width}
            height={picture?.data?.attributes?.height}
          />
        </div>
      </div>
      <IconBlockQuote2 className="absolute bottom-3 right-3" />
    </div>
  );
}

export default function Testimonials({ data }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
        },
      },
    ],
  };
  return (
    <section className="relative md:max-w-[350px] 2xl:max-w-[432px] mx-auto">
      <div className="testimonial-slider home-testimonial-slider">
        <Slider {...settings}>
          {data?.Testimonial?.map((testimonial) => (
            <Testimonial key={testimonial?.id} {...testimonial} />
          ))}
        </Slider>
      </div>
    </section>
  );
}
