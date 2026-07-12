


import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";

import "./SignaturePad.css";

function SignaturePad({

    height = 40,

    design = "line"

}) {

    const wrapperRef = useRef(null);

    const sigCanvas = useRef(null);

    const [canvasWidth, setCanvasWidth] = useState(300);

    useEffect(() => {

        const resizeCanvas = () => {

            if(wrapperRef.current){

                setCanvasWidth(wrapperRef.current.offsetWidth);

            }

        };

        resizeCanvas();

        window.addEventListener("resize", resizeCanvas);

        return ()=>window.removeEventListener("resize", resizeCanvas);

    }, []);

    const clearSignature = ()=>{

        sigCanvas.current.clear();

    };

    return(

        <div className="signature-main">

            <div

                ref={wrapperRef}

                className={design}

            >

                <SignatureCanvas

                    ref={sigCanvas}

                    penColor="blue"

                    canvasProps={{

                        width:canvasWidth,

                        height:height,

                        className:"sigCanvas"

                    }}

                />

            </div>

            <button

                type="button"

                className="btn btn-sm text-primary"

                onClick={clearSignature}

            >

                <FontAwesomeIcon icon={faEraser}/>

            </button>

        </div>

    );

}

export default SignaturePad;