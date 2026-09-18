// <<<<<<< HEAD
// // import React,
// // {
// //   useState
// // }
// // from "react";

// // import axios
// // from "axios";
// // import "./style/MergePdf.css"

// // function MergePdf() {


// //   const [files, setFiles] =
// //   useState([]);

// //   const [patientName,
// //   setPatientName] =
// //   useState("");

// //   const [email,
// //   setEmail] =
// //   useState("");

// //   const sendPDF =
// //   async () => {

// //     const formData =
// //     new FormData();

// //     // Multiple Files
// //     for (

// //       let i = 0;

// //       i < files.length;

// //       i++

// //     ) {

// //       formData.append(

// //         "pdfs",

// //         files[i]

// //       );

// //     }

// //     formData.append(

// //       "patientName",

// //       patientName

// //     );

// //     formData.append(

// //       "email",

// //       email

// //     );

// //     try {

// //       const res =
// //       await axios.post(

// //         "http://localhost:5000/send-email",

// //         formData

// //       );

// //       alert(
// //         res.data.message
// //       );

// //     } catch (error) {

// //       console.log("How :",error);

// //     }

// //   };

// //   return (

// //     <div className="container mt-5" className="merge-container">

// //       <h2>
// //         Merge PDF & Send
// //       </h2>

// //       <input

// //         type="text"

// //         placeholder="Patient Name"

// //         className="form-control mb-3"

// //         onChange={(e) =>

// //           setPatientName(
// //             e.target.value 
// //           )

// //         }
        

// //       />

// //       <input

// //         type="email"

// //         placeholder="Patient Email"

// //         className="form-control mb-3"

// //         onChange={(e) =>

// //           setEmail(
// //             e.target.value
// //           )

// //         }

// //       />

// //       <input

// //         type="file"

// //         multiple

// //         className="form-control mb-3"

// //         onChange={(e) =>

// //           setFiles(

// //       Array.from(
// //         e.target.files
// //       )

// //     )
// //         }

// //       />

// //       <button

// //         className="btn btn-primary" className="merge-btn"

// //         onClick={sendPDF}

// //       >

// //         Merge & Send PDF

// //       </button>

// //     </div>

// //   );
// // }

// // export default MergePdf;



 
// =======
// >>>>>>> origin/main
// import React, { useState } from "react";
// import axios from "axios";
// import "./style/MergePdf.css";

// function MergePdf() {
//   const [files, setFiles] = useState([]);
//   const [patientName, setPatientName] = useState("");
//   const [email, setEmail] = useState("");
// <<<<<<< HEAD
//   const [loading, setLoading] = useState(false);

//   const sendPDF = async () => {
//     console.log("SEND PDF BUTTON CLICKED");

//     // -----------------------------------------
//     // Validation
//     // -----------------------------------------

//     if (!patientName.trim()) {
//       alert("Please enter patient name");
//       return;
//     }

//     if (!email.trim()) {
//       alert("Please enter patient email");
//       return;
//     }

//     if (files.length === 0) {
//       alert("Please select at least one PDF file");
//       return;
//     }

//     // -----------------------------------------
//     // FormData
//     // -----------------------------------------

//     const formData = new FormData();

//     for (let i = 0; i < files.length; i++) {
//       formData.append("pdfs", files[i]);
//     }

// =======

//   const sendPDF = async () => {
//     // Check files
//     if (files.length === 0) {
//       alert("Please select PDF files");
//       return;
//     }

//     // Check patient name
//     if (!patientName.trim()) {
//       alert("Please enter patient name");
//       return;
//     }

//     // Check email
//     if (!email.trim()) {
//       alert("Please enter patient email");
//       return;
//     }

//     const formData = new FormData();

//     // Add PDFs
//     for (let i = 0; i < files.length; i++) {
//       formData.append("pdfs", files[i]);
//     }

//     // Add patient details
// >>>>>>> origin/main
//     formData.append("patientName", patientName);
//     formData.append("email", email);

//     try {
// <<<<<<< HEAD
//       setLoading(true);

//       console.log("Sending PDF...");
//       console.log("Files:", files);
//       console.log("Patient:", patientName);
//       console.log("Email:", email);

//       // -----------------------------------------
//       // CORRECT BACKEND URL
//       // -----------------------------------------

//       const res = await axios.post(
//         "http://localhost:5000/api/billing/send-email",
//         formData
//       );

//       console.log("SERVER RESPONSE:", res.data);

//       alert(
//         res.data.message ||
//           "PDF merged and sent successfully"
//       );

//       // Clear form after success
//       setFiles([]);
//       setPatientName("");
//       setEmail("");

//     } catch (error) {
//       console.error(
//         "SEND PDF ERROR:",
//         error
//       );

//       console.error(
//         "SERVER RESPONSE:",
//         error.response?.data
//       );

//       alert(
//         error.response?.data?.message ||
//           "Failed to send PDF"
//       );

//     } finally {
//       setLoading(false);
// =======
//       console.log("Sending PDF...");
//       console.log("Patient Name:", patientName);
//       console.log("Email:", email);
//       console.log("Files:", files);

//       const res = await axios.post(
//         "http://localhost:5000/send-email",
//         formData,
//       );

//       console.log("Server Response:", res.data);

//       alert(res.data.message);
//     } catch (error) {
//       console.error("PDF Send Error:", error);

//       alert(error.response?.data?.message || "Failed to merge and send PDF");
// >>>>>>> origin/main
//     }
//   };

//   return (
//     <div className="merge-container">
// <<<<<<< HEAD

//       <h2>
//         Merge PDF & Send
//       </h2>

//       {/* Patient Name */}

// =======
//       <h2>Merge PDF & Send</h2>

//       {/* Patient Name */}
// >>>>>>> origin/main
//       <input
//         type="text"
//         placeholder="Patient Name"
//         className="form-control mb-3"
//         value={patientName}
// <<<<<<< HEAD
//         onChange={(e) =>
//           setPatientName(e.target.value)
//         }
//       />

//       {/* Patient Email */}

// =======
//         onChange={(e) => setPatientName(e.target.value)}
//       />

//       {/* Patient Email */}
// >>>>>>> origin/main
//       <input
//         type="email"
//         placeholder="Patient Email"
//         className="form-control mb-3"
//         value={email}
// <<<<<<< HEAD
//         onChange={(e) =>
//           setEmail(e.target.value)
//         }
//       />

//       {/* PDF Files */}

//       <input
//         type="file"
//         multiple
//         accept="application/pdf"
//         className="form-control mb-3"
//         onChange={(e) =>
//           setFiles(
//             Array.from(e.target.files)
//           )
//         }
//       />

//       {/* Send Button */}

//       <button
//         type="button"
//         className="merge-btn"
//         onClick={sendPDF}
//         disabled={loading}
//       >
//         {loading
//           ? "Sending..."
//           : "Merge & Send PDF"}
// =======
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       {/* PDF Files */}
//       <input
//         type="file"
//         multiple
//         accept=".pdf,application/pdf"
//         className="form-control mb-3"
//         onChange={(e) => {
//           setFiles(Array.from(e.target.files));
//         }}
//       />

//       {/* Send Button */}
//       <button type="button" className="merge-btn" onClick={sendPDF}>
//         Merge & Send PDF
// >>>>>>> origin/main
//       </button>
//     </div>
//   );
// }

// <<<<<<< HEAD
// export default MergePdf;
// =======
// export default MergePdf;
// >>>>>>> origin/main



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
        "http://localhost:5000/api/billing/send-email",
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