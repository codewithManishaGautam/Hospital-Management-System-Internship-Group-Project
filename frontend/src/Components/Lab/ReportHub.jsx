import React from "react";
import "../../styles/Lab/ReportHub.css";

function ReportHub({ labData }) {
  return (
    <div className="report-hub">
      <h2>Reports</h2>

      {labData.map((patient) => (
        <div
          key={patient.id}
          className="report-hub__card"
        >
          <p>
            {patient.patientName} - Report Generated
          </p>
        </div>
      ))}
    </div>
  );
}

export default ReportHub;