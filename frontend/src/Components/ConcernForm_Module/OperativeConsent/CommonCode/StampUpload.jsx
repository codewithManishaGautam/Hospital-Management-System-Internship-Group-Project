import React, { useState } from "react";

function StampUpload() {

    const [stampImage, setStampImage] = useState(null);

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (file) {
            setStampImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="text-center">

            <label className="fw-bold d-block mb-2">
                शिक्का :
            </label>

            {
                stampImage ? (
                    <img
                        src={stampImage}
                        alt="Stamp"
                        style={{
                            width: "120px",
                            height: "120px",
                            objectFit: "contain",
                            borderRadius:"50%",
                            border: "1px solid #000",
                            padding: "5px"
                        }}
                    />
                ) : (
                    <div
                        style={{
                            width: "120px",
                            height: "120px",
                            border: "1px solid #000",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        No Stamp
                    </div>
                )
            }

            <input
                type="file"
                accept="image/*"
                className="form-control mt-2"
                onChange={handleImageChange}
            />

        </div>
    );
}

export default StampUpload;