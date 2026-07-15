import React, { useState, useEffect } from "react";
import { getAllPatients } from "./services/patientService";

import "../../styles/Reception/ipdPatientList.css";

function IPDPatientList() {
  const [searchTerm, setSearchTerm] = useState("");

  const [patients, setPatients] = useState([]);

  const filteredPatients = patients.filter((patient) =>
    (patient.name || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const data = await getAllPatients();

      const admitted = data.filter((patient) => patient.status === "Admitted");

      setPatients(admitted);
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = (patient) => {
    alert(
      `Patient Name : ${patient.name}
Room No : ${patient.roomNo}
Bed No : ${patient.bedNo}`,
    );
  };

  return (
    <div className="ipd-list-container">
      {/* Header */}

      <div className="ipd-list-header">
        <h2 className="ipd-title">IPD Patient List</h2>

        <div className="patient-count">
          <div className="count-label">Total Patients</div>

          <div className="count-number">{filteredPatients.length}</div>
        </div>
      </div>
      {/* Search */}

      <div className="search-section">
        <input
          type="text"
          placeholder="Search Patient Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Table */}

      <div className="table-wrapper">
        <table className="ipd-table">
          <thead>
            <tr>
              <th>IPD No</th>

              <th>UHID</th>

              <th>Patient Name</th>

              <th>Age</th>

              <th>Gender</th>

              <th>Room</th>

              <th>Bed</th>

              <th>Doctor</th>

              <th>Admission Date</th>

              <th>Status</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient.ipdNo}</td>

                  <td>{patient.uhid}</td>

                  <td>{patient.name}</td>

                  <td>{patient.age}</td>

                  <td>{patient.gender}</td>

                  <td>{patient.roomNo}</td>

                  <td>{patient.bedNo}</td>

                  <td>{patient.doctor}</td>

                  <td>{patient.admissionDate}</td>

                  <td>
                    <span className="status-badge">{patient.status}</span>
                  </td>

                  <td>
                    <button
                      className="view-btn"
                      onClick={() => handleView(patient)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="11"
                  style={{
                    textAlign: "center",
                  }}
                >
                  No Patient Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IPDPatientList;
