import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";

export const FeatureContent = ({ feature }) => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-[0.55] space-y-4">
        {feature?.title && (
          <h2 className="text-3xl font-regular text-black">{feature?.title}</h2>
        )}
        {feature?.description && (
          <p className="text-base text-[#333] leading-[1.6]">
            {feature?.description}
          </p>
        )}

        <ul className="space-y-2">
          {feature?.bullets?.map((item) => (
            <li key={item?.id} className="flex items-start">
              <span className="mr-2">•</span>
              <p className="text-base text-[#333] leading-[1.6]">
                {item?.Bullet}
              </p>
            </li>
          ))}
        </ul>
      </div>
      {feature?.image?.data?.attributes?.url && (
        <div className="flex-[0.45]">
          <div className="relative overflow-hidden">
            <Image
              src={getStrapiMedia(feature?.image?.data?.attributes?.url)}
              alt={feature?.title || feature?.image?.data?.attributes?.alternativeText || `Feature Image ${feature?.image?.data?.attributes?.id}`}
              width={feature?.image?.data?.attributes?.width}
              height={feature?.image?.data?.attributes?.height}
            />
          </div>
        </div>
      )}
    </div>
  );
};
