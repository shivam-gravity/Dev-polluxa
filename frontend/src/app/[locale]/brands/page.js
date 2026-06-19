import { notFound } from "next/navigation";
import { subSectionRenderer } from "@/utils/sub-section-renderer";
import { getGlobal, getPageBySlug } from "@/utils/api-loaders";
import { Testimonials } from "@/components/common";
import { InternalContact } from "@/components/forms";
import { setRequestLocale } from "next-intl/server";

export default async function PageRoute({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = await getPageBySlug("brands", locale);
  const testimonial = await getGlobal(locale);

  if (page?.data?.length === 0) return notFound();
  const contentSections = page?.data?.[0]?.attributes?.contentSections;
  const testimonialBlock = testimonial?.data?.attributes?.testimonials;
  const InternalContactForm = contentSections.find(
    (item) => item.__component === "sections.internal-contact-form"
  );
  return (
    <>
      {contentSections.map((section, index) =>
        subSectionRenderer(section, index, "brands")
      )}
      <div className="bg-[#F6F6F6]">
        <Testimonials data={testimonialBlock} />
      </div>
      {InternalContactForm && (
        <InternalContact data={InternalContactForm} department="retail" />
      )}
    </>
  );
}
