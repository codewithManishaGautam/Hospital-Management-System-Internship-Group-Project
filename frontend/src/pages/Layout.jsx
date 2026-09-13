import React, { useState } from "react";
import "./Layout.css";

function Layout({ role, children, step, setStep }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleStep = (step) => {
    setStep(step);
    setSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
        ☰
      </button>

      {/* SIDEBAR */}
      <div className={`app-sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="app-profile">
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
            <button
              className={step === "dashboard" ? "active-menu" : ""}
              onClick={() => handleStep("dashboard")}
            >
              🏠 Dashboard
            </button>

            <button
              className={step === "profile-dashboard" ? "active-menu" : ""}
              onClick={() => handleStep("profile-dashboard")}
            >
              👤 Profile
            </button>

            <button
              className={step === "patients" ? "active-menu" : ""}
              onClick={() => handleStep("patients")}
            >
              🧑 Patients
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
          <button onClick={() => setStep("patientList")}>
            👨‍⚕️ Patient List
          </button>
        )}

        {/* Insurance */}
        {role === "Insurance" && (
          <>
            <button onClick={() => setStep("dashboard")}>Overview</button>
            <button onClick={() => setStep("cases")}>Insurance Cases</button>
            <button onClick={() => setStep("admission-wizard")}>
              New Admission Workflow
            </button>
            <button onClick={() => setStep("register-policy")}>
              Register Policy
            </button>
            <button onClick={() => setStep("enroll-scheme")}>
              Enroll Scheme
            </button>
            <button onClick={() => setStep("pre-auth")}>
              Pre-Auth Requests
            </button>
            <button onClick={() => setStep("claims")}>All Claims</button>
            <button onClick={() => setStep("documents")}>Documents</button>
            <button onClick={() => setStep("official-forms")}>
              Official Provider Forms
            </button>
          </>
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
          className="app-logout"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div className="app-main">
        <div className="app-topbar">{role} Panel</div>

        <div className="app-content">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
