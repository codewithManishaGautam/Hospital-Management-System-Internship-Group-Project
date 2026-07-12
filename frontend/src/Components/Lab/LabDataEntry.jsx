import React, { useState } from "react";

function LabDataEntry({ labData, setLabData }) {
  const [formData, setFormData] = useState({
    patientName: "",
    testName: "",
    sampleStatus: "Pending",
    paymentStatus: "Unpaid",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.patientName.trim()) {
      return;
    }

    setLabData([
      ...labData,
      {
        id: Date.now().toString(),
        ...formData,
      },
    ]);

    setFormData({
      patientName: "",
      testName: "",
      sampleStatus: "Pending",
      paymentStatus: "Unpaid",
    });
  };

  return (
    <form className="lab-data-entry" onSubmit={handleSubmit}>
      <div className="lab-data-entry__fields">
        <label>
          Patient Name
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="Enter patient name"
          />
        </label>

        <label>
          Test Name
          <input
            type="text"
            name="testName"
            value={formData.testName}
            onChange={handleChange}
            placeholder="Enter test name"
          />
        </label>

        <label>
          Sample Status
          <select
            name="sampleStatus"
            value={formData.sampleStatus}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Collected">Collected</option>
            <option value="Rejected">Rejected</option>
          </select>
        </label>

        <label>
          Payment Status
          <select
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
          >
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
            <option value="Partial">Partial</option>
          </select>
        </label>
      </div>

      <button type="submit">Add Patient</button>
    </form>
  );
}

export default LabDataEntry;
