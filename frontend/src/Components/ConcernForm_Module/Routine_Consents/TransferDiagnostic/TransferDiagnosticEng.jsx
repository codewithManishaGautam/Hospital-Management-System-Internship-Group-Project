import React from "react";
import Table_Form from "../../Table_Form";
import SignaturePad from "../../SignaturePad";

function TransferDiagnosticEng() {
  return (
    <div className="container">
      <Table_Form />

      <h4
        className="text-center fw-bold my-4"
        style={{ textTransform: "uppercase" }}
      >
        Transfer For Diagnostic Purpose Consent
      </h4>

      <p style={{ textAlign: "justify" }}>
        I acknowledge that my medical condition has been evaluated and explained
        to me by my attending physician and/or designee who has recommended that
        I be transferred to the service of Dr.&nbsp;
        <SignaturePad width={220} height={35} design="line" />
        &nbsp;at&nbsp;
        <SignaturePad width={300} height={35} design="line" />
        &nbsp;for&nbsp;
        <SignaturePad width={220} height={35} design="line" />
      </p>

      <p style={{ textAlign: "justify" }}>
        The potential benefits of such transfer for diagnostic purpose, the
        potential risks associated with such transfer and the probable risks of
        not being transferred have been explained to me and I fully understand
        them.
      </p>

      <p style={{ textAlign: "justify" }}>
        With this knowledge and understanding, I agree to be transferred and
        then back to Hospital.
      </p>

      <div className="mt-5">
        <div className="mb-4">
          <label className="fw-bold">Name of Patient / Relative :</label>

          <SignaturePad width={350} height={35} design="line" />
        </div>

        <div className="mb-4">
          <label className="fw-bold">Relation with Patient :</label>

          <SignaturePad width={350} height={35} design="line" />
        </div>

        <div className="mb-4">
          <label className="fw-bold">Signature :</label>

          <SignaturePad width={220} height={80} design="border" />
        </div>
      </div>
    </div>
  );
}

export default TransferDiagnosticEng;
