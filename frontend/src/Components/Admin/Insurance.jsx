import React from "react";
import "../../styles/admin/table.css";

function Insurance() {
  const insuranceData = [
    {
      id: "INS001",
      patient: "Rahul Patil",
      company: "Star Health",
      policyNo: "POL12345",
      claimAmount: 25000,
      status: "Pending",
    },
    {
      id: "INS002",
      patient: "Sneha Joshi",
      company: "ICICI Lombard",
      policyNo: "POL67890",
      claimAmount: 40000,
      status: "Approved",
    },
  ];

  return (
    <div className="table-container">
      <div className="section-header">
        <h2>Insurance Records</h2>
      </div>

      <table>
        <thead>
          <tr>
            <th>Claim ID</th>
            <th>Patient</th>
            <th>Insurance Company</th>
            <th>Policy No</th>
            <th>Claim Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {insuranceData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.patient}</td>
              <td>{item.company}</td>
              <td>{item.policyNo}</td>
              <td>₹{item.claimAmount}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Insurance;
