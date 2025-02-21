import { useState } from "react";
import Login from "../Components/Authentication/LogIn";
import Register from "../Components/Authentication/Register";
import ForgotPassword from "../Components/Authentication/ForgotPassword";

const Authentication = () => {
  const [authState, setAuthState] = useState("login"); // "login", "register", "forgotPassword"

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-screen bg-gray-200 p-6 rounded-lg shadow-md"
      style={{ backgroundImage: "url('/loginBg2.png')" }}>
        {authState === "login" && <Login onSwitch={() => setAuthState("register")} onForgot={() => setAuthState("forgotPassword")} />}
        {authState === "register" && <Register onSwitch={() => setAuthState("login")} />}
        {authState === "forgotPassword" && <ForgotPassword onBack={() => setAuthState("login")} />}
      </div>
    </div>
  );
};

export default Authentication;
