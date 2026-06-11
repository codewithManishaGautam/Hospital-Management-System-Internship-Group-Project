import React from "react";
import "./Layout.css";

const user = JSON.parse(localStorage.getItem("user"));

console.log("LAYOUT FILE LOADED");

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

          <h3>{user?.name}</h3>

          <p
            style={{
              fontSize: "12px",
              color: "ddd",
              marginTop: "8px",
            }}
          >
            {user?.role}
          </p>

          <p
            style={{
              fontSize: "11px",
              color: "#bbb",
              wordBreak: "break-word",
            }}
          >
            {user.email}
          </p>
        </div>

        {/* Receptionist */}
        {role === "Receptionist" && (
          <button onClick={() => setStep("register")}>Register Patient</button>
        )}

        {/* {["Doctor", "Lab", "Pharmacy", "Bill", "Insurance"].includes(role) && ( */}
        {/* Doctor */}
        {role === "Doctor" && (
          <>
            <button onClick={() => setStep("dashboard")}>Dashboard</button>
            <button onClick={() => setStep("doctors")}>Doctors</button>
            <button onClick={() => setStep("appointments")}>
              Appointments
            </button>
            <button onClick={() => setStep("prescription")}>
              Prescription
            </button>
            <button onClick={() => setStep("schedule")}>Schedule</button>
            <button onClick={() => setStep("profile")}>Profile</button>
          </>
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
            {/* <h1 style={{ color: "red" }}>TEST BUTTON</h1> */}

            <button onClick={() => setStep("admin-dashboard")}>
              Admin Dashboard
            </button>
            <button onClick={() => setStep("users")}>Manage Users</button>
            <button onClick={() => setStep("doctors")}>Manage Doctors</button>
            <button onClick={() => setStep("patients")}>Patients</button>
            {/* <button onClick={() => setStep("passwords")}>
              Password Management
            </button> */}
            {/* <button onClick={() => 
            {
                console.log("Password Clicked");
                setStep("passwords");
              }
            }
            >
              Password Management
            </button> */}
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
