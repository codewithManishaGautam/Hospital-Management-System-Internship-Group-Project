import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import DeclarationInfo from "./DeclarationInfo";



function TransferForDiagnosticMar() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                निदानात्मक तपासणीसाठी स्थलांतर करण्याबाबत संमतीपत्र
            </h4>

            <Table_Form />
            <div>
                <p className="paragraph">
                    मी असे नमूद करतो / करते की माझ्या सध्याच्या वैद्यकीय स्थितीबद्दलची पूर्ण माहिती मला देण्यात आली असून रोगनिदानासाठी मला 
                    डॉ. <span><SignaturePad width={350} height={30} design="line"/></span> यांच्याकडे  <br />
                    <span><SignaturePad width={400} height={30} design="line"/></span> या कारणाकरिता जावे लागणार आहे.
                    या निदानासाठी मला / माझ्या रुग्णाला तेथे नेण्यासाठी व तेथून आणण्यासाठी असलेले धोके तसेच निदानासाठी न नेल्यास होणाऱ्या 
                    संभाव्य परिणामांची माहिती मला देण्यात आलेली आहे.हे सर्व जाणून घेऊन रुग्णाला निदानासाठी पाठविण्यासाठी व तेथून परत आणण्यासाठी मी संमती देत आहे.
                </p>
                <br /><br />
                <DeclarationInfo 
                name="रुग्णाचे / नातेवाईकाचे नाव"
                relation="रुग्णाशी नाते"
                sign="सही"
                />
            </div>

        </div>

    )
}

export default TransferForDiagnosticMar;