import { Inter, Bakbak_One } from "next/font/google";
import {
  RichText,
  BottomActions,
  ROI,
  CallToAction,
} from "@/components/common";
import { PostInformationComponent } from "@/components/posts";
import { PageHeader } from "@/components/innerpages";
import { Features, Company, EmbedVideo } from "@/components/subpage";
import {
  FeaturedServices,
  Hero,
  Features as HomeFeatures,
} from "@/components/homepage";
import { OurBrands } from "@/components/brands";
import { PricingForm } from "@/components/forms";
import { EventGalleryVideo } from "@/components/events";
import { PostInformation, EventAction } from "@/components/sections";

const inter = Inter({ subsets: ["latin"] });
const bakbak = Bakbak_One({ weight: "400", subsets: ["latin"] });

export function postRenderer(section, index, pageName) {
  switch (section.__component) {
    case "sections.post-information":
      return <PostInformationComponent key={index} data={section} />;
    case "shared.rich-text":
      if (pageName === "events") {
        return (
          <section className="py-10 bg-sky-50">
            <div className="container-custom px-6 md:px-0">
              <RichText key={index} data={section} />
            </div>
          </section>
        );
      } else {
        return <RichText key={index} data={section} />;
      }
    case "layout.page-header":
      return (
        <PageHeader
          key={index}
          data={section}
          fontInter={inter}
          fontBakBak={bakbak}
        />
      );
    case "sections.feature-list":
      return <Features key={index} data={section} fontInter={inter} />;
    case "sections.company":
      return <Company key={index} data={section} fontInter={inter} />;
    case "sections.bottom-actions":
      return <BottomActions key={index} data={section} />;
    case "shared.video-embed":
      return <EmbedVideo key={index} data={section} pageName={pageName} />;
    case "sections.pricing-form":
      return <PricingForm key={index} data={section} />;
    case "sections.hero":
      return <Hero key={index} data={section} />;
    case "sections.our-brands":
      return <OurBrands key={index} data={section} />;
    case "sections.roi-section":
      return <ROI key={index} data={section} />;
    case "sections.cta":
      return <CallToAction key={index} data={section} />;
    case "sections.services":
      return (
        <FeaturedServices
          key={index}
          data={section}
          fontInter={inter}
          pageName={pageName}
        />
      );
    case "sections.features":
      return <HomeFeatures key={index} data={section} fontInter={inter} />;
    case "sections.event-gallery-and-video":
      return <EventGalleryVideo key={index} data={section} fontInter={inter} />;
    case "sections.event-information":
      return <PostInformation key={index} data={section} />;
    case "sections.event-actions":
      return <EventAction key={index} data={section} />;

    default:
      return null;
  }
}
