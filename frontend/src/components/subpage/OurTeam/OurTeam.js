import Image from "next/image";
import { getStrapiMedia } from "@/utils/api-helpers";
import { Typography } from "@/components/ui";

const OurTeam = (props) => {
  const { data, fontInter } = props;
  const { description, feature, title } = data;
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

        <div
          className={`grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-14 ${fontInter.className}`}
        >
          {feature?.map((item) => (
            <div className="text-center relative group" key={item?.id}>
              <Image
                src={getStrapiMedia(item?.media?.data?.attributes?.url)}
                alt={item?.media?.data?.attributes?.alternativeText}
                width={item?.media?.data?.attributes?.width}
                height={item?.media?.data?.attributes?.height}
                className="mb-4 rounded-3xl"
              />
              {item?.MediaHover?.data && (
                <Image
                  src={getStrapiMedia(item?.MediaHover?.data?.attributes?.url)}
                  alt={item?.MediaHover?.data?.attributes?.alternativeText}
                  width={item?.MediaHover?.data?.attributes?.width}
                  height={item?.MediaHover?.data?.attributes?.height}
                  className="mb-4 rounded-3xl absolute top-0 opacity-0 md:group-hover:opacity-100 transition duration-300"
                />
              )}
              <p className="text-lg md:text-2xl 2xl:text-3xl">{item?.title}</p>
              <p className="py-1 text-[#848484] text-base md:text-lg 2xl:text-2xl">
                {item?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
