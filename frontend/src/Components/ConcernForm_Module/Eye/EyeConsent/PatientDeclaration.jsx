import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function PatientDeclaration({showAnother=true,dateName,typeDate}) {
    return (
        <div>
            <div className="card shadow-sm mb-1 p-1">

                <div className="row">
                    <div className="col-md-8">

                        <strong>
                            {dateName}
                        </strong>
                        <br />
                        <input type={typeDate} />
                    </div>

                    <div className="col-md-4">

                        <strong>रुग्णाची सही</strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border" />
                    </div>
                </div>
                <br />
                {
                    showAnother &&
                    (
                        <div>

                            <div className="row">

                                <div className="col-md-8">

                                    <strong>
                                        सर्जनचे नाव
                                    </strong>
                                    <br />
                                    <SignaturePad width={300} height={30} design="line" />
                                </div>

                                <div className="col-md-4">

                                    <strong>सर्जनची सही</strong>
                                    <br />
                                    <SignaturePad width={200} height={40} design="border" />
                                </div>
                            </div>
                            <br />

                            <div className="row">

                                <div className="col-md-8">

                                    <strong>
                                        नातेवाईकाचे नाव
                                    </strong>
                                    <br />
                                    <SignaturePad width={300} height={30} design="line" />
                                </div>

                                <div className="col-md-4">

                                    <strong>नातेवाईकाची सही</strong>
                                    <br />
                                    <SignaturePad width={200} height={40} design="border" />
                                </div>
                            </div>
                            <br />

                            <div className="row">

                                <div className="col-md-12">

                                    <strong>
                                        शस्त्रक्रियेची पद्धत
                                    </strong>
                                    <br />
                                    <SignaturePad width={650} height={30} design="line" />
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default PatientDeclaration;