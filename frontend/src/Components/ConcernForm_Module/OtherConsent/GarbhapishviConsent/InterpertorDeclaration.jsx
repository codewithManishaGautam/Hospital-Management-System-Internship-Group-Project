import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function InterpertorDeclaration() {
    return (
        <div>
            <div className="card shadow-sm mb-1 p-1">

        

                <div className="row">

                    <div className="col-md-8">

                        <strong>
                            Interpretor Name
                        </strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line"/>
                    </div>
                    
                    <div className="col-md-4">

                        <strong>
                            Interpretor Sign
                        </strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border"/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default InterpertorDeclaration;