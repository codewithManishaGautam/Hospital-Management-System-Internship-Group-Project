import React from "react";
import "./FormChart.css";
import SignaturePad from "../SignaturePad";

function FormChart({showInterpreterDeclaration=true, showOtherDeclaration=true}) {

    
    const rows = [
        "Patient (रुग्ण)",
        "Patient's Relative (रुग्णाचे नातेवाईक)",
        "Doctor (डॉक्टर)",
        ...(showOtherDeclaration ? ["Nurse (परिचारिका)"] : []),
        "Witness (साक्षीदार)",
        "Interpreter (दुभाषा)",
    ];

    

    

    return (
        <div className="container-fluid border p-0">
            <table
                className="table table-bordered mb-0"
                style={{
                    tableLayout: "fixed",
                    width: "100%",
                }}
            >
                <colgroup>
                    <col style={{ width: "21%" }} />
                    <col style={{ width: "39%" }} />
                    <col style={{ width: "21%" }} />
                    <col style={{ width: "19%" }} />
                </colgroup>

                <tbody>
                    {/* Header */}

                {
                    showOtherDeclaration &&(
                    <tr>
                        <td colSpan="2">
                            <strong>Procedure :</strong>

                            <label className="ms-3">
                                Emergency
                                <input
                                    type="checkbox"
                                    className="ms-1"
                                />
                            </label>

                            <label className="ms-4">
                                Elective
                                <input
                                    type="checkbox"
                                    className="ms-1"
                                />
                            </label>
                        </td>

                        <td colSpan="2">
                            <strong>Date of Surgery :</strong>

                            <input
                                type="date"
                                className="form-control border-0 d-inline-block ms-2"
                                style={{ width: "180px" }}
                            />
                        </td>
                    </tr>
                    )
                }

                    {/* Interpreter Declaration */}

                    {
                        showInterpreterDeclaration &&(
                        <tr>
                            <td colSpan="4">
                                <strong>
                                    DECLARATION BY INTERPRETER
                                </strong>

                                <span className="ms-2">
                                    (if Applicable)
                                </span>

                                <span className="ms-4">
                                    Language Used :
                                    <SignaturePad
                                        width={150}
                                        height={40}
                                        design="line"
                                    />
                                </span>

                                <br />

                                I confirm that I have accurately interpreted
                                the contents of this form and the related
                                conversations between the patient and doctor. <span><SignaturePad width={300} height={30} design="none"/></span>
                            </td>
                        </tr>
                        )

                    }

                    {/* Marathi Declaration */}

                {
                        showOtherDeclaration &&(
                    <tr>
                        <td colSpan="4">
                            <strong>
                                रुग्णाला कोणत्या भाषेत समजावून सांगितले :
                            </strong>

                            <span
                                style={{
                                    borderBottom:
                                        "1px solid black",
                                }}
                            >
                                <SignaturePad
                                    width={150}
                                    height={40}
                                    design="none"
                                />
                            </span>

                            <span className="ms-5">
                                <strong>भाषा :</strong>

                                <span
                                    style={{
                                        borderBottom:
                                            "1px solid black",
                                    }}
                                >
                                    <SignaturePad
                                        width={150}
                                        height={40}
                                        design="none"
                                    />
                                </span>
                            </span>

                            <br /> <br />

                            मी असे जाहीर करतो की, मी या
                            संमतीपत्राचे व डॉक्टरांनी दिलेल्या
                            माहितीचे अचूक भाषांतर रुग्णाला
                            समजेल त्या भाषेत केले आहे.
                        </td>
                    </tr>
                    )
                }


                    {/* Table Header */}
                    <tr className="text-center fw-bold">
                        <td></td>

                        <td>
                            Name (नाव)
                        </td>

                        <td>
                            Sign / Thumb Impression
                            <br />
                            (सही / अंगठा)
                        </td>

                        <td>
                            Date & Time
                            <br />
                            (तारीख व वेळ)
                        </td>
                    </tr>

                    {/* Dynamic Rows */}
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td>{row}</td>

                            <td>
                                <div className="d-flex justify-content-center">
                                    <SignaturePad
                                        width={250}
                                        height={35}
                                        design="none"
                                    />
                                </div>
                            </td>

                            <td>
                                <div className="d-flex justify-content-center">
                                    <SignaturePad
                                        width={150}
                                        height={35}
                                        design="none"
                                    />
                                </div>
                            </td>

                            <td>
                                <input
                                    type="datetime-local"
                                    className="form-control border-0"
                                />
                            </td>
                        </tr>
                    ))}

                    {/* Witness Address */}
                {
                    showOtherDeclaration &&(
                    <tr>
                        <td>
                            Witness Address
                            <br />
                            (साक्षीदाराचा पत्ता)
                        </td>

                        <td colSpan="3">
                            <SignaturePad
                                width={550}
                                height={40}
                                design="none"
                            />
                        </td>
                    </tr>
                    )
                }

                    {/* Note */}
                
                {
                    showOtherDeclaration &&(

                
                    <tr>
                        <td>
                            <strong>Note :</strong>
                        </td>

                        <td colSpan="3">

                        {
                        showInterpreterDeclaration &&(
                           
                            <p>

                                If the patient cannot sign or patient is minor,
                                take sign of Next Kin / Surrogate /
                                Legal Guardian / Person Authorised by Patient.
                            </p>

                        )
                        }
                          

                            <br />

                            रुग्ण स्वतः स्वाक्षरी करू शकत नसल्यास
                            किंवा रुग्ण अल्पवयीन असल्यास पालक /
                            जवळचे नातेवाईक / रुग्णाकडून अधिकृत
                            केलेल्या व्यक्तीची सही घ्यावी.
                        </td>
                    </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
}

export default FormChart;




