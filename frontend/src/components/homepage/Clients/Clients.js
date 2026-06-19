"use client";
import dynamic from "next/dynamic";
import { Link } from "@/i18n/routing";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";
import { Typography, Button } from "@/components/ui";

const Slider = dynamic(() => import("react-slick"));

const Clients = (props) => {
  const { data } = props;
  const { heading, Client, subtitle, Button: btnJoin, enable } = data;
  if (enable === false) return;
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="py-12 md:py-24 px-5 md:px-0 mx-auto border-b border-[#E2E2E2]">
      <div className="items-center text-white">
        {heading && (
          <div className="text-center">
            <Typography variant="gradient">{heading}</Typography>
          </div>
        )}
        <div className="overflow-hidden py-6 md:py-12 md:px-24 mx-auto">
          <Slider {...settings}>
            {Client?.map((item) => (
              <div key={item?.id} className="px-6 md:px-8">
                <Image
                  src={getStrapiMedia(item?.media?.data?.attributes?.url)}
                  alt={item?.title}
                  width={item?.media?.data?.attributes?.width}
                  height={item?.media?.data?.attributes?.height}
                  className="mx-auto"
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="md:flex items-center justify-center space-x-6 text-center">
          {subtitle && (
            <div className="text-center">
              <Typography variant="body1">
                <span className="text-sm md:text-lg 2xl:text-2xl">
                  {subtitle}
                </span>
              </Typography>
            </div>
          )}
          {btnJoin && (
            <Link href={btnJoin?.url}>
              <Button type="button" variant={btnJoin?.type} icon={false}>
                {btnJoin?.text}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Clients;
