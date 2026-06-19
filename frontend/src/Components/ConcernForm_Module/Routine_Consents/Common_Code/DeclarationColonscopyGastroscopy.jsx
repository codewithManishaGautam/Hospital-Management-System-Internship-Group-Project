import React from "react";
import SignaturePad from "../SignaturePad";

function DeclarationColonscopyGastroscopy() 
{
    return(
        <div>
            <div className="card border-2">
    <div className="card-body">

        <div className="row mb-3">
            <div className="col-md-6">
                <strong>रुग्णाचे नाव :</strong><br />
                <span className="ms-2">
                    <SignaturePad
                    width={300}
                    height={30}
                    design="line"
                />
                </span>
            </div>


          
            <div className="col-md-6">
                <strong>रुग्णाची सही/ अंगठा :</strong><br />
                <SignaturePad
                    width={200}
                    height={40}
                    design="border"
                />
            </div>
        </div>

        <div className="row">
       
            <div className="col-md-6">
                <strong>नातेवाईकाचे नाव :</strong><br />
                <SignaturePad
                    width={300}
                    height={30}
                    design="line"
                />
            </div>
       
            <div className="col-md-6">
                <strong>नातेवाईकाची सही/अंगठा :</strong><br />
                <SignaturePad
                    width={200}
                    height={40}
                    design="border"
                />
            </div>
        </div>

    </div>
</div>
        </div>
    )
}

export default  DeclarationColonscopyGastroscopy;