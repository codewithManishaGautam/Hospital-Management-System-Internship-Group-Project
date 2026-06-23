import axios from "axios";

const API_URL =
  "http://localhost:5000/api/billing";

/* ==========================
   Get All Bills
========================== */

export const getAllBills =
  async () => {
    try {
      const response = await axios.get(
        API_URL
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching bills:",
        error
      );
    }
  };

/* ==========================
   Get Bill By ID
========================== */

export const getBillById =
  async (id) => {
    try {
      const response = await axios.get(
        `${API_URL}/${id}`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching bill:",
        error
      );
    }
  };

/* ==========================
   Create OPD Bill
========================== */

export const createBill =
  async (billData) => {
    try {
      const response = await axios.post(
        API_URL,
        billData
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error creating bill:",
        error
      );
    }
  };

/* ==========================
   Update Bill
========================== */

export const updateBill =
  async (
    id,
    billData
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        billData
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error updating bill:",
        error
      );
    }
  };

/* ==========================
   Delete Bill
========================== */

export const deleteBill =
  async (id) => {
    try {
      const response =
        await axios.delete(
          `${API_URL}/${id}`
        );

      return response.data;
    } catch (error) {
      console.error(
        "Error deleting bill:",
        error
      );
    }
  };

/* ==========================
   Get Today's Bills
========================== */

export const getTodayBills =
  async () => {
    try {
      const response = await axios.get(
        `${API_URL}/today`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching today's bills:",
        error
      );
    }
  };

/* ==========================
   Search Bill
========================== */

export const searchBill =
  async (keyword) => {
    try {
      const response = await axios.get(
        `${API_URL}/search/${keyword}`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error searching bill:",
        error
      );
    }
  };

/* ==========================
   Update Payment Status
========================== */

export const updatePaymentStatus =
  async (
    billId,
    status
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}/payment-status/${billId}`,
        { status }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error updating payment status:",
        error
      );
    }
  };

/* ==========================
   Print Bill
========================== */

export const printBill =
  async (billId) => {
    try {
      const response = await axios.get(
        `${API_URL}/print/${billId}`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error printing bill:",
        error
      );
    }
  };