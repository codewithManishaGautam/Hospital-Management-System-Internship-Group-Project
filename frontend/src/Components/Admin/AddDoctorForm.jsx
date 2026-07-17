import React from "react";
import "../../styles/admin/forms.css";

function AddDoctorForm({
  showDoctorForm,
  setShowDoctorForm,
  newDoctor,
  setNewDoctor,
  addDoctor,
}) {
  if (!showDoctorForm) return null;

  return (
    <div className="staff-form-popup">
      <div className="staff-form">
        <h2>Add Doctor</h2>

        <input
          type="text"
          placeholder="Doctor Name"
          value={newDoctor.name}
          onChange={(e) =>
            setNewDoctor({
              ...newDoctor,
              name: e.target.value.replace(/[^A-Za-z. ]/g, ""),
            })
          }
        />

        <input
          type="text"
          placeholder="Specialization"
          value={newDoctor.specialization}
          onChange={(e) =>
            setNewDoctor({
              ...newDoctor,
              specialization: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Qualification"
          value={newDoctor.qualification}
          onChange={(e) =>
            setNewDoctor({
              ...newDoctor,
              qualification: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Contact Number"
          maxLength={10}
          value={newDoctor.mobile}
          onChange={(e) =>
            setNewDoctor({
              ...newDoctor,
              mobile: e.target.value.replace(/\D/g, "").slice(0, 10),
            })
          }
        />

        <input
          type="text"
          placeholder="Experience"
          value={newDoctor.experience}
          onChange={(e) =>
            setNewDoctor({
              ...newDoctor,
              experience: e.target.value,
            })
          }
        />

        <div className="form-buttons">
          <button
            className="save-btn"
            onClick={() => {
              if (
                !newDoctor.name ||
                !newDoctor.specialization ||
                !newDoctor.qualification ||
                !newDoctor.experience ||
                !newDoctor.mobile
              ) {
                alert("Please fill all fields");
                return;
              }

              if (newDoctor.mobile.length !== 10) {
                alert("Mobile number must be 10 digits");
                return;
              }

              addDoctor();
            }}
          >
            Save
          </button>

          <button
            className="cancel-btn"
            onClick={() => setShowDoctorForm(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddDoctorForm;
