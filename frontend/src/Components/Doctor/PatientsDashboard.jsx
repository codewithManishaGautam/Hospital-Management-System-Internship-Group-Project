import React from "react";
import PatientTable from "./PatientTable";

import "../../styles/doctor/patientManagement.css";

function PatientsDashboard({ patients }) {
  console.log("History Patients =", patients);

  return (
    <div className="patients-dashboard">
      <div className="patients-header">
        <h2 className="patients-title">My Patients</h2>

        <p className="patients-subtitle">
          View complete history of your patients.
        </p>
      </div>

      <div className="patients-table-card">
        <PatientTable patients={patients} />
      </div>
    </div>
  );
}

export default PatientsDashboard;
