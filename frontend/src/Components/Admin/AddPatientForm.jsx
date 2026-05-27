import React from "react";

function AddPatientForm({
  showPatientForm,
  setShowPatientForm,
  newPatient,
  setNewPatient,
  addPatient,
}) {
  if (!showPatientForm) return null;

  return (
    <div className="staff-form-popup">
      <div className="staff-form">
        <h2>Add Patient</h2>

        <input
          type="text"
          placeholder="Patient Name"
          value={newPatient.name}
          onChange={(e) =>
            setNewPatient({
              ...newPatient,
              name: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Age"
          value={newPatient.age}
          onChange={(e) =>
            setNewPatient({
              ...newPatient,
              age: e.target.value,
            })
          }
        />

        <select
          value={newPatient.gender}
          onChange={(e) =>
            setNewPatient({
              ...newPatient,
              gender: e.target.value,
            })
          }
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>

        <input
          type="number"
          placeholder="Phone"
          value={newPatient.phone}
          onChange={(e) =>
            setNewPatient({
              ...newPatient,
              phone: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Disease"
          value={newPatient.disease}
          onChange={(e) =>
            setNewPatient({
              ...newPatient,
              disease: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Doctor"
          value={newPatient.doctor}
          onChange={(e) =>
            setNewPatient({
              ...newPatient,
              doctor: e.target.value,
            })
          }
        />

        <input
          type="date"
          value={newPatient.admission}
          onChange={(e) =>
            setNewPatient({
              ...newPatient,
              admission: e.target.value,
            })
          }
        />

        <select
          value={newPatient.status}
          onChange={(e) =>
            setNewPatient({
              ...newPatient,
              status: e.target.value,
            })
          }
        >
          <option value="">Select Status</option>
          <option value="Admitted">Admitted</option>
          <option value="Discharged">Discharged</option>
        </select>

        <div className="form-buttons">
          <button className="save-btn" onClick={addPatient}>
            Save
          </button>

          <button
            className="cancel-btn"
            onClick={() => setShowPatientForm(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPatientForm;
