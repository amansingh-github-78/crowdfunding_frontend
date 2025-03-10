import { useState, useEffect, use } from "react";
import { useMutation } from "@tanstack/react-query";
import { ApiContext } from "../Store/apiContext";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { authApi } = use(ApiContext);
  const [user, setUser] = useState({});

  const mutation = useMutation({
      mutationFn: () => authApi.getUser(),
      onSuccess: (data) => {
        setUser(data.data);
        console.log(data.data)
      },
      onError: () => {
        setUser(null);
      },
    });
  
    useEffect(() => {
      mutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only on mount

  // Dummy Contributions Data
  const contributions = [
    { id: 1, campaign: "Education for All", amount: "2000", date: "Jan 10, 2025" },
    { id: 2, campaign: "Tech for Kids", amount: "1500", date: "Feb 5, 2025" },
  ];

  // Dummy Transaction History Data
  const transactions = [
    { id: 1, type: "Donation", amount: "2000", status: "Success", date: "Jan 10, 2025" },
    { id: 2, type: "Donation", amount: "1500", status: "Success", date: "Feb 5, 2025" },
  ];

  return (
    <div className="bg-[#e0ba03] min-h-full p-4">
      <div className="max-w-5xl mx-auto bg-blue-900 text-white rounded-lg shadow-lg p-6 justify-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>

        {/* Tabs */}
        <div className="flex flex-wrap space-y-2 space-x-2 md:space-y-0 md:space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "profile" ? "bg-blue-500 text-white" : "bg-gray-200 text-black font-medium"
            }`}
          >
            User Profile
          </button>
          <button
            onClick={() => setActiveTab("contributions")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "contributions" ? "bg-blue-500 text-white" : "bg-gray-200 text-black font-medium"
            }`}
          >
            My Contributions
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "transactions" ? "bg-blue-500 text-white" : "bg-gray-200 text-black font-medium"
            }`}
          >
            Transaction History
          </button>
        </div>

        {/* User Profile Section */}
        {activeTab === "profile" && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <img src={user.profileImage?.url} alt="Profile" className="w-20 h-20 rounded-full border-2 border-blue-500" />
              <div>
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p className="text-gray-300">{user.bio}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-md bg-gray-200 text-black">
                <p className="font-bold">Email:</p>
                <p className="font-semibold">{user.email}</p>
              </div>
              <div className="p-4 border rounded-md bg-gray-200 text-black">
                <p className="font-bold">Phone:</p>
                <p className="font-semibold">{user.contact}</p>
              </div>
            </div>
            {/* <div className="p-4 border rounded-md bg-gray-200 text-black">
              <p className="font-bold">Backed Campaigns:</p>
              <ul className="list-disc ml-5 font-semibold">
                {user.backedCampaigns.map((campaign, index) => (
                  <li key={index}>{campaign}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 border rounded-md bg-gray-200 text-black">
              <p className="font-bold">Created Campaigns:</p>
              <ul className="list-disc ml-5 font-semibold">
                {user.createdCampaigns.map((campaign, index) => (
                  <li key={index}>{campaign}</li>
                ))}
              </ul>
            </div> */}
          </div>
        )}

        {/* My Contributions Section */}
        {activeTab === "contributions" && (
          <div className="space-y-4">
            {contributions.length === 0 ? (
              <p className="text-gray-100">No contributions yet.</p>
            ) : (
              <div className="space-y-2">
                {contributions.map((contribution) => (
                  <div key={contribution.id} className="p-4 border rounded-md bg-gray-200 text-black">
                    <p className="font-bold">Campaign: {contribution.campaign}</p>
                    <p className="font-semibold">Amount: ₹ {contribution.amount}</p>
                    <p className="font-semibold">Date: {contribution.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Transaction History Section */}
        {activeTab === "transactions" && (
          <div className="space-y-4">
            {transactions.length === 0 ? (
              <p className="text-gray-100">No transactions yet.</p>
            ) : (
              <div className="space-y-2">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 border rounded-md bg-gray-200 text-black">
                    <p className="font-bold">Type: {transaction.type}</p>
                    <p className="font-semibold">Amount: ₹ {transaction.amount}</p>
                    <p className="font-semibold">Status: {transaction.status}</p>
                    <p className="font-semibold">Date: {transaction.date}</p>
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

export default Dashboard;
