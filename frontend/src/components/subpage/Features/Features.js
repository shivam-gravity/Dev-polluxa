"use client";

import { useState, useRef, useCallback } from "react";
import { FeatureNav } from "./FeaturesNav";
import { FeatureContent } from "./FeaturesContent";
import { useIntersectionObserver } from "@/hooks";

const Features = ({ data }) => {
  const { features } = data;
  const [activeSection, setActiveSection] = useState(features?.[0]?.id);
  const sectionRefs = useRef([]);

  const { observe, unobserve } = useIntersectionObserver({
    onIntersect: (id) => {
      //parsing it as we are expecting a decimal number in FeaturesNav
      setActiveSection(parseInt(id, 10));
    },
  });

  const scrollToSection = (index) => {
    setActiveSection(index);
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const setFeatureRef = useCallback((element, featureId) => {
    if (element) {
      sectionRefs.current[featureId] = element;
      observe(element, featureId);
    } else {
      // cleanup when it is unmounted
      const prevElement = sectionRefs.current[featureId];
      if (prevElement) {
        unobserve(prevElement);
      }
    }
  }, [observe, unobserve]);

  if (!features) return null;

  return (
    <section className="py-12 md:py-24">
      <div className="container-custom px-5 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:sticky md:top-20 md:h-fit">
            <FeatureNav
              features={features}
              activeSection={activeSection}
              onSectionChange={scrollToSection}
            />
          </div>
          <div className="md:col-span-3">
            {features?.map((feature) => (
              <div
                key={feature?.id}
                ref={(element) => setFeatureRef(element, feature?.id)}
                className="mb-16 last:mb-0 scroll-mt-20"
              >
                <FeatureContent feature={feature} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
