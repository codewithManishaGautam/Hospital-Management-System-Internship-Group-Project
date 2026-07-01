import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import "../CommonCode/FormBasic.css";
import PatientDeclaration from "./PatientDeclaration";
import ChecKBox from "./CheckBox";

function RestraintMoreInfo() {
    return (
        <div>
            <div>
                <p>
                    <b>
                        A. Assessment And Initiation
                    </b>
                    <br />
                    <ul className="paragraph">
                        <li>
                            Check behaviour that warrant use of restraint
                        </li>

                        <li>
                            Attempting to remove tubes, lines, or IV's. or Dressing/Surgical wounds
                        </li>

                        <li>
                            Voluntary or involuntary movement that may re-injure a treated condition
                        </li>

                        <li>
                            Unable to follow directions or instruction
                        </li>

                        <li>
                            Others .....
                        </li>

                    </ul>
                </p>

                <div>
                    <table className="table table-bordered restraint-table mt-3"
                    style={{border:"1px solid #000"}}>
                        <thead>
                            <tr>
                                <th style={{ width: "78%" }}>
                                    Less restrictive method tried or considered (mark ✓ where apply)
                                </th>
                                <th style={{ width: "11%" }}>Yes</th>
                                <th style={{ width: "11%" }}>No</th>
                            </tr>
                        </thead>

                        <tbody>
                            {[
                                "Verbal intervention (e.g. talk calmly, give one direction at a time, reassurance)",
                                "Companionship (e.g family member, neighbour, friend)",
                                "Frequent monitoring (e.g place bed in direct view of nurse station)",
                                "Comfort measures (e.g frequent toileting, pain control, positioning)",
                                "Reality orientation (e.g explanation, glasses, hearing aids)",
                                "Environmental intervention (e.g reduce stimuli, decrease noise, reduce light, cover lines or tubes)",
                                "Relaxation techniques (e.g. soft music, slow deep breathing, dim lights)"
                            ].map((item, index) => (
                                <tr key={index}>
                                    <td>{item}</td>

                                    <td className="text-center">
                                        <input type="checkbox" />
                                    </td>

                                    <td className="text-center">
                                        <input type="checkbox" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="paragraph">
                    <b>
                        B. Patient / Family Education
                    </b>
                    Family informed of need for restraint and criteria for release
                    <PatientDeclaration />
                    Type of restraints used <br />
                    <ChecKBox />
                </p>

                <div>
                    <table className="table table-bordered restraint-table mt-3"
                    style={{border:"1px solid #000"}}>

                        <colgroup>
                            <col style={{ width: "13%" }} />
                            <col style={{ width: "13%" }} />
                            <col style={{ width: "19%" }} />
                            <col style={{ width: "19%" }} />
                            <col style={{ width: "36%" }} />
                        </colgroup>

                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Attending Consultant</th>
                                <th>Attending Nurse</th>
                                <th>Duration of order (not more than 24 hrs)</th>
                            </tr>
                        </thead>

                        <tbody>

                            {[1, 2, 3,4,5].map((_, index) => (
                                <tr key={index}>

                                    <td>
                                        <input
                                            type="date"
                                            style={{border:"none"}}
                                            width="auto"
                                        />
                                    </td>

                                    <td>
                                        <input
                                            type="time"
                                            style={{border:"none"}}
                                            width="auto"                                        />
                                    </td>

                                    <td>
                                        <SignaturePad width={120} height={30} design="none"/>
                                        <SignaturePad width={120} height={30} design="none"/>
                                    </td>

                                    <td>
                                        <SignaturePad width={120} height={30} design="none"/>
                                        <SignaturePad width={120} height={30} design="none"/>

                                    </td>

                                    <td>
                                        <SignaturePad width={150} height={30} design="none"/>
                                        <SignaturePad width={150} height={30} design="none"/>
                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>
                </div>



            </div>
        </div>
    )
}


export default RestraintMoreInfo;