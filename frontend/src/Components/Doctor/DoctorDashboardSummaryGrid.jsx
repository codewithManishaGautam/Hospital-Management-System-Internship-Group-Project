import React from "react";
import DashboardCard from "./DashboardCard";

function DoctorDashboardSummaryGrid({ cards }) {
  return (
    <div className="doctor-summaryGrid" aria-label="Doctor summary">
      {cards.map((c) => (
        <div key={c.title} className="doctor-summaryGrid__cardCol">
          <DashboardCard
            title={c.title}
            value={c.value}
            icon={c.icon}
            accent={c.accent}
            onClick={c.onClick}
          />
          {c.description ? <div className="doctor-summaryGrid__desc">{c.description}</div> : null}
        </div>
      ))}
    </div>
  );
}

export default DoctorDashboardSummaryGrid;

