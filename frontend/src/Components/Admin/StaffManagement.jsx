import React from "react";
import StaffForm from "./StaffForm";

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
            <th>ID</th>
            <th>Name</th>
            <th>Aadhaar</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Joining</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {staff.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>

              <td>
                {editingStaffId === s.id ? (
                  <input
                    type="text"
                    value={editedStaff.name}
                    onChange={(e) =>
                      setEditedStaff({
                        ...editedStaff,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  s.name
                )}
              </td>

              <td>
                {editingStaffId === s.id ? (
                  <input
                    type="text"
                    value={editedStaff.aadhaar}
                    onChange={(e) =>
                      setEditedStaff({
                        ...editedStaff,
                        aadhaar: e.target.value,
                      })
                    }
                  />
                ) : (
                  s.aadhaar
                )}
              </td>

              <td>
                {editingStaffId === s.id ? (
                  <input
                    type="text"
                    value={editedStaff.phone}
                    onChange={(e) =>
                      setEditedStaff({
                        ...editedStaff,
                        phone: e.target.value,
                      })
                    }
                  />
                ) : (
                  s.phone
                )}
              </td>

              <td>
                {editingStaffId === s.id ? (
                  <input
                    type="text"
                    value={editedStaff.role}
                    onChange={(e) =>
                      setEditedStaff({
                        ...editedStaff,
                        role: e.target.value,
                      })
                    }
                  />
                ) : (
                  s.role
                )}
              </td>

              <td>
                {editingStaffId === s.id ? (
                  <input
                    type="text"
                    value={editedStaff.salary}
                    onChange={(e) =>
                      setEditedStaff({
                        ...editedStaff,
                        salary: e.target.value,
                      })
                    }
                  />
                ) : (
                  s.salary
                )}
              </td>

              <td>
                {editingStaffId === s.id ? (
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

              <td>
                {editingStaffId === s.id ? (
                  <input
                    type="date"
                    value={editedStaff.joining}
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

              <td>
                {editingStaffId === s.id ? (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => saveStaffEdit(s.id)}
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
                        setEditingStaffId(s.id);

                        setEditedStaff({
                          name: s.name,
                          aadhaar: s.aadhaar,
                          phone: s.phone,
                          role: s.role,
                          salary: s.salary,
                          status: s.status,
                          joining: s.joining,
                        });
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteStaff(s.id)}
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
