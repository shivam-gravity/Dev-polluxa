import { format } from "date-fns";
import { Stepper } from "@/components/logistics";

const ShippingDetails = ({ shippingDetails }) => {
  const {
    tracking_number,
    payment_method,
    delivery_city,
    collection_city,
    delivery_name,
    pieces,
    status_label,
    weight,
    tracking_info,
  } = shippingDetails || {};

  return (
    <>
      <div className="overflow-auto [&::-webkit-scrollbar]:hidden">
        <div className="md:flex flex-col items-center justify-center">
          <Stepper trackingInfo={tracking_info} />
        </div>
      </div>

      <div className="border-t border-[#999999] -mx-4 px-7">
        <div className="py-6 text-lg font-semibold">
          Order Tracking Information
        </div>
        <div className="grid grid-cols-1 gap-0 pb-6 md:grid-cols-3 md:gap-6">
          <div className="pb-3 md:pb-0">
            <p className="text-sm pb-1">Tracking No</p>
            <p className="text-lg font-medium">{tracking_number}</p>
          </div>
          <div className="pb-3 md:pb-0">
            <p className="text-sm pb-1">Current Status:</p>
            <p className="text-lg font-medium">
              {status_label === "Delivered" &&
                `Shipment is delivered to customer. Received by ${delivery_name}`}
              {status_label !== "Delivered" && status_label}
            </p>
          </div>
          {pieces && (
            <div className="pb-3 md:pb-0">
              <p className="text-sm pb-1">Weight</p>
              <p className="text-lg font-medium">{weight} kg</p>
            </div>
          )}
          <div className="pb-3 md:pb-0">
            <p className="text-sm pb-1">Origin:</p>
            <p className="text-lg font-medium">{collection_city}</p>
          </div>
          <div className="pb-3 md:pb-0">
            <p className="text-sm pb-1">Destination:</p>
            <p className="text-lg font-medium">{delivery_city}</p>
          </div>
          <div className="pb-3 md:pb-0">
            <p className="text-sm pb-1">Payment Method:</p>
            <p className="text-lg font-medium">{payment_method}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-[#D9D9D9]">
        <div className="py-6 text-lg font-semibold">Order History</div>
        <div className="overflow-hidden">
          {tracking_info.map((info) => {
            return (
              <ul className="text-left track-y top-level">
                <li className="relative my-[48px]">
                  <div className="grid grid-flow-col auto-cols-max items-center">
                    <div className="order-2 md:order-1 hidden md:block">
                      <span className="block md:w-[60%] md:mx-auto md:text-center">
                        {format(
                          new Date(info?.created_at),
                          "dd/MM/yyyy hh:mm a"
                        )}
                      </span>
                    </div>
                    <span className="order-1 max-lg:row-span-2 bg-[#08B1F6] h-12 w-12 text-center text-2xl p-4 max-lg:basis-2 relative z-50 rounded-full border-2 border-[#D9D9D9] md:order-2">
                      <span className="rounded-full bg-white w-6 h-6 absolute left-0 right-0 mx-auto top-2.5 border-2 border-[#D9D9D9]"></span>
                    </span>
                    <span className="order-3 pl-3 md:order-3 md:pl-6 block">
                      <div className="order-2 block md:order-1 md:hidden">
                        <span className="block md:w-[60%] md:mx-auto md:text-center">
                          {format(
                            new Date(info?.created_at),
                            "dd/MM/yyyy hh:mm a"
                          )}
                        </span>
                      </div>
                      {info?.description}
                    </span>
                  </div>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ShippingDetails;
