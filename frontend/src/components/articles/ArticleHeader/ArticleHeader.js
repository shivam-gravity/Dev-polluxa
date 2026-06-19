import Image from "next/image";
import { getStrapiMedia } from "@/utils/api-helpers";

const ArticleHeader = ({ title, description, cover }) => {
  return (
    <div className="w-full">
      <div className="py-12 container-custom">
        <div className="2xl:max-w-[1440px] md:max-w-[1230px] mx-auto">
          <div className="mb-8 text-center">
            {title && (
              <h1 className="text-[#003464] text-2xl md:text-5xl font-bold mb-6 md:mb-12 leading-16 md:max-w-[80%] mx-auto">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-[#333] text-base leading-relaxed md:max-w-[60%] mx-auto">
                {description}
              </p>
            )}
          </div>
          {cover?.data?.attributes?.url && (
            <div className="relative w-full flex justify-center">
              <Image
                src={getStrapiMedia(cover?.data?.attributes?.url)}
                alt={cover?.data?.attributes?.alternativeText || title || "Article Cover"}
                width={cover?.data?.attributes?.width}
                height={cover?.data?.attributes?.height}
                priority
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleHeader;
