import { notFound } from "next/navigation";
import { subSectionRenderer } from "@/utils/sub-section-renderer";
import { getGlobal, getPageBySlug } from "@/utils/api-loaders";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const page = await getPageBySlug("privacy-policy", locale);
  if (!page?.data?.[0]) return {};

  const pageData = page?.data?.[0]?.attributes;
  const seo = pageData?.seo || {};

  return {
    title: seo?.metaTitle,
    description: seo?.metaDescription,
  };
}

export default async function PageRoute({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = await getPageBySlug("privacy-policy", locale);

  if (page?.data?.length === 0) return notFound();
  const contentSections = page?.data?.[0]?.attributes?.contentSections;
  return (
    <>
      {contentSections.map((section, index) =>
        subSectionRenderer(section, index, "privacy-policy")
      )}
    </>
  );
}
