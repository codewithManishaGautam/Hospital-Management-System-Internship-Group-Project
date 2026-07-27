import React, { useState, useEffect } from "react";
//import "./layout.css";
import "../Reception/Layout.css";
function Layout({ role, children, setStep, currentStep }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  return (
    <div className="layout-container">
      {/* Sidebar */}

      <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
        ☰
      </button>

      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
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
              className={currentStep === "dashboard" ? "active" : ""}
              onClick={() => {
                setStep("dashboard");
                setSidebarOpen(false);
              }}
            >
              📊 Dashboard
            </button>

            {/* <button
              className={currentStep === "register" ? "active" : ""}
              onClick={() => {
                setStep("register");
                setSidebarOpen(false);
              }}
            >
              {" "}
              📝 Register Patient
            </button> */}

            <button
              className={currentStep === "billing" ? "active" : ""}
              onClick={() => {
                setStep("billing");
                setSidebarOpen(false);
              }}
            >
              💳 OPD Billing
            </button>

            {/* <button
              className={currentStep === "ipdAdmission" ? "active" : ""}
              onClick={() => {
                setStep("ipdAdmission");
                setSidebarOpen(false);
              }}
            >
              {" "}
              🏥 IPD Admission
            </button> */}

            {/* <button
              className={currentStep === "ipdPatients" ? "active" : ""}
              onClick={() => {
                setStep("ipdPatients");
                setSidebarOpen(false);
              }}
            >
              {" "}
              🛏️ IPD Patient List
            </button> */}

            <button
              className={currentStep === "patientList" ? "active" : ""}
              onClick={() => {
                setStep("patientList");
                setSidebarOpen(false);
              }}
            >
              {" "}
              👥 Patient List
            </button>

            {/* <button
              className={currentStep === "reports" ? "active" : ""}
              onClick={() => {
                setStep("reports");
                setSidebarOpen(false);
              }}
            >
              📈 Reports
            </button> */}
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
          <h2>Reception Management Dashboard</h2>
        </div>

        <div className="page-content">
          {currentStep !== "dashboard" && (
            <button
              className="back-btn"
              onClick={() => {
                setStep("dashboard");
                setSidebarOpen(false);
              }}
            >
              ← Back to Dashboard
            </button>
          )}

          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
