import { IconLocationPin } from "@/assets/images";

const CareerHeader = ({ data }) => {
  if (!data) return null;

  const { attributes } = data;
  const { title, location, level, job_types } = attributes;

  const jobTypes = job_types?.data?.map((type) => type.attributes.name) || [];

  return (
    <section className="bg-white">
      <div className="py-10 relative md:max-w-[1230px] 2xl:max-w-[1440px] mx-auto">
        <div className="mx-auto z-20 relative px-6 w-full md:px-0 md:grid md:grid-cols-2 md:gap-10 items-start">
          <div className="max-w-md">
            {title && (
              <div className="text-4xl leading-[48px] 2xl:text-5xl 2xl:leading-[62px] font-bold tracking-normal pb-3 md:pb-6">
                <span className="text-2xl md:text-4xl 2xl:text-5xl">
                  {title}
                </span>
              </div>
            )}
            {location && (
              <p className="flex items-center mb-4">
                <IconLocationPin className="mr-2" />
                {location}
              </p>
            )}
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              {level && <span>{level}</span>}
              {jobTypes?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {jobTypes?.map((type, index) => {
                    return (
                      <span
                        key={index}
                        className="w-auto inline-block bg-[#4DAC62] font-medium text-sm px-6 py-2 rounded-3xl"
                      >
                        {type}
                      </span>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="ml-auto bg-gradient-to-r from-[#155874] to-[#0C3445] text-white text-base p-6 rounded-xl md:min-w-80">
            <p className="font-bold mb-2">Share Your CV</p>
            <p className="font-normal">recruitment@polluxa.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerHeader;
