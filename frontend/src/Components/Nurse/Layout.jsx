import React from "react";
import "../../styles/Nurse/Layout.css";

function Layout({ children, setPage }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="nurse-layout">

      {/* ================= SIDEBAR ================= */}
      <aside className="nurse-sidebar">

        {/* Profile */}
        <div className="nurse-profile">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
          />

          <h3>Nurse</h3>
        </div>

        {/* Menu */}
        <div className="nurse-menu">

          <button
            className="nurse-menu-button"
            onClick={() => setPage("dashboard")}
          >
            🏠 Dashboard
          </button>

          <button
            className="nurse-menu-button"
            onClick={() => setPage("beds")}
          >
            🛏️ Available Beds
          </button>

          <button
            className="nurse-menu-button"
            onClick={() => setPage("patients")}
          >
            👥 Patient List
          </button>

        </div>

        {/* Logout */}
        <button
          className="nurse-logout-button"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </aside>

      {/* ================= MAIN ================= */}
      <main className="nurse-main">

        {/* Topbar
        <div className="nurse-topbar">
          <h2>Nurse Panel</h2>
        </div> */}

        {/* Page Content */}
        <div className="nurse-content">
          {children}
        </div>

      </main>

    </div>
  );
}

export default Layout;