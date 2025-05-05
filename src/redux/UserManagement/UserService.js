import axios from 'axios';

const API_URL = 'https://backend-nine-tau-59.vercel.app/api/admin';

// Helper function to get admin token
const getAdminToken = () => {
  return localStorage.getItem('adminToken');
};

// API configuration
const apiConfig = () => ({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAdminToken()}`
  }
});

// Get all users with filtering and pagination
export const getAllUsers = async (page = 1, limit = 10, search = '', role = '') => {
  try {
    const response = await axios.get(
      `${API_URL}/getAllUser?page=${page}&limit=${limit}&search=${search}&role=${role}`, 
      apiConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Get user by ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/user/${id}`, apiConfig());
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Create new user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/createuser`, userData, apiConfig());
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Update user role and permissions
export const updateUserRole = async (id, roleData) => {
  try {
    const response = await axios.put(`${API_URL}/user/${id}/role`, roleData, apiConfig());
    return response.data;
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};

// Delete user
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/user/${id}`, apiConfig());
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};