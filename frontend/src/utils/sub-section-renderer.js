import { Suspense } from "react";
import { Inter } from "next/font/google";
import {
  Contact,
  Careers,
  RetailApplicationForm,
  PricingForm,
} from "@/components/forms";
import {
  PageHeader,
  BottomActions,
  BannerSlider,
  Faq,
  ServicesTabs,
  CallToAction,
  ScheduleDemo,
  ZigzagCards,
  KeyStats,
  InfoGrid,
  RichText,
} from "@/components/common";
import {
  Products,
  Company,
  LargeVideo,
  CeoMessage,
  EnhancedFeatures,
  Package,
  TechProducts,
} from "@/components/subpage";
import {
  FeaturedServices,
  Hero,
  Features,
  Statistics,
} from "@/components/homepage";
import { Tabs } from "@/components/logistics";
import { OurBrands } from "@/components/brands";
import { FeaturedProductsHorizontal } from "@/components/common";
import Partners, { AddressSection } from "@/components/sections";

const inter = Inter({ subsets: ["latin"] });

export function subSectionRenderer(section, index, pageName) {
  switch (section.__component) {
    case "layout.page-header":
      return <PageHeader key={index} data={section} fontInter={inter} />;
    case "sections.hero":
      return <Hero key={index} data={section} />;
    case "sections.home-featured-service":
      return <FeaturedServices key={index} data={section} fontInter={inter} />;
    case "sections.service-tabs":
      return <ServicesTabs key={index} data={section} fontInter={inter} />;
    case "sections.contact-form":
      return (
        <Suspense key={index} fallback={<div>Loading...</div>}>
          <Contact key={index} data={section} />
        </Suspense>
      );
    case "sections.career-form":
      return <Careers key={index} data={section} />;
    case "sections.features":
      return <Features key={index} data={section} fontInter={inter} />;

      break;
    case "sections.logistics":
      return <Products key={index} data={section} />;
    case "sections.marketing":
      return <Products key={index} data={section} />;
    case "sections.company":
      return <Company key={index} data={section} fontInter={inter} />;
    case "sections.cta":
      return <CallToAction key={index} data={section} />;
    case "sections.bottom-actions":
      return <BottomActions key={index} data={section} />;
    case "sections.ceo-message":
      return <CeoMessage key={index} data={section} fontInter={inter} />;
    case "sections.large-video":
      return <LargeVideo key={index} data={section} fontInter={inter} />;
    case "sections.logistics-page-forms":
      return <Tabs key={index} data={section} />;
    case "sections.services":
      return <FeaturedServices key={index} data={section} fontInter={inter} />;
    case "sections.package":
      return <Package key={index} data={section} />;
    case "sections.banner-slider":
      return <BannerSlider key={index} data={section} />;
    case "sections.faq":
      return <Faq key={index} data={section} />;
    case "sections.homepage-statistics":
      return <Statistics key={index} data={section} fontInter={inter} />;
    case "sections.retail-application-form":
      return (
        <RetailApplicationForm key={index} data={section} fontInter={inter} />
      );
    case "sections.our-brands":
      return <OurBrands key={index} data={section} />;
    case "sections.featured-products":
      return <FeaturedProductsHorizontal key={index} data={section} />;
    case "sections.schedule-demo":
      return <ScheduleDemo key={index} data={section} />;
    case "sections.zigzag-cards":
      return <ZigzagCards key={index} data={section} />;
    case "sections.key-stats":
      return <KeyStats key={index} data={section} />;
    case "sections.partners":
      return <Partners key={index} data={section} />;
    case "sections.info-grid":
      return <InfoGrid key={index} data={section} />;
    case "sections.tech-products":
      return <TechProducts key={index} data={section} />;
    case "shared.rich-text":
      if (pageName === "privacy-policy") {
        return (
          <section className="container-custom">
            <RichText key={index} data={section} />
          </section>
        );
      } else {
        return <RichText key={index} data={section} />;
      }
    case "sections.pricing-form":
      return <PricingForm key={index} data={section} />;
    case "sections.address-section":
      return <AddressSection key={index} data={section} />;
    default:
      return null;
  }
}
