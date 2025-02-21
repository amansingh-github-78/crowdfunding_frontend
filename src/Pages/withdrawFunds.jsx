import { useState } from "react";

const WithdrawFunds = () => {
  const [withdrawData, setWithdrawData] = useState({
    amount: "",
    bankName: "",
    userName: "",
    accountNumber: "",
    ifsc: "",
  });

  const fundsavailable = 100;

  const handleChange = (e) => setWithdrawData({ ...withdrawData, [e.target.name]: e.target.value });

  const handleWithdraw = () => {
    alert("Withdrawal request submitted!");
    // Reset form
    setWithdrawData({ amount: "", bankName: "", accountNumber: "", ifsc: "" });
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-[#e0ba03] text-black flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white dark:bg-blue-900 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-2 text-white">Withdraw Funds</h2>
        <p className="mb-4 text-center text-white">Enter your withdrawl details below:</p>
        <div className="mb-4">
        <p className="mb-4 text-white">Total Funds Available: ₹ {fundsavailable} </p>
          <label className="block text-gray-700 dark:text-gray-200">Withdrawal Amount</label>
          <input
            type="number"
            name="amount"
            value={((withdrawData.amount <= fundsavailable) ? withdrawData.amount : fundsavailable ) }
            onChange={handleChange}
            placeholder="₹ Amount"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200">Bank Name</label>
          <input
            type="text"
            name="bankName"
            value={withdrawData.bankName}
            onChange={handleChange}
            placeholder="Bank Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200">Your Name</label>
          <input
            type="text"
            name="userName"
            value={withdrawData.userName}
            onChange={handleChange}
            placeholder="Account Holder's Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200">Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value={withdrawData.accountNumber}
            onChange={handleChange}
            placeholder="Account Number"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200">IFSC Code</label>
          <input
            type="text"
            name="ifsc"
            value={withdrawData.ifsc}
            onChange={handleChange}
            placeholder="IFSC Code"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleWithdraw}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Withdraw Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawFunds;
