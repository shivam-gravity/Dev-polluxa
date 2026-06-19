"use client";
import { EventCard } from "@/components/ui";
import { formatDate } from "@/utils/api-helpers";

const EventsGrid = (props) => {
  const { data, pageName } = props;

  return (
    <section className="py-12 px-5 relative py-12 px-6 bg-[#F0F0F0] md:py-24 md:px-0">
      <div className="mx-auto md:max-w-[1230px] 2xl:max-w-[1440px]">
        {data?.length === 0 ? (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#003464]">
              No Upcoming Events
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mt-16">
            {data?.map(({ attributes, id }) => {
              return (
                <EventCard
                  key={id}
                  date={
                    formatDate(attributes?.StartDate) +
                    " - " +
                    formatDate(attributes?.EndDate)
                  }
                  title={attributes?.title}
                  url={`/events/${attributes?.slug}`}
                  location={attributes?.location}
                  cover={attributes?.cover}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsGrid;
