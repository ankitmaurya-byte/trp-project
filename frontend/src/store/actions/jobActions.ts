// src/redux/actions/jobActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Interfaces
interface JobFilters {
  type?: "full-time" | "part-time" | "contract" | "internship";
  location?: string;
  experience?: "0-2" | "2-5" | "5-10" | "10+";
  locationType?: "remote" | "hybrid" | "on-site";
  salary?: {
    min?: number;
    max?: number;
  };
  department?: string;
  skills?: string[];
  postedWithin?: "24h" | "7d" | "30d" | "90d";
  sortBy?: "newest" | "relevance" | "salary";
}

interface JobPostData {
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  skills: {
    mustHave: string[];
    niceToHave: string[];
    addOn: string[];
  };
  education: {
    mustHave: string;
    niceToHave?: string;
    addOn?: string;
  };
  salary: {
    minimum: number;
    maximum: number;
    rate: string;
  };
  experience: {
    total: number;
    skills: number;
    years: number;
  };
  otherDetails?: {
    areaPreference?: string;
    joiningPeriod?: string;
  };
}

// Axios instance with default config
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Important for sending cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch jobs thunk
export const fetchJobsThunk = createAsyncThunk(
  "jobs/fetchAll",
  async (filters: JobFilters | undefined, { rejectWithValue }) => {
    try {
      // Clean and validate filters
      const cleanedFilters = filters
        ? {
            ...filters,
            skills: filters.skills?.filter(Boolean),
            salary: filters.salary && {
              min: Math.max(0, filters.salary.min || 0),
              max: filters.salary.max || undefined,
            },
          }
        : undefined;

      const { data } = await axiosInstance.get("/jobs/get-my-post", {
        params: cleanedFilters,
      });

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle session expiration
        if (error.response?.status === 401) {
          window.location.href = "/login"; // Redirect to login if session expired
          return rejectWithValue("Session expired. Please login again.");
        }
        return rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch jobs. Please try again later."
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
export const addJobDetails = createAsyncThunk(
  "jobs/addJobDetails",
  async (jobData: JobPostData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/jobs/create-job", jobData);
      console.log("Server response:", response);

      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        return rejectWithValue(
          response.data?.message || "Unexpected response status"
        );
      }
    } catch (error) {
      console.error("Thunk error:", error);
      if (axios.isAxiosError(error)) {
        // Handle Axios errors
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to create job post.";

        if (error.response?.status === 401) {
          window.location.href = "/login";
        }

        return rejectWithValue(errorMessage);
      }
      // Handle other errors
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while creating the job post."
      );
    }
  }
);
// Update job thunk
export const updateJobThunk = createAsyncThunk(
  "jobs/update",
  async (
    { id, jobData }: { id: string; jobData: Partial<JobPostData> },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.put(`/jobs/${id}`, jobData);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          window.location.href = "/login";
          return rejectWithValue("Session expired. Please login again.");
        }
        return rejectWithValue(
          error.response?.data?.message || "Failed to update job post."
        );
      }
      return rejectWithValue(
        "An unexpected error occurred while updating the job post."
      );
    }
  }
);

// Delete job thunk
export const deleteJobThunk = createAsyncThunk(
  "jobs/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/jobs/${id}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          window.location.href = "/login";
          return rejectWithValue("Session expired. Please login again.");
        }
        return rejectWithValue(
          error.response?.data?.message || "Failed to delete job post."
        );
      }
      return rejectWithValue(
        "An unexpected error occurred while deleting the job post."
      );
    }
  }
);
