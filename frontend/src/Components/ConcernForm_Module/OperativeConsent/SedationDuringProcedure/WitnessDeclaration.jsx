import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import "../CommonCode/FormBasic.css";

function WitnessDeclaration({ witness1, witness2, name, sign, Date, address, phoneNo }) {
    return (
        <div>
            <div className="card shadow-sm mb-1 p-1">

                <div className="row">

                    <div className="col-md-6 text-center">

                        <strong>{witness1}</strong>
                        <br />
                    </div>

                    <div className="col-md-6 text-center">

                        <strong>{witness2}</strong>
                        <br />
                    </div>


                </div>
                <br />


                <div className="row">
                    <div className="col-md-6">

                        <strong>{name}</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>

                    <div className="col-md-6">

                        <strong>{name}</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>
                </div>
                <br />

                <div className="row">
                    <div className="col-md-6">

                        <strong>{sign}</strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border" />
                    </div>

                    <div className="col-md-6">

                        <strong>{sign}</strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border" />
                    </div>
                </div>
                <br />

                <div className="row">
                    <div className="col-md-6">

                        <strong>{Date}</strong>
                        <br />
                        <input type="date" />                    
                    </div>

                    <div className="col-md-6">

                        <strong>{Date}</strong>
                        <br />
                        <input type="date" />                    
                    </div>
                </div>
                <br />

                <div className="row">
                    <div className="col-md-6">

                        <strong>{address}</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>

                    <div className="col-md-6">

                        <strong>{address}</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>
                </div>
                <br />

                <div className="row">
                    <div className="col-md-6">

                        <strong>{phoneNo}</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>

                    <div className="col-md-6">

                        <strong>{phoneNo}</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>
                </div>
                <br />
            </div>
        </div>
    )
}

export default WitnessDeclaration;