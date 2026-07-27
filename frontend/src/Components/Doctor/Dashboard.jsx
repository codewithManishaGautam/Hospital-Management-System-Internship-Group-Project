import React from "react";
import DashboardCards from "./DashboardCards";
import PatientTable from "./PatientTable";

function Dashboard({ doctorName, patients }) {

  console.log("Dashboard Loaded");
  console.log("Patients =", patients);

  return (
    <>
      <h2>Welcome Dr. {doctorName}</h2>

      <DashboardCards patients={patients} />

      <PatientTable patients={patients} />
    </>
  );
}

export default Dashboard;