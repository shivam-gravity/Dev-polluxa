"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Typography } from "@/components/ui";
import { CareerCard } from "@/components/careers";

const SimilarJobs = ({ jobs }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
    on: {
      select: () => {
        if (emblaApi) {
          setSelectedIndex(emblaApi.selectedScrollSnap());
        }
      },
    },
  });

  if (!jobs?.length) return null;

  return (
    <section className="bg-[#f9f9f9] py-12">
      <div className="relative md:max-w-[1230px] 2xl:max-w-[1440px] mx-auto">
        <Typography variant="heading1" className="text-[#003464] mb-8">
          Similar Jobs
        </Typography>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {jobs?.map((job) => (
              <div
                className="flex-[0_0_100%] sm:flex-[0_0_25%] px-4"
                key={job.id}
              >
                <CareerCard data={job} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimilarJobs;
