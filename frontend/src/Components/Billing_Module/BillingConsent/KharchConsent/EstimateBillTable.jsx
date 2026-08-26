


// import React from "react";
// import SignaturePad from "../CommonCode/SignaturePad";
// import "./EstimateBillTable.css";

// function EstimateBillTable() {
//     const rows = [
//         <>
//             रूम भाडे जनरल / सेमी जनरल / स्पेशल
//             <br />
//             डिलक्स / आय. सी. यू. .......... दिवस
//         </>,
//         "शस्त्रक्रिया व भूलांचे चार्जेस",
//         "कन्सल्टेशन चार्जेस",
//         "नर्सिंग चार्जेस",
//         "फिजिओथेरपी चार्जेस",
//         <>
//             प्री ऑप व पोस्ट
//             <br />
//             ऑपरेटिव्ह लॅब चार्जेस
//         </>,
//         <>
//             प्री ऑप व पोस्ट
//             <br />
//             ऑपरेटिव्ह रेडिओलॉजी चार्जेस
//         </>,
//         "इम्प्लांट चार्जेस",
//         "ऑपरेशन १ :",
//         "ऑपरेशन २ :",
//     ];

//     return (
//         <div >

//         <div className="estimate-table-wrapper">
//             <table
//     className="estimate-table"
// >
//     <colgroup>
//     <col style={{ width: "3%" }} />
//     <col style={{ width: "9%" }} />
//     <col style={{ width: "15%" }} />
//     <col style={{ width: "24%" }} />

//                 </colgroup>

//                 <thead className="all-width">
//                     <tr className="text-center">
//                         <th>अ.<br />क्र.</th>
//                         <th>तपशील</th>
//                         <th>दर</th>
//                         <th>एकूण रक्कम</th>
//                     </tr>
//                 </thead>

//                 <tbody className="all-width">
//                     {rows.map((item, index) => (
//                         <tr
//                             key={index}
//                             style={{
//                                 height: index === 0 ? "85px" : "60px"
//                             }}
//                         >
//                             <td
//                                 className="text-center align-middle"
//                                 style={{
//                                     verticalAlign: "middle"
//                                 }}
//                             >
//                                 {index + 1}
//                             </td>

//                             <td
//                                 style={{
//                                     verticalAlign: "middle",
//                                     whiteSpace: "normal",
//                                     wordBreak: "break-word",
//                                     textAlign: "center",
//                                     padding: "8px"
//                                 }}
//                             >
//                                 {item}
//                             </td>

//                             <td
//                                 style={{
//                                     verticalAlign: "middle",
//                                     padding: "5px"
//                                 }}
//                             >
//                                 <SignaturePad
//                                     height={30}
//                                     design="none"
//                                 />
//                             </td>

//                             <td
//                                 style={{
//                                     verticalAlign: "middle",
//                                     padding: "5px",
//                                 }}
//                             >
//                                 <SignaturePad
//                                     height={30}
//                                     design="none"
//                                 />
//                             </td>
//                         </tr>
//                     ))}

//                     {/* <tr style={{ height: "60px" }}>
//                         <td colSpan={2}></td>

//                         <td
//                             className="text-center"
//                             style={{
//                                 fontWeight: "bold",
//                                 verticalAlign: "middle"
//                             }}
//                         >
//                             एकूण
//                         </td>

//                         <td style={{ padding: "5px" }}>
//                             <SignaturePad
//                                 height={30}
//                                 design="none"
//                             />
//                         </td>
                        
//                     </tr> */}
//                 </tbody>
//             </table>
//         </div>
//      </div>
//     );
// }

// export default EstimateBillTable;



import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import "./EstimateBillTable.css";

function EstimateBillTable() {
    const rows = [
        <>
            रूम भाडे जनरल / सेमी जनरल / स्पेशल
            <br />
            डिलक्स / आय. सी. यू. .......... दिवस
        </>,
        "शस्त्रक्रिया व भूलांचे चार्जेस",
        "कन्सल्टेशन चार्जेस",
        "नर्सिंग चार्जेस",
        "फिजिओथेरपी चार्जेस",
        <>
            प्री ऑप व पोस्ट
            <br />
            ऑपरेटिव्ह लॅब चार्जेस
        </>,
        <>
            प्री ऑप व पोस्ट
            <br />
            ऑपरेटिव्ह रेडिओलॉजी चार्जेस
        </>,
        "इम्प्लांट चार्जेस",
        "ऑपरेशन १ :",
        "ऑपरेशन २ :",
    ];

    return (
        <div className="estimate-bill-wrapper">

            <table className="estimate-bill-table">

                <colgroup>
                    <col style={{ width: "3%" }} />
                    <col style={{ width: "9%" }} />
                    <col style={{ width: "9%" }} />
                    <col style={{ width: "30%" }} />
                </colgroup>

                <thead>
                    <tr>
                        <th>
                            अ.<br />क्र.
                        </th>

                        <th>
                            तपशील
                        </th>

                        <th>
                            दर
                        </th>

                        <th>
                            एकूण रक्कम
                        </th>
                    </tr>
                </thead>

                <tbody>

                    {rows.map((item, index) => (
                        <tr
                            key={index}
                            style={{
                                height: index === 0 ? "85px" : "60px"
                            }}
                        >

                            {/* Serial Number */}
                            <td className="estimate-serial">
                                {index + 1}
                            </td>

                            {/* Description */}
                            <td className="estimate-description">
                                {item}
                            </td>

                            {/* Rate */}
                            <td className="estimate-signature-cell">
                                <SignaturePad
                                    height={30}
                                    design="none"
                                />
                            </td>

                            {/* Total Amount */}
                            <td className="estimate-signature-cell">
                                <SignaturePad
                                    height={30}
                                    design="none"
                                />
                            </td>

                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default EstimateBillTable;