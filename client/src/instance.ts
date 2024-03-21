import axios from "axios";
const instance = axios.create({
  baseURL: "https://donations-8z51.onrender.com/api/donation",
  withCredentials: true,
});

export default instance;
