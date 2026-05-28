import React from "react";
import DoctorNavItem from "./DoctorNavItem";

function DoctorSidebar({ active, onNavigate, doctor, onLogout }) {
  return (
    <div className="doctor-sidebar" role="navigation" aria-label="Doctor sidebar">
      <div className="doctor-sidebar__profile">
        <div className="doctor-sidebar__avatar" aria-hidden="true">
          👨‍⚕️
        </div>
        <div className="doctor-sidebar__profileText">
          <div className="doctor-sidebar__doctorTitle">Doctor</div>
          <div className="doctor-sidebar__doctorName">{doctor?.name || "Dr."}</div>
        </div>
      </div>


      <div className="doctor-sidebar__menu">
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

      <div className="doctor-sidebar__spacer" />

      <button type="button" className="doctor-sidebar__logout" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default DoctorSidebar;

