import React, { useState, useEffect } from "react";
import { getAllPatients, deletePatient } from "./services/patientService";
import { useNavigate } from "react-router-dom";
import "../../styles/Reception/dashboard.css";

function Dashboard({ setStep, setSelectedPatient, setMode }) {
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
      count: patients?.length || 0,
    },
    {
      title: "IPD Patients",
      count: (patients || []).filter((p) => p.role === "IPD").length,
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

      console.log("Patients API Response :", data);

      const sorted = [...data].sort((a, b) => {
        if (a.appointmentDate && b.appointmentDate) {
          return (
            new Date(b.appointmentDate + " " + b.appointmentTime) -
            new Date(a.appointmentDate + " " + a.appointmentTime)
          );
        }
        return 0;
      });

      setPatients(sorted);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePatient = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?",
    );

    if (!confirmDelete) return;

    try {
      await deletePatient(id);
      fetchPatients();
      alert("Patient deleted successfully.");
    } catch (error) {
      console.log(error);
      alert("Failed to delete patient.");
    }
  };

  const handleViewPatient = (patient) => {
    navigate(`/prescription/${patient._id}`);
  };

  const handleEdit = (patient) => {
    setSelectedPatient({
      ...patient,
      isAppointment: false,
    });

    setStep("register");
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Reception Dashboard</h2>
        <button
          className="add-btn"
          onClick={() => {
            setSelectedPatient(null);
            setStep("register");
          }}
        >
          + New Registration
        </button>

        {/* <button
          className="appointment-btn"
          onClick={() => setStep("appointment")}
        >
          Book Appointment
        </button> */}
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
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient.uhid}</td>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.mobile}</td>
                  <td>{patient.address}</td>
                  <td>{patient.disease}</td>
                  <td>{patient.doctor}</td>
                  <td>
                    {patient.appointmentDate}
                    <br />
                    {patient.appointmentTime}
                  </td>
                  <td>{patient.role}</td>
                  <td>{patient.paymentStatus}</td>
                  <td>{patient.status}</td>
                  <td>
                    <span
                      className={
                        patient.paymentStatus === "Paid" ? "paid" : "unpaid"
                      }
                    >
                      {patient.paymentStatus || "Pending"}
                    </span>
                  </td>

                  <td>
                    <div className="action-btns">
                      <button
                        className="view-btn"
                        onClick={() => handleViewPatient(patient)}
                      >
                        View
                      </button>

                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(patient)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDeletePatient(patient._id)}
                      >
                        Delete
                      </button>

                      <button
                        className="payment-btn"
                        onClick={() => {
                          setSelectedPatient(patient);
                          setStep("billing");
                        }}
                      >
                        Payment
                      </button>

                      <button
                        className="appointment-btn"
                        onClick={() => {
                          setSelectedPatient({
                            ...patient,
                            isAppointment: true,
                          });

                          setStep("register");
                        }}
                      >
                        Book Appointment
                      </button>
                    </div>
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
              onClick={() => {
                setSelectedPatient(viewPatient);
                setStep("register");
              }}
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
