// @ts-nocheck

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Education {
  institution: string;
  degree: string;
  field: string;
  graduationYear: string;
  score: number;
}

interface Experience {
  companyName: string;
  title: string;
  joiningDate: string;
  leavingDate: string;
  locationType: "remote" | "hybrid" | "inoffice";
  jobType: "fulltime" | "internship" | "contract";
  description: string;
}

interface Notification {
  title: string;
  message: string;
  time: Date;
  status: "read" | "unread";
}

interface CandidateState {
  candidate: {
    username: string;
    email?: string;
    contact?: string;
    yearOfExperience?: string;
    noticePeriod?: string;
    currentLocation?: string;
    skills: string[];
    notification: Notification[];
    status:
      | "open_to_hire"
      | "not_open_to_hire"
      | "active"
      | "inactive"
      | "on_vacation";
    resume?: string;
    experience?: Experience[];
    education?: Education[];
    jobsApplied: string[];
  } | null;
  loading: boolean;
  error: string | null;
}

export const updateCandidateProfile = createAsyncThunk(
  "candidate/updateProfile",
  async (profileData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        "/api/v1/candidate/profile",
        profileData
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const applyForJob = createAsyncThunk(
  "candidate/applyJob",
  async (jobId: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/v1/candidate/apply/${jobId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const candidateSlice = createSlice({
  name: "candidate",
  initialState: {
    candidate: null,
    loading: false,
    error: null,
  } as CandidateState,
  reducers: {
    setCandidate: (state, action) => {
      state.candidate = action.payload;
    },
    clearCandidate: (state) => {
      state.candidate = null;
      state.error = null;
    },
    updateSkills: (state, action) => {
      if (state.candidate) {
        state.candidate.skills = action.payload;
      }
    },
    updateExperience: (state, action) => {
      if (state.candidate) {
        state.candidate.experience = action.payload;
      }
    },
    updateEducation: (state, action) => {
      if (state.candidate) {
        state.candidate.education = action.payload;
      }
    },
    markNotificationAsRead: (state, action) => {
      if (state.candidate) {
        const notification = state.candidate.notification.find(
          (n) => n.title === action.payload
        );
        if (notification) {
          notification.status = "read";
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCandidateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCandidateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.candidate = action.payload;
      })
      .addCase(updateCandidateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(applyForJob.fulfilled, (state, action) => {
        if (state.candidate) {
          state.candidate.jobsApplied.push(action.payload.jobId);
        }
      });
  },
});

export const {
  setCandidate,
  clearCandidate,
  updateSkills,
  updateExperience,
  updateEducation,
  markNotificationAsRead,
} = candidateSlice.actions;

export default candidateSlice.reducer;
