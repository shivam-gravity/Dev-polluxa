"use client";
import React from "react";
import Image from "next/image";
import { Typography } from "@/components/ui";
import { getStrapiMedia } from "@/utils/api-helpers";

const AddressSection = ({ data }) => {
  const { heading, description, media, addressDetails } = data;
  if (!addressDetails?.length) return null;
  const addressImage = media?.file?.data?.attributes;

  return (
    <section className="px-4 py-12 bg-[#F9F9F9]">
      <div className="container-custom mx-auto">
        {heading && (
          <Typography
            variant="heading1"
            className="text-center mb-8 text-[#003464]"
          >
            {heading}
          </Typography>
        )}
        {description && (
          <Typography variant="body" className="text-center mb-8">
            {description}
          </Typography>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 my-6">
          {addressDetails?.map((address, index) => (
            <div
              key={index}
              className="bg-white rounded-xl transition hover:shadow-lg p-4 md:p-8"
            >
              <div className="flex justify-start items-center mb-2 gap-4">
                {addressImage?.url && (
                  <Image
                    src={getStrapiMedia(addressImage?.url)}
                    alt={addressImage?.alternativeText || address.country || `Address Image ${addressImage?.id}`}
                    width={addressImage?.width}
                    height={addressImage?.height}
                    className="w-auto"
                  />
                )}
                <span className="h-2 w-2 bg-[#2997FC] rounded-full mt-2" />
                <span className="text-xl font-semibold mt-2 uppercase">
                  {address.country}
                </span>
              </div>
              <h3 className="text-base font-semibold mb-3 mt-3 font-inter">
                {address.name}
              </h3>
              <p className="text-xs mb-4 w-[60%] min-h-[48px]">
                {address.address}
              </p>
              <div className="w-full h-60 mt-6">
                <iframe
                  src={address.mapUrl}
                  width="100%"
                  height="100%"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AddressSection;
