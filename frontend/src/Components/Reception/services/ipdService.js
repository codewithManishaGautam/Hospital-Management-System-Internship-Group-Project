import axios from "axios";

const API_URL =
  "http://localhost:5000/api/ipd";

/* ==========================
   Get All IPD Patients
========================== */

export const getAllIPDPatients =
  async () => {
    try {
      const response = await axios.get(
        API_URL
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching IPD patients:",
        error
      );
    }
  };

/* ==========================
   Get IPD Patient By ID
========================== */

export const getIPDPatientById =
  async (id) => {
    try {
      const response = await axios.get(
        `${API_URL}/${id}`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching IPD patient:",
        error
      );
    }
  };

/* ==========================
   Admit Patient
========================== */

export const admitPatient =
  async (ipdData) => {
    try {
      const response = await axios.post(
        `${API_URL}/admit`,
        ipdData
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error admitting patient:",
        error
      );
    }
  };

/* ==========================
   Update IPD Details
========================== */

export const updateIPDPatient =
  async (
    id,
    updatedData
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        updatedData
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error updating IPD patient:",
        error
      );
    }
  };

/* ==========================
   Discharge Patient
========================== */

export const dischargePatient =
  async (id) => {
    try {
      const response = await axios.put(
        `${API_URL}/discharge/${id}`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error discharging patient:",
        error
      );
    }
  };

/* ==========================
   Delete IPD Record
========================== */

export const deleteIPDPatient =
  async (id) => {
    try {
      const response =
        await axios.delete(
          `${API_URL}/${id}`
        );

      return response.data;
    } catch (error) {
      console.error(
        "Error deleting IPD record:",
        error
      );
    }
  };

/* ==========================
   Get Available Rooms
========================== */

export const getAvailableRooms =
  async () => {
    try {
      const response = await axios.get(
        `${API_URL}/rooms`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching rooms:",
        error
      );
    }
  };

/* ==========================
   Get Available Beds
========================== */

export const getAvailableBeds =
  async (roomNo) => {
    try {
      const response = await axios.get(
        `${API_URL}/beds/${roomNo}`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching beds:",
        error
      );
    }
  };

/* ==========================
   Check Bed Availability
========================== */

export const checkBedAvailability =
  async (bedNo) => {
    try {
      const response = await axios.get(
        `${API_URL}/check-bed/${bedNo}`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error checking bed availability:",
        error
      );
    }
  };

/* ==========================
   Search IPD Patient
========================== */

export const searchIPDPatient =
  async (keyword) => {
    try {
      const response = await axios.get(
        `${API_URL}/search/${keyword}`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error searching IPD patient:",
        error
      );
    }
  };

/* ==========================
   Get Admitted Patients
========================== */

export const getAdmittedPatients =
  async () => {
    try {
      const response = await axios.get(
        `${API_URL}/admitted`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching admitted patients:",
        error
      );
    }
  };

/* ==========================
   Generate IPD Number
========================== */

export const generateIPDNumber =
  async () => {
    try {
      const response = await axios.get(
        `${API_URL}/generate-ipd-no`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error generating IPD number:",
        error
      );
    }
  };