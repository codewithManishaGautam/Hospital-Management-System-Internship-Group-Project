import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/patient.css";

// import { PatientManagement } from "../../api/admin/adminApi";

function PatientManagement({
  patients,
  deletePatient,
  searchTerm,
  setSearchTerm,
}) {
  const navigate = useNavigate();

  return (
    <div className="admin-patient-container">
      <div className="admin-patient-header">
        <h2>Patients</h2>

        {/* <button className="add-btn" onClick={() => setShowPatientForm(true)}>
          + Add Patient
        </button> */}
      </div>

      {/* <AddPatientForm
        showPatientForm={showPatientForm}
        setShowPatientForm={setShowPatientForm}
        newPatient={newPatient}
        setNewPatient={setNewPatient}
        addPatient={addPatient}
      /> */}

      <input
        type="text"
        placeholder="Search by Name or Phone"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="admin-patient-search-input"
      />

      <table className="admin-patient-table">
        <thead>
          <tr>
            <th>UHID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Mobile</th>
            <th>Disease</th>
            <th>Doctor</th>
            <th>Admission</th>
            <th>Appointment Date</th>
            <th>Status</th>
            <th>Prescription</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {patients
            .filter(
              (p) =>
                (p.name || "")
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                (p.mobile || "").includes(searchTerm) ||
                (p.uhid || "").toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .map((p) => (
              <tr key={p._id}>
                <td>{p.uhid}</td>

                <td>{p.name}</td>

                <td>{p.age}</td>

                <td>{p.gender}</td>

                <td>{p.mobile}</td>
                <td>{p.disease}</td>
                <td>{p.doctor}</td>

                <td>
                  {p.admissionDate
                    ? new Date(p.admissionDate).toLocaleDateString("en-IN")
                    : "-"}
                </td>
                <td>
                  {p.appointmentDate
                    ? new Date(p.appointmentDate).toLocaleDateString("en-IN")
                    : "-"}
                </td>

                <td>
                  <span
                    className={
                      p.status === "Admitted"
                        ? "admin-patient-status-admitted"
                        : p.status === "Waiting Doctor"
                          ? "admin-patient-status-waiting"
                          : p.status === "Discharged"
                            ? "admin-patient-status-discharged"
                            : "admin-patient-status-default"
                    }
                  >
                    {p.status}
                  </span>
                </td>

                <td>
                  <button
                    className="admin-patient-view-btn"
                    onClick={() => {
                      navigate(`/prescription/${p._id}`);
                    }}
                  >
                    View
                  </button>
                </td>

                <td className="admin-patient-action-cell">
                  <button
                    className="admin-patient-delete-btn"
                    onClick={() => deletePatient(p._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* <PrescriptionModal
        showPrescription={showPrescription}
        selectedPatient={selectedPatient}
        setShowPrescription={setShowPrescription}
        downloadPrescription={downloadPrescription}
      /> */}
    </div>
  );
}

export default PatientManagement;
