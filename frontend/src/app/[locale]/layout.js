import { Analytics } from "@vercel/analytics/react";
import { GoogleTagManager } from "@next/third-parties/google";
import NextTopLoader from "nextjs-toploader";
import { Header, Footer } from "@/components/common";
import { Noto_Sans_Arabic, Open_Sans, Poppins } from "next/font/google";
import { getStrapiURL } from "@/utils/api-helpers";
import { FALLBACK_SEO } from "@/utils/constants";
import { getGlobal, getMainMenu } from "@/utils/api-loaders";
import "./globals.css";
import cx from "classnames";
import { GoogleAnalyticsTracking } from "@/components/analytics";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: '--font-notoSansArabic',
  display: 'swap',
  weight: ["400", "500", "600", "700", "800", "900"],
})

const openSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-opensans",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const meta = await getGlobal(locale);

  if (!meta.data) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);
  const global = await getGlobal(locale);
  const mainMenu = await getMainMenu(locale);

  const direction = locale === "ar" ? "rtl" : "ltr";
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = await getMessages();

  const { navbar, footer, leadForm, subMenu } = global?.data?.attributes || {};
  const { MainMenuItems } = mainMenu?.data?.attributes || {};

  const navbarLogo = navbar?.navbarLogo?.logoImg?.data?.attributes;
  const navbarLogoMobile = navbar?.navbarLogoMobile?.logoImg?.data?.attributes;
  const contactButton = navbar?.button;
  const menuLinks = footer?.menuLinks;
  const subMenuLogo = subMenu?.subMenuLogo?.logoImg?.data?.attributes;
  const subMenuButton = subMenu?.button;

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${notoSansArabic.variable} ${openSans.variable} ${poppins.variable} font-opensans rtl:font-notoSansArabic antialiased`}
    >
      <GoogleTagManager gtmId="GTM-TB5T7FWW" />
      <GoogleAnalyticsTracking />
      <body>
        <NextIntlClientProvider messages={messages}>
          <Analytics />
          <NextTopLoader showSpinner={false} />
          <Header
            links={MainMenuItems}
            navbarLogo={navbarLogo}
            contactButton={contactButton}
            socialLinks={footer?.socialLinks}
            menuLinks={menuLinks}
            navbarLogoMobile={navbarLogoMobile}
            subMenuLogo={subMenuLogo}
            subMenuButton={subMenuButton}
          />
          <main className="min-h-screen">{children}</main>

          <Footer footer={footer} leadForm={leadForm} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
