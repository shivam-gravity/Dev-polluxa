import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";
import { Typography } from "@/components/ui";

const Company = (props) => {
  const { data, fontInter } = props;
  const { title, description, Bullets, media, enable } = data;
  const image = media?.file?.data?.attributes;

  if (enable === false) return;

  return (
    <section className="py-12 md:py-24 px-6 relative bg-[#F2F4F8]">
      <div className="max-w-[1300px] mx-auto">
        <div className="text-center">
          <Typography variant="gradient" className="tracking-widest">
            {title}
          </Typography>
          <Typography
            variant="heading1"
            className={`md:w-[800px] mx-auto ${fontInter.className}`}
          >
            {description}
          </Typography>
        </div>
        <div className="grid grid-cols-1 gap-10 md:gap-20 md:grid-cols-2">
          <div>
            <Image
              src={getStrapiMedia(image?.url)}
              alt={image?.alternativeText}
              width={image?.width}
              height={image?.height}
              className="mx-auto"
            />
          </div>
          <div>
            <ol className="space-y-4 text-left">
              {Bullets?.map((list, index) => (
                <li className="flex space-x-3 relative space-y-6">
                  <span className="block rounded-full bg-[#0D6EFD] text-white w-[34px] h-[34px] absolute text-center top-6 leading-[34px]">
                    {index + 1}
                  </span>
                  <span className="pl-10 text-base md:text-xl 2xl:text-2xl">
                    {list?.Bullet}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Company;
