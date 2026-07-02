import React from "react";
import LabDataEntry from "./LabDataEntry";
import "../../styles/Lab/PatientRecords.css";

function PatientRecords({ labData, setLabData }) {
  return (
    <div className="patient-records">
      <h2>Patient Records</h2>
      <p className="patient-records__intro">
        Add new patient details for the lab module and review the saved records below.
      </p>

      <LabDataEntry labData={labData} setLabData={setLabData} />

      <section className="patient-records__list">
        <h3>Saved Lab Patients</h3>

        {labData.length === 0 ? (
          <p className="patient-records__empty">No patients entered yet.</p>
        ) : (
          labData.map((patient) => (
            <article key={patient.id} className="patient-records__card">
              <div>
                <strong>{patient.patientName}</strong>
              </div>
              <div>Test: {patient.testName || "Not specified"}</div>
              <div>Sample: {patient.sampleStatus || "Pending"}</div>
              <div>Payment: {patient.paymentStatus || "Unpaid"}</div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}

export default PatientRecords;