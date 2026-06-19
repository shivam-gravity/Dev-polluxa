"use client";
import { useState } from "react";
import cx from "classnames";
import { getStrapiURL } from "@/utils/api-helpers";
import {
  Input,
  ErrorMessage,
  SnackBar,
  Button,
  MotionContainer,
} from "@/components/ui";
import { SectionHeader } from "@/components/common";
import { validation } from "@/utils/form-validations";

const formFields = {
  firstName: "",
  phoneNumber: "",
  country: "",
  brandName: "",
  productType: "",
  qualityCertification: "",
};

export default function RetailApplicationForm({ data }) {
  const { title, description } = data;
  const [formValues, setFormValues] = useState(formFields);
  const [formerror, setFormerror] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;

  const handleValidation = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormerror((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleRadioChange = (e) => {
    const value = e.target.value === "true"; // Convert the string value to boolean
    setFormValues({ ...formValues, qualityCertification: value });
    setFormerror((prevErrors) => ({
      ...prevErrors,
      qualityCertification: "",
    }));
  };

  const sumbitForm = async () => {
    const res = await fetch(
      getStrapiURL() + "/api/retail-application-form-submissions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            FirstName: formValues?.firstName,
            PhoneNumber: formValues?.phoneNumber,
            Country: formValues?.country,
            BrandName: formValues?.brandName,
            ProductType: formValues?.productType,
            QualityCertification: formValues?.qualityCertification,
          },
        }),
      }
    );

    setSnackbar({
      open: true,
      type: "success",
      message: "Enquiry successfully submitted!",
    });

    if (!res.ok) {
      setSnackbar({
        open: true,
        type: "error",
        message: "Failed to submit, please try again",
      });
      return;
    }
    // Send email after form submission
    else {
      try {
        const res = await fetch("/api/send/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            FirstName: formValues?.firstName,
            PhoneNumber: formValues?.phoneNumber,
            Country: formValues?.country,
            BrandName: formValues?.brandName,
            ProductType: formValues?.productType,
            QualityCertification: formValues?.qualityCertification,
          }),
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validation(formValues);
    if (Object.keys(errors).length === 0) {
      sumbitForm();
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
    <section
      className="py-12 px-5 md:py-24 md:px-0 bg-[#F4F8FF]"
      id="retailAppForm"
    >
      <SnackBar snackbar={snackbar} setSnackbar={setSnackbar} />
      <MotionContainer>
        <SectionHeader title={title} description={description} />
        <div className="container-custom">
          <form onSubmit={handleSubmit}>
            <div className="md:flex md:space-x-10">
              <div className="w-full md:w-1/2 mb-6">
                <Input
                  type="text"
                  value={formValues?.firstName}
                  placeholder="Enter your first name"
                  name="firstName"
                  label="Contact Person *"
                  onChange={handleValidation}
                />
                <ErrorMessage message={formerror?.firstName} />
              </div>
              <div className="w-full md:w-1/2 mb-6">
                <Input
                  type="text"
                  placeholder="Enter your mobile number with country code"
                  name="phoneNumber"
                  value={formValues?.phoneNumber}
                  label="Contact Number *"
                  onChange={handleValidation}
                />
                <ErrorMessage message={formerror?.phoneNumber} />
              </div>
            </div>
            <div className="md:flex md:space-x-10">
              <div className="w-full md:w-1/2 mb-6">
                <Input
                  type="text"
                  value={formValues?.brandName}
                  placeholder="Enter the brand name"
                  name="brandName"
                  label="Brand Name *"
                  onChange={handleValidation}
                />
                <ErrorMessage message={formerror?.brandName} />
              </div>
              <div className="w-full md:w-1/2 mb-6">
                <Input
                  type="text"
                  placeholder="Enter your country of origin"
                  name="country"
                  value={formValues?.country}
                  label="Country or Origin *"
                  onChange={handleValidation}
                />
                <ErrorMessage message={formerror?.country} />
              </div>
            </div>

            <div className="md:flex md:space-x-10">
              <div className="w-full md:w-1/2 mb-6">
                <Input
                  type="text"
                  value={formValues?.productType}
                  placeholder="Enter the product type"
                  name="productType"
                  label="Product Type *"
                  onChange={handleValidation}
                />
                <ErrorMessage message={formerror?.productType} />
              </div>
              <div className="w-full md:w-1/2 mb-6">
                <label
                  htmlFor="input-field"
                  className="block tracking-wide text-black text-base mb-2"
                >
                  Quality Certification *
                </label>
                <div className="flex space-x-3">
                  <span>
                    <input
                      type="radio"
                      id="quality-certification-yes"
                      name="qualityCertification"
                      value="true"
                      hidden
                      checked={formValues.qualityCertification === true}
                      onChange={handleRadioChange}
                    />
                    <label
                      htmlFor="quality-certification-yes"
                      className={cx(
                        "block py-2.5 px-5 border border-[#999999] rounded cursor-pointer hover:bg-green-600 hover:text-white",
                        {
                          "bg-green-600 text-white":
                            formValues.qualityCertification === true,
                          "bg-white": formValues.qualityCertification !== true,
                        }
                      )}
                    >
                      Yes
                    </label>
                  </span>
                  <span>
                    <input
                      type="radio"
                      id="quality-certification-no"
                      name="qualityCertification"
                      value="false"
                      hidden
                      checked={formValues.qualityCertification === false}
                      onChange={handleRadioChange}
                    />
                    <label
                      htmlFor="quality-certification-no"
                      className={cx(
                        "block py-2.5 px-5 border border-[#999999] rounded cursor-pointer hover:bg-red-600 hover:text-white",
                        {
                          "bg-red-600 text-white":
                            formValues.qualityCertification === false,
                          "bg-white": formValues.qualityCertification !== false,
                        }
                      )}
                    >
                      No
                    </label>
                  </span>
                </div>
                <div></div>
                <ErrorMessage message={formerror?.qualityCertification} />
              </div>
            </div>

            <div className="text-center">
              <Button type="submit" variant="primary">
                <span className="px-12">Submit</span>
              </Button>
            </div>
          </form>
        </div>
      </MotionContainer>
    </section>
  );
}
