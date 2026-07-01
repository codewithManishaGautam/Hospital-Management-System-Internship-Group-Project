import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function DeclarationFooter() {
    return (
        <div>
            <div className="container mt-3">

                <div className="card shadow-sm mb-4 p-4">

                    
                    <hr />

                    {/* Name */}
                    <div className="mb-3">
                        <div className="row">
                            <div className="col-md-12">

                            </div>
                            <strong>रुग्ण किंवा रुग्णाच्या वतीने सही करणाऱ्या अधिकृत व्यक्तीचे नाव</strong>
                            <br />
                            <SignaturePad width={400} height={30} design="line"/>
                        </div>
                    </div>
                    <br />

                    <div className="row">
                        <div className="col-md-6">
                        <strong>सही</strong>
                        <br />
                        <SignaturePad width={300} height={40} design="border"/>
                        </div>
                        <div className="col-md-6">
                        <strong>रुग्णाशी नाते </strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line"/>
                        </div>
                    </div>

                    <hr />
                    <div className="text-center fw-bold mb-3">
                        आमच्या समक्ष सही केली
                    </div>
                    <br />


                     <div className="row">
                        <div className="col-md-6">
                        <strong>साक्षीदार क्र. १ सही</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line"/>
                        </div>
                        <div className="col-md-6">
                        <strong>साक्षीदार क्र. २ सही</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line"/>
                        </div>
                    </div>
                    <br />

                     <div className="row">
                        <div className="col-md-6">
                        <strong>नाव व पत्ता</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line"/>
                        <SignaturePad width={300} height={30} design="line"/>
                        </div>
                        <div className="col-md-6">
                        <strong>नाव व पत्ता</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line"/>
                        <SignaturePad width={300} height={30} design="line"/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default DeclarationFooter;