

import React,
{
   useEffect,
   useState
}
   from "react";

import axios
   from "axios";

import {
   useParams,
   Link
}
   from "react-router-dom";

import PdfCreate
   from "./PdfCreate";

import "./style/PatientDetail.css";

import MergePdf
   from "./MergePdf";




function PatientDetail() {

   const { id } =
      useParams();

   // Patient State
   const [patient,
      setPatient] =
      useState({});

   // Diagnostic State
   const [diagnostics,
      setDiagnostics] =

      useState([]);


   // Get Patient
   const getPatient =
      async () => {

         try {

            const res =
               await axios.get(

                  `http://localhost:5000/patient/${id}`

               );

            setPatient(
               res.data
            );

         }

         catch (error) {

            console.log(error);

         }

      };


   // Get Diagnostics
   const getDiagnostics =
      async () => {

         try {

            const res =
               await axios.get(

                  "http://localhost:5000/diagnostics"

               );

            setDiagnostics(
               res.data
            );

         }

         catch (error) {

            console.log(error);

         }

      };


   useEffect(() => {
      getPatient();

      getDiagnostics();

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);


   // PDF Names



   // return (

   //    <div className="container mt-4">

   //       <h1>

   //          Patient Information

   //       </h1>

   //       <br />

   //       <div className="Patient">

   //          <p>

   //             <b>Name :</b>

   //             {patient.name}

   //          </p>

   //          <p>

   //             <b>Age :</b>

   //             {patient.age}

   //          </p>

   //          <p>

   //             <b>Gender :</b>

   //             {patient.gender}

   //          </p>

   //       </div>


   //       {/* Add Diagnostic Button */}

   //       <Link

   //          to="/add-diagnostic"

   //          className="btn btn-success mb-3"

   //       >

   //          Add Diagnostic

   //       </Link>


   //       {/* Billing Table */}

   //       <table

   //          border="5"

   //          className="table table-bordered mt-3"

   //       >

   //          <thead>

   //             <tr>

   //                <th className="table-primary">

   //                   Date

   //                </th>

   //                <th className="table-primary">

   //                   Lab Test

   //                </th>

   //                <th className="table-primary">

   //                   Pharma

   //                </th>

   //                <th className="table-primary">

   //                   Nurse

   //                </th>

   //                <th className="table-primary">

   //                   Doctor Fee

   //                </th>

   //                <th className="table-primary">

   //                   Insurance

   //                </th>

   //             </tr>

   //          </thead>


   //          <tbody className="table-light">

   //             {/* Row 1 */}

   //             <tr>

   //                <td>

   //                   09/05/2026

   //                </td>

   //                <td>

   //                   <PdfCreate

   //                      patient={patient}

   //                      pdfname={Lab}

   //                   />

   //                </td>

   //                <td>

   //                   <PdfCreate

   //                      patient={patient}

   //                      pdfname={Pharma}

   //                   />

   //                </td>

   //                <td>

   //                   <PdfCreate

   //                      patient={patient}

   //                      pdfname={Nurse}

   //                   />

   //                </td>

   //                <td>

   //                   <PdfCreate

   //                      patient={patient}

   //                      pdfname={Doctor}

   //                   />

   //                </td>

   //                <td>

   //                   <PdfCreate

   //                      patient={patient}

   //                      pdfname={Insurance}

   //                   />

   //                </td>

   //             </tr>


   //             {/* Row 2 */}

   //             <tr>

   //                <td>

   //                   10/05/2026

   //                </td>


   //                <td>

   //                   {/* Add Diagnostic */}

   //                   <Link

   //                      to={`/add-diagnostic/${patient._id}`}

   //                      className="btn btn-success btn-sm mb-2"

   //                   >

   //                      Add Diagnostic

   //                   </Link>

   //                   <br />

   //                   {/* Show PDFs */}

   //                   {

   //                      diagnostics

   //                         .filter(

   //                            (d) =>

   //                               d.patientId === patient._id

   //                         )

   //                         .map((d) => (

   //                            <div
   //                               key={d._id}
   //                               className="mb-2"
   //                            >

   //                               <a

   //                                  href={`http://localhost:5000/${d.pdfPath}`}

   //                                  target="_blank"

   //                                  rel="noreferrer"

   //                                  className="btn btn-primary btn-sm"

   //                               >

   //                                  View Diagnostic PDF

   //                               </a>

   //                            </div>

   //                         ))

   //                   }

   //                </td>


   //                <td>

   //                   <PdfCreate

   //                      patient={patient}

   //                      pdfname={Pharma}

   //                   />

   //                </td>

   //                <td>

   //                   <PdfCreate

   //                      patient={patient}

   //                      pdfname={Nurse}

   //                   />

   //                </td>

   //                <td>

   //                   <PdfCreate

   //                      patient={patient}

   //                      pdfname={Doctor}

   //                   />

   //                </td>

   //                <td>

   //                   <PdfCreate

   //                      patient={patient}

   //                      pdfname={Insurance}

   //                   />

   //                </td>

   //             </tr>

   //          </tbody>

   //       </table>


   //       {/* Merge PDF */}

   //       <MergePdf />

   //    </div>

   // );




   return (

      <div className="patient-page">

         <h1>Patient Information</h1>

         <div className="patient-card p-3 mb-2 bg-transparent text-primary">

            <div className="patient-info">

               <div className="row">
                  <div className="col-6">
                     <p>
                        <label>UHID :</label> {patient.uhid}
                     </p>
                  </div>
                  <div className="col-6">
                     <p>
                        <label>Name :</label> {patient.name}
                     </p>

                  </div>

               </div>
               <br />


               <div className="row">
                  <div className="col-6">
                     <p>
                        <label>Age :</label> {patient.age}
                     </p>
                  </div>
                  <div className="col-6">
                     <p>
                        <label>Gender :</label> {patient.gender}
                     </p>
                  </div>

               </div>
               <br />

               <div className="row">
                  <div className="col-6">
                     <p>
                        <label>Mobile :</label> {patient.mobile}
                     </p>
                  </div>
                  <div className="col-6">
                     <p>
                        <label>Address :</label> {patient.address}
                     </p>
                  </div>

               </div>
               <br />

               <div className="row">
                  <div className="col-6">
                     <p>
                        <label>Status :</label> {patient.status}
                     </p>
                  </div>
                  <div className="col-6">
                     <p>
                        <label>Register Date & Time :</label> {patient.createdAt}
                     </p>
                  </div>

               </div>
               <br />


            </div>

            <div className="patient-action">

               <Link
                  to={`/add-diagnostic/${patient._id}`}
                  className="btn btn-success"
               >
                  Add Diagnostic
               </Link>

            </div>

         </div>

         <div className="table-responsive">

            <table
               className="table table-bordered"
            >

               <thead>

                  <tr>

                     <th>Date</th>

                     <th>Lab Test</th>

                     <th>Pharma</th>

                     <th>Nurse</th>

                     <th>Doctor Fee</th>

                     <th>Insurance</th>

                  </tr>

               </thead>

               <tbody>

                  <tr>

                     <td>09/05/2026</td>

                     <td>

                        <PdfCreate
                           patient={patient}
                           pdfname="Lab"
                        />

                     </td>

                     <td>

                        <PdfCreate
                           patient={patient}
                           pdfname="Pharma"
                        />

                     </td>

                     <td>

                        <PdfCreate
                           patient={patient}
                           pdfname="Nurse"
                        />

                     </td>

                     <td>

                        <PdfCreate
                           patient={patient}
                           pdfname="Doctor"
                        />

                     </td>

                     <td>

                        <PdfCreate
                           patient={patient}
                           pdfname="Insurance"
                        />

                     </td>

                  </tr>

                  <tr>

                     <td>10/05/2026</td>

                     <td>

                        <Link
                           to={`/add-diagnostic/${patient._id}`}
                           className="btn btn-success btn-sm"
                        >
                           Add Diagnostic
                        </Link>

                        <br />

                        {

                           diagnostics
                              .filter(
                                 d => d.patientId === patient._id
                              )
                              .map(d => (

                                 <div key={d._id}>

                                    <a
                                       href={`http://localhost:5000/${d.pdfPath}`}
                                       target="_blank"
                                       rel="noreferrer"
                                       className="btn btn-primary btn-sm"
                                    >

                                       View Diagnostic PDF

                                    </a>

                                 </div>

                              ))

                        }

                     </td>

                     <td>

                        <PdfCreate
                           patient={patient}
                           pdfname="Pharma"
                        />

                     </td>

                     <td>

                        <PdfCreate
                           patient={patient}
                           pdfname="Nurse"
                        />

                     </td>

                     <td>

                        <PdfCreate
                           patient={patient}
                           pdfname="Doctor"
                        />

                     </td>

                     <td>

                        <PdfCreate
                           patient={patient}
                           pdfname="Insurance"
                        />

                     </td>

                  </tr>

               </tbody>

            </table>

         </div>

         <div className="mt-3">

            <MergePdf />

         </div>

      </div>

   );

}

export default PatientDetail;