import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8000/api/donation",
  withCredentials: true,
});

export default instance;
