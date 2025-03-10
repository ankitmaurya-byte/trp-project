// @ts-nocheck
// src/components/JobDetailsForm.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { toast } from "sonner";
import { RootState } from "../redux/store";
import axios from "axios";
import { resetNewJob } from "../../store/slice/jobSlice";
import { useAppDispatch } from "../../store/store";
import { addJobDetails } from "../../store/actions/jobActions";

// Validation Schema
const JobDetailsSchema = Yup.object().shape({
  description: Yup.string()
    .min(50, "Description must be at least 50 characters")
    .required("Job description is required"),
  skills: Yup.object().shape({
    mustHave: Yup.string().required("Must have skills are required"),
    niceToHave: Yup.string(),
    addOn: Yup.string(),
  }),
  education: Yup.object().shape({
    mustHave: Yup.string().required("Required education is required"),
    niceToHave: Yup.string(),
    addOn: Yup.string(),
  }),
  pay: Yup.object().shape({
    minimum: Yup.number()
      .required("Minimum pay is required")
      .min(0, "Minimum pay must be a positive number"),
    maximum: Yup.number()
      .required("Maximum pay is required")
      .min(Yup.ref("minimum"), "Maximum must be greater than minimum"),
    rate: Yup.string().required("Pay rate is required"),
  }),
  industry: Yup.object().shape({
    totalExperience: Yup.number().required("Total experience is required"),
    skillsExperience: Yup.number().required("Skills experience is required"),
    numberOfYears: Yup.number().required("Number of years is required"),
  }),
  otherDetails: Yup.object().shape({
    areaPreference: Yup.string(),
    joiningPeriod: Yup.string(),
  }),
  certification: Yup.string(),
  isMandatory: Yup.boolean(),
  canRelocate: Yup.boolean().required("Please select relocation preference"),
  contactPreference: Yup.string().required("Please select contact preference"),
});

interface FormValues {
  description: string;
  skills: {
    mustHave: string;
    niceToHave: string;
    addOn: string;
  };
  education: {
    mustHave: string;
    niceToHave: string;
    addOn: string;
  };
  pay: {
    minimum: string;
    maximum: string;
    rate: string;
  };
  industry: {
    totalExperience: string;
    skillsExperience: string;
    numberOfYears: string;
  };
  otherDetails: {
    areaPreference: string;
    joiningPeriod: string;
  };
  certification: string;
  isMandatory: boolean;
  canRelocate: boolean;
  contactPreference: string;
}

const JobDetailsForm: React.FC = () => {
  const navigate = useNavigate();
  const newJobData = useSelector((state: RootState) => state.jobs.newJob.job);
  const dispatch = useAppDispatch();
  const initialValues: FormValues = {
    description: "",
    skills: {
      mustHave: "",
      niceToHave: "",
      addOn: "",
    },
    education: {
      mustHave: "",
      niceToHave: "",
      addOn: "",
    },
    pay: {
      minimum: "",
      maximum: "",
      rate: "Per Month",
    },
    industry: {
      totalExperience: "",
      skillsExperience: "",
      numberOfYears: "4",
    },
    otherDetails: {
      areaPreference: "",
      joiningPeriod: "",
    },
    certification: "",
    isMandatory: false,
    canRelocate: false,
    contactPreference: "email",
  };
  const { mutate: submitJobDetails, isLoading } = useMutation({
    mutationFn: async (formData: FormValues) => {
      try {
        // Using unwrap() to handle the promise resolution/rejection properly
        const result = await dispatch(
          addJobDetails({
            ...newJobData,
            ...formData,
          })
        ).unwrap();

        console.log("Success result:", result);
        return result;
      } catch (error) {
        console.error("Mutation error in unwrap:", error);
        // Re-throw the error so React Query can handle it
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log("onSuccess triggered with data:", data);
      toast.success("Job posted successfully!");
      dispatch(resetNewJob()); // Reset the newJob state
      navigate("/jobs");
    },
    onError: (error: any) => {
      console.error("onError triggered with:", error);
      const errorMessage =
        typeof error === "object" && error !== null
          ? error.message || "Failed to post job details"
          : String(error);
      toast.error(errorMessage);
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={JobDetailsSchema}
      onSubmit={submitJobDetails}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <Form className="max-w-7xl mx-auto p-6">
          <div className="bg-green-100 p-4 rounded-lg mb-6">
            <p className="text-green-700">
              ✓ Job has been successfully created
            </p>
          </div>

          <h1 className="text-xl font-semibold mb-2">Add a new job</h1>
          <p className="text-gray-600 mb-8">
            You are only 1 step away from posting your job
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Job Description */}
            <div>
              <h2 className="font-medium mb-4">Job Description</h2>
              <div className="border rounded-lg">
                <div className="flex gap-2 border-b p-2">
                  <button className="p-1 hover:bg-gray-100 rounded">B</button>
                  <button className="p-1 hover:bg-gray-100 rounded italic">
                    I
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded underline">
                    U
                  </button>
                  <span className="border-r mx-1"></span>
                  {/* Add other editor buttons */}
                </div>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Describe here"
                  className="w-full p-4 min-h-[200px] rounded-b-lg focus:outline-none"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 mt-1 text-sm"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Skills Section */}
              <div>
                <h2 className="font-medium mb-4">Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Must have</label>
                    <Field
                      type="text"
                      name="skills.mustHave"
                      placeholder="Must have"
                      className="w-full p-3 border rounded-lg"
                    />
                    <ErrorMessage
                      name="skills.mustHave"
                      component="div"
                      className="text-red-500 mt-1 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Nice to have</label>
                    <Field
                      type="text"
                      name="skills.niceToHave"
                      placeholder="Nice to have"
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Add on</label>
                    <Field
                      type="text"
                      name="skills.addOn"
                      placeholder="Add on"
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Education Section */}
              <div>
                <h2 className="font-medium mb-4">Education</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Must have</label>
                    <Field
                      type="text"
                      name="education.mustHave"
                      placeholder="Must have"
                      className="w-full p-3 border rounded-lg"
                    />
                    <ErrorMessage
                      name="education.mustHave"
                      component="div"
                      className="text-red-500 mt-1 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Nice to have</label>
                    <Field
                      type="text"
                      name="education.niceToHave"
                      placeholder="Nice to have"
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Add on</label>
                    <Field
                      type="text"
                      name="education.addOn"
                      placeholder="Add on"
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Pay Section */}
              <div>
                <h2 className="font-medium mb-4">Pay</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Minimum</label>
                    <Field
                      type="number"
                      name="pay.minimum"
                      placeholder="Minimum"
                      className="w-full p-3 border rounded-lg"
                    />
                    <ErrorMessage
                      name="pay.minimum"
                      component="div"
                      className="text-red-500 mt-1 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Maximum</label>
                    <Field
                      type="number"
                      name="pay.maximum"
                      placeholder="Maximum"
                      className="w-full p-3 border rounded-lg"
                    />
                    <ErrorMessage
                      name="pay.maximum"
                      component="div"
                      className="text-red-500 mt-1 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Rate</label>
                    <Field
                      as="select"
                      name="pay.rate"
                      className="w-full p-3 border rounded-lg"
                    >
                      <option value="Per Month">Per Month</option>
                      <option value="Per Year">Per Year</option>
                    </Field>
                  </div>
                </div>
              </div>

              {/* Industry Preferences */}
              <div>
                <h2 className="font-medium mb-4">Industry Preferences</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Field
                      type="number"
                      name="industry.totalExperience"
                      placeholder="Total Experience required"
                      className="w-full p-3 border rounded-lg"
                    />
                    <ErrorMessage
                      name="industry.totalExperience"
                      component="div"
                      className="text-red-500 mt-1 text-sm"
                    />
                  </div>
                  <div>
                    <Field
                      type="number"
                      name="industry.skillsExperience"
                      placeholder="Skills Experience required"
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <Field
                      as="select"
                      name="industry.numberOfYears"
                      className="w-full p-3 border rounded-lg"
                    >
                      <option value="4">Eg. 4</option>
                      {/* Add more options */}
                    </Field>
                  </div>
                </div>
              </div>

              {/* Other details */}
              <div>
                <h2 className="font-medium mb-4">Other details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field
                    type="text"
                    name="otherDetails.areaPreference"
                    placeholder="Area Preference"
                    className="w-full p-3 border rounded-lg"
                  />
                  <Field
                    type="text"
                    name="otherDetails.joiningPeriod"
                    placeholder="Joining period preference"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
              </div>

              {/* Certification */}
              <div>
                <h2 className="font-medium mb-4">Certification</h2>
                <div className="space-y-4">
                  <Field
                    type="text"
                    name="certification"
                    placeholder="Certification name"
                    className="w-full p-3 border rounded-lg"
                  />
                  <div className="flex items-center gap-2">
                    <Field
                      type="checkbox"
                      name="isMandatory"
                      className="w-4 h-4"
                    />
                    <label>Mandatory</label>
                  </div>
                </div>
              </div>

              {/* Relocation */}
              <div>
                <p className="mb-4">
                  Those who are ready to relocate can also apply
                </p>
                <div className="flex gap-6 mb-6">
                  <label className="flex items-center gap-2">
                    <Field
                      type="radio"
                      name="canRelocate"
                      value="true"
                      className="w-4 h-4"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Field
                      type="radio"
                      name="canRelocate"
                      value="false"
                      className="w-4 h-4"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {/* Contact Preference */}
              <div>
                <p className="mb-4">Can candidates reach out directly?</p>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <Field
                      type="radio"
                      name="contactPreference"
                      value="whatsapp"
                      className="w-4 h-4"
                    />
                    <span>Whatsapp/ Call</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Field
                      type="radio"
                      name="contactPreference"
                      value="email"
                      className="w-4 h-4"
                    />
                    <span>Email ID</span>
                  </label>
                </div>
                <ErrorMessage
                  name="contactPreference"
                  component="div"
                  className="text-red-500 mt-1 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => navigate("/jobs")}
              className="px-6 py-2 text-blue-600 hover:bg-blue-50 rounded"
            >
              Skip
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 
                ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isLoading ? "Posting..." : "Post Job"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default JobDetailsForm;
