import React from "react";

import "../../styles/doctor/doctorDashboard.css";

function DashboardCards({ patients }) {
  console.log("Patients =", patients);

  const today = new Date().toLocaleDateString("en-CA");
  console.log("Today =", today);

  patients.forEach((p) => {
    console.log(
      "Patient:",
      p.name,
      "Date:",
      p.appointmentDate,
      "Status:",
      p.status,
    );
  });

  const todayPatients = patients.filter((p) => {
    if (!p.appointmentDate) return false;

    return p.appointmentDate.slice(0, 10) === today;
  });

  console.log("Today's Patients =", todayPatients);
  // console.log("Pending Patients =", pendingPatients);

  const pendingPatients = todayPatients.filter(
    (p) => p.status === "Pending" || p.status === "Waiting Doctor",
  );

  console.log("Pending Patients =", pendingPatients);

  return (
    <div className="doctor-cards">
      <div className="doctor-card">
        <div className="doctor-card-icon">📅</div>

        <h3>Today's Appointments</h3>

        <h1>{todayPatients.length}</h1>

        <p>Total scheduled patients</p>
      </div>

      <div className="doctor-card">
        <div className="doctor-card-icon">⏳</div>

        <h3>Pending Patients</h3>

        <h1>{pendingPatients.length}</h1>

        <p>Waiting for consultation</p>
      </div>
    </div>
  );
}

export default DashboardCards;
