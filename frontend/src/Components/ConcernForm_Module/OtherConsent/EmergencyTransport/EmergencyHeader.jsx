import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function EmergencyHeader() {
    return (
        <div>

            {/* Heading */}

            

            {/* Row 1 */}

            <div className="row ">

                <div className="col-md-3">
                    <label className="fw-bold">
                        Call Received At :
                    </label>
                    <br /><br />
                    <input type="time"/>
                </div>

                <div className="col-md-6">
                    <label className="fw-bold">
                        Call Received By :
                    </label>
                    <SignaturePad
                        width={300}
                        height={30}
                        design="line"
                    />
                </div>

                <div className="col-md-3">
                    <label className="fw-bold">
                        Date :
                    </label>
                    <br /><br />

                    <input type="date"/>
                </div>

            </div>

            <br />

            {/* Call Given */}

            <div className="mb-4">

                <label className="fw-bold d-block mb-2">
                    Call Given By :
                </label>

                <div className="d-flex gap-4 flex-wrap">

                    <label>
                        <input type="checkbox" /> Hospital
                    </label>

                    <label>
                        <input type="checkbox" /> Doctor
                    </label>

                    <label>
                        <input type="checkbox" /> Marketing
                    </label>

                    <label>
                        <input type="checkbox" /> Patient Self
                    </label>

                </div>

            </div>

            {/* Informed */}

            <div className="mb-4">

                <label className="fw-bold d-block mb-2">
                    Informed To Ambulance Facility :
                </label>

                <div className="d-flex gap-4 flex-wrap">

                    <label>
                        <input type="checkbox" /> Emergency
                    </label>

                    <label>
                        <input type="checkbox" /> IPD
                    </label>

                    <label>
                        <input type="checkbox" /> OPD
                    </label>

                    <label>
                        <input type="checkbox" /> Scan
                    </label>

                    <label>
                        <input type="checkbox" /> MRI
                    </label>

                </div>

            </div>

            <div className="row mb-4">

                <div className="col-md-5">

                    <label className="fw-bold">
                        Patient Name :
                    </label>

                    <SignaturePad
                        width={300}
                        height={30}
                        design="line"
                    />

                </div>

                <div className="col-md-2">

                    <label className="fw-bold">
                        Age :
                    </label>

                    <SignaturePad
                        width={90}
                        height={30}
                        design="line"
                    />

                </div>

                <div className="col-md-2">

                    <label className="fw-bold d-block">
                        Sex :
                    </label>

                    <label className="me-3">
                        <input type="checkbox" /> Male
                    </label>
                    <br />

                    <label>
                        <input type="checkbox" /> Female
                    </label>

                </div>

                <div className="col-md-3">

                    <label className="fw-bold">
                        Contact :
                    </label>

                    <SignaturePad
                        width={150}
                        height={30}
                        design="line"
                    />

                </div>

            </div>

            {/* Address */}

            <div className="mb-4">

                <label className="fw-bold">
                    Address :
                </label>

                <SignaturePad
                    width={700}
                    height={60}
                    design="line"
                />

            </div>

            {/* Request */}

            <div className="mb-4">

                <label className="fw-bold">
                    Request For :
                </label>

                <SignaturePad
                    width={700}
                    height={50}
                    design="line"
                />

            </div>

            {/* Time */}

            <div className="row mb-5">

                <div className="col-md-6">

                    <label className="fw-bold">
                        Departure Time :
                    </label>

                    <SignaturePad
                        width={250}
                        height={30}
                        design="line"
                    />

                </div>

                <div className="col-md-6">

                    <label className="fw-bold">
                        Reached Spot At :
                    </label>

                    <SignaturePad
                        width={250}
                        height={30}
                        design="line"
                    />

                </div>

            </div>

            {/* Crew */}

            <b className="fw-bold mb-4">
                AMBULANCE CREW :
            </b>

            <br /><br />


            <div className="row">

                <div className="col-md-6">

                    <div className="mb-4">

                        <label className="fw-bold">
                            Doctor :
                        </label>

                        <SignaturePad
                            width={350}
                            height={30}
                            design="line"
                        />

                    </div>

                    <div className="mb-4">

                        <label className="fw-bold">
                            Nursing :
                        </label>

                        <SignaturePad
                            width={350}
                            height={30}
                            design="line"
                        />

                    </div>

                    <div className="mb-4">

                        <label className="fw-bold">
                            Driver :
                        </label>

                        <SignaturePad
                            width={350}
                            height={30}
                            design="line"
                        />

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="mb-4">

                        <label className="fw-bold">
                            Relative Name :
                        </label>

                        <SignaturePad
                            width={350}
                            height={30}
                            design="line"
                        />

                    </div>

                    <div className="mb-4">

                        <label className="fw-bold">
                            Relationship :
                        </label>

                        <SignaturePad
                            width={350}
                            height={30}
                            design="line"
                        />

                    </div>

                    <div className="mb-4">

                        <label className="fw-bold">
                            Signature :
                        </label>

                        <SignaturePad
                            width={200}
                            height={40}
                            design="border"
                        />

                    </div>

                </div>

            </div>

        </div>
    );
}

export default EmergencyHeader;