import React, { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/login/authLayout.css";
import AuthLayout from "./AuthLayout";
import { resetPassword } from "../../api/authApi";

function ResetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleReset = async () => {
    if (!email || !otp || !password) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await resetPassword({
        email,
        otp,
        password,
      });

      alert(res.data.message);

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Reset Failed");
    }
  };

  return (
    <AuthLayout title="Reset Password">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <div className="password-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <span
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "🙈" : "👁"}
        </span>
      </div>

      <button onClick={handleReset}>Reset Password</button>
    </AuthLayout>
  );
}

export default ResetPassword;
