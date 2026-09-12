import React, { useState, useEffect } from "react";
import { getAllPatients } from "./services/patientService";
import { useNavigate } from "react-router-dom";
import "../../styles/Reception/searchPatient.css";

function PatientList() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const data = await getAllPatients();
      setPatients(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredPatients = patients.filter(
    (patient) =>
      (patient.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient.uhid || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient.mobile || "").includes(searchTerm) ||
      (patient.doctor || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleViewPatient = (patient) => {
    navigate(`/prescription/${patient._id}`);
  };

  return (
    <div className="search-patient-container">
      <div className="search-header">
        <h2>Patient List</h2>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Patient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="patient-table-wrapper">
        <table className="patient-table">
          <thead>
            <tr>
              <th>UHID</th>

              <th>Patient Name</th>

              <th>Age</th>

              <th>Gender</th>

              <th>Mobile</th>

              <th>Address</th>

              <th>Doctor</th>

              <th>Date</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient.uhid}</td>

                  <td>{patient.name}</td>

                  <td>{patient.age}</td>

                  <td>{patient.gender}</td>

                  <td>{patient.mobile}</td>

                  <td>{patient.address}</td>

                  <td>{patient.doctor}</td>

                  <td>{new Date(patient.createdAt).toLocaleDateString()}</td>

                  <td>
                    <button
                      className="view-btn"
                      onClick={() => handleViewPatient(patient)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
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

      {/* {viewPatient && (
        <div className="patient-details-card">
          <h3>Patient Details</h3>

          <div className="details-grid">
            <p>
              <strong>UHID:</strong> {viewPatient.uhid}
            </p>

            <p>
              <strong>Name:</strong> {viewPatient.name}
            </p>

            <p>
              <strong>Age:</strong> {viewPatient.age}
            </p>

            <p>
              <strong>Gender:</strong> {viewPatient.gender}
            </p>

            <p>
              <strong>Mobile:</strong> {viewPatient.mobile}
            </p>

            <p>
              <strong>Address:</strong> {viewPatient.address}
            </p>
          </div>

          <div className="action-buttons">
            <button className="bill-btn" onClick={() => setStep("billing")}>
              Generate Bill
            </button>

            <button
              className="appointment-btn"
              onClick={() => setStep("register")}
            >
              Book Appointment
            </button>
            <button className="ipd-btn" onClick={() => setStep("ipdAdmission")}>
              IPD Admission
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default PatientList;
