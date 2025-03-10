// @ts-nocheck

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Notification {
  title: string;
  message: string;
  time: Date;
  status: "read" | "unread";
}

interface AdminState {
  admin: {
    username: string;
    email?: string;
    googleId?: string;
    githubId?: string;
    linkedinId?: string;
    notification: Notification[];
    permissions: string[];
  } | null;
  loading: boolean;
  error: string | null;
}

export const updateAdminProfile = createAsyncThunk(
  "admin/updateProfile",
  async (profileData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put("/api/v1/admin/profile", profileData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePermissions = createAsyncThunk(
  "admin/updatePermissions",
  async (
    { userId, permissions }: { userId: string; permissions: string[] },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.put(`/api/v1/admin/permissions/${userId}`, {
        permissions,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: null,
    loading: false,
    error: null,
  } as AdminState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    clearAdmin: (state) => {
      state.admin = null;
      state.error = null;
    },
    markNotificationAsRead: (state, action) => {
      if (state.admin) {
        const notification = state.admin.notification.find(
          (n) => n.title === action.payload
        );
        if (notification) {
          notification.status = "read";
        }
      }
    },
    addPermission: (state, action) => {
      if (state.admin && !state.admin.permissions.includes(action.payload)) {
        state.admin.permissions.push(action.payload);
      }
    },
    removePermission: (state, action) => {
      if (state.admin) {
        state.admin.permissions = state.admin.permissions.filter(
          (p) => p !== action.payload
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAdminProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(updateAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updatePermissions.fulfilled, (state, action) => {
        if (state.admin) {
          state.admin.permissions = action.payload.permissions;
        }
      });
  },
});

export const {
  setAdmin,
  clearAdmin,
  markNotificationAsRead,
  addPermission,
  removePermission,
} = adminSlice.actions;

export default adminSlice.reducer;
