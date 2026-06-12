import React from "react";
import DoctorSidebar from "./DoctorSidebar";

function DoctorShell({ active, onNavigate, children, doctor, onLogout }) {
  return (
    <div className="doctor-shell">
      <DoctorSidebar
        active={active}
        onNavigate={onNavigate}
        doctor={doctor}
        onLogout={onLogout}
      />

      <div className="doctor-shell__content">
        <div className="doctor-shell__contentInner">{children}</div>
      </div>
    </div>
  );
}


export default DoctorShell;


