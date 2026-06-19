import { cookies } from "next/headers";
import { LANG_COOKIE } from "./constants";
import { routing } from "@/i18n/routing";

// Map locale codes to their full formats
const localeMap = {
  ar: "ar",
  en: "en"
};

export async function getLocale() {
  try {
    const cookieStore = await cookies();
    const localeValue = cookieStore.get(LANG_COOKIE)?.value;

    // Check if the locale is in our supported locales list
    if (localeValue && routing.locales.includes(localeValue)) {
      // Return the mapped locale or the original if no mapping exists
      return localeMap[localeValue] || localeValue;
    }

    // If locale is not supported or not found, use default
    return localeMap[routing.defaultLocale] || routing.defaultLocale;
  } catch (err) {
    // No request context, default to the default locale from routing
    return localeMap[routing.defaultLocale] || routing.defaultLocale;
  }
}