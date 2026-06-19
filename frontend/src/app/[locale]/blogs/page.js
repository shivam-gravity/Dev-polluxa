import { notFound } from "next/navigation";
import { getAllArticles, getPageBySlug } from "@/utils/api-loaders";
import { subSectionRenderer } from "@/utils/sub-section-renderer";
import { Pagination, BottomActions } from "@/components/common";
import { ArticlesGrid } from "@/components/articles";
import { setRequestLocale } from "next-intl/server";

export default async function BlogsPage(props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { locale } = params;
  setRequestLocale(locale);
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const response = await getAllArticles("articles", page, locale);
  const page_data = await getPageBySlug("blogs", locale);

  if (!response?.data || page_data?.data?.length === 0) return notFound();

  const contentSections = page_data?.data?.[0]?.attributes?.contentSections;
  const bottomAction = contentSections?.find(
    (item) => item.__component === "sections.bottom-actions"
  );

  const mainContentSections = contentSections?.filter(
    (item) => item.__component !== "sections.bottom-actions"
  );

  return (
    <>
      {mainContentSections &&
        mainContentSections?.map((section, index) =>
          subSectionRenderer(section, index, "blogs")
        )}

      <ArticlesGrid data={response?.data} />

      <Pagination
        currentPage={page}
        pageCount={response?.meta?.pagination?.pageCount}
        total={response?.meta?.pagination?.total}
      />

      {bottomAction && <BottomActions data={bottomAction} />}
    </>
  );
}
