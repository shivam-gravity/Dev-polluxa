import { Typography } from "@/components/ui";
import { IconPolygonHomePage, IconPolygonHomePageHover } from "@/assets/images";

const Innovations = (props) => {
  const { data, fontInter } = props;
  const { description, feature, title } = data;

  return (
    <section className="py-12 md:py-24 bg-[#F2F4F8]">
      <div className="container-custom px-5 md:px-0">
        <div className="text-center">
          {title && (
            <Typography variant="gradient" className="tracking-widest">
              {title}
            </Typography>
          )}

          {description && (
            <Typography
              variant="heading1"
              className={`md:w-[800px] mx-auto ${fontInter.className}`}
            >
              {description}
            </Typography>
          )}
        </div>

        <div
          className={`flex items-center md:space-y-0 md:space-x-8 justify-center flex-wrap md:flex-nowrap ${fontInter.className}`}
        >
          {feature?.slice(0, 6).map((item) => (
            <div className="group md:transition-transform duration-300 transform md:hover:scale-110 cursor-default w-40 pb-3 px-2 md:px-0 md:pb-0">
              <div className="relative md:w-44" key={item?.id}>
                <IconPolygonHomePage className="w-full" />
                <IconPolygonHomePageHover className="absolute w-full top-0 left-0 opacity-0 md:group-hover:opacity-100" />
                <span className="absolute top-1/2 -translate-y-1/2 left-0 right-0 mx-auto text-center text-base md:text-xl text-white md:w-40 z-20 md:group-hover:text-[#123EAF] px-2 md:px-0">
                  {item?.title}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div
          className={`flex items-center md:space-y-0 md:space-x-8 justify-center flex-wrap md:flex-nowrap ${fontInter.className}`}
        >
          {feature?.slice(6, 11).map((item) => (
            <div className="group md:transition-transform duration-300 transform md:hover:scale-110 cursor-default w-40 pb-3 px-2 md:px-0 md:pb-0">
              <div className="relative md:w-44" key={item?.id}>
                <IconPolygonHomePage className="w-full" />
                <IconPolygonHomePageHover className="absolute w-full top-0 left-0 opacity-0 md:group-hover:opacity-100" />
                <span className="absolute top-1/2 -translate-y-1/2 left-0 right-0 mx-auto text-center text-base md:text-xl text-white md:w-40 z-20 md:group-hover:text-[#123EAF] px-2 md:px-0">
                  {item?.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Innovations;
