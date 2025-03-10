// src/redux/slices/jobSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addJobDetails,
  deleteJobThunk,
  fetchJobsThunk,
} from "../actions/jobActions";

// TypeScript interfaces
interface ISalary {
  min?: number;
  max?: number;
}

// Hiring entity type
export type HiringForType = "company" | "clients";

// Job types
export type JobType =
  | "fulltime"
  | "parttime"
  | "internship"
  | "contract"
  | "freelance"
  | "temporary"
  | "volunteer";

// Location type
export type LocationType = "hybrid" | "inoffice" | "remote";

// Job summary interface (basic job details)
export interface JobSummary {
  company: string;
  location: string;
  type: JobType;
  hiringFor: HiringForType;
}

// Complete job interface
export interface IJob extends JobSummary {
  id: string;
  title: string;
  description?: string;
  requiredCandidate?: number;
  skills?: string[];
  experience: number;
  totalApplications: number;
  postDate: Date;
  locationType: LocationType;
  salary: ISalary;
  recruiter: string;
  hiredCandidates: string[];
  status: "open" | "closed";
}

export interface JobFilters {
  type?: JobType;
  location?: string;
  experience?: "0-2" | "2-5" | "5-10" | "10+";
  locationType?: LocationType;
  hiringFor?: HiringForType;
  salary?: {
    min?: number;
    max?: number;
  };
  department?: string;
  skills?: string[];
  postedWithin?: "24h" | "7d" | "30d" | "90d";
  sortBy?: "newest" | "relevance" | "salary";
}

interface NewJobState {
  loading: boolean;
  success: boolean;
  error: string | null;
  job: Partial<IJob> | null;
  hiringFor: HiringForType;
}

interface JobState {
  jobs: IJob[];
  filters: JobFilters;
  loading: boolean;
  error: string | null;
  newJob: NewJobState;
}

// Initial state
const initialState: JobState = {
  jobs: [],
  filters: {},
  loading: false,
  error: null,
  newJob: {
    loading: false,
    success: false,
    error: null,
    job: null,
    hiringFor: "company", // Default to company
  },
};

// Update job thunk (already present)
export const updateJob = createAsyncThunk(
  "jobs/update",
  async (
    { id, jobData }: { id: string; jobData: Partial<IJob> },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.put(`/api/jobs/${id}`, jobData);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Job slice
const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobSummary: (state, action: PayloadAction<Partial<JobSummary>>) => {
      state.newJob.job = {
        ...state.newJob.job,
        ...action.payload,
      };
    },
    setFilters: (state, action: PayloadAction<JobFilters>) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    closeJob: (state, action: PayloadAction<string>) => {
      const job = state.jobs.find((j) => j.id === action.payload);
      if (job) {
        job.status = "closed";
      }
    },
    resetNewJob: (state) => {
      state.newJob = {
        loading: false,
        success: false,
        error: null,
        job: null,
        hiringFor: state.newJob.hiringFor, // Preserve current hiring entity
      };
    },
    setHiringFor: (state, action: PayloadAction<HiringForType>) => {
      state.newJob.hiringFor = action.payload;
    },
    setJobPosting: (state, action: PayloadAction<Partial<IJob>>) => {
      if (state.newJob.job) {
        state.newJob.job = {
          ...state.newJob.job,
          ...action.payload,
        };
      } else {
        state.newJob.job = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch jobs cases
      .addCase(fetchJobsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add job details cases
      .addCase(addJobDetails.pending, (state) => {
        state.newJob.loading = true;
        state.newJob.error = null;
        state.newJob.success = false;
      })
      .addCase(addJobDetails.fulfilled, (state, action) => {
        state.newJob.loading = false;
        state.newJob.success = true;
        state.newJob.job = action.payload;
        console.log(action.payload);
        state.jobs.push(action.payload); // Add new job to the list
      })
      .addCase(addJobDetails.rejected, (state, action) => {
        state.newJob.loading = false;
        state.newJob.error = action.payload as string;
        state.newJob.success = false;
      })
      // Update job cases (already present, keeping for consistency)
      .addCase(updateJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.jobs.findIndex(
          (job) => job.id === action.payload.id
        );
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete job cases
      .addCase(deleteJobThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteJobThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = state.jobs.filter((job) => job.id !== action.meta.arg); // Remove deleted job
      })
      .addCase(deleteJobThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const {
  setJobSummary,
  setFilters,
  clearFilters,
  closeJob,
  resetNewJob,
  setHiringFor,
  setJobPosting,
} = jobSlice.actions;

export default jobSlice.reducer;
