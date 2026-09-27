import React from "react";
import "../../styles/Lab/SampleTracker.css";

function SampleTracker({ labData }) {
  return (
    <div className="sample-tracker">
      <h2>Sample Tracker</h2>

      {labData.length === 0 ? (
        <p className="sample-tracker__empty">
          No Samples Available
        </p>
      ) : (
        labData.map((patient) => (
          <div
            key={patient.id}
            className="sample-tracker__card"
          >
            <p>
              {patient.patientName} - Sample Collected
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default SampleTracker;