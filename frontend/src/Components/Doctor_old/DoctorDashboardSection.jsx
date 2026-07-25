import React from "react";

function DoctorDashboardSection({ title, subtitle, right, children, className = "" }) {
  return (
    <section className={`doctor-dashSection ${className}`} aria-label={title}>
      <div className="doctor-dashSection__header">
        <div>
          <p className="doctor-dashSection__title">{title}</p>
          {subtitle ? <p className="doctor-dashSection__subtitle">{subtitle}</p> : null}
        </div>
        {right ? <div className="doctor-dashSection__right">{right}</div> : null}
      </div>
      <div className="doctor-dashSection__body">{children}</div>
    </section>
  );
}

export default DoctorDashboardSection;

