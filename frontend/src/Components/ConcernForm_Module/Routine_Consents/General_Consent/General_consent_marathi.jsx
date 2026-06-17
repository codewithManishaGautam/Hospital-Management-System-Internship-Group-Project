import React from "react"
import "./Consent_Marathi.css";
import SignaturePad from "../SignaturePad";
import Table_Form from "../Tabel_Form"; 
import SignatureCanvas from "react-signature-canvas";
function General_consent_marathi() {
    return (

        <div className="consent-form">

            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h3 className="title">
                रुग्ण भरती तसेच IV / IM / SC इंजेक्शनसाठी सर्वसाधारण संमतीपत्र
            </h3>

            <Table_Form/>

            <div className="marathi-text">

                <p className="paragraph">
                    मी माझ्या / नातेवाईकाच्या आजारपणाच्या उपचारासाठी येथे भरती होऊन उपचार घेण्यास स्वखुशीने तयार आहे. मी माझ्या / नातेवाईकाच्या वैद्यकीय तपासणी,
                    बायोप्सी, इंजेक्शन, सलाईन इत्यादी उपस्थित डॉक्टर सांगतील त्याप्रमाणे करून घेण्यास तयार आहे. मला रुग्णाचे हक्क आणि अधिकार यांची कल्पना दिली आहे.
                    मी / माझे नातेवाईक रुग्णालयाच्या सर्व नियम आणि अटींचे पालन करण्यास सहमत आहेत. उपचार खर्च / प्रक्रिया मला समजावून दिली आहे. अंदाजे रुपये
                    <span><SignaturePad width={100} height={25} design="line"/></span>
                    (औषधे आणि अन्न वगळून) मी / आम्ही याद्वारे रुग्णालयात दाखल करण्याच्या संबंधी खर्च चुकते करण्याची जबाबदारी घेत आहे.

                    मी मला / माझ्या नातेवाईकास कुठल्याही प्रकारे (आय एम / आय व्ही / एस सी) इंजेक्शन, सलाईनद्वारे औषध घेण्यास तयार आहे. त्याबद्दलचे सर्व धोके मला समजावून
                    दिलेले आहेत. त्यात प्रामुख्याने खालील धोके होऊ शकतात याची मला कल्पना आहे.

                </p>

                <ol>
                    <li>इंजेक्शन जागी दुखणे / कातडी खराब होणे / पू होणे / सेप्टिक होणे / सेप्टिक रक्तात मिसळून जीवास धोका होणे.</li>
                    <li>सर्व निर्जंतुकीकरणाचे उपाय योजले जातील याची मला कल्पना आहे, तरीही सेप्टिक होऊ शकते आणि सेप्टिक वाढल्यास / पसरल्यास इतर मोठ्या दवाखान्यात हलवावे लागू शकते.</li>
                    <li>इंजेक्शन नसांत जाऊन हात / पाय निकामी होणे / अपघात होणे.</li>
                    <li>कुठल्याही रुग्णास कुठल्याही औषधाची रिएक्शन येऊ शकते याची मला कल्पना आहे आणि ती रिएक्शन साधी कातडीवरील खाज पासून ते जीवघेण्या अनाफायलॅक्सिसची देखील येऊ शकते याची मला कल्पना आहे.</li>
                    <li>मी मला असलेल्या सर्व औषधांची आणि वस्तूंच्या ॲलर्जीची माहिती डॉक्टरांना दिली आहे आणि त्यांनी ती नोंदवली आहे. मी विसरलो असल्यास त्यास डॉक्टर जबाबदार राहणार नाही.</li>


                </ol>

                <p className="paragraph">
                    मला मराठी समजते आणि मी वरील मजकूर संपूर्ण समजून घेऊन माझ्या सर्व शंकांचे निरसन झाल्यावर कुठलीही घाई / भीती / दबाव यामध्ये न येता स्वखुशीने सही करीत आहे.

                    मुझे हिंदी समझती है। ऊपर दिये गये सब कलम मुझे Dr. KAPIL DESHMUKH इन्होंने हिंदी में समझायी है और मुझे मंजूर है। मैं किसी भी दबाव / डर / जल्दी में न रहते हुए मेरी खुद की मर्जी से दस्तखत लगा रहा हूँ।

                </p>

                <h4 className="center">
                    INTERPRETOR'S UNDERTAKING
                </h4>

                <p className="paragraph">
                    मी आणि डॉक्टरांनी पेशंट व नातेवाईकास वरील सर्व धोके <span><SignaturePad width={100} height={25} design="line"/></span>
                    भाषेत समजावून दिले. त्यांच्या सर्व शंकांचे निरसन केले आणि त्यांनी वरील गोष्टींना स्वखुशीने मान्यता दिली.
                </p>

                <div className="signature-grid">
                    <div style={{ fontFamily: 'Times New Roman' }}>
                        Interpreter's Name : <SignaturePad width="250" height="35" design="line"/>
                    </div>

                    <div style={{ fontFamily: 'Times New Roman' }}>
                        Interpreter's Sign : <SignaturePad width="250" height="35" />
                    </div>
                </div>

                <h4 className="center">
                    DOCTOR'S UNDERTAKING
                </h4>

                <p className="paragraph">
                    Certified that i personally counselled this patient about the above risks answer to his / her every query. and
                    patient and relatives agreed to all risks.
                </p>

                <div className="signature-grid">
                    <div style={{ fontFamily: 'Times New Roman' }}>
                        <p>Doctor Name: <SignaturePad width="250" height="35" design="line"/></p>
                        <p>Date & Time : <SignaturePad width="250" height="35" design="line"/></p>
                    </div>

                    <div style={{ fontFamily: 'Times New Roman' }}>
                        <p>Doctor Sign : <SignaturePad width="250" height="35" /></p>
                        <p>Stamp : <SignaturePad width="250" height="35"  design="line"/></p>
                    </div>
                </div>

            </div>

        </div>

    );
}

export default General_consent_marathi;
















