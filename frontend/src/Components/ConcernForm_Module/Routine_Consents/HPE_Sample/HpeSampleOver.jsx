import React from "react";
import SignaturePad from "../SignaturePad";
import Table_Form from "../Tabel_Form";
import "../Minor_Surgical/MinorEnglish.css"

function HpeSampleOver() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                HPE SAMPLE HAND OVER FORM (एच.पी.ई. नमुना सुपूर्दगी फॉर्म)
            </h4>
            <Table_Form/>
            <p className="paragraph">
                आमच्या रुग्णाच्या शस्त्रक्रिये दरम्यान काढलेली गाठ / तुकडा / पू आम्हाला डॉक्टरांनी तपासणीसाठी 
                दिला असून तो आम्हाला प्राप्त झाला आहे.सदर नमुना प्रयोगशाळेत नेऊन त्याची तपासणी करून 
                अहवाल (रिपोर्ट) डॉक्टरांना दाखविणे तसेच त्यानुसार पुढील उपचार करून घेणे ही आमची जबाबदारी असेल.
                त्यामध्ये कसूर झाल्यास आम्ही डॉक्टरांना किंवा हॉस्पिटलला जबाबदार धरणार नाही.जर आम्ही सदर नमुना तपासणी
                न करता फेकून दिला आणि त्यामुळे पुढे आजार वाढला, पुन्हा झाला किंवा शरीरात पसरला तर त्यास आम्ही स्वतः जबाबदार राहू.
            </p>
            <p>
                <SignaturePad width={750} height={300} design="border"/>
            </p>
            <p className="paragraph">
                मला मराठी समजते आणि मी वरील मजकूर पूर्णपणे समजून घेऊन माझ्या सर्व शंकांचे निरसन झाल्यानंतर 
                कोणतीही घाई, भीती किंवा दबाव न घेता स्वखुशीने सही करत आहे.मुझे हिंदी समझती है। ऊपर दिए गए सभी बिंदु मुझे Dr. KAPIL DESHMUKH 
                ने हिंदी में समझाए हैं और वे मुझे मंजूर हैं। मैं किसी भी दबाव, डर या जल्दबाज़ी में नहीं हूँ तथा अपनी स्वयं की इच्छा से हस्ताक्षर कर रहा / रही हूँ।
                I understand english. i have been explained all the above points in english by   Dr.KAPIL DESHMUKH  I am ready to accept all 
                condition given in them. i hereby singing below without any fear pressure or in a hurry
            </p>

            <label >
                रुग्णाचे नाव : <span><SignaturePad width={310} height={40} design="line" /></span>   सही : <span><SignaturePad width={200} height={40} design="border" /></span>
            </label>
            <label >
                नातेवाईकाचे नाव : <span><SignaturePad width={280} height={40} design="line" /></span>   सही : <span><SignaturePad width={200} height={40} design="border" /></span>
            </label>
            <label >
                रुग्णाशी नाते : <span><SignaturePad width={283} height={40} design="line" /></span> 
            </label>
            <br /><br />

            <p className="paragraph">
                मी स्पेसिमेन स्वतः पेशंटला / नातेवाईकास दिला असून तपासणीसंबंधी माहिती समजावून सांगितली आहे.
            </p>
            <br />

            <label >
                परिचारिकेचे नाव : <span><SignaturePad width={283} height={40} design="line" /></span>   सही : <span><SignaturePad width={200} height={40} design="border" /></span>
            </label>
            <label >
                दिनांक व वेळ : <span><SignaturePad width={280} height={40} design="line" /></span>  
            </label>
        </div>
        );
    }

export default HpeSampleOver;
