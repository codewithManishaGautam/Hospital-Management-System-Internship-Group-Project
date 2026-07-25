import React from "react";
import { useNavigate } from "react-router-dom";

function PatientTable({ patients }) {
  const navigate = useNavigate();

  return (
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
                  onClick={() =>
                    navigate(`/prescription/${p._id}`)
                  }
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientTable;