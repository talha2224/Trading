import axios from "axios";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createAsyncThunk } from "@reduxjs/toolkit";


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://backend-nine-tau-59.vercel.app/api/users/login", credentials);
      
      // If 2FA is required, return the tempToken
      if (response.data.twoFactorRequired) {
        return { 
          twoFactorRequired: true,
          tempToken: response.data.tempToken 
        };
      }
      
      // For normal login, return token and user
      localStorage.setItem('token', response.data.token);
      return { token: response.data.token, user: response.data.user };
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);


  
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post("https://backend-nine-tau-59.vercel.app/api/users/signup", userData);
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

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async ({ email }, { rejectWithValue }) => {
      try {
        const response = await axios.post('https://backend-nine-tau-59.vercel.app/api/users/forgotPassword', {
          email,
        });
        toast.success('Password reset email sent!');
        return response.data;
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error sending password reset email');
        return rejectWithValue(error.response?.data?.message || 'Error sending password reset email');
      }
    }
  );

  export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ token, password }, { rejectWithValue }) => {
      try {
        const response = await axios.post(`https://backend-nine-tau-59.vercel.app/api/users/resetPassword/${token}`, {
          password: password,
        });
        toast.success('Password reset successful!');
        return response.data;
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error resetting password');
        return rejectWithValue(error.response?.data?.message || 'Error resetting password');
      }
    }
  );

  // authactions.js
// authactions.js
export const verifyTwoFactor = createAsyncThunk(
  "auth/verifyTwoFactor",
  async ({ tempToken, twoFactorToken }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://backend-nine-tau-59.vercel.app/api/users/2fa/verify-login', {
        tempToken,
        twoFactorToken
      });

      localStorage.setItem('token', response.data.token);
      return response.data;
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || '2FA verification failed');
    }
  }
);

