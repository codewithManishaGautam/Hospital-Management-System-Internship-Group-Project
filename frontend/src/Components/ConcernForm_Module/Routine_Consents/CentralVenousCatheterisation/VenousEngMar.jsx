import React from "react";
import SignaturePad from "../SignaturePad";
import Table_Form from "../Tabel_Form";
import "../Minor_Surgical/MinorEnglish.css"
import Stamp from "../../../../assets/venous.jpg";
import VenousMar from "./VenousMar";
import FormChart from "../Common_Code/FormChart";
import VenousEng from "./VenousEng";


function VenousEngMar() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital,Daund
            </h2>
            <h4 className="title">
                Informed Consent for Central Venous Catheterisation
            </h4>
            <p className="title">
                (To be filled by Doctor after Consultant explained procedure)
            </p>
            <Table_Form />
            <label >
                Provisional Diagnosis : <span><SignaturePad width={750} height={40} design="border" /></span>
            </label>
            <label >
                Procedure Name : <span><SignaturePad width={750} height={40} design="border" /></span>
            </label>
            <div >
                <div className="row mt-2">

                    <div className="col-md-6">
                        <label className="fw-bold">
                            Types of Anaesthesia :
                        </label>
                        <img
                            src={Stamp}
                            width="350"
                            height="350"
                            alt="Stamp"
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="fw-bold">
                            Location :
                        </label>
                        <br /><br />
                        <p className="paragraph">
                            A Central Vascular Access Device is used to give you medication directly into your blood 
                            stream without having to repeatedly insert a needle into your vein. <br /><br />
                            The catheters are usually recommended for patients who need certain types of medicines or 
                            treatments that can irritate or damage the smaller veins; or whom need injections over a long period of time. <br /><br />
                            There are many different types of devices. The device that you have inserted is dependent on the type and length of 
                            treatment required.
                        </p>
                    </div>
                </div>
            </div>

            <b>
                Types of devices include:
            </b>
            <p className="paragraph">
                1) Non-Tunnelled Catheter such as Vascath® and central line; <br />
                2) Tunnelled Catheter such as Hickman Catheter® and Permacath Dialysis Catheter®; <br />
                3) Implantable Port such as Portacath® and Infusaport®. <br />
                - A central venous catheter is a long hollow tube that is inserted into one of your large veins. One end 
                of the tube sits in a vein (usually just above the heart) and the other end comes out from underneath the skin. 
                The line will be sutured to the skin and secured with dressings. <br />
                - Insertion of the catheter requires a sterile procedure,which is usually performed under local anaesthetic and sedation. <br />
                - There are a number of veins into which the catheter can be placed; the most common being the axillary vein that lies just beneath the clavicle 
                (collar bone) or the jugular vein that lies just above the clavicle at the base of the neck, or brachial vein or femoral vein. <br />
                - The best position and site for you will be discussed before the procedure; however, it is sometimes impossible to decide until during the procedure. <br />
                - This procedure involves the use of local anesthesia and sedation as well. In special cases, a general anaesthetic might be required and this will be 
                fully discussed prior to the procedure.
            </p>

            <b>Risks of the procedure</b>
            <p className="paragraph">
                In recommending a Central Venous Access Device, the doctor believes the benefits to you from having this procedure exceed the risks involved. The risks and complications with this 
                procedure and with having a device can include but are not limited to the following.
            </p>

            <VenousMar/>
            <FormChart/>
            <VenousEng />




        </div>

    );
}

export default VenousEngMar;
