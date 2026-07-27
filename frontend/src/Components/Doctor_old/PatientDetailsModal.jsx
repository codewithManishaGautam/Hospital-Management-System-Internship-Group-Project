import React, { useMemo, useState } from "react";
import StatusBadge from "./StatusBadge";

function PatientDetailsModal({ patient, onClose, onAddPrescription }) {
  const [tab, setTab] = useState("history");

  const history = useMemo(() => {
    if (!patient) return [];
    return patient.history || [];
  }, [patient]);

  if (!patient) return null;

  return (
    <div className="doctor-modal-overlay" role="dialog" aria-modal="true">
      <div className="doctor-modal">
        <div className="doctor-modal__header">
          <div>
            <div className="doctor-modal__title">Patient Details</div>
            <div className="doctor-modal__subtitle">
              {patient.name} • UHID: {patient.uHID}
            </div>
          </div>
          <button
            type="button"
            className="doctor-icon-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="doctor-modal__tabs">
          <button
            type="button"
            className={
              tab === "history" ? "doctor-tab doctor-tab--active" : "doctor-tab"
            }
            onClick={() => setTab("history")}
          >
            History
          </button>
          <button
            type="button"
            className={
              tab === "reports" ? "doctor-tab doctor-tab--active" : "doctor-tab"
            }
            onClick={() => setTab("reports")}
          >
            Reports
          </button>
          <button
            type="button"
            className={
              tab === "prescription"
                ? "doctor-tab doctor-tab--active"
                : "doctor-tab"
            }
            onClick={() => setTab("prescription")}
          >
            Prescription
          </button>
        </div>

        <div className="doctor-modal__body">
          <div className="doctor-patient-summary">
            <div className="doctor-patient-summary__left">
              <div className="doctor-kv">
                <div className="doctor-kv__k">Condition</div>
                <div className="doctor-kv__v">{patient.condition}</div>
              </div>
              <div className="doctor-kv">
                <div className="doctor-kv__k">Phone</div>
                <div className="doctor-kv__v">{patient.phone}</div>
              </div>
              <div className="doctor-kv">
                <div className="doctor-kv__k">Status</div>
                <div className="doctor-kv__v">
                  <StatusBadge
                    variant={
                      patient.status === "Pending"
                        ? "warning"
                        : patient.status === "Critical"
                          ? "danger"
                          : "success"
                    }
                  >
                    {patient.status}
                  </StatusBadge>
                </div>
              </div>
            </div>
            <div className="doctor-patient-summary__right">
              <button
                type="button"
                className="doctor-btn doctor-btn--primary"
                onClick={() => onAddPrescription(patient)}
              >
                Add Prescription
              </button>
            </div>
          </div>

          {tab === "history" && (
            <div className="doctor-history">
              <div className="doctor-history__title">Visit History</div>
              {history.length === 0 ? (
                <div className="doctor-empty">No history available.</div>
              ) : (
                <div className="doctor-history__list">
                  {history.map((h, idx) => (
                    <div key={idx} className="doctor-history-item">
                      <div className="doctor-history-item__date">{h.date}</div>
                      <div className="doctor-history-item__desc">{h.note}</div>
                      <div className="doctor-history-item__treat">
                        Treatment: {h.treatment}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "reports" && (
            <div className="doctor-empty-block">
              <div className="doctor-empty">No reports available.</div>
            </div>
          )}

          {tab === "prescription" && (
            <div className="doctor-empty-block">
              <div className="doctor-empty">No prescriptions available.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientDetailsModal;
