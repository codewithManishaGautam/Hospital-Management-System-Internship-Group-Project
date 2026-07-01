import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function DeclarationInfo({name,relation,sign}) {
    return (
        <div>
            <div className="card shadow-sm mb-4 p-3">
                <div className="row">
                    <div className="col-md-12 ">
                        <strong>Date</strong>
                        <br />
                        <input type="datetime-local"/>
                    </div>
                </div>
                
                <br />

                <div className="row">
                    <div className="col-md-6">
                        <strong>Patient Signature</strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border" />
                    </div>
                    <div className="col-md-6">
                        <strong>Relative Signature</strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border" />
                    </div>
                </div>

            </div>
        </div>
   
    )
}

export default DeclarationInfo;