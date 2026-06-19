"use client";
import { Typography } from "@/components/ui";
import { getStrapiMedia } from "@/utils/api-helpers";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useState } from "react";
import cx from "classnames";

const ServicesTabs = (props) => {
  const { data, fontInter } = props;
  const { title, description, services } = data;
  const isServicesEmpty = !services || services?.length === 0;
  const [activeTab, setActiveTab] = useState(services[0]?.id || null);

  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" });
  const [emblaTabsRef] = useEmblaCarousel({
    align: "start",
    axis: "y",
    dragFree: true,
  });

  const activeService = services.find((service) => service.id === activeTab);

  return (
    <section className="py-12 px-5 relative py-12 px-6  md:py-24 md:px-0">
      <div className="mx-auto md:max-w-[1230px] 2xl:max-w-[1440px]">
        <>
          <div className="text-center">
            {title && (
              <Typography variant="heading1" className="mx-auto">
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
          <div className="flex flex-col md:flex-row gap-8 mt-14 overflow-hidden">
            {/* Left side tabs */}
            <div className="md:w-5/12 " ref={emblaTabsRef}>
              <div
                className="flex flex-col space-y-5"
                style={{ height: "500px" }}
              >
                {!isServicesEmpty &&
                  services?.map((item) => (
                    <div
                      key={item?.id}
                      onClick={() => setActiveTab(item?.id)}
                      className={cx(
                        "p-5 border border-[#E2E2E2] cursor-pointer transition-all text-lg font-medium",
                        activeTab === item?.id
                          ? "text-[#0E61FE] bg-white border-[#0D8AFD]"
                          : "text-[#003464] hover:bg-[#003464] hover:text-white"
                      )}
                    >
                      {item?.name}
                    </div>
                  ))}
              </div>
            </div>

            {/* Right side content */}
            <div className="md:w-7/12">
              {activeService && (
                <div className="relative">
                  <div className="w-full h-[500px] bg-gray-200 relative">
                    {activeService.picture?.data ? (
                      <Image
                        src={getStrapiMedia(
                          activeService.picture.data.attributes?.url
                        )}
                        alt={activeService.name}
                        width={activeService.picture.data.attributes?.width}
                        height={activeService.picture.data.attributes?.height}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        No image available
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/50 to-transparent text-white">
                      <h3 className="text-2xl font-semibold mb-2">
                        {activeService.title || activeService.name}
                      </h3>
                      <p className="text-sm">{activeService.description}</p>
                    </div>
                  </div>

                  {activeService?.clientLogo?.length > 0 && (
                    <div className="mt-8">
                      <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex items-center gap-4">
                          {activeService.clientLogo.map((client) => (
                            <div key={client?.id} className="mr-4 last:mr-0">
                              {client.file?.data &&
                                client?.file?.data?.attributes?.url && (
                                  <Image
                                    src={getStrapiMedia(
                                      client.file.data.attributes?.url
                                    )}
                                    alt={
                                      client.file.data.attributes
                                        ?.alternativeText || "Client logo"
                                    }
                                    width={client.file.data.attributes?.width}
                                    height={client.file.data.attributes?.height}
                                    className="object-contain"
                                  />
                                )}
                              {client?.name && (
                                <p className="text-center mt-2 text-sm">
                                  {client?.name}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center mt-5 border-t border-[#E2E2E2]" />
                </div>
              )}
            </div>
          </div>
        </>
      </div>
    </section>
  );
};

export default ServicesTabs;
