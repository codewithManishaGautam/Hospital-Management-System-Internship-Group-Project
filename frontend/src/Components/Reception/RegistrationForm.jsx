import React, { useState, useEffect } from "react";
import axios from "axios";
import generateUHID from "./utils/generateUHID";
import { createPatient, updatePatient } from "./services/patientService";
import "../../styles/Reception/registration.css";

function RegistrationForm({ patient, setSelectedPatient, setStep, mode }) {
  const [formData, setFormData] = useState({
    uhid: "",
    name: "",
    age: "",
    gender: "",
    mobile: "",
    address: "",

    role: "OPD",

    disease: "",
    doctor: "",
    department: "",
    appointmentDate: "",
    appointmentTime: "",

    admissionDate: "",
    dischargeDate: "",
    roomNo: "",
    roomType: "",
    roomId: "",
    bedId: "",
    bedNo: "",

    status: "Waiting",
  });

  const [rooms, setRooms] = useState([]);
  const [beds, setBeds] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const roomRes = await axios.get("http://localhost:5000/api/rooms");
        setRooms(roomRes.data);

        const bedRes = await axios.get(
          "http://localhost:5000/api/beds/available",
        );

        const doctorRes = await axios.get(
          "http://localhost:5000/api/admin/doctors",
        );

        setDoctors(doctorRes.data);
        setBeds(bedRes.data);
        console.log("Rooms :", roomRes.data);
        console.log("Beds :", bedRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadRooms();
  }, []);

  useEffect(() => {
    if (!patient) {
      setFormData({
        uhid: "",
        name: "",
        age: "",
        gender: "",
        mobile: "",
        address: "",
        role: "OPD",
        disease: "",
        department: "",
        doctor: "",
        appointmentDate: "",
        appointmentTime: "",
        admissionDate: "",
        dischargeDate: "",
        roomNo: "",
        bedNo: "",
        status: "Waiting",
      });
      return;
    }

    setFormData({
      uhid: patient.uhid || "",
      name: patient.name || "",
      age: patient.age || "",
      gender: patient.gender || "",
      mobile: patient.mobile || "",
      address: patient.address || "",
      role: patient.role || "OPD",
      disease: patient.disease || "",
      department: patient.department || "",
      doctor: patient.doctor || "",
      appointmentDate: patient.appointmentDate || "",
      appointmentTime: patient.appointmentTime || "",
      admissionDate: patient.admissionDate || "",
      dischargeDate: patient.dischargeDate || "",
      roomNo: patient.roomNo || "",
      bedNo: patient.bedNo || "",
      status: patient.status || "Waiting",
    });
  }, [patient]);

  useEffect(() => {
    const loadBeds = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/beds/available");

        setBeds(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadBeds();
  }, [formData.roomNo]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGenerateUHID = () => {
    if (!formData.mobile) {
      alert("Enter Mobile Number First");
      return;
    }

    const uhid = generateUHID(formData.mobile);

    setFormData((prev) => ({
      ...prev,
      uhid,
    }));
  };

  const selectedDoctor = doctors.find(
  (doctor) => doctor._id === formData.doctor
);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mobile Validation
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      alert("Please enter a valid 10 digit mobile number.");
      return;
    }
    // PATIENT NAME
    if (formData.name.trim().length < 3) {
      alert("Patient name must be at least 3 characters.");
      return;
    }

    // AGE
    if (formData.age < 1 || formData.age > 120) {
      alert("Age must be between 1 and 120.");
      return;
    }

    // ADDRESS
    if (formData.address.trim().length < 5) {
      alert("Please enter a valid address.");
      return;
    }

    // DEPARTMENT
    if (!formData.department) {
      alert("Please Select Department");
      return;
    }

    // DOCTOR NAME
    if (!formData.doctor) {
      alert("Please Select Doctor");
      return;
    }

    // APPOINTMENT DATE
    const today = new Date().toISOString().split("T")[0];

    if (formData.appointmentDate && formData.appointmentDate < today) {
      alert("Appointment date cannot be in the past.");
      return;
    }

    // APPOINTMENT TIME
    if (formData.appointmentDate && !formData.appointmentTime) {
      alert("Please select appointment time.");
      return;
    }

    // ROOM
    if (
      (formData.role === "IPD" || formData.role === "ICU") &&
      !formData.roomNo
    ) {
      alert("Please select room.");
      return;
    }

    // BED
    if (
      (formData.role === "IPD" || formData.role === "ICU") &&
      !formData.bedNo
    ) {
      alert("Please select bed.");
      return;
    }

    // UHID
    if (!formData.uhid) {
      alert("Please generate UHID first.");
      return;
    }

    // const selectedDoctor = doctors.find((d) => d._id === formData.doctor);

    try {
      const patientData = {
        uhid: formData.uhid,
        name: formData.name,
        age: Number(formData.age),
        gender: formData.gender,
        mobile: formData.mobile,
        address: formData.address,

        role: formData.role,

        roomType: formData.roomType,

        disease: formData.disease,
        department: formData.department,
        doctor: selectedDoctor ? selectedDoctor.name : "",

        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,

        admissionDate: formData.admissionDate,
        dischargeDate: formData.dischargeDate,

        roomNo: formData.roomNo,
        bedNo: formData.bedNo,

        doctorId: formData.doctor,
        doctor: doctors.find((d) => d._id === formData.doctor)?.name || "",
        //         appointmentDate: formData.appointmentDate,
        // appointmentTime: formData.appointmentTime,

        // status: "Waiting Doctor",

        // flowStatus: "Appointment Booked",

        fee: 500,
        // paymentStatus: "Pending",

        ipdNo: "",

        diagnosis: "",
        prescription: "",
        advice: "",
        notes: "",

        newAppointment: mode === "appointment",

        labReport: "",

        medicinesIssued: [],

        nurseNotes: "",
        vitals: "",

        insuranceStatus: "",
        claimNumber: "",

        status:
          formData.role === "IPD" || formData.role === "ICU"
            ? "Admitted"
            : formData.appointmentDate && formData.appointmentTime
              ? "Waiting Doctor"
              : patient
                ? patient.status
                : "Waiting",

        currentDepartment: "Doctor",

        flowStatus:
          formData.role === "IPD" || formData.role === "ICU"
            ? "Admitted"
            : formData.appointmentDate && formData.appointmentTime
              ? "Appointment Booked"
              : patient
                ? patient.flowStatus
                : "Registered",

        paymentStatus:
          formData.appointmentDate && formData.appointmentTime
            ? "Pending"
            : patient
              ? patient.paymentStatus
              : "Pending",
      };

      if (mode === "edit") {
        await updatePatient(patient._id, patientData);

        alert("Patient Updated Successfully");

        setSelectedPatient(null);
      } else if (!patient) {
        await createPatient(patientData);

        alert("Patient Registered Successfully");
      } else if (mode === "appointment") {
        await updatePatient(patient._id, {
          ...patientData,

          paymentStatus: "Pending",

          status: "Waiting Doctor",

          flowStatus: "Appointment Booked",
        });

        alert("Appointment Booked Successfully");
      }

      setSelectedPatient(null);
      setStep("dashboard");

      setFormData({
        uhid: "",
        name: "",
        age: "",
        gender: "",
        mobile: "",
        address: "",

        role: "OPD",

        disease: "",
        doctor: "",

        appointmentDate: "",
        appointmentTime: "",

        admissionDate: "",
        dischargeDate: "",

        roomNo: "",
        bedNo: "",

        status: "Waiting",
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
          {/* Patient Name */}
          <div className="form-group">
            <label>Patient Name</label>
            <input
              type="text"
              name="name"
              readOnly={mode === "appointment"}
              value={formData.name}
              onChange={(e) => {
                const value = e.target.value.replace(/[^A-Za-z\s]/g, "");

                setFormData((prev) => ({
                  ...prev,
                  name: value,
                }));
              }}
              placeholder="Enter Patient Name"
              required
            />
          </div>

          {/* Age */}
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              readOnly={mode === "appointment"}
              value={formData.age}
              onChange={(e) => {
                const value = e.target.value;

                if (
                  value === "" ||
                  (Number(value) >= 0 && Number(value) <= 120)
                ) {
                  setFormData((prev) => ({
                    ...prev,
                    age: value,
                  }));
                }
              }}
              placeholder="Enter Age"
              min="0"
              max="120"
              required
            />
          </div>

          {/* Gender */}
          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              disabled={mode === "appointment"}
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

          {/* Mobile */}
          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="text"
              name="mobile"
              readOnly={mode === "appointment"}
              value={formData.mobile}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

                if (value.length <= 10) {
                  setFormData((prev) => ({
                    ...prev,
                    mobile: value,
                  }));
                }
              }}
              placeholder="Enter 10 Digit Mobile Number"
              maxLength={10}
              required
            />
          </div>

          {/* Address */}
          <div className="form-group full-width">
            <label>Address</label>
            <textarea
              rows="3"
              name="address"
              readOnly={mode === "appointment"}
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter Address"
              maxLength={200}
              required
            />
          </div>

          {/* Patient Type */}
          <div className="form-group">
            <label>Patient Type</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="OPD">OPD</option>
              <option value="IPD">IPD</option>
              <option value="ICU">ICU</option>
              <option value="OT">OT</option>
              <option value="Casualty">Casualty</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>

          {/* UHID */}
          <div className="form-group full-width">
            <label>UHID Number</label>

            <div className="uhid-container">
              <input
                type="text"
                value={formData.uhid}
                readOnly
                placeholder="Generated UHID"
              />

              {!patient && mode !== "appointment" && (
                <button
                  type="button"
                  className="generate-btn"
                  onClick={handleGenerateUHID}
                >
                  Generate UHID
                </button>
              )}
            </div>
          </div>

          {/* Extra Fields */}
          {/* {formData.role !== "OPD" && ( */}
          <>
            <div className="form-group">
              <label>Disease / Complaint</label>
              <input
                type="text"
                name="disease"
                value={formData.disease}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^A-Za-z\s]/g, "");

                  setFormData((prev) => ({
                    ...prev,
                    disease: value,
                  }));
                }}
                placeholder="Disease"
              />
            </div>

            <div className="form-group">
              <label>Department</label>

              <select
                name="department"
                value={formData.department}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    department: e.target.value,
                    doctor: "",
                  }));
                }}
              >
                <option value="">Select Department</option>

                {[...new Set(doctors.map((d) => d.specialization))].map(
                  (dep) => (
                    <option key={dep} value={dep}>
                      {dep}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div className="form-group">
              <label>Doctor</label>

              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
              >
                <option value="">Select Doctor</option>

                {doctors
                  .filter(
                    (doctor) => doctor.specialization === formData.department,
                  )
                  .map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      Dr. {doctor.name}
                    </option>
                  ))}
              </select>
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

            {formData.role !== "OPD" && (
              <>
                <div className="form-group">
                  <label>Admission Date</label>
                  <input
                    type="date"
                    name="admissionDate"
                    value={formData.admissionDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Room</label>

                  <select
                    name="roomNo"
                    value={formData.roomNo}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        roomNo: e.target.value,
                        bedNo: "",
                      }));
                    }}
                  >
                    <option value="">Select Room</option>

                    {rooms
                      .filter((room) => {
                        if (room.status !== "Available") return false;

                        if (formData.role === "IPD") {
                          return room.roomType === "General";
                        }

                        if (formData.role === "ICU") {
                          return room.roomType === "ICU";
                        }

                        return true;
                      })
                      .map((room) => (
                        <option key={room._id} value={room.roomNumber}>
                          {room.roomNumber}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Bed</label>

                  {console.log("Selected Room:", formData.roomNo)}

                  <select
                    name="bedNo"
                    value={formData.bedNo}
                    onChange={handleChange}
                  >
                    <option value="">Select Bed</option>

                    {beds
                      .filter((bed) => bed.roomNumber === formData.roomNo)
                      .map((bed) => (
                        <option key={bed._id} value={bed.bedNo}>
                          {bed.bedNo}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Waiting">Waiting</option>
                    <option value="Admitted">Admitted</option>
                    <option value="Shifted">Shifted</option>
                    <option value="Discharged">Discharged</option>
                  </select>
                </div>
              </>
            )}
          </>
        </div>

        <div className="form-buttons">
          <button type="submit" className="save-btn">
            {mode === "edit"
              ? "Update Patient"
              : mode === "appointment"
                ? "Book Appointment"
                : "Register Patient"}
          </button>

         {/* <button
  type="button"
  className="send-btn"
  onClick={async () => {
    if (!patient) {
      alert("Please Register Patient First");
      return;
    }

    try {
      await updatePatient(patient._id, {
        doctor: selectedDoctor?.name,
        doctorId: selectedDoctor?._id,

        status: "Waiting Doctor",
        flowStatus: "Appointment Booked",

        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
      });

      alert(`Patient sent to Dr. ${selectedDoctor?.name}`);
    } catch (err) {
      console.log(err);
      alert("Send Failed");
    }
  }}
>
  Send To Doctor
</button> */}

          {/* {formData.role === "OPD" && (
            <button
              type="button"
              className="generate-btn"
              onClick={() => {
                if (!formData.uhid) {
                  alert("Register Patient First");
                  return;
                }

                alert(`Appointment Generated for ${formData.name}`);
              }}
            >
              Generate Appointment
            </button>
          )} */}
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
