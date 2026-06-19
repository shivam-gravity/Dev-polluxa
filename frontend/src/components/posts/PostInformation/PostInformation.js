import { getStrapiMedia } from "@/utils/api-helpers";
import cx from "classnames";
import Image from "next/image";
export default function PostInformation(props) {
  const { data } = props;
  const { header, Features, columns } = data;
  const { heading: title, description } = header || {};
  const columnClasses = {
    threeColumns: "md:grid-cols-3 md:gap-x-8",
    fourColumns: "md:grid-cols-4 md:gap-x-8",
    default: "md:grid-cols-2 md:gap-x-16",
  };

  return (
    <div className="bg-[#F0F0F0]">
      <div className="pb-5 mx-auto md:max-w-[1230px] 2xl:max-w-[1440px] md:px-0 md:pb-10 pt-5">
        {title && (
          <p
            className={cx("text-2xl", {
              "pb-6": !description,
              "pb-3": description,
            })}
          >
            {title}
          </p>
        )}
        {description && <p className="pb-5">{description}</p>}
        <div
          className={cx(
            "grid grid-cols-1 gap-y-2 text-black mt-3 md:gap-y-8",
            columnClasses[columns] || columnClasses.default
          )}
        >
          {Features?.map((item) => {
            return (
              <div key={item?.id} className="bg-white rounded-lg">
                {item?.media?.file.url && (
                  <Image
                    src={getStrapiMedia(item?.media.file.url)}
                    alt={item?.title || ""}
                    width={item?.media.file.width}
                    height={item?.media.file.height}
                    className="w-full h-auto object-cover rounded-t-lg"
                  />
                )}
                <div className="pt-3 p-5">
                  <p className="text-xl">{item?.title}</p>
                  <p className="pt-3">{item?.description}</p>
                  {item?.Bullets && (
                    <ul className="list-disc list-inside py-2">
                      {item?.Bullets?.map((bullet) => {
                        return <li key={bullet.id}>{bullet?.text}</li>;
                      })}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
