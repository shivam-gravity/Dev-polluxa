import cx from "classnames";
import Image from "next/image";
const TabButton = ({ tab, selectedTab, setSelectedTab }) => {
  const isTabSelected = selectedTab?.name === tab.name;
  return (
    <button
      key={tab.name}
      className={cx(
        "w-full uppercase text-[#333333] font-bold flex items-center justify-between p-2 md:border-2 md:hover:border-[#0D6EFD] md:hover:text-[#0D6EFD] md:hover:border-2 group transition-colors duration-300 ease-in-out md:mb-0 md:rounded-xl md:p-4",
        {
          "border-[#0D6EFD] text-[#0D6EFD]": isTabSelected,
          "md:border-[#A6A6A6]": !isTabSelected,
        }
      )}
      onClick={() => setSelectedTab(isTabSelected ? null : tab)}
    >
      <div className="flex items-center">
        <Image
          src={tab.image}
          alt={tab?.name}
          width={tab?.width}
          height={tab?.height}
          className={cx("mr-3 group-hover:hidden w-[42]", {
            block: !isTabSelected,
            hidden: isTabSelected,
          })}
        />
        <Image
          src={tab.hoverImage}
          alt={tab?.name}
          width={tab?.width}
          height={tab?.height}
          className={cx("mr-3 group-hover:block w-[42]", {
            hidden: !isTabSelected,
            block: isTabSelected,
          })}
        />
        <span
          className={cx({
            "text-[#0D6EFD]": isTabSelected,
          })}
        >
          {tab.name}
        </span>
      </div>
    </button>
  );
};

export default TabButton;
