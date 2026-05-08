import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!selectedRole || !phone || !password) {
      alert("Please fill all fields");
      return;
    }

    switch (selectedRole) 
    {
      case "Receptionist":
        navigate("/receptionist");
        break;
      case "Doctor":
        navigate("/doctor");
        break;
      case "Lab":
        navigate("/lab");
        break;
      case "Pharmacy":
        navigate("/pharmacy");
        break;
      case "Nurse":
        navigate("/nurse");
        break;
      case "Billing":
        navigate("/billing");
        break;
      case "Insurance":
        navigate("/insurance");
        break;
      case "Admin":
        navigate("/admin");
        break;
      default:
        navigate("/");
    }

    console.log(selectedRole, phone, password);

    // later role-based routing
    // navigate("/dashboard");
  };

return (
  <div className="login-page">

    {/* OUTSIDE BOX */}
    <h1 className="hospital-title">
      Welcome to Shraddha Hospital🏥🩺
    </h1>

    {/* LOGIN BOX */}
    <div className="center">
      <h2>Login</h2>

      <select
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
      >
        <option value="">Select Role</option>
        <option value="Receptionist">Receptionist</option>
        <option value="Doctor">DoctorDashboard</option>
        <option value="Lab">Lab</option>
        <option value="Pharmacy">Pharmacy</option>
        <option value="Nurse">Nurse</option>
        <option value="Billing">Billing</option>
        <option value="Insurance">Insurance</option>
        <option value="Admin">Admin</option>
      </select>

      <input
        placeholder="Enter phone"
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>

  </div>
);
}

export default Login;
