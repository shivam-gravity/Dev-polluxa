import { Typography } from "@/components/ui";
import { PartnerCategory } from "@/components/sections/Partners";

const Partners = ({ data }) => {
  const { title, description, partnerCategories } = data;

  return (
    <section className="py-6 md:py-12 bg-[#F9F9F9]">
      <div className="container-custom px-5 md:px-0">
        <div className="text-center">
          {title && (
            <Typography variant="heading1" className="mx-auto text-[#003464]">
              {title}
            </Typography>
          )}
          {description && (
            <Typography
              variant="body1"
              className="md:w-[800px] 2xl:w-[1000px] mx-auto line-clamp-3"
            >
              {description}
            </Typography>
          )}
        </div>

        <div className="border-t border-1 border-[#333]" />
        <div className="grid gap-12">
          {partnerCategories?.length > 0 &&
            partnerCategories?.map((category, index) => (
              <PartnerCategory key={index} data={category} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
