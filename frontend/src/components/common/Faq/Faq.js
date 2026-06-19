import { SectionHeader } from "@/components/common";
import { Accordion } from "@/components/ui";

const Faq = ({ data }) => {
  const { title, description, FaqOption } = data;

  return (
    <section className="py-12 md:py-24">
      <div className="px-5 md:px-0 container-custom">
        <SectionHeader title={title} description={description} />
        <div className="max-w-4xl mx-auto">
          <Accordion items={FaqOption} />
        </div>
      </div>
    </section>
  );
};

export default Faq;
