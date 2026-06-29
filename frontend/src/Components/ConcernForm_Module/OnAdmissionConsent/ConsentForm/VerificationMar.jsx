import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import DeclarationVerification from "./DeclarationVerification";


function VerificationMar() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना <br />
                महात्मा ज्योतिराव फुले जन आरोग्य योजना
            </h4>

            <Table_Form />
            <div>
                <div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                        १. आपणास देण्यात आलेल्या माहितीच्या आधारे आपण योजनेचे लाभार्थी आहात काय?
                    </label>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <label
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginRight: "100px", // इथून gap वाढव
                                cursor: "pointer",
                            }}
                        >
                            <input type="radio" name="beneficiary" value="yes" />
                            <span style={{ marginLeft: "8px" }}>१. होय</span>
                        </label>

                        <label
                            style={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                            }}
                        >
                            <input type="radio" name="beneficiary" value="no" />
                            <span style={{ marginLeft: "8px" }}>२. नाही</span>
                        </label>
                    </div>
                </div>
                <br />
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                        २. आपणास देण्यात आलेल्या माहितीच्या आधारे आपण योजनेचा लाभ घेण्यास इच्छुक आहात काय?
                    </label>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <label
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginRight: "100px", // इथून gap वाढव
                                cursor: "pointer",
                            }}
                        >
                            <input type="radio" name="beneficiary" value="yes" />
                            <span style={{ marginLeft: "8px" }}>१. होय</span>
                        </label>

                        <label
                            style={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                            }}
                        >
                            <input type="radio" name="beneficiary" value="no" />
                            <span style={{ marginLeft: "8px" }}>२. नाही</span>
                        </label>
                    </div>
                    <br />
                    <p className="paragraph">
                        लाभ घेण्यास इच्छुक नसल्यास रुग्ण अथवा नजीकच्या नातेवाईकांच्या हस्ताक्षरात लाभ नाकारण्याचे सविस्तर कारण : <br />
                        <span><SignaturePad width={700} height={500} design="none"/></span>
                    </p>
                </div>

                <div>
                    <strong>
                        वरील सर्व माहिती मी स्वतः कोणत्याही दबावाखाली न येता दिली आहे.
                    </strong>
                    <br /><br />
                    <DeclarationVerification 
                    patientName="स्वाक्षरीधारकाचे पूर्ण नाव"
                    patientAddress="पत्ता"
                    patientMob="मोबाईल नंबर"
                    patientSign="रुग्ण / नातेवाईकाची सही"
                    />
                </div>

                <hr style={{
                        width: "100%",
                        border: "0",
                        borderTop: "3px solid black"
                    }} />

                <div>
                    <strong>
                        वरील सर्व माहिती रुग्ण अथवा रुग्णाच्या नातेवाईकास समजली असून, या बाबत त्यांची 
                        सहमती असल्याचे मी (आरोग्यमित्र) स्वतः कोणत्याही दबावाखाली न येता प्रमाणित करीत आहे.
                    </strong>
                    <br /><br />
                    <DeclarationVerification 
                    patientName="आरोग्यमित्राचे पूर्ण नाव"
                    patientAddress="Employment No."
                    patientMob="मोबाईल नंबर"
                    patientSign="आरोग्यमित्राची सही"
                    />
                </div>
                </div>

            </div>


        </div>

    )
}

export default VerificationMar;