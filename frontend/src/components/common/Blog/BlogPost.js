import { BlogHeader } from "@/components/blogs";
import BlogContent from "@/components/blogs/BlogContent/BlogContent";
import { postRenderer } from "@/utils/post-renderer";
import MoreBlogs from "@/components/blogs/MoreBlogs/MoreBlogs";

export default function BlogPost({ data, pageName }) {
  const { title, description, cover } = data?.attributes || {};

  return (
    <article className="bg-[#f9f9f9] min-h-screen">
      <BlogHeader title={title} description={description} cover={cover} />

      <div className="relative">
        {data &&
          data?.attributes?.blocks?.map((section, index) => {
            if (section?.__component === "shared.rich-text") {
              return <BlogContent key={section?.id} {...section} />;
            }

            return (
              <>
                <MoreBlogs
                  blogs={
                    data?.attributes?.category?.data?.attributes?.articles?.data
                  }
                />
                <div key={section?.id}>
                  {postRenderer(section, index, pageName)}
                </div>
              </>
            );
          })}
      </div>
    </article>
  );
}
