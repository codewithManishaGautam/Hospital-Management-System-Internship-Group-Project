import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function DeclarationFooter({ witnessName, sign, patientName, nameKey1, nameKey2, surgeonName, dateTime, stampName,Stamp }) {
    return (
        <div>
            <div className="card shadow-sm mb-1 p-1">
                <div className="row">
                    <div className="col-md-8 ">
                        <strong>{witnessName}</strong>
                        <br />
                        <SignaturePad width={400} height={30} design="line" />
                    </div>
                    <div className="col-md-4 ">
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
                        <SignaturePad width={400} height={30} design="line" />
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
                        <strong>{nameKey1}</strong>
                        <br />
                        <SignaturePad width={400} height={30} design="line" />
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
                        <strong>{nameKey2}</strong>
                        <br />
                        <SignaturePad width={400} height={30} design="line" />
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
                        <strong>{surgeonName}</strong>
                        <br />
                        <SignaturePad width={400} height={30} design="line" />
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
                        <strong>{dateTime}</strong>
                        <br /> <br />
                        <input type="datetime-local"/>
                    </div>
                    <div className="col-md-4">
                        <strong>{stampName}</strong>
                        <br />
                        <img
                            src={Stamp}
                            width="100"
                            height="100"
                            alt="Stamp"
                        />
                    </div>
                </div>

            </div>
        </div>

    )
}

export default DeclarationFooter;