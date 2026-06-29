import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import "./style/WitnessRelativeTable.css"

function WitnessRelativeTable() {
    return (
        <div className="mt-3 table-responsive">

            <table className="table table-bordered text-center align-middle" >

                <colgroup>
                    <col style={{ width: "33%" }} />
                    <col style={{ width: "34%" }} />
                    <col style={{ width: "33%" }} />
                </colgroup>

                <thead>
                    <tr>
                        <th>साक्षीदार</th>
                        <th>नातेवाईक</th>
                        <th>पेशंट</th>
                    </tr>
                </thead>

                <tbody>

                    {/* Name */}

                    <tr>

                        <td className="text-start" >

                            <strong>नाव</strong>

                            <div className="mt-2">
                                <SignaturePad
                                    width={192}
                                    height={30}
                                    design="line"
                                />
                                
                            </div>
                            <div className="mt-2">
                                <SignaturePad
                                    width={192}
                                    height={30}
                                    design="line"
                                />
                                
                            </div>

                        </td>

                        <td className="text-start">

                            <strong>नाव </strong>

                            <div className="mt-2">
                                <SignaturePad
                                    width={192}
                                    height={30}
                                    design="line"
                                />
                                
                            </div>
                            <div className="mt-2">
                                <SignaturePad
                                    width={192}
                                    height={30}
                                    design="line"
                                />
                                
                            </div>

                        </td>

                        <td className="text-start">

                            <strong>नाव </strong>
                            <div className="mt-2">
                                <SignaturePad
                                    width={192}
                                    height={30}
                                    design="line"
                                />
                                
                            </div>
                            <div className="mt-2">
                                <SignaturePad
                                    width={192}
                                    height={30}
                                    design="line"
                                />
                            </div>

                        </td>

                    </tr>

                    {/* Mobile */}

                    <tr>

                        <td className="text-start">

                            <strong>मो. नं.</strong>

                            <div className="mt-2">
                                <SignaturePad
                                    width={192}
                                    height={30}
                                    design="line"
                                />
                            </div>

                        </td>

                        <td className="text-start">

                            <strong>मो. नं.</strong>

                            <div className="mt-2">
                                <SignaturePad
                                    width={192}
                                    height={30}
                                    design="line"
                                />
                            </div>

                        </td>

                        <td className="text-start">

                            <strong>मो. नं.</strong>
                            <div className="mt-2">
                                <SignaturePad
                                    width={192}
                                    height={30}
                                    design="line"
                                />
                            </div>

                        </td>

                    </tr>

                    {/* Signature */}

                    <tr>

                        <td className="text-start">

                            <strong>सही </strong>

                            <div className="mt-2">
                                <SignaturePad
                                    width={192}
                                    height={40}
                                    design="border"
                                />
                            </div>

                        </td>

                        <td className="text-start">

                            <strong>सही</strong>

                            <div className="mt-2">
                                <SignaturePad
                                    width={192}
                                    height={40}
                                    design="border"
                                />
                            </div>

                        </td>

                        <td className="text-start">

                            <strong>सही</strong>

                            <div className="mt-2">
                                <SignaturePad
                                    width={192}
                                    height={40}
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

export default WitnessRelativeTable;