// import "../Billing_Module/style/InsuranceBtnAndCheck.css"

// export default function InsuranceBtnAndCheck() {
//     return (
//         <div className="main border border-warning rounded-3">
//             <h3 className="text-info text-center">
//                 Insurance Information
//             </h3>
//             <br />

//             <div className="d-flex align-items-center w-100">



//                 {/* Left side - 50% */}
//                 <div className="w-50">
//                     <button className="btn btn-success">
//                         Go to Insurance
//                     </button>
//                 </div>

//                 {/* Right side - 50% */}
//                 <div className="w-50">
//                     <div className="d-flex align-items-center w-100">

//                         {/* Insurance */}
//                         <div className="w-50">
//                             Insurance Confirmation
//                         </div>

//                         {/* Yes */}
//                         <div className="w-25">
//                             <div className="form-check">
//                                 <input
//                                     className="form-check-input"
//                                     type="radio"
//                                     name="insurance"
//                                     id="insuranceYes"
//                                     value="yes"
//                                 />
//                                 <label
//                                     className="form-check-label"
//                                     htmlFor="insuranceYes"
//                                 >
//                                     Yes
//                                 </label>
//                             </div>
//                         </div>

//                         {/* No */}
//                         <div className="w-25">
//                             <div className="form-check">
//                                 <input
//                                     className="form-check-input"
//                                     type="radio"
//                                     name="insurance"
//                                     id="insuranceNo"
//                                     value="no"
//                                 />
//                                 <label
//                                     className="form-check-label"
//                                     htmlFor="insuranceNo"
//                                 >
//                                     No
//                                 </label>
//                             </div>
//                         </div>

//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// }


import axios from "axios";
import "../Billing_Module/style/InsuranceBtnAndCheck.css";

export default function InsuranceBtnAndCheck({ patientId }) {

    const handleInsuranceChange = async (e) => {

        const insuranceYesOrNot = e.target.value === "yes";

        try {

            const response = await axios.patch(
                `http://localhost:5000/patient/${patientId}/insurance-confirm`,
                {
                    insuranceYesOrNot: insuranceYesOrNot
                }
            );

            console.log("Insurance updated:", response.data);
            console.log(response.data.insuranceYesOrNot);


        } catch (error) {

            console.error(
                "Error updating insurance:",
                error
            );

        }
    };


    return (
        <div className="main border border-warning rounded-3">

            <h3 className="text-info text-center">
                Insurance Information
            </h3>

            <br/>

            <div className="d-flex align-items-center w-100">

                {/* =========================
                    Left Side
                ========================== */}

                <div className="w-50">

                    <button className="btn btn-success">
                        Go to Insurance
                    </button>

                </div>


                {/* =========================
                    Right Side
                ========================== */}



                <div className="w-50">

                    <div className="d-flex align-items-center w-100">

                        {/* Insurance Confirmation */}

                        <div className="w-50 confirm">
                            Insurance&nbsp;Confirmation
                        </div>


                        {/* =================
                            YES
                            ================== */}


                        <div className="radio-btn">

                            <div className="w-25">

                                <div className="form-check">

                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="insurance"
                                        id="insuranceYes"
                                        value="yes"
                                        onChange={handleInsuranceChange}
                                    />

                                    <label
                                        className="form-check-label"
                                        htmlFor="insuranceYes"
                                    >
                                        Yes
                                    </label>

                                </div>

                            </div>


                            {/* =================
                            NO
                        ================== */}

                            <div className="w-25">

                                <div className="form-check">

                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="insurance"
                                        id="insuranceNo"
                                        value="no"
                                        onChange={handleInsuranceChange}
                                    />

                                    <label
                                        className="form-check-label"
                                        htmlFor="insuranceNo"
                                    >
                                        No
                                    </label>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


            </div>

        </div>
    );
}