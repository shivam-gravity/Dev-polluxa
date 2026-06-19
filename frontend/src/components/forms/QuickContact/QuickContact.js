"use client";
import { track } from "@vercel/analytics";
import { useState } from "react";
import { getStrapiURL } from "@/utils/api-helpers";
import {
  Input,
  TextArea,
  SnackBar,
  ErrorMessage,
  Button,
  Typography,
} from "@/components/ui";
import { validation } from "@/utils/form-validations";
import { useTranslations } from "next-intl";

export default function QuickContact() {
  const t = useTranslations("Global");

  const formFields = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    organization: "",
    country: "",
    message: "",
  };

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
    const res = await fetch(getStrapiURL() + "/api/contact-form-submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          FirstName: formValues?.firstName,
          LastName: formValues?.lastName,
          PhoneNumber: formValues?.phoneNumber,
          Email: formValues?.email,
          Organization: formValues?.organization,
          Country: formValues?.country,
          Message: formValues?.message,
        },
      }),
    });

    setSnackbar({
      open: true,
      type: "success",
      message: t("enquiry_successfully_submitted"),
    });

    track("contact form successful");

    if (!res.ok) {
      track("contact form failed");
      setErrorMessage(t("failed_to_submit_try_again"));
      setSnackbar({
        open: true,
        type: "error",
        message: t("failed_to_submit_try_again"),
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
            LastName: formValues?.lastName,
            PhoneNumber: formValues?.phoneNumber,
            Email: formValues?.email,
            Organization: formValues?.organization,
            Country: formValues?.country,
            Message: formValues?.message,
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
    const errors = validation(formValues, t);
    if (Object.keys(errors).length === 0) {
      sumbitForm();
      setFormValues(formFields);
    } else {
      console.log(errors);
      setFormerror(errors);
      setSnackbar({
        open: true,
        type: "error",
        message: t("failed_to_submit_check_fields"),
      });
    }
  };

  return (
    <>
      <div className="">
        <SnackBar snackbar={snackbar} setSnackbar={setSnackbar} />
        {errorMessage && (
          <p className="text-red-500 bg-red-200 px-4 py-2 rounded-lg my-2">
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-5">
              <Input
                type="text"
                value={formValues?.firstName}
                placeholder={t("first_name")}
                name="firstName"
                onChange={handleValidation}
              />
              <ErrorMessage message={formerror?.firstName} />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-5">
              <Input
                type="text"
                value={formValues?.lastName}
                placeholder={t("last_name")}
                name="lastName"
                onChange={handleValidation}
              />
              <ErrorMessage message={formerror?.lastName} />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-5">
              <Input
                type="text"
                placeholder={t("business_email")}
                name="email"
                value={formValues?.email}
                onChange={handleValidation}
              />
              <ErrorMessage message={formerror?.email} />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-5">
              <Input
                type="text"
                placeholder={t("company")}
                name="organization"
                value={formValues?.organization}
                onChange={handleValidation}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-5">
              <Input
                type="text"
                placeholder={t("phone")}
                name="phoneNumber"
                value={formValues?.phoneNumber}
                onChange={handleValidation}
              />
              <ErrorMessage message={formerror?.phoneNumber} />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <Input
                type="text"
                placeholder={t("country")}
                name="country"
                value={formValues?.country}
                onChange={handleValidation}
              />
              <ErrorMessage message={formerror?.country} />
            </div>
            <div className="w-full px-3">
              <TextArea
                name="message"
                rows={4}
                cols={40}
                placeholder={t("comments")}
                value={formValues?.message}
                onChange={handleValidation}
              />
              <ErrorMessage message={formerror?.message} />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="secondary">
              <Typography variant="button" className="text-white">
                {t("submit")}
              </Typography>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
