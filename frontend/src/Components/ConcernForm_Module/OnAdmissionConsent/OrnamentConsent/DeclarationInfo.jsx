import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function DeclarationInfo() {
    return (
        <div>
            <div className="card shadow-sm mb-4 p-3">
                <div className="row">
                    <div className="col-md-6 ">
                        <strong>नाव</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>
                    <div className="col-md-6 ">
                        <strong>नाते</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>
                </div>
                
                <br />

                <div className="row">
                    <div className="col-md-6">
                        <strong>दिनांक</strong>
                        <br />
                        <input type="datetime-local"/>
                    </div>

                    <div className="col-md-6 ">
                        <strong>सही</strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border" />
                    </div>
                </div>

            </div>
        </div>
   
    )
}

export default DeclarationInfo;