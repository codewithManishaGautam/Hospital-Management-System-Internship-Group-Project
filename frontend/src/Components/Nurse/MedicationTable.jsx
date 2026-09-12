import React, { useState } from "react";
import axios from "axios";
import "../../styles/Nurse/MedicationTable.css";

export default function MedicationTable({ medicines, patientId }) {
  const [updatingMedicineId, setUpdatingMedicineId] = useState(null);

  const handleStatusChange = async (medicineId, newStatus) => {
    if (!patientId || !medicineId) {
      alert("Patient or medicine information is missing.");
      return;
    }

    try {
      setUpdatingMedicineId(medicineId);

      const response = await axios.put(
        `http://localhost:5000/api/patient/${patientId}/medicine/${medicineId}/status`,
        {
          status: newStatus,
        },
      );

      console.log("Medicine status updated:", response.data);
    } catch (error) {
      console.error("Error updating medicine status:", error);

      alert(
        error.response?.data?.message || "Failed to update medicine status.",
      );
    } finally {
      setUpdatingMedicineId(null);
    }
  };

  return (
    <div className="medicationSection">
      <h2>Medication Checklist</h2>

      {medicines && medicines.length > 0 ? (
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
              <tr key={m._id || i}>
                <td>{m.medicineName || "-"}</td>

                <td>{m.timing || "-"}</td>

                <td>{m.dose || "-"}</td>

                <td>
                  <select
                    value={m.status || "Pending"}
                    disabled={updatingMedicineId === m._id}
                    onChange={(e) => handleStatusChange(m._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Given">Given</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="noMedicineMessage">No medicines prescribed.</p>
      )}
    </div>
  );
}
