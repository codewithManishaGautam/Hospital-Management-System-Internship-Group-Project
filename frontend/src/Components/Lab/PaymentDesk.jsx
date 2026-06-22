import React from "react";
import "../../styles/Lab/PaymentDesk.css";

function PaymentDesk({ labData }) {
  return (
    <div>
      <h2>Billing & Payment</h2>

      {labData.map((patient) => (
        <div key={patient.id}>
          <p>{patient.patientName} - Payment Pending</p>
        </div>
      ))}
    </div>
  );
}

export default PaymentDesk;