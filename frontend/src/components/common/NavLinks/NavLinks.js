"use client";
import { useState } from "react";
import { Link } from "@/i18n/routing";
import { IconCaretDown } from "@/assets/images";
import { Drawer } from "@/components/common";

const NavLinks = ({ links }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  const handleNavClick = (link) => {
    if (link?.navigations?.data?.length > 0) {
      if (activeLink?.title === link.title) {
        setIsDrawerOpen(false);
        setActiveLink(null);
      } else {
        setActiveLink(link);
        setIsDrawerOpen(true);
      }
    }
  };

  const renderNavContent = (link) => (
    <span className="relative block py-7 rtl:font-notoSansArabic">
      {link?.title}
      {link?.navigations?.data?.length > 0 && (
        <IconCaretDown className="inline-block ms-2" />
      )}
      <div className="bg-[#003464] absolute bottom-0 h-0 w-full group-hover:opacity-0 md:group-hover:opacity-100 md:group-hover:h-1 transition-all duration-300 ease-in-out"></div>
    </span>
  );

  return (
    <>
      {links?.map((link) => (
        <li className="block group" key={link?.title}>
          {link?.navigations?.data?.length > 0 ? (
            <button
              onClick={() => handleNavClick(link)}
              className="text-[#333] px-6 font-normal inline-block md:text-md group-hover:text-[#003464]"
            >
              {renderNavContent(link)}
            </button>
          ) : (
            <Link
              href={link?.url || "#"}
              className="text-[#333] px-6 font-normal inline-block md:text-md group-hover:text-[#003464]"
            >
              {renderNavContent(link)}
            </Link>
          )}
        </li>
      ))}

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setActiveLink(null);
        }}
        activeLink={activeLink}
      />
    </>
  );
};

export default NavLinks;