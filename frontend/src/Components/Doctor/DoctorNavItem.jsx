import React from "react";

function DoctorNavItem({ active, icon, label, onClick }) {
  return (
    <button
      type="button"
      className={active ? "doctor-sidebar-item doctor-sidebar-item--active" : "doctor-sidebar-item"}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
    >
      <span className="doctor-sidebar-item__icon" aria-hidden="true">{icon}</span>
      <span className="doctor-sidebar-item__label">{label}</span>
    </button>
  );
}

export default DoctorNavItem;


