import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
function PatientEducation1HeaderDeclaration() {


    return (
        <div >
            <div >
                <label >
                    Provisional Diagnosis (प्रोव्हिजनल डायग्नोसिस / प्राथमिक निदान) :
                </label>

                <SignaturePad
                    width={700}
                    height={30}
                    design="line"
                />
                <br />

                <label>
                    Patient Needs Surgery? (शस्त्रक्रियेची गरज) :
                </label>
                <br />

                <label className="d-flex align-items-center gap-2" >
                    <input type="checkbox" />
                    Yes (आहे)
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <input type="checkbox" />
                    No (नाही)
                </label>
                <br />

                <label >
                    Information about Existing Disease, Procedure, Complications and Treatment :
                    <br />
                    (झालेला आजार, त्याची प्रक्रिया, गुंतागुंत व त्यावरील प्रतिबंधक उपाय याबाबत माहिती) :
                </label>

                <SignaturePad
                    width={700}
                    height={30}
                />
                <SignaturePad
                    width={700}
                    height={30}
                    design="line"
                />
                <SignaturePad
                    width={700}
                    height={30}
                    design="line"
                />
                <SignaturePad
                    width={700}
                    height={30}
                    design="line"
                />
            </div>

        </div>
    )
}

export default PatientEducation1HeaderDeclaration;