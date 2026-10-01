import React from "react";
import StaffForm from "./StaffForm";
import "../../styles/admin/staff.css";

function StaffManagement({
  staff,
  editingStaffId,
  editedStaff,
  setEditedStaff,
  setEditingStaffId,
  saveStaffEdit,
  deleteStaff,
  showStaffForm,
  setShowStaffForm,
  newStaff,
  setNewStaff,
  addStaff,
}) {
  return (
    <div className="admin-staff-container">
      <div className="admin-staff-header">
        <h2>Staff Management</h2>

        <button
          className="admin-staff-add-btn"
          onClick={() => setShowStaffForm(true)}
        >
          + Add Staff
        </button>
      </div>

      <StaffForm
        showStaffForm={showStaffForm}
        setShowStaffForm={setShowStaffForm}
        newStaff={newStaff}
        setNewStaff={setNewStaff}
        addStaff={addStaff}
      />

      <table className="admin-staff-table">
        <thead>
          <tr>
            <th>Staff ID</th>
            <th>Name</th>
            <th>Aadhaar</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Joining</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {staff.map((s) => (
            <tr key={s._id}>
              <td className="admin-staff-action-cell">
                STF-{s._id.slice(-6).toUpperCase()}
              </td>

              <td className="admin-staff-action-cell">
                {editingStaffId === s._id ? (
                  <input
                    type="text"
                    value={editedStaff.name}
                    onChange={(e) =>
                      setEditedStaff({
                        ...editedStaff,
                        name: e.target.value.replace(/[^A-Za-z ]/g, ""),
                      })
                    }
                  />
                ) : (
                  s.name
                )}
              </td>

              <td className="admin-staff-action-cell">
                {editingStaffId === s._id ? (
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={12}
                    value={editedStaff.aadhaar}
                    onChange={(e) =>
                      setEditedStaff({
                        ...editedStaff,
                        aadhaar: e.target.value.replace(/\D/g, "").slice(0, 12),
                      })
                    }
                  />
                ) : (
                  s.aadhaar
                )}
              </td>

              <td className="admin-staff-action-cell">
                {editingStaffId === s._id ? (
                  <input
                    type="email"
                    value={editedStaff.email}
                    onChange={(e) =>
                      setEditedStaff({
                        ...editedStaff,
                        email: e.target.value,
                      })
                    }
                  />
                ) : (
                  s.email
                )}
              </td>

              <td className="admin-staff-action-cell">
                {editingStaffId === s._id ? (
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={10}
                    value={editedStaff.mobile}
                    onChange={(e) =>
                      setEditedStaff({
                        ...editedStaff,
                        mobile: e.target.value.replace(/\D/g, "").slice(0, 10),
                      })
                    }
                  />
                ) : (
                  s.mobile
                )}
              </td>

              <td className="admin-staff-action-cell">
                {editingStaffId === s._id ? (
                  <input
                    type="text"
                    value={editedStaff.role}
                    onChange={(e) =>
                      setEditedStaff({
                        ...editedStaff,
                        role: e.target.value.replace(/[^A-Za-z ]/g, ""),
                      })
                    }
                  />
                ) : (
                  s.role
                )}
              </td>

              <td className="admin-staff-action-cell">
                {editingStaffId === s._id ? (
                  <input
                    type="text"
                    inputMode="numeric"
                    value={editedStaff.salary}
                    onChange={(e) =>
                      setEditedStaff({
                        ...editedStaff,
                        salary: e.target.value.replace(/\D/g, ""),
                      })
                    }
                  />
                ) : (
                  s.salary
                )}
              </td>

              <td className="admin-staff-action-cell">
                {editingStaffId === s._id ? (
                  <select
                    value={editedStaff.status}
                    onChange={(e) =>
                      setEditedStaff({
                        ...editedStaff,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="Leave">Leave</option>
                  </select>
                ) : (
                  s.status
                )}
              </td>

              <td className="admin-staff-action-cell">
                {editingStaffId === s._id ? (
                  <input
                    type="date"
                    value={editedStaff.joining?.slice(0, 10)}
                    onChange={(e) =>
                      setEditedStaff({
                        ...editedStaff,
                        joining: e.target.value,
                      })
                    }
                  />
                ) : (
                  s.joining
                )}
              </td>

              <td className="admin-staff-action-cell">
                {editingStaffId === s._id ? (
                  <>
                    <button
                      className="admin-staff-edit-btn"
                      onClick={() => saveStaffEdit(s._id)}
                    >
                      Save
                    </button>

                    <button
                      className="admin-staff-delete-btn"
                      onClick={() => setEditingStaffId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="admin-staff-edit-btn"
                      onClick={() => {
                        setEditingStaffId(s._id);

                        setEditedStaff({
                          name: s.name || "",
                          aadhaar: s.aadhaar || "",
                          mobile: s.mobile || "",
                          email: s.email || "",
                          role: s.role || "",
                          salary: s.salary || "",
                          status: s.status || "",
                          joining: s.joining || "",
                        });
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="admin-staff-delete-btn"
                      onClick={() => deleteStaff(s._id)}
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
    </div>
  );
}

export default StaffManagement;
