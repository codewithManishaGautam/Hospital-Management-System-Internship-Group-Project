import React from "react";
import SignaturePad from "../SignaturePad";

function DeclarationFooterCovidMar() {
    return (
        <div>
            <div className="card shadow-sm mt-4">

                <div className="card-body">

                    {/* Date & Time */}

                    <div className="row mb-4">

                        <div className="col-md-6">
                            <label className="fw-bold">
                                दिनांक व वेळ :
                            </label>
                            <input
                                type="datetime-local"
                                className="form-control mt-2"
                            />
                        </div>

                    </div>


                    <div className="row mb-4">

                        <div className="col-md-8">
                            <label className="fw-bold">
                                रुग्णाचे नाव :
                            </label>
                            <SignaturePad
                                width={300}
                                height={40}
                                design="line"
                            />


                        </div>


                        <div className="col-md-4 text-center">
                            <label className="fw-bold d-block mb-2">
                                रुग्णाची स्वाक्षरी
                            </label>

                            <SignaturePad
                                width={200}
                                height={40}
                                design="border"
                            />
                        </div>

                    </div>



                    <div className="row mb-4">

                        <div className="col-md-8">
                            <label className="fw-bold">
                                नातेवाईकाचे नाव :
                            </label>
                            <SignaturePad
                                width={300}
                                height={40}
                                design="line"
                            />


                        </div>


                        <div className="col-md-4 text-center">
                            <label className="fw-bold d-block mb-2">
                                नातेवाईकाची स्वाक्षरी
                            </label>

                            <SignaturePad
                                width={200}
                                height={40}
                                design="border"
                            />
                        </div>

                    </div>



                </div>

            </div>
        </div>
    )
}

export default DeclarationFooterCovidMar;