import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function NoteMoreInfo() {
    return (
        <div>
            <div className="card p-3">

                <p>
                    COUNSELING DONE TO PATIENTS AND RELATIVES, RISKS EXPLAINED,
                    PATIENT ACCEPTED RISKS, PREMEDICATION NOTED,
                    NECESSARY MEDICINES AND EQUIPMENTS CHECKED.
                </p>

                <p>
                    XYLOCAINE SENSITIVITY TEST IS
                    <SignaturePad width={700} height={30} design="line" />
                </p>

                <p>
                    PLAN
                    <SignaturePad width={700} height={30} design="line" />
                </p>
                <br />

                <b className="text-center fw-bold text-decoration-underline">
                    ANAESTHESIA NOTES DETAILS
                </b>
                <br />
                                

                <p>
                    AFTER PAINTING AND DRAPING LOCAL ANAESTHESIA INJECTION
                    <SignaturePad width={700} height={30} design="line" />
                    DILUTED IN
                    <SignaturePad width={700} height={30} design="line" />
                    / PLAIN UNDILUTED
                </p>

                <p>
                    INJECTED IN
                    <SignaturePad width={700} height={30} design="line" />
                    AROUND THE
                    <SignaturePad width={700} height={30} design="line" />
                </p>

                <p>
                    TOTAL QUANTITY
                    <SignaturePad width={700} height={30} design="line" />
                </p>
                <br />

                <b className="text-center fw-bold text-decoration-underline">
                    INTRA OPERATIVE MONITERING
                </b>
                <br />

                <p>
                    INTRAOPERATIVE MONITORING OF VITAL PARAMETERS DONE ON
                    <SignaturePad width={700} height={30} design="line" />
                    AND ALL WERE WITHIN NORMAL LIMIT DURING OPERATION TIME.
                </p>
                <br />

                <b className="text-center fw-bold text-decoration-underline">
                    POST ANAESTHESIA ADVISE
                </b>
                <br />

                <p>
                    AT THE END OF ANAESTHESIA PATIENT CONSCIOUS, WELL ORIENTED AND MOVING ALL LIMBS
                </p>

                <div className="row mt-2">
                    <div className="col-md-3">
                        PR :
                        <SignaturePad width={100} height={30} design="line" />
                    </div>

                    <div className="col-md-3">
                        BP :
                        <SignaturePad width={100} height={30} design="line" />
                    </div>

                    <div className="col-md-3">
                        PO₂ :
                        <SignaturePad width={100} height={30} design="line" />
                    </div>

                    <div className="col-md-3">
                        ALDRETE SCORE :
                        <SignaturePad width={80} height={30} design="line" />
                    </div>
                </div>

                <div className="mt-3">
                    ADVICE :
                    <SignaturePad width={700} height={30} design="line" />
                </div>

                <div className="mt-3">
                    MONITOR PR / BP / PO₂ FOR NEXT
                    <SignaturePad width={700} height={30} design="line" />
                    HRS
                </div>
                

            </div>

        </div>
    )
}

export default NoteMoreInfo;