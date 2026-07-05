import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import PatientDeclaration from "./PatientDeclaration";





function MedicalAdviceMar() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                वैद्यकीय सल्ल्याविरुद्ध रुग्णालयातून रजा घेण्याची संमती
            </h4>
            <Table_Form />
            <div>

                <label>
                    निदान :-
                </label>
                <SignaturePad width={720} height={30} design="line" />
                <br />

                <p className="paragraph">
                    <strong>
                        डॉक्टरांनी मला समजावून सांगितलेल्या खालील बाबी मला मान्य आहेत.
                    </strong>
                    <br /><br />
                    <ul className="paragraph">
                        <li>
                            माझी / माझ्या रुग्णाची सध्याची वैद्यकीय स्थिती, आजाराचे स्वरूप आणि आवश्यक उपचार.
                        </li>

                        <li>
                            उपचार न घेता / पूर्ण न करता रुग्णालयातून जाण्याचे सर्व संभाव्य परिणाम व धोके.
                        </li>
                    </ul>
                </p>

                <p className="paragraph">
                    <strong>
                        मी नमद करतो / करते की
                    </strong>
                    <br /><br />
                    <ul className="paragraph">
                        <li>
                            सदर प्रपत्र वाचन व समजून घेण्यासाठी मला पुरेसा वेळ देण्यात आलेला आहे.
                        </li>

                        <li>
                            माझी / माझ्या रुग्णाची सध्याची वैद्यकीय स्थिती व सुचविण्यात आलेले उपचार न घेता होणारे संभाव्य परिणाम व धोके याबाबत डॉक्टरांना प्रश्न विचारण्याची संधी मला देण्यात आली आहे. प्रश्नांची संपूर्णतः समाधानकारक उत्तरे देण्यात आली आहेत.
                        </li>

                        <li>
                            उपचार न घेता जाण्याचे संबंधित परिणाम व धोके मला समजलेले आहेत. तरी मी / माझ्या रुग्णास उपचार न घेता रुग्णालयातून (घेऊन) जात आहे.
                        </li>

                        <li>
                            यातून जीवितास उद्भवणारे संबंधित परिणाम, धोके व इजा इत्यादींसाठी आम्ही रुग्णालयातील डॉक्टर, कर्मचारीवृंद व व्यवस्थापन जबाबदार धरणार नाही.
                        </li>

                        <li>
                            वरील मजकूर मला समजेल अशा भाषेत समजावून सांगितला आहे व तो मला संपूर्णतः समजलेला आहे.
                        </li>

                        <li>
                            सदरच्या संमतीपत्रावर मी स्वेच्छेने व कुणाच्याही दबावाखाली न येता सही करत आहे.
                        </li>
                    </ul>
                </p>

                <p className="paragraph">
                    मी पुष्टी करतो की मी या फॉर्मची सामग्री आणि रुग्ण व डॉक्टरांमधील संबंधित संभाषणे अचूकपणे स्पष्ट केली आहेत.
                </p>

                <PatientDeclaration
                    Date="दिनांक"
                    Time="वेळ"
                    patientName="रुग्णाचे / नातेवाईकाचे नाव (रुग्णाशी नाते)"
                    doctorName="दुभाष्याचे नाव"
                    specialDoctor="डॉक्टरांचे नाव"
                    sign="सही"
                />






            </div>
        </div>
    )
}

export default MedicalAdviceMar;