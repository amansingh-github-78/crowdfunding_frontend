// StartCampaign.jsx
import { useState } from "react";
import ImageUploader from "../Components/Campaigns/ImageUploader";

// Dummy categories (consistent with ExploreCampaigns)
const categories = [
  "All Campaigns",
  "Education for Poor Children",
  "Books Donation",
  "NGO for Education Improvement",
  "Students asking for help",
  "Scholarships",
  "Education Infrastructure",
];

// Initial dummy campaigns data (a few samples)
const initialDummyCampaigns = [
  {
    id: 1,
    title: "Support Education for Poor Children",
    category: "Education for Poor Children",
    verified: "Yes",
    images: [
      "/assets/campaign1.jpg",
      "/assets/campaign1-2.jpg",
      "/assets/campaign1-3.jpg",
    ],
    description: "Help provide education resources for underprivileged children.",
    story:
      "Full story for campaign 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    updates: "Latest updates for campaign 1.",
    backers: 150,
    comments: ["Great cause!", "I support this!"],
    videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
    verification: 80,
  },
  {
    id: 2,
    title: "Donate Books for Literacy",
    category: "Books Donation",
    verified: "No",
    images: ["/assets/campaign2.jpg", "/assets/campaign2-2.jpg"],
    description: "Donate books and educational materials to schools.",
    story:
      "Full story for campaign 2. Duis aute irure dolor in reprehenderit in voluptate.",
    updates: "Latest updates for campaign 2.",
    backers: 80,
    comments: ["I love this!", "Keep it up!"],
    videos: [],
    verification: 65,
  },
];

const StartCampaign = () => {
  // Manage which tab is active: "create" or "edit"
  const [activeTab, setActiveTab] = useState("create");

  // Form data state (also used for editing)
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    category: "",
    description: "",
    story: "",
    images: [],
    videos: [],
  });

  // State for campaigns (dummy data)
  const [dummyCampaigns, setDummyCampaigns] = useState(initialDummyCampaigns);

  // Track if we are editing an existing campaign
  const [isEditing, setIsEditing] = useState(false);

  // Message to indicate success (campaign created or updated)
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form submission for creating/updating a campaign
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing campaign
      setDummyCampaigns((prevCampaigns) =>
        prevCampaigns.map((campaign) =>
          campaign.id === formData.id ? { ...campaign, ...formData } : campaign
        )
      );
      setSuccessMessage("Campaign updated successfully!");
      setIsEditing(false);
    } else {
      // Create new campaign
      const newCampaign = {
        ...formData,
        id: dummyCampaigns.length + 1,
        verified: "No",
        backers: 0,
        comments: [],
        updates: "",
        verification: 0,
      };
      setDummyCampaigns([...dummyCampaigns, newCampaign]);
      setSuccessMessage("Campaign created successfully! Awaiting admin verification.");
    }
    // Reset form
    setFormData({
      id: null,
      title: "",
      category: "",
      description: "",
      story: "",
      images: [],
      videos: [],
    });
  };

  // Handle input of YouTube embed links (comma separated)
  const handleVideoLinksChange = (e) => {
    const value = e.target.value;
    const videoLinks = value
      .split(",")
      .map((link) => link.trim())
      .filter((link) => link !== "");
    setFormData({ ...formData, videos: videoLinks });
  };

  // When editing a campaign, populate the form with its data and switch to the form tab
  const handleEditCampaign = (campaign) => {
    setActiveTab("create");
    setIsEditing(true);
    setSuccessMessage("");
    setFormData({
      id: campaign.id,
      title: campaign.title,
      category: campaign.category,
      description: campaign.description,
      story: campaign.story,
      images: campaign.images,
      videos: campaign.videos,
    });
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
              activeTab === "create" ? "bg-blue-500 text-white" : "bg-white text-black"
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
              activeTab === "edit" ? "bg-blue-500 text-white" : "bg-white text-black"
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
            {successMessage && (
              <div className="mb-4 p-2 bg-green-200 text-green-800 rounded-md">
                {successMessage}
              </div>
            )}
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

              {/* Image Upload */}
              <ImageUploader/>

              {/* YouTube Embed Links */}
              <div>
                <label className="block mb-1 text-white">
                  YouTube Embed Links (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.videos.join(", ")}
                  onChange={handleVideoLinksChange}
                  placeholder="https://www.youtube.com/embed/xyz, https://www.youtube.com/embed/abc"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              {/* Submit Button */}
              <div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                  {isEditing ? "Update Campaign" : "Create Campaign"}
                </button>
              </div>
              <p className="text-sm text-white">
                Note: After creation, your campaign will be sent for admin verification. (For New Campigns only)
              </p>
            </form>
          </div>
        )}

        {/* Edit Campaign Section */}
        {activeTab === "edit" && (
          <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-white ">Edit Your Campaigns</h2>
            {dummyCampaigns.length === 0 ? (
              <p>No campaigns available.</p>
            ) : (
              <div className="space-y-4 bg-blue-900">
                {dummyCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="border p-4 rounded-md flex justify-between items-center bg-blue-50"
                  >
                    <div>
                      <h3 className="font-bold">{campaign.title}</h3>
                      <p className="text-sm">{campaign.description}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => handleEditCampaign(campaign)}
                        className="px-3 py-1 bg-green-500 text-white rounded-md"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StartCampaign;
