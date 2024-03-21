import axios from "axios";
const instance = axios.create({
  baseURL: "https://donation-m6ze.onrender.com/api/donation",
  withCredentials: true,
});

export default instance;
