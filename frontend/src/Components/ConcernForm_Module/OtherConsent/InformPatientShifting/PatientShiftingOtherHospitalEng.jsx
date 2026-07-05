import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import HospitalTransferInfo from "./HospitalTransferInfo";
import PatientDeclaration from "./PatientDeclaration"

function PatientShiftingOtherHospital() {


    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital, Daund
            </h2>
            <h4 className="title">
                Informed Consent For Patient Shifting To Other Hospital
            </h4>

            <Table_Form />
            <div>
                <div className="row">
                    <div className="col-6">
                        DOD : <span><SignaturePad width={200} height={30} design="line" /></span>
                    </div>
                    <div className="col-6">
                        BED No : <span><SignaturePad width={200} height={30} design="line" /></span>
                    </div>
                </div>
                <br />

                <label >
                    Diagnosis :
                    <SignaturePad width={700} height={30} design="line" />
                </label>
                <label >
                    K/C/O :
                    <SignaturePad width={700} height={30} design="line" />
                </label>
                <label >
                    Cause of Shifting to other Hospital :
                    <SignaturePad width={700} height={30} design="line" />
                </label>
                <label >
                    Shift to (Transfer Hospital Name) :
                    <SignaturePad width={700} height={30} design="line" />
                </label>
                <label >
                    Under Super Consultant Name :
                    <SignaturePad width={700} height={30} design="line" />
                </label>
                <br />
                <HospitalTransferInfo />
                <br />

                <b className="paragraph">
                    Note: We received patients all belongings and Medical Reports from SHRADDHA HOSPITAL AND ICU.
                    After hand over the patient from SHRADDHA HOSPITAL AND ICU, Doctors/ Nurses or Any Other Staff Of
                    SHRADDHA HOSPITAL AND ICU is not responsible For Any Miss happening
                </b>
                <br /> <br />
                <PatientDeclaration/>

            </div>
        </div>
    )
}

export default PatientShiftingOtherHospital;