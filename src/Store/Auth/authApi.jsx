import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Function to get tokens from sessionStorage
const getAuthToken = () => sessionStorage.getItem("token");
const getTempToken = () => sessionStorage.getItem("tempToken");

// Function to handle API errors and log only the error message
const handleApiError = (error) => {
  console.error(error.response?.data?.message || "An error occurred");
  throw error; // Rethrow to allow handling by React Query or caller
};

// Register User (Initiate OTP Process)
export const registerUser = async (userData) => {
  try {
    return await axios.post(`${API_URL}/auth/register`, userData);
  } catch (error) {
    handleApiError(error);
  }
};

// Verify OTP and Create User
export const verifyOtp = async (otp) => {
  try {
    return await axios.post(`${API_URL}/auth/verifyOtp`, otp, {
      headers: {
        verifyToken: getTempToken(),
      },
    });
  } catch (error) {
    handleApiError(error);
  }
};

// Login User
export const loginUser = async (loginData) => {
  try {
    return await axios.post(`${API_URL}/auth/login`, loginData);
  } catch (error) {
    handleApiError(error);
  }
};

// Get User Data (Protected)
export const getUser = async () => {
  try {
    return await axios.get(`${API_URL}/auth/user`, {
      headers: {
        Authorization: getAuthToken(),
      },
    });
  } catch (error) {
    handleApiError(error);
  }
};

// Update User Profile
export const updateUserProfile = async (userData) => {
  try {
    return await axios.put(`${API_URL}/auth/profile`, userData, {
      headers: {
        Authorization: getAuthToken(),
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    handleApiError(error);
  }
};

// Forgot Password (Send Reset Link)
export const forgotPassword = async (formData) => {
  try {
    return await axios.post(`${API_URL}/auth/forgotPassword`, formData);
  } catch (error) {
    handleApiError(error);
  }
};

// Reset Password
export const resetPassword = async (formData) => {
  try {
    return await axios.post(`${API_URL}/auth/resetPassword`, formData, {
      headers: {
        Authorization: formData.params,
      },
    });
  } catch (error) {
    handleApiError(error);
  }
};
