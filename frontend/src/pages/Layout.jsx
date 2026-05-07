import React from "react";
import "./Layout.css";

function Layout({ role, children, setStep }) {
  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>🏥 HMS</h2>

        <button onClick={() => setStep("dashboard")}>Dashboard</button>

        {role === "Receptionist" && (
          <button onClick={() => setStep("register")}>
            Register Patient
          </button>
        )}

        {role === "Doctor" && (
          <button onClick={() => setStep("search")}>
            Search Patient
          </button>
        )}

        {role === "Admin" && (
          <>
            <button onClick={() => setStep("admin-dashboard")}>
              Admin Dashboard
            </button>
            <button onClick={() => setStep("users")}>
              Manage Users
            </button>
            <button onClick={() => setStep("doctors")}>
              Manage Doctors
            </button>
            <button onClick={() => setStep("patients")}>
              Patients
            </button>
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
        <div className="topbar">{role} Panel</div>

        <div className="content">
          {children}
        </div>
      </div>

    </div>
  );
}

export default Layout;