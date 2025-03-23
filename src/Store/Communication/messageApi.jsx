import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Function to get the authentication token
const getAuthToken = () => sessionStorage.getItem("token");

// Function to handle API errors and log only the error message
const handleApiError = (error) => {
  console.error(error.response?.data?.message || "An error occurred");
  throw error;
};

// 📩 Send a message (Backer <-> Campaigner)
export const sendMessage = async (campaignId, content, receiverId) => {
  try {
    const response = await axios.post(
      `${API_URL}/messages/${campaignId}`,
      { content, receiverId },
      {
        headers: {
          Authorization: getAuthToken(),
        },
      }
    );

    // Emit message event to socket
    if (window.socket) {
      window.socket.emit("sendMessage", {
        campaignId,
        message: response.data.message,
      });
    }

    return response;
  } catch (error) {
    handleApiError(error);
  }
};

// 📥 Get all messages for a campaign
export const getMessages = async (campaignId) => {
  try {
    return await axios.get(`${API_URL}/messages/${campaignId}`, {
      headers: {
        Authorization: getAuthToken(),
      },
    });
  } catch (error) {
    handleApiError(error);
  }
};

// 🔁 Reply to a message
export const replyToMessage = async (campaignId, messageId, content) => {
  try {
    const response = await axios.post(
      `${API_URL}/messages/${campaignId}/reply/${messageId}`,
      { content },
      {
        headers: {
          Authorization: getAuthToken(),
        },
      }
    );

    // Emit reply event to socket
    if (window.socket) {
      window.socket.emit("sendMessage", {
        campaignId,
        message: response.data.replyMessage,
      });
    }

    return response;
  } catch (error) {
    handleApiError(error);
  }
};
