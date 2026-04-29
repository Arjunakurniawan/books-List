import axios from "axios";

const api = axios.create({
  baseURL: "/api", // gunakan proxy Vite
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Sertakan cookie untuk otentikasi
});
export default api;
