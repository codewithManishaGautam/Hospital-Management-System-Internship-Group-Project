import React from "react";

import CashlessMediclaimMarEng from "./BillingConsent/CashlessMediclaim/CashlessMediclaimMarEng";
// import EstimateMarEng from "./BillingConsent/KharchConsent/EstimateMarEng";

function PatientForm({

    patient,
    selectedConsent,
    setSelectedConsent,
    onSave,
    consentRef

}) {

    const saveConsent = (data) => {

        console.log("PatientForm Data =", data);

        if (onSave) {

            onSave(data);

        }

    };

    return (

        <div>

            {/* ===========================
                Consent Dropdown
            ============================ */}

            <div className="mt-4">

                <h3>Billing Consent Forms</h3>
                <select
                    className="form-control"
                    value={selectedConsent}
                    onChange={(e) =>
                        setSelectedConsent(e.target.value)
                    }
                >

                    <option value="">
                        Select Consent Form
                    </option>

                    <option value="CashlessMediclaim">
                        Cashless Mediclaim
                    </option>

                    {/* <option value="KharchConsent">
                        Cost Consent Form
                    </option> */}

                </select>

            </div>
            <br /><br /><br />


            {

                selectedConsent === "CashlessMediclaim" && (

                    <CashlessMediclaimMarEng

                        ref={consentRef}

                        patient={patient}

                        onSave={saveConsent}

                    />

                )

            }

            {/* {

                selectedConsent === "KharchConsent" && (

                    <EstimateMarEng

                        ref={consentRef}

                        patient={patient}

                        onSave={saveConsent}

                    />

                )

            } */}

        </div>

    );

}

export default PatientForm;