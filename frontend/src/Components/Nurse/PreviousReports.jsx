import React from "react";
import "../../styles/Nurse/PreviousReports.css";

export default function PreviousReports({
  nursingReports
}) {
  return (
    <div className="previousReports">

      <h2>Previous Daily Reports</h2>

      {nursingReports.map((r, i) => (

        <div className="reportCard" key={i}>

          <h3>{r.day}</h3>

          <p>BP : {r.bp}</p>
          <p>Pulse : {r.pulse}</p>
          <p>Temp : {r.temp}</p>
          <p>SpO2 : {r.spo2}</p>
          <p>Sugar : {r.sugar}</p>
          <p>Intake : {r.intake}</p>
          <p>Output : {r.output}</p>
          <p>Notes : {r.notes}</p>

        </div>

      ))}

    </div>
  );
}