import axios from "axios";

import { FontAwesomeIcon }
from "@fortawesome/react-fontawesome";

import { faTrash }
from "@fortawesome/free-solid-svg-icons";

function DeletePatientInTable({

  id,

  getpatients

}) {

  const deletePatient =
  async () => {

    try {

      const res =
      await axios.delete(

        `http://localhost:5000/delete-patient/${id}`

      );

      alert(res.data.message);

      // Refresh Table
      getpatients();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <button

      className="btn btn-outline-danger"

      onClick={deletePatient}

    >

      <FontAwesomeIcon
        icon={faTrash}
      />

    </button>

  );
}

export default DeletePatientInTable;