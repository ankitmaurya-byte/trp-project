// @ts-nocheck

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Message {
  candimessagedBy: "candidate" | "recruiter";
  date: Date;
  time: string;
  location: string;
  status: "sent" | "viewed" | "delivered";
}

interface IApplication {
  id: string;
  job: string;
  candidate: string;
  readytorelocate: boolean;
  resume?: string;
  coverletter?: string;
  messages: Message[];
  status: "applied" | "shortlisted" | "rejected" | "hired" | "viewed";
  notes?: string;
}

interface ApplicationState {
  applications: IApplication[];
  currentApplication: IApplication | null;
  loading: boolean;
  error: string | null;
}

export const fetchApplications = createAsyncThunk(
  "applications/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/applications");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const submitApplication = createAsyncThunk(
  "applications/submit",
  async (applicationData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/v1/applications",
        applicationData
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateApplicationStatus = createAsyncThunk(
  "applications/updateStatus",
  async (
    { id, status }: { id: string; status: IApplication["status"] },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.patch(`/api/v1/applications/${id}/status`, {
        status,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "applications/sendMessage",
  async (
    { id, message }: { id: string; message: Partial<Message> },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `/api/v1/applications/${id}/messages`,
        message
      );
      return { id, message: data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const applicationSlice = createSlice({
  name: "applications",
  initialState: {
    applications: [],
    currentApplication: null,
    loading: false,
    error: null,
  } as ApplicationState,
  reducers: {
    setCurrentApplication: (state, action) => {
      state.currentApplication = action.payload;
    },
    clearCurrentApplication: (state) => {
      state.currentApplication = null;
    },
    updateNotes: (state, action) => {
      const { id, notes } = action.payload;
      const application = state.applications.find((app) => app.id === id);
      if (application) {
        application.notes = notes;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(submitApplication.fulfilled, (state, action) => {
        state.applications.push(action.payload);
      })
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        const application = state.applications.find(
          (app) => app.id === action.payload.id
        );
        if (application) {
          application.status = action.payload.status;
        }
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const application = state.applications.find(
          (app) => app.id === action.payload.id
        );
        if (application) {
          application.messages.push(action.payload.message);
        }
      });
  },
});

export const { setCurrentApplication, clearCurrentApplication, updateNotes } =
  applicationSlice.actions;
export default applicationSlice.reducer;
