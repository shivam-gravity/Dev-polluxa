import { Typography } from "@/components/ui";
import { PartnerLogo } from "@/components/sections/Partners";

const PartnerCategory = ({ data }) => {
  const { categoryName, partners } = data;

  return (
    <div className="mt-12">
      {categoryName && (
        <Typography variant="heading2" className="mb-8 text-[#003464]">
          {categoryName}
        </Typography>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {partners?.map((partner, index) => (
          <PartnerLogo key={index} data={partner} />
        ))}
      </div>
    </div>
  );
};

export default PartnerCategory;
