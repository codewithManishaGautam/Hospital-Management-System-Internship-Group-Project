import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import StampUpload from "../CommonCode/StampUpload";

function DeclarationCashlessMediclaim() {
    return (
        <div>
            <div className="card shadow-sm mb-4 p-3">
                <div className="row">
                    <div className="col-md-6">
                        <strong>Patient Name</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>
                    <div className="col-md-6">
                        <strong>पेशंटचे नाव</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>
                </div>
                <br />

                <div className="row">
                    <div className="col-md-6">
                        <strong>Attending Person Name on behalf of Patient</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>
                    <div className="col-md-6">
                        <strong>पेशंटच्या वतीने जबाबदारी घेणाऱ्याचे नाव</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>

                </div>
                <br />

                <div className="row">
                    <div className="col-md-6">
                        <strong>Mobile No.(मोबाईल क्रमांक) </strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>
                    <div className="col-md-6">
                        <strong>Relation With Patient(रुग्णाशी नाते)</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>
                </div>
                <br />

                <div className="row">
                    <div className="col-md-6">
                        <strong>Signature (सही) </strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border" />
                    </div>
                    <div className="col-md-6">
                        <strong>left thumb Impression (डाव्या हाताचा अंगठ्याचा ठसा) </strong>
                        <br />
                            <StampUpload/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeclarationCashlessMediclaim;