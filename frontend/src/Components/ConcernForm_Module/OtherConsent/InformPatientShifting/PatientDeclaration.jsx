import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function PatientDeclaration() {
    return (
        <div>
            <div className="card shadow-sm mb-1 p-1">

                <div className="row">

                    <div className="col-md-8">

                        <strong>Relative Name & relation</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>

                    <div className="col-md-4">

                        <strong>Signature</strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border" />
                    </div>
                </div>
                <br />

                <div className="row">

                    <div className="col-md-8">

                        <strong>Relative Name & relation</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>

                    <div className="col-md-4">

                        <strong>Signature</strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border" />
                    </div>
                </div>
                <br />

                <div className="row">

                    <div className="col-md-8">

                        <strong>Date</strong>
                        <br />
                        <input type="date"/>
                    </div>

                    <div className="col-md-4">

                        <strong>Time</strong>
                        <br />
                        <input type="time"/>
                    </div>
                </div>
                <br />

                <div className="row">

                    <div className="col-md-8">

                        <strong>Transfer Hospital Doctor (RMO) Name</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>

                    <div className="col-md-4">

                        <strong>Signature</strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border" />
                    </div>
                </div>
                <br />

                <div className="row">

                    <div className="col-md-8">

                        <strong>Transfer Hospital Nurse Name</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>

                    <div className="col-md-4">

                        <strong>Signature</strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border" />
                    </div>
                </div>
                <br />

                <div className="row">

                    <div className="col-md-8">

                        <strong>Patient Hand Over Date</strong>
                        <br />
                        <input type="date"/>
                    </div>

                    <div className="col-md-4">

                        <strong>Time</strong>
                        <br />
                        <input type="time"/>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default PatientDeclaration;