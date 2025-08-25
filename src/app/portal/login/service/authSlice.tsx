import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authService";

interface AuthState {
  user: null | { user_name: string; user_email: string };
  loading: boolean;
  error: string | null;
  message: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  message: "",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.error = null;
      state.message = "";
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.message = "Logged out successfully";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.message = "Login successful!";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = "Login failed Email or Password.";
        state.isAuthenticated = false;
        state.user = null;
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Registration successful!";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed.";
      });
  },
});

export const { clearAuthState, logout } = authSlice.actions;
export default authSlice.reducer;