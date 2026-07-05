import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import PatientDeclaration from "./PatientDeclaration"

function InformForIVP() {


    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital, Daund
            </h2>
            <h4 className="title">
                INFORMED CONSENT FOR IVP PROCEDURE
            </h4>

            <Table_Form />
            <div>
                <div>
                    <p className="paragraph">
                        Your doctor has scheduled you for a CT/IVP exam an that requires the injection of a contrast media into your
                        bloodstream. The contrast media injection allows for better detailed imaging of certain structures inside your
                        body.
                        The newer non-ionic contrast media has been chosen for intravenous use. Although these agents have been
                        shown to be safer than the previously used contrast media, any injection carries some risks. Approximately 95%
                        of all reaction to be contrast media are miled to moderate in nature and may include itching, hives and swelling
                        of the lips and eyes. Some respiratory and cardiac reactions may be more serious and require medical treatment.
                        These problem are usually recognized promptly and treated without difficulty. The risk of death (1 out of every
                        100,000 exams) is no greater than that from an injection of penicillin. On rare occasions, the contrast media
                        could leak out of the vessel and cause skin inflammation.
                        Although the CT/IVP procedure and contrast media injection is very safe, we believe it to be in your best
                        interest to understand what is involved. You are asked to sign this form to verify that you understand the
                        indications and possible complications of this procedure It is also important to inform the technologist of any
                        medical conditions,including pregnancy, prior to the exam. You will have ample opportunity to discuss any
                        questions you may have regarding your CT/IVP exam. In addition, this newer and safer contrast media is not
                        covered under some health insurance plans. Please be advised that the cost of the contrast media will be the
                        patient's responsibility in the event that your insurance provider does not cover it.
                        The risks involved and possibility of complications during this procedure have been explained to me in the
                        language understandable to me. <br />
                        I acknowledge that :
                        <ol>
                            <li>
                                I am pregnant
                            </li>

                            <li>
                                I am not pregnant
                            </li>

                            <li>
                                There could be a possibility that I could be pregnant.
                            </li>
                        </ol>
                        Known allergies / medical conditions.
                        <SignaturePad width={700} height={30} design="line"/>

                        Your signature on this form indicates your consent for this procedure.


                    </p>
                </div>

                <PatientDeclaration />

            </div>
        </div>
    )
}

export default InformForIVP;