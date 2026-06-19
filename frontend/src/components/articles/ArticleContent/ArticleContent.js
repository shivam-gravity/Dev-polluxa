import { RichText } from "@/components/common";
import { ShareButtons } from "@/components/articles";
const ArticleContent = (data) => {
  if (!data?.content) return null;
  return (
    <div className="relative w-full px-6 ">
      <div className="max-w-[600px] mx-auto prose prose-lg relative mb-12">
        <div className="sticky top-0 h-screen flex items-center float-right -mr-6 md:-mr-24">
          <ShareButtons />
        </div>
        <RichText data={data} />
      </div>
    </div>
  );
};

export default ArticleContent;
