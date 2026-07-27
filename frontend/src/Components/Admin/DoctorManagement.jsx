import React, { useState } from "react";
import axios from "axios";
import AddDoctorForm from "./AddDoctorForm";
import "../../styles/admin/doctor.css";
import "../../styles/admin/table.css";

import { ForgotPassword } from "../../api/admin/adminApi";

function DoctorManagement({ doctors, fetchDoctors }) {
  const [showDoctorForm, setShowDoctorForm] = useState(false);

  const [editingDoctorId, setEditingDoctorId] = useState(null);

  const [editedDoctor, setEditedDoctor] = useState({
    name: "",
    specialization: "",
    qualification: "",
    experience: "",
    mobile: "",
  });

  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialization: "",
    qualification: "",
    experience: "",
    mobile: "",
  });

  // ADD DOCTOR
 const addDoctor = async () => {
  console.log("Doctor Data:", newDoctor);

  try {
    const res = await axios.post(
      "http://localhost:5000/api/admin/doctor/add",
      newDoctor
    );

      console.log(res.data);

      fetchDoctors();

      setShowDoctorForm(false);

      setNewDoctor({
        name: "",
        specialization: "",
        qualification: "",
        experience: "",
        mobile: "",
      });
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Doctor not added");
    }
  };

  // DELETE DOCTOR
  const deleteDoctor = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/admin/doctor/delete/${id}`,
      );

      console.log(res.data);
      alert(res.data.message);

      fetchDoctors();
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  // SAVE EDIT
  const saveDoctorEdit = async (id) => {
    try {
      if (
        !editedDoctor.name ||
        !editedDoctor.specialization ||
        !editedDoctor.qualification ||
        !editedDoctor.experience ||
        !editedDoctor.mobile
      ) {
        alert("Please fill all fields");
        return;
      }

      if (editedDoctor.name.trim().length < 3) {
        alert("Doctor name must be at least 3 characters");
        return;
      }

      if (editedDoctor.specialization.trim().length < 2) {
        alert("Enter valid specialization");
        return;
      }

      if (editedDoctor.qualification.trim().length < 2) {
        alert("Enter valid qualification");
        return;
      }

      if (!/^[6-9]\d{9}$/.test(editedDoctor.mobile)) {
        alert("Enter valid 10 digit mobile number");
        return;
      }

      if (
        !/^\d+\s*(Year|Years|Month|Months|yrs|yr)$/i.test(
          editedDoctor.experience,
        )
      ) {
        alert("Experience should be like 5 Years or 6 Months");
        return;
      }

      if (editedDoctor.mobile.length !== 10) {
        alert("Mobile number must be 10 digits");
        return;
      }

      const res = await axios.put(
        `http://localhost:5000/api/admin/doctor/edit/${id}`,
        editedDoctor,
      );

      console.log(res.data);

      alert("Doctor Updated Successfully");

      setEditingDoctorId(null);

      fetchDoctors();
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Update Failed");
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
                      name: e.target.value.replace(/[^A-Za-z. ]/g, ""),
                    })
                  }
                />

                <input
                  type="text"
                  maxLength={10}
                  value={editedDoctor.mobile}
                  onChange={(e) =>
                    setEditedDoctor({
                      ...editedDoctor,
                      mobile: e.target.value.replace(/\D/g, "").slice(0, 10),
                    })
                  }
                />

                <input
                  type="text"
                  value={editedDoctor.specialization}
                  onChange={(e) =>
                    setEditedDoctor({
                      ...editedDoctor,
                      specialization: e.target.value.replace(
                        /[^A-Za-z &]/g,
                        "",
                      ),
                    })
                  }
                />

                <input
                  type="text"
                  value={editedDoctor.qualification}
                  onChange={(e) =>
                    setEditedDoctor({
                      ...editedDoctor,
                      qualification: e.target.value.replace(
                        /[^A-Za-z,. ]/g,
                        "",
                      ),
                    })
                  }
                />

                <input
                  type="text"
                  value={editedDoctor.experience}
                  onChange={(e) =>
                    setEditedDoctor({
                      ...editedDoctor,
                      experience: e.target.value.replace(/[^0-9A-Za-z ]/g, ""),
                    })
                  }
                />
              </>
            ) : (
              <>
                <h3>{d.name}</h3>
                <p>{d.mobile}</p>
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
                      mobile: d.mobile,
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
