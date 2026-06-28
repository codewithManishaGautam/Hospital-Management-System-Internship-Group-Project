import React, { useState } from "react";

import "../../styles/Reception/searchPatient.css";

function SearchPatient({
  setStep,
  setSelectedPatient,
}) {

  const [searchTerm, setSearchTerm] =
    useState("");

  const [viewPatient, setViewPatient] =
    useState(null);

  const patients = [
    {
      id: 1,
      uhid: "UH17062632104567",
      patientName: "Rahul varma",
      age: 35,
      gender: "Male",
      mobile: "9896543210",
      address: "Latur",
      date: "27-06-2025",
    },
    {
      id: 2,
      uhid: "UH17062645678912",
      patientName: "Priya Singh",
      age: 28,
      gender: "Female",
      mobile: "9876543211",
      address: "Pune",
      date: "26-06-2025",
    },
    {
      id: 3,
      uhid: "UH17062678965412",
      patientName: "Amit Kumar",
      age: 42,
      gender: "Male",
      mobile: "9876543212",
      address: "Mumbai",
      date: "25-06-2025",
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

    <div className="search-patient-container">

      <div className="search-header">

        <h2>
          Search Patient
        </h2>

      </div>

      <div className="search-box">

        <input
          type="text"
          placeholder="Search by UHID, Name or Mobile Number"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="search-input"
        />

      </div>

      <div className="patient-table-wrapper">

        <table className="patient-table">

          <thead>

            <tr>

              <th>UHID</th>

              <th>Patient Name</th>

              <th>Age</th>

              <th>Gender</th>

              <th>Mobile</th>

              <th>Address</th>

              <th>Date</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredPatients.length >
            0 ? (

              filteredPatients.map(
                (patient) => (

                  <tr
                    key={
                      patient.id
                    }
                  >

                    <td>
                      {
                        patient.uhid
                      }
                    </td>

                    <td>
                      {
                        patient.patientName
                      }
                    </td>

                    <td>
                      {
                        patient.age
                      }
                    </td>

                    <td>
                      {
                        patient.gender
                      }
                    </td>

                    <td>
                      {
                        patient.mobile
                      }
                    </td>

                    <td>
                      {
                        patient.address
                      }
                    </td>

                    <td>
                      {
                        patient.date
                      }
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
              )

            ) : (

              <tr>

                <td
                  colSpan="8"
                  style={{
                    textAlign:
                      "center",
                  }}
                >
                  No Patient Found
                </td>

              </tr>

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
  onClick={() => {
    setSelectedPatient(viewPatient);
    setStep("billing");
  }}
>
  Generate Bill
</button>
            <button
  className="appointment-btn"
  onClick={() => {
    setSelectedPatient(viewPatient);
    setStep("register");
  }}
>
  Book Appointment
</button>
            <button
  className="ipd-btn"
  onClick={() => {
    setSelectedPatient(viewPatient);
    setStep("ipdAdmission");
  }}
>
  IPD Admission
</button>          </div>

        </div>

      )}

    </div>

  );
}

export default SearchPatient;