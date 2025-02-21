const ForgotPassword = ({ onBack }) => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg bg-blue-900 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            Forgot Password
          </h2>
          <form>
            <div className="mb-6">
              <label className="block text-white">Enter your email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              Reset Password
            </button>
          </form>
        </div>
      </div>
      <button onClick={onBack} className="text-blue-500 mt-2 block">
        Go back to Login
      </button>
    </div>
  );
};

export default ForgotPassword;
