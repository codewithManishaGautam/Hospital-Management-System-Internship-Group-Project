import React from "react";
import PatientTable from "./PatientTable";

function PatientsDashboard({ patients }) {
  console.log("History Patients =", patients);

  return (
    <>
      <h2>My Patients</h2>

      <PatientTable patients={patients} />
    </>
  );
}

export default PatientsDashboard;
