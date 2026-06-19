"use client";
import cx from "classnames";
import Image from "next/image";
import { useState } from "react";

import { getStrapiURL } from "@/utils/api-helpers";
import {
  Typography,
  Input,
  ErrorMessage,
  TextArea,
  SnackBar,
  Button,
  MotionContainer,
} from "@/components/ui";
import { getStrapiMedia } from "@/utils/api-helpers";
import { validation } from "@/utils/form-validations";

const formFields = {
  firstName: "",
  lastName: "-",
  phoneNumber: "00000000",
  email: "",
  organization: "-",
  message: "",
};

const ContactDetail = ({ item, isFirst }) => (
  <div className="mb-6 rounded-xl">
    <div className="flex space-x-4 items-center">
      <div className="w-[36px]">
        {item?.media.data && (
          <Image
            src={getStrapiMedia(item?.media?.data?.attributes?.url)}
            alt={item?.media?.data?.attributes.alternativeText}
            width={item?.media?.data?.attributes?.width}
            height={item?.media?.data?.attributes?.height}
          />
        )}
      </div>
      <div>
        <p
          className={cx(`md:text-xl`, {
            "font-bold": isFirst,
            "font-light": !isFirst,
          })}
        >
          {item?.title}
        </p>
        {item?.description && <p className="text-sm">{item?.description}</p>}
      </div>
    </div>
  </div>
);

export default function InternalContact({ data, department }) {
  const { title, ContactDetails } = data;
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
          Department: department,
          Organization: formValues?.organization,
          Message: formValues?.message,
        },
      }),
    });

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
            LastName: formValues?.lastName,
            PhoneNumber: formValues?.phoneNumber,
            Email: formValues?.email,
            Department: department,
            Organization: formValues?.organization,
            Message: formValues?.message,
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
    <>
      <SnackBar snackbar={snackbar} setSnackbar={setSnackbar} />
      <MotionContainer>
        <div className="py-8 px-5 md:px-0">
          {title && (
            <div className="text-center">
              <Typography variant="gradient" className="py-4">
                <span className="text-black normal-case tracking-normal font-normal text-lg md:text-3xl">
                  {title}
                </span>
              </Typography>
            </div>
          )}
          <div className="md:max-w-4xl mx-auto mt-5">
            {/* TODO: Need to remove below commented code once ollkom site is stable */}
            {/*
              <div>
              <p className="mb-8">Contact Person</p>
              {ContactDetails?.map((item, index) => (
                <ContactDetail
                  key={item?.id}
                  item={item}
                  isFirst={index === 0}
                />
              ))}
            </div>
              */}
            <div>
              {/* TODO: Need to remove below commented code once ollkom site is stable */}
              {/*<p className="mb-8">Contact Form</p> */}
              <form onSubmit={handleSubmit}>
                <div className="md:flex md:space-x-3">
                  <div className="w-full md:w-1/2 mb-6">
                    <Input
                      type="text"
                      value={formValues?.firstName}
                      placeholder="Enter your name"
                      name="firstName"
                      onChange={handleValidation}
                    />
                    <ErrorMessage message={formerror?.firstName} />
                  </div>
                  <div className="w-full md:w-1/2 mb-6">
                    <Input
                      type="text"
                      placeholder="Enter your Official Email ID"
                      name="email"
                      value={formValues?.email}
                      onChange={handleValidation}
                    />
                    <ErrorMessage message={formerror?.email} />
                  </div>
                </div>
                <div className="flex mb-6">
                  <div className="w-full">
                    <TextArea
                      name="message"
                      rows={4}
                      cols={40}
                      placeholder="Let us know how we can help you"
                      value={formValues?.message}
                      onChange={handleValidation}
                    />
                    <ErrorMessage message={formerror?.message} />
                  </div>
                </div>
                <div className="text-center">
                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </MotionContainer>
    </>
  );
}
