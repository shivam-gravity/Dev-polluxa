import { notFound } from "next/navigation";
import { getAllArticles, getPageBySlug } from "@/utils/api-loaders";
import { subSectionRenderer } from "@/utils/sub-section-renderer";
import { EventsGrid } from "@/components/events";
import { BottomActions } from "@/components/common";
import { setRequestLocale } from "next-intl/server";

export default async function EventsPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const response = await getAllArticles("events", 1, locale);
  const page = await getPageBySlug("events", locale);

  if (!response?.data && page?.data?.length === 0) return notFound();

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
        subSectionRenderer(section, index, "events")
      )}

      <EventsGrid data={response?.data} />

      {bottomAction && <BottomActions data={bottomAction} />}
    </>
  );
}
