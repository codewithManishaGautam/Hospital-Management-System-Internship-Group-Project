import React from "react";
import SignaturePad from "../SignaturePad";
import Table_Form from "../Tabel_Form";

function GenericSurgeryEng() {
  return (
    <div className="consent-form">
      <h2 className="title">Shradha Hospital, Daund</h2>

      <h4 className="title">INFORMED CONSENT FOR SURGERY</h4>

      <Table_Form />

      <p className="paragraph">
        Relative Name :
        <SignaturePad width={250} height={35} design="line" />
      </p>

      <p className="paragraph">
        Relation To Patient :
        <SignaturePad width={250} height={35} design="line" />
      </p>

      <p className="paragraph">
        Procedure Name :
        <SignaturePad width={350} height={35} design="line" />
      </p>

      <p className="paragraph">
        My medical condition, proposed surgical procedure and course of
        treatment have been explained to me in a language I understand.
      </p>

      <p className="paragraph">
        My questions and concerns have been discussed and answered to my
        satisfaction.
      </p>

      <p className="paragraph">
        The prognosis and risks of not undergoing the surgery/procedure have
        also been explained to me.
      </p>

      <p className="paragraph">
        I understand that unforeseen conditions may arise during or after
        surgery and additional procedures may become necessary.
      </p>

      <p className="paragraph">
        I understand that surgery may include blood or blood product transfusion
        if required.
      </p>

      <p className="paragraph">
        Alternative treatment options and associated risks have been explained
        to me.
      </p>

      <p className="paragraph">
        Major risks explained:
        <SignaturePad width={500} height={40} design="line" />
      </p>

      <p className="paragraph">
        Post-operative complications explained:
        <SignaturePad width={500} height={40} design="line" />
      </p>

      <p className="paragraph">
        No assurance has been given regarding the outcome of the operation.
      </p>

      <p className="paragraph">
        I authorize the surgeon and team to perform the planned procedure and
        any additional procedure deemed necessary during surgery.
      </p>

      <p className="paragraph">
        I also consent to anesthesia and any associated medical treatment
        required.
      </p>

      <p className="paragraph">
        I assure my full cooperation during treatment and agree to follow
        medical advice after surgery.
      </p>

      <br />

      <p>
        Witness Name :
        <SignaturePad width={250} height={35} design="line" />
      </p>

      <p>
        Witness Signature :
        <SignaturePad width={250} height={35} design="line" />
      </p>

      <br />

      <p>
        Patient Name :
        <SignaturePad width={250} height={35} design="line" />
      </p>

      <p>
        Patient Signature :
        <SignaturePad width={250} height={35} design="line" />
      </p>

      <br />

      <p>
        Surgeon Name :
        <SignaturePad width={250} height={35} design="line" />
      </p>

      <p>
        Surgeon Signature :
        <SignaturePad width={250} height={35} design="line" />
      </p>
    </div>
  );
}

export default GenericSurgeryEng;
