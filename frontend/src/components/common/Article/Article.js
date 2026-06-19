import { postRenderer } from "@/utils/post-renderer";
import {
  ArticleContent,
  ArticleHeader,
  MoreArticles,
} from "@/components/articles";

export default function Article({ data, pageName }) {
  const { title, description, cover } = data?.attributes || {};
  const bottomAction = data?.attributes?.blocks?.find(
    (section) => section?.__component === "sections.bottom-actions"
  );

  const renderSection = (section, index) => {
    switch (section?.__component) {
      case "shared.rich-text":
        return <ArticleContent key={section?.id} {...section} />;

      case "sections.bottom-actions":
        return null;

      default:
        return (
          <div key={section?.id}>{postRenderer(section, index, pageName)}</div>
        );
    }
  };

  return (
    <article className="bg-[#f9f9f9] min-h-screen">
      <ArticleHeader title={title} description={description} cover={cover} />
      <div className="relative">
        {data?.attributes?.blocks?.map((section, index) =>
          renderSection(section, index)
        )}

        {/* TODO: Removing it from case studies temporarily until requirements are finalized */}
        {pageName !== "Case Studies" && (
          <MoreArticles
            relatedArticles={
              data?.attributes?.category?.data?.attributes?.articles?.data
            }
            pageName={pageName}
          />
        )}

        {bottomAction && (
          <div key={bottomAction.id}>
            {postRenderer(
              bottomAction,
              data?.attributes?.blocks?.length,
              pageName
            )}
          </div>
        )}
      </div>
    </article>
  );
}
