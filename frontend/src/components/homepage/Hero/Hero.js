"use client";
import Image from "next/image";
import cx from "classnames";
import { getStrapiMedia } from "@/utils/api-helpers";
import { Button } from "@/components/ui";
import { Link } from "@/i18n/routing";

const Hero = ({ data }) => {
  const { picture, title, description, buttons, subHeading, bgColor, video } =
    data;
  const videoUrl = video
    ? `https://player.vimeo.com/video/${video}?autoplay=1&loop=1&muted=1&controls=0&byline=0&portrait=0&dnt=1`
    : null;
  const heroImage = picture?.data?.attributes;

  return (
    <section
      className={cx(
        bgColor ? `bg-[${bgColor}]` : "bg-[#F0F0F0]",
        "px-6 md:px-0 py-10 text-center md:text-left"
      )}
    >
      <div className="container-custom relative">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8 items-center min-h-[300px]">
          {/* Left Content - 4/10 */}
          <div className="md:col-span-4 space-y-6 z-10">
            {subHeading && (
              <h2 className="text-md font-regular text-[#333333] leading-auto">
                {subHeading}
              </h2>
            )}
            {title && (
              <h1 className="text-4xl md:text-5xl font-bold text-[#003464] leading-auto">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-[#333333] text-md leading-7">{description}</p>
            )}
            {buttons?.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4 mt-5">
                {buttons?.map(
                  (button) =>
                    button?.url && (
                      <Link
                        href={button?.url}
                        key={button?.id}
                        className="inline-block w-auto"
                      >
                        <Button
                          type="button"
                          variant={button?.type}
                          className="bg-[#0D8AFD]"
                        >
                          {button?.text}
                        </Button>
                      </Link>
                    )
                )}
              </div>
            )}
          </div>

          {/* Right Image - 6/10 */}
          <div className="md:col-span-6 relative w-full flex justify-end">
            {videoUrl ? (
              <div className="relative w-full pb-[60%]">
                <iframe
                  src={videoUrl}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
            ) : (
              heroImage && (
                <div className="relative">
                  <Image
                    src={getStrapiMedia(heroImage?.url)}
                    alt={heroImage?.alternativeText || title || `Hero Image ${heroImage?.id}`}
                    width={heroImage?.width}
                    height={heroImage?.height}
                    priority
                    className="object-cover"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
