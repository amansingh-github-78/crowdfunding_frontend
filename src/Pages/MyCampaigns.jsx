import { useState, useEffect, use } from "react";
import { ApiContext } from "../Store/apiContext";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
// import Messages from "../Components/Communication/messages";
import Comments from "../Components/Communication/comments";
import Alert from "../Utils/alert";

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
        className="w-full h-48 object-fill transition-all duration-500"
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
  const [myCampaigns, setMyCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const { campaignApi } = use(ApiContext);
  const navigate = useNavigate();

  const [getCampaignByIdAlertError, setCampaignByIdAlertError] =
    useState(false);

  const getCampaignMutation = useMutation({
    mutationFn: campaignApi.getUserCampaigns,
    onSuccess: (data) => {
      setMyCampaigns(data.data.campaigns);
    },
    onError: (err) => {
      setError(
        err.response?.data?.message || "Something Went Wrong. Try Again!!"
      );
      navigate(`/authentication`);
    },
  });

  const getCampaignByIdMutation = useMutation({
    mutationFn: (campaignId) => campaignApi.getCampaignById(campaignId),
    onSuccess: (data) => {
      setSelectedCampaign(data.data.campaign);
    },
    onError: () => {
      setCampaignByIdAlertError(true);
      setTimeout(() => setCampaignByIdAlertError(false), 3000);
    },
  });

  useEffect(() => {
    getCampaignMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only on mount

  const openDrawer = (campaign) => {
    getCampaignByIdMutation.mutate(campaign);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedCampaign(null);
  };

  // Aggregated Dashboard Data
  const totalFundsRaised = myCampaigns.reduce((sum, campaign) => {
    const amount = parseFloat(campaign.raisedFunds);
    return sum + amount;
  }, 0);
  const totalBackers = myCampaigns.reduce(
    (sum, campaign) => sum + campaign.backers,
    0
  );

  const analyzeEngagement = (campaigns) => {
    const engagementCounts = {
      high: 0,
      medium: 0,
      low: 0,
    };

    // Count the occurrences of each engagement level
    campaigns.forEach((campaign) => {
      if (campaign.engagementAnalysis === "high") engagementCounts.high++;
      else if (campaign.engagementAnalysis === "medium")
        engagementCounts.medium++;
      else if (campaign.engagementAnalysis === "low") engagementCounts.low++;
    });

    // Determine overall engagement level based on cases
    if (
      engagementCounts.high >
      engagementCounts.medium + engagementCounts.low
    ) {
      return "High";
    } else if (
      engagementCounts.high ===
      engagementCounts.medium + engagementCounts.low
    ) {
      return "Medium-High";
    } else if (
      engagementCounts.medium >
      engagementCounts.high + engagementCounts.low
    ) {
      return "Medium";
    } else if (
      engagementCounts.medium ===
      engagementCounts.high + engagementCounts.low
    ) {
      return "Medium-Low";
    } else if (
      engagementCounts.low >
      engagementCounts.high + engagementCounts.medium
    ) {
      return "Low";
    } else {
      return "Mixed";
    }
  };

  const overallEngagement = analyzeEngagement(myCampaigns);

  return (
    <>
      {getCampaignByIdAlertError && (
        <Alert
          message="Coudn't get campaign data!!"
          type="red"
          key={Date.now()}
        />
      )}
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
                <p className="mt-2 text-2xl font-bold">{overallEngagement}</p>
              </div>
            </div>
          </section>

          {/* My Campaigns Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">My Campaigns</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {myCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign._id}
                  onClick={() => openDrawer(campaign._id)}
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
                <p className="mt-2 text-black">
                  {selectedCampaign.description}
                </p>
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

            <div className="bg-white text-black text-lg font-semibold mt-2 mb-4 p-4 text-center">
              <h2 className="font-bold text-2xl mb-2">
                Verification Status:{"  "}
              </h2>
              {selectedCampaign.verified === "No" && (
                <button className="ml-4 px-6 py-3 bg-gray-100 text-black rounded-full shadow-lg font-bold">
                  Pending...
                </button>
              )}
              {selectedCampaign.verified === "Denied" && (
                <p>
                  Your Campaign was denied verification due to below reason by
                  admin:{" "}
                  <strong className="block mt-2">
                    {selectedCampaign.verificationDenyReason}
                  </strong>
                </p>
              )}
              {selectedCampaign.verified === "Yes" && (
                <button className="ml-4 px-6 py-3 bg-gray-100 text-black rounded-full shadow-lg font-bold">
                  Verified &#9989;
                </button>
              )}
            </div>

            {/* Image Carousel in Drawer */}
            <ImageCarousel images={selectedCampaign.images} />

            {/* Videos Section */}
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Videos</h3>
              {selectedCampaign.videos.length > 0 ? (
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
              ) : (
                <div className="text-black">No Videos Available</div>
              )}
            </div>

            {/* Campaign Details Section */}
            <div className="mt-6">
              <p className="text-2xl mt-2 text-black">
                {selectedCampaign.story}
              </p>
            </div>

            {/* Verification & Funds Section */}
            <div className="mt-6">
              {/* Progress Section */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-black">Progress</h3>
                <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                  <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{
                      width: `${
                        (selectedCampaign.raisedFunds / selectedCampaign.goal) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <p className="mt-2 text-black">
                  {(selectedCampaign.raisedFunds / selectedCampaign.goal) * 100}
                  % Goal Achieved
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Total Funds Raised</h3>
                <p>₹ {selectedCampaign.raisedFunds}</p>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Funds Withdrawn</h3>
                <p>₹ {selectedCampaign.fundsWithdrawn}</p>
              </div>
            </div>

            {/* Backers Section */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-black">Backers</h3>
              <p className="text-black">{selectedCampaign.backers}</p>
            </div>

            {/* Donation Details Section */}
            <div className="mt-6 mb-6">
              <h3 className="text-xl font-semibold">Donation Details</h3>
              <div className="space-y-2">
                {selectedCampaign.donationDetails.length > 0 ? (
                  selectedCampaign.donationDetails.map((donation) => (
                    <div
                      key={donation._id}
                      className="flex justify-between p-2 bg-gray-100 rounded"
                    >
                      <span>{donation.name}</span>
                      <span>₹ {donation.amount}</span>
                    </div>
                  ))
                ) : (
                  <span>No Donation Yet</span>
                )}
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-6 bg-blue-900 lg:max-w-4xl md:max-w-2xl max-w-full">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white p-4">
                Comments
              </h3>
              <Comments campaignId={selectedCampaign._id} isMyCampaign />
            </div>

            {/* Action Buttons Section */}
            <div className="flex justify-start">
              {/* <Messages chatFor="receiver" campaignId={selectedCampaign._id}/> */}
            </div>
          </motion.div>
        )}
      </div>
    </>
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
        className="w-full h-full object-fill transition-all duration-500"
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
