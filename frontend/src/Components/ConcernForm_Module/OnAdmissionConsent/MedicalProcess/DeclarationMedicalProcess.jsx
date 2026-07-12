import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function DeclarationMedicalProcess() {
    return (
        <div>
            <div className="card shadow-sm mb-4 p-3">
                {/* Date */}
                <div className="row mb-4">
                    <div className="col-md-12">
                        <strong>दिनांक</strong>
                        <br />
                        <input type="datetime-local"/>
                    </div>
                </div>

                {/* Name & Signature */}
                <div className="row">
                    <div className="col-md-8">
                        <strong>पेशंटचे / पेशंटच्या नातेवाईकाचे नाव</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>

                    <div className="col-md-4 text-md-start">
                        <strong>सही</strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeclarationMedicalProcess;