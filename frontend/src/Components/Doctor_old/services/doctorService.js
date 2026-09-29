import axios from "axios";

const API_URL = "https://hospital-management-system-internship-rtob.onrender.com/api/patients";

export const getPatients = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
