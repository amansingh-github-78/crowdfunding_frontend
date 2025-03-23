import { useState, useEffect, use } from "react";
import { ApiContext } from "../Store/apiContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";
// import Messages from "../Components/Communication/messages";
import Comments from "../Components/Communication/comments";
import Report from "../Components/Communication/report";
import Alert from "../Utils/alert";

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

const ExploreCampaigns = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Campaigns");
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const { campaignApi } = use(ApiContext);

  const [getCampaignByIdAlertError, setCampaignByIdAlertError] =
    useState(false);

  // Fetch campaigns using useQuery (not useMutation)
  // eslint-disable-next-line no-unused-vars
  const { data, error, isLoading } = useQuery({
    queryKey: ["campaigns"],
    queryFn: campaignApi.getCampaigns,
    select: (data) => data?.data?.campaigns || [],
  });

  // Fetch a single campaign by ID
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

  const campaigns = data || [];

  // Filter campaigns based on search term and category
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Campaigns" ||
      campaign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredCampaigns = [...filteredCampaigns]
    .sort((a, b) => {
      const engagementOrder = { high: 3, medium: 2, low: 1 };
      const engagementA = engagementOrder[a.engagementAnalysis] || 0;
      const engagementB = engagementOrder[b.engagementAnalysis] || 0;
      if (engagementA !== engagementB) return engagementB - engagementA;
      if (a.raisedFunds !== b.raisedFunds) return b.raisedFunds - a.raisedFunds;
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    .slice(0, 6);

  const openDrawer = (campaignId) => {
    getCampaignByIdMutation.mutate(campaignId);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedCampaign(null);
  };

  return (
    <>
      {getCampaignByIdAlertError && (
        <Alert
          message="Coudn't get campaign data!!"
          type="red"
          key={Date.now()}
        />
      )}
      <div className="bg-blue-50 dark:bg-[#e0ba03] text-black min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Hero / Call-to-Action Section */}
          <section className="mb-12 text-center">
            <h1 className="text-4xl font-bold">Make a Difference Today</h1>
            <p className="mt-4 text-lg font-semibold">
              Explore campaigns and Fund them to empower communities and change
              lives.
            </p>
          </section>

          {/* Search and Filter Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Category Filters */}
              <div className="relative w-full md:w-1/2 flex justify-start">
                {/* Filter Button */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-md bg-[#e0ba03] text-black w-full md:w-auto"
                >
                  <FaFilter />
                  <span className="text-sm md:text-base">Filter</span>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute left-0 mt-12 w-48 bg-gray-100 rounded-md shadow-lg z-50 transform md:-translate-x-1/4">
                    {categories.map((cat, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsDropdownOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm md:text-base ${
                          selectedCategory === cat
                            ? "bg-[#e0ba03] text-black"
                            : "bg-gray-100 text-gray-800"
                        } hover:bg-[#e0ba03] hover:text-black`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Featured Campaigns Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Campaigns</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCampaigns.map(
                (campaign) =>
                  campaign.verified == "Yes" && (
                    <CampaignCard
                      key={campaign._id}
                      onClick={() => openDrawer(campaign._id)}
                      campaign={campaign}
                    />
                  )
              )}
            </div>
          </section>

          {/* All Campaigns Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">All Campaigns</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredCampaigns.map(
                (campaign) =>
                  campaign.verified == "Yes" && (
                    <CampaignCard
                      key={campaign._id}
                      onClick={() => openDrawer(campaign._id)}
                      campaign={campaign}
                    />
                  )
              )}
            </div>
          </section>
        </div>

        {/* Full-Screen Drawer for Campaign Details */}
        {isDrawerOpen && selectedCampaign && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-[#e0ba03] text-black overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between mb-4">
                <button className="mt-6 px-6 py-3 bg-gray-100 text-black rounded-full shadow-lg font-bold">
                  {selectedCampaign.verified === "Yes" ? (
                    <>Verified &#9989;</>
                  ) : (
                    <>Not Verified &#10060;</>
                  )}
                </button>
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
              <div className="mt-6 lg:hidden md:hidden block">
                <h2 className="text-2xl font-bold text-black">
                  {selectedCampaign.title}
                </h2>
                <p className="mt-2 text-black">
                  {selectedCampaign.description}
                </p>
              </div>
              <div className="flex justify-center">
                <Link to={`/donate/${selectedCampaign._id}`}>
                  <button className="md:ml-12 ml-0 mt-8 mb-8 px-8 py-6 bg-green-400 text-black rounded-full shadow-lg hover:bg-green-500 font-bold md:text-4xl text-2xl hover:after:content-['🥹'] cursor-pointer">
                    Donate Now
                  </button>
                </Link>
              </div>

              {/* Image Carousel in Drawer */}
              <ImageCarousel images={selectedCampaign.images} />

              {/* Details Section */}
              <div className="mt-6">
                <p className="text-2xl mt-2 text-black">
                  {selectedCampaign.story}
                </p>
              </div>

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

              {/* Progress Section */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-black">Progress</h3>
                <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                  <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        (
                          (selectedCampaign.raisedFunds /
                            selectedCampaign.goal) *
                          100
                        ).toFixed(2)
                      )}%`,
                    }}
                  ></div>
                </div>
                <p className="mt-2 text-black">
                  {Math.min(
                    100,
                    (
                      (selectedCampaign.raisedFunds / selectedCampaign.goal) *
                      100
                    ).toFixed(2)
                  )}
                  % Goal Achieved
                </p>
              </div>

              {/* Updates Section */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-black">Updates</h3>
                <p className="text-black">
                  {selectedCampaign.updates.length > 0
                    ? selectedCampaign.updates
                    : "No Updates Yet"}
                </p>
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
                <Comments campaignId={selectedCampaign._id} />
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap lg:justify-between md:justify-between lg:flex-nowrap md:flex-nowrap">
                {/* <Messages chatFor="sender" campaignId={selectedCampaign._id}/> */}
                <button
                  onClick={() => setIsReportOpen(true)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 h-10 lg:mt-0 md:mt-0 mt-4"
                >
                  Report
                </button>
                <Report
                  isOpen={isReportOpen}
                  onClose={() => setIsReportOpen(false)}
                  campaignId={selectedCampaign._id}
                />
              </div>
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
    <div className="relative w-full h-full overflow-hidden rounded-md">
      <img
        src={images[current]}
        alt={`Slide ${current}`}
        className="w-full h-full lg:h-screen object-fill transition-all duration-500"
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

export default ExploreCampaigns;
