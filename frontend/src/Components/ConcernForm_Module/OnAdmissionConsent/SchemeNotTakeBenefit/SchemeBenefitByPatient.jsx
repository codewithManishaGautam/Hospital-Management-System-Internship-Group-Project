import React from "react";
import SchemeForm from "./SchemeForm";

function SchemeBenefitByPatient() 
{
    return(
        <div>
            <SchemeForm 
            patientOrRelativeSign="रुग्णाची सही"
            showRelativeForm={false} />
        </div>
    )
}

export default SchemeBenefitByPatient