"use client";
import { useState } from "react";
import { Link } from "@/i18n/routing";
import { IconBack } from "@/assets/images";
const EmbedVideo = (props) => {
  const { data, pageName } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const handleVideoLoad = () => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  };
  return (
    <section className="py-12 bg-white">
      <div className="container-custom px-5 md:px-0">
        <div className="w-[30px] md:w-[40px]">
          <Link href={`/${pageName}`} className="pb-6 block">
            <IconBack />
          </Link>
        </div>
        {/* Shimmer Loader */}
        {!isLoaded && (
          <div className="relative w-full h-0 pt-[56.25%]">
            <div className="absolute top-0 left-0 w-full h-full bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
        )}
        <div
          className={`relative pt-[56.25%] ${isLoaded ? "block" : "hidden"}`}
        >
          <iframe
            src={`${data?.url}`}
            title="Vimeo video player"
            allow="autoplay; fullscreen; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
            onLoad={handleVideoLoad}
          />
        </div>
      </div>
    </section>
  );
};

export default EmbedVideo;
