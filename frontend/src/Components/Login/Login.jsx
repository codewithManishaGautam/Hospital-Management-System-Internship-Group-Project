import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";
import "../../styles/login/authLayout.css";
import "../../styles/login/login.css";
// import loginImage from "../../image/login.jpg";

function Login() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!selectedRole || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await login({
        role: selectedRole,
        email,
        password,
      });

      if (res.data.success) {
        alert("Login Successful");

        switch (res.data.role.toLowerCase()) {
          case "receptionist":
            navigate("/receptionist");
            break;

          case "doctor":
            navigate("/doctor");
            break;

          case "lab":
            navigate("/lab");
            break;

          case "pharmacy":
            navigate("/pharmacy");
            break;

          case "nurse":
            navigate("/nurse");
            break;

          case "admin":
            navigate("/admin");
            break;

          default:
            navigate("/");
        }
      }
    } catch (err) {
      const message = err.response?.data?.message;

      if (message === "Please verify your email first.") {
        alert(message);
        navigate("/verify-account");
      } else {
        alert(message || "Invalid Email, Password or Role");
      }
    }
  };

  return (
    <div className="login-page">
      {/* OUTSIDE BOX */}
      <h1 className="hospital-title">Welcome to Shraddha Hospital🏥🩺</h1>

      {/* LOGIN BOX */}
      <div className="center">
        <h2>Login</h2>

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="receptionist">Receptionist</option>
          <option value="doctor">Doctor</option>
          <option value="lab">Lab</option>
          <option value="pharmacy">Pharmacy</option>
          <option value="nurse">Nurse</option>
          <option value="billing">Billing</option>
          <option value="insurance">Insurance</option>
          <option value="admin">Admin</option>
        </select>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <div className="login-actions">
          <p
            className="login-link"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>

          <p className="register-link" onClick={() => navigate("/register")}>
            Register New Staff
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
