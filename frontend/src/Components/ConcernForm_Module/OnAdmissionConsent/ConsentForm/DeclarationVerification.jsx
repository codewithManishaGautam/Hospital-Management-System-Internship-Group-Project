import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function DeclarationVerification({patientName,patientAddress,patientMob,patientSign}) {
    return (
        <div>
            <div className="card shadow-sm mb-4 p-3">

                <div className="row">


                     <div className="col-md-6 mb-3">

                        <strong>{patientName} </strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                        <br /><br />
                        <strong>{patientAddress} </strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                        <SignaturePad width={300} height={30} design="line" />
                        <br /><br />
                    </div>


                    <div className="col-md-6 mb-3">
                        <strong>{patientMob}</strong>
                        <br />
                        <SignaturePad width={250} height={30} design="line" />
                        <br /><br />
                        <strong>{patientSign} </strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border" />

                    </div>

                   

                </div>

            </div>
        </div>
    )
}

export default DeclarationVerification;