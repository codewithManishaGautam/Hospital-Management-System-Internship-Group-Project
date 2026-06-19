import React from "react";
import DoctorNavItem from "./DoctorNavItem";

function DoctorSideNav({ active, onNavigate }) {
  return (
    <div className="doctor-nav" role="navigation" aria-label="Doctor navigation">
      <div className="doctor-nav__section">
        <div className="doctor-nav__title">Navigation</div>

        <DoctorNavItem
          active={active === "patients"}
          icon="🧑‍⚕️"
          label="Total Patients"
          onClick={() => onNavigate("patients")}
        />

        <DoctorNavItem
          active={active === "appointments"}
          icon="📅"
          label="Today Appointments"
          onClick={() => onNavigate("appointments")}
        />

        <DoctorNavItem
          active={active === "reports"}
          icon="🧾"
          label="Pending Reports"
          onClick={() => onNavigate("reports")}
        />

        <DoctorNavItem
          active={active === "emergency"}
          icon="🚨"
          label="Emergency Cases"
          onClick={() => onNavigate("emergency")}
        />
      </div>

      <div className="doctor-nav__section">
        <div className="doctor-nav__title">Doctor</div>
        <DoctorNavItem
          active={active === "profile"}
          icon="👨‍⚕️"
          label="Profile"
          onClick={() => onNavigate("profile")}
        />
        <DoctorNavItem
          active={active === "prescriptions"}
          icon="💊"
          label="Prescriptions"
          onClick={() => onNavigate("prescriptions")}
        />
        <DoctorNavItem
          active={active === "analytics"}
          icon="📈"
          label="Analytics"
          onClick={() => onNavigate("analytics")}
        />
      </div>
    </div>
  );
}

export default DoctorSideNav;

