import React from "react";
import "./HIV_Consent_English.css"
import SignaturePad from "../SignaturePad";
function HIV_Consent_English(params) {
    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital,Daund
            </h2>
            <h3 className="title">
                Consent For HIV antibody testing
            </h3>

            <Table_Form />
            <p className="paragraph">
                I have read (or have had read to me) the description of the HIV antibody test and understand the limitations
                and possible consequences of this test. I understand that i can refuse to be tested without prejudice to
                my future care. If my test is positive, I can expect to be counselled about the implications of HIV infection.
                Every attempt will be made to keep my test results confidential. I understand that my physician will not disclose
                my test results to any individual without my permission, but that if this test is positive for HIV or I develop aids,
                this information must, by statute, be reported to the state health authority (NACO). I have also had explained to me
                the procedure for drawing blood and the minimal risk of this procedure. I agree to be tested for HIV antibodies.
            </p>

            <div className="signature-grid">
                <p>
                    Patient Name <SignaturePad width="300px" height="30px" design="line"/>
                </p>
                <p>
                    Patient Signature <SignaturePad width="150px" height="30px"/>
                </p>
            </div>
            <div className="signature-grid">
                <p>
                    Doctor Name <SignaturePad width="300px" height="30px" design="line"/>
                </p>
                <p>
                    Doctor Signature <SignaturePad width="150px" height="30px"/>
                </p>
            </div>
            <div className="signature-grid">
                <p>
                    Date <SignaturePad width="150px" height="30px" design="line"/>
                </p>
                <p>
                    Time <SignaturePad width="150px" height="30px" design="line"/>
                </p>
                
            </div>

            <p>
                The result of the above test has been informed to us/me.
            </p>

            <div className="signature-grid">
                <p>
                    Name of Relative <SignaturePad width="150px" height="30px" design="line"/>
                </p>
                <p>
                    Signature <SignaturePad width="150px" height="30px"/>
                </p>
                
            </div>



        </div>
    )
}

export default HIV_Consent_English;