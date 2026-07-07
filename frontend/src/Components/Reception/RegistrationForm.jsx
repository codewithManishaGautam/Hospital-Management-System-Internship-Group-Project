import React, { useState, useEffect } from "react";
import generateUHID from "./utils/generateUHID";
import { createPatient } from "./services/patientService";
import "../../styles/Reception/registration.css";
function RegistrationForm({ patient }) {
  const [formData, setFormData] = useState({
    uhid: "",
    name: "",
    age: "",
    gender: "",
    mobile: "",
    address: "",

    disease: "",
    doctor: "",

    appointmentDate: "",
    appointmentTime: "",
  });
  useEffect(() => {
    if (patient) {
      setFormData({
        uhid: patient.uhid || "",

        name: patient.name || "",

        age: patient.age || "",

        gender: patient.gender || "",

        mobile: patient.mobile || "",

        address: patient.address || "",

        disease: patient.disease || "",

        doctor: patient.doctor || "",

        appointmentDate: patient.appointmentDate || "",

        appointmentTime: patient.appointmentTime || "",
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateUHID = () => {
    if (!formData.mobile) {
      alert("Enter Mobile Number First");
      return;
    }

    const uhid = generateUHID(formData.mobile);

    setFormData({
      ...formData,
      uhid,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const patientData = {
        uhid: formData.uhid,

        name: formData.name,

        age: Number(formData.age),

        gender: formData.gender,

        mobile: formData.mobile,

        address: formData.address,

        disease: formData.disease,

        doctor: formData.doctor,

        appointmentDate: formData.appointmentDate,

        appointmentTime: formData.appointmentTime,

        role: "OPD",

        fee: 500,

        paymentStatus: "Pending",

        status: "Waiting",

        roomNo: "",

        bedNo: "",

        admissionDate: "",

        ipdNo: "",

        // Doctor
        diagnosis: "",
        prescription: "",
        advice: "",
        notes: "",

        // Lab
        labReport: "",

        // Pharmacy
        medicinesIssued: [],

        // Nurse
        nurseNotes: "",
        vitals: "",

        // Insurance
        insuranceStatus: "",
        claimNumber: "",

        status: "Waiting Doctor",

        diagnosis: "",

        prescription: "",

        advice: "",

        notes: "",

        currentDepartment: "Doctor",

        flowStatus: "Registered",
      };

      await createPatient(patientData);

      alert("Patient Registered Successfully");
      window.location.reload();

      setFormData({
        uhid: "",
        name: "",
        age: "",
        gender: "",
        mobile: "",
        address: "",
        disease: "",
        doctor: "",
        appointmentDate: "",
        appointmentTime: "",
      });
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-header">
        <h2>Patient Registration</h2>
      </div>

      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Patient Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Patient Name"
              required
            />
          </div>

          <div className="form-group">
            <label>Age</label>

            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter Age"
              required
            />
          </div>

          <div className="form-group">
            <label>Gender</label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>

              <option value="Male">Male</option>

              <option value="Female">Female</option>

              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Mobile Number</label>

            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter Mobile Number"
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Address</label>

            <textarea
              rows="3"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter Address"
            />
          </div>

          <div className="form-group">
            <label>Disease / Complaint</label>

            <input
              name="disease"
              value={formData.disease}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Doctor</label>

            <input
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Appointment Date</label>

            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Appointment Time</label>

            <input
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label>UHID Number</label>

            <div className="uhid-container">
              <input
                type="text"
                value={formData.uhid}
                readOnly
                placeholder="Generated UHID"
              />

              <button
                type="button"
                className="generate-btn"
                onClick={handleGenerateUHID}
              >
                Generate UHID
              </button>
            </div>
          </div>
        </div>

        <div className="form-buttons">
          <button type="submit" className="save-btn">
            Save Registration
          </button>

          <button type="button" className="send-btn">
            Send To Doctor
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
