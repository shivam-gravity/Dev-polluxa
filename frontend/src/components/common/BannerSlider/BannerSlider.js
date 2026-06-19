"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getStrapiMedia } from "@/utils/api-helpers";
import { SectionHeader } from "@/components/common";

const Slider = dynamic(() => import("react-slick"));

const BannerSlider = ({ data }) => {
  const { title, description, Slides } = data;
  const banners = Slides?.files?.data;
  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          arrows: false,
        },
      },
    ],
  };
  return (
    <section className="py-12 md:py-24">
      <div className="px-5 md:px-0 container-custom">
        <SectionHeader title={title} description={description} />
        <div className="max-w-[900px] mx-auto testimonial-slider home-testimonial-slider">
          <Slider {...settings}>
            {banners?.map((banner) => (
              <div key={banner?.id}>
                <Image
                  src={getStrapiMedia(banner?.attributes?.url)}
                  alt={banner?.attributes?.alternativeText}
                  width={banner?.attributes?.width}
                  height={banner?.attributes?.height}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default BannerSlider;
