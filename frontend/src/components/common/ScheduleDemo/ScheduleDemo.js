import { Typography } from "@/components/ui";
import Script from "next/script";

const ScheduleDemo = ({ data }) => {
  const { title, description, calendlyDataUrl } = data;
  return (
    <div className="bg-white mx-auto py-20 px-6 md:px-0">
      <div className="container-custom">
        <div className="text-center">
          {title && (
            <Typography
              variant="heading1"
              className="text-[#003464] text-4xl md:text-4xl font-bold leading-tight"
            >
              {title}
            </Typography>
          )}

          {description && (
            <Typography
              variant="body1"
              className={`md:w-[800px] 2xl:w-[1000px] mx-auto line-clamp-3`}
            >
              {description}
            </Typography>
          )}
        </div>

        {/* <!-- Calendly inline widget begin --> */}
        {calendlyDataUrl && (
          <>
            <div
              className="calendly-inline-widget min-w-[320px] h-[700px] mx-auto"
              data-url={calendlyDataUrl}
            />
            <Script
              type="text/javascript"
              src="https://assets.calendly.com/assets/external/widget.js"
              strategy="afterInteractive"
            />
          </>
        )}
        {/* <!-- Calendly inline widget end --> */}
      </div>
    </div>
  );
};

export default ScheduleDemo;
