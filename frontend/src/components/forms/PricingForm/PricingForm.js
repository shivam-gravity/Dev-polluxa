"use client";
import { useState } from "react";
import { track } from "@vercel/analytics";
import { getStrapiURL } from "@/utils/api-helpers";
import { Link } from "@/i18n/routing";
import {
  Input,
  TextArea,
  SnackBar,
  ErrorMessage,
  Button,
  Typography,
  Select,
} from "@/components/ui";
import { validation } from "@/utils/form-validations";
import { CheckBoxCircleLine } from "@/assets/images";
import { countries } from "@/utils/constants";

const PricingForm = ({ data }) => {
  const {
    title,
    subtitle,
    subHeading,
    description,
    buttons,
    Bullets,
    FormDetails,
  } = data;
  const formFields = {
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    position: "",
    phoneNumber: "",
    country: "",
    industry: "",
    comments: "",
  };

  const industries = [
    { label: "Select Industry", value: "" },
    { label: "PLM", value: "plm" },
    { label: "Marketing", value: "marketing" },
    { label: "Logistics", value: "logistics" },
    { label: "Retail", value: "retail" },
    { label: "Technology", value: "technology" },
    { label: "Others", value: "others" },
  ];

  const [formValues, setFormValues] = useState(formFields);
  const [errorMessage, setErrorMessage] = useState("");
  const [formerror, setFormerror] = useState({});
  const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;

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
    const res = await fetch(getStrapiURL() + "/api/pricing-form-submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          FirstName: formValues?.firstName,
          LastName: formValues?.lastName,
          Phone: formValues?.phoneNumber,
          BusinessEmail: formValues?.email,
          Company: formValues?.company,
          JobTitle: formValues?.position,
          Country: formValues?.country,
          Industry: formValues?.industry,
          Comments: formValues?.comments,
        },
      }),
    });

    setSnackbar({
      open: true,
      type: "success",
      message: "Enquiry successfully submitted!",
    });

    track("contact form successful");

    if (!res.ok) {
      track("contact form failed");
      setErrorMessage("Failed to submit, please try again");
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
        const res = await fetch("/api/send/pricing", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            FirstName: formValues?.firstName,
            LastName: formValues?.lastName,
            Email: formValues?.email,
            Phone: formValues?.phoneNumber,
            Industry: formValues?.industry,
            Position: formValues?.position,
            Company: formValues?.company,
            Country: formValues?.country,
            Comments: formValues?.comments,
          }),
        });
      } catch (error) {
        console.log(error);
      }
    }
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    track("contact button clicked");
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
    <section className="bg-[#F0F0F0] px-6 md:px-0 py-10 text-center md:text-left">
      <SnackBar snackbar={snackbar} setSnackbar={setSnackbar} />
      {errorMessage && (
        <p className="text-red-500 bg-red-200 px-4 py-2 rounded-lg my-2">
          {errorMessage}
        </p>
      )}
      <div className="container-custom relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 min-h-[300px]">
          <div className="md:col-span-5 space-y-6 z-10">
            {subHeading && (
              <h2 className="text-md font-regular text-[#333333] leading-auto">
                {subHeading}
              </h2>
            )}
            {title && (
              <h1 className="text-4xl md:text-5xl font-bold text-[#003464] leading-auto">
                {title}
              </h1>
            )}
            {subtitle && <p className="text-[#333333] text-3xl">{subtitle}</p>}
            {Bullets?.length > 0 &&
              Bullets?.map((bullet) => (
                <li
                  className="text-[#333333] text-lg list-none flex items-center"
                  key={bullet?.id}
                >
                  <CheckBoxCircleLine className="inline-block mr-2" />
                  {bullet?.Bullet}
                </li>
              ))}
            {description && (
              <p className="text-[#333333] text-md leading-7">{description}</p>
            )}
            {buttons?.url && (
              <Link href={buttons?.url}>
                <Button type="button" variant={buttons?.type} className="mt-5">
                  {buttons?.text}
                </Button>
              </Link>
            )}
          </div>

          <div className="flex-1 md:col-span-7 p-6">
            {FormDetails?.title && (
              <p className="text-[#333333] text-3xl pb-4">
                {FormDetails?.title}
              </p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-5">
                  <Input
                    type="text"
                    value={formValues?.firstName}
                    placeholder="Enter First Name"
                    name="firstName"
                    label="First Name*"
                    onChange={handleValidation}
                  />
                  <ErrorMessage message={formerror?.firstName} />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-5">
                  <Input
                    type="text"
                    value={formValues?.lastName}
                    placeholder="Enter Last Name"
                    name="lastName"
                    label="Last Name*"
                    onChange={handleValidation}
                  />
                  <ErrorMessage message={formerror?.lastName} />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-5">
                  <Input
                    type="text"
                    placeholder="Enter Enter Business Email"
                    name="email"
                    value={formValues?.email}
                    onChange={handleValidation}
                    label="Business Email*"
                  />
                  <ErrorMessage message={formerror?.email} />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-5">
                  <Input
                    type="text"
                    placeholder="Enter Company Name"
                    name="company"
                    value={formValues?.company}
                    onChange={handleValidation}
                    label="Company*"
                  />
                  <ErrorMessage message={formerror?.company} />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-5">
                  <Input
                    type="text"
                    placeholder="Enter job title"
                    name="position"
                    value={formValues?.position}
                    onChange={handleValidation}
                    label="Job Title*"
                  />
                  <ErrorMessage message={formerror?.position} />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-5">
                  <Select
                    label="Industry"
                    options={industries}
                    name="industry"
                    placeholder="Select Industry"
                    value={formValues?.industry}
                    onChange={handleValidation}
                  />
                  <ErrorMessage message={formerror?.industry} />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-5">
                  <Input
                    type="text"
                    placeholder="Enter Number"
                    label="Phone"
                    name="phoneNumber"
                    value={formValues?.phoneNumber}
                    onChange={handleValidation}
                  />
                  <ErrorMessage message={formerror?.phoneNumber} />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <Select
                    label="Country*"
                    options={countries}
                    name="country"
                    placeholder="Select Country"
                    value={formValues?.country}
                    onChange={handleValidation}
                  />
                  <ErrorMessage message={formerror?.country} />
                </div>
                <div className="w-full px-3">
                  <TextArea
                    name="comments"
                    label="Comments"
                    rows={4}
                    cols={40}
                    placeholder="Enter your Comments"
                    value={formValues?.comments}
                    onChange={handleValidation}
                  />
                  <ErrorMessage message={formerror?.comments} />
                </div>
              </div>

              <div className="flex flex-col gap-2 md:flex-row md:justify-between">
                <p>
                  By submitting this form you have read and agreed to
                  <Link href="#" className="text-[#0D8AFD]">
                    {" "}
                    our terms and conditions
                  </Link>{" "}
                  and
                  <Link href="#" className="text-[#0D8AFD]">
                    {" "}
                    privacy policy
                  </Link>
                </p>
                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full md:w-auto"
                >
                  <Typography variant="button" className="text-white">
                    Submit
                  </Typography>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingForm;
