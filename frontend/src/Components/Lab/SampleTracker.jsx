import React from "react";
import "../../styles/Lab/SampleTracker.css";

function SampleTracker({ labData }) {
  return (
    <div>
      <h2>Sample Tracker</h2>

      {labData.length === 0 ? (
        <p>No Samples Available</p>
      ) : (
        labData.map((patient) => (
          <div key={patient.id}>
            <p>{patient.patientName} - Sample Collected</p>
          </div>
        ))
      )}
    </div>
  );
}

export default SampleTracker;