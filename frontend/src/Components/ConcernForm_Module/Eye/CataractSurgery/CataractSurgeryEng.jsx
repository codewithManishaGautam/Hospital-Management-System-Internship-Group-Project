

import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import "./style/CataractSurgeryEng.css";
import PatientWitnessTable from "./PatientWitnessTable";

function CataractSurgeryEng() {
    return (
        <div className="consent-form">

            <h2 className="title">
                Shradha Hospital, Daund
            </h2>

            <h4 className="title">
                Consent For Cataract Surgery
            </h4>

            <Table_Form />

            <p className="paragraph">

                Loss of transparency of the natural Lens of the eye is called Cataract.
                It causes decreased vision. Cataract surgery can be done once the decrease
                in vision is severe enough to interfere with patient’s daily activities.

                <br /><br />

                Cataract surgery is done by Phaco-emulsification technique through a very
                small cut (Incision).

                <br /><br />

                Latest technology ensures high accuracy in estimation of the power of the
                artificial lens (IOL).

                <br /><br />

                Even after an excellent cataract surgery, some patients may notice dark
                spots.

                <br /><br />

                Cataract surgery is generally safe, however complications may occur such as:

                <br />

                • Bleeding

                <br />

                • Infection

                <br />

                • Retinal Detachment

                <br />

                • Swelling

                <br />

                • Need for further surgery

                <br /><br />

                Various medications may occasionally cause allergic reactions.

                <br /><br />

                <b>

                    After due consideration of all given above, I give my consent to the
                    doctors of SHRADDHA HOSPITAL AND ICU to perform cataract surgery
                    on my / my

                </b>

                <div className="inline-sign">
                    <SignaturePad height={30} design="line" />
                </div>

                <b> Right / Left eye.</b>

            </p>

            <PatientWitnessTable />

        </div>
    );
}

export default CataractSurgeryEng;