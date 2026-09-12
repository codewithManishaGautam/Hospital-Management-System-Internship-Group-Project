import React from "react";
import "../../styles/Pharmacy/layout.css";

function Layout({ role, children, setStep }) {
  return (
    <div className="pharmacy-layout">
      {/* Sidebar */}
      <div className="pharmacy-sidebar">
        <div className="pharmacy-profile">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
          />

          <h3>{role}</h3>
        </div>

        {/* Pharmacy Menu */}
        {role === "Pharmacy" && (
          <>
            <button onClick={() => setStep("dashboard")}>
              Pharmacy Dashboard
            </button>

            <button onClick={() => setStep("payments")}>Payments</button>
          </>
        )}

        {/* Logout */}
        <button
          className="pharmacy-logout"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="pharmacy-main">
        <div className="pharmacy-topbar">{role} Panel</div>

        <div className="pharmacy-content">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
