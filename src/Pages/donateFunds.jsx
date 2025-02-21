import { useState } from "react";
import { Link } from "react-router-dom";

const DonateFunds = () => {
  const [step, setStep] = useState(1);
  const [donationData, setDonationData] = useState({
    amount: "",
    donorName: "",
    donorEmail: "",
  });
  const [transactionStatus, setTransactionStatus] = useState(null); // "success" or "failure"

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);
  const handleChange = (e) =>
    setDonationData({ ...donationData, [e.target.name]: e.target.value });

  const handlePayment = () => {
    // Simulate a payment outcome (70% success, 30% failure)
    const success = Math.random() > 0.3;
    if (success) {
      alert("Payment processed via PayU!");
      setTransactionStatus("success");
    } else {
      alert("Payment failed via PayU!");
      setTransactionStatus("failure");
    }
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-[#e0ba03] text-black flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white dark:bg-blue-900 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4 text-white">
          Donate Funds
        </h2>

        {step === 1 && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">
              Step 1: Donation Details
            </h3>
            <div className="mb-4">
              <label className="block text-gray-200">Donation Amount</label>
              <input
                type="number"
                name="amount"
                value={donationData.amount}
                onChange={handleChange}
                placeholder="₹ Amount"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200">
                Your Name
              </label>
              <input
                type="text"
                name="donorName"
                value={donationData.donorName}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                name="donorEmail"
                value={donationData.donorEmail}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Next
              </button>
            </div>
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
                onClick={handleNext}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-white">
            <h3 className="text-xl font-semibold mb-4">Step 3: Payment</h3>
            <p className="mb-4">
              You will be redirected to PayU for secure payment processing.
            </p>
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrev}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Back
              </button>
              <button
                onClick={handlePayment}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Pay Now
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-white">
            {transactionStatus === "success" ? (
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Thank you for your donation!
                </h3>
                <p className="mb-4">Transaction ID: TXN12345</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => {
                      setStep(1);
                      setTransactionStatus(null);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Donate Again
                  </button>
                  <Link to="/explore">
                    <button className="px-4 py-2 dark:bg-[#e0ba03] text-black rounded-md hover:bg-amber-400">
                      Fund Others
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Unsuccessful Payment
                </h3>
                <p className="mb-4">
                  Your transaction could not be completed. Please try again.
                </p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => {
                      setStep(1);
                      setTransactionStatus(null);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Try Again
                  </button>
                  <Link to="/explore">
                    <button className="px-4 py-2 dark:bg-[#e0ba03] text-black rounded-md hover:bg-amber-400">
                      Fund Others
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonateFunds;
