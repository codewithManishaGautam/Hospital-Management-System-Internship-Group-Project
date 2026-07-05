import React from "react";
import "../../styles/Lab/ReportHub.css";

function ReportHub({ labData }) {
  return (
    <div>
      <h2>Reports</h2>

      {labData.map((patient) => (
        <div key={patient.id}>
          <p>{patient.patientName} - Report Generated</p>
        </div>
      ))}
    </div>
  );
}

export default ReportHub;