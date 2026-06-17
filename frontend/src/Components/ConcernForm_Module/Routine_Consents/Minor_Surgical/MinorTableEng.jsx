import React from "react";
import SignaturePad from "../SignaturePad";

function MinorTableEng() {
    return (
        <div>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontFamily: "Times New Roman"
                }}
            >

                <tbody>

                    <tr>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px",
                                width: "40%"
                            }}
                        >
                            <b>Procedure Name:</b>
                            <SignaturePad width="300px" height="30px" design="line"/>

                        </td>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px"
                            }}
                        >
                            <b>
                                Procedure Planned for Diagnosis/Treatment of:
                            </b>
                            <SignaturePad width="305px" height="30px" design="line"/>
                        </td>

                    </tr>
                    <tr>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px",
                                width: "40%"
                            }}
                        >
                            Emergency

                            <input
                                type="checkbox"
                                style={{
                                    marginLeft: "5px",
                                    marginRight: "20px"
                                }}
                            />

                            Elective

                            <input
                                type="checkbox"
                                style={{
                                    marginLeft: "5px",
                                    marginRight: "20px"
                                }}
                            />
                        </td>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px"
                            }}
                        >
                            <b>
                                Name of the Doctor :
                            <span style={{display:"inline-block"}}><SignaturePad width={170} height={25} design="line"/></span>
                            </b>

                        </td>

                    </tr>
                    <tr>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px",
                                width: "40%"
                            }}
                        >
                            Date and Time of Procedure
                        </td>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px"
                            }}
                        >
                            
                            <SignaturePad width="305" height="30px" design="line"/>


                        </td>

                    </tr>

                     <tr>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px",
                                width: "40%"
                            }}
                        >
                            <b>Anaesthesia Used</b>
                            
                        </td>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px"
                            }}
                        >
                            Yes

                            <input
                                type="checkbox"
                                style={{
                                    marginLeft: "5px",
                                    marginRight: "50px"
                                }}
                            />

                            No

                            <input
                                type="checkbox"
                                style={{
                                    marginLeft: "5px",
                                    marginRight: "50px"
                                }}
                            />

                        </td>

                    </tr>
                    <tr>

                        <td
                            colSpan="2"
                            style={{
                                border: "1px solid black",
                                padding: "8px",
                                height: "40px"
                            }}
                        >
                            Type of Anesthesia and Drug Name with Strength : <span><SignaturePad width="400px" height="80px" design="none"/></span>


                        </td>


                    </tr>

                </tbody>

            </table>

            <br /><br />

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontFamily: "Times New Roman"
                }}
            >

                <tbody>

                    <tr>

                        <td
                            colSpan="3"
                            style={{
                                border: "1px solid black",
                                padding: "10px",
                                height: "140px",
                                verticalAlign: "top"
                            }}
                        >

                            <b>
                                Individual Risks (to be completed by the doctor/
                                anaesthetist completing this form)
                            </b>

                            <br />

                            Examples of possible risks and complications
                            specific to this patient:

                            <br /><br />

                            1.&nbsp;&nbsp; <span><SignaturePad width="650px" height="40px" design="line"/></span><br /><br />
                            2.&nbsp;&nbsp; <span><SignaturePad width="650px" height="40px" design="line"/></span><br /><br />
                            3.&nbsp;&nbsp; <span><SignaturePad width="650px" height="40px" design="line"/></span>

                           

                        </td>

                    </tr>

                    <tr>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px",
                            }}
                        >

                            Signature of the Patient/ Family Member
                            <SignaturePad width="200px" height="40px" />

                        </td>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px",

                            }}
                        >
                            Date  <SignaturePad width="130px" height="40px" design="line"/>
                            
                        </td>
                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px",
                            }}
                        >

                            Time <SignaturePad width="130px" height="40px" design="line"/>


                        </td>

                    </tr>

                    <tr>

                        <td
                            colSpan="2"
                            style={{
                                border: "1px solid black",
                                padding: "8px",
                                width:"40%"
                            }}
                        >

                            Name of the family member
                            (If the patient cannot sign or minor)
                            <SignaturePad width="400px" height="35px" design="line"/>

                        </td>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px"
                            }}
                        >

                            Relationship
                            <SignaturePad width="260px" height="35px" design="line"/>

                        </td>

                    </tr>

                    <tr>

                        <td
                            colSpan="2"
                            style={{
                                border: "1px solid black",
                                padding: "8px"
                            }}
                        >

                            Name & Signature of the Nursing Staff
                            <SignaturePad width="400px" height="35px" design="line"/>



                        </td>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px"
                            }}
                        >

                            Nurse Signature
                            <SignaturePad width="200px" height="40px" />

                        </td>

                    </tr>

                    <tr>

                        <td
                            colSpan="2"
                            style={{
                                border: "1px solid black",
                                padding: "8px",
                                height: "60px"
                            }}
                        >

                            Name & Signature of the Doctor
                            <SignaturePad width="400px" height="35px" design="line"/>

                        </td>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px"
                            }}
                        >

                            Doctor Signature
                            <SignaturePad width="200px" height="40px" />


                        </td>

                    </tr>

                </tbody>

            </table>
        </div>
    );
}

export default MinorTableEng;