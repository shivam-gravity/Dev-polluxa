import { fetchAPI } from "@/utils/fetch-api";
import { notFound } from "next/navigation";
import { Article } from "@/components/common";
import { getPostBySlug } from "@/utils/api-loaders";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata(props) {
  const params = await props.params;
  const { slug, locale } = params;
  const data = await getPostBySlug(slug, "articles", locale);

  if (!data?.data?.[0]) return {};

  const pageData = data?.data?.[0]?.attributes;
  const seo = pageData?.seo || {};

  return {
    title: seo?.metaTitle,
    description: seo?.metaDescription,
  };
}

export default async function PostRoute(props) {
  const params = await props.params;
  const { slug, locale } = params;
  setRequestLocale(locale);
  const data = await getPostBySlug(slug, "articles", locale);

  if (data?.data?.length === 0) return notFound();

  return <Article data={data?.data[0]} pageName="blogs" />;
}

export async function generateStaticParams() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(
    path,
    {
      fields: ["slug"],
      populate: {
        category: {
          populate: {
            articles: {
              fields: ["slug"],
            },
          },
        },
      },
    },
    options
  );
  return response?.data?.map((article) => ({
    slug: article?.attributes?.slug,
  })) ?? [];
}
