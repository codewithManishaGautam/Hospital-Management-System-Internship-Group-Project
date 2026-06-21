import React, { useState } from "react";

import "../../styles/Reception/IPDpatientList.css";

function IPDPatientList() {

  const [searchTerm, setSearchTerm] =
    useState("");

  const [patients] = useState([
    {
      id: 1,
      ipdNo: "IPD1001",
      uhid: "UH17062632104567",
      patientName: "Rahul Sharma",
      age: 35,
      gender: "Male",
      roomNo: "101",
      bedNo: "B1",
      doctor: "Dr. Patil",
      admissionDate: "2026-06-17",
      status: "Admitted",
    },
    {
      id: 2,
      ipdNo: "IPD1002",
      uhid: "UH17062645678912",
      patientName: "Priya Singh",
      age: 29,
      gender: "Female",
      roomNo: "102",
      bedNo: "B2",
      doctor: "Dr. Joshi",
      admissionDate: "2026-06-16",
      status: "Admitted",
    },
  ]);

  const filteredPatients =
    patients.filter((patient) =>
      patient.patientName
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    );

  const handleView = (patient) => {

    alert(
      `Patient Name : ${patient.patientName}
Room No : ${patient.roomNo}
Bed No : ${patient.bedNo}`
    );
  };

  return (
    <div className="ipd-list-container">

      {/* Header */}

<div className="ipd-list-header">

  <h2 className="ipd-title">
    IPD Patient List
  </h2>

  <div className="patient-count">

    <div className="count-label">
      Total Patients
    </div>

    <div className="count-number">
      {filteredPatients.length}
    </div>

  </div>

</div>
      {/* Search */}

      <div className="search-section">

        <input
          type="text"
          placeholder="Search Patient Name..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="search-input"
        />

      </div>

      {/* Table */}

      <div className="table-wrapper">

        <table className="ipd-table">

          <thead>

            <tr>

              <th>IPD No</th>

              <th>UHID</th>

              <th>Patient Name</th>

              <th>Age</th>

              <th>Gender</th>

              <th>Room</th>

              <th>Bed</th>

              <th>Doctor</th>

              <th>Admission Date</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredPatients.length >
            0 ? (
              filteredPatients.map(
                (patient) => (
                  <tr
                    key={patient.id}
                  >

                    <td>
                      {
                        patient.ipdNo
                      }
                    </td>

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
                        patient.roomNo
                      }
                    </td>

                    <td>
                      {
                        patient.bedNo
                      }
                    </td>

                    <td>
                      {
                        patient.doctor
                      }
                    </td>

                    <td>
                      {
                        patient.admissionDate
                      }
                    </td>

                    <td>

                      <span
                        className="status-badge"
                      >
                        {
                          patient.status
                        }
                      </span>

                    </td>

                    <td>

                      <button
                        className="view-btn"
                        onClick={() =>
                          handleView(
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
                  colSpan="11"
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

    </div>
  );
}

export default IPDPatientList;