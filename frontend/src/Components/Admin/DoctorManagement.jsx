import React, { useState } from "react";
import axios from "axios";
import AddDoctorForm from "./AddDoctorForm";
import "../../styles/admin/doctor.css";
import "../../styles/admin/table.css";

function DoctorManagement({ doctors, fetchDoctors }) {
  const [showDoctorForm, setShowDoctorForm] = useState(false);

  const [editingDoctorId, setEditingDoctorId] = useState(null);

  const [editedDoctor, setEditedDoctor] = useState({
    name: "",
    specialization: "",
    qualification: "",
    experience: "",
    phone: "",
  });

  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialization: "",
    qualification: "",
    experience: "",
    phone: "",
  });

  // ADD DOCTOR
  const addDoctor = async () => {
    try {
      await axios.post("http://localhost:5000/api/admin/doctor/add", newDoctor);

      fetchDoctors();

      setShowDoctorForm(false);

      setNewDoctor({
        name: "",
        specialization: "",
        qualification: "",
        experience: "",
        phone: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE DOCTOR
  const deleteDoctor = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/doctor/delete/${id}`);

      fetchDoctors();
    } catch (error) {
      console.log(error);
    }
  };

  // SAVE EDIT
  const saveDoctorEdit = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/doctor/edit/${id}`,
        editedDoctor,
      );

      setEditingDoctorId(null);

      fetchDoctors();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="doctor-section">
      <div className="section-header">
        <h2>Doctors</h2>

        <button className="add-btn" onClick={() => setShowDoctorForm(true)}>
          + Add Doctor
        </button>
      </div>

      <AddDoctorForm
        showDoctorForm={showDoctorForm}
        setShowDoctorForm={setShowDoctorForm}
        newDoctor={newDoctor}
        setNewDoctor={setNewDoctor}
        addDoctor={addDoctor}
      />

      <div className="doctor-grid">
        {doctors.map((d) => (
          <div className="doctor-card" key={d._id}>
            <img
              className="doctor-avatar"
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="doctor"
            />

            {editingDoctorId === d._id ? (
              <>
                <input
                  type="text"
                  value={editedDoctor.name}
                  onChange={(e) =>
                    setEditedDoctor({
                      ...editedDoctor,
                      name: e.target.value,
                    })
                  }
                />

                <input
                  type="number"
                  value={editedDoctor.phone}
                  onChange={(e) =>
                    setEditedDoctor({
                      ...editedDoctor,
                      phone: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  value={editedDoctor.specialization}
                  onChange={(e) =>
                    setEditedDoctor({
                      ...editedDoctor,
                      specialization: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  value={editedDoctor.qualification}
                  onChange={(e) =>
                    setEditedDoctor({
                      ...editedDoctor,
                      qualification: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  value={editedDoctor.experience}
                  onChange={(e) =>
                    setEditedDoctor({
                      ...editedDoctor,
                      experience: e.target.value,
                    })
                  }
                />
              </>
            ) : (
              <>
                <h3>{d.name}</h3>
                <p>{d.phone}</p>
                <p>{d.specialization}</p>
                <p>{d.qualification}</p>
                <p>{d.experience}</p>
              </>
            )}

            <div className="doctor-actions">
              {editingDoctorId === d._id ? (
                <button
                  className="edit-btn"
                  onClick={() => saveDoctorEdit(d._id)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditingDoctorId(d._id);

                    setEditedDoctor({
                      name: d.name,
                      phone: d.phone,
                      specialization: d.specialization,
                      qualification: d.qualification,
                      experience: d.experience,
                    });
                  }}
                >
                  Edit
                </button>
              )}

              <button
                className="delete-btn"
                onClick={() => deleteDoctor(d._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorManagement;
