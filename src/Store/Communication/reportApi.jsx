import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthToken = () => sessionStorage.getItem("token");

const handleApiError = (error) => {
  console.error(error.response?.data?.message || "An error occurred");
  throw error;
};

export const createReport = async (reportData) => {
  try {
    return await axios.post(`${API_URL}/report/create`, reportData, {
      headers: {
        Authorization: getAuthToken(),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    handleApiError(error);
  }
};