"use client";
import { useState } from "react";
import cx from "classnames";
import { IconArrowAccordion } from "@/assets/images";

const AccordionItem = ({ title, content, isOpen, onClick }) => (
  <div className="border-b border-[#B1B1B1] last:border-none bg-white first:rounded-tl-lg first:rounded-tr-lg last:rounded-bl-lg last:rounded-br-lg">
    <button
      className="flex justify-between w-full p-4 text-left text-lg font-medium text-gray-900 relative"
      onClick={onClick}
    >
      <span
        className={cx("text-lg block pr-5", {
          "text-[#0774F5]": isOpen,
          "text-[#333333]": !isOpen,
        })}
      >
        {title}
      </span>
      <IconArrowAccordion
        className={cx(
          "absolute top-1/2 end-4 -translate-y-1/2 right-6 transition-all duration-300",
          {
            "rotate-180": isOpen,
          }
        )}
      />
    </button>
    <div
      className={`overflow-hidden transition-max-height duration-300 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"}`}
    >
      <div className="p-4 text-base">{content}</div>
    </div>
  </div>
);

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="border border-[#B1B1B1]">
      {items?.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.description}
          isOpen={openIndex === index}
          icon={item?.icon}
          headline={item?.headline}
          featuredImage={item.featuredImage}
          iconHover={item?.iconHover}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
