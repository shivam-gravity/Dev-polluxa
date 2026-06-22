import { fetchAPI } from "@/utils/fetch-api";
import { notFound } from "next/navigation";
import {
  CareerHeader,
  CareerDescription,
  SimilarJobs,
} from "@/components/careers";
import { getPostBySlug } from "@/utils/api-loaders";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata(props) {
  const params = await props.params;
  const { slug, locale } = params;
  const data = await getPostBySlug(slug, "careers", locale);

  if (!data?.data?.[0]) return {};

  const pageData = data?.data?.[0]?.attributes;
  const seo = pageData?.seo || {};

  return {
    title: seo?.metaTitle,
    description: seo?.metaDescription,
  };
}

export default async function CareerPage(props) {
  const params = await props.params;
  const { slug, locale } = params;
  setRequestLocale(locale);
  const career = await getPostBySlug(slug, "careers", locale);
  if (career?.data?.length === 0) return notFound();

  const jobData = career?.data[0];
  const similarJobs =
    jobData?.attributes?.job_types?.data?.[0]?.attributes?.careers?.data || [];

  return (
    <article className="min-h-screen">
      <CareerHeader data={jobData} />

      <section className="bg-[#f9f9f9]">
        <div className="relative py-10 md:max-w-[1230px] 2xl:max-w-[1440px] mx-auto">
          {jobData?.attributes?.blocks?.map((section) => {
            return <CareerDescription key={section?.id} content={section} />;
          })}
          <div className="bg-white border-[#333] border p-6 rounded-xl mb-6 md:mb-12">
            <div className="rich-text">
              <p className="text-lg tracking-normal ">
                PES is an equal opportunity employer. We celebrate diversity and
                remain committed to establishing an inclusive environment for
                all employees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {similarJobs?.length > 0 && <SimilarJobs jobs={similarJobs} />}
    </article>
  );
}

export async function generateStaticParams() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/careers`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(
    path,
    {
      fields: ["slug"],
      populate: {
        category: {
          populate: {
            careers: {
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
