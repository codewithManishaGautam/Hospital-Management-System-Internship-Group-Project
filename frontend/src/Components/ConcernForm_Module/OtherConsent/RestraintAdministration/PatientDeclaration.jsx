import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function PatientDeclaration() {
    return (
        <div>
            <div className="card shadow-sm mb-1 p-1">

                <div className="row">

                    <div className="col-md-8">

                        <strong>Name of the person contacted</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line"/>
                    </div>
                    
                    <div className="col-md-4">

                        <strong>Relation with patient</strong>
                        <br />
                        <SignaturePad width={200} height={30} design="line"/>
                    </div>
                </div>
                <br />


                <div className="row">
                    <div className="col-md-12">
                        <strong>Time</strong>
                        <br />
                        <input type="time"/>
                        <br />
                    </div>
                </div>
                <br />

                

            </div>
        </div>
    )
}

export default PatientDeclaration;