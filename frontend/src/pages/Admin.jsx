import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import "./Admin.css";

function Admin() {
  const [step, setStep] = useState("admin-dashboard");

  const [tpaList, setTpaList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  useEffect(() => {
    if (step === "insurance-master") {
      fetchMasterData();
    }
  }, [step]);

  const fetchMasterData = async () => {
    try {
      const resTpa = await axios.get("http://localhost:5000/api/insurance/master-data/tpas");
      if (resTpa.data.success) setTpaList(resTpa.data.data);
      
      const resComp = await axios.get("http://localhost:5000/api/insurance/master-data/companies");
      if (resComp.data.success) setCompanyList(resComp.data.data);
    } catch (err) {
      console.error("Error fetching master data:", err);
    }
  };

  const doctors = [
    { id: 1, name: "Dr. Sharma", specialization: "Cardiologist", experience: "10 years", Phone: "1111111111" },
    { id: 2, name: "Dr. Mehta", specialization: "Neurologist", experience: "5 years", Phone: "2222222222"  },
    { id: 3, name: "Dr. Patel", specialization: "Dentist", experience: "16 years", Phone: "3333333333" },
  ];

const staff = [
  {
    id: 1,
    name: "Rahul Sharma",
    aadhaar: "4587 9632 1452",
    phone: "9876543210",
    role: "Receptionist",
    salary: "15000",
    Status: "Active",
    joining: "12 Jan 2025",
  },

  {
    id: 2,
    name: "Priya Mehta",
    aadhaar: "7412 8523 9631",
    phone: "9876501234",
    role: "Nurse",
    salary: "20000",
    Status: "Leave",
    joining: "05 Mar 2025",
  },

  {
    id: 3,
    name: "Aman Verma",
    aadhaar: "9632 7412 8520",
    phone: "9988776655",
    role: "Lab Assistant",
    salary: "18000",
    Status: "Active",
    joining: "18 Feb 2025",
  },
];

  const patients = [
    { Id: 1, Name: "Amit", Age: "19", Gender: "Male", Phone: "1010101010", Disease: "Fever", Doctor: "Dr.patel", Admission: "12th jan 2026", Status: "Admitted"},
    { Id: 2, Name: "Sneha", Age: "40", Gender: "Female", Phone: "2020202020", Disease: "weekness", Doctor: "Dr.Sharma", Admission: "1st april 2026", Status: "Discharged"},
    { Id: 3, Name: "Tanmay", Age: "30", Gender: "Male",Phone: "3030303030",Disease: "Diabetes",  Doctor: "Dr.Salunke", Admission: "3rd march 2026j", Status: "Admitted"},
    { Id: 4, Name: "Rohit", Age: "70", Gender: "Male", Phone: "3030303030",Disease: "Asthma", Doctor: "Dr.Shukla", Admission: "2th april 2026", Status: "Admitted" },
    { Id: 5, Name: "Neha", Age: "10", Gender: "Female", Phone: "4040404040", Disease: "Migraine", Doctor: "Dr. Vishal", Admission: "30th January 2023", Status: "Admitted"  },
  ];

  return (
    <Layout role="Admin" setStep={setStep}>

      {/* DASHBOARD */}
      {step === "admin-dashboard" && (
        <div className="dashboard-container">

          <h2 className="dashboard-title">
            Welcome Administrator
          </h2>

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
              <p>{patients.length}</p>
            </div>

          </div>
        </div>
      )}

      {/* USERS */}
      {step === "users" && (
        <div className="table-container">
          <div className="section-header">
            <h2>Staff Management</h2>
            <button className="add-btn">+ Add Staff</button>
          </div>

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
                  <td>{s.name}</td>
                  <td>{s.aadhaar}</td>
                  <td>{s.phone}</td>
                  <td>{s.role}</td>
                  <td>{s.salary}</td>
                  <td>{s.Status}</td>
                  <td>{s.joining}</td>
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
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
            <button className="add-btn">+ Add Doctor</button>
          </div>

          <div className="doctor-grid">

            {doctors.map((d) => (
              <div className="doctor-card" key={d.id}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="doctor"
                />

                <h3>{d.name}</h3>
                <p>{d.specialization}</p>
                <p>{d.experience}</p>
                <p>{d.phone}</p>

                <div className="doctor-actions">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
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
            <button className="add-btn">+ Add Patient</button>
          </div>

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
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((p) => (
                <tr key={p.id}>
                  <td>{p.Id}</td>
                  <td>{p.Name}</td>
                  <td>{p.Age}</td>
                  <td>{p.Gender}</td>
                  <td>{p.Phone}</td>
                  <td>{p.Disease}</td>
                  <td>{p.Doctor}</td>
                  <td>{p.Admission}</td>
                  <td>{p.Status}</td>
                  {/* <td>{p.Actions}</td> */}
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* INSURANCE MASTER DATA */}
      {step === "insurance-master" && (
        <div className="table-container">
          <div className="section-header">
            <h2>Third Party Administrators (TPAs)</h2>
            <button className="add-btn">+ Add TPA</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>TPA ID</th>
                <th>Name</th>
                <th>Contact Phone</th>
                <th>Contact Email</th>
                <th>Settlement TAT</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tpaList.length > 0 ? tpaList.map(tpa => (
                <tr key={tpa._id}>
                  <td>{tpa._id.substring(tpa._id.length - 6).toUpperCase()}</td>
                  <td>{tpa.name}</td>
                  <td>{tpa.helpdeskPhone || "N/A"}</td>
                  <td>{tpa.helpdeskEmail || "N/A"}</td>
                  <td>{tpa.claimTAT || "N/A"}</td>
                  <td>{tpa.isActive ? "Active" : "Inactive"}</td>
                </tr>
              )) : (
                <tr><td colSpan="6">No TPAs found.</td></tr>
              )}
            </tbody>
          </table>

          <div className="section-header" style={{ marginTop: '40px' }}>
            <h2>Insurance Companies</h2>
            <button className="add-btn">+ Add Company</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Company ID</th>
                <th>Name</th>
                <th>Provider Type</th>
                <th>Contact Phone</th>
                <th>Network Tie-up</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {companyList.length > 0 ? companyList.map(comp => (
                <tr key={comp._id}>
                  <td>{comp._id.substring(comp._id.length - 6).toUpperCase()}</td>
                  <td>{comp.name}</td>
                  <td>{comp.type}</td>
                  <td>{comp.contactPhone || "N/A"}</td>
                  <td>{comp.networkHospitalStatus ? "Yes" : "No"}</td>
                  <td>{comp.isActive ? "Active" : "Inactive"}</td>
                </tr>
              )) : (
                <tr><td colSpan="6">No Companies found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

    </Layout>
  );
}

export default Admin;