import React from "react";
import SignaturePad from "../SignaturePad";
import Table_Form from "../Tabel_Form";
import "../Minor_Surgical/MinorEnglish.css";

function SurgeryConsentEng() {
  return (
    <div className="consent-form">
      <h2 className="title">Shradha Hospital, Daund</h2>

      <h4 className="title">INFORMED CONSENT FORM FOR SURGERY / PROCEDURE</h4>

      <Table_Form />

      <p className="paragraph">
        I hereby authorize Dr.
        <SignaturePad width={250} height={30} design="line" />
        or associates to perform surgery / procedure upon me.
      </p>

      <p className="paragraph">
        Name of Procedure :
        <SignaturePad width={300} height={30} design="line" />
      </p>

      <p className="paragraph">
        I have been fully explained in the language I understand regarding the
        nature of surgery, benefits, risks, alternatives and expected outcome.
      </p>

      <p className="paragraph">
        I had sufficient opportunity to ask questions and all my doubts have
        been answered satisfactorily.
      </p>

      <p className="paragraph">
        The doctor has informed me about possible complications including
        infection, bleeding, paralysis, drug reaction, blood clots, disability
        or even death.
      </p>

      <p className="paragraph">
        I understand unforeseen conditions may arise during surgery requiring
        additional procedures and I consent for the same.
      </p>

      <p className="paragraph">
        I also consent for administration of anesthesia required during surgery.
      </p>

      <br />

      <p>
        Patient Name :
        <SignaturePad width={250} height={35} design="line" />
      </p>

      <p>
        Signature :
        <SignaturePad width={200} height={35} design="line" />
      </p>

      <p>
        Date :
        <SignaturePad width={120} height={35} design="line" />
      </p>

      <p>
        Time :
        <SignaturePad width={120} height={35} design="line" />
      </p>

      <br />

      <p>
        Witness :
        <SignaturePad width={250} height={35} design="line" />
      </p>

      <p>
        Doctor :
        <SignaturePad width={250} height={35} design="line" />
      </p>

      <p>
        Interpreter :
        <SignaturePad width={250} height={35} design="line" />
      </p>
    </div>
  );
}

export default SurgeryConsentEng;
