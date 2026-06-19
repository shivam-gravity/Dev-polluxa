import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getStrapiMedia } from "@/utils/api-helpers";

const PartnerLogo = ({ data }) => {
  const { name, logo, website } = data;
  const imageUrl = logo?.data?.attributes?.url;
  const imageWidth = logo?.data?.attributes?.width;
  const imageHeight = logo?.data?.attributes?.height;
  const imageAlt = logo?.data?.attributes?.alternativeText;

  const LogoContent = () => (
    <div className="bg-white border border-[#E2E2E2] aspect-square p-4 md:p-6 flex items-center justify-center transition-all hover:shadow-lg">
      {imageUrl && (
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={getStrapiMedia(imageUrl)}
            alt={imageAlt || name}
            width={imageWidth}
            height={imageHeight}
            className="min-w-full min-h-full object-contain"
          />
        </div>
      )}
    </div>
  );

  if (website) {
    return (
      <Link href={website} target="_blank" className="block">
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
};

export default PartnerLogo;
