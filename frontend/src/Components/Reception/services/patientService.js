import axios from "axios";

const API_URL = "http://localhost:5000/api/patient";

/* ==========================
   Get All Patients
========================== */

export const getAllPatients = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
  }
};

/* ==========================
   Get Patient By UHID
========================== */

export const getPatientByUHID = async (uhid) => {
  try {
    const response = await axios.get(
      `${API_URL}/${uhid}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching patient:",
      error
    );
  }
};

/* ==========================
   Register New Patient
========================== */

export const createPatient = async (
  patientData
) => {
  try {
    const response = await axios.post(
      API_URL,
      patientData
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error creating patient:",
      error
    );
  }
};

/* ==========================
   Update Patient
========================== */

export const updatePatient = async (
  id,
  patientData
) => {
  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      patientData
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error updating patient:",
      error
    );
  }
};

/* ==========================
   Delete Patient
========================== */

export const deletePatient = async (
  id
) => {
  try {
    const response = await axios.delete(
      `${API_URL}/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error deleting patient:",
      error
    );
  }
};

/* ==========================
   Search Patient
========================== */

export const searchPatient = async (
  keyword
) => {
  try {
    const response = await axios.get(
      `${API_URL}/search/${keyword}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error searching patient:",
      error
    );
  }
};

/* ==========================
   Today's Patients
========================== */

export const getTodayPatients =
  async () => {
    try {
      const response = await axios.get(
        `${API_URL}/today`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching today's patients:",
        error
      );
    }
  };