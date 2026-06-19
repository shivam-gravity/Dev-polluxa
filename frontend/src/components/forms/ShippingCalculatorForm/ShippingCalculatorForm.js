"use client";
import cx from "classnames";
import { useState, useTransition } from "react";
import { Input, SnackBar, ErrorMessage, Spinner } from "@/components/ui";
import { validation } from "@/utils/form-validations";
import { getShippingPrice } from "@/serverActions/logistics/actions";
import { ShippingCost } from "@/components/logistics";
import { cities } from "@/utils/constants";

const SuggestionList = ({ suggestions, onClick }) => {
  if (suggestions.length === 0) return null;

  return (
    <ul className="absolute bg-white border border-gray-300 w-full z-10">
      {suggestions.map((city) => (
        <li
          key={city.id}
          className="p-2 cursor-pointer hover:bg-gray-200"
          onClick={() => onClick(city)}
        >
          {city.city_en}
        </li>
      ))}
    </ul>
  );
};

const formFields = {
  from: "",
  to: "",
  weight: "",
};

export default function ShippingCalculatorForm() {
  const [formValues, setFormValues] = useState(formFields);
  const [formerror, setFormerror] = useState({});
  const [isPending, startTransition] = useTransition();
  const [shippingCost, setShippingCost] = useState();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [suggestions, setSuggestions] = useState({
    from: [],
    to: [],
  });

  const handleValidation = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormerror((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
    // Clear suggestions if the input is empty
    if (value === "") {
      setSuggestions({ ...suggestions, [name]: [] });
      return;
    }
    // Filter suggestions based on input value
    const filteredSuggestions = cities
      .filter((city) =>
        city.city_en.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 6);
    setSuggestions({
      ...suggestions,
      [name]: filteredSuggestions,
    });
  };

  const handleSuggestionClick = (field, city) => {
    setFormValues({ ...formValues, [field]: city.city_en });
    setSuggestions({ ...suggestions, [field]: [] });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    // Delay to allow handleSuggestionClick to be called
    setTimeout(() => {
      setSuggestions({ ...suggestions, [name]: [] });
    }, 200);
  };

  const sumbitForm = async () => {
    const payLoad = {
      service: "delivery",
      collection_city: formValues?.from,
      delivery_city: formValues?.to,
      weight: formValues?.weight,
    };
    const res = await getShippingPrice(payLoad);
    setShippingCost(res);

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
      localStorage.setItem("shippingFrom", formValues.from);
      localStorage.setItem("shippingTo", formValues.to);
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
          <div className="w-full mb-3 md:pr-6 md:mb-0 md:w-1/3">
            <div className="relative">
              <Input
                type="text"
                value={formValues?.from}
                placeholder=""
                name="from"
                label="From *"
                onChange={handleValidation}
                onBlur={handleBlur}
              />
              <ErrorMessage message={formerror?.from} />
              <SuggestionList
                suggestions={suggestions.from}
                onClick={(city) => handleSuggestionClick("from", city)}
              />
            </div>
          </div>
          <div className="w-full mb-3 md:mb-0 md:pr-6 md:w-1/3 relative">
            <Input
              type="text"
              value={formValues?.to}
              placeholder=""
              name="to"
              label="To *"
              onChange={handleValidation}
              onBlur={handleBlur}
            />
            <ErrorMessage message={formerror?.to} />
            <SuggestionList
              suggestions={suggestions.to}
              onClick={(city) => handleSuggestionClick("to", city)}
            />
          </div>
          <div className="w-full mb-3 md:mr-4 md:mb-0 md:w-[200px]">
            <Input
              type="text"
              placeholder=""
              name="weight"
              value={formValues?.weight}
              label="Weight (KG)*"
              onChange={handleValidation}
            />
            <ErrorMessage message={formerror?.weight} />
          </div>

          <div className="text-center md:ml-auto">
            <span className="block tracking-wide text-white text-base mb-2">
              Contact
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
                Calculate
              </span>
            </button>
          </div>
        </div>
      </form>

      {shippingCost && (
        <ShippingCost
          shippingCost={shippingCost}
          formValues={{
            from: localStorage.getItem("shippingFrom"),
            to: localStorage.getItem("shippingTo"),
          }}
        />
      )}
    </>
  );
}
