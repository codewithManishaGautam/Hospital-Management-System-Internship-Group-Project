import React, { useState } from "react";
import Layout from "./Layout";
// import "./Nurse.css";
// pages/LabModule.jsx

//import React, { useState } from "react";
import "./lab.css";

function Lab() {
  const [tests, setTests] = useState([]);

  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    test: "",
    sample: "",
    payment: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerTest = () => {
    if (
      !formData.patient ||
      !formData.doctor ||
      !formData.test
    ) {
      alert("Please fill all fields");
      return;
    }

    const newTest = {
      id: tests.length + 1,
      ...formData,
      status: "Pending",
      report: "Not Generated",
    };

    setTests([...tests, newTest]);

    setFormData({
      patient: "",
      doctor: "",
      test: "",
      sample: "",
      payment: "",
    });
  };

  const processTest = (id) => {
    const updated = tests.map((item) =>
      item.id === id
        ? { ...item, status: "Processing" }
        : item
    );

    setTests(updated);
  };

  const completeTest = (id) => {
    const updated = tests.map((item) =>
      item.id === id
        ? {
            ...item,
            status: "Completed",
            report: "Generated",
          }
        : item
    );

    setTests(updated);
  };

  return (
    <div className="container">
      <h1>Hospital Lab Management System</h1>

      {/* Registration Form */}

      <div className="form-box">
        <input
          type="text"
          name="patient"
          placeholder="Patient Name"
          value={formData.patient}
          onChange={handleChange}
        />

        <input
          type="text"
          name="doctor"
          placeholder="Doctor Name"
          value={formData.doctor}
          onChange={handleChange}
        />

        <input
          type="text"
          name="test"
          placeholder="Test Name"
          value={formData.test}
          onChange={handleChange}
        />

        <select
          name="sample"
          value={formData.sample}
          onChange={handleChange}
        >
          <option value="">Select Sample</option>
          <option>Blood</option>
          <option>Urine</option>
          <option>X-Ray</option>
          <option>MRI</option>
        </select>

        <input
          type="text"
          name="payment"
          placeholder="Payment Status"
          value={formData.payment}
          onChange={handleChange}
        />

        <button onClick={registerTest}>
          Register Test
        </button>
      </div>

      {/* Dashboard */}

      <div className="cards">
        <div className="card">
          <h2>Total Tests</h2>
          <p>{tests.length}</p>
        </div>

        <div className="card">
          <h2>Completed</h2>
          <p>
            {
              tests.filter(
                (item) => item.status === "Completed"
              ).length
            }
          </p>
        </div>

        <div className="card">
          <h2>Pending</h2>
          <p>
            {
              tests.filter(
                (item) => item.status !== "Completed"
              ).length
            }
          </p>
        </div>
      </div>

      {/* Table */}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Test</th>
            <th>Sample</th>
            <th>Status</th>
            <th>Report</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tests.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.patient}</td>
              <td>{item.doctor}</td>
              <td>{item.test}</td>
              <td>{item.sample}</td>
              <td>{item.status}</td>
              <td>{item.report}</td>
              <td>{item.payment}</td>

              <td>
                {item.status === "Pending" && (
                  <button
                    className="process-btn"
                    onClick={() =>
                      processTest(item.id)
                    }
                  >
                    Process
                  </button>
                )}

                {item.status === "Processing" && (
                  <button
                    className="complete-btn"
                    onClick={() =>
                      completeTest(item.id)
                    }
                  >
                    Complete
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

export default Lab;