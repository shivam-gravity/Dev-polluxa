"use client";
import { Link } from "@/i18n/routing";
import cx from "classnames";
import { useState, useCallback } from "react";
import { LocaleSwitcher, NavLinks, NavLinksMobile } from "@/components/common";
import { HamburgerButton } from "@/components/ui";
import { useScrollLock } from "@/hooks";

const isLocaleSwitcherEnabled = process.env.NEXT_PUBLIC_LOCALE_ENABLE === "true";

const NavBar = (props) => {
  const { links, topLinks, showMenuOverlay, setShowMenuOverlay } = props;
  const [open, setOpen] = useState(false);

  useScrollLock({ lock: open });

  const closeMenu = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <nav>
      <div className="flex">
        <div className="z-50 md:w-auto w-full flex justify-between md:hidden relative ml-auto">
          <HamburgerButton setOpen={setOpen} open={open} />
        </div>
        {/* Desktop nav */}
        <ul className="md:flex hidden items-center">
          <NavLinks links={links} setShowMenuOverlay={setShowMenuOverlay} />
        </ul>
        {/* Mobile nav */}
        {
          <div
            className={cx(
              "md:hidden fixed bottom-0 top-32 z-40 w-full bg-white transition-all duration-300 left-0 md:w-[27rem]",
              {
                "-translate-x-full": !open,
              }
            )}
          >
            <ul className="relative h-full overflow-y-auto mx-6">
              <NavLinksMobile links={links} closeMenu={closeMenu} />
              {isLocaleSwitcherEnabled && <LocaleSwitcher isMobile={true} toggleDrawer={closeMenu} />}
            </ul>
          </div>
        }
      </div>
    </nav>
  );
};

export default NavBar;
