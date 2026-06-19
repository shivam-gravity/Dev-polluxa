import Image from "next/image";
import { getStrapiMedia } from "@/utils/api-helpers";
import { Typography } from "@/components/ui";

const CeoMessage = (props) => {
  const { data, fontInter } = props;
  const {
    description,
    media,
    title,
    paragraph1,
    paragraph2,
    name,
    designation,
    signature,
  } = data;
  return (
    <section className="py-12 md:py-24">
      <div className="container-custom px-5 md:px-0">
        <div className="text-center">
          {title && (
            <Typography variant="gradient" className="tracking-widest">
              {title}
            </Typography>
          )}

          {description && (
            <Typography
              variant="heading1"
              className={`mt-6 mb-12 md:w-[800px] mx-auto ${fontInter.className}`}
            >
              {description}
            </Typography>
          )}
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-12">
          {media?.file?.data && (
            <Image
              src={getStrapiMedia(media?.file?.data?.attributes?.url)}
              alt={media?.file?.data?.attributes?.alternativeText}
              width={media?.file?.data?.attributes?.width}
              height={media?.file?.data?.attributes?.height}
            />
          )}
          {paragraph1 && (
            <p
              className={`text-base md:text-lg 2xl:text-xl text-[#333] ${fontInter.className}`}
            >
              {paragraph1}
            </p>
          )}
          {paragraph2 && (
            <div>
              <p
                className={`text-base md:text-lg 2xl:text-xl text-[#333] mb-12 ${fontInter.className}`}
              >
                {paragraph2}
              </p>
              <div className="flex">
                <div>
                  <p
                    className={`text-[#0774F5] md:text-2xl 2xl:text-3xl font-semibold mb-3 ${fontInter.className}`}
                  >
                    {name}
                  </p>
                  <p className="">{designation}</p>
                </div>
                <div className="ml-auto">
                  {signature?.data && (
                    <Image
                      src={getStrapiMedia(signature?.data?.attributes?.url)}
                      alt={signature?.data?.attributes?.alternativeText}
                      width={signature?.data?.attributes?.width}
                      height={signature?.data?.attributes?.height}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CeoMessage;
