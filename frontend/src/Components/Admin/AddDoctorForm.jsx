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
              specialization: e.target.value.replace(/[^A-Za-z &]/g, ""),
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
              qualification: e.target.value.replace(/[^A-Za-z,. ]/g, ""),
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
              experience: e.target.value.replace(/[^0-9A-Za-z ]/g, ""),
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

              if (newDoctor.name.trim().length < 3) {
                alert("Doctor name must be at least 3 characters");
                return;
              }

              if (newDoctor.specialization.trim().length < 2) {
                alert("Enter valid specialization");
                return;
              }

              if (newDoctor.qualification.trim().length < 2) {
                alert("Enter valid qualification");
                return;
              }

              if (!/^[6-9]\d{9}$/.test(newDoctor.mobile)) {
                alert("Enter valid 10 digit mobile number");
                return;
              }

              if (
                !/^\d+\s*(Year|Years|Month|Months)$/i.test(newDoctor.experience)
              ) {
                alert("Experience should be like '5 Years' or '6 Months'");
                return;
              }

              // if (newDoctor.mobile.length !== 10) {
              //   alert("Mobile number must be 10 digits");
              //   return;
              // }

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
