import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function PatientDeclaration({Date,Time,patientName,sign,doctorName}) {
    return (
        <div>
            <div className="card shadow-sm mb-1 p-1">

                <div className="row">

                    <div className="col-md-8">

                        <strong>{Date}</strong>
                        <br />
                        <input type="date"/>
                    </div>
                    
                    <div className="col-md-4">

                        <strong>{Time}</strong>
                        <br />
                        <input type="time"/>
                    </div>
                </div>
                <br />


                <div className="row">
                    <div className="col-md-8">

                        <strong>{patientName}</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line"/>
                    </div>
                    
                    <div className="col-md-4">

                        <strong>{sign}</strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border"/>
                    </div>
                </div>
                <br />

                <div className="row">
                    <div className="col-md-8">

                        <strong>{doctorName}</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line"/>
                    </div>
                    
                    <div className="col-md-4">

                        <strong>{sign}</strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border"/>
                    </div>
                </div>
                <br />

            </div>
        </div>
    )
}

export default PatientDeclaration;