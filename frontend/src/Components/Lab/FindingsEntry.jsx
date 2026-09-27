import React from "react";
import "../../styles/Lab/FindingsEntry.css";

function FindingsEntry({ labData }) {
  return (
  <div className="findings-panel">
  <h2>Result Entry</h2>

  {labData.map((patient) => (
    <div className="findings-patient" key={patient.id}>
      <p>{patient.patientName} - Result Pending</p>
    </div>
  ))}
</div>
  );
}

export default FindingsEntry;