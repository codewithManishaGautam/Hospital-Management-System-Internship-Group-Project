import React from "react";
import DoctorNavItem from "./DoctorNavItem";

function DoctorSidebar({ active, onNavigate, doctor, onLogout }) {
  return (
    <div className="doctor-sidebar" role="navigation" aria-label="Doctor sidebar">
      {/* Doctor Profile (top) */}
      <div className="doctor-sidebar__profile">
        <div className="doctor-sidebar__avatar" aria-hidden="true">
          👨‍⚕️
        </div>
        <div className="doctor-sidebar__profileText">
          <div className="doctor-sidebar__doctorTitle">Doctor Profile</div>
          <div className="doctor-sidebar__doctorName">{doctor?.name || "Dr."}</div>
        </div>
      </div>

      {/* Menu */}
      <div className="doctor-sidebar__menu">
        {/* Primary */}
        <DoctorNavItem
          active={active === "dashboard"}
          icon="🏠"
          label="Dashboard"
          onClick={() => onNavigate("dashboard")}
        />

        <DoctorNavItem
          active={active === "profile"}
          icon="👨‍⚕️"
          label="My Profile"
          onClick={() => onNavigate("profile")}
        />

        <DoctorNavItem
          active={active === "appointments"}
          icon="📅"
          label="Appointments"
          onClick={() => onNavigate("appointments")}
        />

        <DoctorNavItem
          active={active === "patients"}
          icon="🧑"
          label="Patients"

          onClick={() => onNavigate("patients")}
        />

        <DoctorNavItem
          active={active === "prescriptions"}
          icon="💊"
          label="Prescriptions"
          onClick={() => onNavigate("prescriptions")}
        />

        <DoctorNavItem
          active={active === "reports"}
          icon="🧪"
          label="Medical Reports"
          onClick={() => onNavigate("reports")}
        />

        <DoctorNavItem
          active={active === "emergency"}
          icon="🚨"
          label="Emergency Cases"
          onClick={() => onNavigate("emergency")}
        />

        <DoctorNavItem
          active={active === "schedule"}
          icon="🕒"
          label="Doctor Schedule"
          onClick={() => onNavigate("schedule")}
        />

        <DoctorNavItem
          active={active === "notifications"}
          icon="🔔"
          label="Notifications"
          onClick={() => onNavigate("notifications")}
        />
      </div>

      {/* Logout (bottom fixed) */}
      <div className="doctor-sidebar__spacer" />
      <button type="button" className="doctor-sidebar__logout" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default DoctorSidebar;




