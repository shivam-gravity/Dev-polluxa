import { Typography, InfoCard } from "@/components/ui";

const InfoGrid = (props) => {
  const { data } = props;
  const { title, description, service: info } = data;
  return (
    <section className="px-5 relative py-12 px-6 md:py-20 md:px-0">
      <div className="mx-auto md:max-w-[1230px] 2xl:max-w-[1440px]">
        <>
          <div className="text-center">
            {title && (
              <Typography
                variant="heading1"
                className="mx-auto text-[#003464] md:w-[800px] 2xl:w-[1000px] mx-auto"
              >
                {title}
              </Typography>
            )}
            {description && (
              <Typography
                variant="body1"
                className="md:w-[800px] 2xl:w-[1000px] mx-auto line-clamp-3 mb-16 text-[#003464]"
              >
                {description}
              </Typography>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {info?.map((item) => (
              <InfoCard
                key={item?.id}
                title={item?.name}
                description={item?.description}
                image={item?.icon}
              />
            ))}
          </div>
        </>
      </div>
    </section>
  );
};

export default InfoGrid;
