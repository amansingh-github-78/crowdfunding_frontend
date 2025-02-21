import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Comments from "../Components/Communication/comments";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Dummy Stats (each rendered separately)
  const stats = {
    activeCampaigns: 45,
    totalUsers: 1200,
    totalRevenue: "5,00,000",
  };

  // Dummy Campaigns Data with additional details for the admin view
  const campaigns = [
    {
      id: 1,
      title: "Support Education for Poor Children",
      category: "Education for Poor Children",
      verified: "Yes",
      status: "Pending Verification",
      images: [
        "/assets/campaign1.jpg",
        "/assets/campaign1-2.jpg",
        "/assets/campaign1-3.jpg",
      ],
      description:
        "Help provide education resources for underprivileged children.",
      story:
        "Full story for campaign 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      updates: "Latest updates for campaign 1.",
      backers: 150,
      comments: ["Great cause!", "I support this!"],
      videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
      verification: 80, // percentage
    },
    {
      id: 2,
      title: "Donate Books for Literacy",
      category: "Books Donation",
      verified: "No",
      status: "Awaiting Admin Approval",
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

  // Dummy Users Data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "User",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Campaigner",
      status: "Banned",
    },
  ]);

  // Dummy Reported Content
  const [reports, setReports] = useState([
    {
      id: 1,
      type: "Campaign",
      reason: "Misleading Information",
      status: "Pending Review",
      details: "Full report details for campaign issue.",
    },
    {
      id: 2,
      type: "User",
      reason: "Spam Activity",
      status: "Reviewed",
      details: "Full report details for spam activity.",
    },
  ]);

  // Search states for campaigns, users, and reports
  const [campaignSearch, setCampaignSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [reportSearch, setReportSearch] = useState("");

  // State for selected campaign to view (campaign drawer)
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [campaignDrawerOpen, setCampaignDrawerOpen] = useState(false);

  // State for selected report (for modal)
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  // -- Campaign Actions from Admin Drawer --

  const handleCampaignApprove = (campaignId) => {
    // Approve campaign: update status and mark as verified (100% Verified)
    setSelectedCampaign((prev) =>
      prev.id === campaignId
        ? { ...prev, status: "Approved", verified: "Yes" }
        : prev
    );
    setCampaignDrawerOpen(false);
  };
  
  const handleCampaignReject = (campaignId) => {
    // Reject campaign: update status to indicate rejection
    setSelectedCampaign((prev) =>
      prev.id === campaignId
        ? { ...prev, status: "Rejected", verified: "No" }
        : prev
    );
    setCampaignDrawerOpen(false);
  };
  
  const handleCampaignDelete = () => {
    // Delete campaign: prompt for reason and then remove the campaign
    const reason = prompt(
      "Enter reason for deleting the campaign (this will be sent to the campaigner):"
    );
    if (reason) {
      // Instead of filtering an object, simply clear the selected campaign.
      setSelectedCampaign(null);
      setCampaignDrawerOpen(false);
      alert("Campaign deleted. Reason: " + reason);
    }
  };
  

  // -- User Actions --

  const handleUserTemporaryBlock = (userId) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, status: "Temporarily Blocked" } : u
      )
    );
  };

  const handleUserPermanentBan = (userId) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, status: "Permanently Banned" } : u
      )
    );
  };

  const handleUserSendWarning = (userId) => {
    alert("Warning sent to user ID: " + userId);
  };

  // -- Report Actions --

  const openReportModal = (report) => {
    setSelectedReport(report);
    setReportModalOpen(true);
  };

  const handleReportResolve = () => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === selectedReport.id ? { ...r, status: "Resolved" } : r
      )
    );
    setReportModalOpen(false);
    setSelectedReport(null);
  };

  // -- Filtered Data --

  const filteredCampaigns = campaigns.filter((c) =>
    c.title.toLowerCase().includes(campaignSearch.toLowerCase())
  );
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(userSearch.toLowerCase())
  );
  const filteredReports = reports.filter(
    (r) =>
      r.type.toLowerCase().includes(reportSearch.toLowerCase()) ||
      r.reason.toLowerCase().includes(reportSearch.toLowerCase())
  );

  return (
    <div className="bg-blue-50 dark:bg-[#e0ba03] text-black min-h-full p-6">
      <div className="max-w-6xl mx-auto bg-blue-900 text-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6">
          Admin Panel
        </h1>

        {/* Tabs */}
        <div className="flex mb-6 flex-col md:flex-row gap-2">
          {["dashboard", "campaigns", "users", "reports"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md ${
                activeTab === tab
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-200 text-black rounded-md shadow-md">
              <h2 className="text-xl font-semibold">
                Active Campaigns
              </h2>
              <p className="text-2xl font-bold text-blue-500">
                {stats.activeCampaigns}
              </p>
            </div>
            <div className="p-6 bg-gray-200 text-black rounded-md shadow-md">
              <h2 className="text-xl font-semibold">
                Total Users
              </h2>
              <p className="text-2xl font-bold text-blue-500">
                {stats.totalUsers}
              </p>
            </div>
            <div className="p-6 bg-gray-200 text-black rounded-md shadow-md">
              <h2 className="text-xl font-semibold">
                Total Revenue
              </h2>
              <p className="text-2xl font-bold text-blue-500">
                ₹ {stats.totalRevenue}
              </p>
            </div>
          </div>
        )}

        {/* Manage Campaigns */}
        {activeTab === "campaigns" && (
          <>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search campaigns..."
                value={campaignSearch}
                onChange={(e) => setCampaignSearch(e.target.value)}
                className="w-full px-4 py-2 border rounded-md text-black"
              />
            </div>
            {filteredCampaigns.length === 0 ? (
              <p className="text-gray-100">
                No campaigns to review.
              </p>
            ) : (
              filteredCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="p-4 border rounded-md bg-gray-200 text-black flex justify-between items-center mb-2"
                >
                  <div>
                    <p className="text-lg font-semibold">
                      {campaign.title}
                    </p>
                    <p className="text-sm">
                      Status: {campaign.status}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setSelectedCampaign(campaign);
                        setCampaignDrawerOpen(true);
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))
            )}

            {/* Full-Screen Drawer for Campaign Details */}
            {campaignDrawerOpen && selectedCampaign && (
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
                      onClick={() => {
                        setCampaignDrawerOpen(false);
                        setSelectedCampaign(null);
                      }}
                      className="text-white rounded-full mt-6 px-6 py-3 text-2xl font-bold bg-red-500"
                    >
                      Close
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
                  <div className="bg-gray-200 text-black rounded-lg p-6 text-center m-4">
                    <p className="mb-4 text-4xl">
                      Status: {"  "}
                      <strong>{selectedCampaign.status}</strong>
                    </p>
                    {/* Admin Action Buttons */}
                    <div className="flex space-x-4 justify-center">
                      <button
                        onClick={() =>
                          handleCampaignApprove(selectedCampaign.id)
                        }
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleCampaignReject(selectedCampaign.id)
                        }
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() =>
                          handleCampaignDelete(selectedCampaign.id)
                        }
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Image Carousel */}
                  <ImageCarousel images={selectedCampaign.images} />

                  {/* Campaign Details */}
                  <div className="mt-6">
                    <p className="text-2xl mt-2 text-black">
                      {selectedCampaign.story}
                    </p>
                  </div>

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

                  {/* Progress Section */}
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold text-black">
                      Progress
                    </h3>
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
                    <h3 className="text-xl font-semibold text-black">
                      Updates
                    </h3>
                    <p className="text-black">{selectedCampaign.updates}</p>
                  </div>

                  {/* Backers Section */}
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold text-black">
                      Backers
                    </h3>
                    <p className="text-black">{selectedCampaign.backers}</p>
                  </div>

                  {/* Comments Section */}
                  <div className="mt-6 bg-blue-900 lg:max-w-4xl md:max-w-2xl max-w-full">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white p-4">
                      Comments
                    </h3>
                    <Comments />
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* Manage Users */}
        {activeTab === "users" && (
          <div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search users..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full px-4 py-2 border rounded-md text-black"
              />
            </div>
            {filteredUsers.length === 0 ? (
              <p className="text-gray-100">
                No users found.
              </p>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="p-4 border rounded-md bg-gray-200 text-black flex justify-between items-center mb-2"
                >
                  <div>
                    <p className="text-lg font-semibold">
                      {user.name}
                    </p>
                    <p className="text-sm">
                      {user.email}
                    </p>
                    <p className="text-sm">
                      Role: {user.role}
                    </p>
                    <p className="text-sm">
                      Status: {user.status}
                    </p>
                  </div>
                  <div className="gap-2 flex flex-col md:flex-row">
                    <button
                      onClick={() => handleUserTemporaryBlock(user.id)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    >
                      Temp Block
                    </button>
                    <button
                      onClick={() => handleUserPermanentBan(user.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Ban
                    </button>
                    <button
                      onClick={() => handleUserSendWarning(user.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Warn
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Reported Content */}
        {activeTab === "reports" && (
          <div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search reports..."
                value={reportSearch}
                onChange={(e) => setReportSearch(e.target.value)}
                className="w-full px-4 py-2 border rounded-md text-black"
              />
            </div>
            {filteredReports.length === 0 ? (
              <p className="text-gray-100">
                No reports available.
              </p>
            ) : (
              filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 border rounded-md bg-gray-200 text-black flex justify-between items-center mb-2"
                >
                  <div>
                    <p className="text-lg font-semibold">
                      {report.type} Report
                    </p>
                    <p className="text-sm">
                      Reason: {report.reason}
                    </p>
                    <p className="text-sm">
                      Status: {report.status}
                    </p>
                  </div>
                  <div className="gap-2 flex flex-col md:flex-row">
                    <button
                      onClick={() => openReportModal(report)}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Resolve
                    </button>
                    <button
                      onClick={() =>
                        setReports((prev) =>
                          prev.filter((r) => r.id !== report.id)
                        )
                      }
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Report Detail Modal */}
      {reportModalOpen && selectedReport && (
        <div className="fixed inset-0 bg-blue-50 dark:bg-[#e0ba03] text-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-blue-900 text-white rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 relative">
            <h2 className="text-2xl font-bold mb-4">
              Report Details
            </h2>
            <p className="mb-4">
              <strong>Type:</strong> {selectedReport.type}
            </p>
            <p className="mb-4">
              <strong>Reason:</strong> {selectedReport.reason}
            </p>
            <p className="mb-4">
              <strong>Details:</strong> {selectedReport.details}
            </p>
            <div className="flex justify-between">
              <button
                onClick={handleReportResolve}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Mark as Resolved
              </button>
              <button
                onClick={() => {
                  setReportModalOpen(false);
                  setSelectedReport(null);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
            <button
              onClick={() => {
                setReportModalOpen(false);
                setSelectedReport(null);
              }}
              className="absolute top-2 right-2 rounded-full p-2 bg-red-500 "
            >
              Close
            </button>
          </div>
        </div>
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
    <div className="relative w-full h-64 overflow-hidden rounded-md">
      <img
        src={images[current]}
        alt={`Slide ${current}`}
        className="w-full h-64 object-cover transition-all duration-500"
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

export default Admin;
