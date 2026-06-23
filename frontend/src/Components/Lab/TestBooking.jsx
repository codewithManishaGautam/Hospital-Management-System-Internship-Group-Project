import React from "react";
import "../../styles/Lab/TestBooking.css";

function TestBooking({ labData }) {
  return (
    <div>
      <h2>Test Booking</h2>

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

export default TestBooking;