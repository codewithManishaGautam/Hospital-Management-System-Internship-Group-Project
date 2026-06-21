import React from "react";
import "../../styles/Nurse/PatientList.css";

export default function PatientList({
  patients,
  searchUHID,
  setSearchUHID,
  handleSearch
}) {
  return (
    <div>

<div className="nurse-topbar">Nurse Panel</div>
      <div className="searchBox">

        <h2>Search By UHID</h2>

        <div className="searchRow">

          <input
            type="number"
            placeholder="Enter UHID"
            value={searchUHID}
            onChange={(e) =>
              setSearchUHID(e.target.value)
            }
          />

          <button onClick={handleSearch}>
            Search
          </button>

        </div>

      </div>

      <div className="patientListBox">

        <h2>Patient List</h2>

        <table className="listTable">

          <thead>

            <tr>
              <th>UHID</th>
              <th>Name</th>
              <th>Ward</th>
              <th>Disease</th>
            </tr>

          </thead>

          <tbody>

            {patients.map((p) => (

              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.ward}</td>
                <td>{p.disease}</td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}