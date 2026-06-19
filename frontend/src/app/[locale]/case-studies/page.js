import { notFound } from "next/navigation";
import { getAllArticles, getPageBySlug } from "@/utils/api-loaders";
import { subSectionRenderer } from "@/utils/sub-section-renderer";
import BottomActions from "@/components/common/BottomActions";
import { ArticlesGrid } from "@/components/articles";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const page = await getPageBySlug("case-studies", locale);
  if (!page?.data?.[0]) return {};

  const pageData = page?.data?.[0]?.attributes;
  const seo = pageData?.seo || {};

  return {
    title: seo?.metaTitle,
    description: seo?.metaDescription,
  };
}

export default async function CaseStudies({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const response = await getAllArticles("case-studies", null, locale);
  const page = await getPageBySlug("case-studies", locale);

  if (!response?.data || page?.data?.length === 0) {
    return notFound();
  }

  const contentSections = page?.data?.[0]?.attributes?.contentSections;
  const bottomAction = contentSections?.find(
    (item) => item.__component === "sections.bottom-actions"
  );

  const mainContentSections = contentSections?.filter(
    (item) => item.__component !== "sections.bottom-actions"
  );

  return (
    <>
      {mainContentSections?.map((section, index) =>
        subSectionRenderer(section, index, "case-studies")
      )}

      <ArticlesGrid data={response?.data} pageName="Case Studies" />

      {bottomAction && <BottomActions data={bottomAction} />}
    </>
  );
}
