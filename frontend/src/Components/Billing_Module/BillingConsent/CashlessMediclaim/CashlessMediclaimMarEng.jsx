

import React,
{
    useEffect,
    useState,
    forwardRef
} from "react";

import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import "./CashlessMediclaimMarEng.css";

import CashlessMediclaimMar from "./CashlessMediclaimMar";
import CashlessMediclaimEng from "./CashlessMediclaimEng";
import DeclarationCashlessMediclaim from "./DeclarationCashlessMediclaim";

const CashlessMediclaimMarEng = forwardRef(

    (
        {
            patient,
            onSave
        },
        ref
    ) => {

        const [declarationData, setDeclarationData] = useState({

            patientName: "",
            attendantName: "",
            relation: "",
            mobile: "",
            signature: "",
            thumb: ""

        });

        useEffect(() => {

            if (!patient) return;

            const finalData = {

                patientId: patient._id,

                patientName: patient.name,

                uhid: patient.uhid,

                consentType: "CashlessMediclaim",

                declaration: declarationData

            };

            console.log("CashlessMediclaimMarEng =", finalData);

            if (onSave) {

                onSave(finalData);

            }

        }, [

            declarationData,
            patient,
            onSave

        ]);

        return (

            <div

                ref={ref}

            >
                <div className="consent-form">


                    <h2 className="title">

                        श्रद्धा हॉस्पिटल, दौंड

                    </h2>

                    <h4 className="title">

                        कॅशलेस मेडिक्लेम

                    </h4>


                    <div className="page-section">
                        <Table_Form patient={patient} />
                    </div>
                </div>


                <div className="page-break"></div>

                <div className="consent-form">

                    <div className="page-section">
                        <CashlessMediclaimMar />
                        <CashlessMediclaimEng />
                    </div>
                </div>


                <div className="page-break"></div>

                <div className="consent-form">

                    <div className="page-section" style={{paddingBottom:"100px",marginBottom:"100px"}}>
                        <DeclarationCashlessMediclaim
                            patient={patient}
                            onDataChange={setDeclarationData}
                        />
                    </div>
                </div>



            </div>



        );

    }

);

export default CashlessMediclaimMarEng;