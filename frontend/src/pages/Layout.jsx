import React from "react";
import "./Layout.css";

function Layout({ role, children, setStep }) {
  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="profile">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
          />

          <h3>User</h3>
        </div>


        {/* Receptionist */}
        {role === "Receptionist" && (
          <button onClick={() => setStep("register")}>Register Patient</button>
        )}

        {/* Doctor */}
        {role === "Doctor" && (
          <button onClick={() => setStep("search")}>Search Patient</button>
        )}
        {/* Lab */}
        {role === "Lab" && (
          <button onClick={() => setStep("search")}>Search Patient</button>
        )}

        {/* Pharmacy */}
        {role === "Pharmacy" && (
          <button onClick={() => setStep("search")}>Search Patient</button>
        )}

        {/* Billing */}
        {role === "Bill" && (
          <button onClick={() => setStep("search")}>Search Patient</button>
        )}

        {/* Insurance */}
        {role === "Insurance" && (
          <button onClick={() => setStep("search")}>Search Patient</button>
        )}

        {/* Admin */}
        {role === "Admin" && (
          <>
            <button onClick={() => setStep("admin-dashboard")}>
              Admin Dashboard
            </button>
            <button onClick={() => setStep("users")}>Manage Users</button>
            <button onClick={() => setStep("doctors")}>Manage Doctors</button>
            <button onClick={() => setStep("patients")}>Patients</button>
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

        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
