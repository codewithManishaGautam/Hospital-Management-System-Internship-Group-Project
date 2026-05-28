import React from "react";

function DoctorNavItem({ active, icon, label, onClick }) {
  return (
    <button
      type="button"
      className={active ? "doctor-nav-item doctor-nav-item--active" : "doctor-nav-item"}
      onClick={onClick}
    >
      <span className="doctor-nav-item__icon" aria-hidden="true">{icon}</span>
      <span className="doctor-nav-item__label">{label}</span>
    </button>
  );
}

export default DoctorNavItem;

