import React from "react";
import SignaturePad from "../SignaturePad";

function ThrombolysisDeclaration({
    doctorSign,
    doctorName,
    relativeSign,
    relativeName,
    patientRelation
}) 
{
    return(
        <div>
             <div className="card shadow-sm mt-3">
                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-6">
                                <label className="fw-bold">
                                    {doctorSign}
                                </label>

                                <SignaturePad
                                    width={250}
                                    height={60}
                                    design="border"
                                />

                                <div className="mt-3">
                                    <label className="fw-bold">
                                        {doctorName}
                                    </label>

                                    <SignaturePad
                                        width={250}
                                        height={35}
                                        design="line"
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label className="fw-bold">
                                    {relativeSign}
                                </label>

                                <SignaturePad
                                    width={250}
                                    height={60}
                                    design="border"
                                />

                                <div className="mt-3">
                                    <label className="fw-bold">
                                        {relativeName}
                                    </label>

                                    <SignaturePad
                                        width={300}
                                        height={35}
                                        design="line"
                                    />
                                </div>

                                <div className="mt-3">
                                    <label className="fw-bold">
                                        {patientRelation}
                                    </label>

                                    <SignaturePad
                                        width={300}
                                        height={35}
                                        design="line"
                                    />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
        </div>
    )
}

export default ThrombolysisDeclaration;