import React from "react";
import "../../styles/Pharmacy/Layout.css";

function Layout({ role, children, setStep }) {
  return (
    <div className="pharmacy-layout">
      {/* Sidebar */}
      <aside className="pharmacy-sidebar">
        <div className="pharmacy-profile">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
          />

          <h3>{role}</h3>
        </div>

        {/* Pharmacy Menu */}
        {role === "Pharmacy" && (
          <div className="pharmacy-menu">
            <button
              className="pharmacy-menu-button"
              onClick={() => setStep("dashboard")}
            >
              💊 Pharmacy Dashboard
            </button>

            <button
              className="pharmacy-menu-button"
              onClick={() => setStep("payments")}
            >
              💳 Payments
            </button>
          </div>
        )}

        {/* Logout */}
        <button
          className="pharmacy-logout-button"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          🚪 Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="pharmacy-main">
        <div className="pharmacy-topbar">{role} Panel</div>

        <div className="pharmacy-content">{children}</div>
      </main>
    </div>
  );
}

export default Layout;