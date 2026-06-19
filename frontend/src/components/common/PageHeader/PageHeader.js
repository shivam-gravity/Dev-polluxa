import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";

export default function PageHeader({ data }) {
  const { title, description, media } = data || {};
  return (
    <section className="px-6 relative w-full flex justify-center md:bg-black md:px-0">
      <div className="absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 container-custom w-full hidden md:block">
        <div className="max-w-[740px]">
          {title && (
            <h2 className="text-3xl md:text-[40px] 2xl:text-5xl pb-4 md:leading-[48px] 2xl:leading-[62px] font-medium">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm md:text-xl 2xl:text-2xl">{description}</p>
          )}
        </div>
      </div>
      <div className="py-12 md:hidden">
        {title && (
          <h2 className="text-3xl md:text-[40px] 2xl:text-5xl pb-4 md:leading-[48px] 2xl:leading-[62px] font-medium">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-sm md:text-xl 2xl:text-2xl">{description}</p>
        )}
      </div>
      {media?.file?.data && (
        <Image
          src={
            media?.file?.data &&
            getStrapiMedia(media?.file?.data?.attributes?.url)
          }
          alt={media?.file?.data?.attributes?.alternativeText}
          width={media?.file?.data?.attributes?.width}
          height={media?.file?.data?.attributes?.height}
          loading="eager"
          priority
          className="hidden md:block"
        />
      )}
    </section>
  );
}
