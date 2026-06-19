"use client";
import { useState } from "react";
import { countryCodes } from "@/utils/constants";
import cx from "classnames";

const PhoneInput = ({ value, label, name, placeholder, onChange }) => {
  const [focused, setFocused] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(
    countryCodes.find((c) => c.code === "IN")
  );

  const phoneNumber =
    value?.replace(selectedCountry?.dial_code || "", "") || "";

  return (
    <div>
      {label && (
        <label className="block text-base font-regular mb-2">{label}</label>
      )}
      <div
        className={cx(
          "h-14 flex items-center bg-white appearance-none w-full rounded py-3 leading-tight focus:outline-[#0D6EFD] focus:bg-white border border-[#999999]",
          {
            "ring-2 ring-[#0D6EFD]": focused,
          }
        )}
        onClick={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setFocused(false);
          }
        }}
      >
        <select
          className="w-24 text-center text-[#666666] focus:outline-none text-xl"
          value={selectedCountry?.dial_code}
          onChange={(e) => {
            const country = countryCodes.find(
              (c) => c.dial_code === e.target.value
            );
            setSelectedCountry(country);
            onChange({
              target: {
                name,
                value: country.dial_code + phoneNumber,
              },
            });
          }}
        >
          {countryCodes.map((country) => (
            <option key={country.code} value={country.dial_code}>
              {country.dial_code}
            </option>
          ))}
        </select>
        <input
          type="tel"
          name={name}
          className="flex-1 px-4 bg-white text-xl text-[#666666] focus:outline-none"
          placeholder={placeholder}
          value={phoneNumber}
          onChange={(e) => {
            const newPhoneNumber = e.target.value.replace(/\D/g, "");
            onChange({
              target: {
                name,
                value: selectedCountry.dial_code + newPhoneNumber,
              },
            });
          }}
        />
      </div>
    </div>
  );
};

export default PhoneInput;
