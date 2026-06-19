import { fetchAPI } from "@/utils/fetch-api";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/utils/api-loaders";
import { EventDetails } from "@/components/events";
import { setRequestLocale } from "next-intl/server";

export default async function PostRoute(props) {
  const params = await props.params;
  const { slug, locale } = params;
  setRequestLocale(locale);
  const data = await getPostBySlug(slug, "events", locale);
  if (!data?.data || data?.data?.length === 0) return notFound();

  return <EventDetails data={data?.data?.[0]} pageName="events" />;
}

export async function generateStaticParams() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/events`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(
    path,
    {
      fields: ["slug"],
      populate: {
        category: {
          populate: {
            events: {
              fields: ["slug"],
            },
          },
        },
      },
    },
    options
  );
  if (!response?.data) return [];
  return response?.data?.map((event) => ({
    slug: event?.attributes?.slug,
  }));
}

export async function generateMetadata(props) {
  const params = await props.params;
  const { slug, locale } = params;
  const data = await getPostBySlug(slug, "events", locale);

  if (!data?.data?.[0]) return {};

  const pageData = data?.data?.[0]?.attributes;
  const seo = pageData?.seo || {};

  return {
    title: seo?.metaTitle,
    description: seo?.metaDescription,
  };
}
