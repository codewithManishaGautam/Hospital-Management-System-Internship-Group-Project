import axios from "axios";

const API = "https://hospital-management-system-internship-rtob.onrender.com/api/rooms";

export const getAllRooms = async () => {
  const response = await axios.get(API);

  return response.data;
};
