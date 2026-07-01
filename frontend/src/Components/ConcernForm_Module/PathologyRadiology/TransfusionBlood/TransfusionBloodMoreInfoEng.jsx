import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import "../CommonCode/FormBasic.css";



function TransfusionBloodMoreInfoEng() {
    return (
        <div>
            <div>
                <p className="paragraph">
                    <ol>
                        My / the patient's Doctor <span><SignaturePad width={300} height={30} design="line" /></span>
                        has advised me / the patient for the transfusion of blood / blood
                        products / red cells / platelets / fresh frozen plasma / cryoprecipitate and / or
                        <span><SignaturePad width={400} height={30} design="line" /></span>(blood products). <br />
                        <li>
                            The doctor has explained that I / the patient have following medical condition for which I / the patient need a
                            transfusion of <span><SignaturePad width={400} height={30} design="line" /></span> <br />
                            The doctor has explained the benefits that are expected from my / the patient being transfused and as well, the risks
                            associaed with transfusion. <br />
                        </li>

                        <li>
                            I / We understand that there is a small possibility that transfusion of blood/blood product can be incompatible with my /
                            the patient's body and can result in transfusion reactions like fever,rashes,shortness of breathe,shock,other and on rare
                            occasion death. <br />
                        </li>

                        <li>
                            I / we understand that in spite of careful screeing according to national regulations there could be rare instances of
                            acquiring life threaening infections such as HIV I and II, hepatitis B, hepatitis C and other viruses / diseases which are
                            yet known for which screening tests do not exist and which may not be recognised as an infection for many months or
                            years. <br />
                        </li>

                        <li>
                            The doctor has explained me about the risks of not having the blood and / or blood products. I have had an opportunity
                            to ask questions regarding transfusion of blood / blood products for myself / for the patient.
                            With my signature i give consent to administer blood / blood products for myself or for the patient.
                            I agree this informed consent may serve for consent to give additional necessary blood / blood product till the end of this
                            hospitalization or for the complete course of this illness if have been advised the future need for transfusion of blood /
                            blood products. <br />
                        </li>

                        <li>
                            I / We have read the above writing or have been explaining in the language <span><SignaturePad width={100} height={30} design="line" /></span> which I understand
                            about the need of transfusion, its benefits, cost and risks associated and other alternative managment and I / We hereby
                            give my / our full valid consent for the transfusion. <br />
                        </li>

                        <li>
                            I have understood the aforesaid and giving and i am giving my consent willingly the sound mental state without any
                            coercian, undue influence, fraud, misrepresentation or mistake of facts.
                        </li>
                    </ol>
                </p>
            </div>

        </div>

    )
}

export default TransfusionBloodMoreInfoEng;



