import { Link } from "@/i18n/routing";

function selectedFilter(current, selected) {
  return current === selected
    ? "px-6 py-2 rounded-3xl bg-blue-500 hover:bg-blue-600 dark:text-gray-100"
    : "px-6 py-2 rounded-3xl hover:bg-white/30 bg-white/10 dark:text-white";
}

export default function Categories({ categories, params, routeName }) {
  return (
    <div className="border-stone-800 border-y">
      <h4 className="text-xl font-semibold pt-6">Tags</h4>
      <div className="flex flex-nowrap py-6 space-x-4 overflow-auto [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => {
          if (category?.attributes?.articles?.data?.length === 0) return null;
          return (
            <Link
              href={`/${routeName}/${category?.attributes?.slug}`}
              className={selectedFilter(
                category?.attributes?.slug,
                params?.category
              )}
            >
              {category?.attributes?.name}
            </Link>
          );
        })}
        <Link href={`/${routeName}`} className={selectedFilter("", "filter")}>
          #all
        </Link>
      </div>
    </div>
  );
}
