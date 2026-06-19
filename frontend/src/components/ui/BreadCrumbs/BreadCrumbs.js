"use client";
import React from "react";
import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import { IconCaretRight } from "@/assets/images";

const BreadCrumbs = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  const formatPathName = (path) => {
    return path
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const listClasses =
    "capitalize text-[#333] hover:text-[#0D8AFD] font-regular";
  const activeClasses =
    "capitalize text-[#0D8AFD] font-semibold pointer-events-none";
  const separator = "text-[#333] font-regular";
  const borderStyle = "border-y border-[#F0F0F0] py-4";

  return (
    <section>
      <div className={`z-30 relative mb-2 ${borderStyle}`}>
        <div className="container-custom px-5 md:px-0">
          <ul className="flex items-center space-x-3">
            {pathNames.map((link, index) => {
              let href = `/${pathNames.slice(0, index + 1).join("/")}`;
              let isActive = paths === href;
              let itemClasses = isActive ? activeClasses : listClasses;

              return (
                <React.Fragment key={index}>
                  <li className="last:truncate">
                    <Link href={href} className={itemClasses}>
                      {formatPathName(link)}
                    </Link>
                  </li>
                  {index < pathNames.length - 1 && (
                    <li className={separator}>
                      <IconCaretRight />
                    </li>
                  )}
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BreadCrumbs;
