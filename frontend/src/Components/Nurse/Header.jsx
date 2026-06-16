import React from "react";
import "../../styles/Nurse/Header.css";

export default function Header({ selectedPatient }) {
  return (
    <>
      <div className="hospitalHeader">

        <h1>SHRADDHA HOSPITAL & ICU</h1>

        <p>Mira Society Road, Daund, Pune</p>

        <p>Mo.No : 9876543210</p>

      </div>

      <div className="chartPatientInfo">

        <p>
          <strong>Patient :</strong>{" "}
          {selectedPatient.name}
        </p>

        <p>
          <strong>Doctor :</strong>{" "}
          {selectedPatient.doctor}
        </p>

        <p>
          <strong>Admission :</strong>{" "}
          {selectedPatient.admissionDate}
        </p>

        <p>
          <strong>Discharge :</strong>{" "}
          {selectedPatient.dischargeDate}
        </p>

      </div>
    </>
  );
}