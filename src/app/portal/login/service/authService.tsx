import { BASE_URL } from "@/app/common/url/url";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./authSlice";

export const loginUser = createAsyncThunk<
  any,
  { user_email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, payload);

    if (response.data?.access_token) {
      localStorage.setItem("token", response.data.access_token);
    }

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.error || error.message || "Login failed"
    );
  }
});


export const registerUser = createAsyncThunk<
  any,
  {
    user_name: string;
    user_email: string;
    password: string;
  },
  { rejectValue: string }
>("auth/registerUser", async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || error.message || "Registration failed"
    );
  }
});
export const logoutUser = () => (dispatch: any) => {
  dispatch(logout());
};