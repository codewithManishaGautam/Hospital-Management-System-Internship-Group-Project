import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function DoctorDeclaration() {
    return (
        <div>
            <div className="card shadow-sm mb-1 p-1">

                <div className="row">

                    <div className="col-md-8">

                        <strong>डॉक्टरांचे नाव</strong>
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
                <div className="row">

                    <div className="col-md-8">

                        <strong>रुग्णाचे नाव </strong>
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
                            सुधारित बिलाचा अंदाज 
                        </strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line"/>
                    </div>
                    
                    <div className="col-md-4">

                        <strong>
                            तारीख व वेळ 
                        </strong>
                        <br />
                        <input type="datetime-local"/>
                    </div>
                    
                </div>
                <br />

                <div className="row">

                    <div className="col-md-12">

                        <strong>
                            कारण व तपशील
                        </strong>
                        <br />
                        <SignaturePad width={700} height={30} design="line"/>
                        <SignaturePad width={700} height={30} design="line"/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DoctorDeclaration;