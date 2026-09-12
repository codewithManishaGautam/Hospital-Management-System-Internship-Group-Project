import React from "react";
import "../../styles/Nurse/PatientList.css";

export default function PatientList({
  patients,
  searchUHID,
  setSearchUHID,
  handleSearch,
  loading,
  onSelectPatient,
}) {
  return (
    <div>
      <div className="nurse-topbar">Nurse Panel</div>

      <div className="searchBox">
        <h2>Search By UHID</h2>

        <div className="searchRow">
          <input
            type="text"
            placeholder="Enter UHID"
            value={searchUHID}
            onChange={(e) => setSearchUHID(e.target.value)}
          />

          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className="patientListBox">
        <h2>Patient List</h2>

        <div className="tableWrapper">
          <table className="listTable">
            <thead>
              <tr>
                <th>UHID</th>
                <th>Name</th>
                <th>Patient Type</th>
                <th>Room</th>
                <th>Bed</th>
                <th>Disease</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7">Loading patients...</td>
                </tr>
              ) : patients && patients.length > 0 ? (
                patients.map((p) => (
                  <tr key={p._id}>
                    <td>{p.uhid}</td>

                    <td>{p.name}</td>

                    <td>{p.role}</td>

                    <td>{p.roomNo || "-"}</td>

                    <td>{p.bedNo || "-"}</td>

                    <td>{p.disease || "-"}</td>

                    <td>
                      <button
                        className="viewDetailsBtn"
                        onClick={() => onSelectPatient(p)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No patients found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
