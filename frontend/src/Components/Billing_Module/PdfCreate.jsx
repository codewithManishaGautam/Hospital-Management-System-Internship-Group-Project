
import html2pdf from "html2pdf.js";

function PdfCreate({patient,pdfname}) {

  const downloadPDF = () => {

    // Temporary div create
    const element = document.createElement("div");

    element.innerHTML = `

      <h2>Hospital Bill</h2>

      <p>Name : ${patient.name}</p>

      <p>Age : ${patient.age}</p>

      <p>Gender : ${patient.gender}</p>

      <p>Amount : ₹2000</p>

    `;

    html2pdf().from(element).save();
  };

  return (

    <button className="btn btn-outline-success" onClick={downloadPDF}   style={{fontSize:"14px"}}>
    <b>{pdfname} PDF</b>
    </button>

  );
}

export default PdfCreate;