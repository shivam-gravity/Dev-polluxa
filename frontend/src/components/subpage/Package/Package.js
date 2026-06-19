"use client";
import cx from "classnames";
import { SectionHeader } from "@/components/common";
import { Button, MotionContainer } from "@/components/ui";
import { IconPackageGrey, IconPackageBlue } from "@/assets/images";

const Package = ({ data }) => {
  const { enable, title, bgColor, description, PackageOption } = data;

  const PackageRows = ({ row }) => (
    <li className="py-1 flex items-center">
      <span>
        <IconPackageGrey className="group-odd:hidden" />
        <IconPackageBlue className="group-even:hidden" />
      </span>
      <span className="px-3">{row?.title}</span>
    </li>
  );

  const PackageOptions = ({ option }) => (
    <div className="relative group bg-[#E9EAEA] first:bg-[#E1EFFD] py-6 px-6 md:px-0 md:py-12 ">
      <div className="md:group-odd:pr-16 md:group-even:pl-16 md:group-odd:ml-auto group-even:mr-auto md:flex md:items-center md:max-w-[600px]">
        <div className="md:max-w-[250px] md:top-1/2 md:-translate-y-1/2 md:group-odd:left-16 md:group-even:right-16 md:absolute">
          {option?.title && (
            <h4 className="py-3 font-bold text-[#202529]">
              {option.title.split(" ").length === 2 ? (
                option.title.split(" ").map((word, index) => (
                  <span
                    key={index}
                    className={
                      index === 0
                        ? "block font-bold text-3xl md:text-5xl 2xl:text-6xl"
                        : "block text-2xl md:text-4xl 2xl:text-5xl"
                    }
                  >
                    {word}{" "}
                  </span>
                ))
              ) : (
                <span>{option.title}</span>
              )}
            </h4>
          )}
          {option?.Button && (
            <span className="mt-3 hidden md:block">
              <Button
                type="button"
                variant={option?.Button?.type}
                onClick={() => scrollToSection("retailAppForm")}
              >
                <span className="text-base block">{option?.Button?.text}</span>
              </Button>
            </span>
          )}
        </div>

        <div className="py-5 md:group-odd:ml-[250px] md:group-even:mr-[250px] 2xl:group-odd:ml-[150px] 2xl:group-even:mr-[150px]">
          {option?.description && <p className="pb-4">{option?.description}</p>}
          <ul>
            {option?.PackageRow.map((row) => (
              <PackageRows key={row?.id} row={row} />
            ))}
          </ul>
          {option?.Button && (
            <span className="mt-8 block text-center md:hidden">
              <Button
                type="button"
                variant={option?.Button?.type}
                onClick={() => scrollToSection("retailAppForm")}
              >
                <span className="text-base block">{option?.Button?.text}</span>
              </Button>
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (enable === false) return;

  return (
    <section
      className={cx("pt-12 md:pt-24")}
      style={{ backgroundColor: bgColor }}
    >
      <MotionContainer>
        <SectionHeader title={title} description={description} />
        <div className="grid grid-cols-1 mx-auto md:grid-cols-2">
          {PackageOption?.map((option) => (
            <PackageOptions
              option={option}
              key={option?.id}
              scrollToSection={scrollToSection}
            />
          ))}
        </div>
      </MotionContainer>
    </section>
  );
};

export default Package;
