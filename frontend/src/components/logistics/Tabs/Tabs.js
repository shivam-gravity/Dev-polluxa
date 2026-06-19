"use client";
import { Link } from "@/i18n/routing";
import cx from "classnames";
import { useState } from "react";
import {
  ShippingCalculator,
  TrackingOrder,
  TabButton,
} from "@/components/logistics";

const tabs = [
  {
    name: "Shipping Calculator",
    image: "/tab_shipping_calculator.svg",
    hoverImage: "/tab_shipping_calculator_hover.svg",
    width: "52",
    height: "52",
  },
  {
    name: "Tracking Order",
    image: "/tab_tracking_order.svg",
    hoverImage: "/tab_tracking_order_hover.svg",
    width: "52",
    height: "52",
  },
  {
    name: "Book Shipment",
    image: "/tab_book_shipment.svg",
    hoverImage: "/tab_book_shipment_hover.svg",
    width: "52",
    height: "52",
  },
];

const Tabs = (props) => {
  const { data } = props;
  const { enable } = data;
  const [selectedTab, setSelectedTab] = useState(null);

  if (!enable) return;

  const renderTabContent = () => {
    switch (selectedTab?.name) {
      case "Shipping Calculator":
        return <ShippingCalculator />;
      case "Tracking Order":
        return <TrackingOrder />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white px-6 py-6 md:py-12 md:px-0 md:bg-[#F2F4F8]">
      <div className="container-custom">
        <div className="bg-white md:p-4 md:rounded-3xl md:border-2 border-[#A6A6A6]">
          {/* Tabs For Desktop View */}
          <div className="hidden md:grid grid-cols-3 gap-4">
            {tabs.map((tab) => {
              const isBookShipment = tab?.name === "Book Shipment";
              return isBookShipment ? (
                <Link
                  href="https://click.aymakan.net"
                  target="_blank"
                  key={tab.name}
                >
                  <TabButton
                    tab={tab}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                  />
                </Link>
              ) : (
                <TabButton
                  key={tab.name}
                  tab={tab}
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
              );
            })}
          </div>

          {selectedTab && (
            <div key={selectedTab.name} className="hidden md:block">
              {renderTabContent()}
            </div>
          )}

          {/* Accordion For Mobile View */}
          <div className="block md:hidden">
            {tabs.map((tab) => {
              const isBookShipment = tab?.name === "Book Shipment";
              return (
                <div
                  key={tab.name}
                  className={cx("border-2 mb-3 rounded-2xl", {
                    "": selectedTab?.name !== tab.name,
                    "border-[#0D6EFD]": selectedTab?.name === tab.name,
                  })}
                >
                  {isBookShipment ? (
                    <Link href="https://click.aymakan.net">
                      <TabButton
                        tab={tab}
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                        isMobile={true}
                      />
                    </Link>
                  ) : (
                    <TabButton
                      tab={tab}
                      selectedTab={selectedTab}
                      setSelectedTab={setSelectedTab}
                      isMobile={true}
                    />
                  )}

                  <div
                    className={cx(
                      "overflow-hidden transition-max-height duration-300 ease-in-out max-h-0 px-2",
                      {
                        "max-h-fit": selectedTab?.name === tab.name,
                      }
                    )}
                  >
                    {renderTabContent()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
