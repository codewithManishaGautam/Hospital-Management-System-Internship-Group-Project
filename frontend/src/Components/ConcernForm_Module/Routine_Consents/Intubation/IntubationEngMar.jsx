import React from "react";
import SignaturePad from "../SignaturePad";
import Table_Form from "../Tabel_Form";
import "../Minor_Surgical/MinorEnglish.css";
import Stamp from "../../../../assets/Intubation.png";

import FormChart from "../Common_Code/FormChart";
import IntubationEng from "./IntubationEng";
import IntubationMar from "./IntubationMar";



function IntubationEngMar() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital,Daund
            </h2>
            <h4 className="title">
                कृत्रिम श्वसनासाठी श्वासनलिकेत ट्यूब टाकण्याबाबत माहिती व संमतीपत्र
            </h4>
            <p className="title">
                (प्रक्रियेपूर्वी डॉक्टरांनी समजावून सांगितल्यानंतर भरावयाचे)
            </p>
            <Table_Form />


            <div >
                <label >
                    Diagnosis : <span><SignaturePad width={750} height={40} design="border" /></span>
                </label>
                <label >
                    Reason for Intubation :  <span><SignaturePad width={615} height={40} design="line" /></span>
                    <span><SignaturePad width={750} height={40} design="line" /></span>
                    <span><SignaturePad width={750} height={40} design="line" /></span><br />
                </label>
                <br /><br />
                <p className="paragraph">
                    <b>Intubation:</b>
                    Tracheal intubation (intubation) is the placement of a flexible plastic tube into the trachea (windpipe) to maintain an
                    open airway or to serve as a conduit through which to administer certain drugs. It is frequently performed in critically injured, ill
                    or anesthetized patients to facilate ventilation of the lungs, including mechanical ventilation, and to prevent the possibility of
                    asphyxiation or airway obstruction. <br /><br />
                    Tracheal intubation is indicated in situations when illness or a medical procedure prevents a person from maintaining a clear
                    airway, breathing, and oxygenating the blood. In these circumstances, oxygen supplementation using a simple face mask is
                    inadequate. Such situations will lead to subsequent low oxygenation and ventilation which is a life-threatening complication and
                    if it is not immediately corrected by securing airway, it leads to decreased oxygen content, brain damage,cardiovascular collapse,
                    and death.

                </p>
                <div className="row mt-2">

                    <div className="col-md-6">
                        <label className="fw-bold">
                            <img
                                src={Stamp}
                                width={350}
                                height={300}
                                alt="Stamp"
                            />
                        </label>

                    </div>

                    <div className="col-md-6">
                        <label className="fw-bold">
                            Methods:-
                        </label>
                        <br /><br />
                        <p className="paragraph">
                            In Oro-tracheal Intubation, an endotracheal tube is passed through the mouth and
                            vocal apparatus into the trachea and in Naso-tracheal it is passed the nose.
                            Other methods of intubation involve surgery and include the cricothyrotomy (used
                            almost exclusively in emergency circumstances) and the tracheotomy, used
                            primarily in situations where a prolonged need for airway support is anticipated.
                            Because it is an invasive and extremely uncomfortable medical procedure,
                            intubation is usually performed after administration of general anaesthesia and a
                            neuromuscular-blocking drug.
                        </p>
                        <br />
                    </div>
                </div>
            </div>

            <IntubationEng/>
            <IntubationMar/>
            <br />
            <FormChart />

        </div>

    );
}

export default IntubationEngMar;
