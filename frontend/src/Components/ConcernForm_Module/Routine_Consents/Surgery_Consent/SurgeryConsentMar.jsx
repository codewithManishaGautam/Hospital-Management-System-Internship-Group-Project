import React from "react";
import SignaturePad from "../SignaturePad";
import Table_Form from "../Tabel_Form";
import "../Minor_Surgical/MinorEnglish.css";

function SurgeryConsentMar() {
  return (
    <div className="consent-form">
      <h2 className="title">श्रद्धा हॉस्पिटल, दौंड</h2>

      <h4 className="title">शस्त्रक्रिया / प्रक्रिया संमतीपत्र</h4>

      <Table_Form />

      <p className="paragraph">
        मी डॉ.
        <SignaturePad width={250} height={30} design="line" />
        यांना माझ्यावर शस्त्रक्रिया / प्रक्रिया करण्यास संमती देत आहे.
      </p>

      <p className="paragraph">
        शस्त्रक्रियेचे नाव :
        <SignaturePad width={300} height={30} design="line" />
      </p>

      <p className="paragraph">
        शस्त्रक्रियेचा उद्देश, फायदे, तोटे, धोके, पर्यायी उपचार व संभाव्य परिणाम
        याबाबत मला समजावून सांगण्यात आले आहे.
      </p>

      <p className="paragraph">
        मला प्रश्न विचारण्याची संधी देण्यात आली असून माझ्या सर्व शंकांचे निरसन
        करण्यात आले आहे.
      </p>

      <p className="paragraph">
        शस्त्रक्रियेदरम्यान उद्भवणाऱ्या संभाव्य गुंतागुंती, रक्तस्त्राव, संसर्ग,
        औषध प्रतिक्रिया, अपंगत्व किंवा मृत्यू याबाबत माहिती देण्यात आली आहे.
      </p>

      <p className="paragraph">
        गरज पडल्यास अतिरिक्त प्रक्रिया करण्यास मी संमती देत आहे.
      </p>

      <p className="paragraph">आवश्यक भूल देण्यास देखील माझी संमती आहे.</p>

      <br />

      <p>
        रुग्णाचे नाव :
        <SignaturePad width={250} height={35} design="line" />
      </p>

      <p>
        सही :
        <SignaturePad width={200} height={35} design="line" />
      </p>

      <p>
        तारीख :
        <SignaturePad width={120} height={35} design="line" />
      </p>

      <p>
        वेळ :
        <SignaturePad width={120} height={35} design="line" />
      </p>

      <br />

      <p>
        साक्षीदार :
        <SignaturePad width={250} height={35} design="line" />
      </p>

      <p>
        डॉक्टर :
        <SignaturePad width={250} height={35} design="line" />
      </p>

      <p>
        माहिती समजावून सांगणारे :
        <SignaturePad width={250} height={35} design="line" />
      </p>
    </div>
  );
}

export default SurgeryConsentMar;
