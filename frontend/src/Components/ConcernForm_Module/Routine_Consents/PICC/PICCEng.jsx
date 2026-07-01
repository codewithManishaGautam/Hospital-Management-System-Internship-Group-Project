import React from "react";
import SignaturePad from "../SignaturePad";
import FormChart from "../Common_Code/FormChart";
import Table_Form from "../Tabel_Form";
import "../Minor_Surgical/MinorEnglish.css";
import DeclarationPICCBoneMarrowChemo from "../Common_Code/DeclarationPICCBoneMarrowChemo";


function PICCEng() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital,Daund
            </h2>
            <h4 className="title">
                PICC Line Insertion Consent Form
            </h4>


            <Table_Form />
            <div>

                <b >
                    Diagnosis: <span><SignaturePad width={700} height={40} design="border" /></span>
                </b>
                <br /> <br />

                <b>
                    Proposed Treatment: <span><SignaturePad width={700} height={40} design="border" /></span>
                </b>
                <br />

                <p className="paragraph">
                    I (or Patient Relative), <span><SignaturePad width={300} height={30} design="line" /></span>, give my consent for the PICC
                    (Peripherally Inserted Central Catheter) line insertion procedure to be performed by Dr.
                    <span><SignaturePad width={300} height={30} design="line" /></span> and their assisting medical staff. If
                    Dr. <span><SignaturePad width={300} height={30} design="line" /></span> is unable to complete the procedure, a qualified
                    substitute physician will do so. The procedure has been explained to me in a language that I understand.
                </p>

                <b>
                    Explanation Provided:
                </b>
                <ol className="paragraph">
                    <li>
                        <b>Nature of the Procedure: </b>
                        A PICC line is a long, thin catheter inserted into a vein in the arm and advanced toward a large
                        vein near the heart.This procedure is used for administering medications, fluids, or nutrition.
                    </li>
                    <li>
                        <b>Potential Risks:</b>
                        Pain, bleeding, infection, vein inflammation, thrombosis (blood clot formation), and PICC line
                        dislodgement or blockage.

                    </li>
                    <li>
                        <b>Expected Benefits:</b>
                        Safe long-term medication administration, reduced need for repeated needle insertions, and improved
                        patient comfort.

                    </li>
                    <li>
                        <b>Recovery Duration:</b>
                        I have been informed about possible side effects and the estimated recovery period post-procedure.

                    </li>
                    <li>
                        <b>Alternative Treatments & Risks:</b>
                        I have been made aware of alternative options, their risks, and the possible
                        consequences of not undergoing this procedure.
                    </li>
                </ol>
                <p>
                    I have been given the opportunity to ask questions regarding the procedure, and all my queries have been answered satisfactorily.
                    I understand that I have the right to refuse this procedure at any time before it is performed. I voluntarily authorize Dr.
                    <span><SignaturePad width={300} height={30} design="line" /></span> to perform the procedure and any additional necessary interventions.
                    If any unforeseen complications arise requiring additional treatments, operations, medications, or hospitalization, I authorize my
                    doctor to take the necessary actions on my behalf.
                    I acknowledge that I have read (or had read to me) and fully understand the above information. I voluntarily consent to undergo
                    this procedure.
                </p>

                <b>Possible Risks and Complications:</b>
                <ol className="paragraph">
                    <li>
                        <b>
                            Infection:
                        </b>
                        Risk of infection at the PICC line insertion site.
                    </li>

                    <li>
                        <b>
                            Bleeding:
                        </b>
                        Minor bleeding may occur during or after the procedure.
                    </li>

                    <li>
                        <b>
                            Thrombosis:
                        </b>
                        Formation of blood clots in the veins.
                    </li>

                    <li>
                        <b>
                            Vein Inflammation:
                        </b>
                        Some patients may develop vein irritation or swelling.
                    </li>

                    <li>
                        <b>
                            Line Dislodgement or Blockage:
                        </b>
                        Risk of the PICC line moving out of place or becoming blocked.
                    </li>

                    <li>
                        <b>
                            Changes in Heart Rhythm:
                        </b>
                        Rare but possible impact on heart rate.
                    </li>

                    <li>
                        <b>
                            Allergic Reactions:
                        </b>
                        Some patients may experience sensitivity to catheter material.
                    </li>
                </ol>
                These risks will be minimized through proper procedure techniques and patient monitoring.
                <br /><br />
                <DeclarationPICCBoneMarrowChemo 
                    patientSign="Patient Signature :"
                    parentName="Parent/Guardian Name :"
                    parentSign="Parent/Guardian Signature :"
                    date="Date :"
                    patientRelative="Relationship to Patient :"/>            
            </div>
        </div>
        
    )
}

export default PICCEng;