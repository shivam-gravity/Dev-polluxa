import { MotionContainer } from "@/components/ui";
import { HomeFacts } from "@/components/homepage";
import cx from "classnames";
const Statistics = (props) => {
  const { data } = props;
  const { bgColor } = data;

  return (
    <section
      className={cx({
        [`bg-[${bgColor}]`]: bgColor,
        "bg-[#F9F9F9]": !bgColor,
      })}
    >
      <MotionContainer className="py-6 lg:py-12">
        <div className="grid container-custom items-center">
          {data && <HomeFacts data={data} />}
        </div>
      </MotionContainer>
    </section>
  );
};

export default Statistics;
