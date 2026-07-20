import axios from "axios";

const API_URL = "http://localhost:5000/api/patients";

export const getPatients = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
