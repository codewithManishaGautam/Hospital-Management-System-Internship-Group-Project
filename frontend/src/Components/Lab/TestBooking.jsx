import React from "react";
import "../../styles/Lab/TestBooking.css";

function TestBooking({ labData }) {
  return (
    <div className="test-booking">
      <h2>Test Booking</h2>

      {labData.length === 0 ? (
        <p className="test-booking__empty">
          No Doctor Prescribed Tests Available
        </p>
      ) : (
        labData.map((patient) => (
          <div
            key={patient._id}
            className="test-booking__card"
          >
            <p>
              <strong>{patient.name}</strong>
            </p>

            <p>
              UHID: {patient.uhid || "N/A"}
            </p>

            <p>
              Doctor:{" "}
              {typeof patient.doctor === "string"
                ? patient.doctor
                : patient.doctor?.name || "N/A"}
            </p>

            <p>
              Prescribed Tests:{" "}
              {patient.labTests?.length > 0
                ? patient.labTests.join(", ")
                : "No tests prescribed"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default TestBooking;