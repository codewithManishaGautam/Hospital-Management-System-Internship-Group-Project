import React from "react";

// This wrapper keeps doctor sidebar items isolated from the existing DoctorNavItem.
function DoctorNavItemDoctorSidebar({ active, icon, label, onClick }) {
  return (
    <button
      type="button"
      className={active ? "doctor-sidebar-item doctor-sidebar-item--active" : "doctor-sidebar-item"}
      onClick={onClick}
    >
      <span className="doctor-sidebar-item__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="doctor-sidebar-item__label">{label}</span>
    </button>
  );
}

export default DoctorNavItemDoctorSidebar;

