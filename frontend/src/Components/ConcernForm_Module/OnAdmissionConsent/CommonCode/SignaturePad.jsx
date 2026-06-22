import React, { useRef } from "react";
import { FontAwesomeIcon }
from "@fortawesome/react-fontawesome";

import { faEraser }
from "@fortawesome/free-solid-svg-icons";

import SignatureCanvas from "react-signature-canvas";

import "./SignaturePad.css";

function SignaturePad({

  width = 300,

  height = 100,

  design = "line"

}) {

  const sigCanvas = useRef();

  // CLEAR SIGNATURE

  const clearSignature = () => {

    sigCanvas.current.clear();

  };

  return (

    <div className="signature-main">
      

      <div className={design}>

        <SignatureCanvas
        

          ref={sigCanvas}

          penColor="blue"

          canvasProps={{

            width: width,

            height: height,

            className: "sigCanvas"

          }}

        />

      </div>

      <button
        onClick={clearSignature}
        style={{
          marginTop: "2px"
        }}

        className="btn text-primary"
      >
        <FontAwesomeIcon icon={faEraser} id="clear"/>
        
      </button>

    </div>

  );

}

export default SignaturePad;