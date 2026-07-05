import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import "../CommonCode/FormBasic.css";

function DoctorDeclaration() {
    return (
        <div>
            <b>
                Declaration by Doctor
            </b>
            <br /> <br />
            <p className="paragraph">
                I declare that I have explained the nature and consequences of sedation and discussed the risks that particularly concern
                the patient. I have given the patient an opportunity to ask questions and I have answered satisfactorily.
            </p>


            <div className="card shadow-sm mb-1 p-1">

                <div className="row">

                    <div className="col-md-12">

                        <strong>Date</strong>
                        <br />
                        <input type="date" />
                    </div>
                </div>
                <br />


                <div className="row">
                    <div className="col-md-8">

                        <strong>Doctor's Name</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>

                    <div className="col-md-4">

                        <strong>Doctor's Signature</strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border" />
                    </div>
                </div>
                <br />

            </div>
        </div>
    )
}

export default DoctorDeclaration;