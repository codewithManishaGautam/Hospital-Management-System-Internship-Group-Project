import React from "react";
import "../../styles/Nurse/sidebar.css";

export default function Sidebar({
  setPage,
  logout
}) {
  return (
    <div className="sidebar">

      <h1>Nurse Dashboard</h1>

      <button onClick={() => setPage("dashboard")}>
        Dashboard
      </button>

      <button onClick={() => setPage("beds")}>
        Available Beds
      </button>

      <button onClick={() => setPage("patients")}>
        Patient List
      </button>

      <button
        className="logoutBtn"
        onClick={logout}
      >
        Logout
      </button>

    </div>
  );
}