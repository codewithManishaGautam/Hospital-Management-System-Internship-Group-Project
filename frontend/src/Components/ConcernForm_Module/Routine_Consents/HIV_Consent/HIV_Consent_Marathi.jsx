import React from "react";
import "./HIV_Consent_English.css"
import Table_Form from "../Tabel_Form";
import SignaturePad from "../SignaturePad";
function HIV_Consent_English(params) {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h3 className="title">
                एच.आय.व्ही. प्रतिपिंड तपासणीसाठी संमतीपत्र
            </h3>
            <Table_Form />
            <p className="paragraph">
                मी एच.आय.व्ही. टेस्टबद्दलची माहिती वाचली आहे / मला वाचून दाखवलेली आहे. तसेच त्याच्या मर्यादा व शक्यता यांची माहिती मला दिलेली असून मी ही तपासणी करण्यास नकार देऊ शकतो / शकते
                याची मला कल्पना आहे. ही तपासणी करण्यास नकार दिल्यास त्यामुळे माझ्यावरील उपचारामध्ये कोणतीही कमतरता ठेवली जाणार नाही हे मला माहिती आहे.
                जर या तपासणीचा निकाल होकारार्थी आला तर होणाऱ्या परिणामांबाबत माहिती घेण्यासाठी समुपदेशकाचा सल्ला घेण्यास मी तयार आहे. माझ्या तपासणीचा निकाल गोपनीय ठेवला जाईल आणि होकारार्थी निकाल
                कायद्यानुसार आरोग्य विभागाखेरीज इतर कोणत्याही व्यक्तीस सांगितला जाणार नाही.
                रक्त तपासणीसाठी रक्त काढण्याच्या प्रक्रियेबद्दल व त्यामध्ये असणाऱ्या धोक्यांबद्दल मला माहिती देण्यात आलेली आहे.
                या सर्व बाबी समजून घेऊन मी एच.आय.व्ही. टेस्ट करण्यासाठी माझी संमती देत आहे. मला एच.आय.व्ही. / एड्स बद्दल व त्यासाठी कराव्या
                लागणाऱ्या तपासणीविषयी संपूर्ण माहिती देण्यात आलेली आहे.
            </p>

            <p className="paragraph">
                एच.आय.व्ही. / एड्स आजाराशी निगडित प्रसाराचे मार्ग, चाचणीची पद्धत, त्यातील त्रुटी इत्यादी संपूर्ण समजावून सांगण्यात आलेले आहे.
            </p>

            <p className="paragraph">
                ही माहिती समजून घेतल्यानंतर मी खाली सही करणारा / करणारी चाचणीसाठी संमती देत आहे.
            </p>


            <div className="signature-grid">
                <p>
                    रुग्णाचे नाव <SignaturePad width="300px" height="30px" design="line"/>
                </p>
                <p>
                    रुग्णाचे सही <SignaturePad width="150px" height="30px" />
                </p>
            </div>
            <div className="signature-grid">
                <p>
                    डॉक्टरांचे नाव <SignaturePad width="300px" height="30px" design="line"/>
                </p>
                <p>
                    डॉक्टरांचे सही <SignaturePad width="150px" height="30px" />
                </p>
            </div>
            <div className="signature-grid">
                <p>
                    दिनांक <SignaturePad width="150px" height="30px" design="line"/>
                </p>
                <p>
                    वेळ <SignaturePad width="150px" height="30px" design="line"/>
                </p>

            </div>

            <p>
                वरील चाचणीचा परिणाम आम्हाला / मला कळविण्यात आला आहे.
            </p>

            <div className="signature-grid">
                <p>
                    नातेवाईकाचे नाव <SignaturePad width="150px" height="30px" design="line"/>
                </p>
                <p>
                    सही <SignaturePad width="150px" height="30px" />
                </p>

            </div>



        </div>
    )
}

export default HIV_Consent_English;