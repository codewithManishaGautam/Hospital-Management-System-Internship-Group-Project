import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function DeclarationInfo() {
    return (
        <div>
            <div className="card shadow-sm mb-4 p-3">

                <div className="row">


                     <div className="col-md-12 mb-3">

                        <strong>दिनांक </strong>
                        <br /> 
                        <input type="date" />
                        <br /><br />
                    </div>


                    <div className="col-md-6 mb-3">

                        <strong>स्वाक्षरीधारकाचे पूर्ण नाव </strong>
                        <br />
                        <SignaturePad width={300} height={40} design="line" />

                        <br /><br />

                        <strong>रुग्ण / नातेवाईकाची सही</strong>
                        <br />
                        <SignaturePad width={250} height={60} design="border" />

                    </div>

                    <div className="col-md-6 mb-3">

                        <strong>पत्ता </strong>
                        <br />
                        <SignaturePad width={300} height={40} design="line" />

                        <br /><br />

                        <strong>मोबाईल नंबर</strong>
                        <br />
                        <SignaturePad width={250} height={60} design="border" />

                    </div>

                   

                </div>

            </div>
        </div>
    )
}

export default DeclarationInfo;