import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import DeclarationInfo from "./DeclarationInfo";
import RulesCondition from "./RulesCondition";
import HospitalChargeTable from "./HospitalChargeTable";



function InpatientMar() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                आंतररुग्ण संमती पत्र
            </h4>

            <Table_Form />
            <div>
                <p>
                    <p className="paragraph">
                        मी श्री / सौ. <span><SignaturePad width={350} height={30} design="line" /></span>
                        असे लिहून देतो / देते की आमचा पेशंट
                        <span><SignaturePad width={300} height={30} design="line" /></span>,राहणार <span><SignaturePad width={320} height={30} design="line" /></span> वय
                        <span><SignaturePad width={80} height={30} design="line" /></span>यांना <b>SHRADDHA HOSPITAL AND ICU</b>
                        येथे डॉ.<span><SignaturePad width={270} height={30} design="line" /></span>   यांच्या कडे
                        <span><SignaturePad width={650} height={30} design="line" /></span> या आजारासाठी ॲडमिट करत आहोत.
                        ॲडमिट केल्यानंतर किंवा उपचार सुरू असताना पेशंटची तब्येत गंभीर (Serious) होऊ शकते. प्रसंगी जीवाला देखील धोका होऊ शकतो,
                        अशी डॉ. <span><SignaturePad width={300} height={30} design="line" /></span> यांनी कल्पना दिलेली आहे.
                        <span><SignaturePad width={710} height={30} design="line" /></span> या आजारात
                        <span><SignaturePad width={630} height={30} design="line" /></span> असे त्रास पेशंटला उद्भवू शकतात.
                        <br /> तसेच पेशंटला <span><SignaturePad width={630} height={30} design="line" /></span>  असा त्रास होऊ शकतो, असेही डॉक्टरांनी सांगितले आहे.
                        प्रसंगी आय.सी.यू.मध्ये दाखल करावे लागू शकते किंवा मोठ्या रुग्णालयात हलविण्याची गरज पडू शकते, याची संपूर्ण कल्पना आम्हाला देण्यात आली आहे.
                        तरीही आम्ही पेशंटला ॲडमिट करण्यास व पुढील उपचार करण्यास संमती देत आहोत.
                    </p>

                    <strong>
                        वरील सर्व बाबी आम्हाला आमच्या शब्दांत तोंडी व लेखी स्वरूपात समजावून सांगण्यात आल्या आहेत.
                        यापुढे होणाऱ्या परिणामांची जबाबदारी आमची राहील. त्यासाठी डॉ.  <span><SignaturePad width={300} height={30} design="line" /></span>
                        व SHRADDHA HOSPITAL AND ICU येथील डॉक्टर, कर्मचारी व स्टाफ यांना जबाबदार धरले जाणार नाही.
                    </strong>
                    <br /><br />

                    <DeclarationInfo name="नाव" />
                    <br /><br />
                    <RulesCondition />
                    <br /><br />
                    <h6 className="fw-bold mb-2">
                        दैनंदिन हॉस्पिटल चार्ज खालील प्रमाणे (प्रतिदिन)
                    </h6>
                    <HospitalChargeTable
                        Th1="ICU"
                        Th2="Deluxe AC Room"
                        Th3="Special Room"
                        Th4="Semi Special Room"
                        Th5="General Ward"
                        width={300}
                        showOther={false}
                    />

                    <p className="fw-bold mt-3 mb-2">
                        दैनंदिन चार्जेस, बेड चार्जेस, RMO Round, Nursing Charges,
                        Nebulisation, Doctor 2 Visit, BMW, एकत्रित वसतीतील इतर
                        बाबींसाठी वेगळा खर्च व चार्जेस लागतील
                    </p>
                    <br />

                    <HospitalChargeTable
                        Th1="Oxygen"
                        Th2="Monitor"
                        Th3="BIPAP"
                        Th4="Ventilator"
                        Th5="Procedure"
                        width={300}
                        showOther={false}
                    />
                    <br />

                    <HospitalChargeTable

                        Th1="Emergency"
                        Th2="ECG"
                        Th3="Other Doctor Visit"
                        Th4="Sugar"
                        Th5="Food"
                        width={180}
                        showOther={true}
                    />
                    <br /><br />
                    <DeclarationInfo
                    name="रुग्णाचे / नातेवाईकाचे नाव"
                    />
                    
                </p>
            </div>

        </div>

    )
}

export default InpatientMar;