import React from "react";
import Table_Form from "../Tabel_Form";
import SignaturePad from "../SignaturePad";
import "../Minor_Surgical/MinorEnglish.css";
import ThrombolysisDeclaration from "./ThrombolysisDeclaration";

function ThrombolysisEng() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital,Daund
            </h2>
            <h4 className="title">
                Consent for Thrombolysis
            </h4>

            <Table_Form />

            <div>
                <p className="paragraph">
                    Our Patient <span><SignaturePad width={280} height={40} design="line" /></span> needs to be started on<span><SignaturePad width={190} height={40} design="line" /></span>
                    medicine because he/she has Intra vascular thrombosis (clot in vessels). It has been explained my doctor
                    <span><SignaturePad width={280} height={40} design="line" /></span> that this drug causes thinning of blood which is essential for my patients
                    conditions. As a side effect it may cause bleeding in the brain, stomach, mouth or any other site, which May sometimes be even
                    fatal/life threatening. But taking into consideration the benefits of this drug. We are giving permission to administer this drug.
                    This has been explained to me by Dr. <span><SignaturePad width={280} height={40} design="line" /></span>
                    In my own language and clearly understood by me that the benefits of this drug is out weigh the risk.
                    In case of any untoward reaction with this drug (including death) will not held hospital staff, administration or doctor
                    responsible.

                </p>
                <ThrombolysisDeclaration
                    doctorSign="Doctor Signature : "
                    doctorName="Name Of Dr : "
                    relativeSign="Relative Signature : "
                    relativeName="Name : "
                    patientRelation="Relation : "
                />
            </div>



        </div>

    )
}

export default ThrombolysisEng;