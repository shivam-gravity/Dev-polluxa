import { fetchAPI } from "@/utils/fetch-api";
import { notFound } from "next/navigation";
import { Post } from "@/components/common";
import { getPostBySlug } from "@/utils/api-loaders";
import { setRequestLocale } from "next-intl/server";

export default async function PostRoute({ params }) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const data = await getPostBySlug(slug, "agentcommerces", locale);

  if (data?.data?.length === 0) return notFound();
  return <Post data={data?.data?.[0]} />;
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const data = await getPostBySlug(slug, "agentcommerces", locale);

  if (!data?.data?.[0]) return {};

  const pageData = data?.data?.[0]?.attributes;
  const seo = pageData?.seo || {};

  return {
    title: seo?.metaTitle,
    description: seo?.metaDescription,
  };
}

export async function generateStaticParams() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/agentcommerces`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const urlParamsObject = {
    filters: {
      slug: {
        $ne: null,
        publicationState: "live",
      },
    },
  };
  const articleResponse = await fetchAPI(path, urlParamsObject, options);
  if (!articleResponse?.data) return [];
  return articleResponse?.data?.map((article) => ({
    slug: article.attributes.slug,
  }));
}
