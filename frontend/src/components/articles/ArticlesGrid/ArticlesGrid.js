"use client";
import { EnhancedCard } from "@/components/ui";
import { usePathname } from "@/i18n/routing";


const ArticlesGrid = (props) => {
  const { data, pageName } = props;
  const pathname = usePathname();
  const basePath = pathname.split("/")[1];

  return (
    <section className="py-12 px-5 relative bg-[#F9F9F9] md:py-24 md:px-0">
      <div className="mx-auto md:max-w-[1230px] 2xl:max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mt-16">
          {data?.map((item) => {
            const { attributes } = item;
            const { title, description, slug, cover: icon } = attributes;
            const image = icon?.data?.attributes;
            return (
              <EnhancedCard
                pageName={pageName}
                title={title}
                description={description}
                media={image}
                url={`${basePath}/${slug}`}
                key={item?.id}
                bgColor={"bg-white"}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ArticlesGrid;
