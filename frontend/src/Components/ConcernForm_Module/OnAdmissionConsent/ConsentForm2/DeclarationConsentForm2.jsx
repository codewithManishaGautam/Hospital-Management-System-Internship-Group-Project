import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function DeclarationConsentForm2() {
    return (
        <div>
            <div className="card shadow-sm mb-4 p-3">
                <div className="row">
                    <div className="col-md-6">
                        <strong>दिनांक</strong>
                        <br />
                        <input type="datetime-local"/>
                    </div>
                    <div className="col-md-6">
                        <strong>रुग्ण / नातेवाईकाची सही</strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border" />
                    </div>
                </div>

              
            </div>
        </div>
    )
}

export default DeclarationConsentForm2;