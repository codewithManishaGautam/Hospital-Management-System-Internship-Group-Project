import React from "react";
import SignaturePad from "../SignaturePad";
import Table_Form from "../Tabel_Form";
import "../Minor_Surgical/MinorEnglish.css";
import Stamp from "../../../../assets/Haemodialysis.png";
import HaemodialysisEng from "./HaemodialysisEng";
import HaemodialysisMar from "./HaemodialysisMar";
import FormChart from "../Common_Code/FormChart";



function HaemodialysisMarEng() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital,Daund
            </h2>
            <h4 className="title">
                Informed Consent for Haemodialysis
            </h4>
            <p className="title">
                हिमोडायलिसिससाठी माहितीपूर्ण संमती
            </p>
            <Table_Form />

            <div >
                <div className="row mt-2">

                    <div className="col-md-6">
                        <label className="fw-bold">
                            <img
                                src={Stamp}
                                width={350}
                                height={350}
                                alt="Stamp"
                            />
                        </label>

                    </div>

                    <div className="col-md-6">
                        <label className="fw-bold">
                            Haemodialysis :
                        </label>
                        <br /><br />
                        <p className="paragraph">
                            Patient needs dialysis when kidneys no longer remove enough wastes and fluid from
                            blood to keep healthy. <br /> The haemodialysis machine monitors blood flow and removes wastes
                            from the dialyzer. <br /> In haemodialysis dialysis machine and a special filter called a dialyzer
                            that functions as an artificial kidney to clean blood. <br /> The dialyzer is a round cylindrical
                            part connected to the haemodialysis machine. During treatment, the blood travels through tubes
                            into the dialyzer, which filters out wastes, extra salt, extra water. Then the cleaned blood flows
                            through another set of tubes back into the body. <br /> Thus, haemodialysis cleans blood by pumping it through
                            a device that removes wastes and excess fluids.
                        </p>
                    </div>
                </div>
            </div>

            <b>
                Risk associated with haemodialysis:
            </b>
            <p className="paragraph">
                Following risks are associated with haemodialysis and that while such risks are not common, one or more can
                occur and be potentially life threatening.
                <br /><br />

                <ul>
                    <li>
                        "Destruction" or the breakdown of red blood cells, known as haemodialysis;
                    </li>
                    <li>
                        Bacterial and/or viral (e.g., Hepatitis B or C, HIV) contamination of 
                        my blood which may cause infection, or bacterial infection of the blood called Sepsis;
                    </li>
                    <li>
                        Bleeding due to blood clothing problems or disconnection of blood tubing; 
                        Internal bleeding or bleeding from the access site
                    </li>
                    <li>
                        Infections of my access site (catheter or fistula infections).
                    </li>
                    <li>
                        Introduction of air into bloodstream.
                    </li>
                    <li>
                        Chest pain, breathlessness, Shock or Cardiac arrest.
                    </li>
                    <li>
                        Allergic and toxic reactions to drugs, solutions, artificial kidneys or other 
                        equipment used during the haemodialysis treatment.
                    </li>
                    <li>
                        Clothing of my access or infiltration of my access.
                    </li>
                    <li>
                        There may be some side effects associated with haemodialysis related to fluid and chemical 
                        changes during or after the haemodialysis treatment.
                    </li>
                    <li>
                        Some of the side effects are generalized discomfort, osteoporosis, electrolyte imbalance, 
                        head ache, nausea, dizziness, fainting, Irregular heartbeats, hypotension (low B.P.), Hypertension 
                        (high B.P.), muscle cramping and mild confusion.
                    </li>
                </ul>
            </p>

            <HaemodialysisEng/>
            <HaemodialysisMar/>
            <FormChart />







        </div>

    );
}

export default HaemodialysisMarEng;
