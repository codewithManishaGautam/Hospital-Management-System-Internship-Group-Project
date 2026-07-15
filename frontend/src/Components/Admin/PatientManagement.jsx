import React from "react";
// import AddPatientForm from "./AddPatientForm";
// import PrescriptionModal from "./prescriptionModal";
// import PrescriptionPage from "./PrescriptionPage";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/patient.css";
import "../../styles/admin/table.css";
import "../../styles/admin/modal.css";

function PatientManagement({
  patients,
  deletePatient,
  searchTerm,
  setSearchTerm,
}) {
  const navigate = useNavigate();

  return (
    <div className="table-container">
      <div className="section-header">
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
        className="search-input"
      />

      <table>
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
                        ? "status-admitted"
                        : p.status === "Waiting Doctor"
                          ? "status-waiting"
                          : p.status === "Discharged"
                            ? "status-discharged"
                            : "status-default"
                    }
                  >
                    {p.status}
                  </span>
                </td>

                <td>
                  <button
                    className="view-btn"
                    onClick={() => {
                      navigate(`/prescription/${p._id}`);
                    }}
                  >
                    View
                  </button>
                </td>

                <td className="action-cell">
                  <button
                    className="delete-btn"
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
