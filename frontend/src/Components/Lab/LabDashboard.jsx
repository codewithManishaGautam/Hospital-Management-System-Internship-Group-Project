import React, { useMemo, useState } from "react";
import "../../styles/Lab/labDashboard.css";

const SAMPLE_TESTS = [
  {
    id: "LT-1001",
    patientName: "Aman Sharma",
    testName: "CBC",
    status: "Pending",
    createdAt: "2026-06-18",
  },
  {
    id: "LT-1002",
    patientName: "Neha Gupta",
    testName: "Blood Sugar",
    status: "In Progress",
    createdAt: "2026-06-18",
  },
  {
    id: "LT-1003",
    patientName: "Rohit Verma",
    testName: "LFT",
    status: "Completed",
    createdAt: "2026-06-18",
  },
];

function StatusPill({ status }) {
  const cls =
    status === "Completed"
      ? "pill pill--ok"
      : status === "In Progress"
        ? "pill pill--progress"
        : "pill pill--pending";

  return <span className={cls}>{status}</span>;
}

export default function LabDashboard() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SAMPLE_TESTS;
    return SAMPLE_TESTS.filter((t) => {
      const hay = `${t.id} ${t.patientName} ${t.testName} ${t.status}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  return (
    <div className="labDash">
      <div className="labDash__header">
        <h2 className="labDash__title">Lab Dashboard</h2>

        <div className="labDash__search">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by UHID/Name/Test/Status"
          />
        </div>
      </div>

      <div className="labDash__tableWrap">
        <table className="labDash__table">
          <thead>
            <tr>
              <th>Lab Test ID</th>
              <th>Patient</th>
              <th>Test</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.patientName}</td>
                <td>{t.testName}</td>
                <td>
                  <StatusPill status={t.status} />
                </td>
                <td>{t.createdAt}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="labDash__empty">
                  No lab tests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="labDash__hint">
        UI demo only (sample data). Backend integration can be wired later.
      </div>
    </div>
  );
}

