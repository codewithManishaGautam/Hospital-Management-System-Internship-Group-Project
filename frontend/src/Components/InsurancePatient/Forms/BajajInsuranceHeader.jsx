import React from "react";
import "./Style/BajajInsuranceHeader.css";

import bajajLogo from "../../../assets/bajajlogo.jpg"

function BajajInsuranceHeader() {
    return (
        <div className="bajaj-insurance-header">

            {/* Left Side - Company Details */}
            <div className="bajaj-header-left">

                <div className="bajaj-company-name">
                    BAJAJ GENERAL INSURANCE LIMITED
                    <span>
                        (Formerly known as Bajaj Allianz General Insurance Co. Ltd.)
                    </span>
                </div>

                <div className="bajaj-address">
                    Bajaj Insurance House, Airport Road, Yerawada,
                    Pune - 411006.
                </div>

                <div className="bajaj-cin">
                    CIN: U66010PN2000PLC015329
                </div>

                <div className="bajaj-health-address">
                    <strong>
                        Head Office: Health Administration Team:
                    </strong>
                    *A - Wing 2nd Floor, Bajaj Finserv Building,
                    Behind Weikfield IT Park, Off Nagar Road,
                    Viman Nagar | Pune - 411 014
                </div>

                <div className="bajaj-contact">
                    <strong>Phone No.:</strong> 020-30305858 / 1800-103-2529
                    &nbsp;&nbsp;
                    <strong>Fax:</strong> 020-30512224/ 6 / 7
                    &nbsp;&nbsp;
                    <strong>Email:</strong> careforyou@bajajgeneral.com
                </div>

            </div>

            {/* Right Side - Logo */}
            <div className="bajaj-header-right">

                <div className="bajaj-logo-box">
                        <img src={bajajLogo}/>
                </div>

                <div className="block-letter-text">
                    (To be filled in block letters)
                </div>

            </div>

        </div>
    );
}

export default BajajInsuranceHeader;