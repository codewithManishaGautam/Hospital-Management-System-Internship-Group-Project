import React from "react";

const DiagnosticConsentEnglish = () => {
  return (
    <div className="container border p-4">
      <h4 className="text-center fw-bold">
        Consent for Diagnostic Procedure and Authorization for Release of
        Information and Assignment of Benefits
      </h4>

      <table className="table table-bordered mt-3">
        <tbody>
          <tr>
            <td>Patient Name</td>
            <td></td>
          </tr>

          <tr>
            <td>Name of Diagnostic Procedure</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <p>
        By signing below, I understand that all medical procedures may involve
        discomforts as well as risks. I have had sufficient opportunity to
        discuss the proposed procedure and risks with my physician.
      </p>

      <p>
        I acknowledge that I understand the above information and freely give
        my consent to have this diagnostic procedure.
      </p>

      <p>
        I hereby authorize release of my films and/or medical records as needed
        for subsequent medical care.
      </p>

      <div className="row mt-5">
        <div className="col-4">
          Patient Signature
          <div style={{ borderBottom: "1px solid black", height: 50 }}></div>
        </div>

        <div className="col-4">
          Interpreter Signature
          <div style={{ borderBottom: "1px solid black", height: 50 }}></div>
        </div>

        <div className="col-4">
          Doctor Signature
          <div style={{ borderBottom: "1px solid black", height: 50 }}></div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticConsentEnglish;