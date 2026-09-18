import React, { useState } from "react";
import axios from "axios";
import "../../styles/Nurse/HandoverNotes.css";

export default function HandoverNotes({ patientId, handoverNotes = [] }) {
  const [currentNote, setCurrentNote] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!currentNote.trim()) {
      alert("Please Type something first!");
      return;
    }

    if (!patientId) {
      alert("Patient information is missing.");
      return;
    }

    try {
      setSaving(true);

      await axios.post(
        `http://localhost:5000/api/patient/${patientId}/handover`,
        {
          text: currentNote.trim(),
        },
      );

      setCurrentNote("");

      alert("Shift Handover Note successfully submitted!");

      // Reload patient data so the newly saved note appears
      window.location.reload();
    } catch (error) {
      console.error("Error saving handover note:", error);

      alert(
        error.response?.data?.message || "Failed to save Shift Handover Note.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="handoverBox">
      <h2>Shift Handover Notes</h2>

      <textarea
        placeholder="Enter Shift Handover Notes"
        value={currentNote}
        onChange={(e) => setCurrentNote(e.target.value)}
      />

      <button
        onClick={handleSave}
        className="btn-save-handover"
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Shift Handover"}
      </button>

      <div className="history-section">
        <h3>Previous Shift Handovers</h3>

        {handoverNotes.length === 0 ? (
          <p className="no-notes">No previous handover notes.</p>
        ) : (
          <div className="history-container">
            {handoverNotes.map((item, index) => (
              <div key={item._id || index} className="history-item">
                <small>
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleString()
                    : "-"}
                </small>

                <p>{item.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
