import React from "react";
import "../../styles/Lab/ReportHistory.css";

function ReportHistory({ labData = [] }) {
  return (
    <div>
      <h2>Report History</h2>

      {labData.length === 0 ? (
        <p>No Reports Available</p>
      ) : (
        labData.map((patient) => (
          <div key={patient.id}>
            <p>{patient.patientName}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ReportHistory;