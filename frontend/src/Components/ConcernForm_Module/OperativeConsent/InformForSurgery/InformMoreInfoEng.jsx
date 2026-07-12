import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import InformForSurgeryEng from "./InformForSurgeryEng";

function InformMoreInfoEng() {
    return (
        <div>
            <div>
                <p className="paragraph">
                    <ul style={{ listStyleType: "square" }} className="paragraph">
                        <li>
                            My medical condition, proposed surgical procedure & course of treatment has been clearly explained to me in written,
                            in my language, by the treating Dr. <span><SignaturePad width={300} height={30} design="line" /></span> My questions
                            & concerns have been discussed & answered, to my satisfaction.
                            The prognosis & risks of not having the surgery/procedure are also explained to me.
                        </li>

                        <li>
                            The doctor has explained that if any complication/risk happen during the surgery, then they will be treated as appropriate.
                        </li>

                        <li>
                            It has been explained to me, that during the course of or subsequent to the surgery, unforeseen conditions may be
                            revealed or encountered which may necessitate urgent surgical or other procedure in addition to or different
                            from those contemplated.

                        </li>

                        <li>
                            It has been explained to me, that the surgery may include a blood/blood product transfusion.

                        </li>

                        <li>
                            The doctor has also explained other relevant treatment options & their associated risks.

                        </li>

                        <li>
                            I understand that if organs or tissues are removed during the surgery, then they may be
                            retained for tests for a period of time & then disposed off by treating doctors & or medical
                            centre in accordance with the accustomed practices.

                        </li>

                        <li>
                            It is also explained to me that any photograph or video recording of the procedure or
                            a part, may be taken during the surgery for educational or research purpose.

                        </li>

                        <li>
                            Alternative treatment available, are explained to me as :
                            <br />
                            <SignaturePad width={700} height={30} design="line" />
                        </li>

                        <li>
                            The risk of surgery/procedure has been told to me. Some of the major risks have been told are :
                            <br />
                            <SignaturePad width={700} height={30} design="line" />
                        </li>

                        <li>
                            The post operative complications which have been particularly explained to me are :
                            <br />
                            <SignaturePad width={700} height={30} design="line" />
                            <SignaturePad width={700} height={30} design="line" />
                        </li>

                        <li>
                            No assurance has been given to me regarding result and outcome of the operation.
                        </li>

                        <li>
                            I have been given an opportunity to ask all/any question and I am satisfied that
                            I don't want to seek any more information.
                        </li>

                        <li>
                            I also understand that aforesaid persons (Hospitals, Doctors & Nurses) will not
                            be held liable for any consequences arising out of the operation.
                        </li>
                    </ul>
                </p>

                <p className="paragraph">
                    I hereby certify that i have read the information sheet and fully understood the
                    indications for surgery, alternative treatments,
                    and risks associated with the surgery, complications & probable outcome.
                    I <span><SignaturePad width={300} height={30} design="line" /></span> hereby authorize
                    Dr.<span><SignaturePad width={300} height={30} design="line" /></span>
                    (& whomsoever he/she may designate as
                    his/her assistants/colleagues) to administer such treatment as necessary & to perform the
                    following operation/ Procedure
                    (including indication for operation / procedure) <br />
                    <SignaturePad width={700} height={30} design="line" />
                    <SignaturePad width={700} height={30} design="line" />
                    & any additional operation/procedure as are considered therapeutically necessary during the course of mentioned
                    operation/procedure.
                    I also consent to the administration of any anesthesia as considered necessary for the opera-tion/ procedure.
                </p>

                <p className="paragraph">
                    <ul style={{ listStyleType: "square" }} className="paragraph">
                        <li>
                            I also authorize the doctor for associated medical/invasive treatment,
                            any organ removal, video recording if required for educational or research purpose.
                        </li>

                        <li>
                            I also certify that no guarantee or assurance has been made as to the results that may be obtained.
                        </li>

                        <li>
                            I fully assure my cooperation to the treating doctor during the treatment course. I will follow the doctor's instructions
                            after surgery, regarding diet, medication & any precautions.
                        </li>

                        <li>
                            I certify that incase of any complication or mis happening, I will not blame the treating doctor or the medical center.
                        </li>
                    </ul>
                </p>
            

            </div>
        </div>

    )
}

export default InformMoreInfoEng;





