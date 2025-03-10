import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthToken = () => sessionStorage.getItem("token");

// ✅ Unified Payment Processing Function (Handles Initiation & Completion)
export const processPayment = async ({ campaignId, data }) => {
  try {
    console.log("Processing payment with data:", data, "Campaign ID:", campaignId);

    const response = await axios.post(
      `${API_URL}/payment/process`,
      { campaignId, ...data }, // Spread `data` separately for correct backend handling
      {
        headers: {
          Authorization: getAuthToken(),
        },
      }
    );

    return response.data; // Returns { loading, success, paymentData }
  } catch (error) {
    throw error.response?.data?.message || "Payment processing failed";
  }
};

export const successPayment = async ({ campaignId, txnid, amount, donorEmail, donorName }) => {
  try {
    const response = await axios.post(`${API_URL}/payment/success`, {campaignId, txnid, amount, donorEmail, donorName});

    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Payment processing failed";
  }
};

export const getPaymentStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/payment/paymentStatus`, {
      headers: {
        Authorization: getAuthToken(),
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Withdrawal initiation failed";
  }
};


export const initiateWithdrawal = async (withdrawalData) => {
  try {
    const response = await axios.post(`${API_URL}/payment/withdraw`, withdrawalData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Withdrawal initiation failed";
  }
};
