import React from "react";
import "./Layout.css";
//import "../Reception/Layout.css"
function Layout({ role, children, setStep }) {
  return (
    <div className="layout-container">

      {/* Sidebar */}
      <div className="sidebar">

        <div className="sidebar-header">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
            className="profile-image"
          />

          <h2>{role}</h2>

          <p>Hospital Management System</p>
        </div>

        {/* Receptionist Menu */}

        {role === "Receptionist" && (
          <div className="menu-list">

            <button
              onClick={() => setStep("dashboard")}
            >
              📊 Dashboard
            </button>

            <button
              onClick={() => setStep("register")}
            >
              📝 Register Patient
            </button>

            
            <button
              onClick={() => setStep("billing")}
            >
              💳 OPD Billing
            </button>

            <button
              onClick={() => setStep("ipdAdmission")}
            >
              🏥 IPD Admission
            </button>

            <button
              onClick={() => setStep("ipdPatients")}
            >
              🛏️ IPD Patient List
            </button>

            <button
              onClick={() => setStep("searchPatient")}
            >
              🔍 Search Patient
            </button>

            <button
              onClick={() => setStep("reports")}
            >
              📈 Reports
            </button>

          </div>
        )}

        {/* Logout */}

        <div className="logout-section">

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            🚪 Logout
          </button>

        </div>

      </div>

      {/* Main Area */}

      <div className="main-section">

        <div className="topbar">

          <h2>
            Reception Management Dashboard
          </h2>

        </div>

        <div className="page-content">
          {children}
        </div>

      </div>

    </div>
  );
}

export default Layout;