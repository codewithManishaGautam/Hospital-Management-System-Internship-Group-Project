import React from "react";
import "../../styles/Lab/AnalysisPanel.css";

function AnalysisPanel({ labData }) {
  return (
    <div>
      <h2>Analysis Panel</h2>

      {labData.map((patient) => (
        <div key={patient.id}>
          <p>{patient.patientName} - Analysis Pending</p>
        </div>
      ))}
    </div>
  );
}

export default AnalysisPanel;