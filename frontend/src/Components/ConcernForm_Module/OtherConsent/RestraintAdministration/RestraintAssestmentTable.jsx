import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import "./style/RestraintAssestmentTable.css";

function RestraintAssestmentTable({ number }) {


    return (
        <div className="mt-3">




            <b className="title" style={{ display: "block" }}>
                Restraint assessment form
            </b>
            <label>
                Day : <span><SignaturePad width={50} height={30} design="none" /></span>
            </label>
            <table className="table observation-table">

                <thead>

                    <tr>
                        <th colSpan={6} className="observation-table">
                            Observation {number}
                        </th>
                    </tr>

                    <tr>
                        <th style={{ width: "13%" }}>Date</th>
                        <th style={{ width: "12%" }}>Time</th>
                        <th style={{ width: "35%" }}>Behaviour</th>
                        <th style={{ width: "25%" }}>Intervention</th>
                        <th style={{ width: "15%" }}>Remarks</th>
                    </tr>

                </thead>

                <tbody>

                    {[1, 2, 3, 4, 5].map((row) => (
                        <tr key={row}>
                            <td><input type="date" style={{ border: "none", width: "82%" }} /></td>
                            <td><input type="time" style={{ border: "none", width: "auto" }} /></td>
                            <td>
                                <SignaturePad width={140} height={30} design="none" />
                                <SignaturePad width={140} height={30} design="none" />
                            </td>
                            <td>
                                <SignaturePad width={125} height={30} design="none" />
                                <SignaturePad width={125} height={30} design="none" />
                            </td>

                            <td>
                                <SignaturePad width={110} height={30} design="none" />
                            </td>
                            {/* <td></td>
                            <td></td>
                            <td></td>
                            <td></td> */}
                        </tr>
                    ))}

                </tbody>

            </table>

            <div className="d-flex justify-content-between mb-2">
                <span>
                    (Renewal or continuation of restraint order by attending consultant
                    or HOD or Registration)
                </span>

            </div>


            <div className="card shadow-sm mb-1 p-1">

                <div className="row">

                    <div className="col-md-8">

                        <strong>Name of Relative / Sign</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>

                    <div className="col-md-4">

                        <strong>Sign of attending consultant</strong>
                        <br />
                        <SignaturePad width={200} height={40} design="border" />
                    </div>
                </div>
                <br />
            </div>

        </div>
    );
}

export default RestraintAssestmentTable;