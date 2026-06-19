import { BlockRendererClient } from "@/components/common";

export default function RichText({ data }) {
  return (
    <section className="rich-text">
      <BlockRendererClient content={data?.content} />
    </section>
  );
}
