import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Function to get auth token from sessionStorage
const getAuthToken = () => sessionStorage.getItem("token");

// Function to handle API errors and log only the error message
const handleApiError = (error) => {
  console.error(error.response?.data?.message || "An error occurred");
  throw error;
};

// Create a new campaign (Authenticated + Image Upload)
export const createCampaign = async (campaignData) => {
  try {
    console.log(campaignData);

    // Convert to FormData
    const formData = new FormData();
    formData.append("title", campaignData.title);
    formData.append("category", campaignData.category);
    formData.append("description", campaignData.description);
    formData.append("story", campaignData.story);
    formData.append("goal", campaignData.goal);

    // Append Images (Assuming Multiple Images)
    campaignData.images.forEach((image) => {
      formData.append(`images`, image); // 'images' should match backend field
    });

    // Append Videos (as URLs)
    campaignData.videos.forEach((video, index) => {
      formData.append(`videos[${index}]`, video);
    });

    // Append Updates (if any)
    campaignData.updates.forEach((update, index) => {
      formData.append(`updates[${index}]`, update);
    });

    console.log("Sending FormData:", formData);

    return await axios.post(`${API_URL}/campaigns`, formData, {
      headers: {
        Authorization: getAuthToken(),
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    handleApiError(error);
  }
};

// Update an existing campaign (Authenticated + Image Upload if needed)
export const updateCampaign = async (campaignId, campaignData) => {
    try {
      // Create a new FormData object
      const formData = new FormData();
  
      // Loop over campaignData keys and append them to FormData
      Object.keys(campaignData).forEach((key) => {
        if (key === "images") {
          // Ensure that only file objects are sent in the "images" attribute.
          // Here we assume campaignData.images is an array of File objects.
          if (Array.isArray(campaignData.images)) {
            campaignData.images.forEach((file) => {
              formData.append("images", file);
            });
          }
        } else {
          formData.append(key, campaignData[key]);
        }
      });
  
      // Send the FormData with axios using multipart/form-data
      return await axios.put(`${API_URL}/campaigns/${campaignId}`, formData, {
        headers: {
          Authorization: getAuthToken(),
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      handleApiError(error);
    }
  };
  

// Get all campaigns (Public)
export const getCampaigns = async () => {
  try {
    return await axios.get(`${API_URL}/campaigns`);
  } catch (error) {
    handleApiError(error);
  }
};

// Get a single campaign by ID (Public)
export const getCampaignById = async (campaignId) => {
  try {
    return await axios.get(`${API_URL}/campaigns/${campaignId}`);
  } catch (error) {
    handleApiError(error);
  }
};

// Get campaigns created by the logged-in user (Authenticated)
export const getUserCampaigns = async () => {
  try {
    return await axios.get(`${API_URL}/campaigns/user/mycampaigns`, {
      headers: {
        Authorization: getAuthToken(),
      },
    });
  } catch (error) {
    handleApiError(error);
  }
};

// Delete a campaign (Authenticated)
export const deleteCampaign = async (campaignId) => {
  try {
    return await axios.delete(`${API_URL}/campaigns/${campaignId}`, {
      headers: {
        Authorization: getAuthToken(),
      },
    });
  } catch (error) {
    handleApiError(error);
  }
};
