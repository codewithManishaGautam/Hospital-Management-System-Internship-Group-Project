import React, { useState, useEffect } from "react";
import { getAllPatients } from "./services/patientService";
import { useNavigate } from "react-router-dom";
import "../../styles/Reception/dashboard.css";

function Dashboard({ setStep, setSelectedPatient }) {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [viewPatient, setViewPatient] = useState(null);
  const [patients, setPatients] = useState([]);

  const dashboardCards = [
    {
      title: "Today's Appointments",
      count: 0,
    },
    {
      title: "Registered Patients",
      count: patients.length,
    },
    {
      title: "IPD Patients",
      count: patients.filter((p) => p.role === "IPD").length,
    },
    {
      title: "Today's Revenue",
      count: "₹0",
    },
  ];
  // Filter Logic
  const filteredPatients = patients.filter(
    (patient) =>
      (patient.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient.uhid || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient.mobile || "").includes(searchTerm),
  );

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await getAllPatients();
      setPatients(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewPatient = (patient) => {
    navigate(`/prescription/${patient._id}`);
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Reception Dashboard</h2>
        <button className="add-btn" onClick={() => setStep("register")}>
          + New Registration
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="dashboard-cards">
        {dashboardCards.map((card, index) => (
          <div className="dashboard-card" key={index}>
            <h3>{card.title}</h3>
            <h1>{card.count}</h1>
          </div>
        ))}
      </div>

      {/* Patients Table Card */}
      <div className="patient-table-card">
        <div
          className="table-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>Today's Appointment List</h3>

          {/* ✨ ADDED: Search Input Box */}
          <input
            type="text"
            className="search-input"
            placeholder="Search by Name, UHID, Mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "6px 12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "250px",
            }}
          />
        </div>

        <table className="patient-table">
          <thead>
            <tr>
              <th>UHID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Doctor</th>
              <th>Fee Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient.uhid}</td>
                  <td>{patient.name}</td>
                  <td>{patient.mobile}</td>
                  <td>{patient.doctor}</td>
                  <td>
                    <span>{patient.status}</span>
                  </td>
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
                  colSpan="6"
                  style={{ textAlign: "center", padding: "15px" }}
                >
                  No patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Patient Details Section */}
      {viewPatient && (
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

            <p>
              <strong>Diagnosis:</strong> {viewPatient.diagnosis || "Not Added"}
            </p>

            <p>
              <strong>Prescription:</strong>{" "}
              {viewPatient.prescription || "Not Added"}
            </p>

            <p>
              <strong>Advice:</strong> {viewPatient.advice || "Not Added"}
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
      )}
    </div>
  );
}

export default Dashboard;
