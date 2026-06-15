// import React,
// {
//   useRef
// }
// from "react";

// import SignatureCanvas
// from "react-signature-canvas";

// function SignaturePad({ width = "300px", height = "150px" ,design="border"}) {

//   const sigCanvas =
//   useRef();

//   const saveSignature =
//   () => {

//     const image =

//     sigCanvas.current
//     .toDataURL();

//     console.log(image);

//   };

//   return (

//     <div >

//       <SignatureCanvas

//         ref={sigCanvas}

//         penColor="black"

//         canvasProps={{

//           width: width,

//           height: height,

//           design:
//           design

//         }}

//       />

//       {/* <button
//       onClick={saveSignature}
//       >
//         Save
//       </button> */}



//     </div>

//   );

// }

// export default SignaturePad;





// import React, { useRef } from "react";

// import SignatureCanvas from "react-signature-canvas";

// import "./SignaturePad.css";

// function SignaturePad({

//   width = 300,

//   height = 100,

//   design = "border"

// }) {

//   const sigCanvas = useRef();

//   return (

//     <div className={design}>

//       <SignatureCanvas

//         ref={sigCanvas}

//         penColor="black"

//         canvasProps={{

//           width: width,

//           height: height,

//           className: "sigCanvas"

//         }}

//       />

//     </div>

//   );

// }

// export default SignaturePad;





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