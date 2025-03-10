import { useState, useEffect, use } from "react";
import { ApiContext } from "../../Store/apiContext"
import { useMutation } from "@tanstack/react-query";

const Register = ({ onSwitch }) => {
  const [step, setStep] = useState("register"); // "register" | "verify"
  const [inputCode, setInputCode] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const [error, setError] = useState("");
  const { authApi } = use(ApiContext);

  // Form Fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const registerMutation = useMutation({
    mutationFn: authApi.registerUser,
    onSuccess: (data) => {
      console.log(data);
      sessionStorage.setItem("tempToken", data.data.tempToken);
      setStep("verify");
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Registration failed. Try Again!!");
    },
  });
  
  const verifyMutation = useMutation({
    mutationFn: authApi.verifyOtp,
    onSuccess: (data) => {
      console.log(data);
      setVerificationStatus("success");
      sessionStorage.removeItem("tempToken");
      setTimeout(() => onSwitch(), 2000);
    },
    onError: (err) => {
      setVerificationStatus("error");
      console.log(err)
      setError(err.response?.data?.message || "Verification failed. Try Again!!");
    },
  });
  
  const handleRegister = (e) => {
    e.preventDefault();
    if (isDisabled) return;
    registerMutation.mutate(formData);
  };
  
  const handleVerify = () => {
    verifyMutation.mutate({ otp: inputCode });
  };
  
  // Validation Errors
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Button Disabled State
  const [isDisabled, setIsDisabled] = useState(true);

  // Regex Patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

  // Validate Fields when inputs change
  useEffect(() => {
    let newErrors = {};
    let valid = true;

    if (formData.name.length < 4) {
      newErrors.name = "Minimum 4 letters required";
      valid = false;
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email is not valid";
      valid = false;
    }
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be 8+ chars, 1 uppercase, 1 special character";
      valid = false;
    }
    if (formData.confirmPassword !== formData.password) {
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg bg-blue-900 p-6 rounded-lg shadow-md">
        {step === "register" ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-white">Register</h2>
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <form onSubmit={handleRegister}>
              {/** Name Field */}
              <div className="mb-4">
                <label className="block text-white">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${touched.name && errors.name ? "border-red-500" : "focus:ring-blue-500"}`}
                />
                {touched.name && errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
              </div>

              {/** Email Field */}
              <div className="mb-4">
                <label className="block text-white">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${touched.email && errors.email ? "border-red-500" : "focus:ring-blue-500"}`}
                />
                {touched.email && errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
              </div>

              {/** Password Field */}
              <div className="mb-4">
                <label className="block text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${touched.password && errors.password ? "border-red-500" : "focus:ring-blue-500"}`}
                />
                {touched.password && errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
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
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${touched.confirmPassword && errors.confirmPassword ? "border-red-500" : "focus:ring-blue-500"}`}
                />
                {touched.confirmPassword && errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword}</p>}
              </div>

              <button
                type="submit"
                disabled={isDisabled}
                className={`w-full text-white py-2 rounded-md ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
              >
                Register
              </button>
              <div className="flex flex-col justify-center items-center">
                <button
                  onClick={onSwitch}
                  className="text-lg text-white mt-2 block hover:underline"
                >
                  Already have an account?
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-white">Email Verification</h2>
            <p className="text-white text-center mb-4">
              Enter the verification code sent to your email.
            </p>
            <input
              type="number"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <button
              onClick={handleVerify}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            >
              Verify
            </button>
            <button
              onClick={() => setStep("register")}
              className="w-full mt-4 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
            >
              Go Back
            </button>
            {verificationStatus === "success" && (
              <p className="mt-4 text-green-400 text-center">✅ Email verified successfully! Redirecting to Login...</p>
            )}
            {verificationStatus === "error" && (
              <p className="mt-4 text-red-400 text-center">❌ Code is not valid!</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
