"use client";
import cx from "classnames";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { IconLanguageSwitcher } from "@/assets/images";
import { useCallback, useTransition } from "react";
import { useTopLoader } from 'nextjs-toploader';

function LocaleSwitcher({ isMobile = false, toggleDrawer }) {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const loader = useTopLoader();

  // Language configuration with names
  const languageConfig = {
    en: { name: t("en") },
    ar: { name: t("ar") }
  };

  // Get the opposite language to display
  const targetLocale = locale === 'en' ? 'ar' : 'en';
  const targetLanguageName = languageConfig[targetLocale]?.name;

  const handleLanguageChange = useCallback(() => {
    startTransition(() => {
      loader.start();
      // If pathname starts with careers/ (with any slug), redirect to just /careers
      if (pathname.startsWith("/careers/")) {
        router.push("/careers", { locale: targetLocale });
      } else {
        router.push(pathname, { locale: targetLocale });
      }
      // if mobile and toggleDrawer is true, toggle the drawer
      if (isMobile && toggleDrawer) {
        toggleDrawer();
      }
    });
  }, [router, pathname, targetLocale, isMobile, toggleDrawer, loader]);

  return (
    <>
      {/* Desktop locale switcher */}
      {!isMobile && (
        <button
          className="group hidden md:flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleLanguageChange}
          aria-label={`Switch to ${targetLanguageName}`}
          disabled={isPending}
        >
          <IconLanguageSwitcher className={cx("text-primary-dark-gray group-hover:text-lightBlue", {
            "animate-pulse": isPending
          })} />
          <span className={cx("text-primary-dark-gray group-hover:text-lightBlue text-sm md:text-xl rtl:md:text-base font-medium font-notoSansArabic rtl:font-opensans", {
            "animate-pulse text-lightBlue": isPending
          })}>
            {targetLanguageName}
          </span>
        </button>
      )}

      {/* Mobile locale switcher */}
      {isMobile && (
        <li className="group">
          <button
            onClick={handleLanguageChange}
            className="flex items-center gap-4 w-full py-3"
            disabled={isPending}
            aria-label={`Switch to ${targetLanguageName}`}
          >
            <IconLanguageSwitcher className={cx("text-primary-dark-gray group-active:text-lightBlue", {
              "animate-pulse text-lightBlue": isPending
            })} />
            <span className={cx("font-notoSansArabic font-medium rtl:font-opensans text-base text-primary-dark-gray group-active:text-lightBlue", {
              "animate-pulse text-lightBlue": isPending
            })}>
              {targetLanguageName}
            </span>
          </button>
        </li>
      )}
    </>
  );
}

export default LocaleSwitcher;