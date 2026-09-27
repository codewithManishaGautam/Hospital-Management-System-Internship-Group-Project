import React from "react";
import "../../styles/Lab/ReportHistory.css";

function ReportHistory({ labData = [] }) {
  return (
    <div className="report-history">
      <h2>Report History</h2>

      {labData.length === 0 ? (
        <p className="report-history__empty">
          No Reports Available
        </p>
      ) : (
        labData.map((patient) => (
          <div
            key={patient.id}
            className="report-history__card"
          >
            <p>{patient.patientName}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ReportHistory;