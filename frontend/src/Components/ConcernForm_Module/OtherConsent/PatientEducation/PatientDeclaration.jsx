import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function PatientDeclaration({ patientName, anotherName, sign, showDate = true }) {
    return (
        <div>
            <div className="card shadow-sm mb-1 p-1">

                <div className="row">

                    <div className="col-md-8">

                        <strong>{anotherName}</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>

                    <div className="col-md-4">

                        <strong>{sign}</strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border" />
                    </div>
                </div>
                <br />
                <div className="row">

                    <div className="col-md-8">

                        <strong>{patientName}</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>

                    <div className="col-md-4">

                        <strong>{sign}</strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border" />
                    </div>
                </div>
                <br />

                {
                    showDate && (


                        <div className="row">

                            <div className="col-md-12">

                                <strong>Date </strong>
                                <br />
                                <input type="date" />
                            </div>
                        </div>
                    )
                }



            </div>
        </div>
    )
}

export default PatientDeclaration;