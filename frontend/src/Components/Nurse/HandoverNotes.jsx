import React from "react";
import "../../styles/Nurse/HandoverNotes.css";

export default function HandoverNotes() {
  return (
    <div className="handoverBox">

      <h2>Shift Handover Notes</h2>

      <textarea
        placeholder="Enter Shift Handover Notes"
      ></textarea>

    </div>
  );
}