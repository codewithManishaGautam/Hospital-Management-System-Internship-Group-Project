import axios from "axios";

const API = "http://localhost:5000/api/rooms";

export const getAllRooms = async () => {
  const response = await axios.get(API);

  return response.data;
};
