"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { getStrapiURL } from "@/utils/api-helpers";
import {
  Input,
  Select,
  SnackBar,
  ErrorMessage,
  MotionContainer,
} from "@/components/ui";
import { Typography } from "@/components/ui";
import "react-datepicker/dist/react-datepicker.css";
import { validation } from "@/utils/form-validations";
import { IconCalender, IconUpload } from "@/assets/images";
import { SectionHeader } from "@/components/common";

const formFields = {
  name: "",
  phoneNumber: "",
  email: "",
  nationality: "",
  experience: "",
  maritalStatus: "",
  gender: "",
  resume: "",
  position: "",
  company: "",
  highestDegree: "",
  location: "",
  graduationYear: "",
  dob: "",
  major: "",
};

const maritalStatus = [
  { label: "Enter your marital status", value: "" },
  { label: "Married", value: "Married" },
  { label: "Single", value: "Single" },
];

const genderOptions = [
  { label: "Select Gender", value: "" },
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];

export default function Careers({ data }) {
  const { title, description, Button: btnSubmit, CareersEmail } = data;
  const [formValues, setFormValues] = useState(formFields);
  const [errorMessage, setErrorMessage] = useState("");
  const [formerror, setFormerror] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;

  const handleValidation = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setFormerror((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const sumbitForm = async () => {
    const formattedDate =
      formValues?.dob && new Date(formValues?.dob).toISOString().split("T")[0];

    const formData = new FormData();

    formData.append(`files.resume`, formValues?.resume);

    formData.append(
      "data",
      JSON.stringify({
        Name: formValues?.name,
        PhoneNumber: formValues?.phoneNumber,
        Email: formValues?.email,
        Nationality: formValues?.nationality,
        Experience: formValues?.experience,
        MaritalStatus: formValues?.maritalStatus,
        Gender: formValues?.gender,
        CareersEmail: CareersEmail,
        CurrentPosition: formValues?.position,
        CurrentCompany: formValues?.company,
        HighestDegree: formValues?.highestDegree,
        Location: formValues?.location,
        GraduationYear:
          formValues?.graduationYear &&
          formValues?.graduationYear.getFullYear().toString(),
        DOB: formattedDate,
        Major: formValues?.major,
      })
    );

    const res = await fetch(getStrapiURL() + "/api/career-form-submissions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    setSnackbar({
      open: true,
      type: "success",
      message: "Enquiry successfully submitted!",
    });

    if (!res.ok) {
      setErrorMessage("Failed to submit, please try again");
      setSnackbar({
        open: true,
        type: "error",
        message: "Failed to submit, please try again",
      });
      return;
    } else {
      try {
        const res = await fetch("/api/send/careers", {
          method: "POST",
          body: formData,
        });
      } catch (error) {
        console.log(error);
      }
    }

    setErrorMessage("");
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
      <div className="bg-[#F2F4F8]">
        <SnackBar snackbar={snackbar} setSnackbar={setSnackbar} />
        <MotionContainer>
          <div className="max-w-[1271px] mx-auto py-20 px-6 md:px-0">
            <div className="md:w-3/4 mx-auto">
              <SectionHeader title={title} description={description} />
              {errorMessage && (
                <p className="text-red-500 bg-red-200 px-4 py-2 rounded-lg my-2">
                  {errorMessage}
                </p>
              )}
              <div className="">
                <div className="flex flex-row items-center self-center flex-shrink-0 mt-6 justify-center">
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <>
                        <form onSubmit={handleSubmit}>
                          <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6">
                              <Input
                                type="text"
                                value={formValues?.name}
                                placeholder="Enter your name"
                                name="name"
                                label="Name *"
                                onChange={handleValidation}
                              />
                              <ErrorMessage message={formerror?.name} />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6">
                              <Input
                                type="text"
                                placeholder="Enter your mobile number with country code"
                                name="phoneNumber"
                                value={formValues?.phoneNumber}
                                label="Phone Number *"
                                onChange={handleValidation}
                              />
                              <ErrorMessage message={formerror?.phoneNumber} />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6">
                              <Input
                                type="text"
                                placeholder="Enter your Email ID"
                                name="email"
                                value={formValues?.email}
                                label="Email Address *"
                                onChange={handleValidation}
                              />
                              <ErrorMessage message={formerror?.email} />
                            </div>
                            {/*
                              
                              <div className="w-full md:w-1/2 px-3 mb-6">
                              <Input
                                type="text"
                                value={formValues?.position}
                                placeholder="Enter your current position title"
                                name="position"
                                label="Current Position Title"
                                onChange={handleValidation}
                              />
                              <ErrorMessage message={formerror?.position} />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6">
                              <Input
                                type="text"
                                value={formValues?.company}
                                placeholder="Enter your current company name"
                                name="company"
                                label="Current Company"
                                onChange={handleValidation}
                              />
                              <ErrorMessage message={formerror?.company} />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6">
                              <Input
                                type="text"
                                value={formValues?.experience}
                                placeholder="Enter the total number of years of experience"
                                name="experience"
                                label="Total Years of Experience"
                                onChange={handleValidation}
                              />
                              <ErrorMessage message={formerror?.experience} />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6">
                              <Input
                                type="text"
                                value={formValues?.highestDegree}
                                placeholder="Enter your highest educational degree"
                                name="highestDegree"
                                label="Highest Educational Degree"
                                onChange={handleValidation}
                              />
                              <ErrorMessage
                                message={formerror?.highestDegree}
                              />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6">
                              <Input
                                type="text"
                                value={formValues?.major}
                                placeholder="Enter your major"
                                name="major"
                                label="Major"
                                onChange={handleValidation}
                              />
                              <ErrorMessage message={formerror?.major} />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 relative ">
                              <label
                                htmlFor="input-field"
                                className="block tracking-wide text-black text-base mb-2"
                              >
                                Graduation Year
                              </label>
                              <DatePicker
                                selected={formValues?.graduationYear}
                                onChange={(date) => {
                                  setFormValues({
                                    ...formValues,
                                    graduationYear: date,
                                  });
                                  setFormerror({
                                    ...formerror,
                                    graduationYear: "",
                                  });
                                }}
                                name="dateofbirth"
                                placeholderText="yyyy"
                                dateFormat="yyyy"
                                showYearPicker
                                className="px-4 py-2.5 text-gray-700 rounded w-full border-[#999999] border"
                              />
                              <IconCalender className="absolute z-10 top-11 right-5" />
                              <ErrorMessage
                                message={formerror?.graduationYear}
                              />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 relative">
                              <label
                                htmlFor="input-field"
                                className="block tracking-wide text-black text-base mb-2"
                              >
                                Date of birth
                              </label>
                              <DatePicker
                                selected={formValues?.dob}
                                onChange={(date) => {
                                  setFormValues({
                                    ...formValues,
                                    dob: date,
                                  });
                                  setFormerror({
                                    ...formerror,
                                    dob: "",
                                  });
                                }}
                                name="dateofbirth"
                                placeholderText="dd/ mm/ yyyy"
                                dateFormat="dd/MM/yyyy"
                                className="px-4 py-2.5 text-gray-700 rounded w-full border-[#999999] border"
                              />
                              <IconCalender className="absolute z-10 top-11 right-5" />
                              <ErrorMessage message={formerror?.dob} />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6">
                              <Select
                                options={maritalStatus}
                                name="maritalStatus"
                                label="Marital Status"
                                value={formValues?.maritalStatus}
                                onChange={handleValidation}
                              />
                              <ErrorMessage
                                message={formerror?.maritalStatus}
                              />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6">
                              <Select
                                label="Gender"
                                options={genderOptions}
                                name="gender"
                                value={formValues?.gender}
                                onChange={handleValidation}
                              />
                              <ErrorMessage message={formerror?.gender} />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6">
                              <Input
                                type="text"
                                value={formValues?.nationality}
                                placeholder="Enter your nationality"
                                name="nationality"
                                label="Nationality"
                                onChange={handleValidation}
                              />
                              <ErrorMessage message={formerror?.nationality} />
                            </div>

                            <div className="w-full md:w-1/2 px-3 mb-6">
                              <Input
                                type="text"
                                value={formValues?.location}
                                placeholder="Enter your location"
                                name="location"
                                label="Location"
                                onChange={handleValidation}
                              />
                              <ErrorMessage message={formerror?.location} />
                            </div>
                              */}
                            <div className="w-full md:w-1/2 px-3 mb-6 relative">
                              <Input
                                type="file"
                                placeholder=""
                                name="resume"
                                label="Upload Resume"
                                onChange={(file) => {
                                  setFormValues({
                                    ...formValues,
                                    resume: file.target.files[0],
                                  }),
                                    setFormerror({
                                      ...formerror,
                                      resume: "",
                                    });
                                }}
                              />
                              <IconUpload className="absolute top-12 right-5" />
                              <ErrorMessage message={formerror?.resume} />
                            </div>
                          </div>
                          <div className="text-center">
                            <button
                              className="rounded-full text-white border-[#74CEF2] border-2 bg-gradient-to-r from-[#08B1F6] to-[#2F4BDF] mx-auto px-20 py-2 hover:to-white hover:from-white hover:text-[#2F4BDF] transition-colors duration-300 ease-in-out"
                              type="submit"
                            >
                              {btnSubmit?.text}
                            </button>
                          </div>
                        </form>
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionContainer>
      </div>
    </>
  );
}
