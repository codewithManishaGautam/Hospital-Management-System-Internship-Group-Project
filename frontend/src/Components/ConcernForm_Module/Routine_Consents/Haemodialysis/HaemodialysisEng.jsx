import React from "react";
import SignaturePad from "../SignaturePad";

function HaemodialysisEng() {
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
                        My/my patient's current medical condition, nature of the disease, prognosis (probable course and outcome)
                        of diseases including the risks that are specific to me/my patient.
                    </li>

                    <li>
                        My/my patient's is having acute kidneys failure & will require haemodailysis, it may be temporary or permanent
                        depending upon condition of patient.
                    </li>

                    <li>
                        Haemodialysis is a life-sustaining procedure, it is not a cure for kidney failure.
                    </li>

                    <li>
                        Haemodialysis involves, the insertion of tubes and/or needles into my veins or fistula or
                        through a catheter and the use of machine to filter my blood.
                    </li>

                    <li>
                        I/my patient may need laboratory tests, radiology and surgical procedures to assure
                        adequate function of the equipment and effectiveness of the treatment.
                    </li>

                    <li>
                        The nature, purpose, necessity, outcome, risks & complications of proposed procedure, other available relevant alternative options
                        and their associated benefits & risks &
                        complication. Risks consequences & complications of not undergoing the procedure are explained to me.
                    </li>

                    <li>
                        The alternatives to haemodialysis are peritoneal dialysis, or transplanation, and that I may
                        be evaluated for either whenever Ichoose.
                    </li>

                    <li>
                        To follow certain dietary restrictions is very important, failure to do so can cause bone disease, calcification of my heart, blood vessels and skin,
                        heart failure and even sudden death.
                    </li>

                    <li>
                        To take my medication as prescribed by my physician.
                    </li>

                    <li>
                        The success of haemodialysis also depends upon my agreeing to remain on the machine for the prescribed length of time
                        so that my blood can be adequately cleansed.
                    </li>

                    <li>
                        If an immediate life-threatening event takes place during the procedure, they will treat me/my patient for saving life as per Acute Resuscitation Plan.
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
                        I have been given enough time to read, review & understand the information in this consent.
                    </li>

                    <li>
                        I also have been given chance to ask questions and raise concerns with the doctor about 
                        my/my patient's condition, unfamiliar medical terminologies used, the proposed procedure, 
                        its benefits & risks, and alternative treatment options with associated benefits & risks. 
                        My questions and concerns have been discussed and answered to my satisfaction.

                    </li>

                    <li>
                        I have been explained for all the above points in the language that I understand and with 
                        illustration wherever required.

                    </li>

                    <li>
                        I accept the risk of substantial and serious harm, mild/moderate/high risk of life(death) 
                        as explained to me & my relatives, if any, in hopes of obtaining the desired benefits from the procedure (s).

                    </li>

                    <li>
                        I do not hold the hospital, medical or paramedical staff responsible for explained risks and complications 
                        that could occur from the above-mentioned procedure.

                    </li>

                    <li>
                        I signed this consent voluntarily without under any pressure and influence. By my free will, 
                        I give consent & authorise under direction of Dr. <span><SignaturePad width={300} height={40} design="line"/></span> 
                        for haemodialysis to perform on me/my patient

                    </li>
                </ul>
            </p>
            

        </div>
    )
}

export default HaemodialysisEng;




