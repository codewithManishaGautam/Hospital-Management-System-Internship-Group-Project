import React from "react";

function AnalyticsCard({ title, value, subtitle, accent = "#2563eb" }) {
  return (
    <div className="doctor-analytics-card" style={{ "--accent": accent }}>
      <div className="doctor-analytics-card__body">
        <div className="doctor-analytics-card__title">{title}</div>
        <div className="doctor-analytics-card__value">{value}</div>
        <div className="doctor-analytics-card__subtitle">{subtitle}</div>
      </div>
    </div>
  );
}

export default AnalyticsCard;

