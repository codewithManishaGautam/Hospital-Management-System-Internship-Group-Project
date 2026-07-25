import React from "react";
import StatusBadge from "./StatusBadge";

function AppointmentCard({ appt, onAccept, onReject }) {
  const variant =
    appt.status === "Accepted"
      ? "success"
      : appt.status === "Rejected"
      ? "danger"
      : appt.status === "Pending"
      ? "warning"
      : "info";

  const canAct = appt.status === "Pending";

  return (
    <div className="doctor-appt-card">
      <div className="doctor-appt-card__top">
        <div className="doctor-appt-card__title">
          {appt.patientName}
          <span className="doctor-appt-card__time">• {appt.time}</span>
        </div>
        <StatusBadge variant={variant}>{appt.status}</StatusBadge>
      </div>

      <div className="doctor-appt-card__meta">
        <div className="doctor-appt-kv">
          <div className="doctor-appt-kv__k">Department</div>
          <div className="doctor-appt-kv__v">{appt.department}</div>
        </div>
        <div className="doctor-appt-kv">
          <div className="doctor-appt-kv__k">Date</div>
          <div className="doctor-appt-kv__v">{appt.date}</div>
        </div>
      </div>

      <div className="doctor-appt-card__actions">
        {canAct ? (
          <>
            <button type="button" className="doctor-btn doctor-btn--primary" onClick={() => onAccept(appt)}>
              Accept
            </button>
            <button type="button" className="doctor-btn doctor-btn--danger" onClick={() => onReject(appt)}>
              Reject
            </button>
          </>
        ) : (
          <div className="doctor-appt-card__hint">Status updates are managed by the system.</div>
        )}
      </div>
    </div>
  );
}

export default AppointmentCard;

