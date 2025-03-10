// @ts-nocheck
// src/components/JobPostingForm.tsx
import React from "react";
import { Building2, Handshake } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { addNewJob } from "../../store/actions/jobActions";
import { setJobs, setJobSummary } from "../../store/slice/jobSlice";

// Define job types
const JOB_TYPES = [
  "Full Time",
  "Part Time",
  "Fresher",
  "Internship",
  "Temporary",
  "Freelance",
  "Volunteer",
];

// Define locations
const LOCATIONS = [
  { value: "", label: "Select" },
  { value: "New York", label: "New York" },
  { value: "San Francisco", label: "San Francisco" },
  { value: "Chicago", label: "Chicago" },
  { value: "Remote", label: "Remote" },
];

// Define form initial values
interface FormValues {
  hiringFor: "company" | "clients";
  jobTypes: string[];
  positionTitle: string;
  companyName: string;
  location: string;
}

const JobPostingForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initial values for the form
  const initialValues: FormValues = {
    hiringFor: "clients",
    jobTypes: ["Full Time"],
    positionTitle: "",
    companyName: "",
    location: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    hiringFor: Yup.string()
      .oneOf(["company", "clients"], "Invalid selection")
      .required("Please select who you are hiring for"),
    jobTypes: Yup.array()
      .min(1, "Select at least one job type")
      .required("Job type is required"),
    positionTitle: Yup.string()
      .min(3, "Position title must be at least 3 characters")
      .max(100, "Position title must be at most 100 characters")
      .required("Position title is required"),
    companyName: Yup.string()
      .min(2, "Company name must be at least 2 characters")
      .max(100, "Company name must be at most 100 characters")
      .required("Company name is required"),
    location: Yup.string().required("Location is required"),
  });

  // Handle form submission
  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      // Dispatch the action to add a new job using Redux Toolkit
      console.log(values);

      dispatch(setJobSummary(values));

      // Show success toast
      toast.success("Job details submitted successfully!");

      // Navigate to the next step
      navigate("/job-post-details");
    } catch (error) {
      // Show error toast
      toast.error("Failed to submit job details. Please try again.");
      console.error("Error submitting job:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle job type selection
  const toggleJobType = (
    type: string,
    values: FormValues,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const currentTypes = [...values.jobTypes];
    if (currentTypes.includes(type)) {
      // Don't allow removing the last job type
      if (currentTypes.length === 1) {
        toast.error("At least one job type is required");
        return;
      }
      setFieldValue(
        "jobTypes",
        currentTypes.filter((t) => t !== type)
      );
    } else {
      setFieldValue("jobTypes", [...currentTypes, type]);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, isSubmitting, setFieldValue }) => (
        <Form className="max-w-7xl mx-auto p-6">
          <h1 className="flex items-center gap-2 text-xl font-semibold mb-8">
            <span className="text-blue-600">Add a new job</span>
          </h1>

          <div className="space-y-8">
            {/* Hiring for section */}
            <div>
              <h2 className="text-lg font-medium mb-4">
                Whom are you hiring for
              </h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div
                  onClick={() => setFieldValue("hiringFor", "company")}
                  className={`flex-1 max-w-xs p-6 rounded-lg cursor-pointer border-2 ${
                    values.hiringFor === "company"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 bg-gray-50"
                  } ${
                    errors.hiringFor && touched.hiringFor
                      ? "border-red-500"
                      : ""
                  }`}
                >
                  <div className="flex justify-center mb-4">
                    <Building2 className="w-8 h-8 text-gray-600" />
                  </div>
                  <label className="flex items-center justify-center gap-2 cursor-pointer">
                    <Field
                      type="radio"
                      name="hiringFor"
                      value="company"
                      className="w-4 h-4"
                    />
                    <span>For my own company</span>
                  </label>
                </div>

                <div
                  onClick={() => setFieldValue("hiringFor", "clients")}
                  className={`flex-1 max-w-xs p-6 rounded-lg cursor-pointer border-2 ${
                    values.hiringFor === "clients"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 bg-gray-50"
                  } ${
                    errors.hiringFor && touched.hiringFor
                      ? "border-red-500"
                      : ""
                  }`}
                >
                  <div className="flex justify-center mb-4">
                    <Handshake className="w-8 h-8 text-gray-600" />
                  </div>
                  <label className="flex items-center justify-center gap-2 cursor-pointer">
                    <Field
                      type="radio"
                      name="hiringFor"
                      value="clients"
                      className="w-4 h-4"
                    />
                    <span>For my clients</span>
                  </label>
                </div>
              </div>
              <ErrorMessage
                name="hiringFor"
                component="div"
                className="text-red-500 mt-1 text-sm"
              />
            </div>

            {/* Job details section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="positionTitle"
                  className="block text-gray-700 mb-2"
                >
                  Position Title
                </label>
                <Field
                  type="text"
                  id="positionTitle"
                  name="positionTitle"
                  placeholder="Position Title"
                  className={`w-full p-3 rounded-lg border ${
                    errors.positionTitle && touched.positionTitle
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:border-blue-500`}
                />
                <ErrorMessage
                  name="positionTitle"
                  component="div"
                  className="text-red-500 mt-1 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="companyName"
                  className="block text-gray-700 mb-2"
                >
                  Company Name
                </label>
                <Field
                  type="text"
                  id="companyName"
                  name="companyName"
                  placeholder="Company Name"
                  className={`w-full p-3 rounded-lg border ${
                    errors.companyName && touched.companyName
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:border-blue-500`}
                />
                <ErrorMessage
                  name="companyName"
                  component="div"
                  className="text-red-500 mt-1 text-sm"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-gray-700 mb-2">
                  Job Location (City)
                </label>
                <Field
                  as="select"
                  id="location"
                  name="location"
                  className={`w-full p-3 rounded-lg border ${
                    errors.location && touched.location
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:border-blue-500`}
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc.value} value={loc.value}>
                      {loc.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500 mt-1 text-sm"
                />
              </div>
            </div>

            {/* Job types section */}
            <div>
              <label className="block text-gray-700 mb-4">Job type</label>
              <div className="flex flex-wrap gap-3">
                {JOB_TYPES.map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => toggleJobType(type, values, setFieldValue)}
                    className={`px-4 py-2 rounded-lg border ${
                      values.jobTypes.includes(type)
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-300 text-gray-700 hover:border-blue-600"
                    }`}
                  >
                    {values.jobTypes.includes(type) ? "✓" : "+"} {type}
                  </button>
                ))}
              </div>
              {errors.jobTypes && touched.jobTypes && (
                <div className="text-red-500 mt-1 text-sm">
                  {errors.jobTypes}
                </div>
              )}
            </div>

            {/* Form actions */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="px-6 py-2 rounded-lg text-blue-600"
                onClick={() => {
                  // Reset form fields
                  setFieldValue("positionTitle", "");
                  setFieldValue("companyName", "");
                  setFieldValue("location", "");
                  setFieldValue("jobTypes", ["Full Time"]);
                  setFieldValue("hiringFor", "clients");
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-lg bg-blue-600 text-white ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default JobPostingForm;
