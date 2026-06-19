import { ArrowRight, IconLocationPin } from "@/assets/images";
import { Link } from "@/i18n/routing";

const CareerCard = ({ data }) => {
  const { attributes } = data;
  const { title, location, level, description, slug } = attributes;

  return (
    <Link
      href={slug ? `/careers/${slug}` : "#"}
      className="group flex flex-col h-full hover:no-underline focus:no-underline bg-white hover:shadow-lg"
    >
      <div className="flex flex-col h-full">
        <div className="flex flex-col flex-grow py-3 px-5 md:py-5 md:px-5">
          {title && (
            <h3 className="text-[#003464] font-medium mb-4 text-base md:text-lg lg:text-xl flex-grow">
              {title}
            </h3>
          )}

          <div className="flex flex-col items-start gap-2 md:gap-2 justify-between mb-4">
            {location && (
              <div className="flex items-center text-xs md:text-sm text-primary-dark-gray font-medium">
                <IconLocationPin className="mr-2" />
                <span>{location}</span>
              </div>
            )}
            <p className="border-y-2 border-zinc-300 py-1 w-full">{level}</p>
          </div>
          {description && (
            <p className="text-primary-dark-gray text-sm md:text-base line-clamp-3 group-hover:text-secondary-blue">
              {description}
            </p>
          )}

          <div className="flex justify-end pt-7 md:pt-10 mb-2 group-hover:text-secondary-blue">
            <ArrowRight />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CareerCard;
