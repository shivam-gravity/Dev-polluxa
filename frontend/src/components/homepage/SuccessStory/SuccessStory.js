import { Link } from "@/i18n/routing";
import { getStrapiMedia } from "@/utils/api-helpers";
import { Typography } from "@/components/ui";
import Image from "next/image";
import cx from "classnames";
import { ArrowRight } from "@/assets/images";

const SuccessStories = (props) => {
  const { data } = props;
  const { title, description, StoryItem: stories } = data;

  return (
    <section className="py-6 px-4 bg-white lg:py-12 md:px-0">
      <div className="mx-auto md:max-w-[1230px] 2xl:max-w-[1440px]">
        <div className="text-center mb-8 md:mb-16">
          {title && (
            <Typography variant="heading1" className="mx-auto text-[#003464]">
              {title}
            </Typography>
          )}
          {description && (
            <Typography
              variant="body1"
              className="md:w-[800px] 2xl:w-[1000px] text-[#333333] mx-auto"
            >
              {description}
            </Typography>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {stories?.map((story, index) => {
            const storyImage = story?.media?.file?.data?.attributes;
            const logoImage = story?.logo?.file?.data?.attributes;
            return (
              <Link
                href={story.url || "#"}
                key={index}
                className={cx(
                  "relative group",
                  index === 0 ? "md:col-span-2 md:row-span-2" : ""
                )}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  {storyImage?.url && (
                    <Image
                      src={getStrapiMedia(storyImage?.url)}
                      alt={storyImage?.alternativeText || ""}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full flex flex-col">
                    <div className="relative h-10 mb-4 w-[70%]">
                      {logoImage?.url && (
                        <Image
                          src={getStrapiMedia(logoImage?.url)}
                          fill
                          alt={logoImage?.alternativeText || ""}
                          className="object-contain object-left"
                        />
                      )}
                    </div>
                    {story?.description && (
                      <p className="text-white leading-5 sm:leading-6 text-xs sm:text-sm md:text-xl font-semibold line-clamp-3 mb-4 max-h-[50%] overflow-hidden">
                        {story?.description}
                      </p>
                    )}
                    <div className="flex items-center">
                      <span className="text-white text-sm">Case Study</span>
                      <ArrowRight className="ms-4 text-white transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
