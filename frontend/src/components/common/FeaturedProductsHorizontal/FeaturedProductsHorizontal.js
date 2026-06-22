import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getStrapiMedia } from "@/utils/api-helpers";
import { IcoFeaturedProductLink } from "@/assets/images";

const ProductList = ({ item }) => (
  <div className="flex items-center space-x-5">
    {item.media && (
      <Image
        src={
          item.media?.file?.data &&
          getStrapiMedia(item.media?.file?.data?.attributes?.url)
        }
        alt={item.media?.file?.data?.attributes?.alternativeText}
        width={item.media?.file?.data?.attributes?.width}
        height={item.media?.file?.data?.attributes?.height}
        className="mt-1.5"
      />
    )}
    <div className="relative w-full pr-6">
      <h3 className="text-[#333333] text-lg md:text-xl font-medium mb-1">
        {item.title}
      </h3>
      <p className="min-h-[48px] text-sm md:text-base">{item.description}</p>
      {item.url && (
        <IcoFeaturedProductLink className="absolute top-1/2 -translate-y-1/2 right-0" />
      )}
    </div>
  </div>
);

const FeaturedProductsHorizontal = ({ data }) => {
  const { ProductItem, title } = data || {};
  return (
    <section className="py-16 bg-[#EEF0F5] px-6">
      <div className="container-custom">
        {title && (
          <h4 className="text-xs px-6 text-[#666666] uppercase border-b border-[#E2E2E2] py-4 md:px-8 md:text-sm">
            {data?.title}
          </h4>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ProductItem?.map((item) => {
            return (
              <div key={item?.id} className="bg-white flex items-center px-8 py-3 hover:bg-[#E2E2E2] transition-colors duration-300 ease-in-out md:py-6">
                {item.url ? (
                  <Link href={item?.url} className="">
                    <ProductList item={item} />
                  </Link>
                ) : (
                  <div className="px-8 py-6 flex space-x-6 items-start">
                    <ProductList item={item} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsHorizontal;
