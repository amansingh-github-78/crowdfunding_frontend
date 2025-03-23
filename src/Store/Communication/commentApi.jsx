import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Function to get the authentication token
const getAuthToken = () => sessionStorage.getItem("token");

// Function to handle API errors and log only the error message
const handleApiError = (error) => {
  console.error(error.response?.data?.message || "An error occurred");
  throw error;
};

// Fetch all comments for a campaign (Public)
export const getComments = async (campaignId) => {
  try {
    return await axios.get(`${API_URL}/comments/${campaignId}`);
  } catch (error) {
    handleApiError(error);
  }
};

// Add a comment to a campaign (Authenticated users only)
export const addComment = async (campaignId, content) => {
  try {
    return await axios.post(
      `${API_URL}/comments/${campaignId}`,
      { content },
      {
        headers: {
          Authorization: getAuthToken(),
        },
      }
    );
  } catch (error) {
    handleApiError(error);
  }
};

// Reply to a comment (Only Campaign Creator can reply)
export const replyToComment = async (campaignId, commentId, reply) => {
  try {
    return await axios.post(
      `${API_URL}/comments/${campaignId}/reply/${commentId}`,
      { reply },
      {
        headers: {
          Authorization: getAuthToken(),
        },
      }
    );
  } catch (error) {
    handleApiError(error);
  }
};
