import React, {
    useState,
    useEffect
} from "react";

import SignaturePad from "../CommonCode/SignaturePad";
import StampUpload from "../CommonCode/StampUpload";

function PatientDeclaration({

    patient,
    onDataChange

}) {

    const [formData, setFormData] = useState({

        patientName: patient?.name || "",

        attendantName: "",

        relation: "",

        mobile: patient?.mobile || "",

        signature: "",

        thumb: ""

    });

    useEffect(() => {

        setFormData((prev) => ({

            ...prev,

            patientName: patient?.name || "",

            mobile: patient?.mobile || ""

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

                <p>

                    सुधारित बिलाचा अंदाज मला पूर्णपणे समजावून सांगण्यात आला आहे
                    व तो मला पूर्णपणे मान्य आहे.

                </p>

                <div className="row">

                    <div className="col-md-12">
                        <h5 style={{textAlign:"center"}}>Patient Declaration</h5>
                    </div>
                    <br /><br />

                    <div className="col-md-7">

                        <strong>

                            रुग्णाचे नाव

                        </strong>

                        <br />

                        <SignaturePad

                            height={30}

                            design="line"

                            onSave={(img) =>

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

                            onSave={(img) =>

                                updateField(

                                    "signature",

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

                            नातेवाईकाचे नाव

                        </strong>

                        <br />

                        <SignaturePad

                            height={30}

                            design="line"

                            onSave={(img) =>

                                updateField(

                                    "attendantName",

                                    img

                                )

                            }

                        />

                    </div>

                    <div className="col-md-5">

                        <strong>

                            नातेवाईकाची सही

                        </strong>

                        <br />

                        <SignaturePad

                            height={45}

                            design="border"

                            onSave={(img) =>

                                updateField(

                                    "relation",

                                    img

                                )

                            }

                        />

                    </div>

                </div>

                <br />

                <div className="row">

                    <div className="col-md-6">

                        <strong>

                            मोबाईल क्रमांक

                        </strong>

                        <br />

                        <SignaturePad

                            height={30}

                            design="line"

                            onSave={(img) =>

                                updateField(

                                    "mobile",

                                    img

                                )

                            }

                        />

                    </div>

                    <div className="col-md-6">

                        <strong>

                            अंगठ्याचा ठसा

                        </strong>

                        <br />

                        <StampUpload

                            showName={false}

                            onSave={(img) =>

                                updateField(

                                    "thumb",

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

export default PatientDeclaration;