"use client";
import cx from "classnames";
import { useState } from "react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui";

const Sidebar = ({ menuItem, title, Button: button, description, variant }) => {
  const [activeSection, setActiveSection] = useState(menuItem[0] || null);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };
  return (
    <div className="bg-white md:bg-transparent shadow-sm sticky top-0 z-50 px-5 md:py-10 md:w-[20%] md:min-h-dvh md:z-auto md:shadow-inherit md:px-0 md:mx-0  overflow-x-auto overflow-y-hidden md:overflow-visible [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [ms-overflow-style:none]">
      <div className="md:pt-4 sticky md:top-32">
        {title && (
          <h4 className="hidden text-xl 2xl:text-2xl font-bold pb-4 md:block">
            {title}
          </h4>
        )}
        <ul className="flex space-x-4 md:space-x-0 font-medium md:text-xl 2xl:text-2xl md:block whitespace-nowrap">
          {menuItem?.map((item) => (
            <li
              key={item}
              className={cx("cursor-pointer", {
                "text-secondary-blue": activeSection === item,
              })}
              onClick={() => scrollToSection(item)}
            >
              <span className="py-2 lg:py-4 px-2 lg:px-8 inline-block relative text-base 2xl:text-lg font-medium whitespace-nowrap">
                {item}
                {variant === "secondary" ? (
                  <span
                    className={cx(
                      "hidden absolute md:block w-16 bottom-0 left-0 right-0 mx-auto md:mx-0 md:w-1 h-full md:top-1/2 md:-translate-y-1/2",
                      {
                        "bg-secondary-blue": activeSection === item,
                        "bg-[#C8C8C8]": activeSection !== item,
                      }
                    )}
                  />
                ) : (
                  activeSection === item && (
                    <span className="hidden md:block h-1 bg-secondary-blue absolute bottom-0 w-full" />
                  )
                )}
              </span>
            </li>
          ))}
        </ul>
        {description && (
          <p className="hidden px-2 py-5 mt-24 text-base 2xl:text-lg border-t-2 border-[#D9D9D9] md:block">
            {description}
          </p>
        )}
        {button?.url && (
          <Link
            href={button?.url}
            className="hidden md:block"
            variant={button?.variant}
          >
            <Button>{button?.text}</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
