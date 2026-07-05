import axios from "axios";

const API_URL =
  "http://localhost:5000/api/appointments";

/* ==========================
   Get All Appointments
========================== */

export const getAllAppointments =
  async () => {
    try {
      const response = await axios.get(
        API_URL
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching appointments:",
        error
      );
    }
  };

/* ==========================
   Get Appointment By ID
========================== */

export const getAppointmentById =
  async (id) => {
    try {
      const response = await axios.get(
        `${API_URL}/${id}`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching appointment:",
        error
      );
    }
  };

/* ==========================
   Create Appointment
========================== */

export const createAppointment =
  async (appointmentData) => {
    try {
      const response = await axios.post(
        API_URL,
        appointmentData
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error creating appointment:",
        error
      );
    }
  };

/* ==========================
   Update Appointment
========================== */

export const updateAppointment =
  async (
    id,
    appointmentData
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        appointmentData
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error updating appointment:",
        error
      );
    }
  };

/* ==========================
   Delete Appointment
========================== */

export const deleteAppointment =
  async (id) => {
    try {
      const response =
        await axios.delete(
          `${API_URL}/${id}`
        );

      return response.data;
    } catch (error) {
      console.error(
        "Error deleting appointment:",
        error
      );
    }
  };

/* ==========================
   Get Today's Appointments
========================== */

export const getTodayAppointments =
  async () => {
    try {
      const response = await axios.get(
        `${API_URL}/today`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching today's appointments:",
        error
      );
    }
  };

/* ==========================
   Send Appointment To Doctor
========================== */

export const sendToDoctor =
  async (
    appointmentId
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}/send-to-doctor/${appointmentId}`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error sending appointment to doctor:",
        error
      );
    }
  };

/* ==========================
   Search Appointment
========================== */

export const searchAppointment =
  async (keyword) => {
    try {
      const response = await axios.get(
        `${API_URL}/search/${keyword}`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error searching appointment:",
        error
      );
    }
  };