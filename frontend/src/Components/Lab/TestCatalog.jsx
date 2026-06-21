import React from "react";
import "../../styles/Lab/TestCatalog.css";

function TestCatalog({ labData }) {
  return (
    <div>
      <h2>Test Catalog</h2>

      {labData.length === 0 ? (
        <p>No Patients Available</p>
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

export default TestCatalog;