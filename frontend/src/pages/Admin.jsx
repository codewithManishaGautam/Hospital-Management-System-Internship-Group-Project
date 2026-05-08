import React, { useState } from "react";
import Layout from "./Layout";
// import "./Admin.css";

function Admin() {
  const [step, setStep] = useState("dashboard");

  return (
    <Layout role="Admin" setStep={setStep}>

      {step === "dashboard" && (
        <div className="card">
          <h2>Admin Dashboard</h2>
        </div>
      )}

      {step === "admin-dashboard" && (
        <div className="card">
          <h2>Stats</h2>
        </div>
      )}

      {step === "users" && (
        <div className="card">
          <h2>Manage Users</h2>
        </div>
      )}

      {step === "doctors" && (
        <div className="card">
          <h2>Manage Doctors</h2>
        </div>
      )}

      {step === "patients" && (
        <div className="card">
          <h2>All Patients</h2>
        </div>
      )}

    </Layout>
  );
}

export default Admin;