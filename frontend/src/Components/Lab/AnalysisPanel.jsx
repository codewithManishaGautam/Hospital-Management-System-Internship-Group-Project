import React from "react";
import "../../styles/Lab/AnalysisPanel.css";

function AnalysisPanel({ labData }) {
  return (
  <div className="analysis-panel">
  <h2>Analysis Panel</h2>

  {labData.map((patient) => (
    <div className="analysis-patient" key={patient.id}>
      <p>{patient.patientName} - Analysis Pending</p>
    </div>
  ))}
</div>
  );
}

export default AnalysisPanel;