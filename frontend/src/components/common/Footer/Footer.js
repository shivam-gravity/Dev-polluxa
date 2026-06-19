import { Link } from "@/i18n/routing";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/api-helpers";
import { QuickContact } from "@/components/forms";
import { getTranslations } from "next-intl/server";

async function Footer(props) {
  const t = await getTranslations("Global");
  const { footer } = props;
  const { FooterMenu, footerLogo, menuLinks } = footer || {};
  const logo = footerLogo?.logoImg?.data?.attributes;
  return (
    <footer className="bg-[#003464] text-white pt-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 md:mb-0 pb-8 2xl:max-w-[1440px]  md:max-w-[1230px] mx-auto">
          {logo?.url && (
            <Link href="/">
              <Image
                src={getStrapiMedia(logo.url ?? "#")}
                alt="Pollux Logo"
                width={logo?.width}
                height={logo?.height}
              />
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto md:max-w-[1230px] 2xl:max-w-[1440px]">
          {FooterMenu?.map((column) => (
            <div key={column?.id} className="space-y-6">
              {column?.Heading && (
                <h3 className="text-lg font-semibold uppercase text-[#8BB4DA]">
                  {column?.Heading}
                </h3>
              )}
              <ul className="space-y-4">
                {column?.FooterLinks?.map(
                  (link) =>
                    link?.text && (
                      <li key={link?.id}>
                        <Link
                          href={link.url ?? "#"}
                          className="text-[#8BB4DA] hover:text-white transition-colors"
                        >
                          {link?.text}
                        </Link>
                      </li>
                    )
                )}
              </ul>
            </div>
          ))}

          {/* Quick Contact Form */}
          <div className="space-y-6 md:col-span-2">
            <h3 className="text-lg font-semibold text-[#8BB4DA]">
              {t("quick_contact")}
            </h3>
            <QuickContact />
          </div>
        </div>
      </div>

      <div className="mt-16 py-8 bg-[#002F5A]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <p className="text-[#8BB4DA]">
              {t("copyright_2025_pollux")}
            </p>
            <div className="flex flex-wrap gap-4 md:gap-8 md:justify-center">
              {menuLinks?.map(
                (links) =>
                  links?.text && (
                    <Link
                      key={links?.id}
                      className="text-[#8BB4DA] hover:text-white transition-colors"
                      href={links.url ?? "#"}
                    >
                      {links?.text}
                    </Link>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
