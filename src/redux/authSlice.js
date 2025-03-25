import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./actions/authactions"; // Ensure the correct import path
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  loading: false,
  token: localStorage.getItem("token") || null, // Initialize token from localStorage
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token"); // Clear token from localStorage on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token; // Set token from the action payload
        state.user = action.payload.user; // Set user from the action payload
        state.error = null;
        localStorage.setItem("token", action.payload.token); // Save token to localStorage
        console.log("Token set in Redux state:", action.payload.token); // Debugging line
        toast.success("Login successful!");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Login failed: ${action.payload}`);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;