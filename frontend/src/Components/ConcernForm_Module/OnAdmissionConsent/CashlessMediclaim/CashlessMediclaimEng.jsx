import React from "react";
import "../CommonCode/FormBasic.css";


function CashlessMediclaimEng() {
    return (
        <div >
            <div>
                <b className="title" style={{ display: "block" }}>CONSENT LETTER FOR CASHLESS MEDICLAIM</b>
                <br />
                <strong className="paragraph">
                    <u>
                        Consent To Pay Bills, NME, If Cashless Not Approved Or Partially Approved.
                    </u>
                </strong>
                <br />

                <p className="paragraph">
                    <u>
                        I / Patient is agree to make payment in all below & alike situations and giving consent for the same by signing below:
                    </u>
                </p>
                

                <ol>
                    <li>Non-medical expenses, hospital administration charges, and other charges deducted at the time of final approval.</li>

                    <li>Approval not issued by the Insurance Company / TPA or denial of the cashless facility.</li>

                    <li>Cashless facility denied by the Insurance Company / TPA and the patient is advised to claim reimbursement.</li>

                    <li>Initial approval granted, but rejected at the time of discharge.</li>

                    <li>Cashless request rejected or denied due to any other reason.</li>

                    <li>Payment not received from the Insurance Company / TPA within 2–3 months from the date of discharge.</li>

                    <li>Approval granted, but payment delayed or disputed due to technical or other reasons (Refundable Payment / Security Cheque).</li>
                </ol>

            </div>

        </div>

    )
}

export default CashlessMediclaimEng;