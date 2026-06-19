"use client";
import cx from "classnames";
import { getStrapiMedia } from "@/utils/api-helpers";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useFilter } from "@/hooks";

const filters = ["logistics", "retail", "marketing"];

export default function MultiFilters({ items, columns }) {
  const {
    selectedFilter,
    handleFilterButtonClick,
    handleShowAllButtonClick,
    filteredItems,
  } = useFilter(items, filters);

  return (
    <>
      <div className="flex space-x-3 pb-6 md:space-x-6 md:justify-center overflow-auto [&::-webkit-scrollbar]:hidden">
        <button
          onClick={handleShowAllButtonClick}
          className={cx("border border-[#666] rounded-lg py-2 px-6", {
            "bg-[#070751] text-white": !selectedFilter,
          })}
        >
          All
        </button>
        {filters.map((category, idx) => (
          <button
            onClick={() => handleFilterButtonClick(category)}
            className={cx(
              "border border-[#666] rounded-lg py-2 px-6 hover:bg-[#070751] hover:text-white transition-colors duration-300 ease-in-out",
              {
                "bg-[#070751] text-white": selectedFilter === category,
              }
            )}
            key={`filters-${idx}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div
        className={cx(
          `grid grid-cols-2 md:grid-cols-4 gap-4 item-center justify-center mx-auto`,
          {
            "md:grid-cols-5": columns === "fiveColumn",
          }
        )}
      >
        {filteredItems?.map((item) => {
          const imageElement = item?.media?.data && (
            <Image
              src={getStrapiMedia(item?.media?.data?.attributes?.url)}
              alt={item?.title}
              width={item?.media?.data?.attributes?.width}
              height={item?.media?.data?.attributes?.height}
              className="mx-auto"
            />
          );
          return (
            <div
              className="w-full md:w-auto mt-4 drop-shadow-lg rounded-xl bg-white flex items-center"
              key={item?.id}
            >
              {item?.showLink ? (
                <Link
                  href={item?.url}
                  target={item?.newTab ? "_blank" : "_self"}
                  className="w-full mx-auto py-8 px-6 md:py-14"
                >
                  {imageElement}
                </Link>
              ) : (
                <span className="py-8 px-6 md:py-12 mx-auto">
                  {imageElement}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
