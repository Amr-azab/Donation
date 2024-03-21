import axios from "axios";
const instance = axios.create({
  baseURL: "https://donationserver.onrender.com/api/donation",
  withCredentials: true,
});

export default instance;
