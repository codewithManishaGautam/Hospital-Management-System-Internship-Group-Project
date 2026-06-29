import React from "react";

function ChecKBox() {
    return (
        <div>
            <div className="mt-2">

                <div className="d-flex align-items-center mb-2">
                    <div style={{ width: "160px", fontWeight: "600" }}>
                        Soft wrist
                    </div>

                    <label className="me-4">
                        Left <input type="checkbox" className="ms-1" />
                    </label>

                    <label className="me-4">
                        Right <input type="checkbox" className="ms-1" />
                    </label>

                    <label>
                        Both <input type="checkbox" className="ms-1" />
                    </label>
                </div>

                <div className="d-flex align-items-center">
                    <div style={{ width: "160px", fontWeight: "600" }}>
                        Soft ankle
                    </div>

                    <label className="me-4">
                        Left <input type="checkbox" className="ms-1" />
                    </label>

                    <label className="me-4">
                        Right <input type="checkbox" className="ms-1" />
                    </label>

                    <label>
                        Both <input type="checkbox" className="ms-1" />
                    </label>
                </div>

            </div>
        </div>
    )
}

export default ChecKBox;