import axios from "axios";
const instance = axios.create({
  baseURL: "https://serverdonation.onrender.com/api/donation",
  withCredentials: true,
});

export default instance;
