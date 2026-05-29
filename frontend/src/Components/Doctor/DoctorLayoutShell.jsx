import React from "react";
import DoctorShell from "./DoctorShell";

// Doctor-only wrapper: do NOT use the global Layout.jsx (it renders a second sidebar).
function DoctorLayoutShell({ step, onNavigate, doctor, onLogout, children }) {
  return (
    <div className="doctor-shell">
      <DoctorShell
        active={step}
        onNavigate={onNavigate}
        doctor={doctor}
        onLogout={onLogout}
      >
        {children}
      </DoctorShell>
    </div>
  );
}

export default DoctorLayoutShell;

