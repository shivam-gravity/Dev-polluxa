import { fetchAPI } from "@/utils/fetch-api";
import { notFound } from "next/navigation";
import { Post } from "@/components/common";
import { getPostBySlug } from "@/utils/api-loaders";
import { getStrapiMedia } from "@/utils/api-helpers";
import { FALLBACK_SEO } from "@/utils/constants";
import { setRequestLocale } from "next-intl/server";

export default async function PostRoute(props) {
  const params = await props.params;
  const { slug, locale } = params;
  setRequestLocale(locale);
  const data = await getPostBySlug(slug, "partners", locale);
  if (data?.data === null || data?.data?.length === 0) return notFound();
  return <Post data={data?.data?.[0]} />;
}

export async function generateMetadata(props) {
  const params = await props.params;
  const { slug, locale } = params;
  const page = await getPostBySlug(slug, "partners", locale);

  if (!page?.data?.[0]?.seo) {
    return FALLBACK_SEO;
  }

  const metadata = page?.data?.[0]?.seo;

  return {
    title: metadata?.metaTitle,
    description: metadata?.metaDescription,
    openGraph: {
      title: metadata?.ogTitle,
      description: metadata?.ogDescription,
      images: [
        {
          url: getStrapiMedia(metadata?.shareImage?.url),
          width: metadata?.shareImage?.width,
          height: metadata?.shareImage?.height,
        },
      ],
    },
  };
}
export async function generateStaticParams() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/partners`;
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
