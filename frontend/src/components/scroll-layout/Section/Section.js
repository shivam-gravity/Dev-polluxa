import cx from "classnames";
import { Typography } from "@/components/ui";

const Section = ({ title, subtitle, description, flip, id, grid }) => (
  <>
    <div
      className={cx(
        "scroll-mt-32 grid grid-cols-1 md:grid-cols-2 gap-5 pt-[70px] md:pt-4",
        {
          "md:gap-16": flip,
          "md:gap-28": !flip,
        }
      )}
      id={id}
    >
      <div
        className={cx({
          "md:order-2": flip,
        })}
      >
        {title && (
          <Typography variant="title" className="tracking-widest">
            <span className="pb-5 block">{title}</span>
          </Typography>
        )}
        {subtitle && (
          <p className="md:text-2xl 2xl:text-[32px] 2xl:leading-[36px] text-[#202529] pb-4">
            {subtitle}
          </p>
        )}
        {description && (
          <p className="text-sm md:text-base text-[#0d0d0e]">{description}</p>
        )}
      </div>
    </div>
    {grid}
  </>
);

export default Section;
