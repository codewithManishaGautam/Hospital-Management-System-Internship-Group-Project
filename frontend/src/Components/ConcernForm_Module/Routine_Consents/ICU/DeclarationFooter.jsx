
import React from "react";
import SignaturePad from "../SignaturePad";


function DeclarationFooter({
    dateLabel,
    timeLabel,
    patientNameLabel,
    patientSignLabel,
    relativeTitle,
    relativeName,
    relativeSign,
    relationLabel,
    doctorNameLabel,
    doctorSignLabel,
    stampLabel,
    Stamp
}) {
    return (
        <div className="container mt-4">

            <div className="row mb-4">

                <div className="col-md-6">
                    <label className="fw-bold">{dateLabel}</label>
                        <input
                            type="date"
                        />
                </div>

                <div className="col-md-6">
                    <label className="fw-bold">{timeLabel}</label>
                        <input
                            type="time"
                        />
                </div>

            </div>

            <div className="row align-items-center mb-5">

                <div className="col-md-8">
                    <label className="fw-bold">{patientNameLabel}</label>
                    <SignaturePad width={300} height={35} design="line" />
                </div>

                <div className="col-md-4">
                    <label className="fw-bold">{patientSignLabel}</label>
                    <SignaturePad width={200} height={70} design="border" />
                </div>

            </div>

            <div className="card shadow-sm mb-4">

                <div className="card-header fw-bold">
                    {relativeTitle}
                </div>

                <div className="card-body">

                    <div className="row">

                        {[1, 2].map((item) => (
                            <div className="col-md-6" key={item}>

                                <label className="fw-semibold">
                                    {item}. {relativeName} :
                                </label>

                                <SignaturePad
                                    width={290}
                                    height={40}
                                    design="line"
                                />

                                <div className="mt-3">
                                    <label className="fw-semibold">
                                        {relativeSign}
                                    </label>

                                    <SignaturePad
                                        width={200}
                                        height={40}
                                        design="border"
                                    />
                                </div>

                                <div className="mt-3">
                                    <label className="fw-semibold">
                                        {relationLabel}
                                    </label>

                                    <SignaturePad
                                        width={300}
                                        height={40}
                                        design="line"
                                    />
                                </div>

                            </div>
                        ))}

                    </div>

                </div>

            </div>

            <div className="card shadow-sm mb-4">

                <div className="card-body">

                    <div className="row align-items-center">

                        <div className="col-md-8">
                            <label className="fw-bold">
                                {doctorNameLabel}
                            </label>

                            <SignaturePad
                                width={400}
                                height={40}
                                design="line"
                            />
                        </div>

                        <div className="col-md-4">

                            <label className="fw-bold">
                                {doctorSignLabel}
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

            <div className="row align-items-end">

                <div className="col-md-4">
                    <label className="fw-bold">{dateLabel}</label>
                    <input
                        type="date"
                    />
                </div>

                <div className="col-md-4">
                    <label className="fw-bold">{timeLabel}</label>
                    <input
                        type="time"
                    />                
                </div>

                <div className="col-md-4 text-center">
                    <label className="fw-bold d-block mb-2">
                        {stampLabel}
                    </label>

                    <img
                        src={Stamp}
                        width="100"
                        height="100"
                        alt="Stamp"
                    />
                </div>

            </div>

        </div>
    );
}

export default DeclarationFooter;