import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";
import { IconUpArrowRound } from "@/assets/images";

const Achievements = ({ achievements }) => {
  return (
    <div>
      {achievements?.description && (
        <p className="text-base md:text-lg text-[#333] text-center pt-16 pb-12">
          {achievements?.description}
        </p>
      )}
      <div className="flex flex-wrap justify-center lg:justify-between items-stretch gap-6 ">
        {achievements?.KPI?.length > 0 &&
          achievements?.KPI?.map((item) => (
            <div
              key={item?.id}
              className="flex flex-row items-center p-3 shadow-sm bg-[#F9F9F9] gap-6 w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] "
            >
              <div className="h-full flex items-center justify-center px-6 bg-white w-[45%]">
                {item?.image?.data?.attributes?.url && (
                  <Image
                    src={getStrapiMedia(item?.image?.data?.attributes?.url)}
                    alt={item?.image?.data?.attributes?.alternativeText || item?.metric || `Achievement Image ${item?.image?.data?.attributes?.id}`}
                    width={item?.image?.data?.attributes?.width}
                    height={item?.image?.data?.attributes?.height}
                    className="mx-auto"
                  />
                )}
              </div>
              <div className="flex flex-col items-center justify-center p-2 w-[55%] gap-4">
                {item?.metric && (
                  <div className="flex items-end gap-2">
                    <p className="text-4xl md:text-5xl font-semibold text-[#003464]">
                      {item?.metric}
                      {item?.metricSuffix && (
                        <span className="text-3xl lg:text-4xl text-[#003464]">
                          {item?.metricSuffix}
                        </span>
                      )}
                    </p>
                    <IconUpArrowRound />
                  </div>
                )}
                {item?.description && (
                  <span className="text-base text-[#333] text-center">
                    {item?.description}
                  </span>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Achievements;
