import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import "./Admin.css";
// import { name } from "pug";

function Admin() {
  const [step, setStep] = useState("admin-dashboard");

  useEffect(() => {
    fetchDashboard();
    fetchDoctors();
    fetchStaff();
    fetchPatients();
  }, []);

  const [dashboard, setDashboard] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [staff, setStaff] = useState([]);
  const [patients, setPatients] = useState([]);

  const [editingStaffId, setEditingStaffId] = useState(null);

  const [editedStaff, setEditedStaff] = useState({
    name: "",
    aadhaar: "",
    phone: "",
    role: "",
    salary: "",
    Status: "",
    joining: "",
  });

  const [editingPatientId, setEditingPatientId] = useState(null);
  const [editedPatientName, setEditedPatientName] = useState("");

  const [showStaffForm, setShowStaffForm] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: "",
    aadhaar: "",
    phone: "",
    role: "",
    salary: "",
    status: "",
    joining: "",
  });

  const [showPrescription, setShowPrescription] = useState(false);

  const [selectedPatient, setSelectedPatient] = useState(null);

  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [editingDoctorId, setEditingDoctorId] = useState(null);

  const [editeDoctor, setEditeDoctor] = useState({
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

  const [showPatientForm, setShowPatientForm] = useState(false);

  const [editedPatient, setEditedPatient] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    disease: "",
    doctor: "",
    admission: "",
    status: "",
  });

  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    disease: "",
    doctor: "",
    admission: "",
    status: "",
  });

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/dashboard");

      setDashboard(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/doctors");

      setDoctors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStaff = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/staff");

      setStaff(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ADD STAFF
  const addStaff = async () => {
    try {
      await axios.post("http://localhost:5000/api/admin/staff/add", newStaff);

      fetchStaff();

      setShowStaffForm(false);

      setNewStaff({
        name: "",
        aadhaar: "",
        phone: "",
        role: "",
        salary: "",
        Status: "",
        joining: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE STAFF
  const deleteStaff = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/staff/delete/${id}`);

      fetchStaff();
    } catch (error) {
      console.log(error);
    }
  };

  // SAVE STAFF EDIT
  const saveStaffEdit = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/staff/edit/${id}`,
        editedStaff,
      );

      setEditingStaffId(null);

      fetchStaff();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT STAFF
  const editStaff = async (id) => {
    const updatedStaff = {
      name: "Updated Name",
    };

    try {
      await axios.put(
        `http://localhost:5000/api/admin/staff/edit/${id}`,
        updatedStaff,
      );

      fetchStaff();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/patients");

      setPatients(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const savePatientEdit = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/patient/edit/${id}`,
        editedPatient,
      );

      setEditingPatientId(null);

      fetchPatients();
    } catch (error) {
      console.log(error);
    }
  };

  const downloadPrescription = (patient) => {
    const content = `
  ----- PATIENT PRESCRIPTION -----

  Name: ${patient.name}
  Doctor: ${patient.doctor}
  Disease: ${patient.disease}

  Prescription:
  ${patient.prescription}

  Tests:
  ${patient.tests.join(", ")}

  Insurance:
  ${patient.insurance}

  Reports:
  ${patient.reports.join(", ")}

  ${patient.status === "Discharged" ? `Bill: ${patient.bill}` : ""}

  `;

    const blob = new Blob([content], {
      type: "text/plain",
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = `${patient.name}_prescription.txt`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

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

  const addPatient = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/admin/patient/add",
        newPatient,
      );

      fetchPatients();

      setShowPatientForm(false);

      setNewPatient({
        name: "",
        age: "",
        gender: "",
        phone: "",
        disease: "",
        doctor: "",
        admission: "",
        status: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deletePatient = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/patient/delete/${id}`,
      );

      fetchPatients();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDoctor = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/doctor/delete/${id}`);

      fetchDoctors();
    } catch (error) {
      console.log(error);
    }
  };

  const saveDoctorEdite = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/doctor/edit/${id}`,
        editeDoctor,
      );

      setEditingDoctorId(null);

      fetchDoctors();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout role="Admin" setStep={setStep}>
      {/* DASHBOARD */}
      {step === "admin-dashboard" && (
        <div className="dashboard-container">
          <h2 className="dashboard-title">Welcome Administrator</h2>

          <div className="stats-grid">
            <div className="stats-card">
              <h3>Total Doctors</h3>
              <p>{doctors.length}</p>
            </div>

            <div className="stats-card">
              <h3>Total Staff</h3>
              <p>{staff.length}</p>
            </div>

            <div className="stats-card">
              <h3>Total Patients</h3>
              <p>{dashboard.totalPatients}</p>
            </div>

            <div className="stats-card">
              <h3>Admitted Patients</h3>
              <p>{dashboard.admittedPatients}</p>
            </div>

            <div className="stats-card">
              <h3>Discharged Patients</h3>
              <p>{dashboard.dischargedPatients}</p>
            </div>
          </div>
        </div>
      )}

      {/* USERS */}
      {step === "users" && (
        <div className="table-container">
          <div className="section-header">
            <h2>Staff Management</h2>
            <button className="add-btn" onClick={() => setShowStaffForm(true)}>
              +Add Staff
            </button>
          </div>

          {showStaffForm && (
            <div className="staff-form-popup">
              <div className="staff-form">
                <h2>Add Staff</h2>

                <input
                  type="text"
                  placeholder="Name"
                  value={newStaff.name}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, name: e.target.value })
                  }
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
                  value={newStaff.Status}
                  onChange={(e) =>
                    setNewStaff({
                      ...newStaff,
                      Status: e.target.value,
                    })
                  }
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Leave">Leave</option>
                </select>

                <input
                  type="text"
                  placeholder="Joining Date"
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
          )}

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Aadhaar No.</th>
                <th>Phone No.</th>
                <th>Role</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Joining Date</th>
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
                      <input
                        type="text"
                        value={editedStaff.Status}
                        onChange={(e) =>
                          setEditedStaff({
                            ...editedStaff,
                            Status: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <span
                        className={
                          s.Status === "Active"
                            ? "status-active"
                            : "status-leave"
                        }
                      >
                        {s.Status}
                      </span>
                    )}
                  </td>
                  <td>
                    {editingStaffId === s.id ? (
                      <input
                        type="text"
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
                      <button
                        className="edit-btn"
                        onClick={() => saveStaffEdit(s.id)}
                      >
                        Save
                      </button>
                    ) : (
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
                            Status: s.Status,
                            joining: s.joining,
                          });
                        }}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="delete-btn"
                      onClick={() => deleteStaff(s.id)}
                    >
                      {" "}
                      Delete{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* DOCTORS */}
      {step === "doctors" && (
        <div className="doctor-section">
          <div className="section-header">
            <h2>Doctors</h2>
            <button className="add-btn" onClick={() => setShowDoctorForm(true)}>
              +Add Doctor
            </button>
          </div>

          {showDoctorForm && (
            <div className="staff-form-popup">
              <div className="staff-form">
                <h2>Add Doctor</h2>

                <input
                  type="text"
                  placeholder="Doctor Name"
                  value={newDoctor.name}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, name: e.target.value })
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
                  value={newDoctor.phone}
                  onChange={(e) =>
                    setNewDoctor({
                      ...newDoctor,
                      phone: e.target.value,
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
                  <button className="save-btn" onClick={addDoctor}>
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
          )}

          <div className="doctor-grid">
            {doctors.map((d) => (
              <div className="doctor-card" key={d.id}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="doctor"
                />

                {editingDoctorId === d.id ? (
                  <>
                    <input
                      type="text"
                      value={editeDoctor.name}
                      onChange={(e) =>
                        setEditeDoctor({
                          ...editeDoctor,
                          name: e.target.value,
                        })
                      }
                    />

                    <input
                      type="text"
                      value={editeDoctor.phone}
                      onChange={(e) =>
                        setEditeDoctor({
                          ...editeDoctor,
                          phone: e.target.value,
                        })
                      }
                    />

                    <input
                      type="text"
                      value={editeDoctor.specialization}
                      onChange={(e) =>
                        setEditeDoctor({
                          ...editeDoctor,
                          specialization: e.target.value,
                        })
                      }
                    />

                    <input
                      type="text"
                      value={editeDoctor.qualification}
                      onChange={(e) =>
                        setEditeDoctor({
                          ...editeDoctor,
                          qualification: e.target.value,
                        })
                      }
                    />

                    <input
                      type="text"
                      value={editeDoctor.experience}
                      onChange={(e) =>
                        setEditeDoctor({
                          ...editeDoctor,
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
                  {editingDoctorId === d.id ? (
                    <button
                      className="edit-btn"
                      onClick={() => saveDoctorEdite(d.id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingDoctorId(d.id);

                        setEditeDoctor({
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
                    onClick={() => deleteDoctor(d.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PATIENTS */}
      {step === "patients" && (
        <div className="table-container">
          <div className="section-header">
            <h2>Patients</h2>
            <button
              className="add-btn"
              onClick={() => setShowPatientForm(true)}
            >
              + Add Patient
            </button>
          </div>

          {showPatientForm && (
            <div className="staff-form-popup">
              <div className="staff-form">
                <h2>Add Patient</h2>

                <input
                  type="text"
                  placeholder="Patient Name"
                  value={newPatient.name}
                  onChange={(e) =>
                    setNewPatient({
                      ...newPatient,
                      name: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Age"
                  value={newPatient.age}
                  onChange={(e) =>
                    setNewPatient({
                      ...newPatient,
                      age: e.target.value,
                    })
                  }
                />

                <select
                  value={newPatient.gender}
                  onChange={(e) =>
                    setNewPatient({
                      ...newPatient,
                      gender: e.target.value,
                    })
                  }
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>

                <input
                  type="text"
                  placeholder="Phone"
                  value={newPatient.phone}
                  onChange={(e) =>
                    setNewPatient({
                      ...newPatient,
                      phone: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Disease"
                  value={newPatient.disease}
                  onChange={(e) =>
                    setNewPatient({
                      ...newPatient,
                      disease: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Doctor"
                  value={newPatient.doctor}
                  onChange={(e) =>
                    setNewPatient({
                      ...newPatient,
                      doctor: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Admission Date"
                  value={newPatient.admission}
                  onChange={(e) =>
                    setNewPatient({
                      ...newPatient,
                      admission: e.target.value,
                    })
                  }
                />

                <select
                  value={newPatient.status}
                  onChange={(e) =>
                    setNewPatient({
                      ...newPatient,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="">Select Status</option>
                  <option value="Admitted">Admitted</option>
                  <option value="Discharged">Discharged</option>
                </select>

                <div className="form-buttons">
                  <button className="save-btn" onClick={addPatient}>
                    Save
                  </button>

                  <button
                    className="cancel-btn"
                    onClick={() => setShowPatientForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Phone no.</th>
                <th>Disease</th>
                <th>Doctor</th>
                <th>Admission</th>
                <th>Status</th>
                <th>Prescription</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>

                  {/* NAME */}
                  <td>
                    {editingPatientId === p.id ? (
                      <input
                        type="text"
                        value={editedPatient.name}
                        onChange={(e) =>
                          setEditedPatient({
                            ...editedPatient,
                            name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      p.name
                    )}
                  </td>

                  {/* AGE */}
                  <td>
                    {editingPatientId === p.id ? (
                      <input
                        type="text"
                        value={editedPatient.age}
                        onChange={(e) =>
                          setEditedPatient({
                            ...editedPatient,
                            age: e.target.value,
                          })
                        }
                      />
                    ) : (
                      p.age
                    )}
                  </td>

                  {/* GENDER */}
                  <td>
                    {editingPatientId === p.id ? (
                      <select
                        value={editedPatient.gender}
                        onChange={(e) =>
                          setEditedPatient({
                            ...editedPatient,
                            gender: e.target.value,
                          })
                        }
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </select>
                    ) : (
                      p.gender
                    )}
                  </td>

                  {/* PHONE */}
                  <td>
                    {editingPatientId === p.id ? (
                      <input
                        type="text"
                        value={editedPatient.phone}
                        onChange={(e) =>
                          setEditedPatient({
                            ...editedPatient,
                            phone: e.target.value,
                          })
                        }
                      />
                    ) : (
                      p.phone
                    )}
                  </td>

                  {/* DISEASE */}
                  <td>
                    {editingPatientId === p.id ? (
                      <input
                        type="text"
                        value={editedPatient.disease}
                        onChange={(e) =>
                          setEditedPatient({
                            ...editedPatient,
                            disease: e.target.value,
                          })
                        }
                      />
                    ) : (
                      p.disease
                    )}
                  </td>

                  {/* DOCTOR */}
                  <td>
                    {editingPatientId === p.id ? (
                      <input
                        type="text"
                        value={editedPatient.doctor}
                        onChange={(e) =>
                          setEditedPatient({
                            ...editedPatient,
                            doctor: e.target.value,
                          })
                        }
                      />
                    ) : (
                      p.doctor
                    )}
                  </td>

                  {/* ADMISSION */}
                  <td>
                    {editingPatientId === p.id ? (
                      <input
                        type="text"
                        value={editedPatient.admission}
                        onChange={(e) =>
                          setEditedPatient({
                            ...editedPatient,
                            admission: e.target.value,
                          })
                        }
                      />
                    ) : (
                      p.admission
                    )}
                  </td>

                  {/* STATUS */}
                  <td>
                    {editingPatientId === p.id ? (
                      <select
                        value={editedPatient.status}
                        onChange={(e) =>
                          setEditedPatient({
                            ...editedPatient,
                            status: e.target.value,
                          })
                        }
                      >
                        <option value="Admitted">Admitted</option>
                        <option value="Discharged">Discharged</option>
                      </select>
                    ) : (
                      <span
                        className={
                          p.status === "Admitted"
                            ? "status-admitted"
                            : "status-discharged"
                        }
                      >
                        {p.status}
                      </span>
                    )}
                  </td>

                  <td>
                    <button
                      className="view-btn"
                      onClick={() => {
                        setSelectedPatient(p);
                        setShowPrescription(true);
                      }}
                    >
                      View
                    </button>
                  </td>

                  {/* ACTIONS */}
                  <td>
                    {editingPatientId === p.id ? (
                      <button
                        className="edit-btn"
                        onClick={() => savePatientEdit(p.id)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="edit-btn"
                        onClick={() => {
                          setEditingPatientId(p.id);

                          setEditedPatient({
                            name: p.name,
                            age: p.age,
                            gender: p.gender,
                            phone: p.phone,
                            disease: p.disease,
                            doctor: p.doctor,
                            admission: p.admission,
                            status: p.status,
                          });
                        }}
                      >
                        Edit
                      </button>
                    )}

                    <button
                      className="delete-btn"
                      onClick={() => deletePatient(p.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showPrescription && selectedPatient && (
            <div className="staff-form-popup">
              <div className="prescription-modal">
                <h2>Patient Prescription</h2>

                <p>
                  <strong>Name:</strong> {selectedPatient.name}
                </p>

                <p>
                  <strong>Doctor:</strong> {selectedPatient.doctor}
                </p>

                <p>
                  <strong>Disease:</strong> {selectedPatient.disease}
                </p>

                <p>
                  <strong>Prescription:</strong>
                  {selectedPatient.prescription}
                </p>

                <p>
                  <strong>Tests:</strong>
                  {selectedPatient.tests.join(", ")}
                </p>

                <p>
                  <strong>Insurance:</strong>
                  {selectedPatient.insurance}
                </p>

                <p>
                  <strong>Reports:</strong>
                </p>

                <ul>
                  {selectedPatient.reports.map((report, index) => (
                    <li key={index}>{report}</li>
                  ))}
                </ul>

                {selectedPatient.status === "Discharged" && (
                  <p>
                    <strong>Bill:</strong> {selectedPatient.bill}
                  </p>
                )}

                <div className="form-buttons">
                  <button
                    className="save-btn"
                    onClick={() => downloadPrescription(selectedPatient)}
                  >
                    Download
                  </button>

                  <button
                    className="cancel-btn"
                    onClick={() => setShowPrescription(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}

export default Admin;
