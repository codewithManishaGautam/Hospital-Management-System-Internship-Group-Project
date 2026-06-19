import React from "react";

function DashboardWidgetTitle({ title, subtitle, right }) {
  return (
    <div className="doctor-widgetTitle">
      <div>
        <p className="doctor-widgetTitle__title">{title}</p>
        {subtitle ? <p className="doctor-widgetTitle__subtitle">{subtitle}</p> : null}
      </div>
      {right ? <div className="doctor-widgetTitle__right">{right}</div> : null}
    </div>
  );
}

export default DashboardWidgetTitle;

