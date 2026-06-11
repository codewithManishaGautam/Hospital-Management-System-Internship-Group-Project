import React, { useState } from "react";

function PasswordManagement({ users, updatePassword }) {
  const [editingId, setEditingId] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  return (
    <div className="table-container">
      <h2>Password Management</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.role}</td>
              <td>{u.email}</td>

              <td>
                {editingId === u.id ? (
                  <input
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                ) : (
                  u.password
                )}
              </td>

              <td>
                {editingId === u.id ? (
                  <>
                    <button
                      onClick={() => {
                        updatePassword(u.id, newPassword);
                        setEditingId(null);
                      }}
                    >
                      Save
                    </button>

                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(u.id);
                      setNewPassword(u.password);
                    }}
                  >
                    Reset Password
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PasswordManagement;
