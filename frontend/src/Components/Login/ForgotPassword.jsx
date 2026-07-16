import React, { useState } from "react";
import { forgotPassword } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import "../../styles/login/authLayout.css";
import AuthLayout from "./AuthLayout";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSendOtp = async () => {
    if (!email) {
      alert("Enter Email");
      return;
    }

    try {
      const res = await forgotPassword({
        email,
      });

      alert(res.data.message);

      navigate("/reset-password");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <AuthLayout title="Forgot Password">
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleSendOtp}>Send OTP</button>

      <p className="back-link" onClick={() => navigate("/")}>
        ← Back to Login
      </p>
    </AuthLayout>
  );
}

export default ForgotPassword;
