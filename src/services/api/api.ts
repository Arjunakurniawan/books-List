import axios from "axios";

const api = axios.create({
  baseURL: "/api", // gunakan proxy Vite
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;
