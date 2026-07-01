import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import "../CommonCode/FormBasic.css";
function SedationProcedureCommon() {
    return (
        <div >
            <div>
                <strong>
                    Diagnosis
                </strong>
                <SignaturePad width={700} height={30} design="line" />
                <br />

                <strong>
                    Name of procedure
                </strong>
                <SignaturePad width={700} height={30} design="line" />
                <br />
                <strong>
                    Attending Anaesthesiologist
                </strong>
                <SignaturePad width={700} height={30} design="line" />
                <br />
                <strong>
                    Attending Consultant
                </strong>
                <SignaturePad width={700} height={30} design="line" />
                <br />

                <p className="paragraph">
                    Procedures are required to resolve the patient's current medical problems. During some
                    procedure appropriate sedation is needed to reduce pain, fear and comfortable and for
                    safer physical condition during procedure. Medical procedure involves a certain amount
                    of risk to patient. A large part of this risk stems from the potential of sedation-related
                    complications which is higher with prior medical ailments. However, judicious use of sedation,
                    close attention to patient selection and careful monitoring can significantly reduce these risks.
                </p>
                <br />

                <strong>
                    Sedation :
                </strong>
                <ul type="none">
                    <li>
                        It is a technique that makes the patient feel more pleasantly or less anxious during the treatment process / procedure.
                    </li>
                </ul>

                <strong>
                    Sedatives :
                </strong>
                <ul type="none">
                    <li>
                        Drug helping to get sleep, relax and make patient feel very calm.
                    </li>
                </ul>

                <strong>
                    Types :
                </strong>
                <ul>
                    <li>
                        There are several levels of sedation anaesthesia they are:
                        <ul>
                            <strong>
                                Minimal Sedation :
                            </strong>
                            During minimal sedation you will be relaxed, but awake and able to ask and
                            answer questions from your physician or surgical team. With minimal sedation
                            anaesthesia supplemental oxygen may be given. <br />

                            <strong>
                                Moderate Sedation :
                            </strong>
                            During moderate sedation you will most likely sleep through your procedure, but you are
                            easily awakened when asked a question or touched. It is unlikely that you will remember being in the
                            operating room.With moderate sedation anaesthesia supplemental oxygen will be given. <br />

                            <strong>
                                Deep Sedation :
                            </strong>
                            During deep sedation you will sleep through the entire procedure and will not remember being in
                            the operating room. Your breathing will slow and you will normally sleep for a period of time after your procedure is
                            complete. With deep sedation anaesthesia supplemental oxygen will be given. <br />

                            <strong>
                                Risks with sedation anaesthesia :
                            </strong>
                            <br />
                            <li>
                                Following sedation, delayed complications include prolonged drowsiness, paradoxical hyper-stimulation,
                                gastrointestinal upset, vomiting and motor imbalance.
                            </li>

                            <li>
                                Serious hazards encountered during sedation include respiratory and cardiovascular compromise, like airway
                                obstruction, hypoventilation, desaturation i.e. hypoxia (Oxygen saturation {"<"}90%), hypotension
                            </li>
                        </ul>

                    </li>

                </ul>




            </div>

        </div>

    )
}

export default SedationProcedureCommon;