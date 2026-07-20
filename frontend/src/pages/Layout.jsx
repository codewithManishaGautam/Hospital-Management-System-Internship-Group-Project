import React, { useState } from "react";
import "./Layout.css";

function Layout({ role, children, step, setStep }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleStep = (step) => {
    setStep(step);
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard">
      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

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
          <button onClick={() => handleStep("register")}>
            Register Patient
          </button>
        )}

        {role === "Doctor" && (
          <>
            <button onClick={() => handleStep("dashboard")}>
              🏠 Dashboard
            </button>
            <button onClick={() => handleStep("profile-dashboard")}>
              👤 Profile
            </button>
            <button onClick={() => handleStep("appointments")}>
              📅 Appointments
            </button>
            <button onClick={() => handleStep("patients")}>🧑 Patients</button>
            <button onClick={() => handleStep("prescriptions")}>
              💊 Prescriptions
            </button>
            <button onClick={() => handleStep("reports")}>
              🧪 Medical Reports
            </button>
            <button onClick={() => handleStep("emergency")}>
              🚨 Emergency
            </button>
            <button onClick={() => handleStep("schedule")}>🕒 Schedule</button>
            <button onClick={() => handleStep("notifications")}>
              🔔 Notifications
            </button>
            <button onClick={() => handleStep("analytics")}>
              📈 Analytics
            </button>
          </>
        )}

        {role === "Lab" && (
          <>
            <button onClick={() => handleStep("overview")}>🏠 Overview</button>
            <button onClick={() => handleStep("patients")}>🧑 Patients</button>
            <button onClick={() => handleStep("tests")}>🧪 Test Catalog</button>
            <button onClick={() => handleStep("booking")}>📅 Booking</button>
            <button onClick={() => handleStep("samples")}>🧬 Samples</button>
            <button onClick={() => handleStep("analysis")}>🔬 Analysis</button>
            <button onClick={() => handleStep("findings")}>📄 Findings</button>
            <button onClick={() => handleStep("reports")}>📝 Reports</button>
            <button onClick={() => handleStep("payments")}>💰 Billing</button>
            <button onClick={() => handleStep("history")}>📜 History</button>
          </>
        )}

        {["Pharmacy", "Bill", "Insurance"].includes(role) && (
          <button onClick={() => handleStep("patientList")}>
            👨‍⚕️ Patient List
          </button>
        )}

        {/* Admin */}
        {role === "Admin" && (
          <>
            <button
              className={step === "admin-dashboard" ? "active-menu" : ""}
              onClick={() => handleStep("admin-dashboard")}
            >
              📊 Dashboard
            </button>

            <button
              className={step === "users" ? "active-menu" : ""}
              onClick={() => handleStep("users")}
            >
              👨‍💼 Staff
            </button>
            <button
              className={step === "doctors" ? "active-menu" : ""}
              onClick={() => handleStep("doctors")}
            >
              👨‍⚕️ Doctors
            </button>

            <button
              className={step === "patients" ? "active-menu" : ""}
              onClick={() => handleStep("patients")}
            >
              🧑 Patients
            </button>

            <button onClick={() => handleStep("add-room")}>🛏 Add Rooms</button>

            <button onClick={() => handleStep("room-inventory")}>
              🏨 Room Inventory
            </button>

            {/* <button onClick={() => handleStep("add-bed")}>🛌 Add Bed</button> */}
            <button
              className={step === "beds" ? "active-menu" : ""}
              onClick={() => handleStep("beds")}
            >
              🛏 Bed Management
            </button>

            <button onClick={() => handleStep("inventory")}>
              📦 Inventory Management
            </button>

            <button onClick={() => handleStep("billing")}>
              💰 Generate Bill
            </button>

            <button
              className={step === "income" ? "active-menu" : ""}
              onClick={() => handleStep("income")}
            >
              📈 Income
            </button>

            <button
              className={step === "expense" ? "active-menu" : ""}
              onClick={() => handleStep("expense")}
            >
              📉 Expense
            </button>

            {/* <button onClick={() => handleStep("analytics")}>📊 Analytics</button> */}

            <button onClick={() => handleStep("charges")}>
              💳 Charges Management
            </button>

            <button onClick={() => handleStep("insurance")}>
              🛡 Insurance Records
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
        <div className="topbar">{role} Panel</div>

        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
