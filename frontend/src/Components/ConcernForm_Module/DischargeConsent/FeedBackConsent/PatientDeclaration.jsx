import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import "../CommonCode/FormBasic.css";

function PatientDeclaration({Date,Time,patientName,doctorName,specialDoctor,sign}) {
    return (
        <div>
            <div className="card shadow-sm mb-1 p-1">

                <div className="row">

                    <div className="col-md-8">

                        <strong>स्थळ</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line"/>
                    </div>
                    <div className="col-md-4">
                        <strong>दिनांक</strong>
                        <br />
                        <input type="date"/>
                    </div>
                    
                </div>
                <br />

                <div className="row">
                    <div className="col-md-8">

                        <strong>रुग्णाचे नाव</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line"/>
                    </div>
                    
                    <div className="col-md-4">

                        <strong>सही</strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border"/>
                    </div>
                </div>
                <br />

                <div className="row">
                    <div className="col-md-8">
                        <strong>फोन नं.</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line"/>
                    </div>
                    
                    <div className="col-md-4">
                        <strong>नाते</strong>
                        <br />
                        <SignaturePad width={200} height={30} design="line"/>
                    </div>
                </div>
                <br />

                <div className="row">
                    <div className="col-md-12">
                        <strong>पत्ता</strong>
                        <br />
                        <SignaturePad width={600} height={30} design="line"/>
                    </div>
                </div>
                <br />

            </div>
        </div>
    )
}

export default PatientDeclaration;