// actions/authActions.js
import axios from 'axios';

export const registerAdmin = (adminData) => async (dispatch) => {
    try {
        const response = await axios.post('https://backend-nine-tau-59.vercel.app/api/admin/create', adminData);
        dispatch({ type: 'REGISTER_ADMIN_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'REGISTER_ADMIN_FAILURE', payload: error.message });
    }
};


export const loginAdmin = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post('https://backend-nine-tau-59.vercel.app/api/admin/login', { email, password });
        console.log("Login Response:", response.data);

        localStorage.setItem("adminToken", response.data.token); // Store token

        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
                admin: response.data.admin, // Ensure this contains `role: "admin"`
                token: response.data.token,
            },
        });
    } catch (error) {
        console.log("Login Error:", error.response?.data);
        dispatch({
            type: 'LOGIN_FAILURE',
            payload: error.response?.data?.message || 'Login failed',
        });
    }
};

export const logoutAdmin = () => (dispatch) => {
    dispatch({ type: 'LOGOUT' });
};

export const fetchUsers = () => async (dispatch, getState) => {
    try {
      const { token } = getState().adminAuth;
      
      const response = await axios.get('https://backend-nine-tau-59.vercel.app/api/admin/getUser', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      dispatch({
        type: 'FETCH_USERS_SUCCESS',
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_USERS_FAILURE',
        payload: error.response?.data?.message || 'Failed to fetch users'
      });
    }
  };
  
  export const createUser = (userData) => async (dispatch, getState) => {
    try {
      const adminState = getState().adminAuth || {};
      const token = adminState.token || localStorage.getItem('adminToken');
      
      console.log('Creating user with data:', userData);
      console.log('Using token:', token);
  
      const response = await axios.post(
        'https://backend-nine-tau-59.vercel.app/api/admin/createUser',
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          validateStatus: function (status) {
            return status < 500; // Reject only if status is >= 500
          }
        }
      );
  
      console.log('API Response:', response);
  
      if (response.status >= 400) {
        throw new Error(response.data.message || 'Failed to create user');
      }
  
      dispatch({ type: 'CREATE_USER_SUCCESS', payload: response.data });
      return response.data;
    } catch (error) {
      console.error('Full error details:', {
        message: error.message,
        response: error.response?.data,
        stack: error.stack
      });
      
      dispatch({
        type: 'CREATE_USER_FAILURE',
        payload: error.response?.data?.message || error.message || 'Failed to create user'
      });
      throw error;
    }
  };