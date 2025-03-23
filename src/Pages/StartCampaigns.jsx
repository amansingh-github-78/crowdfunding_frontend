// StartCampaign.jsx
import { useState, useEffect, use } from "react";
import { ApiContext } from "../Store/apiContext";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../Utils/confirmDialog";

// Dummy categories (consistent with ExploreCampaigns)
const categories = [
  "All Campaigns",
  "Education for Poor Children",
  "Books Donation",
  "NGO for Education Improvement",
  "Students asking for help",
  "Scholarships",
  "Education Infrastructure",
  "others",
];

const StartCampaign = () => {
  // Manage which tab is active: "create" or "edit"
  const [activeTab, setActiveTab] = useState("create");
  const [error, setError] = useState("");
  const { campaignApi } = use(ApiContext);
  const [Campaigns, setCampaigns] = useState(null);
  const [images, setImages] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form data state (also used for editing)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    story: "",
    goal: "",
    images: [],
    videos: [],
    updates: [],
  });

  const getCampaignMutation = useMutation({
    mutationFn: campaignApi.getUserCampaigns,
    onSuccess: (data) => {
      setCampaigns(data.data.campaigns);
    },
    onError: (err) => {
      setError(
        err.response?.data?.message || "Something Went Wrong. Try Again!!"
      );
    },
  });

  const createCampaignMutation = useMutation({
    mutationFn: campaignApi.createCampaign,
    onSuccess: () => {
      getCampaignMutation.mutate();
      setLoading(false);
      setSuccessMessage(
        "Campaign created successfully! Awaiting admin verification."
      );
      setTimeout(() => setSuccessMessage(""), 3000);
      setFormData({
        title: "",
        category: "",
        description: "",
        story: "",
        goal: "",
        images: [],
        videos: [],
        updates: [],
      });
    },
    onError: (err) => {
      setError(
        err.response?.data?.message || "Campaign Creation failed. Try Again!!"
      );
      setTimeout(() => setError(""), 3000);
      setLoading(false);
    },
  });

  const editCampaignMutation = useMutation({
    mutationFn: ({ campaignId, campaignData }) =>
      campaignApi.updateCampaign(campaignId, campaignData),
    onSuccess: () => {
      getCampaignMutation.mutate();
      setLoading(false);
      setIsEditing(false);
      setSuccessMessage("Campaign updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      setFormData({
        title: "",
        category: "",
        description: "",
        story: "",
        goal: "",
        images: [],
        videos: [],
        updates: [],
      });
    },
    onError: (err) => {
      setError(
        err.response?.data?.message || "Campaign Updation failed. Try Again!!"
      );
      setTimeout(() => setError(""), 3000);
      setLoading(false);
    },
  });

  const deleteCampaignMutation = useMutation({
    mutationFn: campaignApi.deleteCampaign,
    onSuccess: () => {
      getCampaignMutation.mutate();
    },
    onError: (err) => {
      setError(
        err.response?.data?.message || "Campaign Deletion failed. Try Again!!"
      );
      setTimeout(() => setError(""), 3000);
    },
  });

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate(`/authentication`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only on mount

  useEffect(() => {
    getCampaignMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only on mount

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    if (isEditing) {
      editCampaignMutation.mutate({
        campaignId: formData.id,
        campaignData: formData,
      });
    } else {
      createCampaignMutation.mutate(formData);
    }
  
    setLoading(true);
    
    // Clear form and images preview after submission
    setFormData({
      title: "",
      category: "",
      description: "",
      story: "",
      goal: "",
      images: [],
      videos: [],
      updates: [],
    });
  
    setImages([]); // Clear image preview
  };
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (isEditing) {
      // Clear previous images when editing and uploading new ones
      setImages([...files]);
      setFormData((prevData) => ({
        ...prevData,
        images: [...files],
      }));
    } else {
      setImages((prevImages) => [...prevImages, ...files]);
      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...files],
      }));
    }
  };
  
  const handleEditCampaign = (campaign) => {
    setActiveTab("create");
    setIsEditing(true);
    setSuccessMessage("");
    setFormData({
      id: campaign._id,
      title: campaign.title || "",
      category: campaign.category || "",
      description: campaign.description || "",
      story: campaign.story || "",
      goal: campaign.goal || "",
      images: [], // Don't show existing images in preview
      videos: Array.isArray(campaign.videos) ? campaign.videos.filter((v) => v) : [],
      updates: Array.isArray(campaign.updates) ? campaign.updates.filter((u) => u) : [],
    });
  
    setImages([]); // Ensure image preview starts empty
  };
  
  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  const handleDeleteClick = (campaignId) => {
    setSelectedCampaignId(campaignId);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedCampaignId) {
      deleteCampaignMutation.mutate(selectedCampaignId);
    }
    setShowConfirm(false);
    setSelectedCampaignId(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setSelectedCampaignId(null);
  };

  const handleVideoChange = (index, value) => {
    setFormData((prevData) => {
      const newVideos = [...prevData.videos];
      newVideos[index] = value;
      return { ...prevData, videos: newVideos.filter((v) => v) };
    });
  };

  const addVideoInput = () => {
    setFormData((prevData) => ({
      ...prevData,
      videos: [...prevData.videos, ""],
    }));
  };

  const removeVideoInput = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      videos: prevData.videos.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateChange = (index, value) => {
    setFormData((prevData) => {
      const newUpdates = [...prevData.updates];
      newUpdates[index] = value;
      return { ...prevData, updates: newUpdates.filter((u) => u) };
    });
  };

  const addUpdateInput = () => {
    setFormData((prevData) => ({
      ...prevData,
      updates: [...prevData.updates, ""],
    }));
  };

  const removeUpdateInput = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      updates: prevData.updates.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="bg-blue-50 dark:bg-[#e0ba03] min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => {
              setActiveTab("create");
              setSuccessMessage("");
            }}
            className={`px-4 py-2 rounded-md ${
              activeTab === "create"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            Start a Campaign
          </button>
          <button
            onClick={() => {
              setActiveTab("edit");
              setSuccessMessage("");
            }}
            className={`px-4 py-2 rounded-md ${
              activeTab === "edit"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            Edit Campaign
          </button>
        </div>

        {/* Start / Create Campaign Form */}
        {activeTab === "create" && (
          <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-white">
              {isEditing ? "Edit Campaign" : "Start a Campaign"}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block mb-1 text-white">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>
              {/* Category */}
              <div>
                <label className="block mb-1 text-white">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                  className="w-full p-2 border rounded-md"
                >
                  <option value="text-white">Select Category</option>
                  {categories
                    .filter((cat) => cat !== "All Campaigns")
                    .map((cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              </div>
              {/* Description */}
              <div>
                <label className="block mb-1 text-white">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  className="w-full p-2 border rounded-md"
                ></textarea>
              </div>
              {/* Story */}
              <div>
                <label className="block mb-1 text-white">Story</label>
                <textarea
                  value={formData.story}
                  onChange={(e) =>
                    setFormData({ ...formData, story: e.target.value })
                  }
                  required
                  className="w-full p-2 border rounded-md"
                ></textarea>
              </div>
              <div>
                <label className="block mb-1 text-white">Goal</label>
                <input
                  type="number"
                  value={formData.goal}
                  onChange={(e) =>
                    setFormData({ ...formData, goal: e.target.value })
                  }
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block mb-1 text-white">
                  Upload Images <i>(Less than 1 MB Per Image and Maximum 10 Images)</i>
                </label>
                {isEditing && (
                  <p className="text-white text-lg">
                    <strong>Note: </strong>Upload All Images Again!!
                  </p>
                )}
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="w-full mt-2 text-white"
                />

                {/* Image Preview Section */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {images.map((image, index) => {
                    const imageUrl =
                      image instanceof File
                        ? URL.createObjectURL(image)
                        : image; // Handle File and URL
                    return (
                      <div key={index} className="relative w-24 h-24">
                        <img
                          src={imageUrl}
                          alt={`uploaded-${index}`}
                          className="w-full h-full object-cover rounded-lg border border-gray-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* YouTube Embed Links */}
              <div>
                <label className="block mb-1 text-white">
                  YouTube Embed Links
                </label>
                {formData.videos.map((video, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={video}
                      onChange={(e) => handleVideoChange(index, e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeVideoInput(index)}
                      className="text-xl bg-red-500 text-white border-1 m-1 p-1"
                    >
                      x
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addVideoInput}
                  className="text-xl bg-gray-300 text-black border-1 m-1 p-1"
                >
                  Add +
                </button>
              </div>

              {/* Updates String Array */}
              {isEditing && (
                <div>
                  <label className="block mb-1 text-white">Updates</label>
                  {formData.updates.map((update, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={update}
                        onChange={(e) =>
                          handleUpdateChange(index, e.target.value)
                        }
                        className="w-full p-2 border rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeUpdateInput(index)}
                        className="text-xl bg-red-500 text-white border-1 m-1 p-1"
                      >
                        x
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addUpdateInput}
                    className="text-xl bg-gray-300 text-black border-1 m-1 p-1"
                  >
                    Add +
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  disabled={loading}
                >
                  {isEditing
                    ? loading
                      ? "Updating..."
                      : "Update Campaign"
                    : loading
                    ? "Creating......"
                    : "Create Campaign"}
                </button>
              </div>
              <p className="text-sm text-white">
                Note: After campaign creation or updation, your campaign will be sent for admin
                verification.
              </p>
            </form>
            {successMessage && (
              <div className="mb-4 mt-4 p-2 bg-green-200 text-green-800 rounded-md">
                {successMessage}
              </div>
            )}
            {error && (
              <div className="mb-4 mt-4 p-2 bg-red-400 text-white rounded-md">
                {error}
              </div>
            )}
          </div>
        )}

        {/* Edit Campaign Section */}
        {activeTab === "edit" && (
          <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Edit Your Campaigns
            </h2>
            {Campaigns?.length === 0 || Campaigns == null ? (
              <p className="text-white">No campaigns available.</p>
            ) : (
              <div className="space-y-4 bg-blue-900">
                {Campaigns.map((campaign) => (
                  <div
                    key={campaign._id}
                    className="border p-4 rounded-md flex justify-between items-center bg-blue-50"
                  >
                    <div>
                      <h3 className="font-bold">{campaign.title}</h3>
                      <p className="text-sm">{campaign.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCampaign(campaign)}
                        className="px-3 py-1 bg-green-500 text-white rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(campaign._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Confirmation Dialog Component */}
      <ConfirmDialog
        isOpen={showConfirm}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Are you sure?"
        message="Do you really want to delete this campaign? This action cannot be undone."
      />
    </div>
  );
};

export default StartCampaign;
