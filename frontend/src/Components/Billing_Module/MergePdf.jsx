import React, { useState } from "react";
import axios from "axios";
import "./style/MergePdf.css";

function MergePdf() {
  const [files, setFiles] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendPDF = async () => {
    console.log("SEND PDF BUTTON CLICKED");

    // Validation
    if (!patientName.trim()) {
      alert("Please enter patient name");
      return;
    }

    if (!email.trim()) {
      alert("Please enter patient email");
      return;
    }

    if (files.length === 0) {
      alert("Please select at least one PDF file");
      return;
    }

    // Create FormData
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("pdfs", files[i]);
    }

    formData.append("patientName", patientName);
    formData.append("email", email);

    try {
      setLoading(true);

      console.log("Sending PDF...");
      console.log("Files:", files);
      console.log("Patient:", patientName);
      console.log("Email:", email);

      const res = await axios.post(
        "https://hospital-management-system-internship-rtob.onrender.com/api/billing/send-email",
        formData
      );

      console.log("SERVER RESPONSE:", res.data);

      alert(
        res.data.message || "PDF merged and sent successfully"
      );

      // Clear form after successful request
      setFiles([]);
      setPatientName("");
      setEmail("");
    } catch (error) {
      console.error("SEND PDF ERROR:", error);
      console.error("SERVER RESPONSE:", error.response?.data);

      alert(
        error.response?.data?.message ||
          "Failed to send PDF"
      );
    } finally {
      setLoading(false);
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
      <button
        type="button"
        className="merge-btn"
        onClick={sendPDF}
        disabled={loading}
      >
        {loading ? "Sending..." : "Merge & Send PDF"}
      </button>
    </div>
  );
}

export default MergePdf;
