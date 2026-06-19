import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import {
  Hero,
  Features,
  Clients,
  FeaturedServices,
  Company,
  Statistics,
  Industries,
  SuccessStory,
} from "@/components/homepage";
import { LargeVideo } from "@/components/subpage";
import { InternalContact } from "@/components/forms";
import { OurBrands } from "@/components/brands";
const BottomActions = dynamic(
  () => import("@/components/common/BottomActions")
);

const inter = Inter({ subsets: ["latin"] });

export function sectionRenderer(section, index) {
  switch (section.__component) {
    case "sections.hero":
      return <Hero key={index} data={section} />;
    case "sections.features":
      return <Features key={index} data={section} />;
    case "sections.clients":
      return <Clients key={index} data={section} />;
    case "sections.success-stories":
      return <SuccessStory key={index} data={section} />;
    case "sections.services":
      return <FeaturedServices key={index} data={section} fontInter={inter} />;
    case "sections.company":
      return <Company key={index} data={section} fontInter={inter} />;
    case "sections.bottom-actions":
      return <BottomActions key={index} data={section} />;
    case "sections.large-video":
      return <LargeVideo key={index} data={section} fontInter={inter} />;
    case "sections.services":
      return <FeaturedServices key={index} data={section} fontInter={inter} />;
    case "sections.homepage-statistics":
      return <Statistics key={index} data={section} fontInter={inter} />;
    case "sections.industries":
      return <Industries key={index} data={section} fontInter={inter} />;
    case "sections.internal-contact-form":
      return <InternalContact key={index} data={section} />;
    case "sections.our-brands":
      return <OurBrands key={index} data={section} />;

    default:
      return null;
  }
}
