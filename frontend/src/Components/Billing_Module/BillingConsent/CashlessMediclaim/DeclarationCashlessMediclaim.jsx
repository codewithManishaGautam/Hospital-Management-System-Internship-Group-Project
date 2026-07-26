



import React, { useEffect, useState } from "react";

import SignaturePad from "../CommonCode/SignaturePad";
import StampUpload from "../CommonCode/StampUpload";

function DeclarationCashlessMediclaim({

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

    const updateField = (field, value) => {

        setFormData((prev) => {

            const updated = {

                ...prev,
                [field]: value

            };

            console.log("Updated Form =", updated);

            return updated;

        });

    };

    return (

        <div >

            {/* ================= Patient Name ================= */}

            <div className="row">

                <div >

                    <strong>Patient Name</strong>

                    <SignaturePad

                        height={30}
                        design="line"

                        onSave={(img) =>
                            updateField("patientName", img)
                        }

                    />

                </div>

                <div >

                    <strong>पेशंटचे नाव</strong>

                    <SignaturePad

                        height={30}
                        design="line"

                        onSave={(img) =>
                            updateField("patientName", img)
                        }

                    />

                </div>

            </div>

            <br />

            {/* ================= Attendant ================= */}

            <div className="row">

                <div >

                    <strong>Attending Person Name</strong>

                    <SignaturePad

                        height={30}
                        design="line"

                        onSave={(img) =>
                            updateField("attendantName", img)
                        }

                    />

                </div>

                <div>

                    <strong>पेशंटच्या वतीने जबाबदारी घेणाऱ्याचे नाव</strong>

                    <SignaturePad

                        height={30}
                        design="line"

                        onSave={(img) =>
                            updateField("attendantName", img)
                        }

                    />

                </div>

            </div>

            <br />

            {/* ================= Mobile ================= */}

            <div className="row">

                <div className="col-md-6">

                    <strong>Mobile No.</strong>

                    <SignaturePad

                        height={30}
                        design="line"

                        onSave={(img) =>
                            updateField("mobile", img)
                        }

                    />

                </div>

                <div className="col-md-6">

                    <strong>Relation With Patient</strong>

                    <SignaturePad

                        height={30}
                        design="line"

                        onSave={(img) =>
                            updateField("relation", img)
                        }

                    />

                </div>

            </div>

            <br />

            {/* ================= Signature & Thumb ================= */}

            <div className="row">

                <div className="col-md-6">

                    <strong>Signature</strong>

                    <SignaturePad

                        height={50}
                        design="border"

                        onSave={(img) => {

                            console.log("Signature Saved");

                            updateField("signature", img);

                        }}

                    />

                </div>

                <div className="col-md-6">

                    <strong>Left Thumb Impression</strong>

                    <StampUpload
                        showName={false}

                        onSave={(img) => {

                            console.log("Thumb Saved");

                            updateField("thumb", img);

                        }}

                    />

                </div>

            </div>
            

        </div>

    );

}

export default DeclarationCashlessMediclaim;