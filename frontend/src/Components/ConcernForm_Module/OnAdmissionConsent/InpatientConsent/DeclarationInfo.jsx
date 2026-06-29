import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function DeclarationInfo({ name }) {
    return (
        <div>
            <div className="card shadow-sm mb-4 p-1">

                <br />
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <strong>{name}</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <strong>मोबाईल नं </strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                        <br /><br />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <strong>सही </strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <strong>दिनांक</strong>
                        <br />
                        <input type="datetime-local"/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DeclarationInfo;