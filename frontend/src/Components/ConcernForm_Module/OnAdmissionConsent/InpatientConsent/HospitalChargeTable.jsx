import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function HospitalChargeTable({ Th1, Th2, Th3, Th4, Th5 ,showOther=true,width}) {
    return (
        <div className="card shadow-sm p-2 mb-3">



            <table className="table table-bordered text-center align-middle">
                <thead>
                    <tr>
                        <th>{Th1}</th>
                        <th> {Th2}</th>
                        <th>{Th3}</th>
                        {/* <th>ICU</th>
                        <th>Deluxe AC Room</th>
                        <th>Special Room</th> */}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div style={{ width: "100%" }}>
                                <SignaturePad
                                    width={180}
                                    height={30}
                                    design="line"
                                />
                            </div>
                        </td>
                        <td>
                            <div style={{ width: "100%" }}>
                                <SignaturePad
                                    width={180}
                                    height={30}
                                    design="line"
                                />
                            </div>
                        </td>
                        <td>
                            <div style={{ width: "100%" }}>
                                <SignaturePad
                                    width={180}
                                    height={30}
                                    design="line"
                                />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table className="table table-bordered text-center align-middle">
                <thead>
                    <tr>
                        <th>{Th4}</th>
                        <th>{Th5}</th>
                        {
                            showOther &&
                            (
                                <th>Other</th>
                            )
                        }

                        {/* <th>Semi Special Room</th>
                        <th>General Ward</th> */}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div style={{ width: "100%" }}>
                                <SignaturePad
                                    width={width}
                                    height={30}
                                    design="line"
                                />
                            </div>
                        </td>
                        <td>
                            <div style={{ width: "100%" }}>
                                <SignaturePad
                                    width={width}
                                    height={30}
                                    design="line"
                                />
                            </div>
                        </td>

                        {
                            showOther &&
                            (
                                <td>
                                    <div style={{ width: "100%" }}>
                                        <SignaturePad
                                            width={width}
                                            height={30}
                                            design="line"
                                        />
                                    </div>
                                </td>
                            )
                        }
                    </tr>
                </tbody>
            </table>









        </div>
    );
}

export default HospitalChargeTable;