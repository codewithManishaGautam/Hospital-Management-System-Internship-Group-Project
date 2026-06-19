import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import "./Login.css";
import login from "../image/login.jpg";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await authService.login(email, password);

      if (result.success) {
        const role = result.data.user.role;
        const roleRoutes = {
          Admin: "/admin",
          Insurance: "/insurance",
          Receptionist: "/receptionist",
          Doctor: "/doctor",
          Billing: "/billing",
          Lab: "/lab",
          Pharmacy: "/pharmacy",
          Nurse: "/nurse",
        };

        const route = roleRoutes[role];
        if (route) {
          navigate(route);
        } else {
          setError("Unknown role: " + role);
        }
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check server connection.");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <h1 className="hospital-title">
        Welcome to Shraddha Hospital🏥🩺
      </h1>

      <div className="center">
        <h2>Login</h2>

        {error && (
          <p style={{ color: "#e74c3c", background: "#fdecea", padding: "10px", borderRadius: "4px", fontSize: "14px", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={{ marginTop: "15px", fontSize: "12px", color: "#999" }}>
          Use your role email (e.g. insurance@shraddha.com)
        </p>
      </div>
    </div>
  );
}

export default Login;
