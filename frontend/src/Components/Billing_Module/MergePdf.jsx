import React,
{
  useState
}
from "react";

import axios
from "axios";

function MergePdf() {

  const [files, setFiles] =
  useState([]);

  const [patientName,
  setPatientName] =
  useState("");

  const [email,
  setEmail] =
  useState("");

  const sendPDF =
  async () => {

    const formData =
    new FormData();

    // Multiple Files
    for (

      let i = 0;

      i < files.length;

      i++

    ) {

      formData.append(

        "pdfs",

        files[i]

      );

    }

    formData.append(

      "patientName",

      patientName

    );

    formData.append(

      "email",

      email

    );

    try {

      const res =
      await axios.post(

        "http://localhost:5000/send-email",

        formData

      );

      alert(
        res.data.message
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="container mt-5">

      <h2>
        Merge PDF & Send
      </h2>

      <input

        type="text"

        placeholder="Patient Name"

        className="form-control mb-3"

        onChange={(e) =>

          setPatientName(
            e.target.value
          )

        }

      />

      <input

        type="email"

        placeholder="Patient Email"

        className="form-control mb-3"

        onChange={(e) =>

          setEmail(
            e.target.value
          )

        }

      />

      <input

        type="file"

        multiple

        className="form-control mb-3"

        onChange={(e) =>

          setFiles(

      Array.from(
        e.target.files
      )

    )
        }

      />

      <button

        className="btn btn-primary"

        onClick={sendPDF}

      >

        Merge & Send PDF

      </button>

    </div>

  );
}

export default MergePdf;