
// import React, { useState } from "react";
// import axios from "axios";
// import jsPDF from "jspdf";

// function BillPdf() {

//   const [mobile, setMobile] = useState("");
//   const [patientName, setPatientName] = useState("");

//   // Generate PDF
//   const generatePDF = async () => {

//     const doc = new jsPDF();

//     doc.text("Hospital Bill", 20, 20);
//     doc.text(`Patient Name: ${patientName}`, 20, 40);
//     doc.text("Amount: ₹5000", 20, 60);

//     const pdfBlob = doc.output("blob");

//     const formData = new FormData();

//     formData.append("pdf", pdfBlob, "bill.pdf");
//     formData.append("mobile", mobile);
//     formData.append("patientName", patientName);

//     try {

//       const res = await axios.post(
//         "http://localhost:5000/send-pdf",
//         formData
//       );

//       alert(res.data.message);

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (

//     <div className="container mt-5">

//       <h2>HMS Billing</h2>

//       <input
//         type="text"
//         placeholder="Patient Name"
//         className="form-control mb-3"
//         onChange={(e) => setPatientName(e.target.value)}
//       />

//       <input
//         type="text"
//         placeholder="Mobile Number"
//         className="form-control mb-3"
//         onChange={(e) => setMobile(e.target.value)}
//       />

//       <button
//         className="btn btn-primary"
//         onClick={generatePDF}
//       >
//         Generate & Send PDF
//       </button>

//     </div>
//   );
// }

// export default BillPdf;






// import React, { useState } from "react";
// import axios from "axios";
// import jsPDF from "jspdf";

// function BillPdf() {

//   const [patientName, setPatientName] =
//   useState("");

//   const [mobile, setMobile] =
//   useState("");

//   const generateAndShare = async () => {

//     // Create PDF
//     const doc = new jsPDF();

//     doc.text("Hospital Bill", 20, 20);

//     doc.text(
//       `Patient Name: ${patientName}`,
//       20,
//       40
//     );

//     doc.text(
//       "Amount: Rs 5000",
//       20,
//       60
//     );

//     // Convert to Blob
//     const pdfBlob =
//     doc.output("blob");

//     // FormData
//     const formData =
//     new FormData();

//     formData.append(
//       "pdf",
//       pdfBlob,
//       "bill.pdf"
//     );

//     formData.append(
//       "patientName",
//       patientName
//     );

//     try {

//       // Upload PDF
//       const res = await axios.post(

//         "http://localhost:5000/upload-pdf",

//         formData

//       );

//       // PDF URL
//       const pdfUrl =
//       res.data.pdfUrl;

//       // WhatsApp Open
//       const whatsappUrl =
//       `https://wa.me/91${mobile}?text=Hospital Bill PDF: ${pdfUrl}`;

//       window.open(
//         whatsappUrl,
//         "_blank"
//       );

//     } catch (error) {

//       console.log(error);

//     }
//   };

//   return (

//     <div className="container mt-5">

//       <h2>HMS Billing</h2>

//       <input
//         type="text"
//         placeholder="Patient Name"
//         className="form-control mb-3"
//         onChange={(e) =>
//           setPatientName(e.target.value)
//         }
//       />

//       <input
//         type="text"
//         placeholder="Mobile Number"
//         className="form-control mb-3"
//         onChange={(e) =>
//           setMobile(e.target.value)
//         }
//       />

//       <button
//         className="btn btn-success"
//         onClick={generateAndShare}
//       >
//         Generate & Share
//       </button>

//     </div>
//   );
// }

// export default BillPdf;




import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function BillPdf() {

  const [patientName, setPatientName] =
  useState("");

  const [email, setEmail] =
  useState("");

  const generateAndSend = async () => {

    // PDF Create
    const doc = new jsPDF();

    doc.text(
      "Hospital Bill",
      20,
      20
    );

    doc.text(
      `Patient Name: ${patientName}`,
      20,
      40
    );

    doc.text(
      "Amount: Rs 5000",
      20,
      60
    );

    // Blob
    const pdfBlob =
    doc.output("blob");

    // FormData
    const formData =
    new FormData();

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

      const res =
      await axios.post(

        "http://localhost:5000/send-email",

        formData

      );

      alert(
        res.data.message
      );

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="container mt-5">

      <h2>HMS Billing</h2>

      <input
        type="text"
        placeholder="Patient Name"
        className="form-control mb-3"
        onChange={(e) =>
          setPatientName(
            e.target.value
          )
        }
      />

      <input
        type="email"
        placeholder="Patient Email"
        className="form-control mb-3"
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
      />

      <button
        className="btn btn-primary"
        onClick={
          generateAndSend
        }
      >
        Generate & Send PDF
      </button>

    </div>
  );
}

export default BillPdf;