import { useState, use } from "react";
import { ApiContext } from "../../Store/apiContext";
import { useMutation } from "@tanstack/react-query";

const ForgotPassword = ({ onBack }) => {
  const [error, setError] = useState("");
  const { authApi } = use(ApiContext);
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    email: "",
  });

  const Mutation = useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: (data) => {
      setSuccess(data.data.message);
    },
    onError: (err) => {
      setError(
        err.response?.data?.message || "Something went wrong. Try Again!!"
      );
    },
  });

  const handleForgot = () => {
    Mutation.mutate(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-lg bg-blue-900 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            Forgot Password
          </h2>
          {success && <p className="text-green-500 text-sm mb-3">{success}</p>}
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <form onSubmit={handleForgot}>
            <div className="mb-6">
              <label className="block text-white">Enter your email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>-
            <button
              name="button1"
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Reset Password
            </button>
          </form>
          <button
              name="button2"
              type="button"
              onClick={onBack}
              className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Go back to Login
            </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
