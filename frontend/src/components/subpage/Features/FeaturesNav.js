import cx from "classnames";
export const FeatureNav = ({ features, activeSection, onSectionChange }) => {
  return (
    <nav className="flex flex-col">
      {features?.map((feature) => (
        <button
          key={feature?.id}
          onClick={() => onSectionChange(feature?.id)}
          className="relative py-3 text-left transition-colors group"
        >
          <div
            className={cx(
              "absolute left-0 top-0 bottom-0 w-1 transition-all",
              activeSection === feature?.id
                ? "bg-[#0E61FE]"
                : "bg-[#D7D7D7] group-hover:bg-[#0E61FE]"
            )}
          />
          {feature?.title && (
            <span
              className={cx(
                "leading-[1.6] font-regular pl-6 block transition-colors",
                activeSection === feature?.id
                  ? "text-[#0E61FE]"
                  : "text-[#333333] hover:text-[#0E61FE]"
              )}
            >
              {feature?.title}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
};
