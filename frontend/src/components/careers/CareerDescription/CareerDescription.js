import { RichText } from "@/components/common";

const CareerDescription = ({ content }) => {
  if (!content) return null;

  return (
    <div className="bg-white border-[#333] border p-6 rounded-xl mb-6 md:mb-12">
      <div className="rich-text">
        <RichText data={content} />
      </div>
    </div>
  );
};

export default CareerDescription;
