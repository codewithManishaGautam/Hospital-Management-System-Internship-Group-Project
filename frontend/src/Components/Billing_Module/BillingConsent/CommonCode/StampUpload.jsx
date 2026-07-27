



import React, { useState } from "react";

function StampUpload({

    showName = true,

    onSave

}) {

    const [stampImage, setStampImage] = useState(null);

    const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const preview = URL.createObjectURL(file);

    setStampImage(preview);

    const img = new Image();

    img.src = preview;

    img.onload = () => {

        const canvas = document.createElement("canvas");

        const ctx = canvas.getContext("2d");

        const MAX_WIDTH = 200;
        const MAX_HEIGHT = 200;

        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {

            height = height * (MAX_WIDTH / width);

            width = MAX_WIDTH;

        }

        if (height > MAX_HEIGHT) {

            width = width * (MAX_HEIGHT / height);

            height = MAX_HEIGHT;

        }

        canvas.width = width;

        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        const compressedImage = canvas.toDataURL("image/jpeg", 0.5);

        if (onSave) {

            onSave(compressedImage);

        }

    };

};

    return (

        <div className="text-center">

            {

                showName &&

                (

                    <label

                        className="fw-bold d-block mb-2"

                    >

                        शिक्का :

                    </label>

                )

            }

            {

                stampImage ?

                (

                    <img

                        src={stampImage}

                        alt="Stamp"

                        style={{

                            width: "120px",

                            height: "120px",

                            objectFit: "contain",

                            borderRadius: "50%",

                            border: "1px solid black",

                            padding: "5px"

                        }}

                    />

                )

                :

                (

                    <div

                        style={{

                            width: "120px",

                            height: "120px",

                            border: "1px solid black",

                            display: "flex",

                            justifyContent: "center",

                            alignItems: "center"

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