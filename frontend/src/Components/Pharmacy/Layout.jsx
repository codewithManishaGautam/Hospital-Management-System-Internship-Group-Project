import React from "react";

function Layout({ role, children, setStep }) {
    return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
          />

          <h3>{role}</h3>
        </div>

        {/* Pharmacy Menu */}
        {role === "Pharmacy" && (
          <>
            <button onClick={() => setStep("dashboard")}>
              Pharmacy Dashboard
            </button>

            <button onClick={() => setStep("payments")}>Payments</button>
          </>
        )}

        {/* Logout */}
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

      {/* Main Content */}
      <div className="main">
        <div className="topbar">{role} Panel</div>

        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
