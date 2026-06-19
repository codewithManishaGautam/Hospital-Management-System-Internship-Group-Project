import React from "react";
import "./Layout.css";
import NotificationBell from "../components/insurance/NotificationBell";

function Layout({ role, children, setStep }) {
  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="profile">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
          />

          <h3>{role}</h3>
        </div>

        {/* Receptionist */}
        {role === "Receptionist" && (
          <button onClick={() => setStep("register")}>Register Patient</button>
        )}

        {/* Others */}
        {["Doctor", "Lab", "Pharmacy", "Bill"].includes(role) && (
          <button onClick={() => setStep("search")}>Search Patient</button>
        )}

        {/* Insurance */}
        {role === "Insurance" && (
          <>
            <button onClick={() => setStep("dashboard")}>Dashboard</button>
            <button onClick={() => setStep("register-policy")}>Register Policy</button>
            <button onClick={() => setStep("enroll-scheme")}>Enroll Scheme</button>
            <button onClick={() => setStep("pre-auth")}>Pre-Auth Requests</button>
            <button onClick={() => setStep("claims")}>All Claims</button>
            <button onClick={() => setStep("documents")}>Documents</button>
            <button onClick={() => setStep("official-forms")}>Official Provider Forms</button>
          </>
        )}

        {/* Admin */}
        {role === "Admin" && (
          <>
            <button onClick={() => setStep("admin-dashboard")}>
              Admin Dashboard
            </button>
            <button onClick={() => setStep("users")}>Manage Users</button>
            <button onClick={() => setStep("doctors")}>Manage Doctors</button>
            <button onClick={() => setStep("patients")}>Patients</button>
            <button onClick={() => setStep("insurance-master")}>Insurance Master</button>
          </>
        )}

        <button
          className="logout"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div className="main">
        <div className="topbar">
          <span>{role} Panel</span>
          {(role === "Insurance" || role === "Admin") && <NotificationBell />}
        </div>

        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
