import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { ApiContext } from "../Store/apiContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Comments from "../Components/Communication/comments";
import Alert from "../Utils/alert";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { adminApi, campaignApi } = use(ApiContext);
  const [campaignSearch, setCampaignSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [reportSearch, setReportSearch] = useState("");
  const [showReasonBox, setShowReasonBox] = useState(false);
  const [denyReason, setDenyReason] = useState("");
  const queryClient = useQueryClient();

  // State for selected campaign to view (campaign drawer)
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [campaignDrawerOpen, setCampaignDrawerOpen] = useState(false);

  // State for selected report (for modal)
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const [getCampaignByIdAlertError, setCampaignByIdAlertError] =
    useState(false);
  const [verifyCampaignAlertSuccess, setVerifyCampaignAlertSuccess] =
    useState(false);
  const [verifyCampaignAlertFailure, setVerifyCampaignAlertFailure] =
    useState(false);
  const [deleteCampaignAlertSuccess, setDeleteCampaignAlertSuccess] =
    useState(false);
  const [deleteCampaignAlertFailure, setDeleteCampaignAlertFailure] =
    useState(false);
  const [updateUserStatusAlertSuccess, setUpdateUserStatusAlertSuccess] =
    useState(false);
  const [updateUserStatusAlertFailure, setUpdateUserStatusAlertFailure] =
    useState(false);
  const [resolveReportAlertSuccess, setResolveReportAlertSuccess] =
    useState(false);
  const [resolveReportAlertFailure, setResolveReportAlertFailure] =
    useState(false);
  const [deleteReportAlertSuccess, setDeleteReportAlertSuccess] =
    useState(false);
  const [deleteReportAlertFailure, setDeleteReportAlertFailure] =
    useState(false);

  const { data: reportsData } = useQuery({
    queryKey: ["reports"],
    queryFn: adminApi.getAllReports,
    select: (data) => data?.data?.reports || [],
  });

  const { data: campaignsData } = useQuery({
    queryKey: ["campaigns"],
    queryFn: adminApi.getAllCampaigns,
    select: (data) => data?.data?.campaigns || [],
  });

  const { data: usersData } = useQuery({
    queryKey: ["users"],
    queryFn: adminApi.getAllUsers,
    select: (data) => data?.data?.users || [],
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

  const verifyCampaignMutation = useMutation({
    mutationFn: ({ campaignId, verified, verificationDenyReason }) =>
      adminApi.verifyCampaign(campaignId, verified, verificationDenyReason),
    onSuccess: () => {
      queryClient.invalidateQueries(["campaigns"]);
      setVerifyCampaignAlertSuccess(true);
      setTimeout(() => setVerifyCampaignAlertSuccess(false), 3000);
    },
    onError: () => {
      setVerifyCampaignAlertFailure(true);
      setTimeout(() => setVerifyCampaignAlertFailure(false), 3000);
    },
  });

  const deleteCampaignMutation = useMutation({
    mutationFn: ({ campaignId, reason }) =>
      adminApi.deleteCampaign(campaignId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries(["campaigns"]);
      setDeleteCampaignAlertSuccess(true);
      setTimeout(() => setDeleteCampaignAlertSuccess(false), 3000);
    },
    onError: () => {
      setDeleteCampaignAlertFailure(true);
      setTimeout(() => setDeleteCampaignAlertFailure(false), 3000);
    },
  });

  const updateUserStatusMutation = useMutation({
    mutationFn: ({ userId, status }) =>
      adminApi.updateUserStatus(userId, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      setUpdateUserStatusAlertSuccess(true);
      setTimeout(() => setUpdateUserStatusAlertSuccess(false), 3000);
    },
    onError: () => {
      setUpdateUserStatusAlertFailure(true);
      setTimeout(() => setUpdateUserStatusAlertFailure(false), 3000);
    },
  });

  const resolveReportMutation = useMutation({
    mutationFn: (reportId) => adminApi.resolveReport(reportId),
    onSuccess: () => {
      queryClient.invalidateQueries(["reports"]);
      setResolveReportAlertSuccess(true);
      setTimeout(() => setResolveReportAlertSuccess(false), 3000);
    },
    onError: () => {
      setResolveReportAlertFailure(true);
      setTimeout(() => setResolveReportAlertFailure(false), 3000);
    },
  });

  const deleteReportMutation = useMutation({
    mutationFn: (reportId) => adminApi.deleteReport(reportId),
    onSuccess: () => {
      queryClient.invalidateQueries(["reports"]);
      setDeleteReportAlertSuccess(true);
      setTimeout(() => setDeleteReportAlertSuccess(false), 3000);
    },
    onError: () => {
      setDeleteReportAlertFailure(true);
      setTimeout(() => setDeleteReportAlertFailure(false), 3000);
    },
  });

  const campaigns = campaignsData ? campaignsData : [];
  const users = usersData ? usersData : [];
  const reports = reportsData ? reportsData : [];

  const openDrawer = (campaignId) => {
    getCampaignByIdMutation.mutate(campaignId);
    setCampaignDrawerOpen(true);
  };

  // -- Campaign Actions from Admin Drawer --

  const handleCampaignStatus = ({
    campaignId,
    verified,
    verificationDenyReason,
  }) => {
    verifyCampaignMutation.mutate({
      campaignId: campaignId,
      verified: verified,
      verificationDenyReason: verificationDenyReason,
    });
    setCampaignDrawerOpen(false);
  };

  const handleCampaignDelete = (campaignId) => {
    // Delete campaign: prompt for reason and then remove the campaign
    const reason = prompt(
      "Enter reason for deleting the campaign (this will be sent to the campaigner):"
    );
    if (reason) {
      deleteCampaignMutation.mutate({ campaignId: campaignId, reason: reason });
      setSelectedCampaign(null);
      setCampaignDrawerOpen(false);
    }
  };

  // -- User Actions --

  const handleUserStatus = ({ userId, status }) => {
    updateUserStatusMutation.mutate({ userId: userId, status: status });
  };

  // -- Report Actions --

  const openReportModal = (report) => {
    setSelectedReport(report);
    setReportModalOpen(true);
  };

  const handleReportResolve = (reportId) => {
    resolveReportMutation.mutate(reportId);
  };

  const handleReportDelete = (reportId) => {
    deleteReportMutation.mutate(reportId);
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
    <>
      {getCampaignByIdAlertError && (
        <Alert
          message="Coudn't get campaign data!!"
          type="red"
          key={Date.now()}
        />
      )}
      {verifyCampaignAlertSuccess && (
        <Alert
          message="Campaign Verification Status Changed Successfully!!"
          type="green"
          key={Date.now()}
        />
      )}
      {verifyCampaignAlertFailure && (
        <Alert
          message="Failed to Change Campaign Verification Status!!"
          type="red"
          key={Date.now()}
        />
      )}
      {deleteCampaignAlertSuccess && (
        <Alert
          message="Campaign Deleted Successfully!!"
          type="green"
          key={Date.now()}
        />
      )}
      {deleteCampaignAlertFailure && (
        <Alert
          message="Failed to Delete Campaign!!"
          type="red"
          key={Date.now()}
        />
      )}
      {updateUserStatusAlertSuccess && (
        <Alert
          message="User Status Updated Successfully!!"
          type="green"
          key={Date.now()}
        />
      )}
      {updateUserStatusAlertFailure && (
        <Alert
          message="Failed to Update User Status!!"
          type="red"
          key={Date.now()}
        />
      )}
      {resolveReportAlertSuccess && (
        <Alert
          message="Report Resolved Successfully!!"
          type="green"
          key={Date.now()}
        />
      )}
      {resolveReportAlertFailure && (
        <Alert
          message="Failed to Resolve Report!!"
          type="red"
          key={Date.now()}
        />
      )}
      {deleteReportAlertSuccess && (
        <Alert
          message="Report Deleted Successfully!!"
          type="green"
          key={Date.now()}
        />
      )}
      {deleteReportAlertFailure && (
        <Alert
          message="Failed to Delete Report!!"
          type="red"
          key={Date.now()}
        />
      )}
      <div className="bg-blue-50 dark:bg-[#e0ba03] text-black min-h-full p-6">
        <div className="max-w-6xl mx-auto bg-blue-900 text-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

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
                <h2 className="text-xl font-semibold">Active Campaigns</h2>
                <p className="text-2xl font-bold text-blue-500">
                  {campaigns.length}
                </p>
              </div>
              <div className="p-6 bg-gray-200 text-black rounded-md shadow-md">
                <h2 className="text-xl font-semibold">Total Users</h2>
                <p className="text-2xl font-bold text-blue-500">
                  {users.length}
                </p>
              </div>
              <div className="p-6 bg-gray-200 text-black rounded-md shadow-md">
                <h2 className="text-xl font-semibold">Total Funds Raised</h2>
                <p className="text-2xl font-bold text-blue-500">
                  ₹{" "}
                  {campaigns.reduce(
                    (total, campaign) => total + campaign.raisedFunds,
                    0
                  )}
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
              <div className="mt-2 mb-2">
                <h2 className="mb-1 text-lg">Not Verified Campaigns</h2>
                {filteredCampaigns.filter(
                  (campaign) => campaign.verified === "No"
                ).length === 0 ? (
                  <p className="text-gray-100 ml-2">
                    No Un-Verified Campaigns to review.
                  </p>
                ) : (
                  filteredCampaigns.map(
                    (campaign) =>
                      campaign.verified == "No" && (
                        <div
                          key={campaign._id}
                          className="p-4 border rounded-md bg-gray-200 text-black flex justify-between items-center mb-2"
                        >
                          <div>
                            <p className="text-lg font-semibold">
                              {campaign.title}
                            </p>
                            <p className="text-sm">
                              Verified: {campaign.verified}
                            </p>
                          </div>
                          <div>
                            <button
                              onClick={() => openDrawer(campaign._id)}
                              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                              View
                            </button>
                          </div>
                        </div>
                      )
                  )
                )}
              </div>
              <div className="mt-2 mb-2">
                <h2 className="mb-1 text-lg">Verification Denied Campaigns</h2>
                {filteredCampaigns.filter(
                  (campaign) => campaign.verified === "Denied"
                ).length === 0 ? (
                  <p className="text-gray-100 ml-2">
                    No Rejected Campaigns to review.
                  </p>
                ) : (
                  filteredCampaigns.map(
                    (campaign) =>
                      campaign.verified == "Denied" && (
                        <div
                          key={campaign._id}
                          className="p-4 border rounded-md bg-gray-200 text-black flex justify-between items-center mb-2"
                        >
                          <div>
                            <p className="text-lg font-semibold">
                              {campaign.title}
                            </p>
                            <p className="text-sm">
                              Verified: {campaign.verified}
                            </p>
                            <p>Reason: {campaign.verificationDenyReason}</p>
                          </div>
                          <div>
                            <button
                              onClick={() => openDrawer(campaign._id)}
                              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                              View
                            </button>
                          </div>
                        </div>
                      )
                  )
                )}
              </div>
              <div className="mt-2 mb-2">
                <h2 className="mb-1 text-lg">Verified Campaigns</h2>
                {filteredCampaigns.filter(
                  (campaign) => campaign.verified === "Yes"
                ).length === 0 ? (
                  <p className="text-gray-100 ml-2">
                    No Verified Campaigns to review.
                  </p>
                ) : (
                  filteredCampaigns.map(
                    (campaign) =>
                      campaign.verified == "Yes" && (
                        <div
                          key={campaign._id}
                          className="p-4 border rounded-md bg-gray-200 text-black flex justify-between items-center mb-2"
                        >
                          <div>
                            <p className="text-lg font-semibold">
                              {campaign.title}
                            </p>
                            <p className="text-sm">
                              Verified: {campaign.verified}
                            </p>
                          </div>
                          <div>
                            <button
                              onClick={() => openDrawer(campaign._id)}
                              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                              View
                            </button>
                          </div>
                        </div>
                      )
                  )
                )}
              </div>

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
                            handleCampaignStatus({
                              campaignId: selectedCampaign._id,
                              verified: "Yes",
                              verificationDenyReason: "Not Required",
                            })
                          }
                          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => setShowReasonBox(true)}
                          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() =>
                            handleCampaignDelete(selectedCampaign._id)
                          }
                          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                      {/* Reason Input & Action Buttons */}
                      {showReasonBox && (
                        <div className="mt-2">
                          <textarea
                            value={denyReason}
                            onChange={(e) => setDenyReason(e.target.value)}
                            placeholder="Enter reason for rejection"
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                          <div className="mt-2 flex gap-2 justify-center">
                            {/* Confirm Button */}
                            <button
                              onClick={() => {
                                handleCampaignStatus({
                                  campaignId: selectedCampaign._id,
                                  verified: "Denied",
                                  verificationDenyReason: denyReason,
                                });
                                setShowReasonBox(false);
                                setDenyReason("");
                              }}
                              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                              Confirm
                            </button>

                            {/* Cancel Button */}
                            <button
                              onClick={() => {
                                setShowReasonBox(false);
                                setDenyReason("");
                              }}
                              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
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
                    <div className="mt-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Videos
                      </h3>
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
                      <h3 className="text-xl font-semibold text-black">
                        Progress
                      </h3>
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
                            (selectedCampaign.raisedFunds /
                              selectedCampaign.goal) *
                            100
                          ).toFixed(2)
                        )}
                        % Goal Achieved
                      </p>
                    </div>

                    {/* Updates Section */}
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold text-black">
                        Updates
                      </h3>
                      <p className="text-black">
                        {selectedCampaign.updates.length > 0
                          ? selectedCampaign.updates
                          : "No Updates Yet"}
                      </p>
                    </div>

                    {/* Backers Section */}
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold text-black">
                        Backers
                      </h3>
                      <p className="text-black">{selectedCampaign.backers}</p>
                    </div>

                    {/* Donation Details Section */}
                    <div className="mt-6 mb-6">
                      <h3 className="text-xl font-semibold">
                        Donation Details
                      </h3>
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
                  </div>
                </motion.div>
              )}
            </>
          )}

          {/* Manage Users */}
          {activeTab === "users" && (
            <>
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
                <div className="mb-2 mt-2">
                  <h2 className="mb-1 text-lg">Users</h2>
                  {filteredUsers.length === 0 ? (
                    <p className="text-gray-100">No users found.</p>
                  ) : (
                    filteredUsers.map(
                      (user) =>
                        user.admin == "No" && (
                          <div
                            key={user._id}
                            className="p-4 border rounded-md bg-gray-200 text-black flex flex-wrap justify-between items-start mb-2"
                          >
                            {/* User Info Section */}
                            <div className="w-full md:w-auto">
                              <p className="text-lg font-semibold break-words">
                                {user.name}
                              </p>
                              <p className="text-sm break-words">
                                {user.email}
                              </p>
                              <p className="text-sm">
                                Role: {user.admin === "Yes" ? "Admin" : "User"}
                              </p>
                              <p className="text-sm">
                                Status: <strong>{user.status}</strong>
                              </p>
                            </div>
                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-2 mt-2 md:mt-0 p-6">
                              <button
                                onClick={() =>
                                  handleUserStatus({
                                    userId: user._id,
                                    status: "active",
                                  })
                                }
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 w-full md:w-auto"
                              >
                                Activate
                              </button>
                              <button
                                onClick={() =>
                                  handleUserStatus({
                                    userId: user._id,
                                    status: "blocked",
                                  })
                                }
                                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 w-full md:w-auto"
                              >
                                Block
                              </button>
                              <button
                                onClick={() =>
                                  handleUserStatus({
                                    userId: user._id,
                                    status: "banned",
                                  })
                                }
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full md:w-auto"
                              >
                                Ban
                              </button>
                            </div>
                          </div>
                        )
                    )
                  )}
                </div>
              </div>
              <div className="mb-2 mt-2">
                <h2 className="mb-1 text-lg">Admins</h2>
                {filteredUsers.length === 0 ? (
                  <p className="text-gray-100">No users found.</p>
                ) : (
                  filteredUsers.map(
                    (user) =>
                      user.admin == "Yes" && (
                        <div
                          key={user._id}
                          className="p-4 border rounded-md bg-gray-200 text-black flex flex-wrap justify-between items-start mb-2"
                        >
                          <div className="w-full md:w-auto">
                            <p className="text-lg font-semibold break-words">
                              {user.name}
                            </p>
                            <p className="text-sm break-words">{user.email}</p>
                            <p className="text-sm">
                              Role: {user.admin === "Yes" ? "Admin" : "User"}
                            </p>
                            <p className="text-sm">
                              Status: <strong>{user.status}</strong>
                            </p>
                          </div>
                          <div className="flex flex-wrap p-2 md:p-6 gap-2 mt-2 md:mt-0">
                            <button
                              onClick={() =>
                                alert("Admin Message Feature Coming Soon!!")
                              }
                              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                              Message
                            </button>
                          </div>
                        </div>
                      )
                  )
                )}
              </div>
            </>
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
                <p className="text-gray-100">No reports available.</p>
              ) : (
                filteredReports.map((report) => (
                  <div
                    key={report._id}
                    className="p-4 border rounded-md bg-gray-200 text-black flex flex-wrap justify-between items-start mb-2"
                  >
                    {/* Report Info Section */}
                    <div className="w-full md:w-auto">
                      <p className="text-lg break-words">
                        Reason: <strong>{report.reason}</strong>
                      </p>
                      <p className="text-sm break-words">
                        {report.type.toUpperCase()} REPORT
                      </p>
                      {report.type == "user" ? (
                        <p>Reported Email: {report.reportedEntity}</p>
                      ) : (
                        <p>Reported Campaign: {report.reportedEntity}</p>
                      )}
                      <p className="text-sm">
                        Status: <strong>{report.status}</strong>
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap p-4 md:p-6 gap-2 mt-2 md:mt-0">
                      <button
                        onClick={() => openReportModal(report)}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 w-full md:w-auto"
                      >
                        Resolve
                      </button>
                      <button
                        onClick={() => handleReportDelete(report._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full md:w-auto"
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
              <h2 className="text-2xl font-bold mb-4">Report Details</h2>
              <p className="mb-4">
                <strong>Type:</strong> {selectedReport.type}
              </p>
              {selectedReport.type == "user" ? (
                <p className="mb-4">
                  <strong>Reported Email:</strong>{" "}
                  {selectedReport.reportedEntity}
                </p>
              ) : (
                <p className="mb-4">
                  <strong>Reported Campaign:</strong>{" "}
                  {selectedReport.reportedEntity}
                </p>
              )}
              <p className="mb-4">
                <strong>Reason:</strong> {selectedReport.reason}
              </p>
              <p className="mb-4">
                <strong>Details:</strong> {selectedReport.details}
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    handleReportResolve(selectedReport._id);
                  }}
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
              <div className="bg-white text-black mt-6 p-4">
                <p className="mb-4">
                  <strong>Reported By:</strong> {selectedReport.reporterName}
                </p>
                <p>
                  <strong>Reporter Email:</strong>{" "}
                  {selectedReport.reporterEmail}
                </p>
              </div>
            </div>
          </div>
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

export default Admin;
