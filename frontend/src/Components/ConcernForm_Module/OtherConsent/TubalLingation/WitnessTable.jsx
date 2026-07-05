import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import StampUpload from "../CommonCode/StampUpload"
import "./style/WitnessTable.css"

function WitnessTable() {
    return (
        <div className="table-responsive mt-3">

            <table className="table table-bordered w-100">

                <colgroup>
                    <col style={{ width: "55%" }} />
                    <col style={{ width: "45%" }} />
                </colgroup>

                <thead>
                    <tr className="text-center">
                        <th>साक्षीदार</th>
                        <th>पेशंट / नातेवाईक</th>
                    </tr>
                </thead>

                <tbody>

                    {/* Row 1 */}

                    <tr>

                        <td>

                            <div className="mb-4">

                                <strong>सही :</strong>

                                <div className="mt-2">
                                    <SignaturePad
                                        width={200}
                                        height={40}
                                        design="border"
                                    />
                                </div>

                            </div>

                            <div>

                                <strong>नाव :</strong>

                                <div className="mt-2">
                                    <SignaturePad
                                        width={300}
                                        height={30}
                                        design="line"
                                    />
                                </div>

                            </div>

                        </td>

                        <td>

                            <strong>सही किंवा डाव्या हाताचा अंगठा</strong>

                            <div className="mt-2">
                                <SignaturePad
                                    width={200}
                                    height={45}
                                    design="border"
                                />
                            </div>

                        </td>

                    </tr>

                    {/* Row 2 */}

                    <tr>

                        <td>

                            <strong>पत्ता :</strong>

                            <div className="mt-2">
                                <SignaturePad
                                    width={350}
                                    height={55}
                                    design="line"
                                />
                            </div>
                            <div className="mt-2">
                                <SignaturePad
                                    width={350}
                                    height={55}
                                    design="line"
                                />
                            </div>


                        </td>
                        <td>

                        <strong>सही किंवा डाव्या हाताचा अंगठा</strong>

                            <div className="mt-2">
                                <StampUpload showName={false}/>
                            </div>

                        </td>

                        

                    </tr>

                    {/* Row 3 */}

                    <tr>

                        <td>

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <strong>वय 
                                        <span><SignaturePad
                                        width={90}
                                        height={30}
                                        design="line"
                                        /></span>
                                        वर्ष 
                                    </strong>
                                </div>
                            </div>

                            
                            <div className="d-flex justify-content-between align-items-center">
                                <div>

                                    <strong>ता.</strong>
                                    <br />
                                    <input type="date"/>

                                </div>

                                <div>

                                    <strong>वेळ :</strong>
                                    <br />
                                    <input type="time"/>
                                </div>
                            </div>


                        </td>

                        <td>
                            <br /><br />

                            <div className="d-flex justify-content-between align-items-center">
                                <div>

                                    <strong>ता.</strong>
                                    <br />
                                    <input type="date"/>

                                </div>

                                <div>

                                    <strong>वेळ :</strong>
                                    <br />
                                    <input type="time"/>
                                </div>
                            </div>



                        </td>

                    </tr>

                </tbody>

            </table>

        </div>
    );
}

export default WitnessTable;