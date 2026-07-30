import React from "react";
import DashboardCards from "./DashboardCards";
import PatientTable from "./PatientTable";

import "../../styles/doctor/doctorDashboard.css";

function Dashboard({ doctorName, patients }) {
  console.log("Dashboard Loaded");
  console.log("Patients =", patients);

  return (
    <div className="doctor-dashboard">
      <div className="doctor-dashboard-header">
        <h2 className="doctor-dashboard-title">Welcome Dr. {doctorName}</h2>

        <p className="doctor-dashboard-subtitle">
          Have a great day. Here is today's overview.
        </p>
      </div>

      <DashboardCards patients={patients} />

      <div className="doctor-table-section">
        <PatientTable patients={patients} />
      </div>
    </div>
  );
}

export default Dashboard;
