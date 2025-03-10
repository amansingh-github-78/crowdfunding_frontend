import { useState, useEffect, use } from "react";
import { useMutation } from "@tanstack/react-query";
import { ApiContext } from "../Store/apiContext";
import { useParams, useSearchParams, Link } from "react-router-dom";

const DonateFunds = () => {
  const { campaignId } = useParams();
  const [step, setStep] = useState(1);
  const [donationData, setDonationData] = useState({
    amount: "",
    donorName: "",
    donorEmail: "",
  });
  const [transactionStatus, setTransactionStatus] = useState(null);
  const { paymentApi, authApi } = use(ApiContext);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [user, setUser] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const userMutation = useMutation({
    mutationFn: () => authApi.getUser(),
    onSuccess: (data) => {
      setUser(data.data);
      console.log(data.data);
    },
    onError: () => {
      setUser(null);
    },
  });

  const initiatePayment = async () => {
    setLoading(true);
    try {
      const response = await paymentApi.processPayment({
        campaignId,
        data: donationData,
      });
      if (response.loading) {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = response.paymentData.action;
        Object.entries(response.paymentData).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value;
          form.appendChild(input);
        });
        document.body.appendChild(form);
        form.submit();
      }
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      setTransactionStatus(error);
    }
  };

  useEffect(() => {
    userMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only on mount

  useEffect(() => {
    if (success === true) alert("Payment successful!");
    else if (success === false) alert("Payment failed!");
  }, [success]);

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const validateInputs = (updatedData) => {
  const hasCharacterInName = updatedData.donorName.trim().length > 0;
  const hasDigitInAmount = /^\d+$/.test(updatedData.amount);
  if(hasCharacterInName && hasDigitInAmount){
    setIsValid(true)
  }
  else{
    setIsValid(false)
  }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;
    if (name === "amount") {
      updatedValue = value.replace(/[^0-9]/g, ""); // Allow only numbers
    }

    const updatedData = {
      ...donationData,
      [name]: updatedValue || (name === "donorName" ? user.name : ""),
    };

    setDonationData(updatedData);
    validateInputs(updatedData);
  };

  return (
    <div className="min-h-fit bg-blue-50 dark:bg-[#e0ba03] text-black flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white dark:bg-blue-900 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4 text-white">
          Donate Funds
        </h2>

        {step === 1 && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">
              Step 1: Donation Details
            </h3>
            <input
              type="number"
              min="0"
              name="amount"
              value={donationData.amount}
              onChange={handleChange}
              placeholder="₹ Amount"
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="name"
              name="donorName"
              required
              value={donationData.donorName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md mt-2 bg-white"
            />
            <input
              type="email"
              name="donorEmail"
              readOnly
              value={(donationData.donorEmail = user?.email || "anonymous")}
              className="w-full px-4 py-2 border rounded-md mt-2"
            />
            <button
              onClick={handleNext}
              disabled={!isValid}
              className={`mt-4 px-4 py-2 rounded-md text-white ${
                isValid ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="text-white">
            <h3 className="text-xl font-semibold mb-4">
              Step 2: Review Details
            </h3>
            <p className="mb-2">
              <strong>Donation Amount:</strong> ₹ {donationData.amount}
            </p>
            <p className="mb-2">
              <strong>Your Name:</strong> {donationData.donorName}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {donationData.donorEmail}
            </p>
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrev}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Back
              </button>
              <button
                onClick={initiatePayment}
                className="px-4 py-2 bg-green-500 text-white rounded-md ml-4"
                disabled={loading}
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-white">
            {transactionStatus === "success" ? (
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Thank you for your donation!
                </h3>
                <p>Transaction ID: {searchParams.get("txnid") || "TXN12345"}</p>
                <Link
                  to="/explore"
                  className="px-4 py-2 bg-yellow-500 text-black rounded-md"
                >
                  Fund Others
                </Link>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Unsuccessful Payment
                </h3>
                <p>
                  Your transaction could not be completed. Please try again.
                </p>
                <Link
                  to="/explore"
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Fund Others
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonateFunds;
