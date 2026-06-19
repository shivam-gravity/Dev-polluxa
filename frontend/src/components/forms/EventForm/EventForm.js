"use client";
import { track } from "@vercel/analytics";
import { useState } from "react";
import { getStrapiURL } from "@/utils/api-helpers";
import {
  Input,
  SnackBar,
  ErrorMessage,
  Button,
  Typography,
} from "@/components/ui";
import { validation } from "@/utils/form-validations";
import { IconEventQuickContact } from "@/assets/images";
import { useTranslations } from "next-intl";

export default function EventForm() {
  const t = useTranslations("Global");
  const formFields = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
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
    try {
      const res = await fetch(
        getStrapiURL() + "/api/contact-form-submissions",
        {
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
            },
          }),
        }
      );

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

      setSnackbar({
        open: true,
        type: "success",
        message: t("enquiry_successfully_submitted"),
      });

      track("contact form successful");

      // Send email after form submission
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
          }),
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
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
      setFormerror(errors);
      setSnackbar({
        open: true,
        type: "error",
        message: t("failed_to_submit_form_check_fields"),
      });
    }
  };

  return (
    <>
      <SnackBar snackbar={snackbar} setSnackbar={setSnackbar} />
      <div className="flex flex-row w-full">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex items-center justify-start mb-6">
            <IconEventQuickContact className="flex-shrink-0" />
            <Typography
              variant="heading4"
              className="text-2xs/4 font-semibold uppercase tracking-normal text-left ml-2 text-base md:text-xl"
            >
              {t("contact_for_free_pass")}
            </Typography>
          </div>

          <div className="flex flex-wrap -mx-6">
            <div className="w-full px-6 mb-6">
              <Input
                type="text"
                name="firstName"
                value={formValues.firstName}
                onChange={handleValidation}
                placeholder={t("enter_your_first_name")}
                className="bg-white"
              />
              {formerror.firstName && (
                <ErrorMessage message={formerror.firstName} />
              )}
            </div>
            <div className="w-full px-6 mb-6">
              <Input
                type="text"
                name="lastName"
                value={formValues.lastName}
                onChange={handleValidation}
                placeholder={t("enter_your_last_name")}
                className="bg-white"
              />
              {formerror.lastName && (
                <ErrorMessage message={formerror.lastName} />
              )}
            </div>

            <div className="w-full px-6 mb-6">
              <Input
                type="text"
                name="email"
                value={formValues.email}
                onChange={handleValidation}
                placeholder={t("enter_your_company_email_id")}
                className="bg-white"
              />
              {formerror.email && <ErrorMessage message={formerror.email} />}
            </div>

            <div className="w-full px-6 mb-6">
              <Input
                type="text"
                name="phoneNumber"
                value={formValues.phoneNumber}
                onChange={handleValidation}
                placeholder={t("enter_your_phone_number")}
                className="bg-white"
              />
              {formerror.phoneNumber && (
                <ErrorMessage message={formerror.phoneNumber} />
              )}
            </div>
          </div>

          <Button type="submit" variant="primary">
            {t("register")}
          </Button>
        </form>
      </div>
    </>
  );
}
