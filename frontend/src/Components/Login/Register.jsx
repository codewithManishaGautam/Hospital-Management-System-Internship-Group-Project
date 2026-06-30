import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import "../../styles/login/authLayout.css";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [password, setPassword] = useState("");

  // STEP 1: SEND OTP
  const sendOtp = async () => {
    if (!email) {
      alert("Enter Email");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/send-registration-otp",
        { email },
      );

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

          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={verifyAccount}>Verify Account</button>
        </>
      )}

      <p
        style={{ color: "blue", cursor: "pointer", marginTop: "10px" }}
        onClick={() => navigate("/")}
      >
        Back to Login
      </p>
    </AuthLayout>
  );
}

export default Register;
