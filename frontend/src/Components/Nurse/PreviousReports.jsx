import React from "react";
import "../../styles/Nurse/PreviousReports.css";

export default function PreviousReports({ nursingReports = [] }) {
  return (
    <div className="previousReports">
      <h2>Previous Daily Reports</h2>

      {nursingReports.length === 0 ? (
        <p>No previous nursing reports available.</p>
      ) : (
        nursingReports.map((r, i) => (
          <div className="reportCard" key={r._id || i}>
            <h3>
              Report {i + 1}
              {r.createdAt
                ? ` - ${new Date(r.createdAt).toLocaleString()}`
                : ""}
            </h3>

            <p>BP : {r.bp || "-"}</p>
            <p>Pulse : {r.pulse || "-"}</p>
            <p>Temperature : {r.temperature || "-"}</p>
            <p>SpO2 : {r.spo2 || "-"}</p>
            <p>Sugar : {r.sugar || "-"}</p>
            <p>Intake : {r.intake || "-"}</p>
            <p>Output : {r.output || "-"}</p>
            <p>Notes : {r.notes || "-"}</p>
          </div>
        ))
      )}
    </div>
  );
}
