// @ts-nocheck

import { createAsyncThunk } from "@reduxjs/toolkit";
import { User, UserState } from "../slice/userSlice";
import axios from "axios";

export const setUserAction = (
  state: UserState,
  action: { payload: User | null }
) => {
  state.user = action.payload;
};

export const clearUserAction = (state: UserState) => {
  state.user = null;
  state.error = null;
};

export const updateUserImageAction = (
  state: UserState,
  action: { payload: string }
) => {
  if (state.user) {
    state.user.image = action.payload;
  }
};
export const verifyUserSession = createAsyncThunk(
  "user/verify",
  async (_, { rejectWithValue }) => {
    try {
      // console.log(import.meta.env.VITE_API_URL);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/check-session`,
        {},
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log(data);

      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
export const registerUserThunk = createAsyncThunk(
  "user/register",
  async (userData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/v1/users/register", userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserProfileThunk = createAsyncThunk(
  "user/updateProfile",
  async (userData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put("/api/v1/users/profile", userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
