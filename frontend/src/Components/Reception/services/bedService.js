import axios from "axios";

const API = "https://hospital-management-system-internship-rtob.onrender.com/api/beds";

export const getAllBeds = async () => {
  const response = await axios.get(API);

  return response.data;
};

export const getAvailableBeds = async () => {
  const response = await axios.get(`${API}/available`);

  return response.data;
};
