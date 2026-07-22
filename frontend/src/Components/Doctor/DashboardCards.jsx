import React from "react";

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
        <h3>Today's Appointments</h3>
        <h1>{todayPatients.length}</h1>
      </div>

      <div className="doctor-card">
        <h3>Pending</h3>
        <h1>{pendingPatients.length}</h1>
      </div>
    </div>
  );
}

export default DashboardCards;
