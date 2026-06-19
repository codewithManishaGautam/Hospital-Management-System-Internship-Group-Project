// import React from "react";
// import "../../styles/Nurse/Beds.css";

// export default function Beds() {
//   return (
//     <div className="bedsContainer">

//       <div className="bedCard">
//         <h2>General Ward</h2>
//         <p>Occupied Beds : 1</p>
//         <p>Available Beds : 5</p>
//       </div>

//       <div className="bedCard">
//         <h2>Special Ward</h2>
//         <p>Occupied Beds : 1</p>
//         <p>Available Beds : 4</p>
//       </div>

//       <div className="bedCard">
//         <h2>ICU Ward</h2>
//         <p>Occupied Beds : 2</p>
//         <p>Available Beds : 5</p>
//       </div>

//     </div>
//   );
// }

import React, { useState } from "react";
import "../../styles/Nurse/Beds.css";

export default function Beds() {
  const [general, setGeneral] = useState({ occupied: 1, available: 5 });
  const [special, setSpecial] = useState({ occupied: 1, available: 4 });
  const [icu, setIcu] = useState({ occupied: 2, available: 5 });

  const handleSave = () => {
    alert("Saved Bed Status Successfully!");
  };

  return (
    <div className="bedsContainer">
      {/* General Ward */}
      <div className="nurse-topbar">Nurse Panel</div>
      <div className="bedCard">
        <h2>General Ward</h2>
        <div className="bed-input-group">
          <p>Occupied Beds :</p>
          <input
            type="number"
            value={general.occupied}
            onChange={(e) => setGeneral({ ...general, occupied: Number(e.target.value) })}
          />
        </div>
        <div className="bed-input-group">
          <p>Available Beds :</p>
          <input
            type="number"
            value={general.available}
            onChange={(e) => setGeneral({ ...general, available: Number(e.target.value) })}
          />
        </div>
      </div>

      {/* Special Ward */}
      <div className="bedCard">
        <h2>Special Ward</h2>
        <div className="bed-input-group">
          <p>Occupied Beds :</p>
          <input
            type="number"
            value={special.occupied}
            onChange={(e) => setSpecial({ ...special, occupied: Number(e.target.value) })}
          />
        </div>
        <div className="bed-input-group">
          <p>Available Beds :</p>
          <input
            type="number"
            value={special.available}
            onChange={(e) => setSpecial({ ...special, available: Number(e.target.value) })}
          />
        </div>
      </div>

      {/* ICU Ward */}
      <div className="bedCard">
        <h2>ICU Ward</h2>
        <div className="bed-input-group">
          <p>Occupied Beds :</p>
          <input
            type="number"
            value={icu.occupied}
            onChange={(e) => setIcu({ ...icu, occupied: Number(e.target.value) })}
          />
        </div>
        <div className="bed-input-group">
          <p>Available Beds :</p>
          <input
            type="number"
            value={icu.available}
            onChange={(e) => setIcu({ ...icu, available: Number(e.target.value) })}
          />
        </div>
      </div>

      <button className="save-beds-btn" onClick={handleSave}>
        Save Bed Status
      </button>
    </div>
  );
}