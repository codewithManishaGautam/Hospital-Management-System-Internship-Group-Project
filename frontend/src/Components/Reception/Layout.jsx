import React, { useState, useEffect } from "react";
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
    <div className="reception-layout-container">

      {/* Mobile Menu Button */}
      <button
        className="reception-menu-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="reception-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`reception-sidebar ${
          sidebarOpen ? "reception-sidebar-active" : ""
        }`}
      >
        <div className="reception-sidebar-header">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
            className="reception-profile-image"
          />

          <h2>{role}</h2>

          <p>Hospital Management System</p>
        </div>

        {/* Receptionist Menu */}
        {role === "Receptionist" && (
          <div className="reception-menu-list">

            {/* Dashboard */}
            <button
              className={
                currentStep === "dashboard"
                  ? "reception-menu-btn-item reception-menu-active"
                  : "reception-menu-btn-item"
              }
              onClick={() => {
                setStep("dashboard");
                setSidebarOpen(false);
              }}
            >
              📊 Dashboard
            </button>

            {/* OPD Billing */}
            <button
              className={
                currentStep === "billing"
                  ? "reception-menu-btn-item reception-menu-active"
                  : "reception-menu-btn-item"
              }
              onClick={() => {
                setStep("billing");
                setSidebarOpen(false);
              }}
            >
              💳 OPD Billing
            </button>

            {/* Patient List */}
            <button
              className={
                currentStep === "patientList"
                  ? "reception-menu-btn-item reception-menu-active"
                  : "reception-menu-btn-item"
              }
              onClick={() => {
                setStep("patientList");
                setSidebarOpen(false);
              }}
            >
              👥 Patient List
            </button>

          </div>
        )}

        {/* Logout */}
        <div className="reception-logout-section">
          <button
            className="reception-logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN AREA ================= */}
      <main className="reception-main-section">

        {/* Topbar */}
        <header className="reception-topbar">
          <h2>Reception Management Dashboard</h2>
        </header>

        {/* Page Content */}
        <div className="reception-page-content">

          {/* Back Button */}
          {currentStep !== "dashboard" && (
            <button
              className="reception-back-btn"
              onClick={() => {
                setStep("dashboard");
                setSidebarOpen(false);
              }}
            >
              ← Back to Dashboard
            </button>
          )}

          {/* Child Component */}
          {children}

        </div>
      </main>
    </div>
  );
}

export default Layout;