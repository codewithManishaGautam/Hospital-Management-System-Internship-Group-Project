import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function HospitalTransferInfo() {
    return (
        <div>
            <div className="card shadow-sm mb-1 p-1">

                <div className="row">

                    <div className="col-md-6">

                        <strong>Transfer Hospital Inform Date</strong>
                        <br />
                        <input type="date"/>
                    </div>

                    <div className="col-md-6">

                        <strong>Transfer Hospital Inform Time</strong>
                        <br />
                        <input type="time"/>
                    </div>
                </div>
                <br />

                <div className="row">

                    <div className="col-md-6">

                        <strong>At Shifting Time Patient’s Condition: A/O/E: BP</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>

                    <div className="col-md-6">

                        <strong>HR</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>
                </div>
                <br />

                <div className="row text-center">

                    <div className="col-md-4">

                        <strong>SPO2</strong>
                        <br />
                        <SignaturePad width={200} height={30} design="line" />
                    </div>

                    <div className="col-md-4">

                        <strong>RR</strong>
                        <br />
                        <SignaturePad width={200} height={30} design="line" />
                    </div>

                    <div className="col-md-4">

                        <strong>Tem</strong>
                        <br />
                        <SignaturePad width={200} height={30} design="line" />
                    </div>
                </div>
                <br />

                <div className="row">

                    <div className="col-md-6">

                        <strong>A/S/E: CVS</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>

                    <div className="col-md-6">

                        <strong>CNS</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>

                </div>
                <br />

                <div className="row">

                    <div className="col-md-6">

                        <strong>RS</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>

                    <div className="col-md-6">

                        <strong>P/A</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>

                </div>
                <br />

                <div className="row">

                    <strong>Ventilator Support:</strong>
                    <div className="col-md-6">

                        <strong>Yes</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>

                    <div className="col-md-6">

                        <strong>No</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>

                </div>
                <br />

                <div className="row">

                    <strong>NIV Support :</strong>
                    <div className="col-md-6">

                        <strong>Yes</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>

                    <div className="col-md-6">

                        <strong>No</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>

                </div>

            </div>
        </div>
    )
}

export default HospitalTransferInfo;