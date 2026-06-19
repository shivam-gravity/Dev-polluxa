"use client";
import { useState, useRef } from "react";
import { Typography, Video } from "@/components/ui";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/api-helpers";

const LargeVideo = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { data, fontInter } = props;
  const { description, title, video, poster } = data;
  const videoUrl = video?.data?.attributes?.url;
  const posterUrl = poster?.data?.attributes?.url;
  const videoRef = useRef(null);
  const handleToggle = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };
  return (
    <>
      <section className="py-12 md:py-24 bg-white">
        <div className="container-custom px-5 md:px-0">
          <div className="text-center">
            {title && (
              <Typography
                variant="heading1"
                className="text-[#003464] text-4xl md:text-4xl font-bold leading-tight"
              >
                {title}
              </Typography>
            )}
            {description && (
              <Typography
                variant="body1"
                className={`md:w-[800px] 2xl:w-[1000px] mx-auto line-clamp-3`}
              >
                {description}
              </Typography>
            )}
          </div>

          {video?.data && (
            <div className="relative">
              <Video
                videoUrl={videoUrl}
                autoPlay={isPlaying}
                ref={videoRef}
                className="rounded-3xl"
                isMuted={false}
                poster={posterUrl}
              />
              <button
                className="w-20 h-20 absolute top-1/2 left-0 right-0 mx-auto transform -translate-y-1/2 z-30 rounded-full md:w-36 md:h-36 border-4 border-white"
                onClick={handleToggle}
              >
                {/* Render play or pause icon based on isPlaying state */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-10 h-10 md:w-20 md:h-20 text-white mx-auto"
                >
                  {isPlaying ? (
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  ) : (
                    <path d="M8 5v14l11-7z" />
                  )}
                </svg>
              </button>
            </div>
          )}
          {!video?.data && poster?.data && (
            <div className="relative pt-8 md:pt-16 flex justify-center">
              <Image
                src={getStrapiMedia(poster?.data?.attributes?.url)}
                alt={
                  poster?.data?.attributes?.alternativeText ||
                  `Video Poster ${poster?.data?.attributes?.name}`
                }
                width={poster?.data?.attributes?.width || 1920}
                height={poster?.data?.attributes?.height || 1080}
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60%"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default LargeVideo;
