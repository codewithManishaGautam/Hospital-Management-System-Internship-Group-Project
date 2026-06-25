import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";

function DeclarationTableForm() {
  return (
    <div className="container mt-3">

      <table className="table table-bordered">

        <thead>
          <tr>
            <th>पेशंट / रुग्ण</th>
            <th>नातेवाईक १</th>
            <th>नातेवाईक २</th>
          </tr>
        </thead>

        <tbody>

          {/* Signature Row */}
          <tr>
            <td>
              <strong>सही : </strong><br />
              <span><SignaturePad width={200} height={30} design="line" /></span>
            </td>

            <td>
              <strong>सही :</strong>
              <span><SignaturePad width={150} height={30} design="line" /></span>
            </td>

            <td>
              <strong>सही :</strong>
              <span><SignaturePad width={150} height={30} design="line" /></span>
            </td>
          </tr>

          {/* Name Row */}
          <tr>
            <td>
              <strong>नाव :</strong>
              <span><SignaturePad width={160} height={30} design="line" /></span> 
              <SignaturePad width={200} height={30} design="line" />
            </td>

            <td>
              <strong>नाव :</strong>
              <span><SignaturePad width={158} height={30} design="line" /></span> 
              <SignaturePad width={200} height={30} design="line" />
            </td>

            <td>
              <strong>नाव :</strong>
              <span><SignaturePad width={158} height={30} design="line" /></span> 
              <SignaturePad width={200} height={30} design="line" />
            </td>
          </tr>

          {/* Address Row */}
          <tr>
            <td>
              <strong>पत्ता :</strong>
              <span><SignaturePad width={160} height={30} design="line" /></span> 
              <SignaturePad width={200} height={30} design="line" />
            </td>

            <td>
              <strong>पत्ता :</strong>
              <span><SignaturePad width={158} height={30} design="line" /></span> 
              <SignaturePad width={200} height={30} design="line" />
            </td>

            <td>
              <strong>पत्ता :</strong>
              <span><SignaturePad width={158} height={30} design="line" /></span> 
              <SignaturePad width={200} height={30} design="line" />
            </td>
          </tr>

          {/* Phone Row */}
          <tr>
            <td>
              <strong>मो :</strong>
              <span><SignaturePad width={170} height={30} design="line" /></span> 
            </td>

            <td>
              <strong>मो :</strong>
              <span><SignaturePad width={165} height={30} design="line" /></span> 
            </td>

            <td>
              <strong>मो :</strong>
              <span><SignaturePad width={165} height={30} design="line" /></span> 
            </td>
          </tr>

          {/* Age / Date Row */}
          <tr>
            <td>
              <strong>वय :</strong>  &nbsp; &nbsp;
              <span><SignaturePad width={50} height={30} design="line" /></span> 
              <br /><br /><strong>तारीख :</strong> <input type="date"/>
            </td>

            <td>
              <strong>तारीख :</strong> <input type="date"/>
            </td>

            <td>
              <strong>तारीख :</strong> <input type="date"/>
            </td>
          </tr>

        </tbody>
      </table>

    </div>
  );
}

export default DeclarationTableForm;