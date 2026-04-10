import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [patients, setPatients] = useState([]);

  // Add Patient
  const addPatient = async () => {
    await axios.post("http://localhost:5000/addPatient", {
      name: name,
    });
    loadPatients();
  };

  // Load Patients
  const loadPatients = async () => {
    const res = await axios.get("http://localhost:5000/patients");
    setPatients(res.data);
  };

  // Remove Patient
  const removePatient = async (id) => {
    await axios.delete(`http://localhost:5000/patients/${id}`);
    loadPatients();
  };

  useEffect(() => {
    loadPatients();
  }, []);

  return (
    <div className="container">
      <h1>Hospital Management System</h1>

      <div>
        <input
          placeholder="Enter Patient Name"
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addPatient}>Add Patient</button>
      </div>

      <div className="patient-list">
        <h2>Patient List</h2>
        {patients.map((p) => (
          <div className="patient-item" key={p._id}>
            <span>{p.name}</span>
            <button className="remove-button" onClick={() => removePatient(p._id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
