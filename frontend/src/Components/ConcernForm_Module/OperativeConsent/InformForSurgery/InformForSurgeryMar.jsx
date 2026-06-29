import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import DeclarationInfo from "./DeclarationInfo";
import DeclarationFooter from "./DeclarationFooter";
import InformMoreInfoMar from "./InformMoreInfoMar";
import Stamp from "../../../../assets/stamp.png"





function InformForSurgeryMar() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                शस्त्रक्रियेबाबत संमतीपत्र
            </h4>

            <Table_Form />
            <div>

                <DeclarationInfo
                    relativeInfo="नातेवाईकांची माहिती"
                    relativeName="नातेवाईकाचे नाव"
                    ageGender=" वय / लिंग"
                    relationPatient="रुग्णाशी नाते"
                    address="पत्ता"
                    procedureName="प्रक्रियेचे नाव"
                />
                <br />
                <InformMoreInfoMar/>
                <br />
                <DeclarationFooter
                witnessName="साक्षीदार"
                sign="सही"
                patientName="रुग्णाचे नाव" 
                nameKey1="नाव (मुख्य नातेवाईक १)"
                nameKey2="नाव (मुख्य नातेवाईक २)" 
                surgeonName="शस्त्रक्रिया करणाऱ्या डॉक्टरांचे नाव"
                dateTime="दिनांक व वेळ" 
                stampName="शिक्का"
                Stamp={Stamp}
                />
            </div>

        </div>

    )
}

export default InformForSurgeryMar;