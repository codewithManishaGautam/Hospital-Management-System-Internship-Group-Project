import React from "react";
import "../../styles/Nurse/PreviousReports.css";

export default function PreviousReports({
  nursingReports = [],
}) {
  return (
    <div className="previousReports">
      <h2>Previous Daily Reports</h2>

      {nursingReports.length === 0 ? (
        <p>No previous nursing reports available.</p>
      ) : (
        nursingReports.map((report, index) => (
          <div
            className="reportCard"
            key={report._id || index}
          >
            <h3>
              {report.day || `Day ${index + 1}`}
            </h3>

            {report.createdAt && (
              <p>
                <strong>Date & Time:</strong>{" "}
                {new Date(report.createdAt).toLocaleString("en-IN")}
              </p>
            )}

            <p>
              <strong>BP:</strong>{" "}
              {report.bp || "-"}
            </p>

            <p>
              <strong>Pulse:</strong>{" "}
              {report.pulse || "-"}
            </p>

            <p>
              <strong>Temperature:</strong>{" "}
              {report.temperature || "-"}
            </p>

            <p>
              <strong>SpO2:</strong>{" "}
              {report.spo2 || "-"}
            </p>

            <p>
              <strong>Sugar:</strong>{" "}
              {report.sugar || "-"}
            </p>

            <p>
              <strong>Intake:</strong>{" "}
              {report.intake || "-"}
            </p>

            <p>
              <strong>Output:</strong>{" "}
              {report.output || "-"}
            </p>

            <p>
              <strong>Nursing Notes:</strong>{" "}
              {report.notes || "-"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}