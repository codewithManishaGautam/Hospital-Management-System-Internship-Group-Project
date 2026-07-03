// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../../api/authApi";
// import "../../styles/login/authLayout.css";
// import "../../styles/login/login.css";
// // import loginImage from "../../image/login.jpg";

// function Login() {
//   const navigate = useNavigate();

//   const [selectedRole, setSelectedRole] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     if (!selectedRole || !email || !password) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       const res = await login({
//         role: selectedRole,
//         email,
//         password,
//       });

//       if (res.data.success) {
//         alert("Login Successful");

//         switch (res.data.role.toLowerCase()) {
//           case "receptionist":
//             navigate("/receptionist");
//             break;

//           case "doctor":
//             navigate("/doctor");
//             break;

//           case "lab":
//             navigate("/lab");
//             break;

//           case "pharmacy":
//             navigate("/pharmacy");
//             break;

//           case "nurse":
//             navigate("/nurse");
//             break;

//           case "admin":
//             navigate("/admin");
//             break;

//           default:
//             navigate("/");
//         }
//       }
//     } catch (err) {
//       const message = err.response?.data?.message;

//       if (message === "Please verify your email first.") {
//         alert("Please register before login");

//         navigate("/register", {
//           state: { email, role: selectedRole },
//         });
//       } else {
//         alert(message || "Invalid Email, Password or Role");
//       }
//     }
//   };


//   return (
//     <div className="login-page">
//       <div className="login-overlay"></div>

//       <div className="login-content">
//         <div className="login-left">
//           <h1 className="hospital-title">Shraddha Hospital</h1>

//           <p className="hospital-subtitle">Smart Hospital Management System</p>
//         </div>

//         <div className="login-card">
//           <h2>Login</h2>

//           <select
//             value={selectedRole}
//             onChange={(e) => setSelectedRole(e.target.value)}
//           >
//             <option value="">Select Role</option>
//             <option value="receptionist">Receptionist</option>
//             <option value="doctor">Doctor</option>
//             <option value="lab">Lab</option>
//             <option value="pharmacy">Pharmacy</option>
//             <option value="nurse">Nurse</option>
//             <option value="billing">Billing</option>
//             <option value="insurance">Insurance</option>
//             <option value="admin">Admin</option>
//           </select>

//           <input
//             type="email"
//             placeholder="Enter Email"
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Enter Password"
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button onClick={handleLogin}>Login</button>

//           <div className="login-actions">
//             <p
//               className="login-link"
//               onClick={() => navigate("/forgot-password")}
//             >
//               Forgot Password?
//             </p>

//             <p className="register-link" onClick={() => navigate("/register")}>
//               Register New Staff
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login/authLayout.css";
import "../../styles/login/login.css";

function Login() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!selectedRole) {
      alert("Please Select Role");
      return;
    }

    switch (selectedRole.toLowerCase()) {
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

      case "billing":
        navigate("/billing");
        break;

      case "insurance":
        navigate("/insurance");
        break;

      case "admin":
        navigate("/admin");
        break;

      default:
        alert("Invalid Role");
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay"></div>

      <div className="login-content">
        <div className="login-left">
          <h1 className="hospital-title">Shraddha Hospital</h1>

          <p className="hospital-subtitle">
            Smart Hospital Management System
          </p>
        </div>

        <div className="login-card">
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
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

            <p
              className="register-link"
              onClick={() => navigate("/register")}
            >
              Register New Staff
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;