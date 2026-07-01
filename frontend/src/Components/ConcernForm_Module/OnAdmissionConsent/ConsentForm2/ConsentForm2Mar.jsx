import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import DeclarationConsentForm2 from "./DeclarationConsentForm2";
import RulesWithCondition from "./RulesWithCondition";
import DeclarationFooter from "./DeclarationFooter";


function ConsentForm2Mar() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                संमती पत्र
            </h4>

            <Table_Form />
            <div>
                <b className="title" style={{ display: "block" }}>संमती पत्र</b>
                <p className="paragraph">
                    मी <span><SignaturePad width={300} height={30} design="line"/></span>, राहणार <span><SignaturePad width={300} height={30} design="line"/></span>, 
                    मला स्वतःला / माझ्या नातेवाईकाला <strong>SHRADDHA HOSPITAL AND ICU</strong> येथील डॉक्टरांकडून उपचार घेण्यास संमती देत आहे.
                    मी येथील डॉक्टर, नर्सेस व तंत्रज्ञ (Technicians) यांना माझ्यावर / माझ्या नातेवाईकावर योग्य तो उपचार करण्याची परवानगी देत आहे. 
                    उपचारासाठी आवश्यक त्या तपासण्या तसेच आवश्यक असल्यास शस्त्रक्रिया करण्यास माझी संमती आहे.
                    मी / माझ्या पेशंटबाबतची वैद्यकीय कागदपत्रे आवश्यकतेनुसार संबंधित व्यक्तीस दाखविण्यास परवानगी देत आहे.
                    मला हॉस्पिटलच्या नियमांची जाणीव असून त्याप्रमाणे वागण्याची जबाबदारी मी स्वीकारतो / स्वीकारते. रुग्णाबरोबर असलेले पैसे, दागिने व इतर मौल्यवान
                    वस्तू मी माझ्या ताब्यात घेतल्या असून त्याबाबत हॉस्पिटलची कोणतीही जबाबदारी राहणार नाही. अनपेक्षित प्रसंगी किंवा ज्या डॉक्टरांकडून उपचार सुरू 
                    आहेत ते अपरिहार्य कारणामुळे उपलब्ध नसल्यास, त्यांच्या ऐवजी योग्य त्या दुसऱ्या डॉक्टरांकडून उपचार करण्यास हॉस्पिटल व्यवस्थापनास मी परवानगी देत आहे.
                    रुग्ण दाखल झाल्यानंतर हॉस्पिटल व्यवस्थापनाने सांगितल्याप्रमाणे अनामत रक्कम तात्काळ भरण्यास मी तयार आहे. हॉस्पिटलची फी व इतर शुल्क याबाबत मला
                    माहिती देण्यात आली असून त्यानुसार पैसे भरण्याची जबाबदारी मी स्वीकारतो / स्वीकारते. काही अनपेक्षित व मानवी प्रयत्नांच्या पलीकडील घटना रुग्णाच्या बाबतीत घडू शकतात, 
                    याची मला पूर्ण जाणीव करून देण्यात आली आहे. त्याबाबत मी हॉस्पिटल, डॉक्टर व स्टाफ यांना जबाबदार धरणार नाही.
                    वरील सर्व मजकूर मी काळजीपूर्वक वाचला असून तो मला पूर्णपणे समजला आहे. त्यानंतर मी स्वखुशीने सही केली आहे.
                </p>
                <DeclarationConsentForm2/>
                <hr style={{
                        width: "100%",
                        border: "0",
                        borderTop: "3px solid black"
                    }} />
                <b className="title" style={{ display: "block" }}>रुग्ण अत्यवस्थ असल्याची माहिती</b>
                <p className="paragraph">
                    मला, माझा नातेवाईक <span><SignaturePad width={300} height={30} design="line"/></span>
                    यांची तब्येत अत्यवस्थ असल्याची पूर्ण जाणीव आहे. यासंबंधीची संपूर्ण माहिती डॉक्टरांनी मला / माझ्या नातेवाईकाला समजेल 
                    अशा भाषेत समजावून सांगितली आहे. तसेच पुढील आवश्यक उपचार करण्यास मी डॉक्टरांना संमती देत आहे.
                </p>
                <DeclarationConsentForm2/>
                <hr style={{
                        width: "100%",
                        border: "0",
                        borderTop: "3px solid black"
                    }} />
                <b className="title" style={{ display: "block" }}>डॉक्टरांच्या सल्ल्याविरुद्ध रुग्णास नेण्याची संमती</b>
                <p className="paragraph">
                    मला, माझा नातेवाईक <span><SignaturePad width={300} height={30} design="line"/></span>
                    यांना डॉक्टरांच्या सल्ल्याविरुद्ध माझ्या स्वतःच्या जबाबदारीवर हॉस्पिटलमधून घेऊन जात आहे. रुग्णाची तब्येत व सध्याची परिस्थिती 
                    याबाबतची संपूर्ण माहिती डॉक्टरांनी मला / माझ्या नातेवाईकाला समजेल अशा भाषेत समजावून सांगितली आहे. तरीही डॉक्टरांच्या 
                    सल्ल्याविरुद्ध मी रुग्णास माझ्या स्वतःच्या जबाबदारीवर हॉस्पिटलमधून घेऊन जात आहे. याबाबत मी हॉस्पिटल व्यवस्थापन, 
                    डॉक्टर व कर्मचारी यांना कोणत्याही प्रकारच्या जबाबदारीतून मुक्त करीत आहे.
                </p>
                <DeclarationConsentForm2/>
                <hr style={{
                        width: "100%",
                        border: "0",
                        borderTop: "3px solid black"
                    }} />
                
                <b className="title" style={{ display: "block" }}>- DISCHARGE INFORMATION -</b>
                <p className="paragraph">
                    मला / आमच्या नातेवाईकास रुग्णालयातून डिस्चार्ज मिळाला आहे. रुग्णालय सोडताना आम्हाला रुग्णासंबंधी सर्व कागदपत्रे 
                    (उदा. डिस्चार्ज कार्ड, सर्व तपासण्यांची मूळ कागदपत्रे, पुढील उपचाराबाबतची माहिती किंवा लागू असल्यास मृत्यूचा दाखला / पावती इ.) 
                    ताब्यात मिळालेली आहेत. त्याबाबत आमची कोणतीही तक्रार नाही.
                </p>
                <DeclarationConsentForm2/>
                <br />
                <RulesWithCondition/>
                <br />
                <DeclarationFooter/>
                
            </div>

        </div>

    )
}

export default ConsentForm2Mar;