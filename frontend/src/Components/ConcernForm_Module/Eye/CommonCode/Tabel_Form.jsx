// import React from "react";
// import SignaturePad from "./SignaturePad";
// import { getDateTime, getTodayDate } from "./GetDate_Time";
// import "./Tabel_Form.css";

// function Table_Form() {
//     return (
//         <div>
//             <div className="date">
//                 <b>Date:</b> {getTodayDate()}
//             </div>
//             <table className="patient-table">

//                 <tbody>

//                     <tr>
//                         <td ><b>UHID :</b><span><SignaturePad width="145px" height="40px" design="border"/></span></td>
//                         <td><b>DOA:</b> {getDateTime()}</td>
//                         <td><b>Gender / Age :</b><span><SignaturePad width="100px" height="40px" design="border"/></span> </td>
//                     </tr>

//                     <tr>
//                         <td>
//                             <b>IPD ID</b><br />
//                             <pre style={{display:"inline-flex"}}>
//                             <SignaturePad width="70px" height="40px" design="border"/>
//                             </pre>
//                         </td>

//                         <td>
//                             <b>Patient Name</b><br />
//                             <SignaturePad width="280px" height="40px" design="line"/>
//                         </td>

//                         <td>
//                             <b>Consulting Doctor</b><br />
//                             <SignaturePad width="180px" height="40px"  design="line"/>
//                         </td>
//                     </tr>



//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default Table_Form;



import React from "react";
import SignaturePad from "./SignaturePad";
import { getDateTime, getTodayDate } from "./GetDate_Time";
import "./Table_Form.css";

function Table_Form() {
  return (
    <div className="table-form-wrapper">

      <div className="date">
        <b>Date :</b> {getTodayDate()}
      </div>

      <div className="table-responsive">

        <table className="patient-table">

          <tbody>

            <tr>

              <td>
                <b>UHID :</b>
                <div className="mt-1">
                  <SignaturePad
                    height={40}
                    design="border"
                  />
                </div>
              </td>

              <td>
                <b>DOA :</b>
                <br />
                {getDateTime()}
              </td>

              <td>
                <b>Gender / Age :</b>

                <div className="mt-1">
                  <SignaturePad
                    height={40}
                    design="border"
                  />
                </div>

              </td>

            </tr>

            <tr>

              <td>

                <b>IPD ID</b>

                <div className="mt-1">
                  <SignaturePad
                    height={40}
                    design="border"
                  />
                </div>

              </td>

              <td>

                <b>Patient Name</b>

                <div className="mt-1">
                  <SignaturePad
                    height={35}
                    design="line"
                  />
                </div>

              </td>

              <td>

                <b>Consulting Doctor</b>

                <div className="mt-1">
                  <SignaturePad
                    height={35}
                    design="line"
                  />
                </div>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Table_Form;