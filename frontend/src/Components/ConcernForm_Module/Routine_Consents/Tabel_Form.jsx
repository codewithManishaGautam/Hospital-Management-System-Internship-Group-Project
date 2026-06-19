import React from "react";
import SignaturePad from "./SignaturePad";
import { getDateTime, getTodayDate } from "./GetDate_Time";
import "./Tabel_Form.css";

function Table_Form() {
    return (
        <div>
            <div className="date">
                <b>Date:</b> {getTodayDate()}
            </div>
            <table className="patient-table">

                <tbody>

                    <tr>
                        <td ><b>UHID :</b><span><SignaturePad width="145px" height="35px" design="border"/></span></td>
                        <td><b>DOA:</b> {getDateTime()}</td>
                        <td><b>Gender / Age :</b><span><SignaturePad width="100px" height="35px" design="border"/></span> </td>
                    </tr>

                    <tr>
                        <td>
                            <b>IPD ID</b><br />
                            <pre style={{display:"inline-flex"}}>
                            <SignaturePad width="70px" height="35px" design="border"/>
                            </pre>
                        </td>

                        <td>
                            <b>Patient Name</b><br />
                            <SignaturePad width="280px" height="35px" design="line"/>
                        </td>

                        <td>
                            <b>Consulting Doctor</b><br />
                            <SignaturePad width="180px" height="35px"  design="line"/>
                        </td>
                    </tr>



                </tbody>
            </table>
        </div>
    );
}

export default Table_Form;