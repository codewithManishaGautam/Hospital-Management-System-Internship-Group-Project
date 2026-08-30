import React, { useState } from "react";
import axios from "axios";
import "./style/MergePdf.css";

function MergePdf() {
  const [files, setFiles] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");

  const sendPDF = async () => {
    // Check files
    if (files.length === 0) {
      alert("Please select PDF files");
      return;
    }

    // Check patient name
    if (!patientName.trim()) {
      alert("Please enter patient name");
      return;
    }

    // Check email
    if (!email.trim()) {
      alert("Please enter patient email");
      return;
    }

    const formData = new FormData();

    // Add PDFs
    for (let i = 0; i < files.length; i++) {
      formData.append("pdfs", files[i]);
    }

    // Add patient details
    formData.append("patientName", patientName);
    formData.append("email", email);

    try {
      console.log("Sending PDF...");
      console.log("Patient Name:", patientName);
      console.log("Email:", email);
      console.log("Files:", files);

      const res = await axios.post(
        "http://localhost:5000/send-email",
        formData,
      );

      console.log("Server Response:", res.data);

      alert(res.data.message);
    } catch (error) {
      console.error("PDF Send Error:", error);

      alert(error.response?.data?.message || "Failed to merge and send PDF");
    }
  };

  return (
    <div className="merge-container">
      <h2>Merge PDF & Send</h2>

      {/* Patient Name */}
      <input
        type="text"
        placeholder="Patient Name"
        className="form-control mb-3"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
      />

      {/* Patient Email */}
      <input
        type="email"
        placeholder="Patient Email"
        className="form-control mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* PDF Files */}
      <input
        type="file"
        multiple
        accept=".pdf,application/pdf"
        className="form-control mb-3"
        onChange={(e) => {
          setFiles(Array.from(e.target.files));
        }}
      />

      {/* Send Button */}
      <button type="button" className="merge-btn" onClick={sendPDF}>
        Merge & Send PDF
      </button>
    </div>
  );
}

export default MergePdf;
