import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function DeclarationInfo({relativeInfo,relativeName,ageGender,relationPatient,address,procedureName}) {
    return (
        <div>
            <div className="card shadow-sm mb-1 p-1">
                <b>{relativeInfo}</b><br />
                <div className="row">
                    <div className="col-md-8 ">
                        <strong>{relativeName}</strong>
                        <br />
                        <SignaturePad width={400} height={30} design="line" />
                    </div>
                    <div className="col-md-4 ">
                        <strong>{ageGender}</strong>
                        <br />
                        <SignaturePad width={200} height={30} design="line" />
                    </div>
                </div>
                
                <br />

                <div className="row">
                    <div className="col-md-8">
                        <strong>{address}</strong>
                        <br />
                        <SignaturePad width={400} height={30} design="line" />
                    </div>
                    <div className="col-md-4">
                        <strong>{relationPatient}</strong>
                        <br />
                        <SignaturePad width={200} height={30} design="line" />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <strong>{procedureName}</strong>
                        <br />
                        <SignaturePad width={720} height={30} design="line" />
                    </div>
                </div>

            </div>
        </div>
   
    )
}

export default DeclarationInfo;