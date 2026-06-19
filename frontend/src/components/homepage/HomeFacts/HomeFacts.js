import { Typography } from "@/components/ui";
import cx from "classnames";

const MetricCard = ({ number, description }) => (
  <div className="flex flex-col items-center space-y-2">
    <Typography
      variant="heading1"
      className="text-[#003464] text-5xl font-bold"
    >
      {number}
    </Typography>
    <Typography
      variant="body1"
      className="text-[#333333] text-center max-w-[150px]"
    >
      {description}
    </Typography>
  </div>
);

const HomeFacts = ({ data }) => {
  const { facts, title } = data;

  return (
    <section className="relative px-6 md:px-0">
      <div className="mx-auto md:max-w-[1230px] 2xl:max-w-[1440px]">
        <div
          className={cx("grid gap-12 items-center", {
            "md:grid-cols-2": title,
            "md:grid-cols-1": !title,
          })}
        >
          {title && (
            <div className="max-w-xl">
              <Typography
                variant="heading1"
                className="text-[#003464] text-4xl md:text-4xl font-bold leading-tight"
              >
                {title}
              </Typography>
            </div>
          )}

          <div className="grid grid-flow-col gap-8">
            {facts?.map((metric) => (
              <MetricCard
                key={metric?.id}
                number={metric?.title}
                description={metric?.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFacts;
