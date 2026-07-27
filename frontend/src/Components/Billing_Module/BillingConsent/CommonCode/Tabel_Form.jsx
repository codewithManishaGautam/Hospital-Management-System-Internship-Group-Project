



import { useState } from "react";
import { getDateTime, getTodayDate } from "./GetDate_Time";
import "./Table_Form.css";
import SignaturePad from "./SignaturePad";

function Table_Form({ patient }) {

    const [formData, setFormData] = useState({

        signature: ""

    });

    const updateField = (field, value) => {

        setFormData((prev) => ({

            ...prev,
            [field]: value

        }));

    };

    return (

        <div className="table-form-wrapper">

            <div className="date">

                <b>Date :</b> {getTodayDate()}

            </div>

            <table className="patient-table table table-bordered border-dark">

                <tbody>

                    <tr>

                        <td className="col-md-3">

                            <b>UHID :</b>

                            <input
                                className="form-control mt-1"
                                value={patient?.uhid || ""}
                                readOnly
                            />

                        </td>

                        <td className="col-md-6">

                            <b>DOA :</b>

                            <div className="mt-2">

                                {getDateTime()}

                            </div>

                        </td>

                    </tr>

                    <tr>

                        <td className="col-md-3">

                            <b>Gender / Age :</b>

                            <input
                                className="form-control mt-1"
                                value={`${patient?.gender || ""} / ${patient?.age || ""}`}
                                readOnly
                            />

                        </td>

                        <td className="col-md-6">

                            <b>IPD ID :</b>

                            <input
                                className="form-control mt-1"
                                value={patient?.uhid || ""}
                                readOnly
                            />

                        </td>

                    </tr>

                    <tr>

                        <td className="col-md-3">

                            <b>Patient Name :</b>

                            <input
                                className="form-control mt-1"
                                value={patient?.name || ""}
                                readOnly
                            />

                        </td>

                        <td className="col-md-6">

                            <b>Consulting Doctor</b>

                            <div className="mt-2">

                                <SignaturePad

                                    height={40}

                                    design="border"

                                    onSave={(img) =>
                                        updateField(
                                            "signature",
                                            img
                                        )
                                    }

                                />

                            </div>

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    );

}

export default Table_Form;