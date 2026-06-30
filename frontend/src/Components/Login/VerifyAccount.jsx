import React, { useState } from "react";
import { verifyOtp } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import "../../styles/login/authLayout.css";
import AuthLayout from "./AuthLayout";

function VerifyAccount() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const handleVerify = async () => {
    if (!email || !otp || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await verifyOtp({
        email,
        otp,
        password,
      });

      alert("Account Verified Successfully");

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Verification Failed");
    }
  };

  return (
    <AuthLayout title="Verify Account">
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

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

      <button onClick={handleVerify} disabled={!email || !otp || !password}>
        Verify Account
      </button>
    </AuthLayout>
  );
}

export default VerifyAccount;
