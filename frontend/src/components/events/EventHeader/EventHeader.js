"use client";
import { Typography } from "@/components/ui";
import { IconCalendar, IconClock, IconLocationPin } from "@/assets/images";
import { EventForm } from "@/components/forms";

const EventHeader = ({ title, date, time, location, cover }) => {
  return (
    <div className="py-10 relative md:max-w-[1230px] 2xl:max-w-[1440px] mx-auto">
      <div className="mx-auto z-20 px-6 w-full md:px-0 md:grid md:grid-cols-2 md:gap-10 items-start">
        <div>
          {title && (
            <Typography
              variant="heading1"
              className="text-2xl md:text-4xl 2xl:text-5xl"
            >
              {title}
            </Typography>
          )}

          <div className="flex items-center gap-10 mb-2 mt-6">
            {date && (
              <div className="flex items-center text-sm md:text-base text-primary-dark-gray font-medium">
                <IconCalendar className="mr-2 flex-shrink-0" />
                <span className="flex-grow">{date}</span>
              </div>
            )}
            {time && (
              <div className="flex items-center text-sm md:text-base text-primary-dark-gray font-medium">
                <IconClock className="mr-2 flex-shrink-0" />
                <span className="flex-grow">{time}</span>
              </div>
            )}
          </div>

          {location && (
            <div className="flex items-center pb-4 text-sm md:text-base text-primary-dark-gray font-medium mb-4 md:mb-0">
              <IconLocationPin className="mr-2 flex-shrink-0" />
              <span className="flex-grow">{location}</span>
            </div>
          )}
        </div>

        <div className="md:flex justify-center border-2 border-[#2997FC] py-6 md:py-8 px-10 md:px-12 rounded-3xl max-w-[420px] mx-auto">
          <EventForm />
        </div>
      </div>
    </div>
  );
};

export default EventHeader;
