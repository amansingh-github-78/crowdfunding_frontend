import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthToken = () => sessionStorage.getItem("token");

// Submit Contact Form
export const submitContactForm = async (formData) => {
  try {
    console.log(formData)
    const response = await axios.post(`${API_URL}/contact`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthToken(),
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};
