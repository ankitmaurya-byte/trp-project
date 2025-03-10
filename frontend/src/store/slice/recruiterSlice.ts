// @ts-nocheck

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface EmailTemplate {
  template: string;
  folderName: string;
}

interface Notification {
  title: string;
  message: string;
  time: Date;
  status: "read" | "unread";
}

interface SavedSearch {
  search: string;
  data: string;
  time: Date;
}
interface RecruiterState {
  recruiter: {
    linkedinId?: string;
    provider: string;
    providerId: string;
    avatar: string;
    notification: Notification[];
    emailTemplates: EmailTemplate[];
    savedcandidates: string[];
    company: string;
    jobsPosted: string[];
    contactNumber: number;
    savedSearch: SavedSearch[];
  } | null;
  loading: boolean;
  error: string | null;
}

export const updateRecruiterProfile = createAsyncThunk(
  "recruiter/updateProfile",
  async (profileData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        "/api/v1/recruiter/profile",
        profileData
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const saveCandidate = createAsyncThunk(
  "recruiter/saveCandidate",
  async (candidateId: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `/api/v1/recruiter/save-candidate/${candidateId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postJob = createAsyncThunk(
  "recruiter/postJob",
  async (jobData: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/v1/recruiter/post-job", jobData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const recruiterSlice = createSlice({
  name: "recruiter",
  initialState: {
    recruiter: null,
    loading: false,
    error: null,
  } as RecruiterState,
  reducers: {
    setRecruiter: (state, action) => {
      state.recruiter = action.payload;
    },
    clearRecruiter: (state) => {
      state.recruiter = null;
      state.error = null;
    },
    addEmailTemplate: (state, action) => {
      if (state.recruiter) {
        state.recruiter.emailTemplates.push(action.payload);
      }
    },
    markNotificationAsRead: (state, action) => {
      if (state.recruiter) {
        const notification = state.recruiter.notification.find(
          (n) => n.title === action.payload
        );
        if (notification) {
          notification.status = "read";
        }
      }
    },
    removeCandidate: (state, action) => {
      if (state.recruiter) {
        state.recruiter.savedcandidates =
          state.recruiter.savedcandidates.filter((id) => id !== action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateRecruiterProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRecruiterProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.recruiter = action.payload;
      })
      .addCase(updateRecruiterProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(saveCandidate.fulfilled, (state, action) => {
        if (state.recruiter) {
          state.recruiter.savedcandidates.push(action.payload.candidateId);
        }
      })
      .addCase(postJob.fulfilled, (state, action) => {
        if (state.recruiter) {
          state.recruiter.jobsPosted.push(action.payload.jobId);
        }
      });
  },
});

export const {
  setRecruiter,
  clearRecruiter,
  addEmailTemplate,
  markNotificationAsRead,
  removeCandidate,
} = recruiterSlice.actions;

export default recruiterSlice.reducer;
