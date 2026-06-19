import { notFound } from "next/navigation";
import { getAllArticles, getPageBySlug } from "@/utils/api-loaders";
import { subSectionRenderer } from "@/utils/sub-section-renderer";
import { CareersGrid } from "@/components/careers";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const page = await getPageBySlug("careers", locale);
  if (!page?.data?.[0]) return {};

  const pageData = page?.data?.[0]?.attributes;
  const seo = pageData?.seo || {};

  return {
    title: seo?.metaTitle,
    description: seo?.metaDescription,
  };
}

export default async function CareersPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const response = await getAllArticles("careers", null, locale);
  const page = await getPageBySlug("careers", locale);

  if (!response?.data || !page?.data || page.data.length === 0) {
    return notFound();
  }

  const contentSections = page?.data?.[0]?.attributes?.contentSections;

  const mainContentSections = contentSections?.filter(
    (item) => item.__component !== "sections.bottom-actions"
  );

  return (
    <>
      {mainContentSections?.map((section, index) =>
        subSectionRenderer(section, index, "careers")
      )}
      {response?.data && <CareersGrid data={response?.data} />}
    </>
  );
}
