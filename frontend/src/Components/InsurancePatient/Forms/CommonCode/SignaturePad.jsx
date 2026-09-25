



import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import "./SignaturePad.css";

function SignaturePad({

    height = 40,
    design = "line",
    // width="auto",
    onSave

}) {

    const wrapperRef = useRef(null);

    const sigCanvas = useRef(null);

    const [canvasWidth, setCanvasWidth] = useState(400);

    useEffect(() => {

        const resizeCanvas = () => {

            if (wrapperRef.current) {

                setCanvasWidth(

                    wrapperRef.current.offsetWidth

                );

            }

        };

        resizeCanvas();

        window.addEventListener(

            "resize",

            resizeCanvas

        );

        return () =>

            window.removeEventListener(

                "resize",

                resizeCanvas

            );

    }, []);

    // Save Signature

    const saveSignature = () => {

        if (

            sigCanvas.current &&
            !sigCanvas.current.isEmpty()

        ) {

            const image = sigCanvas.current

                .getCanvas()

                .toDataURL("image/png");

            onSave && onSave(image);

        }

    };

    // Clear Signature

    const clearSignature = () => {

        sigCanvas.current.clear();

        onSave && onSave("");

    };

    return (

        <div className="signature-main">

            <div

                ref={wrapperRef}

                className={design}

            >

                <SignatureCanvas

                    ref={sigCanvas}

                    penColor="blue"

                    onEnd={saveSignature}

                    canvasProps={{

                        width: canvasWidth,

                        height: height,

                        className: "sigCanvas"

                    }}

                />

            </div>

            <button
      
                type="button"

                className="btn btn-sm text-primary"
                style={{
                    display:"inline-block",
        padding: "0px 3px",
        margin: 0,
        minWidth: "100px",
        border:"none"
    }}

                onClick={clearSignature}

            >

                <FontAwesomeIcon
                    icon={faEraser}

                />

            </button>

        </div>

    );

}

export default SignaturePad;