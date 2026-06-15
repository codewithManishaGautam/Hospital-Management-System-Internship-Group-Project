import React from "react";
import SignaturePad from "../SignaturePad";
import Table_Form from "../Tabel_Form";
import "../Minor_Surgical/MinorEnglish.css"

function MajorEnglish() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital,Daund
            </h2>
            <h3 className="title">
                Consent Form for Major Surgical Procedure
            </h3>
            <p className="title">
                (To be filled by the Surgeon before any kind of procedure/surgery)
            </p>
            <Table_Form />
            <b>
                Diagnosis
            </b>
            <br />
            <SignaturePad width={700} height={40} design="border" />
            <b>
                Procedure Name
            </b>
            <br />
            <SignaturePad width={700} height={40} design="border" />
            <b>
                Illustration
            </b>
            <br />
            <SignaturePad width={700} height={250} design="border" />

            <br />
            <p className="paragraph">
                <b>Surgical procedure</b> is diagnosis or treatment of pathological conditions such as injuries,
                disorders/ deformity, and disease of the body by incision or manipulation, especially
                with instruments by medical specialty (Surgeons). Purpose is to help in improve bodily
                function or appearance. Surgical procedure carries risk of complications i.e. common and surgery specific.

            </p>
            <br />

            <b>
                Immediate:
            </b>
            <ul className="paragraph">
                <li>
                    <b>Hemorrhage :</b> Excessive blood loss either during Surgery or post-surgery (due to increase in blood pressure)
                    which require replacement of blood loss or may require re-exploration of the wound.
                </li>
                <li>
                    <b>Basal atelectasis :</b>  minor lung collapse.
                </li>
                <li>
                    <b>Shock :</b>  blood loss, acute myocardial infarction, pulmonary embolism or septicemia.
                </li>
                <li>
                    <b>Low urine output :</b>  inadequate fluid replacement intra-operatively and postoperatively.
                </li>
            </ul>

            <br />


            <p><b>Early:</b></p>

            <table style={{ width: "100%" }}>

                <tbody>

                    <tr>

                        <td
                            style={{
                                verticalAlign: "top",
                                width: "50%"
                            }}
                        >

                            <ul>

                                <li>
                                    Acute confusion: exclude dehydration and sepsis.
                                </li>

                                <li>
                                    Nausea and vomiting: analgesia or anesthesia related;
                                    paralytic ileus.
                                </li>

                                <li>
                                    Fever
                                </li>

                                <li>
                                    Secondary hemorrhage: often as a result of infection.
                                </li>

                                <li>
                                    Pneumonia.
                                </li>

                            </ul>

                        </td>

                        <td
                            style={{
                                verticalAlign: "top",
                                width: "50%"
                            }}
                        >

                            <ul>

                                <li>
                                    Wound or anastomosis dehiscence.
                                </li>

                                <li>
                                    Deep Vein thrombosis (DVT)
                                </li>

                                <li>
                                    Acute urinary retention.
                                </li>

                                <li>
                                    Urinary tract infection (UTI).
                                </li>

                                <li>
                                    Postoperative wound infection.
                                </li>

                                <li>
                                    Bowel obstruction due to fibrinous adhesions.
                                </li>

                                <li>
                                    Paralytic Ileus.
                                </li>

                            </ul>

                        </td>

                    </tr>

                </tbody>

            </table>


            <p><b>Late:</b></p>

            <table style={{ width: "100%" }}>

                <tbody>

                    <tr>

                        <td
                            style={{
                                verticalAlign: "top",
                                width: "50%"
                            }}
                        >

                            <ul>

                                <li>
                                    Bowel obstruction due to fibrous adhesions.
                                </li>

                                <li>
                                    Incisional hernia
                                </li>

                                <li>
                                    Problems with wound healing
                                </li>

                            </ul>

                        </td>

                        <td
                            style={{
                                verticalAlign: "top",
                                width: "50%"
                            }}
                        >

                            <ul>

                                <li>
                                    Persistent sinus
                                </li>

                                <li>
                                    anastomotic leak
                                </li>

                                <li>
                                    Recurrence of reason for surgery – e.g. Malignancy
                                </li>

                            </ul>

                        </td>

                    </tr>

                </tbody>

            </table>


            <p>
                <b>
                    DECLARATION BY PATIENT/GUARDIAN
                </b>
            </p>

            <p>
                I acknowledge below mentioned facts which doctor has explained to me
            </p>

            <ul>

                <li>
                    My/ my patient’s medical condition, nature of the disease,
                    prognosis (probable course and outcome) of diseases.
                </li>

                <li>
                    The nature and purpose of proposed surgical procedure,
                    including additional treatment required if the doctor finds
                    something unexpected.
                </li>

                <li>
                    Certain circumstances may necessitate abandonment
                    of the procedure.
                </li>

            </ul>

            <br />

            <ul>

                <li>
                    Unforeseen circumstances may arise during surgical procedure,
                    which requires an extension of the original surgery or need
                    of a different/additional surgery than the one initially
                    planned for saving patient’s life or for best possible treatment.
                </li>

                <li>
                    Even after adequate pre-operative evaluation and using the
                    best clinical judgment, it may turn out to be a different
                    disease during or after surgery.
                </li>

                <li>
                    The disease could turn out to be inoperable/locally advanced/
                    advanced disease during surgery. In these situations, only
                    procedures likely to benefit the patient will be performed.
                </li>

                <li>
                    About the possibility of future recurrences-
                    local/ regional/ systemic.
                </li>

                <li>
                    Proposed surgery/procedure is done under
                    General/Local/Regional Anaesthesia/ a combination of these.
                    Separate consent is taken for the same.
                </li>

                <li>
                    Outcome and complications of the surgical procedure are
                    explained to me and may require a second re-explorative
                    surgery to rectify the resultant problems.
                </li>

                <li>
                    The risks related to surgical procedure, anesthesia,
                    sedation, including the risks that are specific to me/my
                    patient and the risks of not undergoing the surgical procedure.
                </li>

                <li>
                    Other relevant alternative procedure/ treatment options
                    and their associated risks.
                </li>

                <li>
                    Patient may require cannulation of central veins
                    [internal jugular / subclavian/ femoral veins] & arteries
                    [radial, dorsalis pedis / femoral], postoperative ventilator
                    support, & prolonged intensive care unit stay.
                </li>

                <li>
                    Body parts, tissues or fluid sample removed during surgery
                    will be used for diagnosis & treatment. Sample will be
                    stored or tissue block will be returned to patient or
                    disposed off appropriately by the hospital.
                </li>

                <li>
                    If an immediate life-threatening event takes place during
                    the surgical procedure, they will treat me/my patient for
                    saving life as per Acute Resuscitation Plan.
                </li>

                <li>
                    Medical and paramedical staff exercises their knowledge
                    and skill in a competent manner in the interest of the
                    patient’s welfare.
                </li>

            </ul>

            <b>I also state that</b>


            <ul>

                <li>
                    I have been given enough time to read & understand this consent.
                </li>

                <li>
                    I also have been given chance to ask questions and raise concerns
                    with the doctor about my /my patient’s condition, the proposed
                    surgical procedure, its risks, and my treatment options.
                    My questions and concerns have been discussed and answered
                    to my satisfaction.
                </li>

                <li>
                    I have been explained for all the above points in the language
                    that I understand and with illustration wherever required.
                </li>

                <li>
                    I accept the risk of substantial and serious harm,
                    mild/ moderate/ high risk of life (death) as explained to me
                    & my relatives, if any, in hopes of obtaining the desired
                    benefits from the procedure(s).
                </li>

                <li>
                    Even though surgical procedure has been carried out with all due care,
                    judgment, skill & professional care, no guarantee has been given
                    for outcome of the surgical procedure.
                </li>

                <li>
                    I signed this consent voluntarily in sound health & body
                    without under any pressure and influence.
                </li>

                <li>
                    I do not hold the hospital, medical or paramedical staff
                    responsible for any mishap that could occur from the
                    (bonafide) above mentioned surgical procedure.
                </li>

                <li>
                    By my free will, I give consent and authorise
                    <span><SignaturePad width={250} height={35} design="line"/></span> and associate consultants of his choice
                    for the above mentioned surgical procedure to perform on
                    me/my patient under appropriate anaesthesia and to administer
                    blood & blood products when necessary during the peri-operative period.
                </li>

            </ul>

            <br />

             <div
    style={{
      display: "flex",
      gap: "40px",
      marginBottom: "15px",
    }}
  >
    <b>High Risk Consent </b>

    <label>
      Applicable
      <input
        type="checkbox"
        style={{ marginLeft: "8px" }}
      />
    </label>

    <label>
      Not Applicable
      <input
        type="checkbox"
        style={{ marginLeft: "8px" }}
      />
    </label>

  </div>

  <ul >

    <li >
      Doctors has explained to me / us that, in view of my /
      my patient’s general condition and co-morbidities /
      medical illnesses like diabetes mellitus/ hypertension/
      Ischemic Heart Disease/ Bronchial Asthma/ others (specify)
      <span><SignaturePad width={700} height={35} design="line"/></span>
      <span><SignaturePad width={300} height={35} design="line"/></span>,
      I / my patient carries a high risk during and after the surgery.
    </li>

    <li >
      I / we understood all associated risk factors and
      complications of surgery & anaesthesia mentioned above
      is higher if patient is suffering from other medical
      illnesses and need for extended post-operative ICU care
      and artificial ventilation.
    </li>

    <li >
      I / we signed this High Risk Consent voluntarily
      for the desired procedure / surgery.
    </li>

  </ul>

  <p className="paragraph">
    I confirm that I have accurately interpreted the contents of this form and the related 
    conversations between the patient and the doctor.
  </p>

  <label>
    Proposed Date of Surgery : <span><SignaturePad width={150} height={30} design="line"/></span> 
  </label>
  <br />

  <label>
    Surgery / Procedure Planned
  </label>
  <br />
  <label>
       Elective Surgery
      <input
        type="checkbox"
        style={{ marginLeft: "8px" ,marginRight: "18px" }}
      />
    </label>

    <label>
       Emergency Surgery :
      <input
        type="checkbox"
        style={{ marginLeft: "8px" ,marginRight: "18px"}}
      />
    </label>
    <br /><br />

    <b>Individual Risks: </b><br /><br />
    <label>1) <span><SignaturePad width={700} height={30} design="line"/></span> </label>
    <label>2) <span><SignaturePad width={700} height={30} design="line"/></span> </label>
    <label>3) <span><SignaturePad width={700} height={30} design="line"/></span> </label>

    <br /><br />
    <label>Date : <span><SignaturePad width={200} height={30} design="none"/></span></label>

    <label >Time : <span><SignaturePad width={200} height={30} design="none"/></span></label>
    <br /><br />

    <label >Name of Patient/Family Member (Relation) : <span><SignaturePad width={260} height={30} design="line"/></span></label>
    <label >Sign : <span><SignaturePad width={100} height={30} design="line"/></span></label>
    <label >Name of Patient/Family Member (Relation) : <span><SignaturePad width={260} height={30} design="line"/></span></label>
    <label >Sign : <span><SignaturePad width={100} height={30} design="line"/></span></label>
    <label >Name of Nurse : <span><SignaturePad width={420} height={30} design="line"/></span></label>
    <label >Sign : <span><SignaturePad width={100} height={30} design="line"/></span></label>
    <label >Name of Interpreter : <span><SignaturePad width={395} height={30} design="line"/></span></label>
    <label >Sign : <span><SignaturePad width={100} height={30} design="line"/></span></label>
    <label >Name of Surgeon : <span><SignaturePad width={405} height={30} design="line"/></span></label>
    <label >Sign : <span><SignaturePad width={100} height={30} design="line"/></span></label>
    <br /><br />
    <label style={{display:"flex", justifyContent:"end", marginRight:"10px"}}>stamp : <span><SignaturePad width={100} height={40} design="none"/></span></label>

    </div>
    );
}

export default MajorEnglish;