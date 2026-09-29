import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "./style/BillPdf.css";

function BillPdf() {
  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");

  const generateAndSend = async () => {
    // PDF Create
    const doc = new jsPDF();

    doc.text("Hospital Bill", 20, 20);

    doc.text(
      `Patient Name: ${patientName}`,
      20,
      40
    );

    doc.text("Amount: Rs 5000", 20, 60);

    // Blob
    const pdfBlob = doc.output("blob");

    // FormData
    const formData = new FormData();

    formData.append(
      "pdf",
      pdfBlob,
      "bill.pdf"
    );

    formData.append(
      "patientName",
      patientName
    );

    formData.append(
      "email",
      email
    );

    try {
      const res = await axios.post(
        "https://hospital-management-system-internship-rtob.onrender.com/send-email",
        formData
      );

      alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bill-pdf-container">
      <div className="bill-pdf-card">
        <h2>HMS Billing</h2>

        <input
          type="text"
          placeholder="Patient Name"
          className="bill-pdf-input"
          value={patientName}
          onChange={(e) =>
            setPatientName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Patient Email"
          className="bill-pdf-input"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <button
          className="bill-pdf-button"
          onClick={generateAndSend}
        >
          Generate & Send PDF
        </button>
      </div>
    </div>
  );
}

export default BillPdf;
