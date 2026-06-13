import React from "react";

const variants = {
  success: { label: "success", bg: "rgba(34,197,94,0.15)", fg: "#16a34a" },
  warning: { label: "warning", bg: "rgba(245,158,11,0.18)", fg: "#d97706" },
  danger: { label: "danger", bg: "rgba(239,68,68,0.15)", fg: "#dc2626" },
  info: { label: "info", bg: "rgba(37,99,235,0.15)", fg: "#2563eb" },
  neutral: { label: "neutral", bg: "rgba(148,163,184,0.18)", fg: "#475569" },
};

function StatusBadge({ variant = "neutral", children }) {
  const v = variants[variant] || variants.neutral;
  return (
    <span
      className="doctor-status-badge"
      style={{ background: v.bg, color: v.fg }}
    >
      {children}
    </span>
  );
}

export default StatusBadge;

