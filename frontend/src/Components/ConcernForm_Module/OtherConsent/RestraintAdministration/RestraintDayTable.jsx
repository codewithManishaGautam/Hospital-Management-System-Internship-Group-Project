import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import "./style/RestraintDayTable.css";
import RestraintAssestmentTable from "./RestraintAssestmentTable";

function RestraintDayTable({ totalDays = 1 }) {
    return (
        <div className="mt-3">
            <table className="table table-bordered daily-sign-table">

                <colgroup>
                    <col style={{ width: "12%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "68%" }} />
                </colgroup>

                <thead>
                    <tr>
                        <th></th>
                        <th>Date</th>
                        <th>Patient's Relative Name & Sign</th>
                    </tr>
                </thead>

                <tbody>
                    {Array.from(
                        { length: Number(totalDays) || 1 },
                        (_, index) => (
                            <tr key={index}>
                                <td>
                                    <strong>Day {index + 1}</strong>
                                </td>

                                <td>
                                    <input
                                        type="date"
                                        className="form-control"
                                    />
                                </td>

                                <td>
                                    <SignaturePad
                                        width={470}
                                        height={30}
                                        design="line"
                                    />
                                </td>
                            </tr>
                        )
                    )}
                </tbody>

            </table>
        </div>
    );
}

export default RestraintDayTable;