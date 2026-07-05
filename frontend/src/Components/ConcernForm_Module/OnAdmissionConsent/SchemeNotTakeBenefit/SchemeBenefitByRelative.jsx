import React from "react";
import SchemeForm from "./SchemeForm";

function SchemeBenefitByRelative() 
{
    return(
        <div>
            <SchemeForm 
            patientOrRelativeSign="रुग्णाच्या नातेवाईकाची सही"
            showPatientForm={false} />
        </div>
    )
}

export default SchemeBenefitByRelative