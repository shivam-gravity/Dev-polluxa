"use client";
import { useState } from "react";
import { Link } from "@/i18n/routing";
import { NavBar, Logo, LocaleSwitcher } from "@/components/common";
import { Button } from "@/components/ui";
import cx from "classnames";
import { usePathname } from "@/i18n/routing";
import SubHeader from "./SubHeader";
import { useHeaderNavigation } from "@/hooks";

const isLocaleSwitcherEnabled = process.env.NEXT_PUBLIC_LOCALE_ENABLE === "true";

const Header = (props) => {
  const {
    links,
    navbarLogo,
    contactButton,
    socialLinks,
    menuLinks,
    footerLogo,
    navbarLogoMobile,
    subMenuLogo,
    subMenuButton,
  } = props;

  const pathname = usePathname();
  const [showMenuOverlay, setShowMenuOverlay] = useState(false);
  const { currentPageHeading, parentNavigation, subNavs } = useHeaderNavigation(
    pathname,
    links
  );

  return (
    <header className="inline">
      <div
        className={cx(
          "bg-white h-32 w-full relative border-b border-[#E9E9E9] z-50",
          !parentNavigation && "sticky top-0"
        )}
      >
        <div className="bg-white flex items-center pl-6 pr-4 py-5 md:justify-between md:pr-0 md:pl-0 md:py-0 h-full 2xl:py-3 md:bg-white container-custom">
          <div className="flex flex-row items-center justify-between w-full md:w-auto">
            <Logo navbarLogo={navbarLogo} navbarLogoMobile={navbarLogoMobile} />
            <div className="md:ml-6">
              <NavBar
                links={links}
                topLinks={menuLinks}
                setShowMenuOverlay={setShowMenuOverlay}
              />
            </div>
          </div>
          {/* Desktop contact button */}
          <div className="hidden md:flex ml-6 items-center gap-8">
            {isLocaleSwitcherEnabled && <LocaleSwitcher />}
            <Link href={contactButton?.url || "#"}>
              <Button type="button" variant={contactButton?.type} icon={false}>
                {contactButton?.text}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <SubHeader
        currentPageHeading={currentPageHeading}
        parentNavigation={parentNavigation}
        subNavs={subNavs}
        subMenuButton={subMenuButton}
        subMenuLogo={subMenuLogo}
      />

      {showMenuOverlay && (
        <div className="bg-black opacity-50 fixed h-full z-20 w-full top-0 left-0"></div>
      )}
    </header>
  );
};

export default Header;