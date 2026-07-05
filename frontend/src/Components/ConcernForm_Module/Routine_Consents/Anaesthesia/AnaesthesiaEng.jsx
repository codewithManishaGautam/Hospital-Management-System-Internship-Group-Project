import React from "react";
import SignaturePad from "../SignaturePad";
import Table_Form from "../Tabel_Form";

function AnaesthesiaEng() {
  return (
    <div className="consent-form">
      <h2 className="title">Shradha Hospital, Daund</h2>

      <h4 className="title">INFORMED CONSENT FOR ANESTHESIA</h4>

      <Table_Form />

      <p className="paragraph">
        Diagnosis :
        <SignaturePad width={250} height={30} design="line" />
      </p>

      <p className="paragraph">
        Name of Procedure :
        <SignaturePad width={300} height={30} design="line" />
      </p>

      <p className="paragraph">
        Date & Time of Surgery :
        <SignaturePad width={250} height={30} design="line" />
      </p>

      <p className="paragraph">
        Type of Anaesthesia :
        <SignaturePad width={250} height={30} design="line" />
      </p>

      <ol>
        <li>
          I understand that anesthesia services are needed so that my doctor can
          perform the operation and procedure.
        </li>

        <li>
          Patients receiving general anaesthesia may require endotracheal
          intubation. This may cause sore throat, hoarseness of voice, loose
          teeth or denture problems. Respiratory complications may require
          ventilator support.
        </li>

        <li>
          All forms of anesthesia involve certain risks and no guarantee can be
          given regarding results.
        </li>

        <li>
          Severe complications may occur including infection, bleeding, drug
          reaction, blood clots, paralysis, stroke, heart attack or death.
        </li>

        <li>
          The anesthesia technique may be changed according to my physical
          condition and medical needs.
        </li>

        <li>
          I understand the procedure selected by my doctor and consent to it.
        </li>

        <li>
          If local anesthesia fails, another anesthesia method including general
          anesthesia may be used.
        </li>

        <li>
          I consent to anesthesia services being administered by the anesthetist
          or his/her assistants.
        </li>

        <li>
          I have read and understood this form. All risks, alternatives and
          expected results have been explained.
        </li>
      </ol>

      <br />

      <p>
        Signature :
        <SignaturePad width={250} height={40} design="line" />
      </p>

      <p>
        Name :
        <SignaturePad width={250} height={40} design="line" />
      </p>

      <p>
        Date :
        <SignaturePad width={150} height={40} design="line" />
      </p>

      <p>
        Time :
        <SignaturePad width={150} height={40} design="line" />
      </p>

      <br />

      <p>
        Witness :
        <SignaturePad width={250} height={40} design="line" />
      </p>

      <p>
        Anesthetist :
        <SignaturePad width={250} height={40} design="line" />
      </p>

      <p>
        Interpreter :
        <SignaturePad width={250} height={40} design="line" />
      </p>
    </div>
  );
}

export default AnaesthesiaEng;
