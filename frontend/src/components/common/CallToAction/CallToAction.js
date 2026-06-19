import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui";
import cx from "classnames";

const CallToAction = (props) => {
  const { data } = props;
  const { title, Button: button, bgColor } = data;
  return (
    <section
      className={cx(
        "px-6 md:px-0 py-14 text-center",
        bgColor ? `bg-[${bgColor}]` : "bg-[#F0F0F0]"
      )}
    >
      <div className="container-custom items-center md:flex md:gap-9	justify-center">
        {title && (
          <div className="text-[#003464] pb-4 font-semibold md:text-2xl md:pb-0 ">
            {title}
          </div>
        )}
        {button?.url && (
          <Link href={button?.url || "#"}>
            <Button
              type="button"
              variant={button?.type}
              className="bg-[#0D8AFD]"
            >
              {button?.text}
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default CallToAction;
