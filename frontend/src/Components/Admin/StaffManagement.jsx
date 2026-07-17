import React from "react";
import StaffForm from "./StaffForm";
import "../../styles/admin/staff.css";
import "../../styles/admin/table.css";

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
    <div className="table-container">
      <div className="section-header">
        <h2>Staff Management</h2>

        <button className="add-btn" onClick={() => setShowStaffForm(true)}>
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

      <table>
        <thead>
          <tr>
            <th>Staff ID</th>
            <th>Name</th>
            <th>Aadhaar</th>
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
              <td className="action-cell">
                STF-{s._id.slice(-6).toUpperCase()}
              </td>

              <td className="action-cell">
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

              <td className="action-cell">
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

              <td className="action-cell">
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

              <td className="action-cell">
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

              <td className="action-cell">
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

              <td className="action-cell">
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

              <td className="action-cell">
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

              <td className="action-cell">
                {editingStaffId === s._id ? (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => saveStaffEdit(s._id)}
                    >
                      Save
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => setEditingStaffId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingStaffId(s._id);

                        setEditedStaff({
                          name: s.name || "",
                          aadhaar: s.aadhaar || "",
                          mobile: s.mobile || "",
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
                      className="delete-btn"
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
