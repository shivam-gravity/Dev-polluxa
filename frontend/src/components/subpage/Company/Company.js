import cx from "classnames";
import { Typography } from "@/components/ui";

const Company = (props) => {
  const { data, fontInter } = props;
  const { title, Bullets, description } = data;
  return (
    <section className="py-12 md:py-24 px-6 relative bg-[#F2F4F8]">
      <div className="container-custom">
        <div className="text-center">
          {title && (
            <Typography
              variant="gradient"
              className={cx("tracking-widest", {
                "pb-6 md:pb-14": !description,
              })}
            >
              {title}
            </Typography>
          )}
          {description && (
            <Typography
              variant="heading1"
              className={`mt-6 mb-12 md:w-[800px] mx-auto ${fontInter.className}`}
            >
              {description}
            </Typography>
          )}
        </div>
        <ol className="text-left grid grid-cols-1 md:grid-cols-2">
          {Bullets?.map((list, index) => (
            <li className="flex space-x-3 relative pb-6 md:pr-14 md:even:pr-0">
              <span className="block rounded-full bg-[#08B1F6] text-white w-[34px] h-[34px] absolute text-center top-0 leading-[34px]">
                {index + 1}
              </span>
              <span className="pl-10 text-base md:text-lg 2xl:text-xl">
                {list?.Bullet}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Company;
