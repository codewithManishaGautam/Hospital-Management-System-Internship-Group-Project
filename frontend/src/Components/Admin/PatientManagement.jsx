import React from "react";
import AddPatientForm from "./AddPatientForm";
import PrescriptionModal from "./prescriptionModal";

function PatientManagement({
  patients,
  editingPatientId,
  editedPatient,
  setEditedPatient,
  setEditingPatientId,
  savePatientEdit,
  deletePatient,
  showPatientForm,
  setShowPatientForm,
  newPatient,
  setNewPatient,
  addPatient,
  showPrescription,
  setShowPrescription,
  selectedPatient,
  setSelectedPatient,
  downloadPrescription,
}) {
  return (
    <div className="table-container">
      <div className="section-header">
        <h2>Patients</h2>

        <button className="add-btn" onClick={() => setShowPatientForm(true)}>
          + Add Patient
        </button>
      </div>

      <AddPatientForm
        showPatientForm={showPatientForm}
        setShowPatientForm={setShowPatientForm}
        newPatient={newPatient}
        setNewPatient={setNewPatient}
        addPatient={addPatient}
      />

      <table>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Disease</th>
            <th>Doctor</th>
            <th>Admission</th>
            <th>Status</th>
            <th>Prescription</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((p) => (
            <tr key={p._id}>
              <td>pat-{p._id.slice(-6).toUpperCase()}</td>

              <td>
                {editingPatientId === p._id ? (
                  <input
                    value={editedPatient.name}
                    onChange={(e) =>
                      setEditedPatient({
                        ...editedPatient,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  p.name
                )}
              </td>

              <td>
                {editingPatientId === p._id ? (
                  <input
                    type="number"
                    value={editedPatient.age}
                    onChange={(e) =>
                      setEditedPatient({
                        ...editedPatient,
                        age: e.target.value,
                      })
                    }
                  />
                ) : (
                  p.age
                )}
              </td>

              <td>
                {editingPatientId === p._id ? (
                  <select
                    value={editedPatient.gender}
                    onChange={(e) =>
                      setEditedPatient({
                        ...editedPatient,
                        gender: e.target.value,
                      })
                    }
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  p.gender
                )}
              </td>

              <td>
                {editingPatientId === p._id ? (
                  <input
                    value={editedPatient.phone}
                    onChange={(e) =>
                      setEditedPatient({
                        ...editedPatient,
                        phone: e.target.value,
                      })
                    }
                  />
                ) : (
                  p.phone
                )}
              </td>
              <td>
                {editingPatientId === p._id ? (
                  <input
                    value={editedPatient.disease}
                    onChange={(e) =>
                      setEditedPatient({
                        ...editedPatient,
                        disease: e.target.value,
                      })
                    }
                  />
                ) : (
                  p.disease
                )}
              </td>
              <td>
                {editingPatientId === p._id ? (
                  <input
                    value={editedPatient.doctor}
                    onChange={(e) =>
                      setEditedPatient({
                        ...editedPatient,
                        doctor: e.target.value,
                      })
                    }
                  />
                ) : (
                  p.doctor
                )}
              </td>
              <td>
                {editingPatientId === p._id ? (
                  <input
                    type="date"
                    value={editedPatient.admission}
                    onChange={(e) =>
                      setEditedPatient({
                        ...editedPatient,
                        admission: e.target.value,
                      })
                    }
                  />
                ) : (
                  p.admission
                )}
              </td>

              <td>
                {editingPatientId === p._id ? (
                  <select
                    value={editedPatient.status}
                    onChange={(e) =>
                      setEditedPatient({
                        ...editedPatient,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="Admitted">Admitted</option>
                    <option value="Discharged">Discharged</option>
                  </select>
                ) : (
                  <span
                    className={
                      p.status === "Admitted"
                        ? "status-admitted"
                        : "status-discharged"
                    }
                  >
                    {p.status}
                  </span>
                )}
              </td>

              <td>
                <button
                  className="view-btn"
                  onClick={() => {
                    setSelectedPatient(p);
                    setShowPrescription(true);
                  }}
                >
                  View
                </button>
              </td>

              <td className="action-cell">
                {editingPatientId === p._id ? (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => savePatientEdit(p._id)}
                    >
                      Save
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => setEditingPatientId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingPatientId(p._id);
                        setEditedPatient({
                          name: p.name || "",
                          age: p.age || "",
                          gender: p.gender || "",
                          phone: p.phone || "",
                          disease: p.disease || "",
                          doctor: p.doctor || "",
                          admission: p.admission || "",
                          status: p.status || "",
                        });
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deletePatient(p._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PrescriptionModal
        showPrescription={showPrescription}
        selectedPatient={selectedPatient}
        setShowPrescription={setShowPrescription}
        downloadPrescription={downloadPrescription}
      />
    </div>
  );
}

export default PatientManagement;
