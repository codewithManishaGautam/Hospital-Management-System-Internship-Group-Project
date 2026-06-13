import React from "react";

function DashboardCard({ title, value, icon, accent = "#1c53ab", onClick }) {
  return (
    <button
      type="button"
      className="doctor-dashboard-card"
      onClick={onClick}
      style={{ "--accent": accent }}
    >
      <div className="doctor-dashboard-card__icon" aria-hidden="true">
        {icon}
      </div>
      <div className="doctor-dashboard-card__meta">
        <div className="doctor-dashboard-card__title">{title}</div>
        <div className="doctor-dashboard-card__value">{value}</div>
      </div>
    </button>
  );
}

export default DashboardCard;

