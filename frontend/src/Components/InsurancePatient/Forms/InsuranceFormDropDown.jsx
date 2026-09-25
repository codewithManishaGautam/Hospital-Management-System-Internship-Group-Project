import React, { useState } from "react";

import AdityaBirlaInsurance from "./AdityaBirlaInsurance";
import BajajInsurance from "./BajajInsurance";
import HDFCErgoInsurance from "./HDFCErgoInsurance";
import RelianceInsurance from "./RelianceInsurance";
import SBIInsurance from "./SBIInsurance";

function InsuranceFormDropDown({ patientId }) {

    const [selectedForm, setSelectedForm] = useState("");

    const handleFormChange = (e) => {
        setSelectedForm(e.target.value);
    };

    return (
        <div className="insurance-form-container">

            {/* Dropdown */}
            <select
                value={selectedForm}
                onChange={handleFormChange}
                className="insurance-dropdown"
            >
                <option value="">Select Insurance Form</option>

                <option value="aditya">
                    Aditya Birla Insurance
                </option>

                <option value="bajaj">
                    Bajaj Insurance
                </option>

                <option value="hdfc">
                    HDFC Ergo Insurance
                </option>

                <option value="reliance">
                    Reliance Insurance
                </option>

                <option value="sbi">
                    SBI Insurance
                </option>
            </select>


            {/* Selected Form */}

            <div className="selected-insurance-form">

                {selectedForm === "aditya" && (
                    <AdityaBirlaInsurance patientId={patientId} />
                )}

                {selectedForm === "bajaj" && (
                    <BajajInsurance patientId={patientId} />
                )}

                {selectedForm === "hdfc" && (
                    <HDFCErgoInsurance patientId={patientId} />
                )}

                {selectedForm === "reliance" && (
                    <RelianceInsurance patientId={patientId} />
                )}

                {selectedForm === "sbi" && (
                    <SBIInsurance patientId={patientId} />
                )}

            </div>

        </div>
    );
}

export default InsuranceFormDropDown;