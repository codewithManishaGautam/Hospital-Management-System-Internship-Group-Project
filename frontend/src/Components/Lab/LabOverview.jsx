import React from "react";
import "../../styles/Lab/LabOverview.css";

function LabOverview() {
  return (
    <div className="lab-card">
      <h2>Lab Dashboard</h2>

      <div className="stats">
        <div className="stat-box">
          <h3>120</h3>
          <p>Total Tests</p>
        </div>

        <div className="stat-box">
          <h3>18</h3>
          <p>Pending Reports</p>
        </div>

        <div className="stat-box">
          <h3>95</h3>
          <p>Completed Tests</p>
        </div>
      </div>
    </div>
  );
}

export default LabOverview;