import axios from "axios";

const API = "http://localhost:5000/api/beds";

export const getAllBeds = async () => {
  const response = await axios.get(API);

  return response.data;
};

export const getAvailableBeds = async () => {
  const response = await axios.get(`${API}/available`);

  return response.data;
};
