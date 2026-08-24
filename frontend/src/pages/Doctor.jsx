import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../pages/Layout";
import PatientsDashboard from "../Components/Doctor/PatientsDashboard";

// import "./doctor.css";

import Dashboard from "../Components/Doctor/Dashboard";
import ProfileDashboard from "../Components/Doctor/ProfileDashboard";

function Doctor() {
  const user = JSON.parse(localStorage.getItem("user"));

  const doctorId = user?.doctorId || "";
  const doctorName = user?.doctorName || "";

  console.log("User =", user);
  console.log("Doctor Name =", doctorName);
  const [step, setStep] = useState("dashboard");

  console.log("Doctor Name =", doctorName);

  const [todayPatients, setTodayPatients] = useState([]);
  const [historyPatients, setHistoryPatients] = useState([]);

  useEffect(() => {
    if (!doctorId) {
      console.log("Doctor ID not found");
      return;
    }

    fetchTodayPatients();
    fetchHistoryPatients();
    fetchAppointments();
  }, [doctorId]);

  const fetchTodayPatients = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/doctor/today-patients/${doctorId}`,
      );

      setTodayPatients(res.data.patients);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchHistoryPatients = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/doctor/history-patients/${doctorId}`,
      );

      console.log("History API =", res.data);

      setHistoryPatients(res.data.patients);
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
        (item) =>
          item.doctor === `Dr. ${doctorName}` || item.doctor === doctorName,
      );

      console.log("My Appointments =", myAppointments);

      // setAppointments(myAppointments);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout role="Doctor" step={step} setStep={setStep}>
      {step === "dashboard" && (
        <Dashboard doctorName={doctorName} patients={todayPatients} />
      )}

      {step === "profile-dashboard" && (
        <ProfileDashboard doctorName={doctorName} />
      )}

      {step === "patients" && <PatientsDashboard patients={historyPatients} />}
    </Layout>
  );
}

export default Doctor;
