// actions/authActions.js
import axios from 'axios';

export const registerAdmin = (adminData) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/api/admin/create', adminData);
        dispatch({ type: 'REGISTER_ADMIN_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'REGISTER_ADMIN_FAILURE', payload: error.message });
    }
};
export const loginAdmin = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/api/admin/login', { email, password });
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