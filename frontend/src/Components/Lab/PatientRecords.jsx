import React from "react";
import "../../styles/Lab/PatientRecords.css";

function PatientRecords({ labData, setLabData }) {
  return (
    <div className="patient-records">
      <h2>Patient Records</h2>
      <p className="patient-records__intro">
        Patients and lab tests prescribed by doctors are shown below.
      </p>

      {/* <LabDataEntry labData={labData} setLabData={setLabData} /> */}

      <section className="patient-records__list">
        <h3>Saved Lab Patients</h3>

   {labData.length === 0 ? (
  <p className="patient-records__empty">
    No doctor prescribed lab tests available.
  </p>
) : (
  labData.map((patient) => (
    <article
      key={patient._id}
      className="patient-records__card"
    >
      <div>
        <strong>{patient.name}</strong>
      </div>

      <div>
        UHID: {patient.uhid || "N/A"}
      </div>

      <div>
        Age: {patient.age || "N/A"}
      </div>

      <div>
        Gender: {patient.gender || "N/A"}
      </div>

      <div>
        Doctor:{" "}
        {typeof patient.doctor === "string"
          ? patient.doctor
          : patient.doctor?.name || "N/A"}
      </div>

      <div>
        Prescribed Tests:{" "}
        {patient.labTests?.length > 0
          ? patient.labTests.join(", ")
          : "No tests prescribed"}
      </div>

      <div>
        Status: {patient.status || "Pending"}
      </div>
    </article>
  ))
)}
      </section>
    </div>
  );
}

export default PatientRecords;