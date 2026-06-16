import React from "react";
import "../../styles/Nurse/Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboardCards">

      <div className="card blue">
        <h2>Total Patients</h2>
        <p>4</p>
      </div>

      <div className="card red">
        <h2>Critical Patients</h2>
        <p>2</p>
      </div>

      <div className="card green">
        <h2>Available Beds</h2>
        <p>14</p>
      </div>

    </div>
  );
}