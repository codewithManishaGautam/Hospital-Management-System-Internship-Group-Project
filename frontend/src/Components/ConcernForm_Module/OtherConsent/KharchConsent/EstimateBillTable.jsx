import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function EstimateBillTable() {
    const rows = [
        "रूम भाडे जनरल / सेमी जनरल / स्पेशल / डिलक्स / आय. सी. यू. .......... दिवस",
        "शस्त्रक्रिया व भूलांचे चार्जेस",
        "कन्सल्टेशन चार्जेस",
        "नर्सिंग चार्जेस",
        "फिजिओथेरपी चार्जेस",
        "प्री ऑप व पोस्ट ऑपरेटिव्ह लॅब चार्जेस",
        "प्री ऑप व पोस्ट ऑपरेटिव्ह रेडिओलॉजी चार्जेस",
        "इम्प्लांट चार्जेस",
        "ऑपरेशन १ :",
        "ऑपरेशन २ :",
    ];

    return (
        <div>
            <div>
                <table
                    className="table table-bordered"
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        tableLayout: "fixed",
                        border:"1px solid #000"
                    }}
                >
                    <colgroup>
                        <col style={{ width: "5%" }} />
                        <col style={{ width: "52%" }} />
                        <col style={{ width: "21%" }} />
                        <col style={{ width: "27%" }} />
                    </colgroup>

                    <thead>
                        <tr className="text-center">
                            <th>अ. <br />क्र.</th>
                            <th>तपशील</th>
                            <th>दर</th>
                            <th>एकूण रक्कम</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((item, index) => (
                            <tr key={index}>
                                <td className="text-center">{index + 1}.</td>

                                <td>{item}</td>

                                <td>
                                    <SignaturePad
                                        width={120}
                                        height={30}
                                        design="none"
                                    />
                                </td>

                                <td>
                                    <SignaturePad
                                        width={150}
                                        height={30}
                                        design="none"
                                    />
                                </td>
                            </tr>
                        ))}

                        <tr>
                            <td colSpan={2}></td>

                            <td
                                className="text-center"
                                style={{ fontWeight: "bold" }}
                            >
                                एकूण
                            </td>

                            <td>
                                <SignaturePad
                                    width={150}
                                    height={30}
                                    design="none"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>


            </div>
        </div>
    );
}

export default EstimateBillTable;