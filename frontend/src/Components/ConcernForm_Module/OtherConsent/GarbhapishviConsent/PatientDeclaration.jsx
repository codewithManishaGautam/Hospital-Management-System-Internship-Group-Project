import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function PatientDeclaration() {
    return (
        <div>
            <div className="card shadow-sm mb-1 p-1">

                <div className="row">
                    <div className="col-md-8">

                        <strong>
                            दिनांक
                        </strong>
                        <br />
                        <input type="date"/>
                    </div>
                    
                    <div className="col-md-4">

                        <strong>वेळ</strong>
                        <br />
                        <input type="time"/>
                    </div>
                </div>
                <br />

                <div className="row">

                    <div className="col-md-8">

                        <strong>
                            रुग्णाचे नाव
                        </strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line"/>
                    </div>
                    
                    <div className="col-md-4">

                        <strong>रुग्णाची सही</strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border"/>
                    </div>
                </div>
                <br />

                <div className="row">

                    <div className="col-md-8">

                        <strong>
                            नातेवाईकाचे नाव
                        </strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line"/>
                    </div>
                    
                    <div className="col-md-4">

                        <strong>नातेवाईकाची सही</strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border"/>
                    </div>
                </div>
                <br />

                <div className="row">

                    <div className="col-md-8">

                        <strong>
                            डॉक्टरांचे  नाव
                        </strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line"/>
                    </div>
                    
                    <div className="col-md-4">

                        <strong>डॉक्टरांची सही</strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border"/>
                    </div>
                </div>
                <br />

            </div>
        </div>
    )
}

export default PatientDeclaration;