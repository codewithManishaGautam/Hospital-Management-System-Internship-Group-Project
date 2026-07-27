




import React, {
    useState,
    useEffect
} from "react";

import SignaturePad from "../CommonCode/SignaturePad";

function DoctorDeclaration({

    patient,
    onDataChange

}) {

    const [formData, setFormData] = useState({

        doctorName: "",

        doctorSignature: "",

        patientName: patient?.name || "",

        patientSignature: "",

        estimateAmount: "",

        dateTime: "",

        reason: ""

    });

    useEffect(() => {

        setFormData((prev) => ({

            ...prev,

            patientName: patient?.name || ""

        }));

    }, [patient]);

    useEffect(() => {

        if (onDataChange) {

            onDataChange(formData);

        }

    }, [

        formData,

        onDataChange

    ]);

    const updateField = (

        field,

        value

    ) => {

        setFormData((prev) => ({

            ...prev,

            [field]: value

        }));

    };

    return (

        <div>

            <div >

                <div className="row">

                    <div className="col-md-12">
                        <h5 style={{textAlign:"center"}}>Doctor Declaration</h5>
                    </div>
                    <br /><br />

                    <div className="col-md-7">

                        <strong>

                            डॉक्टरांचे नाव

                        </strong>

                        <br />

                        <SignaturePad

                            height={30}

                            design="line"

                            onSave={(img)=>

                                updateField(

                                    "doctorName",

                                    img

                                )

                            }

                        />

                    </div>

                    <div className="col-md-5">

                        <strong>

                            डॉक्टरांची सही

                        </strong>

                        <br />

                        <SignaturePad

                            height={45}

                            design="border"

                            onSave={(img)=>

                                updateField(

                                    "doctorSignature",

                                    img

                                )

                            }

                        />

                    </div>

                </div>

                <br />

                <div className="row">

                    <div className="col-md-7">

                        <strong>

                            रुग्णाचे नाव

                        </strong>

                        <br />

                        <SignaturePad

                            height={30}

                            design="line"

                            onSave={(img)=>

                                updateField(

                                    "patientName",

                                    img

                                )

                            }

                        />

                    </div>

                    <div className="col-md-5">

                        <strong>

                            रुग्णाची सही

                        </strong>

                        <br />

                        <SignaturePad

                            height={45}

                            design="border"

                            onSave={(img)=>

                                updateField(

                                    "patientSignature",

                                    img

                                )

                            }

                        />

                    </div>

                </div>

                <br />

                <div className="row">

                    <div className="col-md-7">

                        <strong>

                            सुधारित बिलाचा अंदाज

                        </strong>

                        <br />

                        <SignaturePad

                            height={30}

                            design="line"

                            onSave={(img)=>

                                updateField(

                                    "estimateAmount",

                                    img

                                )

                            }

                        />

                    </div>

                    <div className="col-md-5">

                        <strong>

                            तारीख व वेळ

                        </strong>

                        <br />

                        <input

                            type="datetime-local"

                            className="form-control"

                            value={formData.dateTime}

                            onChange={(e)=>

                                updateField(

                                    "dateTime",

                                    e.target.value

                                )

                            }

                        />

                    </div>

                </div>

                <br />

                <div className="row">

                    <div className="col-md-12">

                        <strong>

                            कारण व तपशील

                        </strong>

                        <br />

                        <SignaturePad

                            height={30}

                            design="line"

                            onSave={(img)=>

                                updateField(

                                    "reason",

                                    img

                                )

                            }

                        />

                        <SignaturePad

                            height={30}

                            design="line"

                            onSave={(img)=>

                                updateField(

                                    "reason",

                                    img

                                )

                            }

                        />

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DoctorDeclaration;