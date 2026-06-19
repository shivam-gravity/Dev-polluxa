import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";

// This middleware handles locale detection and redirects
const intlMiddleware = createMiddleware({
  ...routing,
  // This will be called when an unsupported locale is detected
  localePrefix: "always",
  defaultLocale: routing.defaultLocale,
});

export default function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Extract the first segment
  const firstSegment = pathname.split('/')[1];

  // If the first segment is not a valid locale, add preferred locale
  if (firstSegment && !routing?.locales?.includes(firstSegment)) {
    // Check if user has a preferred locale stored in cookies
    const storedLocale = request?.cookies?.get("NEXT_LOCALE")?.value;
    // Use stored locale if valid, otherwise fall back to default
    const preferredLocale = routing?.locales?.includes(storedLocale) ? storedLocale : routing.defaultLocale;

    const newUrl = new URL(`/${preferredLocale}${pathname}`, request.url);
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl);
  }

  // For valid locales or root path, let intl middleware handle it
  return intlMiddleware(request);
}

export const config = {
  // Match root and all paths
  matcher: ['/((?!api|_next|.*\\..*).*)', '/']
};