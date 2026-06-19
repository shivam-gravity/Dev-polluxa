import { CareerCard } from "@/components/careers";

const CareersGrid = ({ data }) => {
  if (!data?.length) return null;

  return (
    <section className="bg-[#F0F0F0]">
      <div className="container-custom mx-auto py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-4 gap-6">
          {data?.map((career) => (
            <CareerCard key={career?.id} data={career} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareersGrid;
