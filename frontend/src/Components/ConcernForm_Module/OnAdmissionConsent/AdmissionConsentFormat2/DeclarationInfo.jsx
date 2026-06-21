import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function DeclarationInfo() {
    return (
        <div>
            <div className="card shadow-sm mb-4 p-3">

                <div className="row">

                    {/* Patient Side */}
                    <div className="col-md-6 mb-3">

                        <strong>Name of Patient / Family Member (Relation)</strong>
                        <br />
                        <SignaturePad width={300} height={40} design="line" />

                        <br /><br />

                        <strong>Patient Signature</strong>
                        <br />
                        <SignaturePad width={250} height={60} design="border" />

                    </div>

                    {/* Doctor Side */}
                    <div className="col-md-6 mb-3">

                        <strong>Name of Doctor</strong>
                        <br />
                        <SignaturePad width={300} height={40} design="line" />

                        <br /><br />

                        <strong>Doctor Signature</strong>
                        <br />
                        <SignaturePad width={250} height={60} design="border" />

                    </div>

                </div>

            </div>
        </div>
    )
}

export default DeclarationInfo;