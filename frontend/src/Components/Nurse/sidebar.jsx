import React from "react";
 import "../../styles/Nurse/sidebar.css";

export default function Sidebar({
  setPage,
  logout
}) {
  return (
    <div className="sidebar">

   {/* <div className="sidebar"> */}

        <div className="profile">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
          />

          <h3>Nurse</h3>
        </div>
      {/* <h1>Nurse Dashboard</h1>  */}

      <button onClick={() => setPage("dashboard")}>
        Dashboard
      </button>

      <button onClick={() => setPage("beds")}>
        Available Beds
      </button>

      <button onClick={() => setPage("patients")}>
        Patient List
      </button>
{/* 
      <button
        className="logoutBtn"
        onClick={logout}
      >
        Logout
      </button> */}

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
  );
}