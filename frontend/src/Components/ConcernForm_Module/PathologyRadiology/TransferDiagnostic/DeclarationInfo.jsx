import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function DeclarationInfo({name,relation,sign}) {
    return (
        <div>
            <div className="card shadow-sm mb-4 p-3">
                <div className="row">
                    <div className="col-md-6 ">
                        <strong>{name}</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>
                    <div className="col-md-6 ">
                        <strong>{relation}</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>
                </div>
                
                <br />

                <div className="row">
                    <div className="col-md-12">
                        <strong>{sign}</strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border" />
                    </div>
                </div>

            </div>
        </div>
   
    )
}

export default DeclarationInfo;