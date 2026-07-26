import React, {
    useEffect,
    useState,
    forwardRef
} from "react";

import EstimateMar from "./EstimateMar";

const EstimateMarEng = forwardRef(

    (
        {
            patient,
            onSave
        },
        ref
    ) => {

        const [estimateData, setEstimateData] = useState({

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

                consentType: "KharchConsent",

                declaration: estimateData

            };

            console.log("KharchConsent =", finalData);

            if (onSave) {

                onSave(finalData);

            }

        }, [

            estimateData,
            patient,
            onSave

        ]);

        return (

            <div ref={ref}>

                <EstimateMar

                    patient={patient}

                    onDataChange={setEstimateData}

                />

            </div>

        );

    }

);

export default EstimateMarEng;