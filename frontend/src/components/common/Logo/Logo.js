import { Link } from "@/i18n/routing";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/api-helpers";

const Logo = (props) => {
  const { navbarLogo, navbarLogoMobile } = props;
  return (
    <div className="max-w-[150px] md:max-w-[220px]">
      <Link href="/">
        {navbarLogo && (
          <Image
            src={getStrapiMedia(navbarLogo?.url)}
            alt="logo"
            width={navbarLogo?.width}
            height={navbarLogo?.height}
            className="hidden md:block"
            priority
          />
        )}
        {navbarLogoMobile && (
          <Image
            src={getStrapiMedia(navbarLogoMobile?.url)}
            alt="logo"
            width={navbarLogoMobile?.width}
            height={navbarLogoMobile?.height}
            className="block md:hidden"
            priority
          />
        )}
      </Link>
    </div>
  );
};

export default Logo;
