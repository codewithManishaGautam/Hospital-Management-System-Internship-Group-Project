import React from "react";
import "../../styles/Nurse/Beds.css";

export default function Beds() {
  return (
    <div className="bedsContainer">

      <div className="bedCard">
        <h2>General Ward</h2>
        <p>Occupied Beds : 1</p>
        <p>Available Beds : 5</p>
      </div>

      <div className="bedCard">
        <h2>Special Ward</h2>
        <p>Occupied Beds : 1</p>
        <p>Available Beds : 4</p>
      </div>

      <div className="bedCard">
        <h2>ICU Ward</h2>
        <p>Occupied Beds : 2</p>
        <p>Available Beds : 5</p>
      </div>

    </div>
  );
}