import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import SedationProcedureCommon from "./SedationProcedureCommon";
import PatientDeclaration from "./PatientDeclaration";
import DoctorDeclaration from "./DoctorDeclaration";
import WitnessDeclaration from "./WitnessDeclaration";


function SedationProcedureMar() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                प्रक्रियेदरम्यान भूल / सेडेशन देण्यासाठी संमतीपत्र
            </h4>

            <p className="title">
                (प्रक्रिया सुरू होण्यापूर्वी भूलतज्ज्ञांनी भरावयाचे)
            </p>

            <Table_Form />
            <div>
                <SedationProcedureCommon />
                <br />
                <b>
                    रुग्ण / रुग्णाच्या नातेवाईकांचे संमतीपत्र
                </b>
                <br /><br />
                <p className="paragraph">
                    मी असे नमूद करतो / करते की, डॉक्टरांनी समजावून सांगितलेल्या खालील बाबी मला मान्य आहेत :
                    <ul className="paragraph">
                        <li>
                            मला आवश्यक असणाऱ्या उपचारासाठी भूल देण्याची गरज आहे व त्यासाठी
                            <span><SignaturePad width={290} height={30} design="line" /></span> या भूल तसेच तत्सम औषधाचा वापर करणार आहे.
                        </li>

                        <li>
                            माझी / माझ्या रुग्णाची सद्य वैद्यकीय स्थिती, आवश्यक उपचार व गरज असल्यास अनपेक्षित बाब निदर्शनास आल्यास त्याव्यतिरिक्त करावे लागणारे उपचार याबाबत मला माहिती देण्यात आली आहे.
                        </li>

                        <li>
                            भुलेचे, उपचाराचे, तसेच माझ्या / माझ्या रुग्णाच्या प्रकृतीसंबंधित धोके, तसेच उपचार न केल्यास होणाऱ्या संभाव्य धोक्यांची कल्पना मला दिली आहे.
                        </li>

                        <li>
                            भूल व त्यात उपलब्ध विविध पर्याय व त्यांचे संभाव्य धोके यांची माहिती मला दिलेली आहे.
                        </li>

                        <li>
                            हे उपचार चालू असताना जर अचानक माझ्या / माझ्या रुग्णाच्या जीवाला धोका उद्भवल्यास, रुग्णाचा जीव वाचविण्याचे सर्व प्रयत्न केले जातील.
                        </li>
                    </ul>
                </p>


                <p>
                    मी असे नमद करतो
                    <ul className="paragraph">
                        <li>
                            सदर प्रपत्र वाचून व समजून घेण्यासाठी मला पुरेसा वेळ देण्यात आलेला आहे.
                        </li>

                        <li>
                            माझी / माझ्या रुग्णाची सद्य वैद्यकीय स्थिती, सुचविण्यात आलेली भूल, उपचार, उपलब्ध पर्याय व संभाव्य धोक्यांबद्दल डॉक्टरांना प्रश्न विचारण्याची संधी दिलेली आहे व मी विचारलेल्या प्रश्नांची मला समाधानकारक उत्तरे दिलेली आहेत.
                        </li>

                        <li>
                            वरील मजकूर मला समजेल अशा भाषेत व आवश्यक त्या ठिकाणी रेखाचित्राद्वारे समजावून सांगितला आहे व तो मला संपूर्णतः समजला आहे.
                        </li>

                        <li>
                            सदरच्या संमतीपत्रावर मी पूर्णतः स्वेच्छेने व कुणाच्याही दबावाखाली न येता सही करीत आहे.
                        </li>

                        <li>
                            मी सदर प्रपत्राद्वारे Dr. <span><SignaturePad width={300} height={30} design="line" /></span> यांना माझ्यावरील वरील नमूद उपचारासाठी भूल देण्याची संमती देत आहे.
                        </li>
                    </ul>
                    मी प्रमाणित करतो / करते की, मी या संमतीपत्रातील मजकूर तसेच रुग्ण व डॉक्टर यांच्यामधील झालेला संवाद अचूकपणे समजावून सांगितला असून त्याचा योग्य अर्थ रुग्णाला समजावून दिला आहे.
                </p>
                <br />

                <PatientDeclaration
                    Date="दिनांक"
                    Time="वेळ"
                    patientName="रुग्णाचे / नातेवाईकाचे नाव (रुग्णाशी नाते)"
                    doctorName="दुभाष्याचे नाव"
                    sign="सही"
                />

                <br />

                <DoctorDeclaration />

                <br />

                <WitnessDeclaration
                    witness1="साक्षीदार १"
                    witness2="साक्षीदार २"
                    name="नाव"
                    sign="सही"
                    Date="तारीख"
                    address="पत्ता"
                    phoneNo="मोबाइल क्रमांक"
                />


            </div>
        </div>
    )
}

export default SedationProcedureMar;