import { useState, useEffect, use } from "react";
import { ApiContext } from "../Store/apiContext"
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("")
  const { authApi } = use(ApiContext);
  const params = useSearchParams()

  const [formData, setFormData] = useState({
    newPassword: "", params: params
  });

  const Mutation = useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: (data) => {
      setSuccess(data.data.message)
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Password Didn't reset. Try Again!!");
    },
  });

  const handleReset = () => {
    console.log(formData)
    Mutation.mutate(formData);
  };

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Button Disabled State
  const [isDisabled, setIsDisabled] = useState(true);

  // Regex Patterns
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

  // Validate Fields when inputs change
  useEffect(() => {
    let newErrors = {};
    let valid = true;
    if (!passwordRegex.test(formData.newPassword)) {
      newErrors.newPassword =
        "Password must be 8+ chars, 1 uppercase, 1 special character";
      valid = false;
    }
    if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    setIsDisabled(!valid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Mark field as touched onBlur
  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-300">
      <div className="w-full max-w-lg bg-blue-900 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Reset Password
        </h2>
        {success && <p className="text-green-500 text-sm mb-3">{success}</p>}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <form onSubmit={handleReset}>
          <div className="mb-4">
            <label className="block text-white">Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                touched.newPassword && errors.newPassword
                  ? "border-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {touched.newPassword && errors.newPassword && (
              <p className="text-red-400 text-sm">{errors.newPassword}</p>
            )}
          </div>

          {/** Confirm Password Field */}
          <div className="mb-6">
            <label className="block text-white">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                touched.confirmPassword && errors.confirmPassword
                  ? "border-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full text-white py-2 rounded-md ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
