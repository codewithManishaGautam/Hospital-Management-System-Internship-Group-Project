import React from "react";
import SignaturePad from "../SignaturePad";
import Table_Form from "../Tabel_Form";
import "../Minor_Surgical/MinorEnglish.css";
import DeclarationPICCBoneMarrowChemo from "../Common_Code/DeclarationPICCBoneMarrowChemo";



function IntraMethotrexateEng() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital,Daund
            </h2>
            <h4 className="title">
                Consent for Intrathecal Methotrexate Procedure
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
                    I (or Patient Relative), <span><SignaturePad width={300} height={30} design="line" /></span> , consent to the intrathecal methotrexate
                    (INJ METHOTREXATE 12mg) procedure to be performed by Dr. <span><SignaturePad width={300} height={30} design="line" /></span> and staff, associates,
                    or assistants to whom he/she may assign designated responsibilities. In the event Dr. <span><SignaturePad width={300} height={30} design="line" /></span> is
                    unable to perform or complete the procedure, a qualified substitute physician will complete the procedure. The procedure has
                    been explained to me in terms that I understand.

                </p>

                <hr style={{
                    width: "100%",
                    border: "0",
                    borderTop: "2px solid black"
                }} />

                <strong>
                    The explanation included:
                </strong>
                <ol className="paragraph">
                    <li>
                        <strong>Nature of the Procedure: </strong>
                        Administration of methotrexate into the cerebrospinal fluid via lumbar puncture for therapeutic
                        purposes.
                    </li>
                    <li>
                        <strong>Associated Risks:</strong>
                        Potential complications including but not limited to pain, headache, nausea, vomiting, infection,
                        bleeding, neurological complications, and drug-related side effects.
                    </li>
                    <li>
                        <strong>Expected Benefits:</strong>
                        Treatment of malignancies involving the central nervous system, prevention of relapse, and improved
                        disease prognosis.

                    </li>
                    <li>
                        <strong>Recovery Duration:</strong>
                        The estimated recovery period and possible side effects post-procedure have been explained to me.
                    </li>
                    <li>
                        <strong>Alternative Treatments & Risks:</strong>
                        I have been informed about other available treatment options, their risks, and the
                        consequences of not undergoing this procedure.
                    </li>
                </ol>

                <hr style={{
                    width: "100%",
                    border: "0",
                    borderTop: "2px solid black"
                }} />

                <p className="paragraph">

                    I was given the opportunity to ask any questions I have regarding the procedure, and I have had those questions answered to my
                    satisfaction. I understand that I have the right to refuse any medical treatment recommended at any time prior to its
                    performance. I authorize Dr. <span><SignaturePad width={300} height={30} design="line" /></span> to perform such additional procedures which, in her
                    judgment, are necessary or appropriate to carry out my diagnosis/treatment.
                    If any unforeseen condition arises during this procedure requiring additional procedures, operations, medication, or
                    transportation to a hospital, I further request and authorize my physician to do whatever is deemed advisable on my behalf.
                    I acknowledge that I have read (or had read to me) and fully understand the above information. Furthermore, I certify that all my
                    questions and concerns regarding the procedure, its attendant risks, benefits, and alternatives have been explained to my
                    satisfaction. I hereby authorize Dr.<span><SignaturePad width={300} height={30} design="line" /></span> to perform the procedure.
                </p>

                <hr style={{
                    width: "100%",
                    border: "0",
                    borderTop: "2px solid black"
                }} />


                <strong>Potential Risks and Complications of Intrathecal Methotrexate: </strong>
                <ol className="paragraph">
                    <li>
                        <strong>
                            Headache:
                        </strong>
                        Common side effect due to irritation of the meninges, often relieved with hydration and rest.
                    </li>

                    <li>
                        <strong>
                            Nausea and Vomiting:
                        </strong>
                        Can occur as a side effect of methotrexate; anti-nausea medication may be needed
                    </li>

                    <li>
                        <strong>
                            Dizziness or Fatigue :
                        </strong>
                        Some patients may experience weakness or dizziness post-procedure                    </li>

                    <li>
                        <strong>
                            Fever or Chills :
                        </strong>
                        A mild fever may develop but usually subsides within 24 hours.
                    </li>

                    <li>
                        <strong>
                            Infection (Meningitis) :
                        </strong>
                        Though rare, there is a risk of infection at the injection site or in the cerebrospinal fluid (CSF).
                    </li>

                    <li>
                        <strong>
                            Bleeding at the Injection Site :
                        </strong>
                        Minor bleeding or bruising can occur at the puncture site                    </li>

                    <li>
                        <strong>
                            Seizures :
                        </strong>
                        Rare but possible, particularly in patients with underlying neurological conditions
                    </li>

                    <li>
                        <strong>
                            Paralysis or Nerve Damage :
                        </strong>
                        Extremely rare, but there is a slight risk of spinal cord injury if the needle is improperly placed                    </li>
                </ol>
                <br /><br />
                These risks will be minimized by careful administration and patient monitoring                <br /><br />

                <hr style={{
                    width: "100%",
                    border: "0",
                    borderTop: "2px solid black"
                }} />

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

export default IntraMethotrexateEng;