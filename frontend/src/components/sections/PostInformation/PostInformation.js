import cx from "classnames";

export default function PostInformation({ data }) {
  const { PostInformation, columns = "twoColumn" } = data;

  const gridCols = {
    twoColumn: "md:grid-cols-2",
    threeColumn: "md:grid-cols-3",
    fourColumn: "md:grid-cols-4",
  };

  if (!PostInformation?.length) return null;
  return (
    <div className="bg-sky-50 pt-10 md:pt-20 px-6">
      <div className="pb-5 mx-auto md:max-w-[1230px] 2xl:max-w-[1440px] md:px-0 md:pb-10">
        <div
          className={cx("grid text-black gap-10 md:gap-20 2xl:gap-30", {
            [gridCols[columns]]: columns,
          })}
        >
          {PostInformation?.map((section) => (
            <div key={section?.id}>
              <p className="text-primary-dark-gray text-2xl md:text-3xl 2xl:text-4xl pb-6">
                {section?.header?.heading}
              </p>
              <div className="py-3">
                {section?.Features?.map((feature) => (
                  <div key={feature?.id} className="mb-6 last:mb-0">
                    {feature?.title && (
                      <p className="text-xl md:text-2xl">{feature?.title}</p>
                    )}
                    {feature?.description && (
                      <p className="pt-3 text-sm md:text-base">
                        {feature?.description}
                      </p>
                    )}
                    {feature?.Bullets?.length > 0 && (
                      <ul className="list-disc list-inside mt-3">
                        {feature?.Bullets?.map((bullet) => (
                          <li key={bullet?.id} className="text-sm md:text-base">
                            {bullet.Bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
