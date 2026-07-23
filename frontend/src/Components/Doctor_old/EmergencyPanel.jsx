import React, { useMemo } from "react";
import StatusBadge from "./StatusBadge";

function EmergencyPanel({ patients }) {
  const emergencyPatients = useMemo(() => {
    return (patients || []).filter(
      (p) => p.status === "Critical" || p.condition === "Cardiac",
    );
  }, [patients]);

  return (
    <div className="doctor-panel--inner">
      <div className="doctor-panel__header" style={{ marginBottom: 12 }}>
        <div>
          <h3 className="doctor-panel__title">Emergency Cases</h3>
          <p className="doctor-panel__subtitle">
            Priority cases requiring immediate attention
          </p>
        </div>
        <div className="doctor-panel__actions">
          <div className="doctor-panel__chip">
            {emergencyPatients.length} cases
          </div>
        </div>
      </div>

      <div className="doctor-emergencyGrid">
        <div className="doctor-emergencyGrid__left">
          <div className="doctor-form__section-title">
            Emergency Patient List
          </div>
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
                      <td style={{ fontWeight: 1000 }}>
                        <div>{p.name}</div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "var(--doctor-muted)",
                            fontWeight: 900,
                          }}
                        >
                          {p.uHID}
                        </div>
                      </td>
                      <td>{p.condition}</td>
                      <td>{p.phone}</td>
                      <td>
                        <StatusBadge
                          variant={
                            p.status === "Critical" ? "danger" : "warning"
                          }
                        >
                          {p.status}
                        </StatusBadge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="doctor-emergencyGrid__right">
          <div className="doctor-calendar" style={{ height: "fit-content" }}>
            <div className="doctor-calendar__title">
              Emergency Notifications
            </div>
            <div className="doctor-hint" style={{ marginTop: 0 }}>
              Live alerts (UI placeholder)
            </div>

            <div className="doctor-activity" style={{ marginTop: 10 }}>
              <div className="doctor-hint">
                Emergency notifications will appear here once available.
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginTop: 12,
              }}
            >
              <button className="doctor-btn doctor-btn--primary">Triage</button>

              <button className="doctor-btn">Notify</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmergencyPanel;
