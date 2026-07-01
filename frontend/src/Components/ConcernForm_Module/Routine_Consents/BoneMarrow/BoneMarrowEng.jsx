import React from "react";
import SignaturePad from "../SignaturePad";
import Table_Form from "../Tabel_Form";
import "../Minor_Surgical/MinorEnglish.css";
import DeclarationPICCBoneMarrowChemo from "../Common_Code/DeclarationPICCBoneMarrowChemo";



function BoneMarrowEng() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital,Daund
            </h2>
            <h4 className="title">
                BONE MARROW ASPIRATION AND BIOPSY CONSENT FORM
            </h4>


            <Table_Form />
            <div>

                <strong>
                    Diagnosis: <span><SignaturePad width={700} height={40} design="border" /></span>
                </strong>
                <br /><br />

                <strong>
                    Proposed Treatment: <span><SignaturePad width={700} height={40} design="border" /></span>
                </strong>
                <br />

                <p className="paragraph">
                    I (or Patient Relative),<span><SignaturePad width={300} height={30} design="line" /></span>, give my consent for the bone marrow
                    aspiration and biopsy procedure to be performed by Dr.<span><SignaturePad width={300} height={30} design="line" /></span> and their assisting medical staff.
                    If Dr.<span><SignaturePad width={300} height={30} design="line" /></span> is unable to complete the procedure for any reason, a qualified substitute physician
                    will complete the procedure. The details of this procedure have been explained to me in a language that I understand.
                </p>

                <strong>
                    The provided information includes:
                </strong>
                <ol className="paragraph">
                    <li>
                        <strong>Nature of the Procedure: </strong>
                        Bone marrow aspiration and biopsy involve using a needle to withdraw bone marrow cells
                        (aspiration) and collect a small sample of bone marrow tissue (biopsy) for diagnostic purposes.
                    </li>
                    <li>
                        <strong>Associated Risks:</strong>
                        Potential complications may include pain, bleeding, infection, dizziness, swelling, or inflammation at the
                        procedure site.
                    </li>
                    <li>
                        <strong>Expected Benefits:</strong>
                        This procedure helps in diagnosing blood disorders, leukemia, anemia, and other bone marrow-related
                        diseases.

                    </li>
                    <li>
                        <strong>Recovery Duration:</strong>
                        I have been informed about the estimated recovery period and possible post-procedure side effects.

                    </li>
                    <li>
                        <strong>Alternative Treatments & Risks:</strong>
                        I have been informed about available alternative diagnostic options, their risks, and the
                        consequences of not undergoing this procedure.
                    </li>
                </ol>
                <p className="paragraph">
                    I have been given the opportunity to ask any questions regarding the procedure, and all my queries have been answered
                    satisfactorily. I understand that I have the right to refuse this procedure at any time before it is performed. I voluntarily authorize
                    Dr.<span><SignaturePad width={300} height={30} design="line" /></span> to proceed with the necessary procedure and any additional interventions deemed
                    essential for my diagnosis and treatment.
                    If any unforeseen complications arise during this procedure requiring additional treatments, operations, medications, or
                    hospitalization, I authorize my doctor to take necessary actions on my behalf.
                    I acknowledge that I have read (or had read to me) and fully understood the above information. I voluntarily consent to undergo
                    this procedure
                </p>

                <strong>Procedure Description:</strong>
                <ul>
                    <li>
                        Aspiration: A needle is inserted into the bone (typically the iliac crest of the hip) to withdraw a small sample of bone
                        marrow.
                    </li>
                    <li>
                        Biopsy: A small piece of bone and marrow is obtained for examination.
                    </li>
                    <li>
                        Local anesthesia will be used to numb the area to minimize discomfort during the procedure.
                    </li>
                    <li>
                        The sample will then be sent to a laboratory for detailed analysis.
                    </li>
                </ul>

                <strong>Potential Risks and Complications: </strong>
                <ol className="paragraph">
                    <li>
                        <strong>
                            Infection:
                        </strong>
                        at the biopsy site, despite sterile techniques being used.
                    </li>

                    <li>
                        <strong>
                            Bleeding:
                        </strong>
                        at the biopsy site.
                    </li>

                    <li>
                        <strong>
                            Pain or discomfort :
                        </strong>
                        during and after the procedure at the site of the needle insertion.
                    </li>

                    <li>
                        <strong>
                            Allergic reaction :
                        </strong>
                        to the local anesthetic used during the procedure.
                    </li>

                    <li>
                        <strong>
                            Damage to surrounding tissues or organs :
                        </strong>
                        though this is rare.
                    </li>

                    <li>
                        <strong>
                            Bruising or hematoma :
                        </strong>
                        formation at the site of the procedure.
                    </li>

                    <li>
                        <strong>
                            Fainting, dizziness, or lightheadedness :
                        </strong>
                        during or after the procedure.
                    </li>

                    <li>
                        <strong>
                            Persistent soreness :
                        </strong>
                        or discomfort after the procedure.
                    </li>
                </ol>
                These risks will be minimized through proper procedure techniques and patient monitoring.
                <br /><br />
                <DeclarationPICCBoneMarrowChemo
                    patientSign="Patient Signature :"
                    parentName="Parent/Guardian Name :"
                    parentSign="Parent/Guardian Signature :"
                    date="Date :"
                    patientRelative="Relationship to Patient :" />

            </div>
        </div>


    )
}

export default BoneMarrowEng;