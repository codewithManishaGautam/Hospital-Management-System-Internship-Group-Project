



import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import "./style/PatientWitnessTable.css";

function PatientWitnessTable() {

    return (

        <div className="patient-witness">

            <table className="table table-bordered">

                <tbody>

                    <tr>

                        <td className="half-col">

                            <strong>
                                Name of Patient / Representative (Relation)
                            </strong>

                            <SignaturePad
                                height={30}
                                design="line"
                            />

                            <div className="mt-3">

                                <strong>Date</strong>

                                <input
                                    type="date"
                                    className="form-control"
                                />

                            </div>

                        </td>

                        <td className="half-col">

                            <strong>Witness Name</strong>

                            <SignaturePad
                                height={30}
                                design="line"
                            />

                            <div className="mt-3">

                                <strong>Relation</strong>

                                <SignaturePad
                                    height={30}
                                    design="line"
                                />

                            </div>

                            <div className="mt-3">

                                <strong>Date</strong>

                                <input
                                    type="date"
                                    className="form-control"
                                />

                            </div>

                        </td>

                    </tr>

                    <tr>

                        <td className="half-col">

                            <strong>Counselor Name</strong>

                            <SignaturePad
                                height={30}
                                design="line"
                            />

                            <div className="mt-3">

                                <strong>Date</strong>

                                <input
                                    type="date"
                                    className="form-control"
                                />

                            </div>

                            <div className="mt-3">

                                <strong>Signature</strong>

                                <SignaturePad
                                    height={45}
                                    design="border"
                                />

                            </div>

                        </td>

                        <td className="half-col">

                            <strong>Doctor Name</strong>

                            <SignaturePad
                                height={30}
                                design="line"
                            />

                            <div className="row mt-3">

                                <div className="col-6">

                                    <strong>Date</strong>

                                    <input
                                        type="date"
                                        className="form-control"
                                    />

                                </div>

                                <div className="col-6">

                                    <strong>Time</strong>

                                    <input
                                        type="time"
                                        className="form-control"
                                    />

                                </div>

                            </div>

                            <div className="mt-3">

                                <strong>Signature</strong>

                                <SignaturePad
                                    height={45}
                                    design="border"
                                />

                            </div>

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    );

}

export default PatientWitnessTable;