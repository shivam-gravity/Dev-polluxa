import { sectionRenderer } from "@/utils/section-renderer";
import { Testimonials } from "@/components/common";
import { getGlobal, getPageBySlug } from "@/utils/api-loaders";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

export default async function RootRoute({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  try {
    const [page, testimonial] = await Promise.all([
      getPageBySlug("home", locale),
      getGlobal(locale)
    ]);

    if (page?.error && page?.error?.status == 401)
      throw new Error(
        "Missing or invalid credentials. Have you created an access token using the Strapi admin panel? http://localhost:1337/admin/"
      );


    if (page?.data?.length === 0) return notFound();
    const contentSections = page.data?.[0]?.attributes?.contentSections;
    const testimonialBlock = testimonial?.data?.attributes?.testimonials;

    return (
      <>
        {contentSections?.map((section, index) =>
          sectionRenderer(section, index)
        )}
        <div className="bg-white">
          <Testimonials data={testimonialBlock} />
        </div>
      </>
    );
  } catch (error) {
    console.error("Missing or invalid credentials", error.message);
    return notFound();
  }
}
