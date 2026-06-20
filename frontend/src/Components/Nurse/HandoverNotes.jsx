// import React from "react";
// import "../../styles/Nurse/HandoverNotes.css";

// export default function HandoverNotes() {
//   return (
//     <div className="handoverBox">

//       <h2>Shift Handover Notes</h2>

//       <textarea
//         placeholder="Enter Shift Handover Notes"
//       ></textarea>

//     </div>
//   );
// }

import React, { useState } from "react";
import "../../styles/Nurse/HandoverNotes.css";

export default function HandoverNotes() {
  const [currentNote, setCurrentNote] = useState("");
  const [history, setHistory] = useState([]);

  const handleSave = () => {
    if (!currentNote.trim()) {
      alert("Please Type something first!");
      return;
    }

    const newHandover = {
      time: new Date().toLocaleString(), 
      text: currentNote
    };

    setHistory([newHandover, ...history]);
    setCurrentNote(""); 
    alert("Shift Handover Note successfully submit!");
  };

  return (
    <div className="handoverBox">
      <h2>Shift Handover Notes</h2>
      
      <textarea
        placeholder="Enter Shift Handover Notes"
        value={currentNote}
        onChange={(e) => setCurrentNote(e.target.value)}
      ></textarea>

     
      <button onClick={handleSave} className="btn-save-handover">
        Save Shift Handover
      </button>

     
      <div className="history-section">
        <h3>Previous Shift Handovers</h3>
        {history.length === 0 ? (
          <p className="no-notes">Now Patient is Stable</p>
        ) : (
          <div className="history-container">
            {history.map((item, index) => (
              <div key={index} className="history-item">
                <small>{item.time}</small>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}