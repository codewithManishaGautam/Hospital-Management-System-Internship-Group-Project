import React from "react";
import "../../styles/Nurse/sidebar.css";

export default function Sidebar({ setPage, logout }) {
  return (
    <aside className="sidebar">
      {/* Nurse Profile */}
      <div className="nurse-profile">
        <div className="nurse-avatar-wrapper">
          <img
            className="nurse-avatar"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Nurse"
          />

          <span className="online-dot"></span>
        </div>

        <h3>Nurse</h3>
        <p>Online</p>
      </div>

      {/* Navigation */}
      <nav className="nurse-navigation">
        <button className="nurse-nav-btn" onClick={() => setPage("dashboard")}>
          <span className="nav-icon">⌂</span>
          <span>Dashboard</span>
        </button>

        <button className="nurse-nav-btn" onClick={() => setPage("beds")}>
          <span className="nav-icon">🛏</span>
          <span>Available Beds</span>
        </button>

        <button className="nurse-nav-btn" onClick={() => setPage("patients")}>
          <span className="nav-icon">👥</span>
          <span>Patient List</span>
        </button>
      </nav>

      {/* Logout */}
      <button
        className="nurse-logout"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        <span className="nav-icon">↪</span>
        <span>Logout</span>
      </button>
    </aside>
  );
}
