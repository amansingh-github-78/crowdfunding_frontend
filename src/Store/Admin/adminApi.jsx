import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Function to get auth token from sessionStorage
const getAuthToken = () => sessionStorage.getItem("token");

// Function to handle API errors and log only the error message
const handleApiError = (error) => {
  console.error(error.response?.data?.message || "An error occurred");
  throw error; // Rethrow for handling by React Query or caller
};

// Get all users (Admin Only)
export const getAllUsers = async () => {
  try {
    return await axios.get(`${API_URL}/admin/users`, {
      headers: { Authorization: getAuthToken() },
    });
  } catch (error) {
    handleApiError(error);
  }
};

// Update user status (Admin Only)
export const updateUserStatus = async (userId, status) => {
  try {
    return await axios.put(
      `${API_URL}/admin/users/${userId}/status`,
      { status },
      { headers: { Authorization: getAuthToken() } }
    );
  } catch (error) {
    handleApiError(error);
  }
};

// Get all campaigns (Admin Only)
export const getAllCampaigns = async () => {
  try {
    return await axios.get(`${API_URL}/admin/campaigns`, {
      headers: { Authorization: getAuthToken() },
    });
  } catch (error) {
    handleApiError(error);
  }
};

// Verify campaign (Admin Only)
export const verifyCampaign = async (campaignId, verified , verificationDenyReason ) => {
  try {
    return await axios.put(
      `${API_URL}/admin/campaigns/${campaignId}/verify`,
      { verified, verificationDenyReason },
      { headers: { Authorization: getAuthToken() } }
    );
  } catch (error) {
    handleApiError(error);
  }
};

// Delete campaign (Admin Only)
export const deleteCampaign = async (campaignId, reason) => {
  try {
    return await axios.delete(`${API_URL}/admin/campaigns/${campaignId}`, {
      headers: { Authorization: getAuthToken() },
      data: { reason },
    });
  } catch (error) {
    handleApiError(error);
  }
};

// Get all reports (Admin Only)
export const getAllReports = async () => {
  try {
    return await axios.get(`${API_URL}/admin/reports`, {
      headers: { Authorization: getAuthToken() },
    });
  } catch (error) {
    handleApiError(error);
  }
};

// Resolve report (Admin Only)
export const resolveReport = async (reportId) => {
  try {
    return await axios.put(
      `${API_URL}/admin/reports/${reportId}/resolve`,
      {},
      { headers: { Authorization: getAuthToken() } }
    );
  } catch (error) {
    handleApiError(error);
  }
};

// Delete report (Admin Only)
export const deleteReport = async (reportId) => {
  try {
    return await axios.delete(`${API_URL}/admin/reports/${reportId}`, {
      headers: { Authorization: getAuthToken() },
    });
  } catch (error) {
    handleApiError(error);
  }
};
