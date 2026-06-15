import React from "react";
import SignaturePad from "../SignaturePad";
function Covid19DeclarationFooterEng()
{
    return(
        <div>
             <div className="card shadow-sm mt-4">

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-4 text-center">

                            <SignaturePad
                                width={200}
                                height={40}
                                design="border"
                            />

                            <p className="fw-bold mt-2">
                                Signature of Patient
                            </p>
                            <br />


                            <p>
                                Date & Time
                            </p>
                             <input
                                type="datetime-local"
                                className="form-control mt-2"
                            />

                        </div>

                        <div className="col-md-4 text-center">

                            <SignaturePad
                                width={200}
                                height={40}
                                design="border"
                            />

                            <p className="fw-bold mt-2">
                                Signature of Relative / Guardian
                            </p>
                            <br />

                            <p>
                                Date & Time
                            </p>
                             <input
                                type="datetime-local"
                                className="form-control mt-2"
                            />

                        </div>

                        <div className="col-md-4 text-center">

                            <SignaturePad
                                width={200}
                                height={40}
                                design="border"
                            />

                            <p className="fw-bold mt-2">
                                Signature of RMO Treating the Patient
                            </p>

                            <p>
                                Date & Time
                            </p>
                             <input
                                type="datetime-local"
                                className="form-control mt-2"
                            />

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default Covid19DeclarationFooterEng;