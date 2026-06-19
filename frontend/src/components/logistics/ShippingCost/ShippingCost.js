import { Link } from "@/i18n/routing";
const InfoItem = ({ label, value }) => (
  <div className="pb-3 md:pb-0">
    <p className="text-sm pb-1">{label}</p>
    <p className="text-lg font-medium">{value}</p>
  </div>
);

const ShippingCost = ({ shippingCost, formValues }) => {
  const costDetails = [
    { label: "From", value: formValues?.from },
    { label: "To", value: formValues?.to },
    { label: "Weight (KG)", value: `${shippingCost?.weight} KG` },
  ];
  const pricingDetails = [
    { label: "Price", value: `${shippingCost?.price} SAR` },
    { label: "Insurance Rate", value: "0 SAR" },
    { label: "Weight", value: `${shippingCost?.weight} KG` },
    { label: "Total Price", value: `${shippingCost?.total_price} SAR` },
    { label: "Total Tax", value: `${shippingCost?.total_tax} SAR` },
    {
      label: "Total Price Inc Tax",
      value: `${shippingCost?.total_price_incl_tax} SAR`,
    },
  ];

  return (
    <div className="border-t border-[#999999] mx-3 md:mx-0">
      <div className="py-6 text-lg font-semibold">Calculated Pricing</div>
      <div className="flex md:w-[50%] justify-between py-6">
        {costDetails?.map((item, index) => (
          <InfoItem key={index} label={item.label} value={item.value} />
        ))}
      </div>
      <div className="grid grid-cols-2 w-full justify-between py-6 border-t border-[#999999] md:grid-cols-6">
        {pricingDetails?.map((item, index) => (
          <InfoItem key={index} label={item.label} value={item.value} />
        ))}
      </div>
      <div className="py-6 text-center">
        <Link href="https://click.aymakan.net" target="_blank">
          <button
            className="relative rounded-full text-white border-[#74CEF2] border-2 bg-gradient-to-r from-[#08B1F6] to-[#2F4BDF] mx-auto px-10 py-2 hover:to-white hover:from-white hover:text-[#2F4BDF] transition-colors duration-300 ease-in-out align-bottom"
            type="submit"
          >
            <span>Go to Aymakan Click</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ShippingCost;
