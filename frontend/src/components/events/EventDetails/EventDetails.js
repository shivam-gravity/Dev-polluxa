import { postRenderer } from "@/utils/post-renderer";
import { EventHeader } from "@/components/events";
import { formatDate } from "@/utils/api-helpers";

export default function EventDetails({ data, pageName }) {
  const { title, description, cover, location, StartDate, EndDate, time } =
    data?.attributes || {};
  return (
    <article className="bg-[#f9f9f9] min-h-screen">
      <EventHeader
        title={title}
        description={description}
        cover={cover}
        location={location}
        date={formatDate(StartDate) + " - " + formatDate(EndDate)}
        time={time}
      />

      <div className="relative">
        {data?.attributes?.blocks?.map((section, index) => {
          return (
            <div key={index}>
              {postRenderer(section, index, pageName)}
            </div>
          );
        })}
      </div>
    </article>
  );
}
