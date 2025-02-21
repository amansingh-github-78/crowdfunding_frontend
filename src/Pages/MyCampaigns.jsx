import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Messages from "../Components/Communication/messages";
import Comments from "../Components/Communication/comments";
// Removed Carousel import from react-multi-carousel since it's no longer used

// Dummy campaign data for MyCampaigns (simulate logged-in user's campaigns)
const dummyCampaigns = [
  {
    id: 1,
    title: "Support Education for Poor Children",
    category: "Education for Poor Children",
    images: [
      "/trending/campaign1.jpg",
      "/trending/campaign2.jpg"
    ],
    videos: ["https://www.youtube.com/embed/VkBnNxneA_A?si=wYxVLKMxMq8LuALQ",
      "https://www.youtube.com/embed/rVqR9num8Js?si=Xpg-WupRZ0GyDMxd"
    ],
    description:
      "Help provide education resources for underprivileged children.",
    story:
      "Full story for campaign 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    updates: "Latest updates for campaign 1.",
    verification: 80,
    backers: 150,
    totalFunds: "20,000",
    donationDetails: [
      { name: "Alice", amount: "100" },
      { name: "Bob", amount: "50" },
    ],
    engagement: "High",
    comments: ["Great cause!", "I support this!"],
    fundsWithdrawn: false,
  },
  {
    id: 2,
    title: "Donate Books for Literacy",
    category: "Books Donation",
    images: ["/trending/campaign3.jpg", "/trending/campaign4.jpg"],
    videos: [],
    description: "Donate books and educational materials to schools.",
    story:
      "Full story for campaign 2. Duis aute irure dolor in reprehenderit in voluptate.",
    updates: "Latest updates for campaign 2.",
    verification: 65,
    backers: 80,
    totalFunds: "8,000",
    donationDetails: [
      { name: "Charlie", amount: "75" },
      { name: "Dana", amount: "125" },
    ],
    engagement: "Medium",
    comments: ["I love this!", "Keep it up!"],
    fundsWithdrawn: true,
  },
  {
    id: 3,
    title: "NGO for Education Improvement",
    category: "NGO for Education Improvement",
    images: ["/trending/campaign5.jpg", "/trending/campaign6.jpg"],
    videos: ["https://www.youtube.com/embed/-nzRB7TrCUc?si=PRwpP2JCvdijOJVx",
      "https://www.youtube.com/embed/yxR-R4aLmt4?si=sIP3cxqsIjZT2iA6",
      "https://www.youtube.com/embed/CWeURo9iA3g?si=7JlnGZh5ElgSFX0D"
    ],
    description: "Support our NGO to improve educational facilities.",
    story:
      "Full story for campaign 3. Excepteur sint occaecat cupidatat non proident.",
    updates: "Latest updates for campaign 3.",
    verification: 90,
    backers: 120,
    totalFunds: "15,000",
    donationDetails: [
      { name: "Eve", amount: "200" },
      { name: "Frank", amount: "150" },
    ],
    engagement: "High",
    comments: ["Very inspiring!", "I'm donating soon!"],
    fundsWithdrawn: false,
  },
  // Add more dummy campaigns if needed
];

// CampaignCard Component with image carousel (auto-cycles every 5 seconds)
const CampaignCard = ({ campaign, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === campaign.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [campaign.images.length]);

  return (
    <div
      onClick={onClick}
      className="cursor-pointer relative overflow-hidden rounded-lg shadow-lg bg-white"
    >
      <img
        src={campaign.images[currentImageIndex]}
        alt={campaign.title}
        className="w-full h-48 object-cover transition-all duration-500"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900">{campaign.title}</h3>
        <p className="text-gray-700 mt-2">{campaign.description}</p>
      </div>
    </div>
  );
};

const MyCampaigns = () => {
  // For demo purposes, assume all dummyCampaigns belong to the logged-in user
  const myCampaigns = dummyCampaigns;
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = (campaign) => {
    setSelectedCampaign(campaign);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedCampaign(null);
  };

  // Aggregated Dashboard Data
  const totalFundsRaised = myCampaigns.reduce((sum, campaign) => {
    const amount = parseFloat(campaign.totalFunds.replace(/[^0-9.-]+/g, ""));
    return sum + amount;
  }, 0);
  const totalBackers = myCampaigns.reduce(
    (sum, campaign) => sum + campaign.backers,
    0
  );

  return (
    <div className="bg-blue-50 dark:bg-[#e0ba03] min-h-screen py-8 text-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* Campaign Dashboard Section */}
        <section className="mb-12 bg-white dark:bg-blue-900 rounded-lg p-6 shadow-md">
          <h2 className="text-3xl font-bold mb-8 text-white text-center">
            Campaign Dashboard
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-100 rounded-lg text-center">
              <h3 className="text-xl font-semibold">Total Funds Raised</h3>
              <p className="mt-2 text-2xl font-bold">
                ₹ {totalFundsRaised.toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg text-center">
              <h3 className="text-xl font-semibold">Total Backers</h3>
              <p className="mt-2 text-2xl font-bold">{totalBackers}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg text-center">
              <h3 className="text-xl font-semibold">Engagement Score</h3>
              <p className="mt-2 text-2xl font-bold">High</p>
            </div>
          </div>
        </section>

        {/* My Campaigns Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">My Campaigns</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {myCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                onClick={() => openDrawer(campaign)}
                campaign={campaign}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Full-Screen Drawer for Campaign Details with extra user-only info */}
      {isDrawerOpen && selectedCampaign && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-[#e0ba03] text-black overflow-y-auto p-6"
        >
          <div className="flex justify-between mb-4">
            <Link to="/withdraw">
              <button className="mt-6 px-6 py-3 bg-blue-500 rounded-full shadow-lg hover:bg-blue-700 text-white text-2xl">
                Withdraw Funds
              </button>
            </Link>
            <div className="mt-6 hidden lg:block md:block">
              <h2 className="text-4xl font-bold text-black">
                {selectedCampaign.title}
              </h2>
              <p className="mt-2 text-black">{selectedCampaign.description}</p>
            </div>
            <button
              onClick={closeDrawer}
              className="text-white rounded-full mt-6 px-6 py-3 text-2xl font-bold bg-red-500 "
            >
              Close
              {/* &times; */}
            </button>
          </div>
          <div className="mt-6 mb-6 lg:hidden md:hidden block">
            <h2 className="text-2xl font-bold text-black">
              {selectedCampaign.title}
            </h2>
            <p className="mt-2 text-black">{selectedCampaign.description}</p>
          </div>

          {/* Image Carousel in Drawer */}
          <ImageCarousel images={selectedCampaign.images} />

          {/* Videos Section */}
          {selectedCampaign.videos.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Videos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedCampaign.videos.map((video, index) => (
                  <div key={index} className="w-full h-64">
                    <iframe
                      width="100%"
                      height="100%"
                      src={video}
                      title={`video-${index}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-md"
                    ></iframe>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Campaign Details Section */}
          <div className="mt-6">
            <p className="text-2xl mt-2 text-black">{selectedCampaign.story}</p>
          </div>

          {/* Verification & Funds Section */}
          <div className="mt-6">
            {/* Progress Section */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-black">Progress</h3>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{ width: `${selectedCampaign.verification}%` }}
                ></div>
              </div>
              <p className="mt-2 text-black">
                {selectedCampaign.verification}% Goal Achieved
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Total Funds Raised</h3>
              <p>₹ {selectedCampaign.totalFunds}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Funds Withdrawn</h3>
              <p>{selectedCampaign.fundsWithdrawn ? "Yes" : "No"}</p>
            </div>
          </div>

          {/* Donation Details Section */}
          <div className="mt-6 mb-6">
            <h3 className="text-xl font-semibold">Donation Details</h3>
            <div className="space-y-2">
              {selectedCampaign.donationDetails &&
                selectedCampaign.donationDetails.map((donation, index) => (
                  <div
                    key={index}
                    className="flex justify-between p-2 bg-gray-100 rounded"
                  >
                    <span>{donation.name}</span>
                    <span>₹ {donation.amount}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Engagement Analysis Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Engagement Analysis</h3>
            <p className="text-gray-600">{selectedCampaign.engagement}</p>
          </div>

          {/* Comments Section */}
          <div className="mt-6 bg-blue-900 lg:max-w-4xl md:max-w-2xl max-w-full">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white p-4">
              Comments
            </h3>
            <Comments />
          </div>

          {/* Action Buttons Section */}
          <div className="flex justify-start">
            <Messages for="receiver" />
          </div>
        </motion.div>
      )}
    </div>
  );
};

// ImageCarousel Component for the Drawer (auto-cycles every 5 seconds with manual navigation)
const ImageCarousel = ({ images }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full max-h-fit lg:h-screen overflow-hidden rounded-md">
      <img
        src={images[current]}
        alt={`Slide ${current}`}
        className="w-full h-full object-cover transition-all duration-500"
      />
      {/* Navigation Buttons */}
      <button
        onClick={() =>
          setCurrent(current === 0 ? images.length - 1 : current - 1)
        }
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full"
      >
        &#10094;
      </button>
      <button
        onClick={() =>
          setCurrent(current === images.length - 1 ? 0 : current + 1)
        }
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full"
      >
        &#10095;
      </button>
    </div>
  );
};

export default MyCampaigns;
