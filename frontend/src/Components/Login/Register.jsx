import React, { useState } from "react";
import axios from "axios";
import { sendRegistrationOtp } from "../../api/authApi";
import { useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import "../../styles/login/authLayout.css";

function Register() {
  const navigate = useNavigate();

  const location = useLocation();
  const prefilledEmail = location.state?.email || "";

  const [email, setEmail] = useState(prefilledEmail);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // STEP 1: SEND OTP
  const sendOtp = async () => {
    if (!email) {
      alert("Enter Email");
      return;
    }

    try {
      const res = await sendRegistrationOtp({ email });

      alert(res.data.message);
      setOtpSent(true);
    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
    }
  };

  // STEP 2: VERIFY OTP + CREATE PASSWORD
  const verifyAccount = async () => {
    if (!email || !otp || !password) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          email,
          otp,
          password,
        },
      );

      alert(res.data.message);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Verification Failed");
    }
  };

  return (
    <AuthLayout title="Staff Registration">
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={sendOtp}>Send OTP</button>

      {otpSent && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
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

          <button onClick={verifyAccount}>Verify Account</button>
        </>
      )}

      <p className="back-link" onClick={() => navigate("/")}>
        Back to Login
      </p>
    </AuthLayout>
  );
}

export default Register;
