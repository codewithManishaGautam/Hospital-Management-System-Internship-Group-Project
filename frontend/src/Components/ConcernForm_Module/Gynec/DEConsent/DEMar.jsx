import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import WitnessRelativeTable from "./WitnessRelativeTable";



function DEMar() {


    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                D and E संमतीपत्र
            </h4>

            <Table_Form />
            <div>
                <p className="paragraph">
                    मी माझी पत्नी / सून / मुलगी  <span><SignaturePad width={550} height={30} design="line" /></span> <br />
                    हिला अपूर्ण गर्भपात व योनीगत रक्तस्त्राव या उपचारासाठी <b>SHRADDHA HOSPITAL AND ICU</b> मध्ये भरती केलेले आहे.
                    त्यासाठी डॉक्टरांनी आम्हांला गर्भपिशवी साफ करायला सांगितले आहे. <br /><br />


                    D & E हे ऑपरेशन करताना : <br />
                    <ol className="paragraph">
                        <li>
                            रुग्णाचे हिमोग्लोबिन खूपच कमी आहे.
                        </li>

                        <li>
                            अतिरिक्त रक्तस्त्राव (Heavy PV Bleeding)
                        </li>

                        <li>
                            गर्भाशयाला छिद्र पडणे (Perforation of Uterus)
                        </li>

                        <li>
                            गर्भाशयाचे टाके OPEN होणे (Old Scar Rupture LSCS)
                        </li>

                        <li>
                            गर्भाशय जंतुसंसर्ग (Uterine Infection)
                        </li>
                    </ol>

                    <br />
                    इत्यादी व इतर उपद्रव (Complications) निर्माण होऊ शकतात याची आम्हांला डॉक्टरांनी कल्पना दिलेली आहे. तसेच गरज पडल्यास रक्त भरणे व 
                    गर्भपिशवी काढणे किंवा पुढील उपचारासाठी मोठ्या हॉस्पिटलला शिफ्ट करण्याची गरज पडू शकते याचीही कल्पना आम्हांला दिलेली आहे.
                    सर्व गोष्टींची कल्पना असूनही आम्ही स्वजबाबदारीवर डॉक्टरांना ऑपरेशन करण्यास परवानगी देत आहोत. संभाव्य उपचाराची सर्व जबाबदारी 
                    आमची राहील याची पूर्वकल्पना आम्हांला आहे. आमची डॉक्टर व हॉस्पिटल विषयी कोणतीही तक्रार नाही.
                    सदर प्रपत्र वाचून व समजून घेण्यासाठी मला पुरेसा वेळ देण्यात आला आहे. माझी / माझ्या रुग्णाची सद्य वैद्यकीय स्थिती व सुचविण्यात आलेले उपचार न 
                    घेता होणारे संभाव्य परिणाम व धोक्यांबद्दल डॉक्टरांना प्रश्न विचारण्यासाठी संधी मला देण्यात आली आहे व माझ्या प्रश्नांची संपूर्णतः समाधानकारक उत्तरे देण्यात आली आहेत.
                    <br />वरील मजकूर मला समजेल अशा भाषेत समजावून सांगितले आहे व ते मला संपूर्णतः समजले आहे.
                </p>
                <br />
                <WitnessRelativeTable/>

            </div>
        </div>
    )
}

export default DEMar;