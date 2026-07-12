import React from "react";

function DeclarationHeader() {
    return (
        <div>
            <div className="card shadow-sm mb-1 p-1">

                <div className="row">

                    <div className="col-md-4">

                        <strong>ANAESTHESIA DATE</strong>
                        <br />
                        <input type="date" />
                    </div>

                    <div className="col-md-4">

                        <strong>START TIME</strong>
                        <br />
                        <input type="time" />
                    </div>
                    <div className="col-md-4">

                        <strong>END TIME</strong>
                        <br />
                        <input type="time" />
                    </div>
                </div>
                <br />
            </div>
        </div>
    )
}

export default DeclarationHeader;