import React from "react";

function StaffForm({
  showStaffForm,
  setShowStaffForm,
  newStaff,
  setNewStaff,
  addStaff,
}) {
  if (!showStaffForm) return null;

  return (
    <div className="staff-form-popup">
      <div className="staff-form">
        <h2>Add Staff</h2>

        <input
          type="text"
          placeholder="Name"
          value={newStaff.name}
          onChange={(e) =>
            setNewStaff({
              ...newStaff,
              name: e.target.value.replace(/[^A-Za-z ]/g, ""),
            })
          }
        />

        <input
          type="text"
          inputMode="numeric"
          maxLength={12}
          placeholder="Aadhaar Number"
          value={newStaff.aadhaar}
          onChange={(e) =>
            setNewStaff({
              ...newStaff,
              aadhaar: e.target.value.replace(/\D/g, "").slice(0, 12),
            })
          }
        />

        <input
          type="text"
          inputMode="numeric"
          maxLength={10}
          placeholder="Mobile Number"
          value={newStaff.mobile}
          onChange={(e) =>
            setNewStaff({
              ...newStaff,
              mobile: e.target.value.replace(/\D/g, "").slice(0, 10),
            })
          }
        />

        <input
          type="text"
          placeholder="Role"
          value={newStaff.role}
          onChange={(e) =>
            setNewStaff({
              ...newStaff,
              role: e.target.value.replace(/[^A-Za-z ]/g, ""),
            })
          }
        />

        <input
          type="text"
          placeholder="Salary"
          value={newStaff.salary}
          onChange={(e) =>
            setNewStaff({
              ...newStaff,
              salary: e.target.value.replace(/\D/g, ""),
            })
          }
        />

        <select
          value={newStaff.status}
          onChange={(e) =>
            setNewStaff({
              ...newStaff,
              status: e.target.value,
            })
          }
        >
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Leave">Leave</option>
        </select>

        <input
          type="date"
          value={newStaff.joining}
          onChange={(e) =>
            setNewStaff({
              ...newStaff,
              joining: e.target.value,
            })
          }
        />

        <div className="form-buttons">
          <button
            className="save-btn"
            onClick={() => {
              if (
                !newStaff.name ||
                !newStaff.aadhaar ||
                !newStaff.mobile ||
                !newStaff.role ||
                !newStaff.salary ||
                !newStaff.status ||
                !newStaff.joining
              ) {
                alert("Please fill all fields");
                return;
              }

              if (newStaff.aadhaar.length !== 12) {
                alert("Aadhaar must be 12 digits");
                return;
              }

              if (newStaff.mobile.length !== 10) {
                alert("Mobile number must be 10 digits");
                return;
              }

              addStaff();
            }}
          >
            Save
          </button>

          <button
            className="cancel-btn"
            onClick={() => setShowStaffForm(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default StaffForm;
