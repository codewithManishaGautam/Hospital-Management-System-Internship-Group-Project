import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function DeclarationPermission() {
    return (
        <div>
            <div className="card shadow-sm mb-1 p-1">

                <div className="row">


                     <div className="col-md-6 mb-3">

                        <strong>रुग्णाचे / नातेवाईकाचे नाव</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                        <br /><br />
                        <strong>रुग्णाशी नाते</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                        <br /><br />
                    </div>


                    <div className="col-md-6 mb-3">
                        <strong>पत्ता </strong>
                        <br />
                        <SignaturePad width={250} height={30} design="line" />
                        <br /><br />
                        <strong>दूरध्वनी क्रमांक</strong>
                        <br />
                        <SignaturePad width={200} height={40} design="line" />

                    </div>

                   

                </div>

            </div>
        </div>
    )
}

export default DeclarationPermission;