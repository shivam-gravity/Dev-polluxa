"use client";
import cx from "classnames";
import { useState, useTransition } from "react";
import { Input, SnackBar, ErrorMessage, Spinner } from "@/components/ui";
import { validation } from "@/utils/form-validations";
import { getShipmentDetails } from "@/serverActions/logistics/actions";
import { ShippingDetails } from "@/components/logistics";

const formFields = {
  track: "",
};

export default function ShipmentTrackingForm() {
  const [formValues, setFormValues] = useState(formFields);
  const [formerror, setFormerror] = useState({});
  const [isPending, startTransition] = useTransition();
  const [shippingDetails, setShippingDetails] = useState();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const handleValidation = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormerror((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const sumbitForm = async () => {
    const payLoad = formValues?.track;
    const res = await getShipmentDetails(payLoad);
    setShippingDetails(res?.data?.shipments[0]);

    if (res.success === false) {
      setSnackbar({
        open: true,
        type: "error",
        message: "Failed to submit, please try again",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validation(formValues);

    if (Object.keys(errors).length === 0) {
      startTransition(() => {
        sumbitForm();
      });
      setFormValues(formFields);
    } else {
      setFormerror(errors);
      setSnackbar({
        open: true,
        type: "error",
        message: "Failed to submit the form, please check the form fields",
      });
    }
  };

  return (
    <>
      <SnackBar snackbar={snackbar} setSnackbar={setSnackbar} />
      <form onSubmit={handleSubmit} className="py-8">
        <div className="md:flex">
          <div className="w-full px-3 mb-3 md:pr-16 md:mb-0">
            <Input
              type="text"
              value={formValues?.track}
              placeholder=""
              name="track"
              label="Enter your tracking number *"
              onChange={handleValidation}
            />
            <ErrorMessage message={formerror?.track} />
          </div>

          <div className="text-center md:ml-auto">
            <span className="hidden tracking-wide text-white text-base mb-2 md:block">
              Spacer
            </span>
            <button
              className="relative rounded-full text-white border-[#74CEF2] border-2 bg-gradient-to-r from-[#08B1F6] to-[#2F4BDF] mx-auto px-10 py-2 hover:to-white hover:from-white hover:text-[#2F4BDF] transition-colors duration-300 ease-in-out align-bottom"
              type="submit"
              disabled={isPending}
            >
              {isPending && (
                <Spinner
                  className="absolute left-0 right-0 mx-auto top-2.5"
                  color="black"
                  size="sm"
                />
              )}
              <span
                className={cx({
                  "invisible leading-[0]": isPending,
                })}
              >
                Check
              </span>
            </button>
          </div>
        </div>
      </form>
      {shippingDetails && <ShippingDetails shippingDetails={shippingDetails} />}
    </>
  );
}
