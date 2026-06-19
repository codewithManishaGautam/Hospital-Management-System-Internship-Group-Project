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
          onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
        />

        <input
          type="text"
          placeholder="Aadhaar Number"
          value={newStaff.aadhaar}
          onChange={(e) =>
            setNewStaff({
              ...newStaff,
              aadhaar: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={newStaff.phone}
          onChange={(e) =>
            setNewStaff({
              ...newStaff,
              phone: e.target.value,
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
              role: e.target.value,
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
              salary: e.target.value,
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
          <button className="save-btn" onClick={addStaff}>
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
