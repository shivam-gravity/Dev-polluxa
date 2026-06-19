import { BreadCrumbs } from "@/components/ui";
import { postRenderer } from "@/utils/post-renderer";

export default function Post({ data, pageName }) {
  return (
    <article>
      {/* TODO: Add breadcrumbs after requirements are finalized. Currently removed as discussed */}
      {/* <BreadCrumbs /> */}
      {data?.attributes?.blocks?.map((section, index) =>
        postRenderer(section, index, pageName)
      )}
    </article>
  );
}
