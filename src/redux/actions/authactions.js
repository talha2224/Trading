import axios from "axios";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createAsyncThunk } from "@reduxjs/toolkit";


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message);
      }
      return { token: data.token, user: data.user };
    } catch (error) {
      return rejectWithValue("Login failed");
    }
  }
);

  
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post("http://localhost:5000/api/users/signup", userData);
        toast.success("Registration successful!");
        return response.data; // Return the response data (token and user)
      } catch (error) {
        toast.error(error.response?.data?.message || "Registration failed!");
        return rejectWithValue(error.response?.data?.message || "Registration failed!");
      }
    }
  );
export const logoutUser = () => (dispatch) => {
  dispatch(logout());
  toast.info("Logged out successfully!");
};
