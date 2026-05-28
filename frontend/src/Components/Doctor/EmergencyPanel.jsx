import React, { useMemo } from "react";
import StatusBadge from "./StatusBadge";

function EmergencyPanel({ patients }) {
  const emergencyPatients = useMemo(() => {
    return (patients || []).filter((p) => p.status === "Critical" || p.condition === "Cardiac");
  }, [patients]);

  return (
    <div className="doctor-panel--inner">
      <div className="doctor-panel__header" style={{ marginBottom: 12 }}>
        <div>
          <h3 className="doctor-panel__title">Emergency Cases</h3>
          <p className="doctor-panel__subtitle">Priority cases requiring immediate attention</p>
        </div>
        <div className="doctor-panel__actions">
          <div className="doctor-panel__chip">
            {emergencyPatients.length} cases
          </div>
        </div>
      </div>

      <div className="doctor-appts" style={{ gap: 14 }}>
        <div style={{ gridColumn: "span 7" }}>
          <div className="doctor-form__section-title">Emergency Patient List</div>
          <div className="doctor-table-wrap doctor-table-wrap--small">
            <table className="doctor-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Condition</th>
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {emergencyPatients.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="doctor-table__empty">
                      No emergency cases right now.
                    </td>
                  </tr>
                ) : (
                  emergencyPatients.map((p) => (
                    <tr key={p.uHID}>
                      <td style={{ fontWeight: 1000 }}>{p.name}</td>
                      <td>{p.condition}</td>
                      <td>{p.phone}</td>
                      <td>
                        <StatusBadge variant={p.status === "Critical" ? "danger" : "warning"}>{p.status}</StatusBadge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ gridColumn: "span 5" }}>
          <div className="doctor-calendar" style={{ height: "fit-content" }}>
            <div className="doctor-calendar__title">Emergency Notifications</div>
            <div className="doctor-hint" style={{ marginTop: 0 }}>
              Live alerts (UI placeholder)
            </div>

            <div className="doctor-activity" style={{ marginTop: 10 }}>
              {[
                { text: "Critical vitals reported", meta: "Now" },
                { text: "Cardiac patient check-in", meta: "10 minutes ago" },
                { text: "Lab test priority requested", meta: "30 minutes ago" },
              ].map((a, idx) => (
                <div key={idx} className="doctor-activity-item">
                  <div className="doctor-activity-item__left">
                    <div className="doctor-activity-item__dot" />
                    <div className="doctor-activity-item__desc">
                      <div className="doctor-activity-item__text">{a.text}</div>
                      <div className="doctor-activity-item__meta">{a.meta}</div>
                    </div>
                  </div>
                  <div style={{ color: "#dc2626", fontWeight: 1000, fontSize: 12 }}>Action</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
              <button type="button" className="doctor-btn doctor-btn--primary" onClick={() => alert("Emergency triage started (UI placeholder).")}>Triage</button>
              <button type="button" className="doctor-btn" onClick={() => alert("Notify nurse (UI placeholder).")}>Notify</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmergencyPanel;

