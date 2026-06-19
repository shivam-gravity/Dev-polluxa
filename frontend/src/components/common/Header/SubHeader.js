"use client";
import { useState, useEffect, useTransition } from "react";
import { Link } from "@/i18n/routing";
import cx from "classnames";
import { IconCaretDown } from "@/assets/images";
import { Button } from "@/components/ui";
import { Logo } from "@/components/common";

const SubHeader = ({
  currentPageHeading,
  parentNavigation,
  subNavs,
  subMenuButton,
  subMenuLogo,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [showScrollElements, setShowScrollElements] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollElements(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!parentNavigation) return null;

  // if there is no subNavs, but parent navigation exists, return null to prevent empty subheader
  if (!subNavs || subNavs?.length === 0) return null;

  return (
    <div className="h-16 hidden md:block sticky top-0 z-40 bg-white border-b border-[#E9E9E9] shadow-sm">
      <div className="flex px-6 py-2 items-center md:px-0 h-inherit container-custom h-full">
        <div className="w-full flex items-center justify-between">
          <ul className="flex items-center">
            {showScrollElements && <Logo navbarLogo={subMenuLogo} />}

            {parentNavigation?.heading && (
              <li
                className={cx(
                  "text-[#333] text-xl md:text-2xl inline px-6 md:px-8 first:pl-0 font-medium font-poppins"
                )}
              >
                <Link
                  href={parentNavigation?.slug || "#"}
                  className="hover:text-[#0D8AFD]"
                >
                  {parentNavigation?.heading}
                </Link>
              </li>
            )}

            {/* overview link that points to the parent page */}
            <li className="text-[#333] inline px-4 hover:text-[#0D8AFD] transition-colors duration-200 font-poppins">
              <Link href={parentNavigation?.slug || "#"}>Overview</Link>
            </li>

            <li
              className={cx(
                "text-[#333] inline px-4 hover:text-[#0D8AFD] transition-colors duration-200 font-poppins relative"
              )}
              onMouseEnter={() => startTransition(() => setShowDropdown(true))}
              onMouseLeave={() => startTransition(() => setShowDropdown(false))}
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <div className="flex items-center cursor-pointer">
                <span>
                  {parentNavigation?.slug === "/industries"
                    ? "Sectors"
                    : "Features"}
                </span>
                <IconCaretDown
                  className={cx(
                    "inline-block ml-1 transition-transform duration-200",
                    { "rotate-180": showDropdown, "": !showDropdown }
                  )}
                />
              </div>

              {/* Dropdown Menu named Features as discussed */}
              {showDropdown && (
                <div className="absolute left-0 top-full pt-2 z-50">
                  <div className="bg-white rounded-md shadow-lg py-2 min-w-[200px] border border-[#E9E9E9]">
                    {subNavs?.map((link) => (
                      <Link
                        key={link?.id}
                        href={`${parentNavigation?.slug}/${link?.url}` || "#"}
                        className={cx(
                          "block px-4 py-2 text-[#333] hover:bg-[#F5F5F5] hover:text-[#0D8AFD] font-poppins"
                        )}
                      >
                        {link?.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>

            {/* pricing link that will always point to the common pricing page */}
            <li className="text-[#333] inline px-4 hover:text-[#0D8AFD] transition-colors duration-200 font-poppins">
              <Link href="/pricing">Pricing</Link>
            </li>
          </ul>

          {subMenuButton && showScrollElements && (
            <div className="ml-auto right-0">
              <Link href={subMenuButton?.url || "#"}>
                <Button
                  type="button"
                  variant={subMenuButton?.type}
                  icon={false}
                >
                  {subMenuButton?.text}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
