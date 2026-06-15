import React from "react";
import SignaturePad from "../SignaturePad";
import Table_Form from "../Tabel_Form";
import "../Minor_Surgical/MinorEnglish.css"

function MajorMarathi() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h3 className="title">
                प्रमुख शस्त्रक्रियेसाठी संमतीपत्र
            </h3>
            <p className="title">
                (कोणतीही प्रक्रिया / शस्त्रक्रिया करण्यापूर्वी शल्यचिकित्सकाने भरावयाचे)
            </p>
            <Table_Form />
            <b>
                Diagnosis
            </b>
            <br />
            <SignaturePad width={700} height={40} design="border" />
            <b>
                Procedure Name
            </b>
            <br />
            <SignaturePad width={700} height={40} design="border" />
            <b>
                Illustration
            </b>
            <br />
            <SignaturePad width={700} height={250} design="border" />

            <br />
            <p className="paragraph">
                <b>Surgical procedure</b> is diagnosis or treatment of pathological conditions such as injuries,
                disorders/ deformity, and disease of the body by incision or manipulation, especially
                with instruments by medical specialty (Surgeons). Purpose is to help in improve bodily
                function or appearance. Surgical procedure carries risk of complications i.e. common and surgery specific.

            </p>
            <br />

            <b>
                Immediate:
            </b>
            <ul className="paragraph">
                <li>
                    <b>Hemorrhage :</b> Excessive blood loss either during Surgery or post-surgery (due to increase in blood pressure)
                    which require replacement of blood loss or may require re-exploration of the wound.
                </li>
                <li>
                    <b>Basal atelectasis :</b>  minor lung collapse.
                </li>
                <li>
                    <b>Shock :</b>  blood loss, acute myocardial infarction, pulmonary embolism or septicemia.
                </li>
                <li>
                    <b>Low urine output :</b>  inadequate fluid replacement intra-operatively and postoperatively.
                </li>
            </ul>

            <br />


            <p><b>Early:</b></p>

            <table style={{ width: "100%" }}>

                <tbody>

                    <tr>

                        <td
                            style={{
                                verticalAlign: "top",
                                width: "50%"
                            }}
                        >

                            <ul>

                                <li>
                                    Acute confusion: exclude dehydration and sepsis.
                                </li>

                                <li>
                                    Nausea and vomiting: analgesia or anesthesia related;
                                    paralytic ileus.
                                </li>

                                <li>
                                    Fever
                                </li>

                                <li>
                                    Secondary hemorrhage: often as a result of infection.
                                </li>

                                <li>
                                    Pneumonia.
                                </li>

                            </ul>

                        </td>

                        <td
                            style={{
                                verticalAlign: "top",
                                width: "50%"
                            }}
                        >

                            <ul>

                                <li>
                                    Wound or anastomosis dehiscence.
                                </li>

                                <li>
                                    Deep Vein thrombosis (DVT)
                                </li>

                                <li>
                                    Acute urinary retention.
                                </li>

                                <li>
                                    Urinary tract infection (UTI).
                                </li>

                                <li>
                                    Postoperative wound infection.
                                </li>

                                <li>
                                    Bowel obstruction due to fibrinous adhesions.
                                </li>

                                <li>
                                    Paralytic Ileus.
                                </li>

                            </ul>

                        </td>

                    </tr>

                </tbody>

            </table>


            <p><b>Late:</b></p>

            <table style={{ width: "100%" }}>

                <tbody>

                    <tr>

                        <td
                            style={{
                                verticalAlign: "top",
                                width: "50%"
                            }}
                        >

                            <ul>

                                <li>
                                    Bowel obstruction due to fibrous adhesions.
                                </li>

                                <li>
                                    Incisional hernia
                                </li>

                                <li>
                                    Problems with wound healing
                                </li>

                            </ul>

                        </td>

                        <td
                            style={{
                                verticalAlign: "top",
                                width: "50%"
                            }}
                        >

                            <ul>

                                <li>
                                    Persistent sinus
                                </li>

                                <li>
                                    anastomotic leak
                                </li>

                                <li>
                                    Recurrence of reason for surgery – e.g. Malignancy
                                </li>

                            </ul>

                        </td>

                    </tr>

                </tbody>

            </table>



            <b>
                रुग्ण / रुग्णाच्या नातेवाईक यांचे संमतीपत्र
            </b>
            <p>
                डॉक्टरांनी मला समजावून सांगितलेल्या खालील बाबी मला मान्य आहेत.
            </p>

            <ul>

                <li>
                    माझी / माझ्या रुग्णाची सद्य वैद्यकीय स्थिती, रोगाचे स्वरूप,
                    रोगाचे भावी परिणामस्वरूप व प्रतिसाद याबद्दल मला माहिती देण्यात आली आहे.
                </li>

                <li>
                    सुचविलेल्या शस्त्रक्रियेचे स्वरूप, गरज / हेतु तसेच
                    अनपेक्षित बाब निदर्शनास आल्यास त्याव्यतिरिक्त करावे लागणारे उपचार
                    याबद्दल मला समजावून सांगण्यात आले आहे.
                </li>

                <li>
                    काही अपरिहार्य परिस्थितीमुळे शस्त्रक्रिया मध्येच रद्द करावी लागू शकते.
                </li>

                <li>
                    शस्त्रक्रिये दरम्यान अकस्मात परिस्थिती निर्माण झाल्यास,
                    शस्त्रक्रियेस अधिक वेळ लागू शकतो किंवा रुग्णाचा जीव वाचविण्यासाठी
                    अथवा योग्य उपचारासाठी पूर्वनियोजित शस्त्रक्रियेव्यतिरिक्त
                    दुसरी / नवीन शस्त्रक्रिया करावी लागू शकते.
                </li>

                <li>
                    शस्त्रक्रियेपूर्वी पुरेशा मूल्यमापनानंतर आणि सर्वोत्तम वैद्यकीय
                    तत्त्वांचा वापर करून निदान केले असले तरी शस्त्रक्रिये दरम्यान
                    किंवा शस्त्रक्रियेनंतर दुसऱ्या / अन्य रोगाचे निदान होऊ शकते.
                </li>

                <li>
                    शस्त्रक्रिये दरम्यान रोग शस्त्रक्रियेने बरा न होणारा किंवा
                    प्रगत अवस्थेतील असल्याचे समजू शकते.
                </li>

                <li>
                    भविष्यात हा रोग पुन्हा उद्भवण्याची किंवा मूळ स्थानातून
                    शरीराच्या दुसऱ्या भागात / अवयवात पसरण्याची शक्यता असू शकते.
                </li>

                <li>
                    ही शस्त्रक्रिया साधारण / स्थानिक / विभागीय भूल स्वतंत्र
                    किंवा संयुक्तपणे देऊन करावी लागू शकते.
                    भूलेसाठी स्वतंत्र संमतीपत्र घेण्यात आले आहे.
                </li>

                <li>
                    शस्त्रक्रियेचे परिणाम व उपद्रव याबद्दल मला / आम्हाला कल्पना
                    देण्यात आली आहे आणि आवश्यक असल्यास उद्भवलेल्या समस्यांच्या
                    निरसनासाठी पुन्हा शस्त्रक्रिया करावी लागू शकते.
                </li>

                <li>
                    उपचाराचे, भूलेचे तसेच माझ्या / माझ्या रुग्णाच्या प्रकृतीसंबंधित
                    धोके तसेच उपचार न केल्यास होणाऱ्या संभाव्य धोक्यांची कल्पना
                    मला देण्यात आली आहे.
                </li>

                <li>
                    संबंधित उपचारातील उपलब्ध विविध पर्याय व त्यांचे संभाव्य धोके
                    याबद्दलची माहिती मला देण्यात आली आहे.
                </li>

                <li>
                    शस्त्रक्रियेनंतर रुग्णाला औषध देण्यासाठी मोठ्या रक्तवाहिन्यांचा वापर,
                    कृत्रिम श्वासोच्छ्वास तसेच दीर्घकाळ अतिदक्षता विभागात ठेवण्याची
                    आवश्यकता भासू शकते.
                </li>

                <li>
                    शस्त्रक्रिया करताना काढलेले अवयव, पेशी किंवा इतर नमुने यांचा
                    पुढील तपासणीसाठी तसेच निदान व उपचारासाठी उपयोग करण्यात येईल.
                    हे नमुने योग्य रीतीने साठवले जातील, रुग्णाला परत केले जातील
                    किंवा योग्य पद्धतीने नष्ट केले जातील.
                </li>

                <li>
                    उपचारादरम्यान अचानक माझ्या / माझ्या रुग्णाच्या जीवाला धोका
                    निर्माण झाल्यास रुग्णाचा जीव वाचविण्याचे सर्व प्रयत्न
                    करण्यात येतील.
                </li>

                <li>
                    वैद्यकीय व सहाय्यक वैद्यकीय कर्मचारी रुग्णाच्या हितासाठी
                    त्यांना असलेल्या ज्ञान, कौशल्य व अनुभवाचा योग्य प्रकारे
                    वापर करतात.
                </li>

            </ul><br />

            <b>मी नमूद करतो / करते की</b>


            <ul>

                <li>
                    सदर प्रपत्र वाचून व समजून घेण्यासाठी मला पुरेसा वेळ देण्यात आलेला आहे.
                </li>

                <li>
                    माझी / माझ्या रुग्णाची सद्य वैद्यकीय स्थिती, सुचविण्यात आलेली
                    शस्त्रक्रिया, उपलब्ध विविध पर्याय व संभाव्य धोक्यांबद्दल
                    डॉक्टरांना प्रश्न विचारण्याची संधी मला देण्यात आली आहे.
                    माझ्या सर्व प्रश्नांची समाधानकारक उत्तरे देण्यात आली आहेत.
                </li>

                <li>
                    वरील मजकूर मला समजेल अशा भाषेत तसेच आवश्यक त्या ठिकाणी
                    रेखाचित्राद्वारे समजावून सांगण्यात आला असून तो मला पूर्णपणे समजला आहे.
                </li>

                <li>
                    मला व माझ्या नातेवाईकांना सांगितलेले उपचार व शस्त्रक्रियेचे
                    संभाव्य सौम्य / मध्यम / तीव्र प्रकारचे जीवितास धोके
                    (मृत्यूसह) मला मान्य आहेत.
                </li>

                <li>
                    तज्ज्ञ चिकित्सकांनी योग्य मार्गदर्शक तत्त्वांनुसार
                    शस्त्रक्रिया व उपचार केले तरी त्याच्या परिणामांची
                    हमी देता येणार नाही याची मला कल्पना देण्यात आली आहे.
                </li>

                <li>
                    सदर संमतीपत्रावर मी स्वेच्छेने व कोणत्याही दबावाशिवाय
                    सही करत आहे.
                </li>

                <li>
                    वरील नमूद शस्त्रक्रिये दरम्यान किंवा नंतर झालेल्या
                    संभाव्य दुष्परिणामांसाठी मी रुग्णालय, वैद्यकीय अधिकारी
                    किंवा सहाय्यक वैद्यकीय कर्मचाऱ्यांना जबाबदार धरणार नाही.
                </li>

                <li>
                    मी सदर प्रपत्राद्वारे <span><SignaturePad width={250} height={35} design="line" /></span> व त्यांच्या
                    इतर सहाय्यक वैद्यांना माझ्यावर / माझ्या रुग्णावर
                    वर नमूद शस्त्रक्रिया योग्य भुलीमध्ये करण्यासाठी
                    तसेच आवश्यकतेनुसार शस्त्रक्रिये दरम्यान रक्त
                    किंवा रक्तघटक देण्यास स्वेच्छेने संमती देत आहे.
                </li>

            </ul>
            <br />

            <div
                style={{
                    display: "flex",
                    gap: "40px",
                    marginBottom: "15px",
                }}
            >
                <b>उच्च जोखीम संमतीपत्र</b>

                <label>
                    लागू
                    <input
                        type="checkbox"
                        style={{ marginLeft: "8px" }}
                    />
                </label>

                <label>
                    लागू नाही
                    <input
                        type="checkbox"
                        style={{ marginLeft: "8px" }}
                    />
                </label>

            </div>

            <ul>

                <li>
                    माझी / माझ्या रुग्णाची सद्य वैद्यकीय स्थिती, विकृती
                    तसेच पूर्वीचे आजार जसे मधुमेह, उच्च रक्तदाब,
                    हृदयविकार, दमा किंवा इतर
                    <span><SignaturePad width={700} height={35} design="line" /></span>
                    <span><SignaturePad width={300} height={35} design="line" /></span>,
                    यांचा एकत्रित विचार करता मला / माझ्या रुग्णाला
                    भूल व शस्त्रक्रिये दरम्यान तसेच शस्त्रक्रियेनंतर
                    अधिक धोका संभवतो याची मला / आम्हाला कल्पना
                    देण्यात आलेली आहे.
                </li>

                <li>
                    पूर्वीपासून असलेल्या आजारांमुळे भूल व शस्त्रक्रियेसंबंधित
                    धोके तसेच संभाव्य उपद्रव वाढू शकतात याची मला / आम्हाला
                    माहिती देण्यात आलेली आहे.
                </li>

                <li>
                    सदर संमतीपत्रावर वर नमूद शस्त्रक्रियेसाठी
                    मी स्वेच्छेने सही करत आहे.
                </li>

            </ul>

            <p className="paragraph">
                I confirm that I have accurately interpreted the contents of this form and the related
                conversations between the patient and the doctor.
            </p>

            <label>
                Proposed Date of Surgery : <span><SignaturePad width={150} height={30} design="line" /></span>
            </label>
            <br />

            <label>
                Surgery / Procedure Planned
            </label>
            <br />
            <label>
                Elective Surgery
                <input
                    type="checkbox"
                    style={{ marginLeft: "8px", marginRight: "18px" }}
                />
            </label>

            <label>
                Emergency Surgery :
                <input
                    type="checkbox"
                    style={{ marginLeft: "8px", marginRight: "18px" }}
                />
            </label>
            <br /><br />

            <b>Individual Risks: </b><br /><br />
            <label>1) <span><SignaturePad width={700} height={30} design="line" /></span> </label>
            <label>2) <span><SignaturePad width={700} height={30} design="line" /></span> </label>
            <label>3) <span><SignaturePad width={700} height={30} design="line" /></span> </label>

            <br /><br />
            <label>दिनांक : <span><SignaturePad width={200} height={30} design="none" /></span></label>

            <label >वेळ : <span><SignaturePad width={200} height={30} design="none" /></span></label>
            <br /><br />

            <label >रुग्णाचे / नातेवाईकाचे नाव (रुग्णाशी नाते) : <span><SignaturePad width={300} height={30} design="line" /></span></label>
            <label >सही : <span><SignaturePad width={100} height={30} design="line" /></span></label>
            <label >रुग्णाचे / नातेवाईकाचे नाव (रुग्णाशी नाते) : <span><SignaturePad width={300} height={30} design="line" /></span></label>
            <label >सही : <span><SignaturePad width={100} height={30} design="line" /></span></label>
            <label >परिचारिकेचे नाव  : <span><SignaturePad width={430} height={30} design="line" /></span></label>
            <label >सही : <span><SignaturePad width={100} height={30} design="line" /></span></label>
            <label >दुभाष्याचे नाव : <span><SignaturePad width={445} height={30} design="line" /></span></label>
            <label >सही : <span><SignaturePad width={100} height={30} design="line" /></span></label>
            <label >शल्यचिकित्सकाचे नाव : <span><SignaturePad width={400} height={30} design="line" /></span></label>
            <label >सही : <span><SignaturePad width={100} height={30} design="line" /></span></label>
            <br /><br />
            <label style={{ display: "flex", justifyContent: "end" }}>शिक्का : <span><SignaturePad width={100} height={40} design="none" /></span></label>

        </div>
    );
}

export default MajorMarathi;