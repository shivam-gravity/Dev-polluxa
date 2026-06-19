import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/api-helpers";

export default function EventGalleryVideo({ data }) {
  const { media, video, header } = data;
  const { heading, description } = header;

  return (
    <>
      <div className="bg-white py-6">
        <div className="container-custom md:gap-9 md:max-w-[1230px] 2xl:max-w-[1440px] mx-auto px-3 text-center">
          {heading && (
            <div className="py-4 md:py-5 text-base md:text-4xl md:leading-[44px] 2xl:text-5xl 2xl:leading-[62px] font-medium tracking-normal text-[#003464] capitalize">
              {heading}
            </div>
          )}
          {description && (
            <div className="pb-4 md:text-base md:w-full md:pb-5 text-[#333333]">
              {description}
            </div>
          )}
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#10A0C0] to-[#2997FC] py-20">
        <div className="relative md:max-w-[1230px] 2xl:max-w-[1440px] mx-auto px-3 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {media?.length > 0 && (
              <div className="bg-black rounded-3xl shadow-lg">
                <div className="grid place-items-center md:grid-cols-2 gap-6 p-6">
                  {media?.map((item) => {
                    const image = item?.file?.data?.attributes;
                    return (
                      image?.url && (
                        <Image
                          key={item?.id}
                          src={getStrapiMedia(image?.url)}
                          alt={image?.alternativeText || "Event Image"}
                          width={image?.width}
                          height={image?.height}
                          className="rounded-3xl"
                        />
                      )
                    );
                  })}
                </div>
              </div>
            )}

            {video?.url && (
              <div className="bg-black rounded-3xl shadow-lg grid items-center w-full py-6">
                <div className="rounded-3xl shadow-lg aspect-video">
                  <iframe
                    src={video?.url}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    className="w-full h-full object-cover border-0"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
