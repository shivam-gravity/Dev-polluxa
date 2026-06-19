"use client";
import { Typography } from "@/components/ui";
import KPI from "@/components/common/ROI/KPI";
import Achievements from "@/components/common/ROI/Achievements";


const ROI = (props) => {
  const { data } = props;
  const { title, description, KPIS, BrandAchievements } = data;

  return (
    <section className="py-12 px-5 relative py-12 px-6  md:py-24 md:px-0">
      <div className="mx-auto md:max-w-[1230px] 2xl:max-w-[1440px]">
        <div className="text-center">
          {title && (
            <Typography
              variant="heading1"
              className="md:w-[800px] 2xl:w-[1000px] mx-auto text-[#003464]"
            >
              {title}
            </Typography>
          )}
          {description && (
            <Typography
              variant="body1"
              className="md:w-[800px] 2xl:w-[1000px] mx-auto line-clamp-3"
            >
              {description}
            </Typography>
          )}
        </div>
        <div className="grid container-custom items-center">
          {KPIS?.length > 0 && <KPI kpis={KPIS[0]} />}
          {BrandAchievements?.length > 0 && (
            <Achievements achievements={BrandAchievements[0]} />
          )}
        </div>
      </div>
    </section>
  );
};

export default ROI;
