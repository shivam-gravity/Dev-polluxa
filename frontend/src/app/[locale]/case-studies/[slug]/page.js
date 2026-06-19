import { fetchAPI } from "@/utils/fetch-api";
import { notFound } from "next/navigation";
import { Article } from "@/components/common";
import { getPostBySlug } from "@/utils/api-loaders";
import { setRequestLocale } from "next-intl/server";

export default async function PostRoute(props) {
  const params = await props.params;
  const { slug, locale } = params;
  setRequestLocale(locale);
  const data = await getPostBySlug(slug, "case-studies", locale);

  if (data?.data?.length === 0) return notFound();

  return <Article data={data?.data?.[0]} pageName="Case Studies" />;
}

export async function generateMetadata(props) {
  const params = await props.params;
  const { slug, locale } = params;
  const data = await getPostBySlug(slug, "case-studies", locale);

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
  const path = `/case-studies`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(
    path,
    {
      fields: ["slug"],
      populate: {
        case_study: {
          populate: {
            case_studies: {
              fields: ["slug"],
            },
          },
        },
      },
    },
    options
  );
  if (!response?.data) return [];
  return response?.data?.map((caseStudies) => ({
    slug: caseStudies?.attributes?.slug,
  }));
}
