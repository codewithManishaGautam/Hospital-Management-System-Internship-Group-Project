import React from "react";
import SignaturePad from "../SignaturePad";

function DeclarationAmputation() {
    return (
        <div>
            <div className="card border-2">
                <div className="card-body">

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <strong> डॉक्टरांची सही :</strong><br />
                            <span className="ms-2">
                                <SignaturePad
                                    width={200}
                                    height={50}
                                    design="border"
                                />
                            </span>
                        </div>



                        <div className="col-md-4">
                            <strong>रुग्णाची सही/ अंगठा :</strong><br />
                            <SignaturePad
                                width={200}
                                height={50}
                                design="border"
                            />
                        </div>



                        <div className="col-md-4">
                            <strong>नातेवाईकाची सही/अंगठा :</strong><br />
                            <SignaturePad
                                width={200}
                                height={50}
                                design="border"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DeclarationAmputation;