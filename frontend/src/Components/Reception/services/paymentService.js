import axios from "axios";

const API_URL = "http://localhost:5000/api/payment";

// Create Razorpay Order
export const createOrder = async (amount) => {
  const response = await axios.post(`${API_URL}/create-order`, {
    amount,
  });

  return response.data;
};

// Verify Razorpay Payment
export const verifyPayment = async (paymentData) => {
  const response = await axios.post(`${API_URL}/verify-payment`, paymentData);

  return response.data;
};
