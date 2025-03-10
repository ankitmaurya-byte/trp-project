// @ts-nocheck

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "recruiter" | "candidate";
  contact: string;
  image: string;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
import {
  clearUserAction,
  verifyUserSession,
  registerUserThunk,
  setUserAction,
  updateUserImageAction,
  updateUserProfileThunk,
} from "../actions/userActions";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  } as UserState,
  reducers: {
    setUser: setUserAction,
    clearUser: clearUserAction,
    updateUserImage: updateUserImageAction,
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Profile
      .addCase(updateUserProfileThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyUserSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyUserSession.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          id: action.payload.id,
          name: action.payload.username,
          email: action.payload.email,
          role: action.payload.role,
          contact: action.payload.contactNumber,
          image: action.payload.image,
        };
      })
      .addCase(verifyUserSession.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateUserProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// export const { setUser, clearUser, updateUserImage } = userSlice.actions;
export default userSlice.reducer;

// Usage:
// dispatch(registerUser(formData));
// dispatch(updateUserProfile(formData));
