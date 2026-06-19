import { fetchAPI } from "@/utils/fetch-api";
import { notFound } from "next/navigation";
import { Post } from "@/components/common";
import { getPostBySlug } from "@/utils/api-loaders";
import { setRequestLocale } from "next-intl/server";

export default async function PostRoute(props) {
  const params = await props.params;
  const { slug, locale } = params;
  setRequestLocale(locale);
  const data = await getPostBySlug(slug, "industries", locale);
  if (data?.data?.length === 0) return notFound();
  return <Post data={data?.data?.[0]} pageName="industries" />;
}

export async function generateStaticParams() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/industries`;
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
  return articleResponse?.data?.map((article) => ({
    slug: article.attributes.slug,
  }));
}

export async function generateMetadata(props) {
  const params = await props.params;
  const { slug, locale } = params;
  const data = await getPostBySlug(slug, "industries", locale);

  if (!data?.data?.[0]) return {};

  const pageData = data?.data?.[0]?.attributes;
  const seo = pageData?.seo || {};

  return {
    title: seo?.metaTitle,
    description: seo?.metaDescription,
  };
}
