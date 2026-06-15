import React from "react";
import SignaturePad from "../SignaturePad";

function VenousEng() {
    return (
        <div>
            <br /><br />
            <b>
                DECLARATION BY PATIENT / GUARDIAN <br />
                I acknowledge below mentioned facts which doctor has explained to me:
            </b>

            <br /><br />
            <p className="paragraph">


                <ul>
                    <li>
                        My / my patient's current medical condition, nature of the disease,
                        prognosis (probable course and outcome of the disease), including the
                        risks specific to me / my patient, have been explained to me.
                    </li>

                    <li>
                        The proposed procedure will be performed under Local Anaesthesia.
                        A separate consent for the same has been obtained.
                    </li>

                    <li>
                        The nature, purpose, necessity, expected outcome, risks and
                        complications of the proposed procedure, available alternative
                        treatment options and their associated risks and complications,
                        as well as the consequences and risks of not undergoing the
                        procedure, have been explained to me.
                    </li>

                    <li>
                        In the event of an immediate life-threatening situation arising
                        during the procedure, the medical team is authorized to provide
                        necessary treatment to save my / my patient's life in accordance
                        with the Acute Resuscitation Plan.
                    </li>

                    <li>
                        The medical and paramedical staff will exercise their professional
                        knowledge, skills and judgment competently in the best interest
                        of the patient's welfare.
                    </li>
                </ul>
                <br /><br />

                <b>
                    I also state that
                </b>
            </p>

            <p className="paragraph">


                <ul>
                    <li>
                        I have been given sufficient time to read, review and understand
                        the information provided in this consent form.
                    </li>

                    <li>
                        I have been given the opportunity to ask questions and raise
                        concerns with the doctor regarding my / my patient's condition,
                        unfamiliar medical terminology used, the proposed procedure,
                        its risks, and available treatment options. My questions and
                        concerns have been discussed and answered to my satisfaction.
                    </li>

                    <li>
                        All the above-mentioned points have been explained to me in a
                        language that I understand, and with illustrations wherever
                        necessary.
                    </li>

                    <li>
                        I understand and accept the possibility of substantial and serious
                        harm, including mild, moderate, or high risk to life (including
                        death), as explained to me and my relatives, if any, in the hope
                        of obtaining the desired benefits from the procedure(s).
                    </li>

                    <li>
                        Although the surgical procedure will be performed with due care,
                        professional judgment, skill, and diligence, no guarantee has
                        been given regarding the outcome of the procedure.
                    </li>

                    <li>
                        I shall not hold the hospital, medical staff, or paramedical staff
                        responsible for the known risks and complications that may arise
                        from the above-mentioned procedure.
                    </li>

                    <li>
                        I am signing this consent voluntarily, without any pressure,
                        coercion, or undue influence. By my free will, I hereby give my
                        consent and authorize Dr. <span><SignaturePad width={300} height={40} design="line" /></span> and/or
                        his/her associate consultants of choice to perform the
                        above-mentioned procedure on me / my patient.
                    </li>
                </ul>
            </p>

        </div>
    )
}

export default VenousEng;




