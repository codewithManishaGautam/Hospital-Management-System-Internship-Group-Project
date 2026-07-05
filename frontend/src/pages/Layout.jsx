import React, { useState } from "react";
import "./Layout.css";
import NotificationBell from "../components/insurance/NotificationBell";

function Layout({ role, children, setStep }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard">
      <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
        ☰
      </button>

      {/* SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="profile">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
          />

          <h3>{role}</h3>
        </div>

        {/* Receptionist */}
        {role === "Receptionist" && (
          <button onClick={() => setStep("register")}>Register Patient</button>
        )}

        {role === "Doctor" && (
          <>
            <button onClick={() => setStep("dashboard")}>🏠 Dashboard</button>
            <button onClick={() => setStep("profile-dashboard")}>👤 Profile</button>
            <button onClick={() => setStep("appointments")}>📅 Appointments</button>
            <button onClick={() => setStep("patients")}>🧑 Patients</button>
            <button onClick={() => setStep("prescriptions")}>💊 Prescriptions</button>
            <button onClick={() => setStep("reports")}>🧪 Medical Reports</button>
            <button onClick={() => setStep("emergency")}>🚨 Emergency</button>
            <button onClick={() => setStep("schedule")}>🕒 Schedule</button>
            <button onClick={() => setStep("notifications")}>🔔 Notifications</button>
            <button onClick={() => setStep("analytics")}>📈 Analytics</button>
          </>
        )}

        {role === "Lab" && (
          <>
            <button onClick={() => setStep("overview")}>🏠 Overview</button>
            <button onClick={() => setStep("patients")}>🧑 Patients</button>
            <button onClick={() => setStep("tests")}>🧪 Test Catalog</button>
            <button onClick={() => setStep("booking")}>📅 Booking</button>
            <button onClick={() => setStep("samples")}>🧬 Samples</button>
            <button onClick={() => setStep("analysis")}>🔬 Analysis</button>
            <button onClick={() => setStep("findings")}>📄 Findings</button>
            <button onClick={() => setStep("reports")}>📝 Reports</button>
            <button onClick={() => setStep("payments")}>💰 Billing</button>
            <button onClick={() => setStep("history")}>📜 History</button>
          </>
        )}

        {['Pharmacy', 'Bill'].includes(role) && (
          <button onClick={() => setStep('search')}>Search Patient</button>
        )}

        {/* Insurance */}
        {role === "Insurance" && (
          <>
            <button onClick={() => setStep("dashboard")}>Dashboard</button>
            <button onClick={() => setStep("register-policy")}>Register Policy</button>
            <button onClick={() => setStep("enroll-scheme")}>Enroll Scheme</button>
            <button onClick={() => setStep("pre-auth")}>Pre-Auth Requests</button>
            <button onClick={() => setStep("claims")}>All Claims</button>
            <button onClick={() => setStep("documents")}>Documents</button>
            <button onClick={() => setStep("official-forms")}>Official Provider Forms</button>
          </>
        )}

        {/* Admin */}
        {role === "Admin" && (
          <>
            <button onClick={() => setStep("admin-dashboard")}>
              📊 Dashboard
            </button>

            <button onClick={() => setStep("users")}>👨‍💼 Staff</button>

            <button onClick={() => setStep("doctors")}>👨‍⚕️ Doctors</button>

            <button onClick={() => setStep("patients")}>🧑 Patients</button>

            <button onClick={() => setStep("add-room")}>🛏 Add Rooms</button>

            <button onClick={() => setStep("room-inventory")}>
              🏨 Room Inventory
            </button>

            <button onClick={() => setStep("inventory")}>
              📦 Inventory Management
            </button>

            <button onClick={() => setStep("billing")}>💰 Generate Bill</button>

            <button onClick={() => setStep("income")}>📈 Income</button>

            <button onClick={() => setStep("expense")}>📉 Expense</button>

            {/* <button onClick={() => setStep("analytics")}>📊 Analytics</button> */}

            <button onClick={() => setStep("charges")}>
              💳 Charges Management
            </button>

            <button onClick={() => setStep("insurance")}>
              🛡 Insurance Records
            </button>
            <button onClick={() => setStep("insurance-master")}>
              🛡 Insurance Master
            </button>
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
        <div className="topbar">
          <span>{role} Panel</span>
          {(role === "Insurance" || role === "Admin") && <NotificationBell />}
        </div>

        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
