import { useState, use } from "react";
import { useMutation } from "@tanstack/react-query";
import { ApiContext } from "../../Store/apiContext";
import { useNavigate } from "react-router-dom";

const LogIn = ({ onSwitch, onForgot }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { authApi } = use(ApiContext);

  const navigate = useNavigate();

  // Mutation for login
  const mutation = useMutation({
    mutationFn: authApi.loginUser,
    onSuccess: (data) => {
      sessionStorage.setItem("token", data.data.token);
      setLoading(false)
      navigate("/dashboard");
      window.location.reload();
    },
    onError: (err) => {
      setLoading(false)
      setError(err.response?.data?.message || "Login failed");
    },
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    mutation.mutate(formData);
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-lg bg-blue-900 p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center mb-6 text-white">
              Login
            </h2>
            {error && (
              <div className="text-red-500 text-md mb-3">
                {error}{" "}
                <strong className="block mt-2 text-white">
                  Contact through below E-Mails:
                </strong>
                <i className="block mt-2 text-white">
                  <p className="mb-2">
                    <strong>Support:</strong> support@fundmyknowledge.com
                  </p>
                  <p>
                    <strong>Admin:</strong> admin@fundmyknowledge.com
                  </p>
                </i>
              </div>
            )}
            <div className="mb-4">
              <label className="block text-white">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-white">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="flex flex-col justify-center items-center">
            <button
              onClick={onForgot}
              className="text-white mt-2 block hover:underline"
            >
              Forgot Password?
            </button>
            <p className="mt-1 mb-1 text-white">or</p>
            <button
              onClick={onSwitch}
              className="bg-blue-500 text-white mt-2 py-2 rounded-md hover:bg-blue-600 w-full"
            >
              Create an Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
