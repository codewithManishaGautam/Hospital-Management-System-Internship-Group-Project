import React from "react";
import SignaturePad from "../SignaturePad";

function DeclarationPICC({patientSign,parentName,parentSign,patientRelative,date}) 
{
    return(
        <div>
            <div className="card border-2">
    <div className="card-body">

        <div className="row mb-3">
            <div className="col-md-6">
                <strong>{patientSign}</strong><br />
                <span className="ms-2">
                    <SignaturePad
                    width={200}
                    height={40}
                    design="border"
                />
                </span>
            </div>

            <div className="col-md-6">
                <strong>{parentName}</strong><br />
                <SignaturePad
                    width={300}
                    height={30}
                    design="line"
                />
            </div>


            
          
            
        </div>

        <div className="row">

            

            <div className="col-md-4">
                <strong>{parentSign}</strong><br />
                <SignaturePad
                    width={200}
                    height={40}
                    design="border"
                />
            </div>
       
       
            <div className="col-md-4">
                <strong>{patientRelative}</strong><br />
                <SignaturePad
                    width={200}
                    height={40}
                    design="line"
                />
            </div>

            <div className="col-md-4">
                <strong>{date}</strong><br />
                <input type="date"/>
            </div>
        </div>

    </div>
</div>
        </div>
    )
}

export default  DeclarationPICC;