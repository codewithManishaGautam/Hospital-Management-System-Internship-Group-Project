import React from "react";
import SignaturePad from "../SignaturePad";
import Table_Form from "../Tabel_Form";
import "../Minor_Surgical/MinorEnglish.css";
import "./Declaration.css";
import Stamp from "../../../../assets/stamp.png";
import DeclarationFooter from "./DeclarationFooter";

function ICUConsentEng() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                अतिदक्षता विभाग (ICU) प्रवेशासाठी संमतीपत्र
            </h4>

            <Table_Form />
            <p className="paragraph">
                मी <span><SignaturePad width={650} height={30} design="line" /></span><br />रुग्णाचे श्री./सौ.<span><SignaturePad width={300} height={30} design="line" /></span>  यांचा नातेवाईक असून,
                मला समजेल अशा सोप्या भाषेत रुग्णास अतिदक्षता विभागात (ICU) दाखल करण्याचा उद्देश समजावून सांगण्यात आला आहे. ती माहिती पुढीलप्रमाणे आहे :
                <br />
                <span><SignaturePad width={750} height={30} design="line" /></span>
                <span><SignaturePad width={750} height={30} design="line" /></span>
                <span><SignaturePad width={750} height={30} design="line" /></span>
            </p>



            <p className="paragraph">
                याव्यतिरिक्त, मला सदर परिस्थितीत उद्भवणाऱ्या संभाव्य जोखीम, धोके
                व गुंतागुंतींबाबत सविस्तर माहिती देण्यात आली आहे. <br />
                <span><SignaturePad width={750} height={30} design="line" /></span>
                <span><SignaturePad width={750} height={30} design="line" /></span>
                <span><SignaturePad width={750} height={30} design="line" /></span>
            </p>

            <p className="paragraph">
                तरी मी माझ्या रुग्णाच्या अतिदक्षता विभागातील (ICU) उपचारांसाठी स्वेच्छेने संमती देत आहे.
            </p>





        <DeclarationFooter
            dateLabel="दिनांक :"
            timeLabel="वेळ :"
            patientNameLabel="रुग्णाचे नाव :"
            patientSignLabel="सही :"
            relativeTitle="नातेवाईक"
            relativeName="नाव"
            relativeSign="सही"
            relationLabel="रुग्णाशी नाते :"
            doctorNameLabel="डॉक्टरांचे नाव :"
            doctorSignLabel="डॉक्टरांची सही :"
            stampLabel="शिक्का :"
            Stamp={Stamp}
        />



        </div>
    );
}

export default ICUConsentEng;
