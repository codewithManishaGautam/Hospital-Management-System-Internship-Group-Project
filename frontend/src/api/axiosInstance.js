import axios from "axios";

const api = axios.create({
  baseURL: "https://hospital-management-system-internship-rtob.onrender.com/api",
});

export default api;
