import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../pages/Layout";
import PrescriptionPage from "../Components/Reception/PrescriptionPage";

// import "./doctor.css";

import Dashboard from "../Components/Doctor/Dashboard";
import ProfileDashboard from "../Components/Doctor/ProfileDashboard";

function Doctor() {
  const user = JSON.parse(localStorage.getItem("user"));
  const doctorName = user?.name || "";
  const navigate = useNavigate();

  const [step, setStep] = useState("dashboard");

  console.log("Doctor Name =", doctorName);

  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    fetchPatients();
    fetchAppointments();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/doctor/patients/${doctorName}`,
      );

      console.log("Doctor API Response :", res.data);

      setPatients(res.data.patients);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/doctor/upcoming-appointments",
      );

      console.log("Appointments API =", res.data);

      const myAppointments = res.data.data.filter(
        (item) => item.doctor === doctorName,
      );

      console.log("My Appointments =", myAppointments);

      setAppointments(myAppointments);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout role="Doctor" step={step} setStep={setStep}>
      {step === "dashboard" && (
        <Dashboard doctorName={doctorName} patients={patients} />
      )}

      {step === "profile-dashboard" && <ProfileDashboard />}

      {/* {step === "profile-dashboard" && (
  <ProfileDashboard />
)} */}

      {/* <div className="doctor-dashboard">
        <h2>Welcome Dr. {doctorName}</h2>

        <div className="doctor-cards">
          <div className="doctor-card">
            <h3>Today's Appointments</h3>
            <h1>{appointments.length}</h1>
          </div>

          <div className="doctor-card">
            <h3>Pending</h3>
            <h1>{appointments.filter((x) => x.status === "Pending").length}</h1>
          </div>

          <div className="doctor-card">
            <h3>My Patients</h3>
            <h1>{patients.length}</h1>
          </div>
        </div>

        <div className="patient-table">
          <table>
            <thead>
              <tr>
                <th>UHID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Disease</th>
                <th>Doctor</th>
                <th>Appointment</th>
                <th>Patient Type</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((p) => (
                <tr key={p._id}>
                  <td>{p.uhid}</td>

                  <td>{p.name}</td>

                  <td>{p.age}</td>

                  <td>{p.gender}</td>

                  <td>{p.mobile}</td>

                  <td>{p.address}</td>

                  <td>{p.disease}</td>

                  <td>{p.doctor}</td>

                  <td>
                    {p.appointmentDate}
                    <br />
                    {p.appointmentTime}
                  </td>

                  <td>{p.role}</td>

                  <td>{p.paymentStatus}</td>

                  <td>{p.status}</td>

                  <td>
                    <button
                      className="view-btn"
                      onClick={() => navigate(`/prescription/${p._id}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </Layout>
  );
}

export default Doctor;
