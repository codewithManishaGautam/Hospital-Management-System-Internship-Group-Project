// import React,
// {
//  useState
// }
// from "react";

// import axios
// from "axios";



// function AddDiagnostic() {

//  const [formData,
//  setFormData] =

//  useState({

//    patientName: "",

//    age: "",

//    gender: "",

//    doctorName: "",

//    scanName: "",

//    findings: "",

//    impression: "",

//    amount: "",

//    paymentStatus: "",

//    email: ""

//  });

//  const [image,
//  setImage] =
//  useState(null);


//  const handleChange =
//  (e) => {

//    setFormData({

//      ...formData,

//      [e.target.name]:
//      e.target.value

//    });

//  };


//  const handleSubmit =
//  async (e) => {

//    e.preventDefault();

//    const data =
//    new FormData();

//    Object.keys(formData)

//    .forEach((key) => {

//      data.append(

//        key,

//        formData[key]

//      );

//    });

//    data.append(
//      "image",
//      image
//    );

//    try {

//      const res =
//      await axios.post(

//        "http://localhost:5000/add-diagnostic",

//        data,

//        {

//          headers: {

//            "Content-Type":

//            "multipart/form-data"

//          }

//        }

//      );

//      alert(
//        res.data.message
//      );

//      window.open(
//        res.data.pdfUrl
//      );

//    }

//    catch (error) {

//      console.log(error);

//    }

//  };


//  return (

//    <div className="container mt-5">

//      <h2>
//        Add Diagnostic
//      </h2>

//      <form
//      onSubmit={handleSubmit}
//      >

//        <input
//        type="text"
//        name="patientName"
//        placeholder="Patient Name"
//        className="form-control mb-3"
//        onChange={handleChange}
//        />

//        <input
//        type="email"
//        name="email"
//        placeholder="Patient Email"
//        className="form-control mb-3"
//        onChange={handleChange}
//        />

//        <input
//        type="number"
//        name="age"
//        placeholder="Age"
//        className="form-control mb-3"
//        onChange={handleChange}
//        />

//        <input
//        type="text"
//        name="doctorName"
//        placeholder="Doctor Name"
//        className="form-control mb-3"
//        onChange={handleChange}
//        />

//        <input
//        type="text"
//        name="scanName"
//        placeholder="Scan Name"
//        className="form-control mb-3"
//        onChange={handleChange}
//        />

//        <textarea
//        name="findings"
//        placeholder="Findings"
//        className="form-control mb-3"
//        onChange={handleChange}
//        />

//        <textarea
//        name="impression"
//        placeholder="Impression"
//        className="form-control mb-3"
//        onChange={handleChange}
//        />

//        <input
//        type="number"
//        name="amount"
//        placeholder="Amount"
//        className="form-control mb-3"
//        onChange={handleChange}
//        />

//        <input

//        type="file"

//        accept="image/*"

//        className="form-control mb-3"

//        onChange={(e) =>

//          setImage(
//            e.target.files[0]
//          )

//        }

//        />

//        <button
//        className="btn btn-primary"
//        >

//          Generate PDF

//        </button>

//      </form>

//    </div>

//  );

// }

// export default AddDiagnostic;










// import React,
// {
//  useState
// }
// from "react";

// import axios
// from "axios";

// import {
//  useParams
// }
// from "react-router-dom";


// function AddDiagnostic() {

//  const { id } =
//  useParams();

//  const [formData,
//  setFormData] =

//  useState({

//    patientName: "",

//    age: "",

//    gender: "",

//    doctorName: "",

//    scanName: "",

//    findings: "",

//    impression: "",

//    amount: "",

//    paymentStatus: "",

//    email: ""

//  });

//  const [image,
//  setImage] =
//  useState(null);


//  const handleChange =
//  (e) => {

//    setFormData({

//      ...formData,

//      [e.target.name]:
//      e.target.value

//    });

//  };


//  const handleSubmit =
//  async (e) => {

//    e.preventDefault();

//    const data =
//    new FormData();

//    // Add Text Data
//    Object.keys(formData)

//    .forEach((key) => {

//      data.append(

//        key,

//        formData[key]

//      );

//    });

//    // Add Patient ID
//    data.append(

//      "patientId",

//      id

//    );

//    // Add Image
//    data.append(

//      "image",

//      image

//    );


//    try {

//      const res =
//      await axios.post(

//        "http://localhost:5000/add-diagnostic",

//        data

//      );

//      alert(
//        res.data.message
//      );

//    }

//    catch (error) {

//      console.log(error);

//    }

//  };


//  return (

//    <div className="container mt-5">

//      <h2>

//        Add Diagnostic

//      </h2>

//      <form
//      onSubmit={handleSubmit}
//      >

//        <input

//        type="text"

//        name="patientName"

//        placeholder="Patient Name"

//        className="form-control mb-3"

//        onChange={handleChange}

//        />

//        <input

//        type="number"

//        name="age"

//        placeholder="Age"

//        className="form-control mb-3"

//        onChange={handleChange}

//        />

//        <select

//        name="gender"

//        className="form-control mb-3"

//        onChange={handleChange}

//        >

//          <option>

//            Select Gender

//          </option>

//          <option value="Male">

//            Male

//          </option>

//          <option value="Female">

//            Female

//          </option>

//        </select>

//        <input

//        type="text"

//        name="doctorName"

//        placeholder="Doctor Name"

//        className="form-control mb-3"

//        onChange={handleChange}

//        />

//        <input

//        type="text"

//        name="scanName"

//        placeholder="Scan Name"

//        className="form-control mb-3"

//        onChange={handleChange}

//        />

//        <textarea

//        name="findings"

//        placeholder="Findings"

//        className="form-control mb-3"

//        onChange={handleChange}

//        />

//        <textarea

//        name="impression"

//        placeholder="Impression"

//        className="form-control mb-3"

//        onChange={handleChange}

//        />

//        <input

//        type="number"

//        name="amount"

//        placeholder="Amount"

//        className="form-control mb-3"

//        onChange={handleChange}

//        />

//        <select

//        name="paymentStatus"

//        className="form-control mb-3"

//        onChange={handleChange}

//        >

//          <option>

//            Payment Status

//          </option>

//          <option value="Paid">

//            Paid

//          </option>

//          <option value="Pending">

//            Pending

//          </option>

//        </select>

//        <input

//        type="email"

//        name="email"

//        placeholder="Patient Email"

//        className="form-control mb-3"

//        onChange={handleChange}

//        />

//        <input

//        type="file"

//        className="form-control mb-3"

//        onChange={(e) =>

//          setImage(
//            e.target.files[0]
//          )

//        }

//        />

//        <button
//        className="btn btn-primary"
//        >

//          Generate PDF

//        </button>

//      </form>

//    </div>

//  );

// }

// export default AddDiagnostic;





import React,
{
 useState
}
from "react";

import axios
from "axios";

import {
 useParams
}
from "react-router-dom";


function AddDiagnostic() {

 const { id } =
 useParams();

 const [formData,
 setFormData] =

 useState({

   patientName: "",

   age: "",

   gender: "",

   doctorName: "",

   scanName: "",

   findings: "",

   impression: "",

   amount: "",

   paymentStatus: "",

   email: ""

 });

 const [image,
 setImage] =
 useState(null);


 const handleChange =
 (e) => {

   setFormData({

     ...formData,

     [e.target.name]:
     e.target.value

   });

 };


 const handleSubmit =
 async (e) => {

   e.preventDefault();

   const data =
   new FormData();

   // Text Data
   Object.keys(formData)

   .forEach((key) => {

     data.append(

       key,

       formData[key]

     );

   });

   // IMPORTANT
   data.append(

     "patientId",

     id

   );

   // Image
   data.append(

     "image",

     image

   );


   try {

     const res =
     await axios.post(

       "http://localhost:5000/add-diagnostic",

       data

     );

     alert(
       res.data.message
     );

   }

   catch (error) {

     console.log(error);

   }

 };


 return (

   <div className="container mt-5">

     <h2>

       Add Diagnostic

     </h2>

     <form
     onSubmit={handleSubmit}
     >

       <input

       type="text"

       name="patientName"

       placeholder="Patient Name"

       className="form-control mb-3"

       onChange={handleChange}

       />

       <input

       type="number"

       name="age"

       placeholder="Age"

       className="form-control mb-3"

       onChange={handleChange}

       />

       <select

       name="gender"

       className="form-control mb-3"

       onChange={handleChange}

       >

         <option>

           Select Gender

         </option>

         <option value="Male">

           Male

         </option>

         <option value="Female">

           Female

         </option>

       </select>

       <input

       type="text"

       name="doctorName"

       placeholder="Doctor Name"

       className="form-control mb-3"

       onChange={handleChange}

       />

       <input

       type="text"

       name="scanName"

       placeholder="Scan Name"

       className="form-control mb-3"

       onChange={handleChange}

       />

       <textarea

       name="findings"

       placeholder="Findings"

       className="form-control mb-3"

       onChange={handleChange}

       />

       <textarea

       name="impression"

       placeholder="Impression"

       className="form-control mb-3"

       onChange={handleChange}

       />

       <input

       type="number"

       name="amount"

       placeholder="Amount"

       className="form-control mb-3"

       onChange={handleChange}

       />

       <select

       name="paymentStatus"

       className="form-control mb-3"

       onChange={handleChange}

       >

         <option>

           Payment Status

         </option>

         <option value="Paid">

           Paid

         </option>

         <option value="Pending">

           Pending

         </option>

       </select>

       <input

       type="email"

       name="email"

       placeholder="Patient Email"

       className="form-control mb-3"

       onChange={handleChange}

       />

       <input

       type="file"

       className="form-control mb-3"

       onChange={(e) =>

         setImage(
           e.target.files[0]
         )

       }

       />

       <button
       className="btn btn-primary"
       >

         Generate PDF

       </button>

     </form>

   </div>

 );

}

export default AddDiagnostic;