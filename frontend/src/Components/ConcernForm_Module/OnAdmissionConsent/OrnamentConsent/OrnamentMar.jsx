import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import DeclarationInfo from "./DeclarationInfo";



function OrnamentMar() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                Ornament Consent
            </h4>

            <Table_Form />
            <div>
               <p className="paragraph">
                    मी <span><SignaturePad width={350} height={30} design="line"/></span> असे लिहून देतो / देते की, 
                    माझे पेशंट आपल्या <b>SHRADDHA HOSPITAL AND ICU</b> मध्ये ॲडमिट केले असून माझ्या पेशंटच्या अंगावरील सर्व सोने, 
                    चांदी इत्यादी धातूंचे दागिने व इतर काही वस्तू तसेच त्यांच्यासोबत असलेला मोबाईल या सर्व गोष्टी मी माझ्या ताब्यात घेतल्या आहेत.
                    तरी यापैकी काही गोष्टी गहाळ झाल्यास त्याला रुग्णालय प्रशासन व रुग्णालयातील कोणताही कर्मचारी जबाबदार राहणार नाही.
               </p>
               <br /><br />
               <DeclarationInfo/>
            </div>

        </div>

    )
}

export default OrnamentMar;