import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";
import Messages from "../Components/Communication/messages";
import Comments from "../Components/Communication/comments";

// Updated dummy campaign data with additional properties and 5 extra dummies
const dummyCampaigns = [
  {
    id: 1,
    title: "Support Education for Poor Children",
    category: "Education for Poor Children",
    verified: "Yes",
    images: [
      "/trending/campaign1.jpg",
      "/trending/campaign2.jpg"
    ],
    description:
      "Help provide education resources for underprivileged children.",
    story:
      "Full story for campaign 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    updates: "Latest updates for campaign 1.",
    backers: 150,
    comments: ["Great cause!", "I support this!"],
    videos: ["https://www.youtube.com/embed/VkBnNxneA_A?si=wYxVLKMxMq8LuALQ",
      "https://www.youtube.com/embed/rVqR9num8Js?si=Xpg-WupRZ0GyDMxd"
    ],
    verification: 80, // percentage
  },
  {
    id: 2,
    title: "Donate Books for Literacy",
    category: "Books Donation",
    verified: "No",
    images: ["/trending/campaign3.jpg", "/trending/campaign4.jpg"],
    description: "Donate books and educational materials to schools.",
    story:
      "Full story for campaign 2. Duis aute irure dolor in reprehenderit in voluptate.",
    updates: "Latest updates for campaign 2.",
    backers: 80,
    comments: ["I love this!", "Keep it up!"],
    videos: [],
    verification: 65,
  },
  {
    id: 3,
    title: "NGO for Education Improvement",
    category: "NGO for Education Improvement",
    verified: "Yes",
    images: ["/trending/campaign5.jpg", "/trending/campaign6.jpg"],
    description: "Support our NGO to improve educational facilities.",
    story:
      "Full story for campaign 3. Excepteur sint occaecat cupidatat non proident.",
    updates: "Latest updates for campaign 3.",
    backers: 120,
    comments: ["Very inspiring!", "I'm donating soon!"],
    videos: ["https://www.youtube.com/embed/-nzRB7TrCUc?si=PRwpP2JCvdijOJVx",
      "https://www.youtube.com/embed/yxR-R4aLmt4?si=sIP3cxqsIjZT2iA6",
      "https://www.youtube.com/embed/CWeURo9iA3g?si=7JlnGZh5ElgSFX0D"
    ],
    verification: 90,
  },
  {
    id: 4,
    title: "Students Asking for Help",
    category: "Students asking for help",
    verified: "Yes",
    images: ["/trending/campaign2.jpg", "/trending/campaign5.jpg"],
    description: "Assist students in need of financial help for tuition.",
    story:
      "Full story for campaign 4. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    updates: "Latest updates for campaign 4.",
    backers: 60,
    comments: ["Help them out!", "Wish I could contribute more!"],
    videos: [],
    verification: 70,
  },
  {
    id: 5,
    title: "Scholarships for Underprivileged Students",
    category: "Scholarships",
    verified: "Yes",
    images: ["/trending/campaign1.jpg", "/trending/campaign4.jpg"],
    description: "Provide scholarships to students in need.",
    story:
      "Full story for campaign 5. Aenean commodo ligula eget dolor. Aenean massa.",
    updates: "Latest updates for campaign 5.",
    backers: 95,
    comments: ["Amazing initiative!", "Count me in!"],
    videos: ["https://www.youtube.com/embed/RDeTdXMOXmI?si=HzKL4y3uomv1mPwc"],
    verification: 75,
  },
  {
    id: 6,
    title: "Clean Water for Rural Education Institutions",
    category: "Education Infrastructure",
    verified: "Yes",
    images: ["/trending/campaign3.jpg", "/trending/campaign6.jpg"],
    description: "Help bring clean water to remote Education Institutions.",
    story:
      "Full story for campaign 6. Cum sociis natoque penatibus et magnis dis parturient montes.",
    updates: "Latest updates for campaign 6.",
    backers: 200,
    comments: ["Clean water saves lives!", "Keep up the great work!"],
    videos: [],
    verification: 85,
  },
  {
    id: 7,
    title: "Emergency Maintainance for Natural Disasters",
    category: "Education Infrastructure",
    verified: "No",
    images: ["/trending/campaign6.jpg", "/trending/campaign2.jpg"],
    description:
      "Provide emergency maintainance funds to disaster-stricken education facility.",
    story:
      "Full story for campaign 7. Donec quam felis, ultricies nec, pellentesque eu, pretium quis.",
    updates: "Latest updates for campaign 7.",
    backers: 300,
    comments: ["Urgent and necessary!", "Sending my support!"],
    videos: ["https://www.youtube.com/embed/vDCSZGyRwH8?si=TIZdNgfDzk01o7W5"],
    verification: 95,
  },
  {
    id: 8,
    title: "Library Access for Remote Communities",
    category: "Education Infrastructure",
    verified: "Yes",
    images: ["/trending/campaign4.jpg", "/trending/campaign1.jpg"],
    description: "Improve access to Library in remote communities.",
    story:
      "Full story for campaign 8. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
    updates: "Latest updates for campaign 8.",
    backers: 180,
    comments: ["Health is wealth!", "Proud to support this cause!"],
    videos: [],
    verification: 88,
  },
  {
    id: 9,
    title: "Community Development Initiatives",
    category: "Education Infrastructure",
    verified: "No",
    images: ["/trending/campaign5.jpg", "/trending/campaign3.jpg"],
    description: "Support community-led development projects.",
    story:
      "Full story for campaign 9. Nullam dictum felis eu pede mollis pretium.",
    updates: "Latest updates for campaign 9.",
    backers: 110,
    comments: ["Great initiative!", "Let's build a better future!"],
    videos: ["https://www.youtube.com/embed/h4gX4bwxuNU?si=R8Z-0Fr835I3iJ2_"],
    verification: 80,
  },
];

const categories = [
  "All Campaigns",
  "Education for Poor Children",
  "Books Donation",
  "NGO for Education Improvement",
  "Students asking for help",
  "Scholarships",
  "Education Infrastructure",
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

const ExploreCampaigns = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Campaigns");
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter campaigns based on search term and category
  const filteredCampaigns = dummyCampaigns.filter((campaign) => {
    const matchesSearch = campaign.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Campaigns" ||
      campaign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openDrawer = (campaign) => {
    setSelectedCampaign(campaign);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedCampaign(null);
  };

  return (
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
            {filteredCampaigns
              .filter((c) => c.id <= 3)
              .map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  onClick={() => openDrawer(campaign)}
                  campaign={campaign}
                />
              ))}
          </div>
        </section>

        {/* All Campaigns Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">All Campaigns</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                onClick={() => openDrawer(campaign)}
                campaign={campaign}
              />
            ))}
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
                  <>100% Verified &#9989;</>
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
              <p className="mt-2 text-black">{selectedCampaign.description}</p>
            </div>
            <div className="flex justify-center">
              <Link to="/donate">
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
            {selectedCampaign.videos.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">
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

            {/* Updates Section */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-black">Updates</h3>
              <p className="text-black">{selectedCampaign.updates}</p>
            </div>

            {/* Backers Section */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-black">Backers</h3>
              <p className="text-black">{selectedCampaign.backers}</p>
            </div>

            {/* Comments Section */}
            <div className="mt-6 bg-blue-900 lg:max-w-4xl md:max-w-2xl max-w-full">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white p-4">Comments</h3>
              <Comments />
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap lg:justify-between md:justify-between lg:flex-nowrap md:flex-nowrap">
              <Messages for="sender" />
              <button
                onClick={() => alert("Report functionality coming soon!")}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 h-10 lg:mt-0 md:mt-0 mt-4"
              >
                Report
              </button>
            </div>
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
    <div className="relative w-full h-full overflow-hidden rounded-md">
      <img
        src={images[current]}
        alt={`Slide ${current}`}
        className="w-full h-full lg:h-screen object-cover transition-all duration-500"
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
