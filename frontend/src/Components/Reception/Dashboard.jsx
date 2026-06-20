import React, { useState } from "react";
import "../../styles/Reception/dashboard.css";

function Dashboard({
  setStep,
  setSelectedPatient,
}) {

  const [searchTerm, setSearchTerm] =
    useState("");

  const [viewPatient, setViewPatient] =
    useState(null);

  const dashboardCards = [
    {
      title: "Today's Appointments",
      count: 25,
    },
    {
      title: "Registered Patients",
      count: 120,
    },
    {
      title: "IPD Patients",
      count: 15,
    },
    {
      title: "Today's Revenue",
      count: "₹12,500",
    },
  ];

  const patients = [
    {
      id: 1,
      uhid: "UH1001",
      patientName: "Rahul Sharma",
      age: 28,
      gender: "Male",
      mobile: "9876543210",
      address: "Latur",
      doctor: "Dr. Patil",
      feeStatus: "Unpaid",
    },

    {
      id: 2,
      uhid: "UH1002",
      patientName: "Priya Verma",
      age: 32,
      gender: "Female",
      mobile: "9876543211",
      address: "Pune",
      doctor: "Dr. Joshi",
      feeStatus: "Paid",
    },

    {
      id: 3,
      uhid: "UH1003",
      patientName: "Amit Kumar",
      age: 45,
      gender: "Male",
      mobile: "9876543212",
      address: "Mumbai",
      doctor: "Dr. Shah",
      feeStatus: "Unpaid",
    },
  ];

  const filteredPatients =
    patients.filter(
      (patient) =>
        patient.patientName
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||

        patient.uhid
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||

        patient.mobile.includes(
          searchTerm
        )
    );

  const handleViewPatient =
    (patient) => {

      setViewPatient(patient);

      if (
        setSelectedPatient
      ) {
        setSelectedPatient(
          patient
        );
      }
    };

  return (

    <div className="dashboard-container">

      <div className="dashboard-header">

        <h2>
          Reception Dashboard
        </h2>


        <button
          className="add-btn"
          onClick={() =>
            setStep("register")
          }
        >
          + New Registration
        </button>

      </div>
      

      <div className="dashboard-cards">

        {dashboardCards.map(
          (card, index) => (

            <div
              className="dashboard-card"
              key={index}
            >

              <h3>
                {card.title}
              </h3>

              <h1>
                {card.count}
              </h1>

            </div>

          )
        )}

      </div>

      
      <div className="patient-table-card">

        <div className="table-header">

          <h3>
            Today's Appointment List
          </h3>

        </div>

        <table className="patient-table">

          <thead>

            <tr>

              <th>UHID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Doctor</th>
              <th>Fee Status</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredPatients.map(
              (patient) => (

                <tr
                  key={patient.id}
                >

                  <td>
                    {patient.uhid}
                  </td>

                  <td>
                    {
                      patient.patientName
                    }
                  </td>

                  <td>
                    {
                      patient.mobile
                    }
                  </td>

                  <td>
                    {
                      patient.doctor
                    }
                  </td>

                  <td>

                    <span
                      className={
                        patient.feeStatus ===
                        "Paid"
                          ? "paid"
                          : "unpaid"
                      }
                    >

                      {
                        patient.feeStatus
                      }

                    </span>

                  </td>

                  <td>

                    <button
                      className="view-btn"
                      onClick={() =>
                        handleViewPatient(
                          patient
                        )
                      }
                    >
                      View
                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

      {viewPatient && (

        <div className="patient-details-card">

          <h3>
            Patient Details
          </h3>

          <div className="details-grid">

            <p>
              <strong>
                UHID:
              </strong>{" "}
              {
                viewPatient.uhid
              }
            </p>

            <p>
              <strong>
                Name:
              </strong>{" "}
              {
                viewPatient.patientName
              }
            </p>

            <p>
              <strong>
                Age:
              </strong>{" "}
              {
                viewPatient.age
              }
            </p>

            <p>
              <strong>
                Gender:
              </strong>{" "}
              {
                viewPatient.gender
              }
            </p>

            <p>
              <strong>
                Mobile:
              </strong>{" "}
              {
                viewPatient.mobile
              }
            </p>

            <p>
              <strong>
                Address:
              </strong>{" "}
              {
                viewPatient.address
              }
            </p>

          </div>

          <div className="action-buttons">

            <button
              className="bill-btn"
              onClick={() =>
                setStep("billing")
              }
            >
              Generate Bill
            </button>

            <button
              className="appointment-btn"
              onClick={() =>
                setStep("register")
              }
            >
              Book Appointment
            </button>

            <button
              className="ipd-btn"
              onClick={() =>
                setStep(
                  "ipdAdmission"
                )
              }
            >
              IPD Admission
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Dashboard;