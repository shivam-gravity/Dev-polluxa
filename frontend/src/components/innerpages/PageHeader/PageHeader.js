import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";

export default function PageHeader({ fontInter, fontBakBak, data }) {
  const { heading, description, media, title } = data || {};
  return (
    <section className="py-12 bg-[#070751] px-6 md:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        <div className={`${fontInter.className} flex`}>
          <Image
            src={
              media?.file?.data &&
              getStrapiMedia(media?.file?.data?.attributes?.url)
            }
            alt={media?.file?.data?.attributes?.alternativeText || heading}
            width={media?.file?.data?.attributes?.width}
            height={media?.file?.data?.attributes?.height}
            className="align-top mr-4 max-w-16 md:max-w-full"
          />
          <div>
            {heading && (
              <p
                className={`text-3xl md:text-6xl text-white 2xl:text-7xl font-bold uppercase tracking-wider ${fontBakBak.className}`}
              >
                {heading}
              </p>
            )}
            {title && (
              <p className="text-white text-sm md:text-base">{title}</p>
            )}
          </div>
        </div>
        <div className="pt-10 md:pt-0">
          {description && (
            <p className="text-white leading-8 2xl:leading-10 font-extralight text-base md:text-xl 2xl:text-2xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
