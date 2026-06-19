import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getStrapiMedia } from "@/utils/api-helpers";
import { IcoFeaturedProductLink } from "@/assets/images";

const ProductList = ({ item }) => (
  <>
    {item.media && (
      <Image
        src={
          item.media?.file?.data &&
          getStrapiMedia(item.media?.file?.data?.attributes?.url)
        }
        alt={item.media?.file?.data?.attributes?.alternativeText || heading}
        width={item.media?.file?.data?.attributes?.width}
        height={item.media?.file?.data?.attributes?.height}
        className="mt-1.5"
      />
    )}
    <div className="relative w-full pr-6">
      <h3 className="text-[#333333] text-lg md:text-xl">{item.title}</h3>
      <p className="min-h-[48px] text-sm md:text-base">{item.description}</p>
      {item.url && (
        <IcoFeaturedProductLink className="absolute top-1/2 -translate-y-1/2 right-0" />
      )}
    </div>
  </>
);

const FeaturedProducts = ({ featuredProducts }) => {
  const { ProductItem } = featuredProducts;
  return (
    <div className="bg-white ml-auto mt-8 rounded-xl md:min-w-[0px] md:max-w-[500px] md:mt-0 md:rounded-2xl">
      <h4 className="text-xs px-6 text-[#666666] uppercase border-b border-[#E2E2E2] py-4 md:px-8 md:text-sm">
        {featuredProducts?.title}
      </h4>
      {ProductItem?.map((item) => {
        return (
          <>
            {item.url ? (
              <Link
                key={item?.id}
                href={item?.url}
                className="px-8 py-3 flex space-x-6 items-start hover:bg-[#E2E2E2] transition-colors duration-300 ease-in-out md:py-6"
              >
                <ProductList item={item} />
              </Link>
            ) : (
              <div className="px-8 py-6 flex space-x-6 items-start">
                <ProductList item={item} />
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default FeaturedProducts;
