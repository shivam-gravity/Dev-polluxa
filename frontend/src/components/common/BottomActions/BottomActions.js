import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui";
const BottomActions = (props) => {
  const { data } = props;
  const { title, description, buttons } = data;
  return (
    <section className="px-6 md:px-0 py-14 bg-[#003464] text-white overflow-hidden">
      <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {title && (
          <div className="w-full md:w-[40%]">
            <div className="text-2xl md:text-4xl md:leading-[44px] 2xl:text-5xl 2xl:leading-[62px] font-medium tracking-normal text-white capitalize">
              {title}
            </div>
          </div>
        )}
        {description && (
          <div className="w-full md:w-[40%]">
            <div className="md:text-base text-white">{description}</div>
          </div>
        )}
        {buttons && (
          <div className="w-full md:w-[20%] flex justify-center md:justify-end mt-4 md:mt-0">
            {buttons?.map((button) => (
              <Link href={button?.url || "#"} key={button?.id}>
                <Button
                  type="button"
                  variant={button?.type}
                  className="bg-[#0D8AFD] w-full md:w-auto hover:bg-[#0066CC] transition-colors"
                >
                  {button?.text}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="stars" />
      <div className="stars2" />
    </section>
  );
};

export default BottomActions;
