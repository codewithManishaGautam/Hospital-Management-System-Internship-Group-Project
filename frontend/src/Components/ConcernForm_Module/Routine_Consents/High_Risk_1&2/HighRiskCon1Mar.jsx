import React from "react";
import SignaturePad from "../SignaturePad";
import Table_Form from "../Tabel_Form";
import "../Minor_Surgical/MinorEnglish.css"

function HighRiskCon1Mar() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                अती जोखमीचे संमतीपत्र
            </h4>
            <Table_Form />
            <label >Diagnosis : <span><SignaturePad width={700} height={40} design="border" /></span></label><br /><br />
            <b>
                डॉक्टरांनी मला समजावून सांगितलेल्या खालील बाबी मला मान्य आहेत :
            </b>
            <ul className="paragraph">

                <li>
                    माझी / माझ्या रुग्णाची सद्य वैद्यकीय स्थिती, आजाराचे स्वरूप,
                    आवश्यक उपचार, उपचारांचे परिणाम तसेच संभाव्य धोके याबाबत
                    मला माहिती देण्यात आलेली आहे.
                </li>

                <li>
                    माझी / माझ्या रुग्णाची सद्य वैद्यकीय स्थिती, आजाराचे स्वरूप
                    तसेच पूर्वीपासून असलेले आजार जसे मधुमेह, उच्च रक्तदाब,
                    दमा, हृदयविकार,
                    ________________________________________________
                    यांमुळे रुग्णाची प्रकृती नाजूक असून संभाव्य जोखीम अधिक आहे,
                    याची मला कल्पना देण्यात आली आहे.
                </li>

                <li>
                    मला / माझ्या रुग्णाला अत्यावश्यक उपचारांची गरज भासू शकते.
                    तसेच अतिदक्षता विभागात (ICU) ठेवण्याची आवश्यकता निर्माण होऊ शकते
                    आणि कृत्रिम श्वासोच्छ्वास यंत्राची आवश्यकता लागू शकते.
                </li>

                <li>
                    त्याचप्रमाणे इतर गंभीर किंवा किरकोळ गुंतागुंत जसे
                    मूत्रपिंड निकामी होणे (Renal Failure),
                    हृदय निकामी होणे (Heart Failure),
                    हृदयक्रिया बंद पडणे (Cardiac Arrest),
                    मूत्रमार्ग संसर्ग (Urinary Tract Infection),
                    डीप वेन थ्रोम्बोसिस (Deep Vein Thrombosis),
                    मल्टी ऑर्गन फेल्युअर (Multi Organ Failure)
                    इत्यादी उपद्रव उद्भवू शकतात.
                </li>

            </ul>
            <b>
                तसेच मी नमूद करतो / करते की
            </b>
            <ul className="paragraph">

                <li>
                    सदर प्रपत्र वाचून व समजून घेण्यासाठी मला पुरेसा वेळ देण्यात आलेला आहे.
                </li>

                <li>
                    माझी / माझ्या रुग्णाची सद्य वैद्यकीय स्थिती तसेच सुचविण्यात आलेले
                    उपचार न घेतल्यास होणारे संभाव्य परिणाम व धोके याबाबत डॉक्टरांना
                    प्रश्न विचारण्याची संधी मला देण्यात आली आहे. माझ्या सर्व प्रश्नांची
                    संपूर्णतः समाधानकारक उत्तरे देण्यात आली आहेत.
                </li>

                <li>
                    पूर्णतः काळजीपूर्वक, कौशल्यपूर्ण व व्यावसायिक पद्धतीने उपचार
                    केले असले तरी रुग्णाच्या प्रकृतीत सुधारणा होईल किंवा अपेक्षित
                    परिणाम मिळतील याची हमी देता येणार नाही.
                </li>

                <li>
                    उपचारांमुळे उद्भवणारे संभाव्य परिणाम, धोके, गुंतागुंत किंवा इजा
                    यांसाठी आम्ही रुग्णालयातील डॉक्टर, कर्मचारीवृंद किंवा व्यवस्थापन
                    यांना जबाबदार धरणार नाही.
                </li>

                <li>
                    वरील सर्व मजकूर मला समजेल अशा भाषेत समजावून सांगण्यात आला आहे
                    आणि तो मला पूर्णपणे समजला आहे.
                </li>

                <li>
                    सदर संमतीपत्रावर मी स्वेच्छेने व कोणत्याही दबावाखाली न येता
                    सही करत आहे.
                </li>

                <li>
                    मला व माझ्या नातेवाईकांना सांगितलेले उपचार व शस्त्रक्रियेचे
                    संभाव्य सौम्य, मध्यम किंवा तीव्र प्रकारचे जीवितास धोके
                    (मृत्यूसह) मला मान्य आहेत.
                </li>

                <li>
                    तज्ज्ञ चिकित्सकांनी योग्य मार्गदर्शक तत्त्वांनुसार उपचार केले
                    तरी त्याच्या परिणामांची हमी देता येणार नाही याची मला जाणीव आहे.
                </li>

            </ul>
            <p>
                I confirm that I have accurately interpreted the contents of
                this form and the related conversations between the patient and the doctor.
            </p>

            <label >
                रुग्णाचे / नातेवाईकाचे नाव (रुग्णाशी नाते) : <span><SignaturePad width={250} height={30} design="line" /></span> सही : <span><SignaturePad width={140} height={40} design="border" /></span>
            </label>
            <br />
            <label >
                दुभाष्याचे नाव : <span><SignaturePad width={395} height={30} design="line" /></span> सही : <span><SignaturePad width={140} height={40} design="border" /></span>
            </label>
            <br />

            <label >
                डॉक्टरांचे नाव : <span><SignaturePad width={395} height={30} design="line" /></span> सही : <span><SignaturePad width={140} height={40} design="border" /></span>
            </label>
            <br />

            <label >
                दिनांक : <span><SignaturePad width={200} height={30} design="line" /></span><br />

                वेळ : <span style={{marginLeft:"20px"}}><SignaturePad width={200} height={40} design="border" /></span>
            </label>
        </div>
    );
}

export default HighRiskCon1Mar;
