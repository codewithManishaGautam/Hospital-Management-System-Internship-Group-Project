import React, { useState } from "react";

import "../../styles/Reception/patientTable.css";

function PatientTable() {

  const [searchTerm, setSearchTerm] =
    useState("");

  const [patients] = useState([
    {
      id: 1,
      uhid: "UH17062632104567",
      patientName: "Rahul Sharma",
      mobile: "9876543210",
      registrationDate: "17-06-2026",
      feeStatus: "Paid",
    },
    {
      id: 2,
      uhid: "UH17062645678912",
      patientName: "Priya Singh",
      mobile: "9876543211",
      registrationDate: "17-06-2026",
      feeStatus: "Pending",
    },
    {
      id: 3,
      uhid: "UH17062685214796",
      patientName: "Amit Kumar",
      mobile: "9876543212",
      registrationDate: "17-06-2026",
      feeStatus: "Paid",
    },
  ]);

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

      alert(
        `UHID : ${patient.uhid}
Patient : ${patient.patientName}
Mobile : ${patient.mobile}
Fee Status : ${patient.feeStatus}`
      );
    };

  return (
    <div className="patient-table-container">

      {/* Header */}

      <div className="patient-table-header">

        <h2>
          Today's Patient List
        </h2>

      </div>

      {/* Search */}

      <div className="patient-search">

        <input
          type="text"
          placeholder="Search by UHID, Name or Mobile"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="patient-search-input"
        />

      </div>

      {/* Table */}

      <div className="table-wrapper">

        <table className="patient-table">

          <thead>

            <tr>

              <th>
                UHID
              </th>

              <th>
                Patient Name
              </th>

              <th>
                Mobile Number
              </th>

              <th>
                Registration Date
              </th>

              <th>
                Fee Status
              </th>

              <th>
                Action
              </th>

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
                        patient.mobile
                      }
                    </td>

                    <td>
                      {
                        patient.registrationDate
                      }
                    </td>

                    <td>

                      <span
                        className={
                          patient.feeStatus ===
                          "Paid"
                            ? "paid-status"
                            : "pending-status"
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
              )

            ) : (

              <tr>

                <td
                  colSpan="6"
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

export default PatientTable;