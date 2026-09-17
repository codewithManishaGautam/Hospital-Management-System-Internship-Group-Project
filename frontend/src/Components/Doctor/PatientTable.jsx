import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../../styles/doctor/patientManagement.css";

function PatientTable({ patients, doctorId, onPrescriptionSaved }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [selectedReportPatient, setSelectedReportPatient] = useState(null);
  const [nurseReports, setNurseReports] = useState([]);
  const [handoverNotes, setHandoverNotes] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);

  const handleViewNurseReports = async (patient) => {
    try {
      setLoadingReports(true);

      const response = await axios.get(
        `http://localhost:5000/api/doctor/${doctorId}/patient/${patient._id}/nursing-reports`,
      );

      setSelectedReportPatient(patient);
      setNurseReports(response.data.nursingReports || []);
      setHandoverNotes(response.data.handoverNotes || []);
    } catch (error) {
      console.error("Error fetching nurse reports:", error);

      alert(error.response?.data?.message || "Failed to load Nurse Reports.");
    } finally {
      setLoadingReports(false);
    }
  };

  const filteredPatients = patients.filter((p) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) return true;

    return (
      String(p.uhid || "")
        .toLowerCase()
        .includes(searchText) ||
      String(p.name || "")
        .toLowerCase()
        .includes(searchText) ||
      String(p.mobile || "")
        .toLowerCase()
        .includes(searchText)
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

                <button
                  className="nurse-report-btn"
                  onClick={() => handleViewNurseReports(p)}
                >
                  Nurse Reports
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

      {selectedReportPatient && (
        <div className="nurse-report-panel">
          <div className="nurse-report-header">
            <div>
              <h2>Nurse Reports</h2>

              <p>
                <strong>Patient:</strong> {selectedReportPatient.name}
              </p>

              <p>
                <strong>UHID:</strong> {selectedReportPatient.uhid}
              </p>
            </div>

            <button
              className="close-report-btn"
              onClick={() => {
                setSelectedReportPatient(null);
                setNurseReports([]);
                setHandoverNotes([]);
              }}
            >
              Close
            </button>
          </div>

          {loadingReports ? (
            <p>Loading Nurse Reports...</p>
          ) : (
            <>
              <div className="nursing-report-section">
                <h3>Daily Nursing Reports</h3>

                {nurseReports.length === 0 ? (
                  <p>No nursing reports available.</p>
                ) : (
                  nurseReports.map((report, index) => (
                    <div
                      className="nursing-report-card"
                      key={report._id || index}
                    >
                      <h4>
                        Report{" "}
                        {report.createdAt
                          ? new Date(report.createdAt).toLocaleString()
                          : index + 1}
                      </h4>

                      <p>
                        <strong>BP:</strong> {report.bp || "-"}
                      </p>

                      <p>
                        <strong>Pulse:</strong> {report.pulse || "-"}
                      </p>

                      <p>
                        <strong>Temperature:</strong>{" "}
                        {report.temperature || "-"}
                      </p>

                      <p>
                        <strong>SpO2:</strong> {report.spo2 || "-"}
                      </p>

                      <p>
                        <strong>Sugar:</strong> {report.sugar || "-"}
                      </p>

                      <p>
                        <strong>Intake:</strong> {report.intake || "-"}
                      </p>

                      <p>
                        <strong>Output:</strong> {report.output || "-"}
                      </p>

                      <p>
                        <strong>Nursing Notes:</strong> {report.notes || "-"}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="handover-report-section">
                <h3>Shift Handover Notes</h3>

                {handoverNotes.length === 0 ? (
                  <p>No handover notes available.</p>
                ) : (
                  handoverNotes.map((note, index) => (
                    <div
                      className="handover-report-card"
                      key={note._id || index}
                    >
                      <small>
                        {note.createdAt
                          ? new Date(note.createdAt).toLocaleString()
                          : "-"}
                      </small>

                      <p>{note.text}</p>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default PatientTable;
