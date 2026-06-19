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
            <th>ID</th>
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
            <tr key={p.id}>
              <td>{p.id}</td>

              <td>
                {editingPatientId === p.id ? (
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
                {editingPatientId === p.id ? (
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
                {editingPatientId === p.id ? (
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
                {editingPatientId === p.id ? (
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
                {editingPatientId === p.id ? (
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
                {editingPatientId === p.id ? (
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
                {editingPatientId === p.id ? (
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
                {editingPatientId === p.id ? (
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
                {editingPatientId === p.id ? (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => savePatientEdit(p.id)}
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
                        setEditingPatientId(p.id);
                        setEditedPatient(p);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deletePatient(p.id)}
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
