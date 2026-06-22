"use client";
import { track } from "@vercel/analytics";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { getStrapiURL } from "@/utils/api-helpers";
import {
  Input,
  TextArea,
  SnackBar,
  ErrorMessage,
  Button,
  PhoneInput,
} from "@/components/ui";
import { Typography } from "@/components/ui";
import { validation } from "@/utils/form-validations";
import { useTranslations } from "next-intl";

export default function Contact({ data }) {
  const t = useTranslations("Global");
  const searchParams = useSearchParams();
  const formFields = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    message: "",
  };

  const {
    heading,
    title,
    description,
    ContactDetails,
    Button: btnSubmit,
    media,
    marketingEmail,
    logisticsEmail,
    retailEmail,
    enable,
  } = data;

  const [formValues, setFormValues] = useState(formFields);
  const [errorMessage, setErrorMessage] = useState("");
  const [formerror, setFormerror] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;

  if (enable === false) return;

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
            Message: formValues?.message,
            marketingEmail: marketingEmail,
            logisticsEmail: logisticsEmail,
            retailEmail: retailEmail,
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
      <div className="bg-[#F9F9F9]">
        <div className="max-w-[1271px] mx-auto py-20 px-6 md:px-0">
          <div className="md:w-3/4 mx-auto">
            <SnackBar snackbar={snackbar} setSnackbar={setSnackbar} />
            <div className="text-center">
              {heading && (
                <Typography
                  variant="heading1"
                  className="text-[#003464] text-4xl md:text-4xl font-bold leading-tight"
                >
                  {heading}
                </Typography>
              )}
              {title && (
                <Typography variant="heading1" className="py-4 text-center">
                  {title}
                </Typography>
              )}
              {description && (
                <Typography
                  variant="body1"
                  className={`md:w-[800px] 2xl:w-[1000px] mx-auto line-clamp-3`}
                >
                  {description}
                </Typography>
              )}
            </div>

            {errorMessage && (
              <p className="text-red-500 bg-red-200 px-4 py-2 rounded-lg my-2">
                {errorMessage}
              </p>
            )}
            <div className="flex flex-row items-center self-center flex-shrink-0 mt-12 justify-center">
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <>
                    <form onSubmit={handleSubmit}>
                      <div className="flex flex-wrap -mx-3 mb-10">
                        <div className="w-full md:w-1/2 px-3 mb-6">
                          <Input
                            type="text"
                            value={formValues?.firstName}
                            placeholder={t("enter_your_first_name")}
                            name="firstName"
                            label={t("first_name_required")}
                            onChange={handleValidation}
                          />
                          <ErrorMessage message={formerror?.firstName} />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6">
                          <Input
                            type="text"
                            value={formValues?.lastName}
                            placeholder={t("enter_your_last_name")}
                            name="lastName"
                            label={t("last_name_required")}
                            onChange={handleValidation}
                          />
                          <ErrorMessage message={formerror?.lastName} />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6">
                          <Input
                            type="text"
                            placeholder={t("enter_your_work_email_id")}
                            name="email"
                            value={formValues?.email}
                            label={t("work_email_required")}
                            onChange={handleValidation}
                          />
                          <ErrorMessage message={formerror?.email} />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6">
                          <PhoneInput
                            placeholder={t("enter_your_phone_number")}
                            name="phoneNumber"
                            value={formValues?.phoneNumber}
                            label={t("phone_number_required")}
                            onChange={handleValidation}
                          />
                          <ErrorMessage message={formerror?.phoneNumber} />
                        </div>
                        <div className="w-full px-3">
                          <TextArea
                            name="message"
                            rows={4}
                            cols={40}
                            label={t("message_required")}
                            placeholder={t("message_placeholder")}
                            value={formValues?.message}
                            onChange={handleValidation}
                          />
                          <ErrorMessage message={formerror?.message} />
                        </div>
                      </div>
                      <div className="text-center">
                        <Button type="submit" variant="secondary">
                          {btnSubmit?.text ?? t("submit")}
                        </Button>
                      </div>
                    </form>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
