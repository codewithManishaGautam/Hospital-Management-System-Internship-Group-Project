


// import React from "react";
// import hospitalImg from "../assets/shradha_Hospital.png";
// import { useRazorpay } from "react-razorpay";

// function Razorpay({patientName,patientMob}) {

//     const { Razorpay } = useRazorpay();


//     const payNow = async () => {
//         try {

//             console.log("Payment button clicked");

//             const response = await fetch(
//                 "http://localhost:5000/api/payment/order",
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json"
//                     }
//                 }
//             );

//             console.log("Backend response:", response);

//             if (!response.ok) {
//                 throw new Error(`Server Error: ${response.status}`);
//             }

//             const data = await response.json();

//             console.log("Order Data:", data);

//             // <img
//             //     src={data.image_url}
//             //     alt="Payment QR"
//             // />

            


//             const options = {
//                 key: "rzp_test_TPwFQBogAo1Jhm",

//                 amount: data.amount,

//                 currency: "INR",

//                 name: "Shradha Hospital",

//                 description: "OPD or IPD or CASUALTY etc.",

//                 image: "https://doctorlistingingestionpr.blob.core.windows.net/doctorprofilepic/1670557851136_HospitalProfileImage_Profile%20Pic.png",

//                 order_id: data.id,

//                 handler: (response) => {
//                     console.log("Payment Response:", response);
//                     alert(response.razorpay_payment_id)
//                     alert("Payment Successfully Transferred!");
//                 },

//                 prefill: {
                    
//                     name: patientName,
//                     contact: patientMob,
//                 },

//                 theme: {
//                     color: "#f47cd6",
//                 },
//                 method: {
//                     upi: true,
//                     card: true,
//                     netbanking: true,
//                     wallet: true
//                 },
//             };

//             const razorpay = new Razorpay(options);

//             razorpay.on("payment.failed", function (response) {

//                 console.log("Payment Failed:", response);

//                 alert(
//                     response.error?.description ||
//                     "Payment Failed"
//                 );
//             });

//             razorpay.open();

//         } catch (error) {

//             console.error("FULL PAYMENT ERROR:", error);

//             alert(error.message);
//         }
//     };


//     return (

//         <div className="text-center">

//             <div className="col text-primary rounded-5">
//                 <br /><br />
//                 <h1>
//                     Online Payment Section
//                 </h1>

//                 <button onClick={payNow} className="btn btn-success">
//                     Pay Now
//                 </button>

//             </div>
//         </div>


//     );
// }

// export default Razorpay;




import React, { useState } from "react";
import { useRazorpay } from "react-razorpay";

function Razorpay({ patientName, patientMob }) {

    const { Razorpay } = useRazorpay();

    const [amount, setAmount] = useState("");

    const payNow = async () => {

        try {

            if (!amount || Number(amount) <= 0) {
                alert("Please enter a valid amount");
                return;
            }

            console.log("Payment button clicked");
            console.log("Amount =", amount);

            const response = await fetch(
                "http://localhost:5000/api/payment/order",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        amount: Number(amount)
                    })
                }
            );

            if (!response.ok) {
                throw new Error(`Server Error: ${response.status}`);
            }

            const data = await response.json();

            console.log("Order Data:", data);

            const options = {

                key: "rzp_test_TPwFQBogAo1Jhm",

                amount: Number(amount) * 100,

                currency: "INR",

                name: "Shradha Hospital",

                description: "OPD or IPD or CASUALTY etc.",

                image:
                    "https://doctorlistingingestionpr.blob.core.windows.net/doctorprofilepic/1670557851136_HospitalProfileImage_Profile%20Pic.png",

                order_id: data.id,

                handler: (response) => {

                    console.log(
                        "Payment Response:",
                        response
                    );

                    alert(
                        response.razorpay_payment_id
                    );

                    alert(
                        "Payment Successfully Transferred!"
                    );
                },

                prefill: {

                    name: patientName,

                    contact: patientMob,

                },

                theme: {

                    color: "#f47cd6",

                },

                method: {

                    upi: true,

                    card: true,

                    netbanking: true,

                    wallet: true

                },

            };

            const razorpay = new Razorpay(options);

            razorpay.on(
                "payment.failed",
                function (response) {

                    console.log(
                        "Payment Failed:",
                        response
                    );

                    alert(
                        response.error?.description ||
                        "Payment Failed"
                    );

                }
            );

            razorpay.open();

        }

        catch (error) {

            console.error(
                "FULL PAYMENT ERROR:",
                error
            );

            alert(error.message);

        }

    };


    return (

        <div className="text-center">

            <div className="col text-primary rounded-5">

                <br />

                <h1>
                    Online Payment Section
                </h1>

                {/* Amount + Pay Now */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        marginTop: "30px"
                    }}
                >

                    <input
                        type="number"
                        placeholder="Enter Amount"
                        value={amount}
                        onChange={(e) =>
                            setAmount(e.target.value)
                        }
                        className="form-control"
                        style={{
                            width: "180px"
                        }}
                    />
                    

                    <button
                        onClick={payNow}
                        className="btn btn-success"
                    >
                        Pay Now
                    </button>

                </div>

            </div>

        </div>

    );
}

export default Razorpay;