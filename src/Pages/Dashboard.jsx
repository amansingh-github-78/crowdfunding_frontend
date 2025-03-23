import { useState, useEffect, useRef, use } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiContext } from "../Store/apiContext";
import { FaEdit } from "react-icons/fa";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Alert from "../Utils/alert";
import ConfirmDialog from "../Utils/confirmDialog";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { authApi, paymentApi } = use(ApiContext);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [contact, setContact] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 });
  const imgRef = useRef(null);
  const queryClient = useQueryClient();
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);

  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: authApi.getUser,
    select: (data) => data?.data || {},
  });

  const { data: transactionData } = useQuery({
    queryKey: ["transactions"],
    queryFn: paymentApi.getPaymentStatus,
    select: (data) => data || [],
  });

  const userProfileMutation = useMutation({
    mutationFn: (userData) => authApi.updateUserProfile(userData),
    onSuccess: () => {
      setLoading(false);
      setIsEditing(false);
      queryClient.invalidateQueries(["user"]);
      setAlertSuccess(true);
      setTimeout(() => {
        setAlertSuccess(false);
        window.location.reload();
      }, 3000);
    },
    onError: () => {
      setLoading(false);
      setAlertError(true);
      setTimeout(() => setAlertError(false), 3000);
    },
  });

  useEffect(() => {
    if (userData) {
      console.log(userData);
      setUser(userData);
      setName(userData.name || "");
      setBio(userData.bio || "");
      setContact(userData.contact || "");
    }
  }, [userData]);

  const transactions = transactionData ? transactionData : [];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const getCroppedImage = async () => {
    if (!imgRef.current || !crop.width || !crop.height) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    const cropWidth = crop.width * scaleX;
    const cropHeight = crop.height * scaleY;

    canvas.width = cropWidth;
    canvas.height = cropHeight;

    ctx.drawImage(
      imgRef.current,
      crop.x * scaleX,
      crop.y * scaleY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    // Apply Circular Mask
    ctx.globalCompositeOperation = "destination-in";
    ctx.beginPath();
    ctx.arc(cropWidth / 2, cropHeight / 2, cropWidth / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const file = new File([blob], "cropped-profile.jpg", {
          type: "image/jpeg",
        });
        resolve(file);
      }, "image/jpeg");
    });
  };

  const handleProfileUpdate = async () => {
    try {
      const croppedFile = await getCroppedImage(); // Wait for cropping to complete

      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      formData.append("contact", contact);
      if (croppedFile) {
        formData.append("profileImage", croppedFile);
      }

      userProfileMutation.mutate(formData);
      setLoading(true);
    } catch (error) {
      console.error("Error cropping image:", error);
      alert("Failed to crop image. Please try again.");
    }
  };

  return (
    <>
      {alertSuccess && (
        <Alert
          message="User Profile Updated Successfully!!"
          type="green"
          key={Date.now()}
        />
      )}
      {alertError && (
        <Alert
          message="Failed to Update User Profile!!"
          type="red"
          key={Date.now()}
        />
      )}
      <div className="bg-[#e0ba03] min-h-full p-4">
        <div className="max-w-5xl mx-auto bg-blue-900 text-white rounded-lg shadow-lg p-6 justify-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Dashboard
          </h1>

          {/* Tabs */}
          <div className="flex flex-wrap space-y-2 space-x-2 md:space-y-0 md:space-x-4 mb-6">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "profile"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black font-medium"
              }`}
            >
              User Profile
            </button>
            <button
              onClick={() => setActiveTab("transactions")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "transactions"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black font-medium"
              }`}
            >
              Transaction History
            </button>
          </div>

          {/* User Profile Section */}
          {activeTab === "profile" && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={profileImage || user?.profileImage?.url}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-2 border-blue-500"
                />
                {isEditing ? (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="block w-full text-sm text-gray-500"
                    />
                    {profileImage && (
                      <ReactCrop
                        src={profileImage}
                        crop={crop}
                        onChange={setCrop}
                      >
                        <img ref={imgRef} src={profileImage} alt="Crop" />
                      </ReactCrop>
                    )}
                  </div>
                ) : (
                  <div className="w-full break-words whitespace-normal overflow-hidden">
                    <h2 className="text-2xl font-semibold">{user?.name}</h2>
                    <p className="text-gray-300">{user?.bio}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-md bg-gray-200 text-black">
                  <p className="font-bold">Email:</p>
                  <p className="font-semibold">{user?.email}</p>
                </div>
                <div className="p-4 border rounded-md bg-gray-200 text-black">
                  <p className="font-bold">Phone:</p>
                  {isEditing ? (
                    <input
                      type="number"
                      value={contact}
                      onChange={(e) => {
                        if (e.target.value.length <= 10) {
                          setContact(e.target.value);
                        }
                      }}
                      min="1000000000"
                      max="9999999999"
                      className="w-full p-2 border rounded-md"
                    />
                  ) : (
                    <p className="font-semibold">
                      {user?.contact || "unknown"}
                    </p>
                  )}
                </div>
                <div className="p-4 border flex justify-between rounded-md bg-gray-200 text-black">
                  <p className="font-bold">Backed Campaigns:</p>
                  <strong>{user?.backedCampaigns || "unknown"}</strong>
                </div>
                <div className="p-4 border flex justify-between rounded-md bg-gray-200 text-black">
                  <p className="font-bold">Created Campaigns:</p>
                  <strong>{user?.createdCampaigns || "unknown"}</strong>
                </div>
              </div>

              {isEditing ? (
                <>
                  <div>
                    <label className="font-bold">Name:</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        if (e.target.value.length <= 50) {
                          setName(e.target.value);
                        }
                      }}
                      maxLength={50}
                      className="w-full p-2 border rounded-md text-black"
                    />
                  </div>
                  <div>
                    <label className="font-bold">Bio:</label>
                    <textarea
                      value={bio}
                      onChange={(e) => {
                        if (e.target.value.length <= 200) {
                          setBio(e.target.value);
                        }
                      }}
                      maxLength={200}
                      className="w-full p-2 border rounded-md text-black"
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={handleProfileUpdate}
                      disabled={loading}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className=" px-4 py-2 bg-orange-400 text-white hover:bg-orange-500 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex justify-between">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-gray-300 text-black hover:bg-gray-400 rounded-md"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => setResetPasswordOpen(true)}
                    className="px-4 py-2 bg-gray-300 text-black hover:bg-gray-400 rounded-md"
                  >
                    Reset Password
                  </button>
                </div>
              )}
              {resetPasswordOpen &&
              <div className="mt-2">
                <ConfirmDialog 
                isOpen
                onClose={()=> setResetPasswordOpen(false)}
                dialogforreset/>
              </div>}
            </div>
          )}

          {/* Transaction History Section */}
          {activeTab === "transactions" && (
            <>
              <div className="space-y-4 mb-6">
                <h1 className="font-bold">Donation Details:</h1>
                {transactions.donationDetails.length === 0 ? (
                  <p className="text-gray-100">No Donations yet.</p>
                ) : (
                  <div className="space-y-2">
                    {transactions.donationDetails
                      .slice()
                      .reverse()
                      .map((transaction) => (
                        <div
                          key={transaction._id}
                          className="p-4 border rounded-md bg-gray-200 text-black"
                        >
                          <p>
                            Transaction Id:{" "}
                            <strong>{transaction.transactionId}</strong>
                          </p>
                          <p>
                            Amount: <strong>₹{transaction.amount}</strong>
                          </p>
                          <p className="ml-2">
                            <i>Donated To</i>
                          </p>
                          <p>
                            Campaign Name:{" "}
                            <strong>{transaction.campaign || "Unknown"}</strong>
                          </p>
                          <p>
                            Date:{" "}
                            <strong>
                              {new Date(transaction.date)
                                .toLocaleString("en-IN", {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                  timeZone: "Asia/Kolkata",
                                })
                                .replace(" at", " at ")}
                            </strong>
                          </p>
                          <p className="ml-2">
                            <i>using</i>
                            <strong> PayU</strong>
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <h1 className="font-bold">Withdrawal Details:</h1>
                {transactions.withdrawalDetails.length === 0 ? (
                  <p className="text-gray-100">No Withdrawals yet.</p>
                ) : (
                  <div className="space-y-2">
                    {transactions.withdrawalDetails.map((transaction) => (
                      <div
                        key={transaction._id}
                        className="p-4 border rounded-md bg-gray-200 text-black"
                      >
                        <p>
                          Transaction Id:{" "}
                          <strong>{transaction.transactionId}</strong>
                        </p>
                        <p>
                          Amount: <strong>₹{transaction.amount}</strong>
                        </p>
                        <p className="ml-2">
                          <i>Withdraw from</i>
                        </p>
                        <p>
                          Campaign Name:{" "}
                          <strong>{transaction.campaign || "Unknown"}</strong>
                        </p>
                        <p>
                          Date:{" "}
                          <strong>
                            {new Date(transaction.date)
                              .toLocaleString("en-IN", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                                timeZone: "Asia/Kolkata",
                              })
                              .replace(" at", " at ")}
                          </strong>
                        </p>
                        <p className="ml-2">
                          <i>using</i>
                          <strong> PayU</strong>
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
