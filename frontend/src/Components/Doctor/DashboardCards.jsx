import React from "react";

function DashboardCards({ appointments }) {
  const today = new Date().toISOString().split("T")[0];

  // Only today's appointments
  const todayAppointments = appointments.filter(
    (item) => item.appointmentDate === today
  );

  // Pending appointments of today
  const pending = todayAppointments.filter(
    (item) => item.status === "Pending"
  ).length;

  return (
    <div className="doctor-cards">
      <div className="doctor-card">
        <h3>Today's Appointments</h3>
        <h1>{todayAppointments.length}</h1>
      </div>

      <div className="doctor-card">
        <h3>Pending</h3>
        <h1>{pending}</h1>
      </div>
    </div>
  );
}

export default DashboardCards;