import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/doctor/patientManagement.css";

function PatientTable({ patients, onPrescriptionSaved }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const filteredPatients = patients.filter((p) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) return true;

    return (
      String(p.uhid || "").toLowerCase().includes(searchText) ||
      String(p.name || "").toLowerCase().includes(searchText) ||
      String(p.mobile || "").toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="patient-table">

      {/* SEARCH BOX */}
      <div className="patient-search">
        <input
          type="text"
          placeholder="Search by UHID, Name or Mobile"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="patients-table">
        <thead>
          <tr>
            <th>UHID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Disease</th>
            <th>Doctor</th>
            <th>Appointment</th>
            <th>Patient Type</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredPatients.map((p) => (
            <tr key={p._id}>
              <td>{p.uhid}</td>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.gender}</td>
              <td>{p.mobile}</td>
              <td>{p.address}</td>
              <td>{p.disease}</td>
              <td>{p.doctor}</td>

              <td>
                {p.appointmentDate}
                <br />
                {p.appointmentTime}
              </td>

              <td>{p.role}</td>

              <td>{p.paymentStatus}</td>

              <td>{p.status}</td>

              <td>
                <button
                  className="patient-view-btn"
                  onClick={() =>
                    navigate(`/prescription/${p._id}`, {
                      state: {
                        onPrescriptionSaved,
                      },
                    })
                  }
                >
                  View
                </button>
              </td>
            </tr>
          ))}

          {filteredPatients.length === 0 && (
            <tr>
              <td colSpan="13" style={{ textAlign: "center" }}>
                No patients found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PatientTable;