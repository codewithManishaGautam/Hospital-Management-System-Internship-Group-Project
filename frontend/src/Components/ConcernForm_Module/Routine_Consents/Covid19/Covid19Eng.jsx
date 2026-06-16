import React from "react";
import SignaturePad from "../SignaturePad";
import Table_Form from "../Tabel_Form";
import "../Minor_Surgical/MinorEnglish.css"
import Covid19DeclarationFooterEng from "./DeclarationFooter";

function Covid19Eng() {
    return (
        <div className="consent-form">  
            <h2 className="title" >
                Shradha Hospital,Daund
            </h2>
            <h4 className="title">
                COVID 19 Form
            </h4>
            <Table_Form />
            <b style={{ display: "block", textAlign: "center" }}>
                COVID 19 Pandemic
            </b>
            <br />
            <u style={{ display: "block", textAlign: "center" }}>
                Emergency Surgical Procedures Consent Form
            </u>
            <p className="paragraph">
                I,<span><SignaturePad width={300} height={40} design="line" /></span><span style={{ marginTop: "10px" }}><SignaturePad width={50} height={30} design="line" /></span> years old
                <span ><SignaturePad width={150} height={30} design="line" /></span> residing at <span ><SignaturePad width={350} height={30} design="line" /></span> Mobile No,
                <span><SignaturePad width={200} height={30} design="line" /></span> in this,<b> extraordinary COVID 19 Pandemic situation </b> after explaining to me in details, the need and the possibilities of my emergency
                health condition in the language that I understand the best, hereby willingly give my consent for the mentioned <span><SignaturePad width={400} height={30} design="line" /></span>
                (surgical procedure name) on me. I also understand that the doctor concerned may as need by change the proposed procedure during the operation in my best interests.
            </p>

            <p className="paragraph">
                I hereby also declare clearly that <u>I am not suffering from any of the following symptoms/history of COVID 19 enlisted by MOHFW, India</u>
                <ol type="a">
                    <li>Dry cough.</li>
                    <li>Fever.</li>
                    <li>Shortness of Breath.</li>
                    <li>Cold / Running Nose.</li>
                    <li>Sore throat.</li>
                    <li>Loss of smell / taste.</li>
                    <li>Travelled outside India in last 14 days to countries affected with COVID-19.</li>
                    <li>Travelled within India by private/commercial vehicle like bus, train, or airlines in last 14 days.</li>
                </ol>
            </p>

            <p className="paragraph">
                I have been explained following important points of COVID 19 Virus infection. <br /><br />
                <ol>
                    <li>
                        It has an incubation period during which the carrier of the virus may not show any symptoms and still could be highly infectious.
                    </li>
                    <li>
                        I also understand that preoperative negative tests for Virus do not mean a Virus-free individual. I fully agree that additional tests like HR CECT Chest / RNA-PCR may be advised by my doctor before the operation.
                    </li>
                    <li>
                        It is possible that I might develop symptoms and subsequently test positive for this Virus in the peri-operative and post-operative period, which could be related to the hospital or otherwise.
                    </li>
                    <li>
                        I have been educated about the latest National Guidelines published by the Ministry of Health and Family Welfare (MOHFW), India, as all non-urgent procedures are advised to be deferred for the time being and only emergency health conditions should be addressed.
                    </li>
                    <li>
                        I am fully aware that the surgical procedure to be conducted on me is an emergency procedure in my interest.
                    </li>
                    <li>
                        I will not hold responsible any healthcare worker (Surgeon / Nurse / Ward Boy) or the hospital in this extraordinary COVID-19 crisis towards the treatment offered to me in my interest.
                    </li>
                    <li>
                        I am confirming that I am seeking surgical treatment under the above-mentioned criteria.
                    </li>
                    <li>
                        I shall not hold responsible any doctor, staff, clinic, nursing home, or hospital if I catch any COVID-19 infection during my treatment.
                    </li>
                    <li>
                        I have been made aware that maintaining the required social distancing of 6 feet for a period of 14 days is not possible with my emergency surgical procedure.
                    </li>
                </ol>
            </p>

            <p className="paragraph">
                I hereby declare to have read the above written informed consent and is ready
                to undergo the above-mentioned emergency surgical procedure on me due to serious nature of my health condition. <br />
                Thank you.
            </p>


           <Covid19DeclarationFooterEng/>

        </div>

    );
}

export default Covid19Eng;
