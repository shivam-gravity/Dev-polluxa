"use client";
import { useState } from "react";

export default function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(
    children && children[0]?.props?.label
  );

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div className="mx-auto">
      <div className="overflow-auto [&::-webkit-scrollbar]:hidden border-b border-[#D5D5D5]">
        <div className="flex flex-nowrap w-full ">
          {children?.map((child) => (
            <button
              key={child?.props?.label}
              className={`${
                activeTab === child?.props?.label ? "" : ""
              }  text-[#333] p-4 px-6 text-base whitespace-nowrap text-center relative`}
              onClick={(e) => handleClick(e, child?.props?.label)}
            >
              {child?.props?.label}
              {activeTab === child?.props?.label && (
                <span className="block h-1 bg-[#08B1F6] absolute w-full bottom-0 left-0 right-0 mx-auto" />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="py-4">
        {children?.map((child) => {
          if (child?.props?.label === activeTab) {
            return (
              <div key={child?.props?.label}>{child?.props?.children}</div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
