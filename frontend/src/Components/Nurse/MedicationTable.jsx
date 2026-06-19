import React from "react";
import "../../styles/Nurse/MedicationTable.css";

export default function MedicationTable({
  medicines
}) {
  return (
    <div className="medicationSection">

      <h2>Medication Checklist</h2>

      <table className="medicineTable">

        <thead>

          <tr>
            <th>Medicine</th>
            <th>Timing</th>
            <th>Dose</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {medicines.map((m, i) => (

            <tr key={i}>

              <td>{m.name}</td>

              <td>{m.timing}</td>

              <td>{m.dose}</td>

              <td>

                <select defaultValue={m.status}>
                  <option>Given</option>
                  <option>Pending</option>
                </select>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <div className="notesBox">

        <h2>Nurse Observing Notes</h2>

        <textarea
          placeholder="Enter Observing Notes"
        ></textarea>

      </div>

    </div>
  );
}