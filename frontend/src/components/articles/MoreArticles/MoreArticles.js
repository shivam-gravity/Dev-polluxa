import { EnhancedCard } from "@/components/ui";

const MoreArticles = ({ relatedArticles, pageName }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h1 className="text-center 2xl:leading-[62px] 2xl:text-5xl capitalize font-medium md:leading-[44px] pb-8 md:pb-12 md:text-4xl text-[#003464] text-base tracking-normal">
          More {pageName ?? "Articles"}
        </h1>
        {!relatedArticles?.length ? (
          <div className="text-center">
            <p className="text-2xl text-[#003464]">
              No More {pageName ?? "Articles"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 2xl:max-w-[1440px] md:max-w-[1230px] mx-auto">
            {relatedArticles?.map((article) => (
              <EnhancedCard
                pageName={pageName}
                title={article?.attributes?.title}
                description={article?.attributes?.description}
                media={article?.attributes?.cover?.data?.attributes}
                url={article?.attributes?.slug}
                key={article?.id}
                bgColor={"bg-[#F9F9F9]"}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MoreArticles;
