import React from "react";
import Table_Form from "../Tabel_Form";
import SignaturePad from "../SignaturePad";
import "../Minor_Surgical/MinorEnglish.css";
import ThrombolysisDeclaration from "./ThrombolysisDeclaration";

function ThrombolysisMar() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                रक्तातील गुठळी विरघळविण्याच्या उपचारासाठी संमतीपत्र
                (Consent for Thrombolysis)
            </h4>

            <Table_Form />

            <div>
                <p className="paragraph">
                    आमचे रुग्ण <span><SignaturePad width={310} height={30} design="line" /></span> यांना हृदयविकाराचा तीव्र झटका (Heart Attack) आला असून त्यांच्यावर 
                    उपचारासाठी  <span><SignaturePad width={280} height={30} design="line" /></span> हे औषध / इंजेक्शन देणे आवश्यक आहे.
                    हे औषध / इंजेक्शन देताना किंवा दिल्यानंतर रुग्णास काही कमी-जास्त झाल्यास, गुंतागुंत निर्माण झाल्यास अथवा जीवितास धोका निर्माण झाल्यास याबाबत आम्हाला पूर्ण कल्पना देण्यात आली आहे.
                    उपचाराचे फायदे, संभाव्य धोके व दुष्परिणाम यांची माहिती आम्हाला समजावून सांगण्यात आली असून आम्ही स्वखुशीने या उपचारासाठी संमती देत आहोत.
                    उपचारादरम्यान किंवा उपचारानंतर कोणतीही अनपेक्षित गुंतागुंत, दुष्परिणाम अथवा मृत्यू झाल्यास त्याबाबत आम्ही रुग्णालयातील डॉक्टर, कर्मचारी किंवा रुग्णालय प्रशासन यांच्याविरुद्ध कोणतीही 
                    तक्रार करणार नाही. आम्ही या उपचारासाठी आमची पूर्ण संमती देत आहोत.
                </p>

            </div>
            <ThrombolysisDeclaration
                    doctorSign="डॉक्टरांची सही :"
                    doctorName="डॉक्टरांचे नाव :"
                    relativeSign="नातेवाईकाची सही :"
                    relativeName="नातेवाईकाचे नाव :"
                    patientRelation="रुग्णाशी नाते :"
                />



        </div>

    )
}

export default ThrombolysisMar;